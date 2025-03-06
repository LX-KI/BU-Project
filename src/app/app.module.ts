import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormConfigurationComponent } from './components/form-configuration/form-configuration.component';
import { MemberRegistrationComponent } from './components/member-registration/member-registration.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "@progress/kendo-angular-grid";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { ButtonsModule } from "@progress/kendo-angular-buttons";

@NgModule({
  declarations: [
    AppComponent,
    FormConfigurationComponent,
    MemberRegistrationComponent,
    
  ],  
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputsModule,
    LabelModule,
    DateInputsModule,
    LayoutModule,
    ButtonsModule ,
    GridModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
