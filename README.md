# 🚀 Mcv UI Toolkit

A comprehensive, high-performance UI toolkit for Angular applications. `mcv-ui-toolkit` provides a standardized suite of **standalone** form components with built-in validation, flexible styling, and a consistent event-driven architecture.

---

## 🛠️ Installation

You can install the library directly from GitHub using `npm`:

```bash
npm install M-Gnana-prakash/mcv_ui_toolkit
```

### Required Peer Dependencies
The library relies on **Quill** for rich text editing. Ensure these are installed in your project:
```bash
npm install ngx-quill quill
```

---

## ⚙️ Global Configuration

### 1. Add Styles
Include the Quill CSS in your project's `styles.css` or `angular.json` to ensure the Rich Text Editor looks correct:

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

## 📦 Core Architecture: `statusChange`

All components in this toolkit are **Standalone** and follow a consistent event-driven pattern instead of traditional `ngModel` or `formControlName` bindings. This allows for better performance and explicit state management.

- **Input**: `[value]` - The current value of the field.
- **Output**: `(statusChange)` - Emitted whenever the value or validation status changes.
  - **Payload**: `{ value: any, valid: boolean, errors: string[], touched: boolean }`

### Example: Syncing with Reactive Forms
```typescript
handleStatusChange(controlName: string, event: any) {
  const control = this.form.get(controlName);
  if (control) {
    control.setValue(event.value, { emitEvent: false });
    // Manually setting errors if needed, though components display their own
    if (!event.valid) {
      control.setErrors({ invalid: true });
    } else {
      control.setErrors(null);
    }
  }
}
```

---

## 📘 Detailed Component API

Each component is designed to be highly configurable. Below is a detailed breakdown of the properties and events available for each.

### Common Inputs (Available on most components)
| Input | Type | Description |
| :--- | :--- | :--- |
| `label` | `string` | The text label displayed above or beside the field. |
| `value` | `any` | The current value of the component. |
| `required` | `boolean` | Whether the field must have a value (adds validation). |
| `disabled` | `boolean` | Disables user interaction. |
| `readonly` | `boolean` | Prevents editing but allows focusing. |
| `styles` | `McvFieldStyles` | Custom inline styling configuration. |
| `needValidationStatusMessage` | `boolean` | If `true`, displays built-in error messages below the field. |

---

### 1. `mcv-rich-text-editor`
A professional WYSIWYG editor.
- **Inputs**:
  - `modules`: `any` - Quill modules configuration (toolbar, etc.).
  - `placeholder`: `string` - Hint text when empty.
- **Outputs**:
  - `statusChange`: Emits validation and value state.
  - `valueChange`: Emits the HTML string on every change.

### 2. `mcv-password-field`
- **Inputs**:
  - `canDisplayEye`: `boolean` - Show/hide the password toggle button.
  - `showTooltip`: `boolean` - Show password requirements on hover.
  - `validationRules`: `PasswordValidationRules` - Set min/max length, required casing, and special characters.
  - `regex`: `string | RegExp` - Custom pattern match.
- **Outputs**:
  - `statusChange`: Emits validation and value state.

### 3. `mcv-date-picker`
- **Inputs**:
  - `format`: `string` - Display/Input format (e.g., `'yyyy-MM-dd'`).
  - `min` / `max`: `string` - Lower and upper date bounds.
- **Outputs**:
  - `statusChange`: Emits the selected date string.

### 4. `mcv-date-range-picker`
- **Inputs**:
  - `value`: `{ start: Date; end: Date }` - Selected range.
  - `min` / `max`: `Date | string` - Boundary limits.
- **Outputs**:
  - `statusChange`: Emits `{ value: { start, end }, valid, ... }`.

### 5. `mcv-phone-field`
- **Inputs**:
  - `countryCode`: `string` - Pre-selected country code (e.g., `'+91'`).
  - `showCountryCode`: `boolean` - Enables the country code dropdown.
  - `defaultCountryCode`: `string` - Fallback country code.
- **Outputs**:
  - `statusChange`: Emits `{ value, countryCode, digits, valid, ... }`.

### 6. `mcv-input-field`
- **Inputs**:
  - `type`: `string` - Native input type (`text`, `number`, etc.).
  - `minLength` / `maxLength`: `number` - Basic length validation.
  - `regex`: `string | RegExp` - Pattern validation.
  - `inputClass`: `string` - Custom CSS class for the raw input element.

### 7. `mcv-radio-field`
- **Inputs**:
  - `options`: `RadioOption[]` - Array of `{ label, value, disabled }`.
  - `name`: `string` - Unique group name.
  - `layout`: `'horizontal' | 'vertical'` - Arrangement of items.
- **Outputs**:
  - `valueChange`: Emits selected value string.

### 8. `mcv-toggle-field`
- **Inputs**:
  - `onLabel` / `offLabel`: `string` - Custom text for active/inactive states.
- **Outputs**:
  - `valueChange`: Emits boolean state.

### 9. `mcv-text-area`
- **Inputs**:
  - `rows`: `number` - Initial height of the area.
  - `minLength` / `maxLength`: `number` - Length validation.

### 10. `mcv-time-picker`
- **Inputs**:
  - `min` / `max`: `string` - Bound times (e.g., `'09:00'`).
  - `step`: `number` - Minutes increment for native pickers.

---

## 💅 Custom Styling

## 💅 Custom Styling

Every component accepts a `[styles]` input using the `McvFieldStyles` interface. You can customize colors, borders, and sizing globally or per instance.

```typescript
import { McvFieldStyles } from 'mcv-ui-toolkit';

const myStyles: McvFieldStyles = {
  borderStyle: '2px solid #555',
  activeBorderStyle: '2px solid #3b82f6',
  backgroundColor: '#f9fafb',
  sizeVariant: 'lg', // 'sm' | 'md' | 'lg'
  selectedColor: '#3b82f6' // Used for checkbox/radio/toggle
};
```

```html
<mcv-input-field [styles]="myStyles" label="Custom Styled Input"></mcv-input-field>
```

---

## 🖼️ Component Showcase
Want to see all components in action? Check out our [Demo Showcase](./demo/README.md) which includes a full gallery and implementation examples.

---

## 🏗️ Development Workflow

### Build
Run `ng build mcv-ui-toolkit` to build the project. The build artifacts will be stored in the `dist/` directory.

### Publishing
To publish the library to NPM:
```bash
# 1. Build the library
ng build mcv-ui-toolkit

# 2. Go to build folder
cd dist/mcv-ui-toolkit

# 3. Publish (ensure you are logged in to npm)
npm publish
```

---

## 📄 License
MIT © [Your Name/Organization]

