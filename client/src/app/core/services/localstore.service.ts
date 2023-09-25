import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {

  constructor(@Inject('LOCALSTORAGE') private _localStorage: any) {}

  public getItem(name: string): string {
    return this._localStorage?.getItem(name);
  }

  public setItem(name: string, value: string) {
    this._localStorage?.setItem(name, value);
  }

  public removeItem(name: string) {
    this._localStorage.removeItem(name);
  }

  public clear() {
    this._localStorage.clear();
  }
}
