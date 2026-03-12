import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Pagination, Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// @ts-ignore
import EffectCardsStack from '../lib/effect-cards-stack.esm.js';
import '../lib/effect-cards-stack.css';

const testimonials = [
  {
    image: '/images/testimonial-1.webp',
    text: 'This work changed not just how I see my challenges, but how I see myself. I discovered possibilities I never knew existed.',
    author: 'Sarah M.',
    role: 'Life Transformation Client',
  },
  {
    image: '/images/testimonial-2.webp',
    text: 'The training program gave me not just skills, but a completely new way of being with others. I feel confident and aligned with my practice.',
    author: 'Marcus T.',
    role: 'Academy Graduate',
  },
  {
    image: '/images/testimonial-3.webp',
    text: 'I went from feeling stuck to feeling empowered. The depth of transformation I experienced was beyond anything I imagined possible.',
    author: 'Elena R.',
    role: 'Healing Journey Client',
  },
  {
    image: '/images/testimonial-4.webp',
    text: "The community and support I found here changed my life. This isn't just healing — it's awakening to who you really are.",
    author: 'David K.',
    role: 'Community Member',
  },
];

export default function QrhhtTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    swiperRef.current = new Swiper(containerRef.current, {
      modules: [Pagination, Autoplay, Navigation, A11y, EffectCardsStack],
      effect: 'cards-stack',
      loop: false,
      centeredSlides: true,
      grabCursor: true,
      speed: 600,
      cardsStackEffect: {
        slideShadows: true,
      },
      pagination: {
        el: '.testimonials-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.testimonials-next',
        prevEl: '.testimonials-prev',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      a11y: {
        prevSlideMessage: 'Previous testimonial',
        nextSlideMessage: 'Next testimonial',
      },
    } as any);

    return () => {
      swiperRef.current?.destroy(true, true);
    };
  }, []);

  return (
    <div className="qrhht-testimonials-wrap">
      <style>{`
        .qrhht-testimonials-wrap {
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
          padding: 0 40px 60px;
          position: relative;
          perspective: 1200px;
          overflow: hidden;
        }

        /* Slide ratio container */
        .testimonials-slider-ratio {
          position: relative;
          padding-bottom: 72%;
          overflow: hidden;
        }
        .testimonials-slider-ratio .swiper {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        /* Slide base */
        .testimonials-slider-ratio .swiper-slide {
          border-radius: 20px;
          height: 100%;
        }

        /* Front face */
        .testimonial-front {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(145deg, #0f4c75 0%, #0a2d47 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 36px 32px;
          box-shadow: 0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(212,175,55,0.15), 0 0 30px rgba(212,175,55,0.2), 0 0 60px rgba(15,76,117,0.3);
          text-align: center;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          animation: testimonialGlow 6s ease-in-out infinite;
        }
        @keyframes testimonialGlow {
          0%, 100% { box-shadow: 0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(212,175,55,0.15), 0 0 20px rgba(212,175,55,0.15), 0 0 40px rgba(15,76,117,0.2); }
          50% { box-shadow: 0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.35), 0 0 80px rgba(15,76,117,0.4); }
        }

        /* Gold accent bar */
        .testimonial-front::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          border-radius: 0 0 3px 3px;
        }

        /* Quote mark */
        .testimonial-quote-mark {
          color: #d4af37;
          font-size: 4.5rem;
          line-height: 1;
          font-family: Georgia, serif;
          margin-bottom: 12px;
          opacity: 0.85;
          user-select: none;
        }

        .testimonial-text {
          font-size: 1.08rem;
          color: #e8f4fd;
          line-height: 1.8;
          font-style: italic;
          margin-bottom: 24px;
          flex: 1;
        }

        .testimonial-divider {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #d4af37, #c9973c);
          border-radius: 2px;
          margin-bottom: 18px;
        }

        .testimonial-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #d4af37;
          box-shadow: 0 4px 16px rgba(212,175,55,0.3);
          margin-bottom: 12px;
        }

        .testimonial-author {
          font-size: 1.05rem;
          font-weight: 700;
          color: #d4af37;
          letter-spacing: 0.03em;
          margin-bottom: 4px;
        }

        .testimonial-role {
          font-size: 0.82rem;
          color: #8ab4ce;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Back face — decorative */
        .testimonial-back {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(145deg, #d4af37 0%, #a07d20 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          pointer-events: none;
        }
        .testimonial-back-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          opacity: 0.6;
        }

        /* Pagination */
        .testimonials-pagination {
          position: absolute;
          bottom: 16px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 8px;
          z-index: 10;
        }
        .testimonials-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(212,175,55,0.3);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          border: none;
        }
        .testimonials-pagination .swiper-pagination-bullet-active {
          background: #d4af37;
          transform: scale(1.3);
        }

        /* Navigation arrows */
        .testimonials-prev,
        .testimonials-next {
          position: absolute;
          top: calc(50% - 50px);
          z-index: 10;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(15,76,117,0.9);
          border: 1px solid rgba(212,175,55,0.4);
          color: #d4af37;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .testimonials-prev:hover,
        .testimonials-next:hover {
          background: #0f4c75;
          border-color: #d4af37;
          transform: scale(1.08);
        }
        .testimonials-prev {
          left: 0;
        }
        .testimonials-next {
          right: 0;
        }
        .testimonials-prev svg,
        .testimonials-next svg {
          width: 18px;
          height: 18px;
          stroke: currentColor;
          stroke-width: 2.5;
          fill: none;
        }

        /* Mobile */
        @media (max-width: 520px) {
          .qrhht-testimonials-wrap {
            padding: 0 32px 52px;
          }
          .testimonials-slider-ratio {
            padding-bottom: 90%;
          }
          .testimonial-text {
            font-size: 0.95rem;
          }
          .testimonials-prev { left: -4px; }
          .testimonials-next { right: -4px; }
        }
      `}</style>

      <div className="testimonials-slider-ratio">
        {/* Swiper container */}
        <div className="swiper swiper-cards-stack" ref={containerRef}>
          <div className="swiper-wrapper">
            {testimonials.map((t) => (
              <div className="swiper-slide" key={t.author}>
                {/* Back side */}
                <div className="cards-stack-back testimonial-back">
                  <img
                    src="/images/logo.webp"
                    alt="QRHHT Logo"
                    className="testimonial-back-logo"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                {/* Front side */}
                <div className="cards-stack-front testimonial-front">
                  <div className="testimonial-quote-mark">"</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-divider" />
                  <img
                    src={t.image}
                    alt={t.author}
                    className="testimonial-avatar"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                    }}
                  />
                  <p className="testimonial-author">{t.author}</p>
                  <p className="testimonial-role">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="testimonials-pagination" />

      {/* Navigation */}
      <button className="testimonials-prev" aria-label="Previous testimonial">
        <svg viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="testimonials-next" aria-label="Next testimonial">
        <svg viewBox="0 0 24 24">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
