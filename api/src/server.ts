import compression from 'compression';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import * as dotenv from 'dotenv';
dotenv.config();

import {ConnectOptions, default as mongoose} from 'mongoose';
import {default as mongooseMiddleware} from 'mongoose-middleware';

import http from 'http';
import https from 'https';
import path from 'path';
import fs from 'fs';

import {ENVIROMENTS, GLOBAL_CONFIG} from './config/global.config';
import { App } from './app';

export class ApiServer {

    private _app: express.Application;
    private _port: string | number;
    private _server: any;

    constructor() {
        this._initServer();
    }


    private _initServer() {
        this._loadConfig();
        const app = new App(this._app);
        app.initializeControllers();
    }

    private _loadConfig() {
        this._app = express();
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended: true}));
        this._app.all('*', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
            if (req.method === 'OPTIONS') {
                res.status(200).send();
            } else {
                next();
            }
        });

        this._app.use(compression());
        this._app.use(helmet());

        const expressSessionOpt = {secret: 'keyboard cat', resave: true, saveUninitialized: true};
        this._app.use(session(expressSessionOpt));

        this._port = GLOBAL_CONFIG.config.https ? '8082' : '3000';
        this._app.set('port', this._port);

        mongooseMiddleware.initialize(mongoose);
        const uri = !GLOBAL_CONFIG.config.local ? GLOBAL_CONFIG.database : GLOBAL_CONFIG.database_local;
        mongoose.connect(uri)
        .then( () => console.log('Database connected successfuly!'))
        .catch((error) => console.error(error));

        if (!GLOBAL_CONFIG.config.https) {
            this._server = http.createServer(this._app);
            this._server.listen(this._app.get('port'), '0.0.0.0', (req, res) => {
                this._showMessage();
            });
        }
    }

    private _showMessage() {
        console.log(`API HTTP${GLOBAL_CONFIG.config.https ? 'S' : ''} ${GLOBAL_CONFIG.config.name} express listening on port ${this._app.get('port')}`);
    }
}

exports.api = new ApiServer();