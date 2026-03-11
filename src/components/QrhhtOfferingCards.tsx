'use client'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button } from 'liquidcn'
import QrhhtModal from './QrhhtModal'
import 'liquidcn/styles.css'

export default function QrhhtOfferingCards() {
  const [modalOpen, setModalOpen] = useState(false)

  const scrollToTraining = () => {
    const el = document.getElementById('training')
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          width: '100%',
        }}
      >
        {/* Therapy Card */}
        <Card
          isGlass={false}
          className="!rounded-2xl !border-2 !border-transparent hover:!border-[#d4af37] !transition-all !duration-300 hover:-translate-y-2 !shadow-lg hover:!shadow-xl !text-center fade-in"
          style={{ padding: '40px' }}
          id="therapy"
        >
          <CardHeader>
            <CardTitle className="!font-serif !text-2xl !text-[#0f4c75] !font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              Therapy Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '1.1rem', color: '#5a6c7d', lineHeight: 1.7, marginBottom: '24px' }}>
              Personal one-on-one work to awaken your potential. These sessions take you to the root of your psyche and beyond — not for temporary relief, but for lasting transformation.
            </p>
          </CardContent>
          <CardFooter style={{ justifyContent: 'center' }}>
            <Button
              variant="default"
              size="lg"
              className="!bg-[#d4af37] !text-white !border-[#d4af37] hover:!bg-[#f4c842] hover:!border-[#f4c842] !rounded-full !font-semibold"
              onClick={() => setModalOpen(true)}
            >
              Book a Session
            </Button>
          </CardFooter>
        </Card>

        {/* Training Card */}
        <Card
          isGlass={false}
          className="!rounded-2xl !border-2 !border-transparent hover:!border-[#d4af37] !transition-all !duration-300 hover:-translate-y-2 !shadow-lg hover:!shadow-xl !text-center fade-in"
          style={{ padding: '40px' }}
          id="training"
        >
          <CardHeader>
            <CardTitle className="!font-serif !text-2xl !text-[#0f4c75] !font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
              Practitioner Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '1.1rem', color: '#5a6c7d', lineHeight: 1.7, marginBottom: '24px' }}>
              A 6-month journey to master a unique hypnosis method and launch your practice. Learn to guide others with confidence and embody the work you share.
            </p>
          </CardContent>
          <CardFooter style={{ justifyContent: 'center' }}>
            <Button
              variant="outline"
              size="lg"
              className="!bg-[#0f4c75] !text-white !border-[#0f4c75] hover:!bg-[#1a5d8a] hover:!border-[#1a5d8a] !rounded-full !font-semibold"
              onClick={scrollToTraining}
            >
              Apply for Training
            </Button>
          </CardFooter>
        </Card>
      </div>

      <QrhhtModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
