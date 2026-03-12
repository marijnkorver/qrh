'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from 'liquidcn';
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from 'liquidcn/client';

// ── Fade-in on scroll ─────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const NAV_ITEMS = [
  { name: 'Home', link: '#hero' },
  { name: 'Therapy', link: '#therapy' },
  { name: 'Training', link: '#training' },
  { name: 'About', link: '#about' },
  { name: 'Contact', link: '#contact' },
];

const TESTIMONIALS = [
  { image: '/images/688d300fbd2f95731b8f674e.jpeg', text: '"This work changed not just how I see my challenges, but how I see myself. I discovered possibilities I never knew existed."', author: '— Sarah M.' },
  { image: '/images/688d300ffe5e1b764c1bb3bf.jpeg', text: '"The training program gave me not just skills, but a completely new way of being with others. I feel confident and aligned with my practice."', author: '— Marcus T.' },
  { image: '/images/688d300f0b03e111ca428115.jpeg', text: '"I went from feeling stuck to feeling empowered. The depth of transformation I experienced was beyond anything I imagined possible."', author: '— Elena R.' },
  { image: '/images/688d3142bd2f9503c18f6a00.jpeg', text: '"The community and support I found here changed my life. This isn\'t just healing — it\'s awakening to who you really are."', author: '— David K.' },
];

const TRAINING_CARDS = [
  { icon: 'M', title: 'Mentorship', desc: 'Weekly one-on-one and group sessions with experienced practitioners' },
  { icon: 'P', title: 'Practice', desc: 'Hands-on practice and guided exploration in real-world settings' },
  { icon: 'S', title: 'Support', desc: 'Marketing and client-building support to launch your practice' },
  { icon: 'C', title: 'Certification', desc: 'Certificate of completion acknowledging your training and expertise' },
];

export default function QRHHTPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  // auto-advance testimonials
  useEffect(() => {
    const t = setInterval(() => setSlide(c => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!href || href === '#') return;
    const el = document.getElementById(href.replace('#', ''));
    if (el) {
      const nav = document.querySelector('nav');
      const off = nav ? (nav as HTMLElement).offsetHeight : 70;
      window.scrollTo({ top: (el as HTMLElement).offsetTop - off, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const openModal = (e: React.MouseEvent) => { e.preventDefault(); setModalOpen(true); };

  const btn = (color: string, text: string, handler: (e: React.MouseEvent) => void) => (
    <Button onClick={handler} style={{
      background: color, color: 'white', padding: '15px 35px', borderRadius: 30,
      border: 'none', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer',
      fontFamily: 'Lato, sans-serif', boxShadow: `0 4px 15px rgba(0,0,0,0.15)`,
    }}>
      {text}
    </Button>
  );

  return (
    <>
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <Navbar>
        <NavBody>
          <NavbarLogo
            href="#hero"
            imageSrc="/images/68c3766f4bcc514d1a458be7.png"
            imageAlt="QRHHT"
            imageHeight={50}
            LinkComponent={({ href, children, ...r }: any) => <a href={href} onClick={scrollTo(href as string)} {...r}>{children}</a>}
          />
          <NavItems
            items={NAV_ITEMS}
            LinkComponent={({ href, children, ...r }: any) => (
              <a href={href} onClick={scrollTo(href as string)} style={{ color: '#2c3e50', textDecoration: 'none', fontFamily: 'Lato, sans-serif' }} {...r}>{children}</a>
            )}
          />
          <NavbarButton onClick={openModal} style={{ background: '#d4af37', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'Lato, sans-serif', fontWeight: 600 }}>
            Apply Now
          </NavbarButton>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo href="#hero" imageSrc="/images/68c3766f4bcc514d1a458be7.png" imageAlt="QRHHT" imageHeight={40}
              LinkComponent={({ href, children, ...r }: any) => <a href={href} onClick={scrollTo(href as string)} {...r}>{children}</a>}
            />
            <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileOpen}>
            {NAV_ITEMS.map((item) => (
              <a key={item.link} href={item.link} onClick={scrollTo(item.link)}
                style={{ color: '#2c3e50', textDecoration: 'none', fontFamily: 'Lato, sans-serif', padding: '8px 0', display: 'block' }}>
                {item.name}
              </a>
            ))}
            <Button onClick={openModal} style={{ background: '#d4af37', color: 'white', border: 'none', marginTop: 8, fontFamily: 'Lato, sans-serif', fontWeight: 600, cursor: 'pointer' }}>
              Apply Now
            </Button>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section id="hero" style={{
        height: '100vh',
        background: 'linear-gradient(rgba(250,248,245,0.82),rgba(245,242,237,0.82)), url(/images/688d364fa3d3f6952141f8c1.jpeg) center/cover no-repeat',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 800, padding: '0 20px', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#0f4c75', marginBottom: '1.5rem', letterSpacing: 1 }}>
            Dive deep. Rise higher. Live more.
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', color: '#5a6c7d', marginBottom: '3rem', lineHeight: 1.7, fontFamily: 'Lato, sans-serif' }}>
            Healing and training that awaken what's extraordinary within you.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {btn('#d4af37', 'Work with Me', (e) => { e.preventDefault(); document.getElementById('therapy')?.scrollIntoView({ behavior: 'smooth' }); })}
            {btn('#0f4c75', 'Train with Me', (e) => { e.preventDefault(); document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' }); })}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '120px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 80, alignItems: 'center' }}>
            <FadeIn>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,3.5vw,2.8rem)', color: '#0f4c75', marginBottom: '2rem', fontWeight: 400 }}>
                What makes QRHHT different?
              </h2>
              <p style={{ fontSize: '1.3rem', color: '#2c3e50', lineHeight: 1.8, marginBottom: '1.5rem', fontFamily: 'Lato, sans-serif' }}>
                We guide you beyond what you thought was possible — whether through personal sessions or practitioner training.
              </p>
              <p style={{ fontSize: '1.3rem', color: '#2c3e50', lineHeight: 1.8, fontFamily: 'Lato, sans-serif' }}>
                Healing here isn't about fixing what's broken; it's about discovering what's already extraordinary.
              </p>
            </FadeIn>
            <div style={{ width: '100%', height: 450, backgroundImage: "url('/images/688d300fbd2f95bbbf8f674f.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 20, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* ── YOUR PATHWAYS ─────────────────────────────────────── */}
      <section id="offerings" style={{ padding: '120px 0', background: '#f8f6f2' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,3.5vw,2.8rem)', color: '#0f4c75', textAlign: 'center', marginBottom: '1rem', fontWeight: 400 }}>
              Your Pathways
            </h2>
            <p style={{ textAlign: 'center', fontSize: '1.3rem', color: '#5a6c7d', marginBottom: '4rem', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7, fontFamily: 'Lato, sans-serif' }}>
              Whether you're here for your own healing or to help others heal, QRHHT offers an experience that transforms.
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40 }}>
            {[
              { title: 'Therapy Sessions', desc: 'Personal one-on-one work to awaken your potential. These sessions take you to the root of your psyche and beyond — not for temporary relief, but for lasting transformation.', btnText: 'Book a Session', btnColor: '#d4af37' },
              { title: 'Practitioner Training', desc: 'A 6-month journey to master a unique hypnosis method and launch your practice. Learn to guide others with confidence and embody the work you share.', btnText: 'Apply for Training', btnColor: '#0f4c75' },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 100}>
                <Card isGlass={false} style={{ padding: 40, borderRadius: 20, boxShadow: '0 15px 35px rgba(0,0,0,0.1)', border: '3px solid transparent', transition: 'all 0.3s ease', textAlign: 'center', height: '100%' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px)'; (e.currentTarget as HTMLElement).style.borderColor = '#d4af37'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
                >
                  <CardHeader>
                    <CardTitle style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0f4c75', marginBottom: '1.5rem', fontWeight: 400 }}>
                      {c.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription style={{ fontSize: '1.2rem', color: '#5a6c7d', lineHeight: 1.7, marginBottom: '2rem', fontFamily: 'Lato, sans-serif' }}>
                      {c.desc}
                    </CardDescription>
                    <Button onClick={openModal} style={{ background: c.btnColor, color: 'white', padding: '12px 30px', borderRadius: 30, border: 'none', fontWeight: 600, cursor: 'pointer', fontFamily: 'Lato, sans-serif' }}>
                      {c.btnText}
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINING JOURNEY ───────────────────────────────────── */}
      <section id="training" style={{ padding: '120px 0', background: 'linear-gradient(135deg,#faf8f5 0%,#f5f2ed 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,3.5vw,2.8rem)', color: '#0f4c75', textAlign: 'center', marginBottom: '2rem', fontWeight: 400 }}>
              The Training Journey
            </h2>
          </FadeIn>
          <div style={{ width: '100%', maxWidth: 700, height: 700, backgroundImage: "url('/images/688d300f6bfb1c0abb828637.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 20, margin: '0 auto', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          <p style={{ textAlign: 'center', maxWidth: 800, margin: '3rem auto 4rem', fontSize: '1.3rem', color: '#2c3e50', lineHeight: 1.8, fontFamily: 'Lato, sans-serif' }}>
            Our 6-month program combines mentorship, immersive practice, and personal growth. An invitation to fully embody the work and confidently guide others.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 30, marginBottom: '4rem' }}>
            {TRAINING_CARDS.map((c, i) => (
              <FadeIn key={c.title} delay={i * 100}>
                <Card isGlass={false} style={{ padding: 35, borderRadius: 15, textAlign: 'center', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', borderTop: '4px solid #d4af37', transition: 'all 0.3s ease', height: '100%' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                >
                  <div style={{ width: 70, height: 70, background: '#0f4c75', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.8rem', fontWeight: 600 }}>
                    {c.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#d4af37', marginBottom: '1rem', fontSize: '1.4rem', fontWeight: 600 }}>{c.title}</h3>
                  <p style={{ color: '#5a6c7d', lineHeight: 1.6, fontSize: '1.1rem', fontFamily: 'Lato, sans-serif' }}>{c.desc}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            {btn('#d4af37', 'Apply Now', openModal)}
          </div>
        </div>
      </section>

      {/* ── THERAPY (PERSONAL HEALING) ─────────────────────────── */}
      <section id="therapy" style={{ padding: '120px 0', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 80, alignItems: 'center' }}>
            <FadeIn>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,3.5vw,2.8rem)', color: '#0f4c75', marginBottom: '2rem', fontWeight: 400 }}>
                Personal Healing Sessions
              </h2>
              <div style={{ width: '100%', height: 500, backgroundImage: "url('/images/688d300f774af22ea4780da0.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 15, marginBottom: '2rem', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }} />
              <p style={{ fontSize: '1.3rem', color: '#2c3e50', lineHeight: 1.8, marginBottom: '2rem', fontFamily: 'Lato, sans-serif' }}>
                Individual sessions that take you to the root of your psyche and beyond. These are not about temporary relief — they're about transformation.
              </p>
              <p style={{ fontSize: '1.3rem', color: '#2c3e50', lineHeight: 1.8, marginBottom: '2rem', fontFamily: 'Lato, sans-serif' }}>
                Experience a unique approach to healing that awakens what's already extraordinary within you.
              </p>
              {btn('#d4af37', 'Book Your Session', openModal)}
            </FadeIn>
            <div style={{ width: '100%', height: 600, backgroundImage: "url('/images/688d300f5de0176d8fa3ae75.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section style={{ background: '#f8f6f2', padding: '80px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: '#0f4c75', textAlign: 'center', marginBottom: '3rem', fontWeight: 400 }}>
            What Our Community Says
          </h3>
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '0 70px' }}>
            <button onClick={() => setSlide(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 50, height: 50, borderRadius: '50%', background: 'rgba(15,76,117,0.8)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              ‹
            </button>
            <button onClick={() => setSlide(c => (c + 1) % TESTIMONIALS.length)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 50, height: 50, borderRadius: '50%', background: 'rgba(15,76,117,0.8)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              ›
            </button>
            <Card isGlass={false} style={{ padding: '40px 20px', borderRadius: 20, boxShadow: '0 15px 30px rgba(0,0,0,0.08)', background: 'white', transition: 'all 0.4s ease' }}>
              <CardContent style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: 200, height: 200, borderRadius: 15, backgroundImage: `url('${TESTIMONIALS[slide].image}')`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }} />
                <div style={{ flex: 1, textAlign: 'left', minWidth: 200 }}>
                  <p style={{ fontSize: '1.3rem', color: '#2c3e50', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic', fontFamily: 'Lato, sans-serif' }}>
                    {TESTIMONIALS[slide].text}
                  </p>
                  <p style={{ fontSize: '1.1rem', color: '#0f4c75', fontWeight: 600, fontFamily: 'Lato, sans-serif' }}>
                    {TESTIMONIALS[slide].author}
                  </p>
                </div>
              </CardContent>
            </Card>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: '2rem' }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)} style={{ width: 12, height: 12, borderRadius: '50%', background: i === slide ? '#d4af37' : '#d4d4d4', border: 'none', cursor: 'pointer', transition: 'background 0.3s ease' }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ─────────────────────────────────────────── */}
      <section style={{ padding: '120px 0', background: 'linear-gradient(135deg, #ffffff 0%, #f8f6f2 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem,3.5vw,2.8rem)', marginBottom: '2rem', fontWeight: 400, color: '#0f4c75' }}>
            Start your journey today.
          </h2>
          <p style={{ fontSize: '1.3rem', maxWidth: 700, margin: '0 auto 3rem', lineHeight: 1.8, color: '#4a4a4a', fontFamily: 'Lato, sans-serif' }}>
            Whether you're here for yourself or for others, the path starts with one choice — to dive deeper and rise higher.
          </p>
          <div style={{ display: 'flex', gap: 30, justifyContent: 'center', flexWrap: 'wrap' }}>
            {btn('#d4af37', 'Book a Session', openModal)}
            <Button onClick={openModal} style={{ background: 'transparent', color: '#0f4c75', padding: '15px 35px', borderRadius: 30, border: '2px solid #0f4c75', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Lato, sans-serif' }}>
              Apply for Training
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer id="contact" style={{ background: '#2c3e50', color: 'white', padding: '60px 0 30px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: '2rem', flexWrap: 'wrap' }}>
            {NAV_ITEMS.map(l => (
              <a key={l.link} href={l.link} onClick={scrollTo(l.link)} style={{ color: '#d4af37', textDecoration: 'none', fontSize: '1.1rem', fontFamily: 'Lato, sans-serif', transition: 'color 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f4c842')}
                onMouseLeave={e => (e.currentTarget.style.color = '#d4af37')}
              >
                {l.name}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: '2rem' }}>
            <a href="https://www.instagram.com/marayan.beyond.therapy" target="_blank" rel="noopener noreferrer"
              style={{ width: 45, height: 45, background: 'rgba(212,175,55,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#d4af37'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.2)'; (e.currentTarget as HTMLElement).style.color = '#d4af37'; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12c0-3.403 2.759-6.162 6.162-6.162s6.162 2.759 6.162 6.162-2.759 6.162-6.162 6.162-6.162-2.759-6.162-6.162zm1.69 0c0 2.444 1.997 4.44 4.472 4.44 2.475 0 4.472-1.997 4.472-4.44 0-2.476-1.997-4.472-4.472-4.472-2.475 0-4.472 1.997-4.472 4.472zm8.446-6.354c0 .796.644 1.44 1.44 1.44s1.44-.644 1.44-1.44-.644-1.44-1.44-1.44-1.44.644-1.44 1.44z"/>
              </svg>
            </a>
          </div>
          <p style={{ color: '#95a5a6', fontSize: '0.9rem', fontFamily: 'Lato, sans-serif' }}>
            © 2025 QRHHT. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── CALENDAR MODAL ──────────────────────────────────────── */}
      {modalOpen && (
        <div onClick={() => setModalOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 20, padding: 20, width: '90%', maxWidth: 800, maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
            <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: 15, right: 20, background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: '#aaa', fontWeight: 'bold', zIndex: 1 }}>
              ×
            </button>
            <iframe src="https://api.leadconnectorhq.com/widget/booking/lr71aBQG2hC18WSSj6Hd" scrolling="no" style={{ width: '100%', height: 600, border: 'none', borderRadius: 10 }} />
          </div>
        </div>
      )}
    </>
  );
}
