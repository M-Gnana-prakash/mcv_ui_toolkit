import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-toggle-field',
  templateUrl: './mcv-toggle-field.html',
  styleUrl: './mcv-toggle-field.css',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => McvToggleField),
      multi: true
    }
  ]
})
export class McvToggleField implements ControlValueAccessor {

  @Input() value: boolean = false;
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  @Input() onLabel: string = 'Yes';
  @Input() offLabel: string = 'No';

  @Input() needValidationStatusMessage: boolean = true;
  @Input() styles: McvFieldStyles = {};

  public errors: string[] = [];
  public isTouched: boolean = false;

  private defaultStyles: McvFieldStyles = {
    ...DEFAULT_MCV_FIELD_STYLES,
    trackColor: 'var(--form-border, #ccc)',
    thumbColor: '#fff',
    selectedColor: 'var(--color-primary, #3b82f6)',
    labelColor: 'var(--form-text, #333)',
  };

  @Output() valueChange = new EventEmitter<boolean>();
  @Output() statusChange = new EventEmitter<{
    value: boolean;
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

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

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  toggle(event?: Event) {
    if (this.disabled || this.readonly) return;

    this.value = !this.value;
    this.isTouched = true;
    this.onTouched(); // Emit onTouched on change for better UX

    if (event?.currentTarget) {
      (event.currentTarget as HTMLElement).blur();
    }

    this.validate();

    // Emit boolean only
    this.valueChange.emit(this.value);
    this.onChange(this.value);
  }

  validate() {
    this.errors = [];
    const fieldName = this.label || 'Toggle';

    if (this.required && !this.value) {
      this.errors.push(`${fieldName} is required`);
    }

    this.statusChange.emit({
      value: this.value,
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }
}
