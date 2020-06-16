import { Action } from '@ngrx/store';
import { Language } from '../models/language.model';

export const FETCH_LANGUAGES = 'fetchLanguages';
export const SELECT_LANGUAGE = 'selectLanguage';

export class FetchLanguagesAction implements Action {
    readonly type = FETCH_LANGUAGES;

    constructor(public payload: Language[]) { }
}

export class SelectLanguageAction implements Action {
    readonly type = SELECT_LANGUAGE;

    constructor(public payload: Language) { }
}

export type All = FetchLanguagesAction | SelectLanguageAction;  