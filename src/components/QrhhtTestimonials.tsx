import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Pagination, Autoplay, Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
      modules: [Pagination, Autoplay, Navigation, A11y],
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      centeredSlides: false,
      grabCursor: true,
      speed: 600,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 28,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
          centeredSlides: false,
        },
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
        delay: 4500,
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px 60px;
          position: relative;
        }

        /* Swiper container */
        .testimonials-swiper {
          overflow: hidden;
          padding-bottom: 56px !important;
        }

        /* Slide */
        .testimonials-swiper .swiper-slide {
          height: auto;
        }

        /* Card */
        .testimonial-card {
          height: 100%;
          min-height: 320px;
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fb 60%, #f1f3f7 100%);
          border: 1px solid rgba(212, 175, 55, 0.18);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);
          padding: 36px 28px 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        /* Gold top accent bar */
        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          border-radius: 0 0 3px 3px;
        }

        .testimonial-card:hover {
          transform: translateY(-4px) scale(1.015);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(212, 175, 55, 0.25);
        }

        /* Quote mark */
        .testimonial-quote-mark {
          color: #d4af37;
          font-size: 4rem;
          line-height: 0.8;
          font-family: Georgia, serif;
          margin-bottom: 16px;
          opacity: 0.75;
          user-select: none;
        }

        /* Text */
        .testimonial-text {
          font-size: 1rem;
          color: #374151;
          line-height: 1.75;
          font-style: italic;
          margin-bottom: 24px;
          flex: 1;
        }

        /* Divider */
        .testimonial-divider {
          width: 36px;
          height: 2px;
          background: linear-gradient(90deg, #d4af37, #c9973c);
          border-radius: 2px;
          margin-bottom: 20px;
        }

        /* Author row */
        .testimonial-author-row {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
        }

        /* Avatar */
        .testimonial-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #d4af37;
          box-shadow: 0 2px 10px rgba(212, 175, 55, 0.25);
          flex-shrink: 0;
        }
        .testimonial-avatar-fallback {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4af37 0%, #c9973c 100%);
          display: grid;
          place-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
          border: 2px solid #d4af37;
          flex-shrink: 0;
        }

        .testimonial-author-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .testimonial-author-name {
          font-size: 1rem;
          font-weight: 700;
          color: #111827;
          line-height: 1.2;
        }

        .testimonial-author-role {
          font-size: 0.78rem;
          color: #6b7280;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* Pagination */
        .testimonials-pagination {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 8px;
          z-index: 10;
        }
        .testimonials-pagination .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          border: none;
        }
        .testimonials-pagination .swiper-pagination-bullet-active {
          background: #d4af37;
          transform: scale(1.35);
        }

        /* Nav arrows */
        .testimonials-prev,
        .testimonials-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffffff;
          border: 1.5px solid rgba(212, 175, 55, 0.4);
          color: #d4af37;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10);
        }
        .testimonials-prev:hover,
        .testimonials-next:hover {
          background: #d4af37;
          border-color: #d4af37;
          color: #ffffff;
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
        }
        .testimonials-prev {
          left: -16px;
        }
        .testimonials-next {
          right: -16px;
        }
        .testimonials-prev svg,
        .testimonials-next svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          stroke-width: 2.5;
          fill: none;
        }

        /* Mobile */
        @media (max-width: 640px) {
          .qrhht-testimonials-wrap {
            padding: 0 8px 60px;
          }
          .testimonials-prev { left: -8px; }
          .testimonials-next { right: -8px; }
          .testimonial-card {
            min-height: 280px;
            padding: 28px 22px 26px;
          }
          .testimonial-text {
            font-size: 0.95rem;
          }
        }

        /* Tablet */
        @media (min-width: 641px) and (max-width: 1023px) {
          .qrhht-testimonials-wrap {
            padding: 0 24px 60px;
          }
          .testimonials-prev { left: -12px; }
          .testimonials-next { right: -12px; }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .qrhht-testimonials-wrap {
            padding: 0 40px 60px;
          }
          .testimonials-prev { left: -20px; }
          .testimonials-next { right: -20px; }
        }
      `}</style>

      <div className="testimonials-swiper swiper" ref={containerRef}>
        <div className="swiper-wrapper">
          {testimonials.map((t) => (
            <div className="swiper-slide" key={t.author}>
              <div className="testimonial-card">
                {/* Quote mark */}
                <div className="testimonial-quote-mark">"</div>

                {/* Text */}
                <p className="testimonial-text">{t.text}</p>

                {/* Divider */}
                <div className="testimonial-divider" />

                {/* Author */}
                <div className="testimonial-author-row">
                  <AvatarWithFallback src={t.image} alt={t.author} />
                  <div className="testimonial-author-info">
                    <span className="testimonial-author-name">{t.author}</span>
                    <span className="testimonial-author-role">{t.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

/* Avatar with fallback initial */
function AvatarWithFallback({ src, alt }: { src: string; alt: string }) {
  const initial = alt.charAt(0).toUpperCase();
  return (
    <img
      src={src}
      alt={alt}
      className="testimonial-avatar"
      loading="lazy"
      decoding="async"
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        // Replace with a div showing initial — create adjacent element
        const fallback = document.createElement('div');
        fallback.className = 'testimonial-avatar-fallback';
        fallback.textContent = initial;
        img.parentNode?.replaceChild(fallback, img);
      }}
    />
  );
}
