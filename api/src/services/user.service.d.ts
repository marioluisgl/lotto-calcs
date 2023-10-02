import { IFiles} from '../models/file.model';
import { IConfirmUser, IUser } from '../models/user.model';
import {IPaginator, IPaginatorPlugin} from '../utils/util.model';
import {IMongooseOptions, IUpdateOptions} from '../services/impl/global.service';

export interface IUserService {
  saveUser(data: IUser, filesF?: IFiles): Promise<any>;
}