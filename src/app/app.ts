import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Use TMDB API to search & browse movies
  // RxJS operators - bounceTime & switchMap
  private router = inject(Router);

  goWelcomePage(): void {
    this.router.navigate(['/welcome']);
  }
}
