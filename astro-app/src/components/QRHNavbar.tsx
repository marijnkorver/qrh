'use client';

import { useState, useEffect } from 'react';

export default function QRHNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Therapy', href: '#therapy' },
    { label: 'Training', href: '#training' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const nav = document.getElementById('navbar');
      const offset = nav ? nav.offsetHeight : 70;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        padding: '15px 0',
        background: scrolled ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 1px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#hero" onClick={scrollTo('#hero')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/68c3766f4bcc514d1a458be7.png"
              alt="QRH"
              style={{ height: scrolled ? 40 : 50, width: 'auto', transition: 'height 0.3s ease' }}
            />
          </a>

          {/* Desktop menu */}
          <ul style={{ display: 'flex', listStyle: 'none', gap: 30, alignItems: 'center', margin: 0, padding: 0 }}
            className="hidden md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={scrollTo(l.href)}
                  style={{ color: '#2c3e50', textDecoration: 'none', fontWeight: 400, transition: 'color 0.3s ease', fontFamily: 'Lato, sans-serif' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#0f4c75')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#2c3e50')}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <button
                className="book-session-btn"
                style={{
                  background: '#d4af37', color: 'white', padding: '10px 25px',
                  borderRadius: 25, border: 'none', cursor: 'pointer', fontWeight: 600,
                  fontFamily: 'Lato, sans-serif', boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f4c842'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#d4af37'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >
                Apply Now
              </button>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#2c3e50' }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 15, padding: '20px 0',
            borderTop: '1px solid #eee', marginTop: 10,
          }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={scrollTo(l.href)}
                style={{ color: '#2c3e50', textDecoration: 'none', fontFamily: 'Lato, sans-serif', fontWeight: 400 }}
              >
                {l.label}
              </a>
            ))}
            <button
              className="book-session-btn"
              style={{
                background: '#d4af37', color: 'white', padding: '12px 25px',
                borderRadius: 25, border: 'none', cursor: 'pointer', fontWeight: 600,
                fontFamily: 'Lato, sans-serif', alignSelf: 'flex-start',
              }}
            >
              Apply Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
