import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../module/field-config/field-config.module';
import { FormConfigService } from '../../services/form-config.service';
import { numbersOnlyValidator } from '../../validators/numbersOnlyValidator'; // Ensure correct import
import { NotificationService } from 'src/app/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private notificationService:NotificationService,
    private snackBar:MatSnackBar
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
          validators.push(Validators.pattern(/^[A-Za-z\s]+$/));
          break;
        case 'address':
          validators.push(
            numbersOnlyValidator(), // Custom validator to check for numbers only
            Validators.pattern(/^(?=.*[A-Za-z])[A-Za-z0-9\s\-_/\\.,]+$/) // Existing regex validator
          );
          break;
      }

      formControls[field.name] = [null, validators];
    });
    this.form = this.fb.group(formControls);
  }

  submitForm() {
    if (this.form.valid) {
      console.log("Form submitted:", this.form.value);
      this.snackBar.open('Form submitted successfully', 'close', {
        duration: 3000, // Duration in milliseconds
        verticalPosition: 'top', // Display at the top
        panelClass: ['success-snackbar'], // Apply custom styling
      });
      this.form.reset();
    }
  }
}