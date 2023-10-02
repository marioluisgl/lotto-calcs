import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { LocalstoreService } from '../core/services/localstore.service';
import { IAuthSuccessUser, IAuthUser, IUser } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IResponseApi } from '~/models/utils.model';
import { environment } from 'src/environments/environment.development';
import { Helpers } from '~/core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _localStoreService = inject(LocalstoreService);
  private _authUser = signal<IUser>({});

  get authUser() {
    return this._authUser.asReadonly();
  }

  public get tokenFromStorage(): any {
    return this._localStoreService.getItem('token');
  }

  constructor() {
    this._checkUserLogged();
  }

  private _checkUserLogged() {
    const data = JSON.parse(this._localStoreService.getItem('currentUser'));
    if (data == null) { return; }
    this._authUser.set(data);
  }

  access(data: IAuthUser) {
    return this._http.post<any>(`/auth/register`, data).pipe(map(user => {
      if (user?.token) {
        this._saveUserDataInStorage(user, user.token);
        this._authUser.set(user);
      }
      return user;
    }));
  }

  public auth_user(data: IAuthUser): Observable<IUser | any> {
    return this._http.post<IResponseApi & { data: IAuthSuccessUser }>(`${environment.hostApi}/api/login`, data).pipe(map(response => {
      if (response?.success) {
        this._authUser.set(response.data.user);
        this._saveUserDataInStorage(response.data.user, response.data.token);
        return response.data.user;
      } else {
        this._removeUserFromStorage();
        throw response.errors || 'error';
      }
    }));
  }

  public register_user_data(options: { data: IUser }): Observable<IUser> {
    const formData = Helpers.appendDataToForm(options.data);
    return this._http.post<IResponseApi>(`${environment.hostApi}/api/user`, formData).pipe(map(response => {
      if (response?.success) {
        return response.data;
      } else {
        throw response.message || 'error';
      }
    }));
  }


  logout(): Observable<boolean> {
    try {
      this._removeUserFromStorage();
      this._authUser.set({});
      return of(true);

    } catch (error) {
        return of(false);
    }
  }

  private _removeUserFromStorage() {
    this._localStoreService.removeItem('currentUser');
    this._localStoreService.removeItem('token');
  }

  private _saveUserDataInStorage(user: IUser, token: string) {
    this._localStoreService.setItem('token', token);
    this._localStoreService.setItem('currentUser', JSON.stringify(user));
  }

}
