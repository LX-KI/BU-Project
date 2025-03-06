import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../module/field-config/field-config.module';
import { FormConfigService } from '../../services/form-config.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss']
})
export class MemberRegistrationComponent implements OnInit {
  form!: FormGroup;
  fields: FieldConfig[] = [];

  constructor(
    private fb: FormBuilder,
    private formConfigService: FormConfigService,
    private notificationService:NotificationService
  ) {}

  ngOnInit(): void {
    this.formConfigService.formConfig$.subscribe(fields => {
      this.fields = fields;
      this.initForm();
    });
  }

  private initForm() {
    const formControls: any = {};
    this.fields.forEach(field => {
      formControls[field.name] = [
        null,
        field.required ? [Validators.required] : []
      ];
    });
    this.form = this.fb.group(formControls);
  }

  submitForm() {
    if (this.form.valid) {
      console.log("Form submitted:", this.form.value);
      this.notificationService.showSuccess('Form submitted successfully');
      this.form.reset();
    }
  }
}
