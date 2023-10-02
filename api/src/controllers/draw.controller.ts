import express from 'express';
import passport from 'passport';
import { ErrorDomain, UtilError } from "../utils/util.errors";
import { UtilForm } from "../utils/util.form";
import { UtilGlobal } from "../utils/util.global";
import { IPaginator } from "../utils/util.model";
import { GlobalController } from "./global.controller";
import { IDrawService} from "../services/draw.service";
import { EnumDrawType } from '../models/draw.model';
import { AuthLocal } from '../auth/auth-local';


export class DrawController extends GlobalController {
    constructor(private _drawService: IDrawService, private _authLocal: AuthLocal) {
        super('/draw');
        this._initializeRoutes();
    }

    protected _initializeRoutes(): void {
        this._router.post(this._contextPath, this.saveDraw);
        this._router.post(`${this._contextPath}/import`, this.importDrawings);
        this._router.get(`${this._contextPath}/powerball`, this.getPowerballDrawings);
        this._router.get(`${this._contextPath}/megamillion`, this.getMegamillionDrawings);
    }

    private saveDraw = (req: express.Request, res: express.Response) => {
        UtilForm.retrieveDataAndFile(req).then((incomingData) => {
            this._drawService.saveDraw(incomingData.data).then(data => {
                res.send({ success: true, data });
            }).catch(err => {
                res.send({ success: false, errors: UtilError.handleError(err, ErrorDomain.DRAW) });
            });
        }).catch(err => {
            res.send({ success: false, errors: UtilError.handleError(err, ErrorDomain.DRAW) });
        });
    };

    private getPowerballDrawings = (req: express.Request | any, res: express.Response) => {
        const data: { params: any, sort: { [key: string]: -1 | 1 } } = req.query;
        UtilGlobal.parseFields(data);
        const { params } = data;
        let { sort } = data;
        const query: any = { $and: [{ type: EnumDrawType.POWERBALL }] };

        if (query.$and.length === 0) {
            delete query.$and;
        }

        this._drawService.getFullDrawings(query).then(data => {
            res.send({ results: data });
        }).catch(err => {
            res.send({ success: false, errors: UtilError.handleError(err, ErrorDomain.DRAW) });
        });
    };

    private getMegamillionDrawings = (req: express.Request | any, res: express.Response) => {
        const data: { params: any, sort: { [key: string]: -1 | 1 } } = req.query;
        UtilGlobal.parseFields(data);
        const { params } = data;
        let { sort } = data;
        const query: any = { $and: [{ type: EnumDrawType.MEGAMILLION }] };

        if (query.$and.length === 0) {
            delete query.$and;
        }

        this._drawService.getFullDrawings(query).then(data => {
            res.send({ results: data });
        }).catch(err => {
            res.send({ success: false, errors: UtilError.handleError(err, ErrorDomain.DRAW) });
        });
    };

    private importDrawings = (req: express.Request, res: express.Response) => {
        UtilForm.retrieveDataAndFile(req).then((incomingData) => {
            this._drawService.importDrawings(incomingData.data).then(data => {
                res.send({ success: true, data });
            }).catch(err => {
                res.send({ success: false, errors: UtilError.handleError(err, ErrorDomain.DRAW) });
            });
        }).catch(err => {
            res.send({ success: false, errors: UtilError.handleError(err, ErrorDomain.DRAW) });
        });
    };

}