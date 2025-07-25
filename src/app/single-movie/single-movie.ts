import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../shared/api.service';
import { TwentyWordsPipe } from '../pipe/twenty-words-pipe';
import { Loader } from '../loader/loader';
import { Cast } from '../cast/cast';

@Component({
  selector: 'app-single-movie',
  standalone: true,
  imports: [CommonModule, TwentyWordsPipe, Loader, Cast],
  templateUrl: './single-movie.html',
  styleUrl: './single-movie.scss',
})
export class SingleMovie implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tmdb = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);
  private location = inject(Location);

  movieDetails: WritableSignal<any | null> = signal(null);
  loading: WritableSignal<boolean> = signal(true);
  error: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    // console.log(
    //   'SingleMovieComponent initialized. Starting route param subscription.'
    // );

    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');

      // console.log('Route paramMap updated. Movie ID from URL:', movieId);

      if (movieId) {
        this.loading.set(true);
        this.error.set(null);

        this.tmdb.getMovieDetails(+movieId).subscribe({
          next: (details: any) => {
            // console.log('API Call Success! Received movie details:', details);
            this.loading.set(false);
            this.movieDetails.set(details);
          },
          error: (err) => {
            console.error(
              'API Call Failed! Error fetching movie details:',
              err
            );
            this.error.set(
              `Failed to load movie details: ${
                err.message || err.statusText || 'Unknown error'
              }. Please try again.`
            );
            this.loading.set(false);
            this.movieDetails.set(null);
          },
        });
      } else {
        console.warn('No movie ID found in the URL. Cannot fetch details.');
        this.error.set('No movie ID provided.');
        this.loading.set(false);
      }
    });
  }

  /////////////////////////////////////////////////////////////////////
  // Navigation
  goBack(): void {
    // this.router.navigate(['/movies']);
    this.location.back();
  }

  ///////////////////////////////////////////////////////////////////////
  toggleOverview(movie: any) {
    movie.isOverviewExpanded = !movie.isOverviewExpanded;
    this.cdr.detectChanges();
  }

  isOverviewTruncated(
    overview: string | undefined | null,
    wordLimit: number = 10
  ): boolean {
    if (!overview) return false;
    const words = overview.split(/\s+/);
    return words.length > wordLimit;
  }

  /////////////////////////////////////////////////////////////
  // No image
  onImageError(event: any) {
    event.target.src = 'no-image-icon.png';
  }

  //////////////////////////////////////////////////////////////////////
  // No profile
  onProfileError(event: any) {
    event.target.src = 'no-image-icon.png';
  }
}
