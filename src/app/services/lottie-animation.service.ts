import { Injectable, signal } from '@angular/core';
import { AnimationItem } from 'lottie-web';

@Injectable({
  providedIn: 'root',
})
export class LottieAnimationService {
  private readonly animations = signal(new Map<string, AnimationItem>());

  registerAnimation(name: string, animationItem: AnimationItem): void {
    this.animations.update((currentAnimations) => {
      const newAnimations = new Map(currentAnimations);
      newAnimations.set(name, animationItem);
      return newAnimations;
    });
  }

  getAnimation(name: string): AnimationItem | undefined {
    return this.animations().get(name);
  }

  play(name: string, segments?: [number, number], force?: boolean): void {
    const animation = this.getAnimation(name);
    if (animation) {
      if (segments) {
        animation.playSegments(segments, force);
      } else {
        animation.play();
      }
    }
  }

  stop(name: string): void {
    const animation = this.getAnimation(name);
    if (animation) {
      animation.stop();
    }
  }

  goToAndStop(name: string, frame: number, isFrame: boolean): void {
    const animation = this.getAnimation(name);
    if (animation) {
      animation.goToAndStop(frame, isFrame);
    }
  }

  pause(name: string): void {
    const animation = this.getAnimation(name);
    if (animation) {
      animation.pause();
    }
  }

  setSpeed(name: string, speed: number): void {
    const animation = this.getAnimation(name);
    if (animation) {
      animation.setSpeed(speed);
    }
  }
}
