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
export function initHeroStickyTransition(): void {
  const gsap = (window as any).gsap;
  const ScrollTrigger = (window as any).ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  const heroSection = document.getElementById('hero');
  const videoSection = document.getElementById('video-section');
  const heroContainer = document.getElementById('hero-container');
  if (!heroSection || !videoSection || !heroContainer) return;

  // Hero content (text + buttons) fades/scales as user scrolls down
  const heroContent = heroSection.querySelector('.hero-content-layer') as HTMLElement | null;
  if (heroContent) {
    gsap.to(heroContent, {
      opacity: 0,
      scale: 0.92,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom 60%',
        scrub: 0.6,
      },
    });
  }

  // Hero bg image: subtle scale/parallax as video scrolls over
  const heroBg = heroSection.querySelector('.hero-bg-img') as HTMLElement | null;
  if (heroBg) {
    gsap.to(heroBg, {
      scale: 1.06,
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
}

// ─── 3. Training cards: sticky stack ──────────────────
export function initTrainingCardStack(): void {
  const cards = Array.from(document.querySelectorAll('.training-stack-card')) as HTMLElement[];
  if (cards.length === 0) return;

  function recalc() {
    cards.forEach((card, i) => {
      const prev = cards[i - 1];
      if (!prev) {
        card.style.setProperty('--card-offset', '0px');
        return;
      }
      const prevOffset = parseFloat(prev.style.getPropertyValue('--card-offset') || '0');
      const prevTop = prev.getBoundingClientRect().top + window.scrollY;
      // Use the card header area height (~72px) as the "peek" strip
      const peekHeight = 80;
      const offset = peekHeight * i;
      card.style.setProperty('--card-offset', `${offset}px`);
    });
  }

  recalc();
  window.addEventListener('resize', recalc, { passive: true });
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
  }

  initTrainingCardStack();
  initSectionReveals();
  initTypewriters();
}
