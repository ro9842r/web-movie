import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, NgxSpinnerModule],
  template: `
    <ngx-spinner type="ball-spin-clockwise" size="medium"></ngx-spinner>
    <p-toast></p-toast>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'web-movie';
}
