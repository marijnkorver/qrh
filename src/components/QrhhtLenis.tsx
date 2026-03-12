'use client'
import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

interface QrhhtLenisProps {
  children: ReactNode
}

export function QrhhtLenis({ children }: QrhhtLenisProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.5,
        touchMultiplier: 2,
        syncTouch: false,
        infinite: false,
        gestureOrientation: 'vertical',
        overscroll: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
