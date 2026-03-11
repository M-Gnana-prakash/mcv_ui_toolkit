# mcv-ui-toolkit

A comprehensive, high-performance UI toolkit for Angular applications, providing a standardized suite of form components with built-in validation and flexible styling.

## 🚀 Installation

To use `mcv-ui-toolkit` in your Angular project:

### 1. Install the Package
```bash
npm install mcv-ui-toolkit
```

### 2. Install Required Dependencies
The library relies on `Quill` for rich text editing:
```bash
npm install ngx-quill quill
```

---

## 🛠️ Global Configuration

### 1. Add Styles
Include the Quill CSS in your project's `styles.css` or `angular.json`:

```css
/* src/styles.css */
@import 'quill/dist/quill.snow.css';
@import 'quill/dist/quill.bubble.css';
```

### 2. Configure Quill (Standalone)
In your `app.config.ts`, provide the global configuration for the Rich Text Editor:

```typescript
import { provideQuillConfig } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
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

---

## 📦 Components Usage

All components are **Standalone** and follow a consistent event-driven architecture.

### Core Pattern: `statusChange`
Instead of traditional `ngModel` or `formControlName`, components emit a detailed status object:

- **Input**: `[value]` - The initial or current value.
- **Output**: `(statusChange)` - Emits `{ value, valid, errors, touched }`.

#### Example Integration with Reactive Forms:
```typescript
handleStatusChange(controlName: string, event: any) {
  const control = this.form.get(controlName);
  if (control) {
    control.setValue(event.value, { emitEvent: false });
    if (!event.valid) {
      control.setErrors({ customError: true });
    } else {
      control.setErrors(null);
    }
  }
}
```

---

## 🎨 Component Reference

### 1. Rich Text Editor (`mcv-rich-text-editor`)
A full-featured WYSIWYG editor using Quill.
```html
<mcv-rich-text-editor 
  label="Biography" 
  placeholder="Enter your bio..."
  [required]="true"
  [value]="form.get('bio')?.value"
  (statusChange)="handleStatusChange('bio', $event)">
</mcv-rich-text-editor>
```

### 2. Password Field (`mcv-password-field`)
Secure input with complexity validation and "reveal" eye icon.
```html
<mcv-password-field 
  label="Password" 
  [canDisplayEye]="true"
  [required]="true"
  [regex]="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/"
  (statusChange)="handleStatusChange('password', $event)">
</mcv-password-field>
```

### 3. Date Picker (`mcv-date-picker`)
Standardized date selection.
```html
<mcv-date-picker 
  label="Date of Birth" 
  [format]="'yyyy-MM-dd'"
  [min]="'1900-01-01'"
  (statusChange)="handleStatusChange('dob', $event)">
</mcv-date-picker>
```

### 4. Phone Field (`mcv-phone-field`)
Handles country codes and phone validation.
```html
<mcv-phone-field 
  label="Contact Number" 
  [showCountryCode]="true" 
  [countryCode]="'+91'"
  (statusChange)="handleStatusChange('phone', $event)">
</mcv-phone-field>
```

### 5. Standard Input (`mcv-input-field`)
Generic text input with regex and length validation.
```html
<mcv-input-field 
  label="Full Name" 
  [minLength]="3"
  [required]="true"
  (statusChange)="handleStatusChange('name', $event)">
</mcv-input-field>
```

---

## 💅 Advanced Styling

Every component accepts a `[styles]` input of type `McvFieldStyles` for deep customization:

```typescript
const customStyles = {
  borderStyle: '1px solid #e2e8f0',
  activeBorderStyle: '1px solid #3b82f6',
  textColor: '#1e293b',
  backgroundColor: '#ffffff',
  sizeVariant: 'md' // 'sm' | 'md' | 'lg'
};
```

---

## 🛠 Building & Publishing

### Build the Library
```bash
ng build mcv-ui-toolkit
```

### Publish to NPM
```bash
cd dist/mcv-ui-toolkit
npm publish
```
