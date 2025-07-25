import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twentyWords',
  standalone: true,
})
export class TwentyWordsPipe implements PipeTransform {
  transform(value: string | undefined | null, wordLimit: number = 20): string {
    if (!value) return '';

    const words = value.split(/\s+/);
    if (words.length <= wordLimit) return value;

    return words.slice(0, wordLimit).join(' ') + '...';
  }
}
