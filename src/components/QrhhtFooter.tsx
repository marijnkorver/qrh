import { Instagram } from 'lucide-react'
import 'liquidcn/styles.css'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#therapy', label: 'Therapy' },
  { href: '#training', label: 'Training' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function QrhhtFooter() {
  return (
    <footer style={{
      background: '#1a2a3a',
      color: 'white',
      padding: '48px 20px 24px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row: logo + social */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '32px',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          {/* Logo */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/images/logo.webp" alt="QRH" style={{ height: '40px', width: 'auto' }} loading="lazy" decoding="async" />
          </a>

          {/* Social */}
          <a
            href="https://www.instagram.com/marayan.beyond.therapy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)',
              color: '#d4af37', transition: 'all 0.3s',
              textDecoration: 'none',
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(212,175,55,0.3)'
              el.style.transform = 'scale(1.1)'
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(212,175,55,0.15)'
              el.style.transform = 'scale(1)'
            }}
          >
            <Instagram size={20} />
          </a>
        </div>

        {/* Nav links */}
        <nav style={{
          display: 'flex', gap: '24px', flexWrap: 'wrap',
          justifyContent: 'center', marginBottom: '32px',
        }}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{ color: '#b0bec5', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.3s' }}
              onMouseOver={(e) => ((e.target as HTMLAnchorElement).style.color = '#d4af37')}
              onMouseOut={(e) => ((e.target as HTMLAnchorElement).style.color = '#b0bec5')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p style={{ textAlign: 'center', color: '#607d8b', fontSize: '0.85rem', margin: 0 }}>
          © {new Date().getFullYear()} QRH. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
