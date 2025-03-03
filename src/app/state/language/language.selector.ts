import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LanguageState } from './language.reducer';

export const selectLanguageState =
  createFeatureSelector<LanguageState>('language');

export const selectCurrentLanguage = createSelector(
  selectLanguageState,
  (state: LanguageState) => state.currentLanguage
);

export const selectAvailableLanguage = createSelector(
  selectLanguageState,
  (state: LanguageState) => state.availableLanguages
);

export const selectLanguageMap = createSelector(
  selectLanguageState,
  (state: LanguageState) => state.languageMap
);