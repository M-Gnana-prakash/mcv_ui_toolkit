export interface CountryCode {
    code: string;
    name: string;
}

export const COUNTRY_CODES: CountryCode[] = [
    { code: '+91', name: 'India' },
    { code: '+1', name: 'USA' },
    { code: '+44', name: 'UK' },
    { code: '+61', name: 'Australia' },
    { code: '+81', name: 'Japan' },
    { code: '+86', name: 'China' },
    { code: '+971', name: 'UAE' },
    { code: '+92', name: 'Pakistan' },
    { code: '+880', name: 'Bangladesh' },
    { code: '+94', name: 'Sri Lanka' },
];

/** Expected local phone number digit count per country code */
export const PHONE_MAX_LENGTH_BY_COUNTRY: { [code: string]: number } = {
    '+91': 10,
    '+1': 10,
    '+44': 10,
    '+61': 9,
    '+81': 10,
    '+86': 11,
    '+971': 9,
    '+92': 10,
    '+880': 11,
    '+94': 9,
};
