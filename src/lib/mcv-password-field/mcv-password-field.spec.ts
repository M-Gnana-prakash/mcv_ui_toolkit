import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McvPasswordField } from './mcv-password-field';

describe('McvPasswordField', () => {
    let component!: McvPasswordField;
    let fixture!: ComponentFixture<McvPasswordField>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [McvPasswordField]
        })
            .compileComponents();

        fixture = TestBed.createComponent(McvPasswordField);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle password visibility', () => {
        expect(component.showPassword).toBe(false);
        component.toggleVisibility();
        expect(component.showPassword).toBe(true);
        component.toggleVisibility();
        expect(component.showPassword).toBe(false);
    });

    it('should validate required constraint', () => {
        component.required = true;
        component.value = '';
        component.validate();
        expect(component.errors).toContain('Password is required');
    });

    it('should validate all password rules', () => {
        component.value = 'abc';
        component.validate();
        expect(component.validationRules.minLength).toBe(false);
        expect(component.validationRules.uppercase).toBe(false);
        expect(component.validationRules.lowercase).toBe(true);
        expect(component.validationRules.number).toBe(false);
        expect(component.validationRules.specialChar).toBe(false);
        expect(component.isValid).toBe(false);

        component.value = 'Abc12345';
        component.validate();
        expect(component.validationRules.minLength).toBe(true);
        expect(component.validationRules.uppercase).toBe(true);
        expect(component.validationRules.lowercase).toBe(true);
        expect(component.validationRules.number).toBe(true);
        expect(component.validationRules.specialChar).toBe(false);
        expect(component.isValid).toBe(false);

        component.value = 'Abc12345!';
        component.validate();
        expect(component.isValid).toBe(true);
    });

    it('should set isDirty to true on input change', () => {
        expect(component.isDirty).toBe(false);
        component.onInputChange({ target: { value: 'test' } } as any);
        expect(component.isDirty).toBe(true);
    });

    it('should emit statusChange on validation', () => {
        let emittedData: any;
        component.statusChange.subscribe(data => emittedData = data);

        component.value = 'secret123';
        component.validate();

        expect(emittedData.value).toBe('secret123');
        expect(emittedData.value).toBe('secret123');
    });

    it('should handle rapid password validations (stress test)', () => {
        const start = performance.now();
        // Default minLength is 8, so we use passwords length >= 8
        for (let i = 0; i < 1000; i++) {
            component.value = `password${i}`;
            component.validate();
        }
        const end = performance.now();
        expect(end - start).toBeLessThan(500);
        expect(component.errors.length).toBe(0);
    });
});
