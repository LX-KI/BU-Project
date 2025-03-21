import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../module/field-config/field-config.module';
import { FormConfigService } from '../../services/form-config.service';
import { numbersOnlyValidator } from '../../validators/numbersOnlyValidator';
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
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.formConfigService.formConfig$.subscribe(fields => {
      this.fields = fields;
      this.initForm();
    });
  }

  private initForm(): void {
    const group: { [key: string]: any } = {};
    
    this.fields.forEach(field => {
      if (field.visible) {
        const validators = [];
        
        if (field.required) {
          validators.push(Validators.required);
        }
        
        switch (field.name.toLowerCase()) {
          case 'email':
            validators.push(Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'));
            break;
          case 'mobile':
            validators.push(
              Validators.pattern('^[0-9]{10}$'),
              Validators.maxLength(10),
              Validators.minLength(10)
            );
            break;
          case 'name':
            validators.push(Validators.pattern('^[a-zA-Z\\s]*$'));
            break;
          case 'address':
            validators.push(numbersOnlyValidator());
            break;
        }
        
        group[field.name] = ['', validators];
      }
    });
    
    this.form = this.fb.group(group);
  }

  clearField(fieldName: string, textarea?: ElementRef): void {
    this.form.get(fieldName)?.setValue('');
  
    if (textarea) {
      (textarea.nativeElement as HTMLTextAreaElement).style.height = 'auto';
    }
  }
  
  
  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = textarea.scrollHeight + "px"; // Expand based on content
  }
  
  
  hasAnyValue(): boolean {
    if (!this.form) return false;
    
    const formValues = this.form.value;
    return Object.keys(formValues).some(key => {
      const value = formValues[key];
      return value !== null && value !== undefined && value.trim() !== '';
    });
  }

  handleMobileInput(event: any): void {
    const input = event.target.value;
    const numbersOnly = input.replace(/[^0-9]/g, '').slice(0, 10);
    if (input !== numbersOnly) {
      this.form.get('mobile')?.setValue(numbersOnly, { emitEvent: false });
    }
  }
  submitForm(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });

    if (this.form.valid) {
      if (!this.hasAnyValue()) {
        this.notificationService.showError('Please fill in at least one field before submitting.');
        return;
      }
      
      this.notificationService.showSuccess('Form submitted successfully');
      this.form.reset();
    } else {
      this.notificationService.showError('Please fix the errors in the form before submitting.');
    }
  }
}