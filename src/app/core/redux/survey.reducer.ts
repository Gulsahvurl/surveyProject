import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from './survey.actions';
import { SurveyState } from './app.states';

export const initialState: SurveyState = { surveys: [] };

export function reducer(state = initialState, action: fromActions.All): SurveyState {
    switch (action.type) {
        case fromActions.FETCH_SURVEYS: {
            return { surveys: action.payload };
        }
        default: {
            return state;
        }
    }
}


export const getSurveysState = createFeatureSelector<SurveyState>('surveyState');

export const getSurveys = createSelector(
    getSurveysState,
    (state: SurveyState) => state.surveys
); 