import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormConfigurationComponent } from './components/form-configuration/form-configuration.component';
import { MemberRegistrationComponent } from './components/member-registration/member-registration.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "@progress/kendo-angular-grid";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { ButtonsModule } from "@progress/kendo-angular-buttons";

import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    FormConfigurationComponent,
    MemberRegistrationComponent,
    SuccessDialogComponent
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
    ButtonsModule,
    GridModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
