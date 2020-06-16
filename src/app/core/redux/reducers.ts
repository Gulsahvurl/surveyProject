import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState } from './app.states';
import * as surveyReducer from './survey.reducer';
import * as languageReducer from './language.reducer';
import { environment } from '../../../environments/environment';

export const reducers: ActionReducerMap<AppState> = {
    surveyState: surveyReducer.reducer,
    languageState: languageReducer.reducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state: AppState, action: any): AppState {
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [logger]
    : []; 