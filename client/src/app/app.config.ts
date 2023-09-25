import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { routes } from './app.routes';

import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';

import { GlOBAL_CONFIG } from './core/config/global.config';
import { LanguageService } from './core/services/language.service';
import { LocalstoreService } from './core/services/localstore.service';
import { AuthInterceptor } from './core/auth/auth-nterceptor';
import { FakeBackendInterceptor } from './core/utils/fake-backend';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeEs, 'es');

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: GlOBAL_CONFIG.LANGUAGES[1].value
    })),
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: LanguageService, deps: [LocalstoreService] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true},
  ]
};
