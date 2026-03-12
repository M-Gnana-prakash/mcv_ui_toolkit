import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-email-field',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-email-field.html',
  styleUrl: './mcv-email-field.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => McvEmailField),
      multi: true
    }
  ]
})
export class McvEmailField implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = 'example@domain.com';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() allowMultiple: boolean = false;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for email field
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

  @Output() valueChange = new EventEmitter<string>();

  // ControlValueAccessor
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string): void {
    this.value = value || '';
    this.validate();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.isTouched = true;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.validate();
  }

  onBlur() {
    this.isFocused = false;
    this.isTouched = true;
    this.onTouched();
    this.validate();
  }

  public validate() {
    const currentErrors: string[] = [];
    const fieldName = this.label || 'Email';

    // Required validation
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} is required`);
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (this.value) {
      if (this.allowMultiple) {
        const emails = this.value.split(',').map(e => e.trim());
        const invalidEmails = emails.filter(e => e && !emailRegex.test(e));
        if (invalidEmails.length > 0) {
          currentErrors.push(`${fieldName} has invalid format: ${invalidEmails.join(', ')}`);
        }
      } else {
        if (!emailRegex.test(this.value)) {
          currentErrors.push(`${fieldName} has an invalid format`);
        }
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
