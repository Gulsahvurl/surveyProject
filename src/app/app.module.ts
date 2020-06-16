import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { ApiService } from './core/services/api.service';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Material } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './core/redux/reducers';
import { RouterModule } from '@angular/router';
@NgModule({
  exports: [
    Material
  ],
  declarations: [
    AppComponent,
    LeftPanelComponent,
    RightPanelComponent,
    HeaderBarComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Material,
    BrowserAnimationsModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    RouterModule.forRoot([
      {
        path: '',
        component: RightPanelComponent
      },
      { path: 'survey/:id', component: RightPanelComponent }
    ])


  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
