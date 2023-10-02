import { merge } from "lodash-es";

export interface IUser {
    _id?: string;
    name?: string | null;
    lastname?: string;
    email?: string;
    password?: string;
    photo?: string | File;
    role?: RoleEnum;
    gender?: GenderEnum;
    active?: boolean;
}

export class User implements IUser {
    _id?: string;
    name?: string | null;
    lastname?: string;
    email?: string;
    password?: string;
    photo?: string | File;
    role?: RoleEnum;
    gender?: GenderEnum;
    active?: boolean;


    constructor(options?: IUser) {
        merge(this, this._getDefaults(), options);
    }

    private _getDefaults(): IUser {
        return {
            name: null,
            lastname: null,
            email: null,
            password: null,
            photo: null,
            role: null,
            gender: null,
            active: null,
        };
    }
}

export interface IAuthUser {
    username?: string;
    password?: string;
}

export interface IVerifyUser {
    email?: string;
    token?: string;
}

export interface IAuthSuccessUser {
    token: string;
    user: IUser;
}


export enum RoleEnum {
    ADMIN = 'ADMIN_ROLE',
    USER = 'USER_ROLE', 
}
  
export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE', 
}