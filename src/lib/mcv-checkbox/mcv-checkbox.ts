import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-checkbox',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-checkbox.html',
  styleUrl: './mcv-checkbox.css',
})
export class McvCheckbox {

  @Input() value: boolean = false;
  @Input() set checked(val: boolean) {
    this.value = val;
  }
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for checkbox
  @Input() styles: McvFieldStyles = {};

  public isFocused: boolean = false;
  public isTouched: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvFieldStyles = {
    ...DEFAULT_MCV_FIELD_STYLES,
    selectedColor: 'var(--color-primary, #007bff)',
    labelColor: 'var(--form-text, #333)',
  };

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  @Output() statusChange = new EventEmitter<{
    value: boolean;
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.checked;
    this.isTouched = true;
    this.validate();
  }

  toggle() {
    if (this.disabled || this.readonly) return;
    this.value = !this.value;
    this.isTouched = true;
    this.validate();
  }

  public validate() {
    const currentErrors: string[] = [];
    const fieldName = this.label || 'Checkbox';

    // Required validation (must be checked if required)
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} must be checked`);
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
