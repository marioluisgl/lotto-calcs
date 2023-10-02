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

    public async importDrawings(data: {draws: IDraw[]}): Promise<any> {
        try {

            data.draws.forEach(async (draw) => {
                await this._save(draw);
            });
           
            return await UtilGlobal.resolve({message: 'All Drawings has been imported succesfuly'});
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
        return this._find(query, null, {});
    }
}
