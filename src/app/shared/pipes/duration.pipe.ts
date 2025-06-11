import { Pipe } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe {
  transform(value: number): string {
    if (typeof value !== 'number' || isNaN(value) || value < 0) {
      return '';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hoursText = hours.toString().padStart(2, '0');
    const minutesText = minutes.toString().padStart(2, '0');

    const hoursLabel = hours <= 1 ? 'hour' : 'hours';

    return `${hoursText}:${minutesText} ${hoursLabel}`;
  }
}
