export class UtilError {
    public static handleError(e: any, errorDomain: ErrorDomain): IError {
        const error: IError = {
            code: 500,
            show: false,
            message: null,
            data: e,
        };
        switch (errorDomain) {
            case ErrorDomain.USER:
                if (e?.code) {
                    switch (e.code) {
                        case 11000:
                            error.code = 409;
                            error.show = true;
                            error.message = `Errors.email_already_exist, ${e.keyValue.email}` ;
                            break;
                        case 404:
                            error.code = 404;
                            error.show = true;
                            error.message = `Errors.user_not_found, ${e.email}`;
                            break;
                        case 802:
                            error.code = 404;
                            error.show = true;
                            error.message = `Errors.user_fail_set_password', ${e.email}`;
                            break;
                        case 803:
                            error.code = 404;
                            error.show = true;
                            error.message = `Errors.user_token_expired`;
                            break;
                        default:
                            error.code = e.code;
                            error.show = true;
                            error.message = e.message;
                            break;
                    }
                }
                break;
            case ErrorDomain.BAD_FORMED_URL:
                error.code = 400;
                error.show = true;
                error.message = `Errors.bad_formed_url`;
                break;
        }
        if (!error.message) {
            if (typeof e === 'string') {
                error.message = e;
            } else if (typeof e?.message === 'string') {
                error.message = e.message;
            } else {
                error.message = `Errors.unexpected_error`;
            }
        }
        return error;
    }
}

export interface IError {
    code?: number;
    show?: boolean;
    message?: string | null;
    data?: any;
}

export enum ErrorDomain {
    ADMIN = 'ADMIN',
    USER = 'USER',
    DRAW = 'DRAW',
    BAD_FORMED_URL = 'BAD_FORMED_URL'
}
