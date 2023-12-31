import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { globalAnimation } from '~/core/animations/global.animations';
import { EnumPlay } from '~/models/utils.model';
import { LottoResultsService } from '~/services/lotto-results.service';
import { MetricsComponent } from '../metrics/metrics.component';
import { PowerballResultsComponent } from '../powerball-results/powerball-results.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '~/services/auth.service';
import { RoleEnum } from '~/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PowerballResultsComponent,
    MetricsComponent,
    MatRadioModule,
    MatDividerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [globalAnimation]
})
export default class DashboardComponent {
  private _authService = inject(AuthService);
  private _resultsService = inject(LottoResultsService);
  private _activeRoute =  inject(ActivatedRoute);
  private _router = inject(Router);

  authUser = this._authService.authUser;
  enumPlay = EnumPlay;
  enumRole = RoleEnum;
  play = EnumPlay.POWERBALL;

  constructor() {
    const id = this._activeRoute.snapshot.params['id'];
    this.play = id === '0' ? EnumPlay.POWERBALL: EnumPlay.MEGAMILLION;
    this._resultsService.loadResults(this.play);
  }

  onChangeRadio($event) {
    this._resultsService.loadResults($event.value);
  }
}
