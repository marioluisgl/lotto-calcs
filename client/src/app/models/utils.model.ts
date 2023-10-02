import { merge } from "lodash-es";

export interface ILanguage {
    value: string,
    label: string,
    img: string
}

export interface IFlagStyle { 
    top: string, 
    padding: number,
    'margin-top': string, 
    'animation-delay': string, 
    '-webkit-animation-delay': string, 
}

export interface IBallResults {
    ball: number,
    percent: string
}

export interface IDecenasResults {
    decena: number,
    decenaText: string,
    percent: string
}

export interface IRangeResults {
    range: string,
    percent: string,
    value1?: number,
    value2?: number,
}

export enum EnumRANGEKeys {
    RANGE1 = '15-54',
    RANGE2 = '55-94',
    RANGE3 = '95-134',
    RANGE4 = '135-174',
    RANGE5 = '175-214',
    RANGE6 = '215-254',
    RANGE7 = '255-294',
    RANGE8 = '295-335'
}

export interface IFilterResult {
    period: EnumPeriod;
}

export enum EnumPeriod {
    P2021 = 2021,
    P2022 = 2022,
    P2023 = 2023,
    LAST3MONTH = 'LAST3MONTH',
    LASTMONTH = 'LASTMONTH',
    ALL = 'ALL'
}

export enum EnumPlay {
    MEGAMILLION = 'MEGAMILLION',
    POWERBALL = 'POWERBALL',
}


export interface IApiPaginatorData {
    docs: any[];
    totalDocs?: number;
    options?: any;

    [key: string]: any;
}

export interface IResponseApi {
    success?: boolean;
    errors?: {
        code?: number;
        message?: string;
        show?: boolean; // si se muestra el mensaje
        data?: any; // data del error
    };
    data?: IApiPaginatorData | IBulkResponse | any;
    message?: string;
}

export interface IBulkResponse {
    itemsAdd?: number;
    itemsUpdated?: number;
    itemsFails?: number;
    itemsValid?: number;
    message?: string;
    bulkErrors?: any;
    errors?: string[]; // errores generales
    itemsErrors?: {
        item: any,
        error: string
    }[];
    apiErrors?: {
        item: any,
        error: string
    }[];
}

export declare class PageEvent {
    pageIndex: number;
    previousPageIndex?: number;
    pageSize: number;
    length: number;
}

export interface IQueryItems {
    paginator?: IPaginator;
    text?: string;
    params?: { [key in string]: any };
    sort?: { [key in string]: 1 | -1 };
}

export interface IPaginator {
    start?: number;
    end?: number;
}
  
export class Paginator implements IPaginator {
    start!: number;
    end!: number;
  
    constructor(options?: IPaginator) {
      merge(this, this._getDefaults(), options);
    }
  
    private _getDefaults(): IPaginator {
      return {
        start: 0,
        end: 10
      };
    }
}
