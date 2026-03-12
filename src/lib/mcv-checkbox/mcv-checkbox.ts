import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-checkbox',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-checkbox.html',
  styleUrl: './mcv-checkbox.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => McvCheckbox),
      multi: true
    }
  ]
})
export class McvCheckbox implements ControlValueAccessor {

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

  @Output() valueChange = new EventEmitter<boolean>();

  // ControlValueAccessor
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: boolean): void {
    this.value = !!value;
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
    this.value = target.checked;
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

  toggle() {
    if (this.disabled || this.readonly) return;
    this.value = !this.value;
    this.isTouched = true;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
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
