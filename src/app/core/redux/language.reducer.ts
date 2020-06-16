import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from './language.actions';
import { SurveyState, LanguageState } from './app.states';

export const initialState: LanguageState = {
    languages: [], selectedLanguage: {
        Code: '',
        TagList: {
            _CREATE: '',
            _REMOVE: '',
            _SURVEY: '',
            _SURVEYS: '',
            _SURVEY_NAME: '',
            _UPDATE: ''
        }
    }
};

export function reducer(state = initialState, action: fromActions.All): LanguageState {
    switch (action.type) {
        case fromActions.FETCH_LANGUAGES: {
            return {
                languages: action.payload, selectedLanguage: {
                    Code: '',
                    TagList: {
                        _CREATE: '',
                        _REMOVE: '',
                        _SURVEY: '',
                        _SURVEYS: '',
                        _SURVEY_NAME: '',
                        _UPDATE: ''
                    }
                }
            };
        }
        case fromActions.SELECT_LANGUAGE: {
            return { languages: state.languages, selectedLanguage: action.payload };
        }
        default: {
            return state;
        }
    }
}


export const getLanguagesState = createFeatureSelector<LanguageState>('languagesState');
