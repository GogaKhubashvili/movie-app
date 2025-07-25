import {
  ChangeDetectorRef,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { TmdbService } from '../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TwentyWordsPipe } from '../pipe/twenty-words-pipe';

@Component({
  selector: 'app-single-actor',
  standalone: true,
  imports: [TwentyWordsPipe],
  templateUrl: './single-actor.html',
  styleUrl: './single-actor.scss',
})
export class SingleActor {
  private tmdb = inject(TmdbService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  actorInfo: WritableSignal<any | null> = signal(null);
  isBiographyExpanded: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const personId = params.get('id');

      if (personId) {
        this.onClickActor(+personId);
      }
    });
  }

  onClickActor(personId: number) {
    if (!personId) return;

    this.tmdb.getPersonDetails(personId).subscribe({
      next: (personData) => {
        this.actorInfo.set(personData);
        // console.log(personData);
      },
    });
  }

  ///////////////////////////////////////////////////////////////////////////
  toggleBiography() {
    this.isBiographyExpanded.update((currentValue) => !currentValue);
  }

  ///////////////////////////////////////////////////////////////////////////
  // Navigation
  goToMovieDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]); // Navigates to e.g., /movie/12345
  }
}
