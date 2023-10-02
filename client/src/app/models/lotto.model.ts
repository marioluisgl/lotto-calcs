import { EnumPlay } from "./utils.model";

export interface ILottoData {
    results: IResults[];
}
  
export interface IResults {
    _id?: string;
    type?: EnumPlay;
    year?: number;
    numbers?: number[];
    ball?: number;
    created_at?: string
}