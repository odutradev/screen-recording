import { manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { TypeOrError } from '@utils/types/action';
import type { KVRecord, KVCreateData, KVUpdateData, KVGetAllResponse, KVDeleteResponse } from './types';

export const createRecord = async (collection: string, data: KVCreateData): TypeOrError<KVRecord> => {
    try {
        const response = await api.post(`/kv/${collection}/create`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAllRecords = async (collection: string, params?: Record<string, any>): TypeOrError<KVGetAllResponse> => {
    try {
        const response = await api.get(`/kv/${collection}/get-all`, { params });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getRecordById = async (collection: string, id: string): TypeOrError<KVRecord> => {
    try {
        const response = await api.get(`/kv/${collection}/get/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateRecord = async (collection: string, id: string, data: KVUpdateData): TypeOrError<KVRecord> => {
    try {
        const response = await api.patch(`/kv/${collection}/update/${id}`, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteRecord = async (collection: string, id: string): TypeOrError<KVDeleteResponse> => {
    try {
        const response = await api.delete(`/kv/${collection}/delete/${id}`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteCollection = async (collection: string): TypeOrError<KVDeleteResponse> => {
    try {
        const response = await api.delete(`/kv/${collection}/delete-all`);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteProject = async (): TypeOrError<KVDeleteResponse> => {
    try {
        const response = await api.delete('/kv/project/delete-all');
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};