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

export interface IPaginator {
    page: number,
    itemsPerPage: number,
    next: boolean,
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
    P2021 = '2021',
    P2022 = '2022',
    P2023 = '2023',
    LAST3MONTH = 'LAST3MONTH',
    LASTMONTH = 'LASTMONTH',
    ALL = 'ALL'
}

export enum EnumPlay {
    MEGAMILLION = 'MEGAMILLION',
    POWERBALL = 'POWERBALL',
}
