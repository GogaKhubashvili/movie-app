import { Routes } from '@angular/router';
import { AllMovies } from './all-movies/all-movies';
import { SingleMovie } from './single-movie/single-movie';
import { WelcomePage } from './welcome-page/welcome-page';
import { Trailer } from './trailer/trailer';
import { AllCast } from './all-cast/all-cast';
import { SingleActor } from './single-actor/single-actor';

export const routes: Routes = [
  // { path: 'welcome', component: WelcomePage },
  // { path: 'movies', component: AllMovies },
  // { path: 'movie/:id', component: SingleMovie },
  // { path: 'trailer/:id', component: Trailer },
  // { path: 'all-cast', component: AllCast },
  // { path: 'single-actor/:id', component: SingleActor },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome-page/welcome-page').then((w) => w.WelcomePage),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./all-movies/all-movies').then((a) => a.AllMovies),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./single-movie/single-movie').then((s) => s.SingleMovie),
  },
  {
    path: 'trailer/:id',
    loadComponent: () => import('./trailer/trailer').then((t) => t.Trailer),
  },
  {
    path: 'all-cast',
    loadComponent: () => import('./all-cast/all-cast').then((a) => a.AllCast),
  },
  {
    path: 'single-actor/:id',
    loadComponent: () =>
      import('./single-actor/single-actor').then((s) => s.SingleActor),
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome' },
];
