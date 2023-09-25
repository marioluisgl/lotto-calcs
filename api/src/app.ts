import express from 'express';
import { GlobalController } from './controllers/global.controller';
import { DrawService } from './services/impl/draw.service';
import { DrawController } from './controllers/draw.controller';
export class App {
    private _controllers: GlobalController[];

    constructor(private _app: express.Application) {}

    public initializeControllers() {

        // set services
        const drawService =  new DrawService();

        // set controllers
        this._controllers = [
          new DrawController(drawService),
        ];

        this._controllers.forEach((controller) => {
            this._app.use('/api', controller.getRouter());
        });
    }
}