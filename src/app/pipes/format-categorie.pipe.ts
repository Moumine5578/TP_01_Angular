import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCategorie',
  standalone: true
})
export class FormatCategoriePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Je remplace les underscores par des espaces
    const formatted = value.replace(/_/g, ' ').toLowerCase();

    // je met la première lettre en majuscule
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

}
