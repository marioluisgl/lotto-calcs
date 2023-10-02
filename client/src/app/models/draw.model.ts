import { EnumPlay } from "./utils.model";
import { merge } from "lodash-es";

export interface IDraw {
    _id?: string;
    type?: EnumPlay;
    year?: number;
    numbers?: number[];
    ball?: number;
}

export class Draw implements IDraw {
    _id?: string;
    type?: EnumPlay;
    year?: number;
    numbers!: number[];
    ball?: number | null;

    constructor(options?: IDraw) {
        merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): IDraw {
        return {
            type: null,
            year: null,
            numbers: [],
            ball: null,
        };
    }
}