import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const LanguageActions = createActionGroup({
    source: 'Language',
    events: {
        'setLanguage': props<{
          language: string
        }>(),
        'loadInitialLanguage': emptyProps()
    }
})