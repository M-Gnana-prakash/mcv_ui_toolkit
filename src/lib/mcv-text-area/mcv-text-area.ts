import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-text-area',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-text-area.html',
  styleUrl: './mcv-text-area.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => McvTextArea),
      multi: true
    }
  ]
})
export class McvTextArea implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() rows: number = 4;
  @Input() minLength: number = 0;
  @Input() maxLength: number = Infinity;

  // Validation message shown by default
  @Input() needValidationStatusMessage: boolean = true;

  // Whole styles for text area
  @Input() styles: McvFieldStyles = {};

  public isFocused: boolean = false;
  public isTouched: boolean = false;
  public errors: string[] = [];
  protected readonly Infinity = Infinity;

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
    const target = event.target as HTMLTextAreaElement;
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
