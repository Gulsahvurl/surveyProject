import { Survey } from '../models/Survey.model';
import { Language } from '../models/language.model';

export interface AppState {
    surveyState: SurveyState;
    languageState: LanguageState;
}

export interface SurveyState {
    surveys: Survey[];
}

export interface LanguageState {
    languages: Language[];
    selectedLanguage: Language;
}