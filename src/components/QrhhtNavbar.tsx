'use client'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from 'liquidcn/client'
import { useState } from 'react'
import 'liquidcn/styles.css'

const BOOKING_URL = 'https://calendar.app.google/kH6P8dqxAzCNzVYg8'

const navItems = [
  { name: 'Home', link: '#hero' },
  { name: 'Therapy', link: '#therapy' },
  { name: 'Training', link: '#training' },
  { name: 'About', link: '#about' },
  { name: 'Contact', link: '#contact' },
]

function AnchorLink({ href, children, className, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        const navHeight = document.querySelector('nav')?.offsetHeight || 0
        window.scrollTo({ top: (target as HTMLElement).offsetTop - navHeight, behavior: 'smooth' })
      }
    }
    if (onClick) onClick(e)
  }
  return <a href={href} onClick={handleClick} className={className} {...props}>{children}</a>
}

const openModal = (url: string) => {
  window.dispatchEvent(new CustomEvent('qrhht-open-modal', { detail: { url } }))
}

export default function QrhhtNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Navbar menuOpen={isMobileMenuOpen} className="!top-0 !fixed qrhht-navbar-wrap" style={{ top: 0, position: 'fixed' } as React.CSSProperties}>
      {/* Desktop */}
      <NavBody>
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/images/logo.webp" alt="QRHHT" style={{ height: '40px', width: 'auto' }} loading="eager" fetchPriority="high" decoding="sync" />
        </a>
        <NavItems
          items={navItems}
          LinkComponent={AnchorLink as any}
        />
        <NavbarButton
          onClick={() => openModal(BOOKING_URL)}
          as="button"
          className="!bg-[#d4af37] !text-white !border !border-[#d4af37] hover:!bg-[#f4c842] hover:!border-[#f4c842] !rounded-full !px-6 !font-semibold"
        >
          Book A Session
        </NavbarButton>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/images/logo.webp" alt="QRHHT" style={{ height: '36px', width: 'auto' }} loading="eager" fetchPriority="high" decoding="sync" />
          </a>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileMenuOpen}>
          {navItems.map((item, idx) => (
            <AnchorLink
              key={idx}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ color: 'inherit', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}
            >
              {item.name}
            </AnchorLink>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false)
              openModal(BOOKING_URL)
            }}
            style={{
              background: '#d4af37', color: 'white', padding: '10px 25px',
              borderRadius: '25px', fontWeight: 600, border: 'none', cursor: 'pointer',
              fontSize: '1rem', marginTop: '8px'
            }}
          >
            Book A Session
          </button>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
