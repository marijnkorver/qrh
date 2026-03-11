'use client'
import { Button } from 'liquidcn'
import 'liquidcn/styles.css'

const BOOKING_URL = 'https://calendar.app.google/kH6P8dqxAzCNzVYg8'
const CALENDLY_URL = 'https://calendly.com/marayan/academy-game-plan'

const openModal = (url: string) => {
  window.dispatchEvent(new CustomEvent('qrhht-open-modal', { detail: { url } }))
}

export default function QrhhtHero() {
  return (
    <div className="hero-buttons" style={{ gap: '32px' }}>
      <Button
        variant="default"
        size="lg"
        className="!bg-[#d4af37] !text-white !border-[#d4af37] hover:!bg-[#f4c842] hover:!border-[#f4c842] !rounded-full !px-8 !font-semibold"
        onClick={() => openModal(BOOKING_URL)}
      >
        Book A Session
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="!bg-[#0f4c75] !text-white !border-[#0f4c75] hover:!bg-[#1a5d8a] hover:!border-[#1a5d8a] !rounded-full !px-8 !font-semibold"
        onClick={() => openModal(CALENDLY_URL)}
      >
        Train With Me
      </Button>
    </div>
  )
}
