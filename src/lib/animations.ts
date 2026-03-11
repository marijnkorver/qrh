import { animate, onScroll } from 'animejs'
import { MOTION } from './motion'

/**
 * QRHHT hero entrance animations (anime.js v4)
 * Scroll stacking is handled by CSS sticky positioning.
 * Tall sections (> 100vh content) get a wrapper + onScroll sync to pin & scroll through.
 */

export function initScrollAnimations(): void {
  // ── Hero content: entrance on load ──
  animate('#hero .hero-content h1', {
    opacity: [0, 1],
    translateY: [MOTION.slideY.item, 0],
    duration: MOTION.duration,
    ease: MOTION.ease,
    delay: 200,
  })
  animate('#hero .hero-content .subtext', {
    opacity: [0, 1],
    translateY: [MOTION.slideY.item, 0],
    duration: MOTION.duration,
    ease: MOTION.ease,
    delay: 450,
  })
  animate('#hero .hero-content .hero-buttons, #hero .hero-content [data-hero-buttons]', {
    opacity: [0, 1],
    translateY: [MOTION.slideY.header, 0],
    duration: MOTION.duration,
    ease: MOTION.ease,
    delay: 700,
  })

  // ── Tall section scroll-through ──
  initTallSectionScroll()
}

/**
 * Detects sections taller than the viewport and wraps them in a scroll container.
 * Uses ResizeObserver so detection fires after React islands hydrate and render,
 * ensuring scrollHeight is accurate when the DOM settles.
 *
 * Pattern:
 *   wrapper (height = contentHeight) — creates scroll distance
 *     section (sticky top:0, height: vh, overflow: hidden) — pinned
 *       inner (translateY: 0 → -extraScroll) — content scrolls up
 */
export function initTallSectionScroll(): void {
  const sections = document.querySelectorAll<HTMLElement>('.stack-section')
  const vh = window.innerHeight

  sections.forEach((section) => {
    // ResizeObserver fires once content is fully rendered (after React hydration)
    const observer = new ResizeObserver(() => {
      const contentHeight = section.scrollHeight
      const isTall = contentHeight > vh + 20 // 20px tolerance

      if (!isTall) return

      // Only wrap once — bail if already wrapped
      if (section.parentElement?.classList.contains('tall-section-wrapper')) return

      observer.disconnect() // Stop observing once we wrap

      const extraScroll = contentHeight - vh

      // ── Wrap section's children in an inner scroller ──
      const inner = document.createElement('div')
      inner.className = 'tall-section-inner'
      // Move all children of section into inner
      while (section.firstChild) {
        inner.appendChild(section.firstChild)
      }
      section.appendChild(inner)

      // ── Create wrapper for scroll tracking ──
      const wrapper = document.createElement('div')
      wrapper.className = 'tall-section-wrapper'
      // Height = viewport height (pinned area) + extra scroll distance
      wrapper.style.height = `${contentHeight}px`
      wrapper.style.position = 'relative'
      // Preserve z-index from section
      wrapper.style.zIndex = section.style.zIndex || 'auto'

      // Move section into wrapper
      section.parentNode!.insertBefore(wrapper, section)
      wrapper.appendChild(section)

      // Section: sticky pin at viewport top, clip to vh
      section.style.position = 'sticky'
      section.style.top = '0'
      section.style.height = `${vh}px`
      section.style.overflow = 'hidden'
      section.style.zIndex = ''

      // ── anime.js: scroll-linked translateY on the INNER div ──
      // enter: 'top top'       → start when wrapper top hits viewport top
      // leave: 'bottom bottom' → end when wrapper bottom hits viewport bottom
      //   offsetStart = wrapperAbsTop, offsetEnd = wrapperAbsTop + extraScroll ✓
      animate(inner, {
        translateY: [0, -extraScroll],
        autoplay: onScroll({
          target: wrapper,
          enter: 'top top',
          leave: 'bottom bottom',
          sync: true,
        }),
      })
    })

    observer.observe(section)
  })
}
