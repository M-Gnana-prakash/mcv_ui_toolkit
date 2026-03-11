import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvDateRangePicker } from './mcv-date-range-picker';

describe('McvDateRangePicker', () => {
  let component: McvDateRangePicker;
  let fixture: ComponentFixture<McvDateRangePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvDateRangePicker]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McvDateRangePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Validation logic not yet implemented in component
  /*
  it('should validate required date range', () => {
    component.required = true;
    component.start = null;
    component.end = null;
    (component as any).validate();
    expect(component.errors).toContain('Date range is required');
  });

  it('should validate date order (start before end)', () => {
    component.start = new Date('2023-12-31');
    component.end = new Date('2023-01-01');
    (component as any).validate();
    expect(component.errors).toContain('Start date must be before end date');
  });

  it('should validate min and max dates', () => {
    component.min = new Date('2023-01-01');
    component.max = new Date('2023-12-31');

    component.start = new Date('2022-12-31');
    (component as any).validate();
    expect(component.errors).toContain('Start date is before minimum allowed');

    component.end = new Date('2024-01-01');
    (component as any).validate();
    expect(component.errors).toContain('End date is after maximum allowed');
  });
  */

  it('should emit statusChange on date changes', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);

    // Simulate selection
    const d1 = new Date('2023-05-01');
    const d2 = new Date('2023-05-10');

    component.select(d1); // Selects start
    component.select(d2); // Selects end

    expect(emittedData.start).toEqual(d1);
    expect(emittedData.end).toEqual(d2);
  });

  it('should add correct padding in buildCalendar', () => {
    // January 2026 starts on Thursday (weekday 4)
    component.current = new Date(2026, 0, 1);
    component.buildCalendar();

    // There should be 4 null elements before 1st of January
    const paddingCount = component.days.filter(d => d === null).length;
    expect(paddingCount).toBe(4);
    expect(component.days[4]?.getDate()).toBe(1);
  });
});
