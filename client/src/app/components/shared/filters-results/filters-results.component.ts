import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumPeriod } from '~/models/utils.model';
import { LottoResultsService } from '~/services/lotto-results.service';
import { LottoFiltersService } from '~/services/lotto-filters.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-filters-results',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './filters-results.component.html',
  styleUrls: ['./filters-results.component.scss']
})
export class FiltersResultsComponent {
  private _resultsService = inject(LottoResultsService);
  private _filterService = inject(LottoFiltersService);
  filtersSelected = this._filterService.filters;
  PERIODS = EnumPeriod;


  changeFilter(value: EnumPeriod): void {
    this._filterService.updateFilterResult(value);
    this._resultsService.updateResults(value);
  }

}
