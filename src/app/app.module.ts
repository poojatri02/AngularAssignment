import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import {RouterModule,Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";



const allpage:Routes=[
  {path:"page1",component:Page1Component},
  {path:"page2",component:Page2Component},
  
  {path:"",redirectTo:"/page1",pathMatch:"full"}
];
@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(allpage)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
