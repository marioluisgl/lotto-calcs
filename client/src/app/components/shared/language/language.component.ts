import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

import { LanguageService } from '../../../core/services/language.service';
import { GlOBAL_CONFIG } from '../../../core/config/global.config';
import { IFlagStyle, ILanguage } from '../../../models/utils.model';
import { Helpers } from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  private _languageService = inject(LanguageService);
  private _trasnlateService = inject(TranslateService);
  
  public languages = GlOBAL_CONFIG.LANGUAGES;
  public currentLanguage = signal<ILanguage | null>(null);

  public toSelect = signal<boolean>(false) ;
  public showLangMenu = signal<boolean>(true);
  public languagesDynamic = signal<ILanguage[]>([]);

  ngOnInit(): void {
    this._languageService.currentLang$.subscribe((lang) => {
      const value = lang || this._trasnlateService.currentLang;
      this._organizeLanguages(value);
      this.currentLanguage.set(this.languages.find((lang: any) => lang.value === value));
      this._trasnlateService.use(value);
      this.showLangMenu.set(true);
      this.toSelect.set(false);
    });
  }

  selectLanguage(value: string) {
    this.currentLanguage.set(this.languages.find((lang: any) => lang.value === value));
    this._languageService.changeCurrentLangSource(value);
  }

  public displayLanguages() {
    this.toSelect.set(true);
  }

  private _organizeLanguages(selected: string) {
    this.languagesDynamic.set(this.languages.filter((lang: ILanguage) => lang.value !== selected));
  }

  public getStyle(count: number): IFlagStyle {
    const style: IFlagStyle = Helpers.getLangSelectorStyles(count);
    return style;
  }

}
