# 🚀 MCV UI Toolkit

A professional, production-ready UI toolkit for Angular applications. **MCV UI Toolkit** provides a comprehensive suite of standalone form components with built-in validation, flexible styling, event-driven architecture, and complete TypeScript support.

**Key Features:**
- ✅ Standalone Angular components (no module dependencies)
- ✅ Built-in validation and error handling
- ✅ Highly customizable styling system
- ✅ Full TypeScript support with strong typing
- ✅ Control Value Accessor integration for reactive forms
- ✅ Comprehensive event emissions
- ✅ Accessibility-friendly components
- ✅ Production-ready and battle-tested

---

## 📋 Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Components](#components)
4. [Styling System](#styling-system)
5. [Validation](#validation)
6. [API Reference](#api-reference)
7. [Configuration](#configuration)
8. [Advanced Usage](#advanced-usage)
9. [Form Integration](#form-integration)
10. [Examples](#examples)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)
13. [Contributing](#contributing)
14. [License](#license)

---

## 📦 Installation

### via npm

```bash
npm install mcv-ui-toolkit
```

### via GitHub

```bash
npm install M-Gnana-prakash/mcv_ui_toolkit
```

### Peer Dependencies

All peer dependencies are required for the toolkit to function properly:

```bash
npm install @angular/common@>=18.0.0 @angular/core@>=18.0.0 @angular/forms@>=18.0.0 ngx-quill@>=22.0.0 quill@>=2.0.0
```

Or in your `package.json`:

```json
{
  "peerDependencies": {
    "@angular/common": ">=18.0.0",
    "@angular/core": ">=18.0.0",
    "@angular/forms": ">=18.0.0",
    "ngx-quill": ">=22.0.0",
    "quill": ">=2.0.0"
  }
}
```

---

## 🚀 Quick Start

### 1. Import Components

All components are standalone and can be imported directly:

```typescript
import { McvInputField } from 'mcv-ui-toolkit';
import { McvCheckbox } from 'mcv-ui-toolkit';
import { McvDatePicker } from 'mcv-ui-toolkit';
// ... import other components as needed
```

### 2. Use in Template

```html
<mcv-input-field 
  label="Username" 
  [(ngModel)]="username"
  placeholder="Enter username">
</mcv-input-field>
```

### 3. In Reactive Forms

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { McvInputField } from 'mcv-ui-toolkit';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [McvInputField, ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <mcv-input-field 
        label="Email"
        formControlName="email"
        type="email">
      </mcv-input-field>
    </form>
  `
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder) {}
}
```

---

## 📦 Components

### Complete Component Overview

| Component | Purpose | Features |
|-----------|---------|----------|
| **McvInputField** | Text input field | Regex validation, min/max length, multiple input types |
| **McvEmailField** | Email input with validation | Single/multiple email support, format validation |
| **McvPasswordField** | Secure password input | Custom rules, strength indicator, show/hide toggle |
| **McvTextArea** | Multi-line text input | Character counter, min/max length validation |
| **McvPhoneField** | International phone number | Country code selector, format validation |
| **McvDatePicker** | Single date selection | Min/max date, format customization |
| **McvDateRangePicker** | Date range selection | Calendar UI, range validation |
| **McvTimePicker** | Time selection | Min/max time, format validation |
| **McvCheckbox** | Boolean checkbox | Label, required state, styling |
| **McvRadioField** | Radio button group | Options, horizontal/vertical layout |
| **McvToggleField** | Toggle switch | On/Off labels, boolean state |
| **McvRichTextEditor** | Rich text editing | Quill integration, formatting toolbar |
| **McvFieldErrors** | Error display helper | Conditional rendering, accessible format |

---

## 📦 Components - Detailed Documentation

### 1. McvInputField

Standard text input with flexible validation.

#### Inputs

```typescript
@Input() label: string = '';              // Field label
@Input() type: string = 'text';           // HTML input type
@Input() value: string = '';              // Current value
@Input() placeholder: string = '';        // Placeholder text
@Input() minLength: number = 0;           // Minimum character length
@Input() maxLength: number = Infinity;    // Maximum character length
@Input() required: boolean = false;       // Required validation
@Input() disabled: boolean = false;       // Disable field
@Input() readonly: boolean = false;       // Read-only mode
@Input() regex: string | RegExp | null;   // Custom regex validation
@Input() needValidationStatusMessage: boolean = true;  // Show errors
@Input() inputClass: string = '';         // Additional CSS classes
@Input() styles: McvFieldStyles = {};     // Custom styles
```

#### Outputs

```typescript
@Output() statusChange = new EventEmitter<{
  value: string;
  valid: boolean;
  errors: string[];
  touched: boolean;
}>();

@Output() valueChange = new EventEmitter<string>();
```

#### Example

```html
<mcv-input-field
  label="Username"
  type="text"
  placeholder="Enter username"
  [minLength]="3"
  [maxLength]="50"
  [required]="true"
  [(ngModel)]="username"
  (statusChange)="onStatusChange($event)"
  [regex]="'^[a-zA-Z0-9_]*$'">
</mcv-input-field>
```

---

### 2. McvEmailField

Email validation with support for single or multiple emails.

#### Inputs

```typescript
@Input() label: string = '';
@Input() value: string = '';
@Input() placeholder: string = 'example@domain.com';
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() allowMultiple: boolean = false;  // Allow comma-separated emails
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### Example

```html
<mcv-email-field
  label="Email Address"
  [required]="true"
  [(ngModel)]="email"
  (statusChange)="validateEmail($event)">
</mcv-email-field>
```

---

### 3. McvPasswordField

Advanced password input with customizable validation rules and strength indicator.

#### Inputs

```typescript
@Input() label: string = '';
@Input() value: string = '';
@Input() placeholder: string = 'Password';
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() canDisplayEye: boolean = true;   // Show/hide toggle
@Input() showTooltip: boolean = false;    // Show password rules
@Input() needValidationStatusMessage: boolean = true;
@Input() validationRules: PasswordValidationRules = {...};  // Custom rules
@Input() styles: McvFieldStyles = {};
```

#### PasswordValidationRules Interface

```typescript
export interface PasswordValidationRules {
  minLength?: number;                    // Default: 8
  maxLength?: number;                    // Default: Infinity
  numericsAllowed?: boolean;             // Default: true
  upperCaseRequired?: boolean;           // Default: true
  lowerCaseRequired?: boolean;           // Default: true
  allowedSpecialCharacters?: string[];   // Default: ['@', '$', '!', '%', '*', '?', '&']
}
```

#### Example

```typescript
export class LoginComponent {
  passwordRules = {
    minLength: 10,
    maxLength: 50,
    numericsAllowed: true,
    upperCaseRequired: true,
    lowerCaseRequired: true,
    allowedSpecialCharacters: ['@', '#', '$', '%', '^', '&', '*']
  };
}
```

```html
<mcv-password-field
  label="Password"
  [required]="true"
  [canDisplayEye]="true"
  [showTooltip]="true"
  [validationRules]="passwordRules"
  [(ngModel)]="password"
  (statusChange)="onPasswordChange($event)">
</mcv-password-field>
```

---

### 4. McvTextArea

Multi-line text input with length validation.

#### Inputs

```typescript
@Input() label: string = '';
@Input() value: string = '';
@Input() placeholder: string = '';
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() rows: number = 4;               // Number of visible rows
@Input() minLength: number = 0;
@Input() maxLength: number = Infinity;
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### Example

```html
<mcv-text-area
  label="Comments"
  placeholder="Enter your feedback"
  [rows]="6"
  [minLength]="10"
  [maxLength]="500"
  [required]="true"
  [(ngModel)]="comments"
  (statusChange)="onCommentChange($event)">
</mcv-text-area>
```

---

### 5. McvPhoneField

International phone number input with country code support.

#### Inputs

```typescript
@Input() label: string = '';
@Input() value: string = '';
@Input() placeholder: string = 'Enter phone number';
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() countryCode: string = '';       // Selected country code
@Input() showCountryCode: boolean = true; // Show country selector
@Input() defaultCountryCode: string = '+91'; // Default country code
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### Supported Countries

The component includes predefined calling codes for countries like:

- 🇮🇳 India: +91
- 🇺🇸 USA: +1
- 🇬🇧 UK: +44
- 🇮🇹 Italy: +39
- 🇩🇪 Germany: +49
- 🇫🇷 France: +33
- ...and many more. See `phone-country-codes.ts` for complete list.

#### Example

```html
<mcv-phone-field
  label="Mobile Number"
  [required]="true"
  [showCountryCode]="true"
  [defaultCountryCode]="'+91'"
  [(ngModel)]="phone"
  (statusChange)="onPhoneChange($event)">
</mcv-phone-field>
```

---

### 6. McvDatePicker

Single date selection with calendar UI.

#### Inputs

```typescript
@Input() label: string = '';
@Input() value: string = '';            // 'yyyy-MM-dd' format
@Input() placeholder: string = '';
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() min: string = '';              // Minimum date (yyyy-MM-dd)
@Input() max: string = '';              // Maximum date (yyyy-MM-dd)
@Input() format: string = 'yyyy-MM-dd'; // Display format
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### Example

```html
<mcv-date-picker
  label="Birth Date"
  [required]="true"
  min="1990-01-01"
  max="2010-12-31"
  [(ngModel)]="birthDate"
  (statusChange)="onDateSelect($event)">
</mcv-date-picker>
```

---

### 7. McvDateRangePicker

Date range selection with calendar UI.

#### Inputs

```typescript
@Input() label: string = '';
@Input() value: { start: Date | null; end: Date | null } | null;
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() min: Date | string = '';
@Input() max: Date | string = '';
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### Example

```typescript
export class ReportComponent {
  dateRange = {
    start: new Date(2024, 0, 1),
    end: new Date(2024, 11, 31)
  };
}
```

```html
<mcv-date-range-picker
  label="Report Period"
  [(ngModel)]="dateRange"
  [required]="true"
  (statusChange)="onRangeSelect($event)">
</mcv-date-range-picker>
```

---

### 8. McvTimePicker

Time selection in HH:MM format.

#### Inputs

```typescript
@Input() label: string = '';
@Input() value: string = '';            // HH:MM format
@Input() placeholder: string = '';
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() min: string = '';              // HH:MM
@Input() max: string = '';              // HH:MM
@Input() step: number = 1;              // Minute increment
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### Example

```html
<mcv-time-picker
  label="Appointment Time"
  [required]="true"
  min="09:00"
  max="17:00"
  [(ngModel)]="appointmentTime">
</mcv-time-picker>
```

---

### 9. McvCheckbox

Boolean checkbox with label.

#### Inputs

```typescript
@Input() value: boolean = false;
@Input() checked: boolean = false;      // Alias for value
@Input() label: string = '';
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### Example

```html
<mcv-checkbox
  label="I agree to terms and conditions"
  [required]="true"
  [(ngModel)]="agreeToTerms"
  (statusChange)="onAgree($event)">
</mcv-checkbox>
```

---

### 10. McvRadioField

Radio button group for single selection from multiple options.

#### Inputs

```typescript
@Input() value: string = '';
@Input() options: RadioOption[] = [];   // Available options
@Input() name: string = '';             // Radio group name
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() label: string = '';            // Group label
@Input() layout: 'horizontal' | 'vertical' = 'vertical';
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### RadioOption Interface

```typescript
export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}
```

#### Example

```typescript
export class PreferencesComponent {
  paymentOptions = [
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'Debit Card', value: 'debit_card' },
    { label: 'Net Banking', value: 'net_banking' },
    { label: 'UPI', value: 'upi' }
  ];
}
```

```html
<mcv-radio-field
  label="Payment Method"
  [options]="paymentOptions"
  layout="horizontal"
  [required]="true"
  [(ngModel)]="selectedPayment"
  (statusChange)="onPaymentChange($event)">
</mcv-radio-field>
```

---

### 11. McvToggleField

Toggle switch for boolean values.

#### Inputs

```typescript
@Input() value: boolean = false;
@Input() label: string = '';
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() onLabel: string = 'Yes';      // Label when ON
@Input() offLabel: string = 'No';      // Label when OFF
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### Example

```html
<mcv-toggle-field
  label="Enable Notifications"
  onLabel="Enabled"
  offLabel="Disabled"
  [(ngModel)]="notificationsEnabled"
  (statusChange)="onToggle($event)">
</mcv-toggle-field>
```

---

### 12. McvRichTextEditor

Rich text editor powered by Quill.js.

#### Inputs

```typescript
@Input() label: string = '';
@Input() value: string = '';            // HTML content
@Input() placeholder: string = 'Compose an epic...';
@Input() required: boolean = false;
@Input() disabled: boolean = false;
@Input() readonly: boolean = false;
@Input() modules: any = {...};          // Quill modules config
@Input() needValidationStatusMessage: boolean = true;
@Input() styles: McvFieldStyles = {};
```

#### Modules Configuration

```typescript
@Input() modules: any = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image', 'video'],
    // ... more toolbar options
  ]
};
```

#### Prerequisites

```bash
npm install quill ngx-quill
```

#### CSS Setup

Add to `styles.css`:

```css
@import 'quill/dist/quill.snow.css';
@import 'quill/dist/quill.bubble.css';
```

#### Example

```html
<mcv-rich-text-editor
  label="Article Content"
  [required]="true"
  placeholder="Write your article..."
  [(ngModel)]="articleContent"
  (statusChange)="onContentChange($event)">
</mcv-rich-text-editor>
```

---

### 13. McvFieldErrors

Helper component for displaying validation errors (used internally).

#### Inputs

```typescript
@Input() errors: string[] = [];   // Error messages
@Input() show: boolean = false;   // Show/hide errors
```

#### Example

```html
<mcv-field-errors
  [errors]="errorMessages"
  [show]="showErrors && hasErrors">
</mcv-field-errors>
```

---

## 🎨 Styling System

### McvFieldStyles Interface

All components accept a unified styling interface:

```typescript
export interface McvFieldStyles {
  // Border & Outline
  borderStyle?: string;              // e.g., '1px solid #ccc'
  outline?: string;                  // e.g., 'none'
  
  // Text & Background
  textColor?: string;                // Text color
  backgroundColor?: string;          // Background color
  
  // Focus/Active State
  activeBorderStyle?: string;        // Border when focused
  activeOutline?: string;            // Outline when focused
  activeTextColor?: string;          // Text color when focused
  activeBackgroundColor?: string;    // Background when focused
  
  // Component Specific
  sizeVariant?: 'sm' | 'md' | 'lg';  // Size variant
  selectedColor?: string;            // For checkboxes, radios
  labelColor?: string;               // Label/text color
  thumbColor?: string;               // Toggle thumb color
  trackColor?: string;               // Toggle track color
}
```

### Default Styles

Default styles use CSS variables for easy theming:

```typescript
const DEFAULT_MCV_FIELD_STYLES: McvFieldStyles = {
  borderStyle: '1px solid var(--form-border, #ccc)',
  outline: 'none',
  textColor: 'var(--form-text, #333)',
  backgroundColor: 'var(--form-bg, #fff)',
  activeBorderStyle: '1px solid var(--color-primary, #007bff)',
  activeOutline: 'none',
  activeTextColor: 'var(--form-text, #333)',
  activeBackgroundColor: 'var(--form-bg, #fff)',
  sizeVariant: 'md',
};
```

### Custom Styling Methods

#### Method 1: Global CSS Variables

```css
:root {
  --form-border: #e5e7eb;
  --form-text: #1f2937;
  --form-bg: #ffffff;
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
}
```

#### Method 2: Component Input

```html
<mcv-input-field
  label="Custom Styled"
  [styles]="{
    borderStyle: '2px solid #3b82f6',
    textColor: '#1f2937',
    backgroundColor: '#f3f4f6',
    activeBorderStyle: '2px solid #1e40af'
  }">
</mcv-input-field>
```

#### Method 3: TypeScript Variable

```typescript
export class MyComponent {
  customStyles: McvFieldStyles = {
    borderStyle: '2px solid #6366f1',
    backgroundColor: '#eef2ff',
    textColor: '#3730a3',
    activeBorderStyle: '2px solid #4f46e5',
    activeBackgroundColor: '#e0e7ff'
  };
}
```

```html
<mcv-input-field
  label="Email"
  [styles]="customStyles">
</mcv-input-field>
```

---

## ✅ Validation

### Built-in Validation

Each component includes automatic validation based on inputs:

| Component | Validations |
|-----------|-------------|
| McvInputField | Required, MinLength, MaxLength, Regex |
| McvEmailField | Required, Email Format, Multiple Emails |
| McvPasswordField | Required, MinLength, MaxLength, Uppercase, Lowercase, Numbers, Special Chars |
| McvTextArea | Required, MinLength, MaxLength |
| McvPhoneField | Required, Phone Format, Country Code Validation |
| McvDatePicker | Required, Min Date, Max Date |
| McvDateRangePicker | Required, Date Range Validation |
| McvTimePicker | Required, Min Time, Max Time |
| McvCheckbox | Required (checked) |
| McvRadioField | Required (selection) |
| McvToggleField | Required (true value) |
| McvRichTextEditor | Required, Content Length |

### Getting Validation Status

All components emit a `statusChange` event:

```typescript
export interface ValidationStatus {
  value: any;           // Current value
  valid: boolean;       // Is valid?
  errors: string[];     // Error messages
  touched: boolean;     // User interacted?
}
```

### Listening to Validation

```html
<mcv-input-field
  label="Username"
  (statusChange)="onStatusChange($event)"
  [(ngModel)]="username">
</mcv-input-field>
```

```typescript
onStatusChange(status: any) {
  console.log('Valid:', status.valid);
  console.log('Errors:', status.errors);
  console.log('Touched:', status.touched);
}
```

---

## 📚 API Reference

### Common Methods

All components implement `ControlValueAccessor` and support:

```typescript
// Set disabled state
component.setDisabledState(true);

// Get current value
const value = component.value;

// Manually trigger validation
component.validate();

// Focus field (if available)
if (component.focus) {
  component.focus();
}
```

### Event Emissions

All components emit:

```typescript
// Value changes
@Output() valueChange: EventEmitter<T>;

// Validation status changes
@Output() statusChange: EventEmitter<ValidationStatus>;
```

### Common Inputs

All components support:

```typescript
@Input() label: string;                          // Field label
@Input() required: boolean;                      // Required validation
@Input() disabled: boolean;                      // Disable input
@Input() readonly: boolean;                      // Read-only mode
@Input() needValidationStatusMessage: boolean;   // Show validation errors
@Input() styles: McvFieldStyles;                 // Custom styles
```

---

## ⚙️ Configuration

### Global Configuration (Standalone App)

#### Configure Quill for Rich Text Editor

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideQuillConfig } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'image', 'video'],
          ['clean']
        ]
      }
    })
  ]
};
```

#### CSS Setup

Add to `styles.css`:

```css
/* Quill Editor Styles */
@import 'quill/dist/quill.snow.css';
@import 'quill/dist/quill.bubble.css';

/* Theme Variables */
:root {
  --form-border: #e5e7eb;
  --form-text: #1f2937;
  --form-bg: #ffffff;
  --color-primary: #3b82f6;
}

/* Optional: Component-level styling */
mcv-input-field {
  display: block;
  margin-bottom: 1rem;
}

.mcv-field-container {
  margin-bottom: 1rem;
}

.mcv-error-text {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
```

---

## 🚀 Advanced Usage

### Reactive Forms Integration

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  McvInputField, 
  McvEmailField, 
  McvPasswordField,
  McvCheckbox 
} from 'mcv-ui-toolkit';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    McvInputField,
    McvEmailField,
    McvPasswordField,
    McvCheckbox
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mcv-input-field
        label="Full Name"
        formControlName="fullName"
        [required]="true">
      </mcv-input-field>

      <mcv-email-field
        label="Email"
        formControlName="email"
        [required]="true">
      </mcv-email-field>

      <mcv-password-field
        label="Password"
        formControlName="password"
        [required]="true">
      </mcv-password-field>

      <mcv-checkbox
        label="I agree to terms"
        formControlName="agreeToTerms"
        [required]="true">
      </mcv-checkbox>

      <button [disabled]="!form.valid">Register</button>
    </form>
  `
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

### Dynamic Fields

```typescript
export class DynamicFormComponent {
  @Input() fields: FormField[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: any = {};
    this.fields.forEach(field => {
      group[field.name] = ['', field.validators];
    });
    this.form = this.fb.group(group);
  }
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  validators: any[];
}
```

### Custom Validators

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static phoneNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(control.value) ? null : { invalidPhone: true };
  }

  static passwordStrength(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    const valid = hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    return valid ? null : { weakPassword: true };
  }
}
```

---

## 📋 Form Integration

### Two-Way Binding

```html
<mcv-input-field
  label="Username"
  [(ngModel)]="username">
</mcv-input-field>
```

### Reactive Forms Integration

```html
<form [formGroup]="form">
  <mcv-input-field
    label="Username"
    formControlName="username">
  </mcv-input-field>
</form>
```

### Template Driven Forms

```html
<form (ngSubmit)="onSubmit()" #form="ngForm">
  <mcv-input-field
    label="Email"
    [(ngModel)]="email"
    name="email"
    required>
  </mcv-input-field>
  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

---

## 💡 Examples

Complete example implementations are available in the documentation for all 13 components working together.

---

## 🎯 Best Practices

### 1. Always Provide Labels

```html
<!-- ✅ Good -->
<mcv-input-field label="Email" ...></mcv-input-field>

<!-- ❌ Avoid -->
<mcv-input-field ...></mcv-input-field>
```

### 2. Use Reactive Forms for Complex Forms

```typescript
// ✅ Recommended for complex forms
this.form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]]
});
```

### 3. Handle Validation Status

```html
<!-- Always listen to statusChange for real-time validation -->
<mcv-input-field
  (statusChange)="onStatusChange($event)"
  [(ngModel)]="value">
</mcv-input-field>
```

### 4. Style Consistently

```typescript
// Define styles as constants
export const FORM_STYLES: McvFieldStyles = {
  borderStyle: '1px solid #e5e7eb',
  textColor: '#1f2937',
  backgroundColor: '#f9fafb'
};
```

### 5. Disable Submit Button on Invalid Form

```html
<button [disabled]="!form.valid" type="submit">
  {{ form.valid ? 'Submit' : 'Fix Errors' }}
</button>
```

### 6. Reset Forms Properly

```typescript
resetForm() {
  this.form.reset();
  this.submitted = false;
  this.form.markAsUntouched();
}
```

---

## 🔧 Troubleshooting

### Component Not Rendering

**Problem:** Component elements not showing in DOM.

**Solution:** 
```typescript
// Make sure component is imported
import { McvInputField } from 'mcv-ui-toolkit';

@Component({
  imports: [McvInputField]  // Add to imports
})
```

### Validation Not Triggering

**Problem:** Validation errors not showing.

**Solution:**
```html
<!-- Make sure needValidationStatusMessage is true -->
<mcv-input-field
  [needValidationStatusMessage]="true"
  [required]="true">
</mcv-input-field>
```

### Rich Text Editor Not Working

**Problem:** Rich text editor appears broken or styles missing.

**Solution:**
```css
/* Add to styles.css */
@import 'quill/dist/quill.snow.css';
@import 'quill/dist/quill.bubble.css';
```

### Two-Way Binding Not Working

**Problem:** ngModel not updating component value.

**Solution:**
```html
<!-- Use proper syntax -->
<mcv-input-field
  [(ngModel)]="value">  <!-- Use [( )] for two-way binding -->
</mcv-input-field>

<!-- In component -->
value = '';  // Initialize property
```

### Styling Not Applied

**Problem:** Custom styles not showing effect.

**Solution:**
```typescript
// Ensure McvFieldStyles object is properly passed
const styles: McvFieldStyles = {
  borderStyle: '2px solid blue',
  textColor: '#333',
  backgroundColor: '#fff'
};

// Pass to component
<mcv-input-field [styles]="styles"></mcv-input-field>
```

---

## 📝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

---

## 📄 License

MIT License - see LICENSE file for details.

---

## 🤝 Support

For issues, questions, or suggestions:

- 📧 Email: gnana.prakash@example.com
- 🐞 GitHub Issues: [Issues Page](https://github.com/M-Gnana-prakash/mcv_ui_toolkit/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/M-Gnana-prakash/mcv_ui_toolkit/discussions)

---

## 📦 Version History

### v0.0.1 (Current)
- Initial release
- 13 form components
- Full validation support
- Customizable styling
- Rich text editor integration

---

## 🙏 Acknowledgments

- Built with [Angular 18+](https://angular.io/)
- Rich text editing powered by [Quill.js](https://quilljs.com/)
- [ngx-quill](https://github.com/KillerCodeMonkey/ngx-quill) for Quill integration

---

**Made with ❤️ by [M Gnana Prakash]**

**Last Updated:** March 12, 2026

