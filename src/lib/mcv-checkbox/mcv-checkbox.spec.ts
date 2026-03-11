import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvCheckbox } from './mcv-checkbox';

describe('McvCheckbox', () => {
  let component: McvCheckbox;
  let fixture: ComponentFixture<McvCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McvCheckbox]
    })
      .compileComponents();

    fixture = TestBed.createComponent(McvCheckbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle checked state', () => {
    component.toggle();
    expect(component.value).toBe(true);
    component.toggle();
    expect(component.value).toBe(false);
  });

  it('should validate required state', () => {
    component.required = true;
    component.value = false;
    component.validate();
    expect(component.errors.length).toBeGreaterThan(0);

    component.value = true;
    component.validate();
    expect(component.errors.length).toBe(0);
  });

  it('should emit statusChange on toggle', () => {
    let emittedData: any;
    component.statusChange.subscribe(data => emittedData = data);
    component.toggle();
    expect(emittedData.value).toBe(true);
    expect(emittedData.valid).toBe(true);
  });
});
