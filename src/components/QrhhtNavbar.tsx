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

export default function QrhhtNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    const modal = document.getElementById('calendarModal')
    if (modal) { modal.style.display = 'block'; document.body.style.overflow = 'hidden' }
    setModalOpen(true)
  }

  return (
    // Override top-4 → top-0 via className
    <Navbar menuOpen={isMobileMenuOpen} className="!top-0">
      {/* Desktop */}
      <NavBody>
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/images/logo.png" alt="QRHHT" style={{ height: '40px', width: 'auto' }} />
        </a>
        <NavItems
          items={navItems}
          LinkComponent={AnchorLink as any}
        />
        <NavbarButton
          onClick={openModal}
          as="button"
          className="!bg-[#d4af37] !text-white !border !border-[#d4af37] hover:!bg-[#f4c842] hover:!border-[#f4c842] !rounded-full !px-6 !font-semibold"
        >
          Apply Now
        </NavbarButton>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/images/logo.png" alt="QRHHT" style={{ height: '36px', width: 'auto' }} />
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
              openModal()
            }}
            style={{
              background: '#d4af37', color: 'white', padding: '10px 25px',
              borderRadius: '25px', fontWeight: 600, border: 'none', cursor: 'pointer',
              fontSize: '1rem', marginTop: '8px'
            }}
          >
            Apply Now
          </button>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  )
}
