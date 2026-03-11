import { animate, onScroll } from 'animejs'
import { MOTION } from './motion'

/**
 * QRHHT hero entrance animations (anime.js v4)
 * Plasma: CSS-only pulse animation.
 * Scroll stacking: anime.js onScroll sync on .stack-section-inner divs.
 */

/**
 * Sticky scroll: each .stack-section pins at top=0, height=100vh.
 * The inner .stack-section-inner scrolls upward via translateY sync'd to scroll.
 * Works identically for ALL sections — no special cases.
 */
export function initStickyScroll(): void {
  const setup = () => {
    const sections = document.querySelectorAll<HTMLElement>('.stack-section')

    sections.forEach((section) => {
      const inner = section.querySelector<HTMLElement>('.stack-section-inner')
      if (!inner) return

      // Always reset transform to ensure content is visible on load
      inner.style.transform = 'translateY(0)'

      const sectionHeight = section.scrollHeight
      const viewportHeight = window.innerHeight
      const scrollDistance = sectionHeight - viewportHeight

      // Only animate sections taller than the viewport
      if (scrollDistance <= 0) return

      animate(inner, {
        translateY: [0, -scrollDistance],
        autoplay: onScroll({
          target: section,
          enter: 'top top',
          leave: 'bottom bottom',
          sync: true,
        }),
      })
    })
  }

  // Run after DOM + React hydration
  // Small delay to ensure layout is settled before measuring
  setTimeout(setup, 100)
  setTimeout(setup, 800)

  // Re-setup on resize
  let resizeTimer: ReturnType<typeof setTimeout>
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(setup, 200)
  }, { passive: true })
}

export function initScrollAnimations(): void {
  // ── Hero content: subtle entrance animation (content always visible first) ──
  // Content starts visible (opacity: 1 in CSS), then gently animates
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
