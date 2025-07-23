import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { NgClass } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { LottieAnimationService } from '../services/lottie-animation.service';
import { createSidebarAnimationTimeline } from '../core/animations/gsap-animations';
import { AuthService } from '../core/services/auth.service';
import { CreateMovieListComponent } from '../components/create-movie-list/create-movie-list.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    LottieComponent,
    RouterLink,
    RouterLinkActive,
    TooltipModule,
    RippleModule,
    NgClass,
    DialogModule,
    ButtonModule,
    CreateMovieListComponent,
  ],
  templateUrl: './sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  lottieAnimation = viewChild<LottieComponent>('lottieAnimation');
  settingsLottie = viewChild<LottieComponent>('settingsLottie');

  expanded = signal(false);
  displayLogoutDialog = signal(false);
  displayCreateMovieListModal = signal(false);

  toggleAnimationOptions: AnimationOptions = {
    path: '/assets/animations/sidenav-toggle.json',
    loop: false,
    autoplay: false,
  };

  settingsLottieOptions: AnimationOptions = {
    path: '/assets/animations/settings-icon.json',
    loop: false,
    autoplay: false,
  };

  sidenav = viewChild.required<ElementRef<HTMLDivElement>>('sidenav');
  private readonly timeline = signal<gsap.core.Timeline | null>(null);

  menuItems = signal<MenuItem[]>([
    {
      label: 'Add',
      icon: 'pi pi-plus',
      type: 'action',
      action: () => {
        this.displayCreateMovieListModal.set(true);
      },
    },
    {
      label: ' Lists',
      icon: 'pi pi-list',
      route: 'my-movie-lists',
      type: 'link',
    },
  ]);

  constructor(private readonly lottieAnimationService: LottieAnimationService) {
    afterNextRender(() => {
      const navEl = this.sidenav().nativeElement;
      const tl = createSidebarAnimationTimeline(navEl);
      this.timeline.set(tl);
    });

    effect(() => {
      const tl = this.timeline();
      if (tl) {
        if (this.expanded()) {
          tl.play();
        } else {
          tl.reverse();
        }
      }
    });
  }

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  openLogoutDialog() {
    this.displayLogoutDialog.set(true);
  }

  confirmLogout() {
    this.authService.logout();
    this.displayLogoutDialog.set(false);
    this.router.navigate(['/login']);
  }

  cancelLogout() {
    this.displayLogoutDialog.set(false);
  }

  animationCreated(animationItem: AnimationItem): void {
    this.lottieAnimationService.registerAnimation(
      'sidenavToggle',
      animationItem
    );
  }

  settingsAnimationCreated(animationItem: AnimationItem): void {
    this.lottieAnimationService.registerAnimation(
      'settingsIcon',
      animationItem
    );
  }

  toggleSidebar(): void {
    this.expanded.update((value) => !value);
    if (this.expanded()) {
      this.lottieAnimationService.play('sidenavToggle', [0, 60], true);
    } else {
      this.lottieAnimationService.play('sidenavToggle', [45, 0], true);
    }
  }

  onSettingsMouseEnter(): void {
    this.lottieAnimationService.play('settingsIcon');
  }

  onSettingsMouseLeave(): void {
    this.lottieAnimationService.stop('settingsIcon');
    this.lottieAnimationService.goToAndStop('settingsIcon', 0, true);
  }

  onMovieListCreated(): void {
    this.displayCreateMovieListModal.set(false);
  }
}
