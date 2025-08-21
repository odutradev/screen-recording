export interface ResponseError  {
    error: string;
};

export interface ResponseDeleted {
    deletedCount?: number;
    deleted: boolean
};

export type DeletedOrError = TypeOrError<ResponseDeleted>;
export type TypeOrError<T> = Promise<T | ResponseError>;

export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
};
  
export interface PaginationResponse<T> {
    pagination: PaginationMeta;
    data: T[];
};
  
export type PaginationOrError<T> = TypeOrError<PaginationResponse<T>>;
  
export interface PaginationOptions {
    limit?: number;
    page?: number;
};
  