import express from 'express';
import passport from 'passport';
import { AuthLocal } from "../auth/auth-local";
import { IUser } from "../models/user.model";
import { IUserService } from "../services/user.service";
import { ErrorDomain, UtilError } from "../utils/util.errors";
import { UtilForm } from "../utils/util.form";
import { GlobalController } from "./global.controller";


export class UserController extends GlobalController {
    constructor(private _userService: IUserService, private _authLocal: AuthLocal) {
        super('/user');
        this._initializeRoutes();
    }

    protected _initializeRoutes(): void {
        this._router.post('/login', this.login);
        this._router.post(this._contextPath, this.saveUser);
    }

    private saveUser = (req: express.Request, res: express.Response) => {
        UtilForm.retrieveDataAndFile(req).then((incomingData) => {
            this._userService.saveUser(incomingData.data, incomingData.files).then(data => {
                res.send({ success: true, data });
            }).catch(err => {
                res.send({ success: false, errors: UtilError.handleError(err, ErrorDomain.USER) });
            });
        }).catch(err => {
            res.send({ success: false, errors: UtilError.handleError(err, ErrorDomain.USER) });
        });
    };

    private login = (req: { login: (arg0: any, arg1: (err: any) => void) => void; }, res: express.Response, next: any) => {
        passport.authenticate('local', (error, success: boolean, data: { user?: IUser, token: string, message: string } | any) => {
            if (error || !success || !data || !data.token) {
                res.send({ success: false, errors: UtilError.handleError(error || data.message, ErrorDomain.USER) });
            } else {
                req.login(data.user, (err) => {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.jsonp({ success: true, data });
                    }
                });
            }
        })(req, res, next);
    };
}