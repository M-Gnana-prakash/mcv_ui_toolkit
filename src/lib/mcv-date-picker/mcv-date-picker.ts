import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-date-picker',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-date-picker.html',
  styleUrl: './mcv-date-picker.css',
})
export class McvDatePicker implements OnInit {
  // Value & config
  @Input() value: string = '';          // Value in 'yyyy-MM-dd' format internally
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() min: string = '';            // yyyy-MM-dd
  @Input() max: string = '';            // yyyy-MM-dd
  @Input() format: string = 'yyyy-MM-dd';

  // Validation message
  @Input() needValidationStatusMessage: boolean = true;

  // Styles
  @Input() styles: McvFieldStyles = {};

  private defaultStyles: McvFieldStyles = { ...DEFAULT_MCV_FIELD_STYLES };

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  get normalizedMin(): string {
    return this.min ? this.min.replace(/\//g, '-') : '';
  }

  get normalizedMax(): string {
    return this.max ? this.max.replace(/\//g, '-') : '';
  }

  public isFocused = false;
  public isTouched = false;
  public errors: string[] = [];

  @Output() statusChange = new EventEmitter<{
    value: string;
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

  ngOnInit() {
    this.validate();
  }

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

  private getDateRegex(format: string): RegExp {
    const pattern = format
      .replace('yyyy', '\\d{4}')
      .replace('MM', '\\d{2}')
      .replace('dd', '\\d{2}');
    return new RegExp(`^${pattern}$`);
  }

  private parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;

    // Normalize separators to '-'
    const normalized = dateStr.replace(/\//g, '-');

    // First try standard ISO format (native picker always uses this)
    if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
      const d = new Date(normalized + 'T00:00:00');
      return isNaN(d.getTime()) ? null : d;
    }

    // Then try custom format if it matches the regex
    const format = this.format;
    const regex = this.getDateRegex(format);
    if (!regex.test(dateStr)) return null;

    try {
      const parts = {
        yyyy: dateStr.substring(format.indexOf('yyyy'), format.indexOf('yyyy') + 4),
        MM: dateStr.substring(format.indexOf('MM'), format.indexOf('MM') + 2),
        dd: dateStr.substring(format.indexOf('dd'), format.indexOf('dd') + 2)
      };

      const date = new Date(+parts.yyyy, +parts.MM - 1, +parts.dd);
      return isNaN(date.getTime()) ? null : date;
    } catch (e) {
      return null;
    }
  }

  public validate() {
    const currentErrors: string[] = [];
    const fieldName = this.label || 'Date';

    // Required check
    if (this.required && !this.value) {
      currentErrors.push(`${fieldName} is required`);
    }

    if (this.value) {
      const regex = this.getDateRegex(this.format);
      if (!regex.test(this.value)) {
        currentErrors.push(`${fieldName} has an invalid format (${this.format} required)`);
      } else {
        const parsed = this.parseDate(this.value);
        if (!parsed) {
          currentErrors.push(`${fieldName} is not a valid date`);
        }
      }
    }

    const selectedDate = this.parseDate(this.value);

    // Min date
    if (this.min && selectedDate) {
      const minDate = this.parseDate(this.min);
      if (minDate && selectedDate < minDate) {
        currentErrors.push(`${fieldName} should be on or after ${this.min}`);
      }
    }

    // Max date
    if (this.max && selectedDate) {
      const maxDate = this.parseDate(this.max);
      if (maxDate && selectedDate > maxDate) {
        currentErrors.push(`${fieldName} should be on or before ${this.max}`);
      }
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
