import express from 'express';
import passport from 'passport';
import { ErrorDomain, UtilError } from "../utils/util.errors";
import { UtilForm } from "../utils/util.form";
import { UtilGlobal } from "../utils/util.global";
import { IPaginator } from "../utils/util.model";
import { GlobalController } from "./global.controller";
import { IDrawService} from "../services/draw.service";


export class DrawController extends GlobalController {
    constructor(private _drawService: IDrawService) {
        super('/draw');
        this._initializeRoutes();
    }

    protected _initializeRoutes(): void {
        this._router.post(this._contextPath, this.saveDraw);
        this._router.get(this._contextPath, this.getDrawings);
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

    private getDrawings = (req: express.Request | any, res: express.Response) => {
        const data: { params: any, text: string, paginator: IPaginator, sort: { [key: string]: -1 | 1 } } = req.query;
        UtilGlobal.parseFields(data);
        const { params, text } = data;
        let { paginator, sort } = data;
        const query: any = { $and: [] };

        if (!paginator) {
            paginator = { start: 0, end: 10 };
        }

        sort = {
            ...sort,
            _id: -1,
        };

        if (sort) {
            paginator = {
                ...paginator,
                sort
            };
        }

        if (query.$and.length === 0) {
            delete query.$and;
        }

        this._drawService.getAllDrawings(query, paginator).then(data => {
            res.send({ success: true, data });
        }).catch(err => {
            res.send({ success: false, errors: UtilError.handleError(err, ErrorDomain.DRAW) });
        });
    };
}