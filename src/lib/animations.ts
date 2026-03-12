import { animate } from 'animejs'
import { MOTION } from './motion'

/**
 * QRH scroll animations (anime.js v4)
 * Sticky scroll is now handled by CSS (position: sticky) + Framer Motion (hero).
 * Plasma: CSS-only pulse animation.
 */

export function initScrollAnimations(): void {
  // ── Hero content: subtle entrance animation (content always visible first) ──
  animate('#hero .hero-content h1', {
    translateY: [MOTION.slideY.item, 0],
    duration: MOTION.duration,
    ease: MOTION.ease,
    delay: 200,
  })
  animate('#hero .hero-content .subtext', {
    translateY: [MOTION.slideY.item, 0],
    duration: MOTION.duration,
    ease: MOTION.ease,
    delay: 450,
  })
  animate('#hero .hero-content .hero-buttons, #hero .hero-content [data-hero-buttons]', {
    translateY: [MOTION.slideY.header, 0],
    duration: MOTION.duration,
    ease: MOTION.ease,
    delay: 700,
  })
}
