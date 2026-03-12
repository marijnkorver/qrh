'use client'
import { useEffect, useRef, useState } from 'react'
import 'liquidcn/styles.css'

// Global modal singleton — works across React islands in Astro
// Any component can call: window.dispatchEvent(new CustomEvent('qrhht-open-modal', { detail: { url } }))

// Google Calendar blocks iframe embedding — detect and handle gracefully
const isGoogleCalendarUrl = (url: string) =>
  url.includes('calendar.app.google') || url.includes('calendar.google.com')

export default function QrhhtModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [iframeUrl, setIframeUrl] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const url = (e as CustomEvent).detail?.url
      if (url) {
        setIframeUrl(url)
        setIsOpen(true)
      }
    }
    window.addEventListener('qrhht-open-modal', handler)
    return () => window.removeEventListener('qrhht-open-modal', handler)
  }, [])

  const close = () => {
    setIsOpen(false)
    setIframeUrl('')
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) close()
  }

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isGoogleCal = isGoogleCalendarUrl(iframeUrl)

  // ✅ ALWAYS in DOM — CSS controls visibility via opacity/visibility/pointer-events
  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
      aria-modal={isOpen}
      role="dialog"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        // CSS visibility — never removed from DOM
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.25s ease, visibility 0.25s ease',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          width: '100%',
          maxWidth: isGoogleCal ? '480px' : '800px',
          height: isGoogleCal ? 'auto' : '90vh',
          maxHeight: isGoogleCal ? 'none' : '700px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          transition: 'transform 0.25s ease',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '12px 16px',
            borderBottom: '1px solid #eee',
            flexShrink: 0,
          }}
        >
          <button
            onClick={close}
            aria-label="Close"
            style={{
              background: 'none',
              border: '2px solid #ccc',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              fontSize: '18px',
              lineHeight: '1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#555',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLButtonElement).style.background = '#0f4c75'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#0f4c75'
              ;(e.currentTarget as HTMLButtonElement).style.color = 'white'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLButtonElement).style.background = 'none'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#ccc'
              ;(e.currentTarget as HTMLButtonElement).style.color = '#555'
            }}
          >
            ×
          </button>
        </div>

        {/* Google Calendar: show friendly redirect UI instead of blocked iframe */}
        {isGoogleCal ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 32px 48px',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            {/* Calendar icon */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #d4af37 0%, #f4c842 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                boxShadow: '0 8px 24px rgba(212,175,55,0.35)',
              }}
            >
              📅
            </div>

            <div style={{ maxWidth: '340px' }}>
              <h2
                style={{
                  margin: '0 0 8px',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#111',
                  letterSpacing: '-0.3px',
                }}
              >
                Book a Session
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: '1.6',
                }}
              >
                Google Calendar will open in a new tab so you can pick your preferred time slot.
              </p>
            </div>

            <button
              onClick={() => {
                window.open(iframeUrl, '_blank', 'noopener,noreferrer')
                close()
              }}
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f4c842 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(212,175,55,0.4)',
                transition: 'all 0.2s',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 10px 28px rgba(212,175,55,0.5)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(212,175,55,0.4)'
              }}
            >
              Open Calendar →
            </button>
          </div>
        ) : (
          /* Regular iframe for embeddable URLs (e.g. Calendly) */
          <iframe
            src={isOpen && !isGoogleCal ? iframeUrl : 'about:blank'}
            style={{
              flex: 1,
              width: '100%',
              border: 'none',
              display: 'block',
            }}
            allow="camera; microphone; fullscreen"
            title="Booking"
          />
        )}
      </div>
    </div>
  )
}
