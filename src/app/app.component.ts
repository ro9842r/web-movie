import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SidenavComponent } from './layout/sidenav.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-root',
  imports: [
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
      class="relative min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
    >
      <app-sidenav></app-sidenav>

      <!-- Content -->

      <div class="bg-white dark:bg-gray-700 p-4 rounded shadow ">
        <p-scrollpanel [style]="{ width: '100%', height: '90vh' }">
          <router-outlet></router-outlet>
        </p-scrollpanel>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'web-movie';
}
