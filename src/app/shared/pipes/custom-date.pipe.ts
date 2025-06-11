import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    // Add your code here
    constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'MMMM d, yyyy'): string | null {
    if (!value) {
      return null;
    }

    // Check if the value is in the expected dd/MM/yyyy format
    const dateParts = value.split('/');
    if (dateParts.length === 3) {
      // Construct a new date object
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Month is zero-indexed in JavaScript Date
      const year = parseInt(dateParts[2], 10);

      const date = new Date(year, month, day);

      // Format the date using Angular's DatePipe
      return this.datePipe.transform(date, format);
    }

    // Return null if the input date format is incorrect
    return null;
  }
}
