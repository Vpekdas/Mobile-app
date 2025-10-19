export function validatePhoneNumber(phone: string): boolean {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
}

export function validateRequiredField(field: string): boolean {
    return field.trim().length > 0;
}