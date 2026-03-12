'use client'
import { useScroll, useTransform, motion } from 'motion/react'
import { useRef } from 'react'

// ─── Hero Section (sticky — stays pinned at top, scales + rotates as you scroll) ───
const HeroSection = ({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3])

  return (
    <motion.section
      style={{ scale, rotate, width: '100%', willChange: 'transform' }}
      className='sticky top-0 h-screen w-full overflow-hidden'
      id='hero'
    >
      {/* Hero background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <img
          src='/images/hero-bg-1920-hq.webp'
          srcSet='/images/hero-bg-800.webp 800w, /images/hero-bg-1200.webp 1200w, /images/hero-bg-1920-hq.webp 1920w, /images/hero-bg-2400.webp 2400w'
          sizes='100vw'
          alt='Quantum Root Healing'
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          loading='eager'
          fetchPriority='high'
          decoding='sync'
        />
      </div>

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'rgba(0,0,0,0)',
        }}
      >
        <div
          className='hero-content'
          style={{ maxWidth: 800, padding: '100px 20px 0' }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '3.5rem',
              fontWeight: 300,
              color: '#ffffff',
              marginBottom: '1.5rem',
              letterSpacing: '1px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Dive deep. Rise higher. Live more.
          </h1>
          <p
            className='subtext'
            style={{
              fontSize: '1.4rem',
              color: '#f0f0f0',
              marginBottom: '3rem',
              lineHeight: 1.7,
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            Healing and training that awaken what&apos;s extraordinary within
            you.
          </p>
          <HeroButtons />
        </div>
      </div>
    </motion.section>
  )
}

// Inline buttons (avoids another client island for something simple)
function HeroButtons() {
  const openModal = (url: string) => {
    window.dispatchEvent(
      new CustomEvent('qrhht-open-modal', { detail: { url } })
    )
  }

  const BOOKING_URL = 'https://calendar.app.google/kH6P8dqxAzCNzVYg8'
  const CALENDLY_URL = 'https://calendly.com/marayan/academy-game-plan'

  return (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <button
        onClick={() => openModal(BOOKING_URL)}
        style={{
          display: 'inline-block',
          padding: '15px 35px',
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: 600,
          letterSpacing: '0.5px',
          background: '#d4af37',
          color: 'white',
          boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background = '#f4c842'
          ;(e.currentTarget as HTMLButtonElement).style.transform =
            'translateY(-3px)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background = '#d4af37'
          ;(e.currentTarget as HTMLButtonElement).style.transform =
            'translateY(0)'
        }}
      >
        Book A Session
      </button>
      <button
        onClick={() => openModal(CALENDLY_URL)}
        style={{
          display: 'inline-block',
          padding: '15px 35px',
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: 600,
          letterSpacing: '0.5px',
          background: '#0f4c75',
          color: 'white',
          boxShadow: '0 4px 15px rgba(15,76,117,0.3)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background = '#1a5d8a'
          ;(e.currentTarget as HTMLButtonElement).style.transform =
            'translateY(-3px)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background = '#0f4c75'
          ;(e.currentTarget as HTMLButtonElement).style.transform =
            'translateY(0)'
        }}
      >
        Train With Me
      </button>
    </div>
  )
}

// ─── Video Section (relative — scrolls over HeroSection via z-index) ───
const VideoSection = ({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [3, 0])

  return (
    <motion.section
      style={{ scale, rotate, width: '100%', willChange: 'transform' }}
      className='relative h-screen w-full overflow-hidden'
      id='video-section'
    >
      {/* YouTube video — full-bleed background */}
      <div
        id='video-wrapper'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
          background: '#0a1a2e',
        }}
      >
        {/* video-container is replaced by YT IFrame API at runtime */}
        <div id='video-container' />
      </div>
      <button
        id='video-unmute-btn'
        aria-label='Toggle sound'
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          zIndex: 3,
          background: 'rgba(255,255,255,0.9)',
          border: 'none',
          borderRadius: '50%',
          width: 50,
          height: 50,
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
        }}
      >
        🔇
      </button>
    </motion.section>
  )
}

// ─── Main export: Container = 200vh, tracks full scroll range ───
export default function QrhhtHeroScroll() {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    // 200vh = scroll space for the hero→video transition
    <main ref={container} className='relative h-[200vh] bg-white' style={{ width: '100%', maxWidth: '100vw', overflowX: 'clip' }}>
      <HeroSection scrollYProgress={scrollYProgress} />
      <VideoSection scrollYProgress={scrollYProgress} />
    </main>
  )
}
