import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvPhoneField } from './mcv-phone-field';

describe('McvPhoneField', () => {
  let component: McvPhoneField;
  let fixture: ComponentFixture<McvPhoneField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvPhoneField]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McvPhoneField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show required error message', () => {
    component.required = true;
    component.value = '';
    component.validate();
    expect(component.errors).toContain('Phone Number is required');
  });

  it('should validate phone number format', () => {
    component.value = 'abc';
    component.validate();
    expect(component.errors).toContain('Invalid phone number format');

    component.value = '1234567890';
    component.validate();
    expect(component.errors.length).toBe(0);
  });

  it('should validate minimum length (10 digits)', () => {
    component.value = '12345';
    component.validate();
    expect(component.errors).toContain('Phone number should be at least 10 digits');

    component.value = '1234567890';
    component.validate();
    expect(component.errors.length).toBe(0);
  });

  it('should handle country code change', () => {
    const event = { target: { value: '+1' } } as any;
    component.onCountryCodeChange(event);
    expect(component.countryCode).toBe('+1');
  });

  it('should emit statusChange on validation', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);
    component.countryCode = '+91';
    component.value = '9876543210';
    component.validate();
    expect(emittedData.value).toBe('9876543210');
    expect(emittedData.fullValue).toBe('+919876543210');
    expect(emittedData.valid).toBe(true);
  });

  it('should handle rapid validation cycles (stress test)', () => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      component.value = `987654321${i % 10}`;
      component.validate();
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(500);
    expect(component.errors.length).toBe(0);
  });
});
