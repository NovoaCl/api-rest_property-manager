import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    PropertyFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }