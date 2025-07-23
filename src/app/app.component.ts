import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MovieListService } from './services/movie-list.service';

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
  constructor(private readonly movieListService: MovieListService) {}

  ngOnInit(): void {}
}
