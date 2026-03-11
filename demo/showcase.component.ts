import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    McvInputField,
    McvPasswordField,
    McvEmailField,
    McvPhoneField,
    McvDatePicker,
    McvDateRangePicker,
    McvRadioField,
    McvCheckbox,
    McvToggleField,
    McvTextArea,
    McvTimePicker,
    McvRichTextEditor
} from '../src/public-api';

@Component({
    selector: 'app-demo-showcase',
    standalone: true,
    imports: [
        CommonModule,
        McvInputField,
        McvPasswordField,
        McvEmailField,
        McvPhoneField,
        McvDatePicker,
        McvDateRangePicker,
        McvRadioField,
        McvCheckbox,
        McvToggleField,
        McvTextArea,
        McvTimePicker,
        McvRichTextEditor
    ],
    template: `
    <div class="demo-container">
      <header>
        <h1>💎 Mcv UI Toolkit Showcase</h1>
        <p>A collection of premium, professional, and accessible Angular components.</p>
      </header>

      <section class="demo-grid">
        <!-- Text Inputs -->
        <div class="card">
          <h2>Text & Email Fields</h2>
          <mcv-input-field label="Full Name" placeholder="e.g. John Doe" [required]="true"></mcv-input-field>
          <mcv-email-field label="Email Address" placeholder="john@example.com"></mcv-email-field>
          <mcv-text-area label="Bio" placeholder="Tell us about yourself..." [rows]="3"></mcv-text-area>
        </div>

        <!-- Security -->
        <div class="card">
          <h2>Security</h2>
          <mcv-password-field 
              label="Password" 
              [showTooltip]="true" 
              [validationRules]="{ minLength: 8, upperCaseRequired: true, numericsAllowed: true }">
          </mcv-password-field>
        </div>

        <!-- Communication & Contact -->
        <div class="card">
          <h2>Contact</h2>
          <mcv-phone-field label="Phone Number" [showCountryCode]="true"></mcv-phone-field>
        </div>

        <!-- Pickers -->
        <div class="card">
          <h2>Date & Time</h2>
          <mcv-date-picker label="Birth Date"></mcv-date-picker>
          <mcv-time-picker label="Meeting Time"></mcv-time-picker>
          <mcv-date-range-picker label="Stay Period"></mcv-date-range-picker>
        </div>

        <!-- Selection Controls -->
        <div class="card">
          <h2>Selection Controls</h2>
          <mcv-radio-field 
            label="Gender" 
            [options]="[
              { label: 'Male', value: 'm' },
              { label: 'Female', value: 'f' },
              { label: 'Other', value: 'o' }
            ]" 
            layout="horizontal">
          </mcv-radio-field>
          
          <div style="display: flex; gap: 2rem; margin-top: 1rem;">
            <mcv-checkbox label="I agree to terms"></mcv-checkbox>
            <mcv-toggle-field label="Dark Mode" onLabel="ON" offLabel="OFF"></mcv-toggle-field>
          </div>
        </div>

        <!-- Rich Text -->
        <div class="card full-width">
          <h2>Rich Text Content</h2>
          <mcv-rich-text-editor label="Detailed Post Description"></mcv-rich-text-editor>
        </div>
      </section>
    </div>
  `,
    styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      font-family: 'Inter', sans-serif;
      background: #f8fafc;
      min-height: 100vh;
    }
    header {
      margin-bottom: 3rem;
      text-align: center;
    }
    h1 {
      color: #1e293b;
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }
    header p {
      color: #64748b;
      font-size: 1.1rem;
    }
    .demo-grid {
      display: grid;
      grid-template-cols: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .card h2 {
      font-size: 1.25rem;
      color: #334155;
      margin-top: 0;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #f1f5f9;
      margin-bottom: 0.5rem;
    }
    .full-width {
      grid-column: 1 / -1;
    }
  `]
})
export class ShowcaseComponent { }
