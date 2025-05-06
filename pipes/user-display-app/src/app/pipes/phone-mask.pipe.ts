import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
  standalone: true
})
export class PhoneMaskPipe implements PipeTransform {
  transform(phone: string): string {
    if (!phone) return '';
    
    // // Clean the phone number (remove any non-digit characters)
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 3) return cleanPhone;
    
    // Keep first and last digit, mask everything in between
    const firstDigit = cleanPhone.charAt(0);
    const lastDigit = cleanPhone.slice(-2);
    const maskedPart = '*'.repeat(cleanPhone.length - 3);
    
    return firstDigit + maskedPart + lastDigit;
  }
} 