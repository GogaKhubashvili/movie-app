import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../shared/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-trailer',
  standalone: true,
  imports: [CommonModule, Loader],
  templateUrl: './trailer.html',
  styleUrl: './trailer.scss',
})
export class Trailer {
  private tmdb = inject(TmdbService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  movieDetails: WritableSignal<SafeResourceUrl | null> = signal(null);
  loader: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      this.loader.set(true);

      if (movieId) {
        this.tmdb.getMovieVideos(+movieId).subscribe({
          next: (url: string | null) => {
            this.loader.set(false);
            if (url) {
              const embedUrl = `https://www.youtube.com/embed/${url}?autoplay=1`;
              this.movieDetails.set(
                this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl)
              );
              // console.log(this.movieDetails());
            }
          },
        });
      }
    });
  }
}
