import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    // If the value is shorter than the limit, return the value as is
    if (!value) return '';
    if (value.length <= limit) return value;

    // Truncate and append ellipsis (...) if the value exceeds the limit
    return value.substring(0, limit) + '...';
  }
}
