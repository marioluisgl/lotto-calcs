import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { map } from 'rxjs/operators';
import { ILottoData, IResults } from '~/models/lotto.model';
import { EnumPeriod, EnumPlay, IFilterResult } from '~/models/utils.model';

@Injectable({
  providedIn: 'root'
})
export class LottoResultsService {
  private _http = inject(HttpClient);
  private _staticResults = signal<IResults[]>([]);
  public _results = signal<IResults[]>([]);
  public totalResults = computed(() => this._results().length);

  private _selectedPlay = signal<EnumPlay>(EnumPlay.POWERBALL);
  private _loading = signal<boolean>(false);

  get getResults() {
    return this._results.asReadonly();
  }

  get getSelectedPlay() {
    return this._selectedPlay.asReadonly();
  }

  get getLoading() {
    return this._loading.asReadonly();
  }

  constructor() {
  
  }

  public loadResults(play: EnumPlay) {
    this._loading.set(true);
    if (play === 'POWERBALL') {

      this._http.get<ILottoData>('assets/powerball-all.json')
      .pipe(map((resp) => resp.results))
      .subscribe((resp) => {
        this._staticResults.set(resp);
        this._results.set(resp);
        this._selectedPlay.set(play);
        this._loading.set(false);
      });
    }else {

      this._http.get<ILottoData>('assets/megamillion-all.json')
      .pipe(map((resp) => resp.results))
      .subscribe((resp) => {
        this._staticResults.set(resp);
        this._results.set(resp);
        this._selectedPlay.set(play);
        this._loading.set(false)
      });
    }
    
  }

  updateResults(period: EnumPeriod) {
    this._results.set(this._staticResults());
    this._results.update((value) => {
      return value.filter((b) => period !== EnumPeriod.ALL ? b.year === period: b.year);
    });
  }
}
