export interface KVRecord {
    _id: string;
    projectID: string;
    collection: string;
    data: any;
    createdAt: Date;
    lastUpdate: Date;
    expiresInDays?: number;
    expiresAt?: Date;
}

export interface KVCreateData {
    data: any;
    expiresInDays?: number;
    expiresAt?: Date;
}

export interface KVUpdateData {
    data?: any;
    expiresInDays?: number;
    expiresAt?: Date;
}

export interface KVGetAllResponse {
    data: KVRecord[];
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        limit: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface KVDeleteResponse {
    deleted: boolean;
    deletedCount?: number;
}