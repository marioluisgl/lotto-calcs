import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { TruncateTextPipe } from '~/pipes/helpers.pipe';
import { LottoResultsService } from '~/services/lotto-results.service';
import { EnumPlay } from '~/models/utils.model';

@Component({
  selector: 'app-result-item',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TruncateTextPipe,
    TranslateModule
  ],
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss']
})
export class ResultItemComponent {
  private _resultService = inject(LottoResultsService);
  
  @Input({ required: true }) ball!: number;
  @Input({ required: true }) numbers!: number[];

  selectedPlay = this._resultService.getSelectedPlay;
  play = EnumPlay;
}
