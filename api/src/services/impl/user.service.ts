import { IFileData, IFiles } from "../../models/file.model";
import { IUser, RoleEnum, User } from "../../models/user.model";
import { IPaginator, IPaginatorPlugin } from "../../utils/util.model";
import { IUserService } from "../user.service";
import { GlobalService } from "./global.service";

export class UserService extends GlobalService implements IUserService {
    constructor() {
        super();
        this._model = User;
        this._populate = [];
    }

    public saveUser(data: IUser, filesF?: IFiles): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let userSaved: IUser, files: IFileData[];

            this._save(data).then((resp) => {
                userSaved = resp;
                resolve(userSaved);

            }).catch(async (error) => {
                const text = error?.message ?? "Errors.unexpected_error";
                reject(text);
            });
        });
    }

}
