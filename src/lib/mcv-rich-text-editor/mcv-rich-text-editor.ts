import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { QuillModule, ContentChange } from 'ngx-quill';
import { McvFieldStyles, DEFAULT_MCV_FIELD_STYLES } from '../form-types';
import { McvFieldErrors } from '../mcv-field-errors/mcv-field-errors';

@Component({
    selector: 'mcv-rich-text-editor',
    standalone: true,
    imports: [CommonModule, FormsModule, QuillModule, McvFieldErrors],
    templateUrl: './mcv-rich-text-editor.html',
    styleUrl: './mcv-rich-text-editor.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => McvRichTextEditor),
            multi: true
        }
    ]
})
export class McvRichTextEditor implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() value: string = '';
    @Input() placeholder: string = 'Compose an epic...';
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readonly: boolean = false;

    // Validation message shown by default
    @Input() needValidationStatusMessage: boolean = true;

    // Whole styles for rich text editor
    @Input() styles: McvFieldStyles = {};

    @Input() modules: any = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],                                         // remove formatting button
            ['link', 'image', 'video']                         // link and image, video
        ]
    };

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

    onContentChanged(event: ContentChange) {
        this.value = event.html || '';
        this.isTouched = true;
        this.onChange(this.value);
        this.valueChange.emit(this.value);
        this.validate();
    }

    onFocus() {
        this.isFocused = true;
    }

    onBlur() {
        this.isFocused = false;
        this.isTouched = true;
        this.onTouched();
        this.validate();
    }

    public validate() {
        const currentErrors: string[] = [];
        const fieldName = this.label || 'Content';

        // Required validation
        if (this.required && (!this.value || this.value === '<p><br></p>')) {
            currentErrors.push(`${fieldName} is required`);
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
