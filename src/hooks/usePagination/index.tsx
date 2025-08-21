import { useState, useEffect, useRef } from 'react';

import type { PaginationMeta, PaginationOptions, PaginationOrError } from '@utils/types/action';
import type { UsePaginationResult } from './types';

const usePagination = <T,>(fetchFn: (page: number, limit: number) => PaginationOrError<T>, { page: initialPage = 1, limit: initialLimit = 10 }: PaginationOptions = {}): UsePaginationResult<T> => {
    const [meta, setMeta] = useState<PaginationMeta>({ total: 0,  page: initialPage, pages: 0, limit: initialLimit });
    const [error, setError] = useState<string | null>(null);
    const [limit, setLimit] = useState(initialLimit);
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T[]>([]);

    const fetchRef = useRef(fetchFn);
    useEffect(() => {
        fetchRef.current = fetchFn;
    }, [fetchFn]);

    const loadPage = async (currentPage: number, currentLimit: number) => {
        setLoading(true);
        setError(null);

        const result = await fetchRef.current(currentPage, currentLimit);
        if ('error' in result) {
        setData([]);
        setMeta({ total: 0, page: currentPage, pages: 0, limit: currentLimit });
        setError(result.error);
        } else {
        setData(result.data);
        setMeta(result.meta);
        }

        setLoading(false);
    };

    useEffect(() => {
        let active = true;

        (async () => {
        setLoading(true);
        setError(null);

        const result = await fetchRef.current(page, limit);
        if (!active) return;

        if ('error' in result) {
            setData([]);
            setMeta({ total: 0, page, pages: 0, limit });
            setError(result.error);
        } else {
            setData(result.data);
            setMeta(result.meta);
        }

        setLoading(false);
        })();

        return () => {
        active = false;
        };
    }, [page, limit]);

    const refresh = () => loadPage(page, limit);

    return { data, meta, loading, error, page, limit, setPage, setLimit, refresh };
};

export default usePagination;
