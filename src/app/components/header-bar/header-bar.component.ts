import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { AppState } from '../../core/redux/app.states';
import { Store } from '@ngrx/store';
import { SelectLanguageAction, FetchLanguagesAction } from '../../core/redux/language.actions';
import { Language } from '../../core/models/language.model';




@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  language: any;
  selectedLang: any;

  constructor(private store: Store<AppState>,
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    this.store.select('languageState').subscribe(data => {
      this.language = data.languages;
      this.selectedLang = data.selectedLanguage.Code;
      console.log(this.selectedLang.Code)

    });




  }

  selectLanguage(language: Language) {
    this.store.dispatch(new SelectLanguageAction(language));
  }

}
