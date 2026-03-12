import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'

interface QrhhtAppProps {
  children: ReactNode
}

export function QrhhtApp({ children }: QrhhtAppProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1000 * Math.pow(t - 1, 5)),
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  )
}
