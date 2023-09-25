import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerballResultsComponent } from '../powerball-results/powerball-results.component';
import { globalAnimation } from '~/core/animations/global.animations';
import { MetricsComponent } from '../metrics/metrics.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { LottoResultsService } from '~/services/lotto-results.service';
import { EnumPlay } from '~/models/utils.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PowerballResultsComponent,
    MetricsComponent,
    MatRadioModule,
    MatDividerModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [globalAnimation]
})
export default class HomeComponent {
  private _resultsService = inject(LottoResultsService);

  constructor() {
    this._resultsService.loadResults(EnumPlay.POWERBALL);
  }


  onChangeRadio($event) {
    this._resultsService.loadResults($event.value);
  }

}
