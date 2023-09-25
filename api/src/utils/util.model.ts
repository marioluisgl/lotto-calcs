import express from 'express';

export interface IPaginator {
    start?: number;
    end?: number;
    offset?: number,
    limit?: number,
    select?: string,
    sort?: { [key: string]: 1 | -1 } | any,
    populate?: any
}

export interface IPaginatorPlugin {
    docs?: any[];
    totalDocs?: number;
    limit?: number;
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    page?: number;
    totalPages?: number;
    offset?: number;
    prevPage?: number;
    nextPage?: number;
    pagingCounter?: number;
    meta?: any;
}

export enum Models {
    USER = 'User'
}

export interface IBulkResponse {
    itemsAdd?: number;
    itemsUpdated?: number;
    itemsValid?: number;
    itemsFails?: number;
    bulkErrors?: any;
    message?: string;
    errors?: string[]; // errores generales
    itemErrors?: Array<{
        item: any,
        error: string
    }>;
    apiErrors?: Array<{
        item: any,
        error: string
    }>;
}

export type UserResume = {
    _id: string,
    name: string,
    lastname: string,
    photo: string,
    phone: string,
    email: string,
    role: string,
}


export interface IExpressApiRequest extends express.Request {
    query: any;
}
