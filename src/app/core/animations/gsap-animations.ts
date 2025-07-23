import { gsap } from 'gsap';

export function createSidebarAnimationTimeline(
  sidebarElement: HTMLElement
): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });

  tl.to(sidebarElement, {
    width: '16rem',
    duration: 0.4,
    ease: 'power3.inOut',
  }).fromTo(
    sidebarElement.querySelectorAll('.menu-item-label'),
    { autoAlpha: 0, x: -50 },
    {
      autoAlpha: 1,
      x: 0,
      duration: 0.3,
      stagger: 0.08,
      ease: 'power2.out',
    },
    '-=0.2'
  );

  return tl;
}
