import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvTextArea } from './mcv-text-area';

describe('McvTextArea', () => {
  let component: McvTextArea;
  let fixture: ComponentFixture<McvTextArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvTextArea]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McvTextArea);
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
    expect(component.errors).toContain('Description is required');
  });

  it('should validate minimum length', () => {
    component.minLength = 10;
    component.value = 'short';
    component.validate();
    expect(component.errors).toContain('Minimum length is 10 characters');

    component.value = 'this is long enough';
    component.validate();
    expect(component.errors.length).toBe(0);
  });

  it('should validate maximum length', () => {
    component.maxLength = 5;
    component.value = 'too long';
    component.validate();
    expect(component.errors).toContain('Maximum length is 5 characters');

    component.value = 'fine';
    component.validate();
    expect(component.errors.length).toBe(0);
  });

  it('should emit statusChange on validation', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);
    component.value = 'some text';
    component.validate();
    expect(emittedData.value).toBe('some text');
    expect(emittedData.valid).toBe(true);
  });

  it('should handle rapid validation cycles (stress test)', () => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      component.value = `text ${i}`;
      component.validate();
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(500);
    expect(component.errors.length).toBe(0);
  });
});
