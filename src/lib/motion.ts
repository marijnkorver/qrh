import { spring } from 'animejs'

export const MOTION = {
  staggerDelay: 60,
  slideY: { header: 20, item: 40 },
  slideX: { header: -20 },
  scale: { initial: 0.95, final: 1 },
  ease: 'outExpo' as const,
  spring: spring({ bounce: 0.3, duration: 600 }),
  duration: 600,
}
