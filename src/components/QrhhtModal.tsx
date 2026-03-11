'use client'
import { useEffect, useRef, useState } from 'react'
import 'liquidcn/styles.css'

// Global modal singleton — works across React islands in Astro
// Any component can call: window.dispatchEvent(new CustomEvent('qrhht-open-modal', { detail: { url } }))

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

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
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
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '800px',
          height: '90vh',
          maxHeight: '700px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          overflow: 'hidden',
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

        {/* iframe */}
        <iframe
          src={iframeUrl}
          style={{
            flex: 1,
            width: '100%',
            border: 'none',
            display: 'block',
          }}
          allow="camera; microphone; fullscreen"
          title="Booking"
        />
      </div>
    </div>
  )
}
