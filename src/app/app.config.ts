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
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { notificationReducer } from './state/notification/notification.reducers';
import { NotificationEffects } from './state/notification/notification.effects';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { fileReducer } from './state/file/file.reducers';
import { UploadEffects } from './state/file/file.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStore({
      courses: courseReducer,
      auth: authReducer,
      language: languageReducer,
      notification: notificationReducer,
      file: fileReducer,
    }),
    provideEffects([
      CoursesEffects,
      AuthEffects,
      LanguageEffects,
      NotificationEffects,
      UploadEffects
    ]),
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
