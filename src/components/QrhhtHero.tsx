'use client'
import { useState } from 'react'
import { Button } from 'liquidcn'
import QrhhtModal from './QrhhtModal'
import 'liquidcn/styles.css'

export default function QrhhtHero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="hero-buttons">
        <Button
          variant="default"
          size="lg"
          className="!bg-[#d4af37] !text-white !border-[#d4af37] hover:!bg-[#f4c842] hover:!border-[#f4c842] !rounded-full !px-8 !font-semibold"
          onClick={() => setModalOpen(true)}
        >
          Work with Me
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="!bg-[#0f4c75] !text-white !border-[#0f4c75] hover:!bg-[#1a5d8a] hover:!border-[#1a5d8a] !rounded-full !px-8 !font-semibold"
          onClick={() => {
            const el = document.getElementById('training')
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
          }}
        >
          Train with Me
        </Button>
      </div>
      <QrhhtModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
