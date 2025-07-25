// src/app/services/tmdb.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private http = inject(HttpClient);
  private API_KEY = '7a6f747fa58d3ee5cb8aa08077aa3aa1';
  private BASE_URL = 'https://api.themoviedb.org/3';

  searchMovies(query: string) {
    return this.http.get(`${this.BASE_URL}/search/movie`, {
      params: {
        api_key: this.API_KEY,
        query,
      },
    });
  }

  getMovieDetails(movieId: number) {
    return this.http.get(`${this.BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: this.API_KEY,
        append_to_response: 'credits',
      },
    });
  }

  getPersonDetails(personId: number) {
    return this.http.get(`${this.BASE_URL}/person/${personId}`, {
      params: {
        api_key: this.API_KEY,
        append_to_response: 'movie_credits',
      },
    });
  }

  getPopularMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/popular`, {
      params: {
        api_key: this.API_KEY,
        page: page.toString(),
      },
    });
  }

  getNewPlayingMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/now_playing`, {
      params: {
        api_key: this.API_KEY,
        page: page.toString(),
      },
    });
  }

  getUpcomingMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.BASE_URL}/movie/upcoming`, {
      params: {
        api_key: this.API_KEY,
        page: page.toString(),
      },
    });
  }

  getMovieVideos(movieId: number): Observable<string | null> {
    return this.http
      .get<any>(
        `${this.BASE_URL}/movie/${movieId}/videos?api_key=${this.API_KEY}`
      )
      .pipe(
        map((response) => {
          const trailers = response.results.filter(
            (video: any) =>
              video.site === 'YouTube' &&
              video.type === 'Trailer' &&
              video.official === true
          );
          if (trailers.length > 0) {
            return trailers[0].key;
          }
          return null;
        })
      );
  }
}
