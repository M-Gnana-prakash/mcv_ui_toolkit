import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvToggleField } from './mcv-toogle-field';

describe('McvToggleField', () => {
    let component: McvToggleField;
    let fixture: ComponentFixture<McvToggleField>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvToggleField]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvToggleField);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle on and off', () => {
        component.toggle();
        expect(component.value).toBe(true);
        component.toggle();
        expect(component.value).toBe(false);
    });

    it('should validate required switch (must be on)', () => {
        component.required = true;
        component.value = false;
        component.validate();
        expect(component.errors.length).toBeGreaterThan(0);

        component.value = true;
        component.validate();
        expect(component.errors.length).toBe(0);
    });

    it('should emit value and status on toggle', () => {
        let emittedValue: any;
        component.valueChange.subscribe((val: boolean) => emittedValue = val);

        component.toggle();
        expect(emittedValue.value).toBe(true);
        expect(emittedValue.valid).toBe(true);
    });
});
