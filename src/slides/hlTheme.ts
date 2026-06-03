import { motion, AnimatePresence } from 'framer-motion'

export { motion, AnimatePresence }

export const T = {
  bg: '#FEFDF8',
  paper: '#FEFDF8',
  paperSunken: '#F7F5EF',
  inkPrimary: '#1A1914',
  inkSecondary: '#6B6760',
  inkTertiary: '#A8A59F',
  accent: '#E7FE0B',
  accentInk: '#2D3205',
  accentDeep: '#70DB04',
  divider: 'rgba(35,32,26,0.10)',
  hairline: 'rgba(35,32,26,0.08)',
  sans: "'TestSohne', 'General Sans', 'Inter', sans-serif",
  display: "'TestFamily', 'Instrument Sans', 'General Sans', sans-serif",
  mono: "'TestSohneMono', 'SFMono-Regular', ui-monospace, monospace",
}

export const W = 1920
export const H = 1080
export const MX = 128
export const MY = 96

export const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

export function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: EASE, delay },
  }
}

export function slideInProps(delay = 0) {
  return {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  }
}

export function revealProps() {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: EASE },
  }
}
