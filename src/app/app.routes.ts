import { Routes } from '@angular/router';
import { AllMovies } from './all-movies/all-movies';
import { SingleMovie } from './single-movie/single-movie';
import { WelcomePage } from './welcome-page/welcome-page';
import { Trailer } from './trailer/trailer';
import { AllCast } from './all-cast/all-cast';
import { SingleActor } from './single-actor/single-actor';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePage },
  { path: 'movies', component: AllMovies },
  { path: 'movie/:id', component: SingleMovie },
  { path: 'trailer/:id', component: Trailer },
  { path: 'all-cast', component: AllCast },
  { path: 'single-actor/:id', component: SingleActor },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome' },
];
