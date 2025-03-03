import { createReducer, on } from '@ngrx/store';
import { LanguageActions } from './language.actions';

export interface LanguageState {
  currentLanguage: string;
  availableLanguages: string[];
  languageMap: { [key: string]: string };
}

export const initialLanguageState: LanguageState = {
  currentLanguage: 'en',
  availableLanguages: ['en', 'de'],
  languageMap: {
    en: 'English',
    de: 'German'
  },
};

export const languageReducer = createReducer(
  initialLanguageState,

  on(LanguageActions.setLanguage, (state, { language }) => {
    console.log('[LanguageReducer] setLanguage, new language:', language);
    return { ...state, currentLanguage: language };
  }),
  on(LanguageActions.loadInitialLanguage, (state) => state)
);
