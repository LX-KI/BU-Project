import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../module/field-config/field-config.module';
import { FormConfigService } from '../../services/form-config.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-configuration',
  templateUrl: './form-configuration.component.html',
  styleUrls: ['./form-configuration.component.scss']
})
export class FormConfigurationComponent implements OnInit {
  fields: FieldConfig[] = [];

  constructor(private formConfigService: FormConfigService,
              private notificationService:NotificationService,
              private router:Router
  ) {}

  ngOnInit() {
    this.formConfigService.formConfig$.subscribe(config => {
      this.fields = config.length ? config : [
        { name: 'name', label: 'Name', visible: true, required: true },
        { name: 'mobilenumber', label: 'Mobile Number', visible: true, required: false },
        { name: 'email', label: 'Email', visible: false, required: true },
        { name: 'address', label: 'Address', visible: false, required: false }
      ];
    });
  }
  onRequiredChange(dataItem: any) {
    if (!dataItem.visible) {
      dataItem.required = false;
    }
  }
  
  onRowReorder(args: any) {
    const reorderedFields = [...this.fields];
    const item = reorderedFields.splice(args.dataItem.index, 1)[0];
    reorderedFields.splice(args.draggedIndex, 0, item);
    this.fields = [...reorderedFields];
    this.saveConfig();
  }
  get isSaveDisabled(): boolean {
    return !this.fields.some(field => field.visible);
  }
  
  
  saveConfig() {
    this.formConfigService.saveConfig(this.fields);
    this.notificationService.showSuccess('Configuration saved successfully');
        
    setTimeout(() => {
      this.router.navigate(['/member-registration']);
    }, 1000); 

  }
}
