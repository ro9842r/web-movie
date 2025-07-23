import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicGuard } from './core/guards/public.guard';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Movie App | Login',
    canActivate: [PublicGuard],
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'my-movie-lists',
    title: 'Movie App | My Movie Lists',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import(
        './pages/movie-lists-overview/movie-lists-overview.component'
      ).then((m) => m.MovieListsOverviewComponent),
  },

  {
    path: 'movie-lists/:id',
    title: 'Movie List Detail',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/movie-list-detail/movie-list-detail.component').then(
        (m) => m.MovieListDetailComponent
      ),
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
