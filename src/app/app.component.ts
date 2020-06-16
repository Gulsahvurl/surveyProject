import { Component } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { Store } from '@ngrx/store';
import { AppState } from './core/redux/app.states';
import { FetchLanguagesAction, SelectLanguageAction } from './core/redux/language.actions';
import { take, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  constructor(private apiService: ApiService, private store: Store<AppState>) { }


  async ngOnInit() {
    const language = await this.apiService.getLanguageTags();
    this.store.dispatch(new FetchLanguagesAction(language));
    this.store.dispatch(new SelectLanguageAction(language.find(data => data.Code === 'TR')));
    // const x = await this.apiService.getAccessToken();
    // console.log(x);
  }

}

