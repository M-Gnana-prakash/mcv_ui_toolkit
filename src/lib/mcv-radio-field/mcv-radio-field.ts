import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

export interface RadioOption {
    label: string;
    value: string;
    disabled?: boolean;
}

@Component({
    selector: 'mcv-radio-field',
    standalone: true,
    imports: [CommonModule, McvFieldErrors],
    templateUrl: './mcv-radio-field.html',
    styleUrl: './mcv-radio-field.css',
})
export class McvRadioField {

    @Input() value: string = '';
    @Input() options: RadioOption[] = [];
    @Input() name: string = 'radio-group-' + Math.random().toString(36).substring(2, 11);
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readonly: boolean = false;
    @Input() label: string = ''; // Group label
    @Input() layout: 'horizontal' | 'vertical' = 'vertical';

    // Validation message shown by default
    @Input() needValidationStatusMessage: boolean = true;

    // Whole styles for radio field
    @Input() styles: McvFieldStyles = {};

    public errors: string[] = [];
    public isTouched: boolean = false;

    private defaultStyles: McvFieldStyles = {
        ...DEFAULT_MCV_FIELD_STYLES,
        selectedColor: 'var(--color-primary, #007bff)',
        labelColor: 'var(--form-text, #333)',
    };

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

    onOptionChange(selectedValue: string) {
        if (this.disabled || this.readonly) return;

        this.isTouched = true;
        // If the same value is clicked, deselect it (optional, but requested earlier)
        if (this.value === selectedValue) {
            this.value = '';
        } else {
            this.value = selectedValue;
        }

        this.valueChange.emit(this.value);
        this.validate();
    }

    onBlur() {
        this.isTouched = true;
        this.validate();
    }

    public validate() {
        this.errors = [];
        const fieldName = this.label || 'Selection';

        if (this.required && !this.value) {
            this.errors.push(`${fieldName} is required`);
        }

        // Emit validation status
        this.statusChange.emit({
            value: this.value,
            valid: this.errors.length === 0,
            errors: this.errors,
            touched: this.isTouched
        });
    }
}
