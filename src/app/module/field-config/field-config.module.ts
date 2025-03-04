import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface FieldConfig { 
  name : string;
  label : string;
  visible : boolean;
  required : boolean;
}
