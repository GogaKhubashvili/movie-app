import {
  Component,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../shared/api.service';

@Component({
  selector: 'app-all-cast',
  standalone: true,
  imports: [],
  templateUrl: './all-cast.html',
  styleUrl: './all-cast.scss',
})
export class AllCast {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tmdb = inject(TmdbService);

  movieDetails: WritableSignal<any | null> = signal(null);
  loading: WritableSignal<boolean> = signal(true);
  error: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const movieId = params.get('movieId');

      if (movieId) {
        this.loading.set(true);
        this.error.set(null);

        this.tmdb.getMovieDetails(+movieId).subscribe({
          next: (details: any) => {
            this.loading.set(false);
            if (details.credits && details.credits.cast) {
              this.movieDetails.set(details);
              // console.log(this.movieDetails().credits.cast);
            } else {
              this.error.set('No cast information available for this movie.');
            }
          },
          error: (err) => {
            console.error('Error fetching movie details for all cast:', err);
            this.error.set(
              `Failed to load movie details for cast: ${
                err.message || err.statusText || 'Unknown error'
              }. Please try again.`
            );
            this.loading.set(false);
            this.movieDetails.set(null);
          },
        });
      } else {
        this.error.set('No movie ID provided for all cast view.');
        this.loading.set(false);
      }
    });
  }

  ///////////////////////////////////////////////////////////////////////
  goToSingleActorPage(actorId: number) {
    this.router.navigate(['single-actor', actorId]);
  }
}
