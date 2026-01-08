'use client'

import { type ComponentType, Suspense } from 'react'
import dynamic from 'next/dynamic'
import type { HTMLMotionProps } from 'framer-motion'

// Dynamically import framer-motion to reduce initial bundle
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  {
    ssr: false,
    loading: () => <div />,
  }
) as ComponentType<HTMLMotionProps<'div'>>

const MotionH1 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h1),
  {
    ssr: false,
    loading: () => <h1 />,
  }
) as ComponentType<HTMLMotionProps<'h1'>>

const MotionP = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.p),
  {
    ssr: false,
    loading: () => <p />,
  }
) as ComponentType<HTMLMotionProps<'p'>>

const MotionButton = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.button),
  {
    ssr: false,
    loading: () => <button />,
  }
) as ComponentType<HTMLMotionProps<'button'>>

// Export lazy-loaded motion components
export { MotionDiv, MotionH1, MotionP, MotionButton }
