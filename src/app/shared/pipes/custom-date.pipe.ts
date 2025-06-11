import { DatePipe } from '@angular/common';
import { Pipe } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe {
  transform(value: Date | string): string {
    const date = typeof value === 'string' ? new Date(value) : value;

    if (isNaN(date.getTime())) {
      return '';
    }

    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'dd.MM.yyyy') || '';
  }
}
