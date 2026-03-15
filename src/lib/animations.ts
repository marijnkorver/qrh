/**
 * QRH Animations
 * ─────────────────────────────────────────────────────
 * 1. Lenis smooth scroll (ticked via GSAP RAF)
 * 2. GSAP ScrollTrigger: Hero→Video sticky transition
 * 3. Training cards: sticky card-stack (CSS-driven, JS offsets)
 * 4. Section reveals: IntersectionObserver fade-in + slide-up (one-time)
 * 5. Typewriter: CSS-only for hero, JS typewriter for section headings
 * ─────────────────────────────────────────────────────
 * Progressive enhancement: all content visible by default via CSS.
 * Animations layer on top — failure = graceful fallback.
 */

let _lenis: any = null;
let _gsapReady = false;

// ─── 1. Lenis ─────────────────────────────────────────
export function initLenis(): void {
  if (_lenis) return;
  const Lenis = (window as any).Lenis;
  if (!Lenis) return;

  _lenis = new Lenis({
    duration: 0.8,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
    smoothTouch: false,
  });

  (window as any)._lenis = _lenis;

  // If GSAP is loaded, use it as the RAF ticker for ScrollTrigger compatibility
  const gsap = (window as any).gsap;
  const ScrollTrigger = (window as any).ScrollTrigger;

  if (gsap && ScrollTrigger) {
    gsap.ticker.add((time: number) => {
      _lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    _lenis.on('scroll', ScrollTrigger.update);
  } else {
    // Fallback: vanilla RAF
    function raf(time: number) {
      _lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

// ─── 2. GSAP: Hero → Video sticky transition ──────────
/**
 * Replicates opentrade-landing hero → video scroll effect:
 *   - Hero section (sticky) scales from 1→0.85 and rotates 0→-3deg
 *   - Video section scales from 0.85→1 and rotates 3→0deg as it scrolls over
 *   - Hero content layer fades out while scrolling
 *   - Hero bg image gets subtle parallax
 *
 * The hero-container is 200vh tall. Hero section is position:sticky top:0.
 * ScrollTrigger scrubs from container top to container end.
 */
export function initHeroStickyTransition(): void {
  const gsap = (window as any).gsap;
  const ScrollTrigger = (window as any).ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  const heroSection = document.getElementById('hero');
  const videoSection = document.getElementById('video-section');
  const heroContainer = document.getElementById('hero-container');
  if (!heroSection || !videoSection || !heroContainer) return;

  // ── Hero section: scale + rotate as video scrolls over it ──
  // trigger = heroContainer (200vh), scrubs the full range
  gsap.to(heroSection, {
    scale: 0.85,
    rotate: -3,
    ease: 'none',
    scrollTrigger: {
      trigger: heroContainer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
    },
  });

  // ── Hero content: fade + slide up as user scrolls ──
  const heroContent = heroSection.querySelector('.hero-content-layer') as HTMLElement | null;
  if (heroContent) {
    gsap.to(heroContent, {
      opacity: 0,
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroContainer,
        start: 'top top',
        end: '50% bottom',
        scrub: 0.6,
      },
    });
  }

  // ── Hero bg: subtle parallax/scale ──
  const heroBg = heroSection.querySelector('.hero-bg-img') as HTMLElement | null;
  if (heroBg) {
    gsap.to(heroBg, {
      scale: 1.08,
      y: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });
  }

  // ── Video section: counter-rotate as it enters ──
  // Starts slightly rotated, straightens out as it scrolls into view
  gsap.fromTo(videoSection,
    { scale: 0.9, rotate: 3 },
    {
      scale: 1,
      rotate: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: videoSection,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.8,
      },
    }
  );
}

// ─── 3. Training cards: scroll-in one by one ──────────
/**
 * Cards enter the viewport ONE BY ONE as you scroll.
 *
 * Structure:
 *  - #training-scroll-outer = tall outer (500vh) — the scroll trigger
 *  - .training-sticky-viewport = position:sticky, height:100vh
 *  - .training-card[data-card-index] = absolute, bottom:0, starts translateY(100%)
 *
 * For each card, we create a ScrollTrigger pinned to the outer container.
 * We use the "start" expressed as pixels into the scroll container so that
 * each card enters at a different point in the scroll range.
 *
 * Card timing (4 cards, each gets ~1vh of the 500vh outer to enter):
 *   Card 0: starts as outer enters viewport
 *   Card 1: starts after 1 viewport-height of scroll
 *   Card 2: starts after 2 viewport-heights of scroll
 *   Card 3: starts after 3 viewport-heights of scroll
 *   Each card takes ~0.8vh to fully slide in (smooth scrub)
 */
export function initTrainingCardStack(): void {
  const gsap = (window as any).gsap;
  const ScrollTrigger = (window as any).ScrollTrigger;

  const outer = document.getElementById('training-scroll-outer');
  const cards = Array.from(document.querySelectorAll('.training-card[data-card-index]')) as HTMLElement[];

  if (!outer || cards.length === 0) {
    // Fallback: show all cards without animation
    cards.forEach(card => {
      (card as HTMLElement).style.transform = 'translateY(0)';
    });
    return;
  }

  if (!gsap || !ScrollTrigger) {
    // No GSAP — show all cards
    cards.forEach(card => {
      (card as HTMLElement).style.transform = 'translateY(0)';
    });
    return;
  }

  // Each card takes 1 viewport height worth of scroll to enter.
  // Card i starts entering at i * 1vh into the outer scroll range.
  // We offset by the cards-stage top so cards are visible (not behind header) when animation starts.
  const vh = window.innerHeight;
  
  // Get the cards stage to determine its offset within the sticky viewport.
  // This ensures the ScrollTrigger starts when cards are actually in view.
  const stage = document.getElementById('training-cards-stage');
  const stageTop = stage ? stage.getBoundingClientRect().top - outer.getBoundingClientRect().top : 0;
  // stageTop is the pixel offset of the cards area from the outer top (includes header height).
  // We use this as a base offset so card animations start when cards area enters viewport.
  // However since we use position:sticky, the actual offset into scroll = stageTop already accounted.
  // The key fix: start card 0 EARLIER (at 0px into outer scroll) so it's visible immediately.
  // Cards stage is in the sticky viewport, so it's always visible — the issue was timing.
  // We compress the stagger: card 0 starts at 0, card 1 at 0.8vh, card 2 at 1.6vh, card 3 at 2.4vh.

  cards.forEach((card, i) => {
    if (i === 0) {
      // Card 0 (Mentorship) is IMMEDIATELY visible when section arrives.
      // No animation needed — just set it to its final position.
      gsap.set(card, { y: '0%' });
      return;
    }

    // Cards 1-3 slide in one by one as user scrolls.
    // Each card takes 0.8 viewport heights of scroll to enter.
    // Cards start after card 0 is settled, staggered by 0.8vh each.
    const cardScrollDuration = vh * 0.8;
    // Card i (1-indexed for animation purposes since card 0 is pre-visible):
    //   card 1 starts at 0.8vh, card 2 at 1.6vh, card 3 at 2.4vh
    const animIndex = i; // i is 1, 2, or 3
    const startPx = (animIndex - 1) * cardScrollDuration;
    const endPx = startPx + cardScrollDuration;

    gsap.fromTo(
      card,
      { y: '100%' },
      {
        y: '0%',
        ease: 'none', // linear scrub — matches scroll directly
        scrollTrigger: {
          trigger: outer,
          start: `top+=${startPx} top`,
          end:   `top+=${endPx} top`,
          scrub: true, // true = 1:1 with scroll position (same as opentrade)
          invalidateOnRefresh: true,
        },
      }
    );
  });
}

// ─── 4. Section reveals: IntersectionObserver ─────────
export function initSectionReveals(): void {
  // Elements that should fade in + slide up once on scroll
  const revealEls = document.querySelectorAll('.reveal-on-scroll');

  if (!revealEls.length) return;

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    revealEls.forEach(el => (el as HTMLElement).classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // one-time only
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

// ─── 5. Typewriter: section headings ──────────────────
/**
 * CSS typewriter for hero (no JS dependency).
 * JS typewriter for section headings triggered by IntersectionObserver.
 */
export function initTypewriters(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Section headings with [data-typewriter] attribute
  const typewriterEls = document.querySelectorAll('[data-typewriter]');
  if (!typewriterEls.length) return;

  typewriterEls.forEach(el => {
    const element = el as HTMLElement;
    const fullText = element.dataset.typewriter || element.textContent || '';
    // Store full text, clear element
    element.textContent = '';
    element.setAttribute('aria-label', fullText); // accessibility
    element.setAttribute('role', 'text');

    // Add cursor span
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    element.appendChild(cursor);

    let typed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !typed) {
            typed = true;
            observer.unobserve(element);

            if (prefersReduced) {
              // Instant reveal for reduced motion
              element.insertBefore(document.createTextNode(fullText), cursor);
              setTimeout(() => cursor.remove(), 800);
              return;
            }

            // Type character by character
            const delay = element.dataset.typewriterDelay
              ? parseInt(element.dataset.typewriterDelay)
              : 0;
            const speed = 55; // ms per character
            let i = 0;

            setTimeout(() => {
              const interval = setInterval(() => {
                if (i < fullText.length) {
                  element.insertBefore(document.createTextNode(fullText[i]), cursor);
                  i++;
                } else {
                  clearInterval(interval);
                  // Remove cursor after 2s
                  setTimeout(() => {
                    cursor.style.animation = 'none';
                    cursor.style.opacity = '0';
                  }, 2000);
                }
              }, speed);
            }, delay);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
  });
}

// ─── Boot: all animations ──────────────────────────────
export function initAllAnimations(): void {
  // Order matters: GSAP → Lenis → everything else
  initLenis();

  const gsap = (window as any).gsap;
  const ScrollTrigger = (window as any).ScrollTrigger;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // ScrollTrigger needs Lenis scroll position
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (_lenis) {
          if (arguments.length) {
            _lenis.scrollTo(value, { immediate: true });
          }
          return _lenis.scroll;
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener('refresh', () => _lenis?.resize());
    ScrollTrigger.refresh();

    _gsapReady = true;
    initHeroStickyTransition();
    initTrainingCardStack();
  } else {
    // No GSAP — show all training cards immediately (graceful fallback)
    initTrainingCardStack();
  }

  initSectionReveals();
  initTypewriters();
}
