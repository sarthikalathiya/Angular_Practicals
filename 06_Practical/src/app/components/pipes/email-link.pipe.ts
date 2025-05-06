import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailLink',
  standalone: true
})
export class EmailLinkPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return `<a href="mailto:${value}">${value}</a>`;
  }
} 