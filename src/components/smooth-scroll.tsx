"use client"

import React, { useRef, useState, useLayoutEffect, useCallback } from "react"
import ResizeObserver from "resize-observer-polyfill"
import {
  motion,
  useScroll,
  useTransform,
  useSpring
} from "motion/react"
import Image from "next/image"

const SmoothScroll = () => {
  const scrollRef = useRef<HTMLSelectElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState<number>(0)
  const [viewportW, setViewportW] = useState<number>(0)

  const { scrollYProgress } = useScroll()
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange + viewportW]
  )
  const spring = useSpring(transform, {bounce: 0, duration: 5})

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width)
    }
  }, [])

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(entries => onResize(entries))
    ghostRef && ghostRef.current && resizeObserver.observe(ghostRef.current)
    return () => resizeObserver.disconnect()
  }, [onResize])

  useLayoutEffect(() => {
    scrollRef && scrollRef.current && setScrollRange(scrollRef.current.scrollWidth)
  }, [scrollRef])

  return (
    <>
      <div className="fixed left-0 right-0 -z-10 will-change-transform">
        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="relative 100vh w-max flex items-center bg-[#141414]"
        >
          <div className="relative flex">
            <div className="h-screen w-screen bg-purple-500" />
            <div className="h-screen w-screen bg-blue-500" />
            <div className="h-screen w-screen bg-emerald-500" />
          </div>
        </motion.section>
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} className="" />

      <Image src="/images/bottom-banner.svg" alt="bottom banner" width={120} height={30} className="fixed bottom-0 w-screen h-auto" />
    </>
  )
}

export default SmoothScroll
