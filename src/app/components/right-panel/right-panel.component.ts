import { Component, OnInit, ViewChild, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Survey } from '../../core/models/Survey.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, SurveyState, LanguageState } from '../../core/redux/app.states';
import { FetchSurveysAction } from '../../core/redux/survey.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit, OnChanges {
  survey: FormGroup;
  surveys: SurveyState;
  id: number;
  text: any;


  languageState: Observable<LanguageState>;
  sub: Subscription;


  constructor(private fb: FormBuilder, private apiService: ApiService,
    private route: Router,
    private store: Store<AppState>, private activatedRoute: ActivatedRoute) { }

  ngOnChanges() {


  }
  async ngOnInit() {
    this.survey = new FormGroup({
      name: new FormControl
    });
    this.survey = this.fb.group({
      name: ['', Validators.required]
    });

    this.activatedRoute.params.subscribe(url => {
      this.id = url.id;
      console.log(this.id);
      if (this.id) {
        this.store.select('surveyState').pipe(take(1)).toPromise().then(data => {
          const getStore = data.surveys.find(getId => getId.ID == this.id);

          if (getStore) {

            this.text = getStore.Name;

          }
        });
      } else {
        this.text = "";
      }
      // this.store.select('surveyState').subscribe(data => {



      // });
    });



    this.languageState = this.store.select('languageState');
    this.store.dispatch(new FetchSurveysAction(await this.apiService.getSurveyList()));

  }
  async sendTo() {
    const createApi = await this.apiService.createSurvey(this.survey.value.name);
    this.store.dispatch(new FetchSurveysAction(createApi));
  }
  async updateSend(id, name) {
    const update = await this.apiService.updateSurvey(id, name);
    this.store.dispatch(new FetchSurveysAction(update));
    this.route.navigate(['/']);


  }
  async send() {
    this.surveys = await this.store.select('surveyState').pipe(take(1)).toPromise();
    console.log(this.surveys.surveys);
    const isSurvey = this.surveys.surveys.find(x => x.ID == this.id);
    if (isSurvey) {
      this.updateSend(isSurvey.ID, this.survey.value.name);

    }
    else if (!isSurvey) {

      this.sendTo();

    }




  }


}
