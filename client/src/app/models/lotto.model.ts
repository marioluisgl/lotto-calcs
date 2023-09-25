export interface ILottoData {
    results: IResults[];
}
  
export interface IResults {
    numbers: number[];
    ball: number,
    year: string
}