import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-time-picker',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-time-picker.html',
  styleUrl: './mcv-time-picker.css',
})
export class McvTimePicker {

  @Input() value: string = ''; // HH:MM format
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() min: string = ''; // HH:MM
  @Input() max: string = ''; // HH:MM
  @Input() step: number = 1;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for time picker
  @Input() styles: McvFieldStyles = {};

  public isFocused: boolean = false;
  public isTouched: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvFieldStyles = { ...DEFAULT_MCV_FIELD_STYLES };

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  @Output() statusChange = new EventEmitter<{
    value: string;
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.isTouched = true;
    this.validate();
  }

  onBlur() {
    this.isFocused = false;
    this.isTouched = true;
    this.validate();
  }

  public validate() {
    const currentErrors: string[] = [];
    const fieldName = this.label || 'Time';

    // Required validation
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} is required`);
    }

    // Min/Max time validation
    if (this.value) {
      if (this.min && this.value < this.min) {
        currentErrors.push(`${fieldName} must be after ${this.min}`);
      }
      if (this.max && this.value > this.max) {
        currentErrors.push(`${fieldName} must be before ${this.max}`);
      }
    }

    // Update errors
    this.errors = currentErrors;

    // Emit validation status
    this.statusChange.emit({
      value: this.value,
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }
}
