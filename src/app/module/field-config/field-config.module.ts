import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Configuration interface for form fields
 */
export interface FieldConfig {
  /** Unique identifier for the field */
  name: string;
  /** Display label for the field */
  label: string;
  /** Whether the field should be shown in the form */
  visible: boolean;
  /** Whether the field is mandatory */
  required: boolean;
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: []
})
export class FieldConfigModule {}
