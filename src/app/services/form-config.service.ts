import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldConfig } from '../module/field-config/field-config.module';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {
  private formConfigSubject = new BehaviorSubject<FieldConfig[]>([]);
  formConfig$ = this.formConfigSubject.asObservable();

  constructor() {
    this.loadConfig();
  }

  loadConfig() {
    const savedConfig = localStorage.getItem('formConfig');
    if (savedConfig) {
      this.formConfigSubject.next(JSON.parse(savedConfig));
    }
  }

  saveConfig(config: FieldConfig[]) {
    localStorage.setItem('formConfig', JSON.stringify(config));
    this.formConfigSubject.next(config);
  }
} 