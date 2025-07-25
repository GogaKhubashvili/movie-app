import { Component, inject, input, InputSignal } from '@angular/core';
import { TmdbService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cast',
  standalone: true,
  imports: [],
  templateUrl: './cast.html',
  styleUrl: './cast.scss',
})
export class Cast {
  private tmdb = inject(TmdbService);
  private router = inject(Router);

  singleMovieDatails: InputSignal<any | null> = input<any | null>(null);

  ////////////////////////////////////////////////////////////////
  goToAllCast() {
    const movieId = this.singleMovieDatails()?.id;
    // console.log('Navigating to AllCast. Movie ID:', movieId);
    if (movieId) {
      this.router.navigate(['/all-cast'], {
        queryParams: { movieId: movieId },
      });
    } else {
      // console.warn('Movie ID not available to navigate to all cast list.');
      this.router.navigate(['/movies']);
    }
  }
}
