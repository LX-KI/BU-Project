import { Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { FieldConfig } from '../../module/field-config/field-config.module';
@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss']
})

export class MemberRegistrationComponent implements OnInit{
  form!:FormGroup;
  fields: FieldConfig[] = [];
  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {
      const saveConfig = localStorage.getItem('formConfig');
      this.fields = saveConfig ? JSON.parse(saveConfig) : [];
      const formControls:any = {};
      this.fields.forEach(field => {
        formControls[field.name] = field.required ? [null, Validators.required] : null;
      });
      this.form = this.fb.group(formControls);

  }
  submitForm() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log("formSubmitted",this.form.value);
      localStorage.setItem('formData', JSON.stringify(formData));
      alert('Form submitted successfully');
    }
    else {
      console.log('Please fill all the required fields');
  }
  }
}
