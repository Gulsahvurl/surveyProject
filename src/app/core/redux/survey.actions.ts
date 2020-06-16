import { Action } from '@ngrx/store';
import { Survey } from '../models/Survey.model';

export const FETCH_SURVEYS = 'fetchSurveys';

export class FetchSurveysAction implements Action {
    readonly type = FETCH_SURVEYS;

    constructor(public payload: Survey[]) { }
}

export type All = FetchSurveysAction;  