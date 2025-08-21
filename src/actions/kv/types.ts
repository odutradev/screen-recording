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