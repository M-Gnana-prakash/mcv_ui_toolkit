import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

export interface PasswordValidationRules {
  minLength?: number;
  maxLength?: number;
  numericsAllowed?: boolean;
  upperCaseRequired?: boolean;
  lowerCaseRequired?: boolean;
  allowedSpecialCharacters?: string[];
}

export interface PasswordRuleStatus {
  minLength: boolean;
  maxLength: boolean;
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecialChar: boolean;
  onlyAllowedChars: boolean;
}

@Component({
  selector: 'mcv-password-field',
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-password-field.html',
  styleUrl: './mcv-password-field.css',
})
export class McvPasswordField {
  // Inputs
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = 'Password';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() canDisplayEye: boolean = true;
  @Input() needValidationStatusMessage: boolean = true;
  @Input() showTooltip: boolean = false;

  /**
   * Password validation rules definition.
   */
  @Input() validationRules: PasswordValidationRules = {
    minLength: 8,
    maxLength: Infinity,
    numericsAllowed: true,
    upperCaseRequired: true,
    lowerCaseRequired: true,
    allowedSpecialCharacters: ['@', '$', '!', '%', '*', '?', '&']
  };

  /**
   * Status of each rule for the current value.
   */
  public ruleStatus: PasswordRuleStatus = {
    minLength: false,
    maxLength: true,
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialChar: false,
    onlyAllowedChars: true
  };

  // Deprecated inputs in favor of validationRules, but kept for backward compatibility if needed
  // or simply internal use.
  @Input() set minLength(val: number) { this.validationRules.minLength = val; }
  get minLength(): number { return this.validationRules.minLength || 0; }

  @Input() set maxLength(val: number) { this.validationRules.maxLength = val; }
  get maxLength(): number { return this.validationRules.maxLength || Infinity; }

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

  // CSS Inputs
  @Input() styles: McvFieldStyles = {};

  private defaultStyles: McvFieldStyles = { ...DEFAULT_MCV_FIELD_STYLES };

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  public isFocused: boolean = false;
  public isHovered: boolean = false;
  public isTouched: boolean = false;
  public isDirty: boolean = false;
  public showPassword: boolean = false;
  protected readonly Infinity = Infinity;

  public isValid: boolean = false;

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
    this.isDirty = true;
    this.validate();
  }

  onBlur() {
    this.isFocused = false;
    this.isTouched = true;
    this.validate();
  }

  toggleVisibility() {
    this.showPassword = !this.showPassword;
  }

  public validate() {
    const currentErrors: string[] = [];
    const fieldName = this.label || 'Password';
    const rules = this.validationRules;

    const v = this.value || '';

    // Update Status
    this.ruleStatus = {
      minLength: v.length >= (rules.minLength || 0),
      maxLength: v.length <= (rules.maxLength || Infinity),
      hasNumber: /\d/.test(v),
      hasUppercase: /[A-Z]/.test(v),
      hasLowercase: /[a-z]/.test(v),
      hasSpecialChar: rules.allowedSpecialCharacters ?
        new RegExp(`[${rules.allowedSpecialCharacters.map(c => '\\' + c).join('')}]`).test(v) :
        /[@$!%*?&]/.test(v),
      onlyAllowedChars: true // Default to true, refine if needed
    };

    // Overall Validity check
    let valid = true;

    if (rules.minLength && !this.ruleStatus.minLength) valid = false;
    if (rules.maxLength && !this.ruleStatus.maxLength) valid = false;
    if (rules.numericsAllowed && !this.ruleStatus.hasNumber) valid = false;
    if (rules.upperCaseRequired && !this.ruleStatus.hasUppercase) valid = false;
    if (rules.lowerCaseRequired && !this.ruleStatus.hasLowercase) valid = false;

    // Check special characters
    if (rules.allowedSpecialCharacters && rules.allowedSpecialCharacters.length > 0) {
      if (!this.ruleStatus.hasSpecialChar) valid = false;
    }

    // Regex check if provided
    if (this.regex && !this.regex.test(v)) {
      valid = false;
    }

    this.isValid = valid;

    // Required check
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} is required`);
    }

    // Generic error for compatibility with statusChange emit
    if (!this.isValid && this.value) {
      currentErrors.push(`Invalid password format`);
    }

    this.errors = currentErrors;
    this.statusChange.emit({
      value: this.value,
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }

  get tooltipRules(): string[] {
    const rulesStrings: string[] = [];
    const r = this.validationRules;

    if (r.minLength) rulesStrings.push(`Minimum length: ${r.minLength}`);
    if (r.maxLength && r.maxLength !== Infinity) rulesStrings.push(`Maximum length: ${r.maxLength}`);
    if (r.numericsAllowed) rulesStrings.push(`At least one number`);
    if (r.upperCaseRequired) rulesStrings.push(`At least one uppercase letter`);
    if (r.lowerCaseRequired) rulesStrings.push(`At least one lowercase letter`);
    if (r.allowedSpecialCharacters && r.allowedSpecialCharacters.length > 0) {
      rulesStrings.push(`Special characters: ${r.allowedSpecialCharacters.join(' ')}`);
    }

    return rulesStrings;
  }
}
