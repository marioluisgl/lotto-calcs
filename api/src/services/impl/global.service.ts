import mongoose, { Model, PopulateOptions } from 'mongoose';
import { IPaginator, IPaginatorPlugin } from '../../utils/util.model';

export interface ISaveOptions {
  session?: any;
}

export interface IMongooseOptions {
  session?: any;
  new?: boolean;
  limit?: number;
  ordered?: boolean;
  arrayFilters?: any;
  passRawResult?: boolean;
  rawResult?: boolean;

  // Only for Find
  sort?: any;
  upsert?: boolean;
  writeConcern?: any;
  timestamps?: any;

  lean?: boolean;
  populate?: any;
  projection?: any;

  // for aggregate
  cursor?: any;
  allowDiskUse?: boolean;
  wtimeout?: number;
}

export interface IMongooseBulkResponse {
  upsertedCount?: number;
  modifiedCount?: number;
  deletedCount?: number;
  matchedCount?: number;
  upsertedIds?: any[];  // objects id
  result?: {
    writeErrors: any
  };
  passRawResult?: boolean;
}

export interface IUpdateOptions {
  session?: any;
  new?: boolean;
  upsert?: boolean;
  arrayFilters?: any;
  passRawResult?: boolean;
}


export type OperationsMongoType = 'insertOne' | 'updateOne' | 'update' | 'find' | 'remove' | string;

export abstract class GlobalService {
  protected _model: Model<any> & { paginate?: (a: any, b: any) => Promise<any> } | any;
  protected _populate: PopulateOptions | Array<PopulateOptions> | any;
  protected _populateOwner: string[] | {};

  protected constructor() {
    this._populate = [];
  }

  protected _saveMany(data: any[]): Promise<any> {
    return this._model.insertMany(data);
  }

  protected _save(data: any, options?: IMongooseOptions, populate?: string[] | {}): Promise<any> {
    const objectToStore = new this._model(data);
    if (populate || this._populate) {
      return objectToStore.save(options).then((saved: any) => saved.populate(populate || this._populate));
    } else {
      return objectToStore.save(options);
    }
  }

  protected _findWithPaginator(query: any, paginator?: IPaginator | any, select?: string, byOwner?: boolean): Promise<IPaginatorPlugin | any> {
    const options: IPaginator = {};
    if (paginator?.start >= 0 && paginator?.end >= 0) {
      options['offset'] = paginator.start;
      options['limit'] = paginator.end - paginator.start;
    } else {
      options['limit'] = 100;
    }

    if (paginator?.sort) {
      options['sort'] = paginator.sort;
    }

    if (select) {
      options['select'] = select;
    }
    options['populate'] = byOwner ? this._populateOwner : this._populate;
    options['lean'] = true;
    return this._model.paginate(query, options);
  }

  protected _find(query: any, select?: any, options?: any, populate?: any): Promise<any> {
    return this._model.find(query, select, options).populate(populate ? populate : this._populate) as unknown as Promise<any>;
  }

  protected _findOne(data: any, select?: string, populate?: string[] | {}, options?: IMongooseOptions): Promise<mongoose.Schema | any> {
    return this._model.findOne(data, select, options).populate(populate || this._populate) as unknown as Promise<any>;
  }

  protected _findByParamsAndUpdate(params: any, data: any, options: { upsert?: boolean, new?: boolean }
    = { upsert: true, new: true }, populate?: string[] | {}): Promise<any> {
    return this._model.findOneAndUpdate(params, data, options).populate(populate || this._populate) as unknown as Promise<any>;
  }

  protected _findByIdAndUpdate(id: string, data: any, options?: IMongooseOptions, populate?: string[] | {}): Promise<any> {
    return this._model.findOneAndUpdate({ _id: id }, data, options).populate(populate || this._populate) as unknown as Promise<any>;
  }

  protected _findOneAndUpdate(params: any, data: any, options?: IMongooseOptions, populate?: string[] | {}): Promise<any> {
    return this._model.findOneAndUpdate(params, data, options).populate(populate || this._populate) as unknown as Promise<any>;
  }

  protected _findOneAndRemove(data: any, options?: IMongooseOptions, populate?: string[] | {}): Promise<any> {
    return this._model.findOneAndRemove(data, options).populate(populate || this._populate) as unknown as Promise<any>;
  }

  protected _remove(data: any): Promise<any> {
    return this._model.remove(data) as unknown as Promise<any>;
  }

  protected _updateOne(params: any, data: any, options?: IUpdateOptions): Promise<any> {
    return this._model.updateOne(params, data, options) as unknown as Promise<any>;
  }
}
