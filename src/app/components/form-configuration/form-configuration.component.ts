import { Component } from '@angular/core';
import { FieldConfig } from '../../module/field-config/field-config.module';

@Component({
  selector: 'app-form-configuration',
  templateUrl: './form-configuration.component.html',
  styleUrls: ['./form-configuration.component.scss']
})
export class FormConfigurationComponent {
  fields: FieldConfig[] = [  
    { name: 'name', label: 'Name', visible: true, required: true },
    { name: 'mobile', label: 'Mobile', visible: true, required: false },
    { name: 'email', label: 'Email', visible: false, required: true },
    { name: 'address', label: 'Address', visible: false, required: false }
  ];

  saveConfig() {
    localStorage.setItem('formConfig', JSON.stringify(this.fields));  // ✅ Better key name
    alert('Configuration saved successfully');
  }
}
