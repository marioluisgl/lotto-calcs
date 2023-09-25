import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LottoMetricsService } from '~/services/lotto-metrics.service';
import { globalAnimation } from '~/core/animations/global.animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LottoResultsService } from '~/services/lotto-results.service';
import { EnumPlay } from '~/models/utils.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
  animations: [globalAnimation]
})
export class MetricsComponent {
  private _metrictService = inject(LottoMetricsService);
  private _resultService = inject(LottoResultsService);
  
  fiveBalls = this._metrictService.fiveBalls;
  tenHotNumbers = this._metrictService.tenHotNumbers;
  tenColdNumbers = this._metrictService.tenColdNumbers;
  decenasNumCounter = this._metrictService.decenasNumCounter;
  decenasBallsCounter = this._metrictService.decenasBallsCounter;
  rangeSumFiveNumbers = this._metrictService.rangeSumFiveNumbers;

  selectedPlay = this._resultService.getSelectedPlay;
  loading = this._resultService.getLoading;
  play = EnumPlay;

  e = effect(() => {

  })
}
