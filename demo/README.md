# 🖼️ Mcv UI Toolkit - Component Showcase

This directory contains a live showcase example of all the components available in the `mcv-ui-toolkit`.

## 🚀 Components at a Glance

### 1. Form Fields
| Component | Code Snippet | Purpose |
| :--- | :--- | :--- |
| **Input** | `<mcv-input-field label="Name">` | Standard text/number input with validation. |
| **Password** | `<mcv-password-field [showTooltip]="true">` | Secure entry with dynamic rule validation. |
| **Email** | `<mcv-email-field label="Email">` | Pre-configured email validation. |
| **Phone** | `<mcv-phone-field [showCountryCode]="true">` | Formatted phone input with country selectors. |

### 2. Specialized Pickers
- **Date Picker**: `mcv-date-picker` - Robust calendar-based date entry.
- **Date Range**: `mcv-date-range-picker` - Select start and end dates with a premium range UI.
- **Time Picker**: `mcv-time-picker` - Time selection with min/max bounds.

### 3. Rich Content
- **Rich Text Editor**: `mcv-rich-text-editor` - Integrated Quill editor for formatted content.

### 4. Selection & Toggles
- **Radio Group**: `mcv-radio-field` - Support for horizontal and vertical layouts.
- **Checkbox**: `mcv-checkbox` - Accessible and stylized check controls.
- **Toggle**: `mcv-toggle-field` - Smoothly animated switch with custom labels.

---

## 🛠️ How to run the Showcase

To see these components in action in your own Angular project:

1. **Install the library**:
   ```bash
   npm install M-Gnana-prakash/mcv_ui_toolkit
   ```

2. **Import components**:
   In your component file:
   ```typescript
   import { McvInputField, McvPasswordField } from 'mcv-ui-toolkit';

   @Component({
     standalone: true,
     imports: [McvInputField, McvPasswordField],
     // ...
   })
   ```

3. **Use the Showcase Source**:
   Copy the code from [showcase.component.ts](./showcase.component.ts) into your local development app to see how all components are configured.

---

## 💅 Built-in Professional Styling
All components come with a built-in "Premium" theme. You don't need Tailwind CSS to use them.

**Customization Example:**
```html
<mcv-input-field 
  [styles]="{ 
    sizeVariant: 'lg', 
    activeBorderStyle: '2px solid #6366f1',
    backgroundColor: '#f5f3ff' 
  }" 
  label="Custom Pro Input">
</mcv-input-field>
```
