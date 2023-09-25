import { Injectable, computed, inject, signal } from '@angular/core';
import { EnumPeriod, IFilterResult } from '~/models/utils.model';
import { LottoResultsService } from './lotto-results.service';

@Injectable({
  providedIn: 'root'
})
export class LottoFiltersService {

  private _resultService = inject(LottoResultsService);
  private _results = this._resultService.getResults;


  private _filters = signal<IFilterResult>({
    period: EnumPeriod.ALL
  });

  get filters() {
    return this._filters.asReadonly();
  }

  updateFilterResult(period: EnumPeriod) {
    this._filters.mutate((value) => {
      value.period = period;
    });
  }
}

