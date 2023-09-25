import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { globalAnimation } from '~/core/animations/global.animations';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { TranslateModule } from '@ngx-translate/core';
import { LottoResultsService } from '~/services/lotto-results.service';
import { ResultItemComponent } from '../shared/result-item/result-item.component';
import { FiltersResultsComponent } from '../shared/filters-results/filters-results.component';
import { LottoFiltersService } from '~/services/lotto-filters.service';
import { EnumPlay } from '~/models/utils.model';

@Component({
  selector: 'app-powerball-results',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    MatIconModule,
    MatBadgeModule,
    TranslateModule,
    ResultItemComponent,
    FiltersResultsComponent
  ],
  templateUrl: './powerball-results.component.html',
  styleUrls: ['./powerball-results.component.scss'],
  animations: [globalAnimation]
})
export class PowerballResultsComponent {
  private _resultService = inject(LottoResultsService);

  results = this._resultService.getResults;
  totalResults = this._resultService.totalResults;
  selectedPlay = this._resultService.getSelectedPlay;
  loading = this._resultService.getLoading;
  play = EnumPlay;
}
