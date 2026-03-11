export interface McvFieldStyles {
    borderStyle?: string;
    outline?: string;
    textColor?: string;
    backgroundColor?: string;
    activeBorderStyle?: string;
    activeOutline?: string;
    activeTextColor?: string;
    activeBackgroundColor?: string;
    sizeVariant?: 'sm' | 'md' | 'lg';
    // Component specific
    selectedColor?: string;
    labelColor?: string;
    thumbColor?: string;
    trackColor?: string;
}

/**
 * Default styles shared by all MCV form field components.
 * Components override this with their own `@Input() styles` if needed.
 */
export const DEFAULT_MCV_FIELD_STYLES: McvFieldStyles = {
    borderStyle: '1px solid var(--form-border, #ccc)',
    outline: 'none',
    textColor: 'var(--form-text, #333)',
    backgroundColor: 'var(--form-bg, #fff)',
    activeBorderStyle: '1px solid var(--color-primary, #007bff)',
    activeOutline: 'none',
    activeTextColor: 'var(--form-text, #333)',
    activeBackgroundColor: 'var(--form-bg, #fff)',
    sizeVariant: 'md',
};
