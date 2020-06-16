
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Survey } from '../../core/models/Survey.model';
import { MatTableDataSource } from '@angular/material';
import { SurveyState, AppState, LanguageState } from '../../core/redux/app.states';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FetchSurveysAction } from '../../core/redux/survey.actions';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  displayedColumns = ['ID', 'name', 'delete', 'update'];
  languageState: Observable<LanguageState>


  dataSource = new MatTableDataSource();
  constructor(private apiService: ApiService, private store: Store<AppState>) {

  }

  ngOnInit() {
    this.languageState = this.store.select('languageState');

    this.store.select('surveyState').subscribe(data => {
      this.dataSource = new MatTableDataSource(data.surveys);
    });

  }
  async updateSurvey(id, name) {
    const updateApi = await this.apiService.updateSurvey(id, name);
    this.store.dispatch(new FetchSurveysAction(updateApi));


  }
  async deleteSurvey(id) {
    const deleteApi = await this.apiService.deleteSurvey(id);
    this.store.dispatch(new FetchSurveysAction(deleteApi));

  }

}


