import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
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
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { authReducer } from './state/authentication/auth.reducer';
import { AuthEffects } from './state/authentication/auth.effects';
import { languageReducer } from './state/language/language.reducer';
import { LanguageEffects } from './state/language/language.effects';

const firebaseConfig = {
  apiKey: 'AIzaSyA5WMooUkLJUXoV8qkg_8oVjYsr3WjLnuk',
  authDomain: 'courses-app-be1.firebaseapp.com',
  projectId: 'courses-app-be1',
  storageBucket: 'courses-app-be1.firebasestorage.app',
  messagingSenderId: '297137314002',
  appId: '1:297137314002:web:c696e23c06ca22d3ed750b',
  measurementId: 'G-S2ZBQ90TC9',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      courses: courseReducer,
      auth: authReducer,
      language: languageReducer,
    }),
    provideEffects([CoursesEffects, AuthEffects, LanguageEffects]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideStoreDevtools({
    //   maxAge: 25,
    //   logOnly: !isDevMode(),
    //   autoPause: true,
    // }),
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
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};

export function httpTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
