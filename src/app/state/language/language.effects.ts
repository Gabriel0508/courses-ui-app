import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LanguageActions } from './language.actions';
import { map, tap } from 'rxjs';

@Injectable()
export class LanguageEffects {
  constructor(private actions$: Actions) {}

  loadInitialLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActions.loadInitialLanguage),
      tap(() =>
        console.log('[LanguageEffects] loadInitialLanguage$ triggered')
      ),
      map(() => {
        const storedLanguage = localStorage.getItem('language');
        console.log('[LanguageEffects] Stored language:', storedLanguage);
        return storedLanguage
          ? LanguageActions.setLanguage({ language: storedLanguage })
          : LanguageActions.setLanguage({ language: 'en' });
      })
    )
  );

  setLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LanguageActions.setLanguage),
        tap(({ language }) => {
          console.log(
            '[LanguageEffects] setLanguage$ triggered, language:',
            language
          );
          localStorage.setItem('language', language);
        })
      ),
    { dispatch: false }
  );
}
