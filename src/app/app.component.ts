import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SidenavComponent } from './layout/sidenav.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    ToastModule,
    NgxSpinnerModule,
    SidenavComponent,
    ScrollPanelModule,
  ],
  template: `
    <ngx-spinner type="ball-spin-clockwise" size="medium"></ngx-spinner>
    <p-toast></p-toast>

    <div
      class="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white flex flex-row"
    >
      <!-- Sidebar -->
      <app-sidenav *ngIf="authService.isAuthenticated()"></app-sidenav>

      <!-- Content -->
      <div class="flex-1" [ngClass]="{ 'p-4': authService.isAuthenticated() }">
        <div
          *ngIf="authService.isAuthenticated()"
          class="bg-white dark:bg-gray-700 p-4 rounded shadow"
        >
          <p-scrollpanel [style]="{ width: '100%', height: '90vh' }">
            <router-outlet></router-outlet>
          </p-scrollpanel>
        </div>
        <div *ngIf="!authService.isAuthenticated()">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'web-movie';
  readonly authService = inject(AuthService);
}
