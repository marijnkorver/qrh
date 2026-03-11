'use client'
import { useState } from 'react'
import { Button } from 'liquidcn'
import QrhhtModal from './QrhhtModal'
import 'liquidcn/styles.css'

interface QrhhtCTAButtonsProps {
  layout?: 'row' | 'col'
  showBooking?: boolean
  showTraining?: boolean
  bookingLabel?: string
  trainingLabel?: string
  closingStyle?: boolean
}

export default function QrhhtCTAButtons({
  layout = 'row',
  showBooking = true,
  showTraining = true,
  bookingLabel = 'Book a Session',
  trainingLabel = 'Apply for Training',
  closingStyle = false,
}: QrhhtCTAButtonsProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const scrollToTraining = () => {
    const el = document.getElementById('training')
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: layout === 'row' ? '20px' : '12px',
          flexDirection: layout === 'row' ? 'row' : 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: layout === 'col' ? 'stretch' : 'center',
        }}
      >
        {showBooking && (
          <Button
            variant="default"
            size="lg"
            className="!bg-[#d4af37] !text-white !border-[#d4af37] hover:!bg-[#f4c842] hover:!border-[#f4c842] !rounded-full !font-semibold"
            onClick={() => setModalOpen(true)}
          >
            {bookingLabel}
          </Button>
        )}
        {showTraining && (
          <Button
            variant="outline"
            size="lg"
            className={
              closingStyle
                ? '!bg-transparent !text-[#d4af37] !border-[#d4af37] hover:!bg-[#d4af37]/20 !rounded-full !font-semibold'
                : '!bg-[#0f4c75] !text-white !border-[#0f4c75] hover:!bg-[#1a5d8a] hover:!border-[#1a5d8a] !rounded-full !font-semibold'
            }
            onClick={scrollToTraining}
          >
            {trainingLabel}
          </Button>
        )}
      </div>
      <QrhhtModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
