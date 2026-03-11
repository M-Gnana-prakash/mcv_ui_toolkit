import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvInputField } from './mcv-input-field';

describe('McvInputField', () => {
  let component!: McvInputField;
  let fixture!: ComponentFixture<McvInputField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvInputField]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McvInputField);
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
    expect(component.errors).toContain('User Name is required');
  });

  it('should validate length', () => {
    component.minLength = 3;
    component.value = 'ab';
    component.validate();
    expect(component.errors).toContain('Minimum length is 3 characters');

    component.value = 'abcdefghijk';
    component.maxLength = 10;
    component.validate();
    expect(component.errors).toContain('Maximum length is 10 characters');
  });

  it('should validate regex', () => {
    component.regex = /^[a-zA-Z]+$/;
    component.value = '123';
    component.validate();
    expect(component.errors).toContain('Invalid format');
  });

  it('should emit statusChange on validation', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);
    component.value = 'test';
    component.validate();
    expect(emittedData.value).toBe('test');
    expect(emittedData.value).toBe('test');
  });

  it('should handle input change logic', () => {
    component.onInputChange({ target: { value: 'new value' } } as any);
    expect(component.value).toBe('new value');
  });

  it('should handle rapid validation cycles (stress test)', () => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      component.value = `test${i}`;
      component.validate();
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(500); // Should be very fast
    expect(component.errors.length).toBe(0);
  });
});
