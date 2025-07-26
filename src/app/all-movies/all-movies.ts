import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TmdbService } from '../shared/api.service';
import { FormsModule } from '@angular/forms';
import { TwentyWordsPipe } from '../pipe/twenty-words-pipe';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '../loader/loader';
import { Search } from '../search/search';
import { debounceTime, delay, of, timer } from 'rxjs';

@Component({
  selector: 'app-all-movies',
  standalone: true,
  imports: [
    FormsModule,
    // RouterOutlet
    // TwentyWordsPipe,
    CommonModule,
    Loader,
    // Search,
  ],
  templateUrl: './all-movies.html',
  styleUrl: './all-movies.scss',
})
export class AllMovies {
  private tmdb = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // query = '';
  movies: any[] = [];
  searchAttempted = false;
  loader: boolean = false;

  ngOnInit() {
    this.loader = true;

    of(null)
      .pipe(delay(3000))
      // ALSO CAN USE TIMER FUNCTION - NO UPPER CODE!!!
      // timer(3000)
      .subscribe(() => {
        this.route.queryParams.subscribe((params) => {
          const searchQuery = params['q'];
          if (searchQuery) {
            this.search(searchQuery);
          } else {
            this.movies = [];
            this.searchAttempted = false;
          }
        });
      });
  }

  search(searchQuery: string) {
    // const trimmed = this.query.trim();
    this.searchAttempted = true;
    this.loader = true;

    if (!searchQuery) {
      this.movies = [];
      return;
    }

    this.tmdb.searchMovies(searchQuery).subscribe({
      next: (res: any) => {
        this.loader = false;
        this.movies = res.results;
        // console.log(this.movies);
        // this.query = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('TMDb API error:', err);
        this.movies = [];
        this.cdr.detectChanges();
      },
    });
  }

  ///////////////////////////////////////////////////////////////////////////
  // Navigation
  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]); // Navigates to e.g., /movie/12345
  }

  /////////////////////////////////////////////////////////////////////////////
  // No image
  onImageError(event: any) {
    event.target.src = 'no-image-icon.png';
  }
}
