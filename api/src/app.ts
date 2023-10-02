import express from 'express';
import { GlobalController } from './controllers/global.controller';
import { DrawService } from './services/impl/draw.service';
import { DrawController } from './controllers/draw.controller';
import { AuthLocal } from './auth/auth-local';
import { UserService } from './services/impl/user.service';
import { UserController } from './controllers/user.controller';
export class App {
    private _controllers: GlobalController[];

    constructor(private _app: express.Application) {}

    public initializeControllers() {
        const authLocal = this._initAuthPassport();
        // set services
        const userService = new UserService();
        const drawService =  new DrawService();

        // set controllers
        this._controllers = [
            new UserController(userService, authLocal),
            new DrawController(drawService, authLocal),
        ];

        this._controllers.forEach((controller) => {
            this._app.use('/api', controller.getRouter());
        });
    }

    private _initAuthPassport(): AuthLocal {
        return new AuthLocal();
    }
}