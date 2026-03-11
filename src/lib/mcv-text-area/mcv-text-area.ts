import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-text-area',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-text-area.html',
  styleUrl: './mcv-text-area.css',
})
export class McvTextArea {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() rows: number = 4;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 0;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for text area
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
    const target = event.target as HTMLTextAreaElement;
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
    const fieldName = this.label || 'Description';

    // Required validation
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} is required`);
    }

    // Length validation
    if (this.value) {
      if (this.minLength > 0 && this.value.length < this.minLength) {
        currentErrors.push(`${fieldName} must be at least ${this.minLength} characters`);
      }
      if (this.maxLength > 0 && this.value.length > this.maxLength) {
        currentErrors.push(`${fieldName} cannot exceed ${this.maxLength} characters`);
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
