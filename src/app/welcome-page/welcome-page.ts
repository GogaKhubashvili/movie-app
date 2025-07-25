import {
  ChangeDetectorRef,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { TmdbService } from '../shared/api.service';
import { Router } from '@angular/router';
import { Search } from '../search/search';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [Search],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
})
export class WelcomePage {
  private tmdb = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);
  private rooter = inject(Router);

  popularMovieDetails: WritableSignal<any | null> = signal(null);
  newMovieDetails: WritableSignal<any | null> = signal(null);
  upcomingMovieDetails: WritableSignal<any | null> = signal(null);

  ngOnInit() {
    this.onPopularMovies();
    this.onNewMovies();
    this.onUpcomingMovies();
  }

  onPopularMovies() {
    this.tmdb.getPopularMovies().subscribe({
      next: (movieData) => {
        this.popularMovieDetails.set(movieData);
        // console.log(this.popularMovieDetails());
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('TMDb API error:', err);
        this.popularMovieDetails.set([]);
        this.cdr.detectChanges();
      },
    });
  }

  onNewMovies() {
    this.tmdb.getNewPlayingMovies().subscribe({
      next: (movieData) => {
        this.newMovieDetails.set(movieData);
        // console.log(this.newMovieDetails());
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('TMDb API error:', err);
        this.newMovieDetails.set([]);
        this.cdr.detectChanges();
      },
    });
  }

  onUpcomingMovies() {
    this.tmdb.getUpcomingMovies().subscribe({
      next: (movieData) => {
        this.upcomingMovieDetails.set(movieData);
        // console.log(this.upcomingMovieDetails());
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('TMDb API error:', err);
        this.upcomingMovieDetails.set([]);
        this.cdr.detectChanges();
      },
    });
  }

  /////////////////////////////////////////////////////////////////////
  handleSearch(query: string) {
    if (query) {
      this.rooter.navigate(['/movies'], { queryParams: { q: query } });
    }
  }

  ////////////////////////////////////////////////////////////////////
  // Go To Trailer
  goToTrailerPage(movieId: number) {
    this.rooter.navigate(['/trailer', movieId]);
  }
}
