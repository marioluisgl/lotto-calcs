import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';

import { ImageLogoPipe, ImageUserPipe } from '../../../pipes/images.pipe';
import { AuthService } from '~/services/auth.service';
import { LanguageComponent } from '../language/language.component';
import { LottoResultsService } from '~/services/lotto-results.service';
import { globalAnimation } from '~/core/animations/global.animations';
import { EnumPlay } from '~/models/utils.model';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    ImageUserPipe,
    LanguageComponent,
    TranslateModule,
    ImageLogoPipe
  ],
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
  animations: [globalAnimation]
})
export class ToolBarComponent {
  private _authService = inject(AuthService);
  private _resultService = inject(LottoResultsService);
  private _router = inject(Router);

  authUser = this._authService.authUser;
  selectedPlay = this._resultService.getSelectedPlay;
  play = EnumPlay;

  logout() {
    this._authService.logout().subscribe(value => {
      if(value) {
        this._router.navigate(['']);
      }
    });
  }
}
