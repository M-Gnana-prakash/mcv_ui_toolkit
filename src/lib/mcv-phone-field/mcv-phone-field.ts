import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { COUNTRY_CODES, PHONE_MAX_LENGTH_BY_COUNTRY } from './phone-country-codes';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-phone-field',
  standalone: true,
  imports: [CommonModule, FormsModule, McvFieldErrors],
  templateUrl: './mcv-phone-field.html',
  styleUrl: './mcv-phone-field.css',
})

export class McvPhoneField implements OnInit, OnChanges {

  @Input() label: string = '';
  @Input() set value(val: string) {
    if (this._innerValue === val) return;
    this._innerValue = val || '';
    this._rawValue = val || '';
    this.processIncomingValue();
    this.validate();
    this.cdr.detectChanges();
  }
  get value(): string {
    return this._innerValue;
  }
  private _innerValue: string = '';
  private _rawValue: string = '';

  private cdr = inject(ChangeDetectorRef);

  private _countryCode: string = '';
  @Input() set countryCode(val: string) {
    if (this._countryCode === val) return;
    this._countryCode = val || '';
    this.initCountryCode();
    this.processIncomingValue();
    this.validate();
    this.cdr.detectChanges();
  }
  get countryCode(): string {
    return this._countryCode;
  }

  private _showCountryCode: boolean = true;
  @Input() set showCountryCode(val: any) {
    const newValue = val === true || val === 'true';
    if (this._showCountryCode === newValue) return;
    this._showCountryCode = newValue;
    this.initCountryCode();
    this.processIncomingValue();
    this.validate();
    this.cdr.detectChanges();
  }
  get showCountryCode(): boolean {
    return this._showCountryCode;
  }

  @Input() placeholder: string = 'Enter phone number';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() needValidationStatusMessage: boolean = true;

  private _defaultCountryCode: string = '+91';
  @Input() set defaultCountryCode(val: string) {
    if (this._defaultCountryCode === val) return;
    this._defaultCountryCode = val || '+91';
    this.initCountryCode();
    this.validate();
    this.cdr.detectChanges();
  }
  get defaultCountryCode(): string {
    return this._defaultCountryCode;
  }

  @Input() styles: McvFieldStyles = {};

  public isFocused: boolean = false;
  public isSelectFocused: boolean = false;
  public isTouched: boolean = false;
  public errors: string[] = [];

  private defaultStyles: McvFieldStyles = { ...DEFAULT_MCV_FIELD_STYLES };

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  public countryCodes = COUNTRY_CODES;

  ngOnInit() {
    this.initCountryCode();
    this.validate();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Handling via setters now, but keeping for legacy compatibility if needed
  }

  private initCountryCode() {
    // Ensure we have a valid country code if showCountryCode is active
    if (this._showCountryCode && !this._countryCode) {
      this._countryCode = this._defaultCountryCode || '+91';
    }
  }

  private processIncomingValue() {
    const val = this._rawValue;
    if (!val) {
      this._innerValue = '';
      return;
    }

    if (this._showCountryCode) {
      const code = this._countryCode || this._defaultCountryCode || '+91';
      if (val.startsWith(code)) {
        this._innerValue = val.substring(code.length);
        return;
      }
    }

    this._innerValue = val;
  }

  @Output() statusChange = new EventEmitter<{
    value: string;
    countryCode: string;
    digits: string;
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

  private phoneLengthByCountryCode = PHONE_MAX_LENGTH_BY_COUNTRY;

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this._rawValue = target.value;
    this._innerValue = target.value;
    this.isTouched = true;
    this.validate();
  }

  onBlur() {
    this.isFocused = false;
    this.isTouched = true;
    this.validate();
  }

  onCountryCodeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this._countryCode = target.value;
    this.validate();
  }

  public validate() {
    const currentErrors: string[] = [];
    const fieldName = this.label || 'Phone Number';

    if (this.required && !this._innerValue) {
      currentErrors.push(`${fieldName} is required`);
    }

    if (this._innerValue) {
      const phoneRegex = /^[0-9\s\+\-\(\)]*$/;
      if (!phoneRegex.test(this._innerValue)) {
        currentErrors.push(`${fieldName} has an invalid format`);
      }
    }

    const digitsOnly = this._innerValue.replace(/\D/g, '');
    let effectiveCode = '';
    let fullValue = '';

    if (this._showCountryCode) {
      effectiveCode = this._countryCode || this._defaultCountryCode || '+91';
      const expectedLength = this.phoneLengthByCountryCode[effectiveCode];

      if (this._innerValue && digitsOnly.length > 0 && expectedLength) {
        if (digitsOnly.length !== expectedLength) {
          currentErrors.push(`${fieldName} should only be ${expectedLength} digits`);
        }
      }
      fullValue = `${effectiveCode}${digitsOnly}`;
    } else {
      effectiveCode = '';
      fullValue = this._rawValue || this._innerValue;
    }

    this.errors = currentErrors;

    this.statusChange.emit({
      value: fullValue,
      countryCode: effectiveCode,
      digits: digitsOnly,
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }
}
