import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
  selector: 'mcv-date-range-picker',
  standalone: true,
  imports: [CommonModule, McvFieldErrors],
  templateUrl: './mcv-date-range-picker.html',
  styleUrl: './mcv-date-range-picker.css'
})
export class McvDateRangePicker {

  //Input
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() needValidationStatusMessage: boolean = true;
  @Input() styles: McvFieldStyles = {};
  @Input() min: Date | string = '';
  @Input() max: Date | string = '';

  @Input() set value(val: { start: Date | null; end: Date | null } | null) {
    if (val) {
      this.start = this.parseDate(val.start);
      this.end = this.parseDate(val.end);
    }
  }

  @Output() statusChange = new EventEmitter<{
    value: { start: Date | null; end: Date | null };
    valid: boolean;
    errors: string[];
    touched: boolean;
  }>();

  show = false;
  current = new Date();
  days: (Date | null)[] = [];
  isTouched = false;
  errors: string[] = [];

  start: Date | null = null;
  end: Date | null = null;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  private defaultStyles: McvFieldStyles = {
    ...DEFAULT_MCV_FIELD_STYLES,
    selectedColor: 'var(--color-primary, #3b82f6)',
    labelColor: 'var(--form-text, #333)',
  };

  get computedStyles(): McvFieldStyles {
    return { ...this.defaultStyles, ...this.styles };
  }

  constructor() {
    this.buildCalendar();
  }

  private parseDate(d: Date | string | null): Date | null {
    if (!d) return null;
    if (d instanceof Date) return d;
    const date = new Date(d);
    return isNaN(date.getTime()) ? null : date;
  }

  isAllowed(d: Date): boolean {
    const minDate = this.parseDate(this.min);
    const maxDate = this.parseDate(this.max);

    if (minDate) {
      // Compare only dates
      const compareD = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const compareMin = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      if (compareD < compareMin) return false;
    }

    if (maxDate) {
      const compareD = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const compareMax = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
      if (compareD > compareMax) return false;
    }

    return true;
  }

  toggle() {
    if (this.disabled) return;
    this.show = !this.show;
    if (!this.show) {
      this.isTouched = true;
      this.validate();
    }
  }

  buildCalendar() {
    const y = this.current.getFullYear();
    const m = this.current.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    const total = lastDay.getDate();
    const startDay = firstDay.getDay(); // 0 is Sunday, 1 is Monday...

    const tempDays: (Date | null)[] = [];

    // Add padding for the first week
    for (let i = 0; i < startDay; i++) {
      tempDays.push(null);
    }

    // Add actual days
    for (let i = 1; i <= total; i++) {
      tempDays.push(new Date(y, m, i));
    }

    this.days = tempDays;
  }

  change(step: number) {
    this.current = new Date(
      this.current.getFullYear(),
      this.current.getMonth() + step,
      1
    );
    this.buildCalendar();
  }

  setMonth(monthIndex: number) {
    this.current = new Date(
      this.current.getFullYear(),
      Number(monthIndex),
      1
    );
    this.buildCalendar();
  }

  select(d: Date) {
    if (!this.isAllowed(d)) return;

    if (!this.start || this.end) {
      this.start = d;
      this.end = null;
    } else {
      if (d < this.start) {
        this.end = this.start;
        this.start = d;
      } else {
        this.end = d;
      }
    }

    this.isTouched = true;
    this.validate();
  }

  validate() {
    this.errors = [];
    const fieldName = this.label || 'Date Range';

    if (this.required && (!this.start || !this.end)) {
      this.errors.push(`${fieldName} is required`);
    }

    const minDate = this.parseDate(this.min);
    const maxDate = this.parseDate(this.max);

    if (minDate) {
      if (this.start && this.start < minDate) {
        this.errors.push(`${fieldName} start must be on or after ${minDate.toLocaleDateString()}`);
      }
    }

    if (maxDate) {
      if (this.end && this.end > maxDate) {
        this.errors.push(`${fieldName} end must be on or before ${maxDate.toLocaleDateString()}`);
      }
    }

    // Emit validation status
    this.statusChange.emit({
      value: { start: this.start, end: this.end },
      valid: this.errors.length === 0,
      errors: this.errors,
      touched: this.isTouched
    });
  }

  isEdge(d: Date) {
    return (
      this.start?.toDateString() === d.toDateString() ||
      this.end?.toDateString() === d.toDateString()
    );
  }

  inRange(d: Date) {
    return this.start && this.end && d > this.start && d < this.end;
  }

  format(d: Date | null) {
    return d ? d.toLocaleDateString() : '';
  }

  @HostListener('document:click', ['$event'])
  close(e: any) {
    if (!e.target.closest('.calendar-wrapper')) {
      this.show = false;
    }
  }
}
