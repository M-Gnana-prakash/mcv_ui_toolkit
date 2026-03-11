import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-input-field',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-input-field.html',
  styleUrl: './mcv-input-field.css',
})
export class McvInputField {
  @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;

  focus() {
    this.inputField.nativeElement.focus();
  }
  // Inputs
  @Input() label: string = '';
  @Input() type: string = 'text'; // To select the type is text, email, password, number, date, time, etc.
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() minLength: number = 0;
  @Input() maxLength: number = Infinity;
  @Input() required: boolean = false;

  @Input() set regex(value: string | RegExp | null) {
    if (typeof value === 'string') {
      try {
        const match = value.match(/^\/(.*)\/([gimsuy]*)$/);
        if (match) {
          this._regex = new RegExp(match[1], match[2]);
        } else {
          this._regex = new RegExp(value);
        }
      } catch (e) {
        this._regex = null;
      }
    } else {
      this._regex = value;
    }
  }
  get regex(): RegExp | null {
    return this._regex;
  }
  private _regex: RegExp | null = null;

  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() needValidationStatusMessage: boolean = true;
  @Input() inputClass: string = '';

  // CSS Inputs
  @Input() styles: McvFieldStyles = {};

  private defaultStyles: McvFieldStyles = {
    ...DEFAULT_MCV_FIELD_STYLES,
    // mcv-input-field uses slightly different primary tones
    textColor: 'var(--form-text, #1f2937)',
    backgroundColor: 'var(--form-bg, #ffffff)',
    activeBorderStyle: '1px solid var(--color-primary, #3b82f6)',
    activeTextColor: 'var(--form-text, #111827)',
    activeBackgroundColor: 'var(--form-bg, #ffffff)',
  };

  get computedStyles(): McvFieldStyles {
    const combined = { ...this.defaultStyles, ...this.styles };
    // Fallbacks for active states if not provided in styles
    if (!this.styles.activeBackgroundColor) combined.activeBackgroundColor = combined.backgroundColor;
    if (!this.styles.activeTextColor) combined.activeTextColor = combined.textColor;
    if (!this.styles.activeBorderStyle) combined.activeBorderStyle = combined.borderStyle;
    return combined;
  }

  public isFocused: boolean = false;
  public isTouched: boolean = false;
  protected readonly Infinity = Infinity;

  // Output
  @Output() statusChange = new EventEmitter<{
    value: string;
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

  public errors: string[] = [];

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
    const fieldName = this.label || 'This field';

    // Required check
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} is required`);
    }

    // Min length check
    if (this.value && this.value.length < this.minLength) {
      currentErrors.push(`${fieldName} must be at least ${this.minLength} characters`);
    }

    // Max length check
    if (this.value && this.value.length > this.maxLength) {
      currentErrors.push(`${fieldName} cannot exceed ${this.maxLength} characters`);
    }

    // Regex pattern match
    if (this.regex && this.value && !this.regex.test(this.value)) {
      currentErrors.push(`${fieldName} has an invalid format`);
    }

    this.errors = currentErrors;
    this.statusChange.emit({
      value: this.value,
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }
}
