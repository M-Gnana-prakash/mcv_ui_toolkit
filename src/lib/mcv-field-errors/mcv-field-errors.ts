import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable component for displaying form field validation errors.
 *
 * Usage:
 *   <mcv-field-errors
 *     [errors]="errors"
 *     [show]="needValidationStatusMessage && errors.length > 0 && isTouched">
 *   </mcv-field-errors>
 */
@Component({
    selector: 'mcv-field-errors',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mcv-field-errors.html',
    styles: [`
        .mcv-error-container { margin-top: 0.25rem; }
        .mcv-error-text { 
            color: #ef4444; 
            font-size: 0.75rem; 
            margin-top: 0.125rem;
            font-family: inherit;
        }
    `]
})
export class McvFieldErrors {
    /** List of error messages to display */
    @Input() errors: string[] = [];

    /**
     * Controls whether the error block is visible.
     * Typically: `needValidationStatusMessage && errors.length > 0 && isTouched`
     */
    @Input() show: boolean = false;
}
