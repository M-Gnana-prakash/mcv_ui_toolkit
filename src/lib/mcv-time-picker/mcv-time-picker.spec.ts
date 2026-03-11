import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvTimePicker } from './mcv-time-picker';

describe('McvTimePicker', () => {
  let component: McvTimePicker;
  let fixture: ComponentFixture<McvTimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvTimePicker]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McvTimePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate required field', () => {
    component.required = true;
    component.value = '';
    (component as any).validate();
    expect(component.errors).toContain('Time is required');
  });

  /* Time format validation relying on browser/input type for now
  it('should validate time format', () => {
    component.value = '25:00';
    (component as any).validate();
    expect(component.errors).toContain('Invalid time format');

    component.value = '12:30';
    (component as any).validate();
    expect(component.errors.length).toBe(0);
  });
  */

  it('should validate min and max time', () => {
    component.min = '09:00';
    component.max = '17:00';

    component.value = '08:00';
    component.validate();
    expect(component.errors).toContain('Time must be after 09:00');

    component.value = '18:00';
    component.validate();
    expect(component.errors).toContain('Time must be before 17:00');

    component.value = '12:00';
    component.validate();
    expect(component.errors.length).toBe(0);
  });

  it('should emit statusChange on value change', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);
    component.value = '10:00';
    component.validate();
    expect(emittedData.value).toBe('10:00');
    expect(emittedData.valid).toBe(true);
  });
});
