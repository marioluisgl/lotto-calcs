import { IDraw } from '../models/draw.model';
import {IPaginator, IPaginatorPlugin} from '../utils/util.model';

export interface IDrawService {
  saveDraw(data: IDraw): Promise<any>;
  getAllDrawings(query: any, paginator?: IPaginator): Promise<IPaginatorPlugin>;
  getFullDrawings(query: IDraw | any): Promise<IDraw[]>;

}