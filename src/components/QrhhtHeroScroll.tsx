'use client'
import { useScroll, useTransform, motion } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface QrhhtHeroScrollProps {
  children: ReactNode
}

export function QrhhtHeroScroll({ children }: QrhhtHeroScrollProps) {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  // Hero scales down and rotates slightly — stays FULLY VISIBLE (no fade!)
  // Next section scrolls over the top of it via z-index stacking
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3])

  return (
    // 150vh container gives scroll space for the sticky effect without too much blank space
    <div ref={container} style={{ height: '150vh', position: 'relative', zIndex: 10 }}>
      <motion.div
        style={{ scale, rotate }}
        className="sticky top-0 h-screen w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
