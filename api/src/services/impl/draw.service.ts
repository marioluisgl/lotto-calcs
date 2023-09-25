import {GlobalService} from './global.service';
import { UtilGlobal } from '../../utils/util.global';
import { IDrawService } from '../draw.service';
import { Draw, IDraw } from '../../models/draw.model';
import { IPaginator, IPaginatorPlugin } from '../../utils/util.model';

export class DrawService extends GlobalService implements IDrawService {

    constructor() {
        super();
        this._model = Draw;
        this._populate = [];
    }

    public async saveDraw(data: IDraw): Promise<any> {
        try {
            const draw = await this._save(data);
            return await UtilGlobal.resolve(draw);
        } catch (err) {
            return await UtilGlobal.reject(err);
        }
    }

    public getAllDrawings( query: any, paginator?: IPaginator): Promise<IPaginatorPlugin> {
        if (paginator) {
            return this._findWithPaginator(query, paginator);
        } else {
            return this._find(query);
        }
    }

    getFullDrawings(query: any): Promise<IDraw[]> {
        throw new Error('Method not implemented.');
    }
}
