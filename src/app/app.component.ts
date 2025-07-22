import { MoviesService } from './services/movie.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  template: `
    <p-toast></p-toast>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  title = 'web-movie';
  constructor(private readonly movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getGenres().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
