import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../module/field-config/field-config.module';
import { FormConfigService } from '../../services/form-config.service';
import { numbersOnlyValidator } from '../../validators/numbersOnlyValidator'; // Ensure correct import
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
      const validators = [];

      // Add required validator if the field is required
      if (field.required) {
        validators.push(Validators.required);
      }

      // Add custom validators based on field name
      switch (field.name.toLowerCase()) {
        case 'email':
          validators.push(Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/));
          break;
        case 'mobile':
          validators.push(Validators.pattern(/^\d{10}$/));
          break;
          case 'name':
            validators.push(Validators.pattern(/^(?! )[A-Za-z]+( [A-Za-z]+)*(?<! )$/));
            break;
        case 'address':
          validators.push(
            numbersOnlyValidator(),
            Validators.pattern(/^(?=.*[A-Za-z])[A-Za-z0-9\s\-_/\\.,]+$/)
          );
          break;
      }

      // Add minimum length validator for all visible fields
      if (field.visible) {
        validators.push(Validators.minLength(1));
      }

      formControls[field.name] = ['', validators];  // Initialize with empty string instead of null
    });
    this.form = this.fb.group(formControls);
  }

  // Add method to check if form has any values
  hasAnyValue(): boolean {
    if (!this.form) return false;
    
    const formValues = this.form.value;
    return Object.keys(formValues).some(key => {
      const value = formValues[key];
      return value !== null && value !== undefined && value.trim() !== '';
    });
  }

  submitForm() {
    // Mark all fields as touched to trigger validation messages
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });

    if (this.form.valid) {
      if (!this.hasAnyValue()) {
        this.notificationService.showError('Please fill in at least one field before submitting.');
        return;
      }
      
      console.log("Form submitted:", this.form.value);
      this.notificationService.showSuccess('Form submitted successfully');
      this.form.reset();
    } else {
      this.notificationService.showError('Please fix the errors in the form before submitting.');
    }
  }
}