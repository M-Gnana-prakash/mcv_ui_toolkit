import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McvRadioField } from './mcv-radio-field';

describe('McvRadioField', () => {
    let component: McvRadioField;
    let fixture: ComponentFixture<McvRadioField>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvRadioField]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvRadioField);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select an option', () => {
        const options = [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }];
        component.options = options;
        component.onOptionChange('1');
        expect(component.value).toBe('1');
    });

    it('should validate required field', () => {
        component.required = true;
        component.value = '';
        component.validate();
        expect(component.errors).toContain('Click any option');
    });

    it('should emit statusChange on selection', () => {
        let emittedData: any;
        component.statusChange.subscribe(data => emittedData = data);
        component.value = '1';
        component.validate();
        expect(emittedData.value).toBe('1');
        expect(emittedData.valid).toBe(true);
    });
});
