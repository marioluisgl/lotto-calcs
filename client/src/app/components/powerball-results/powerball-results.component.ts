import { Component, OnDestroy, effect, inject } from '@angular/core';
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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EnumPlay } from '~/models/utils.model';
import { IDraw } from '~/models/draw.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDrawComponent } from '../modals/add-draw/add-draw.component';
import { AuthService } from '~/services/auth.service';
import { RoleEnum } from '~/models/user.model';

@UntilDestroy()
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
    FiltersResultsComponent,
    MatDialogModule
  ],
  templateUrl: './powerball-results.component.html',
  styleUrls: ['./powerball-results.component.scss'],
  animations: [globalAnimation]
})
export class PowerballResultsComponent implements OnDestroy {
  private _resultService = inject(LottoResultsService);
  private _authService = inject(AuthService);
  private _matDialog = inject(MatDialog);

  results = this._resultService.getResults;
  totalResults = this._resultService.totalResults;
  selectedPlay = this._resultService.getSelectedPlay;
  loading = this._resultService.getLoading;
  authUser = this._authService.authUser;

  play = EnumPlay;
  enumRole = RoleEnum;

  public addDraw(data?: IDraw) {
    const modal = this._matDialog.open(AddDrawComponent, {
      panelClass: 'modal-data',
      width: '40vW',
      disableClose: true,
      hasBackdrop: false,
      data: {
        modelData: data,
        isEdit: false
      }
    });
    modal.afterClosed().pipe(untilDestroyed(this)).subscribe((response: any) => {
     console.log(response);
    });
  }

  ngOnDestroy(): void {
   
  }
}
