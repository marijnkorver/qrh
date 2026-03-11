'use client'
import { Button } from 'liquidcn'
import 'liquidcn/styles.css'

const BOOKING_URL = 'https://calendar.app.google/kH6P8dqxAzCNzVYg8'
const CALENDLY_URL = 'https://calendly.com/marayan/academy-game-plan'

const openModal = (url: string) => {
  window.dispatchEvent(new CustomEvent('qrhht-open-modal', { detail: { url } }))
}

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
  bookingLabel = 'Book A Session',
  trainingLabel = 'Train With Me',
  closingStyle = false,
}: QrhhtCTAButtonsProps) {
  return (
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
          onClick={() => openModal(BOOKING_URL)}
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
          onClick={() => openModal(CALENDLY_URL)}
        >
          {trainingLabel}
        </Button>
      )}
    </div>
  )
}
