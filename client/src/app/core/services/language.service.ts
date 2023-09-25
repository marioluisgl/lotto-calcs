import { Injectable, inject, signal } from '@angular/core';
import { LocalstoreService } from './localstore.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _localStorage = inject(LocalstoreService);

  private currentLangSource: BehaviorSubject<string>;
  public currentLang$: Observable<string>;


  constructor() {
    const lang = this._localStorage.getItem('lang') || 'en';
    this.currentLangSource = new BehaviorSubject<string>(lang);
    this.currentLang$ = this.currentLangSource.asObservable();
  }

  changeCurrentLangSource(value: string) {
    this.currentLangSource.next(value);
    this._localStorage.setItem('lang', value);
  }

  public getCurrentLangSource() {
    return this.currentLangSource.getValue();
  }
}
