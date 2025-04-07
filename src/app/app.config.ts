import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CoursesEffects } from './state/item/item.effects';
import { courseReducer } from './state/item/item.reducers';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { authReducer } from './state/authentication/auth.reducer';
import { AuthEffects } from './state/authentication/auth.effects';
import { languageReducer } from './state/language/language.reducer';
import { LanguageEffects } from './state/language/language.effects';
import { environment } from 'src/environments/environments';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
   // { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStore({
      courses: courseReducer,
      auth: authReducer,
      language: languageReducer
    }),
    provideEffects([CoursesEffects, AuthEffects, LanguageEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      })
    ),
  ],
};

export function httpTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
