import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvDatePicker } from './mcv-date-picker';

describe('McvDatePicker', () => {
  let component: McvDatePicker;
  let fixture: ComponentFixture<McvDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvDatePicker]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McvDatePicker);
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
    expect(component.errors).toContain('Date is required');
  });

  it('should validate minimum date', () => {
    component.min = '2023-01-01';
    component.value = '2022-12-31';
    component.validate();
    expect(component.errors).toContain('Date should be on or after 2023-01-01');

    component.value = '2023-01-01';
    component.validate();
    expect(component.errors.length).toBe(0);
  });

  it('should validate maximum date', () => {
    component.max = '2023-12-31';
    component.value = '2024-01-01';
    component.validate();
    expect(component.errors).toContain('Date should be on or before 2023-12-31');

    component.value = '2023-12-31';
    component.validate();
    expect(component.errors.length).toBe(0);
  });

  it('should emit statusChange on validation', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);
    component.value = '2023-05-20';
    component.validate();
    expect(emittedData.value).toBe('2023-05-20');
    expect(emittedData.valid).toBe(true);
  });

  it('should handle rapid validation cycles (stress test)', () => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      component.value = `2023-01-01`;
      component.validate();
    }
    const end = performance.now();
    expect(end - start).toBeLessThan(500);
    expect(component.errors.length).toBe(0);
  });
});
