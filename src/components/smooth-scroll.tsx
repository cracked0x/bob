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
import { Button } from "@/components/ui/button"
import YellowButton from "@/components/yellow-button"

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
      <div className="font-sans fixed left-0 right-0 will-change-transform">
        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="relative 100vh w-max flex items-center"
        >
          <div className="relative flex">
            <div className="h-screen px-[140px] w-screen">
              <div className="relative h-full">
                <header>
                  <div className="flex items-center gap-[14px] place-self-end pt-12 2xl:pt-[90px] font-anticSlab">
                    <Button size="lg" className="text-base">How it works</Button>
                    <Button size="lg" className="text-base">Features</Button>
                  </div>
                </header>
                
                <h1 className="font-fablab text-5xl 2xl:text-[64px] mt-10 mb-16 2xl:mb-24">BobTheBot</h1>
                <p className="text-2xl 2xl:text-4xl max-w-sm 2xl:max-w-xl font-bold">Bob transforms web3 interaction through Telegram's familiar interface, removing technical barriers while preserving security.</p>

                <Image src="/images/handle.svg" alt="handle" width={65} height={100} className="absolute bottom-0" />
                <Image src="/images/hook.svg" alt="hook" width={180} height={1000} className="absolute top-0 right-[40%]" />
                <Image src="/images/bob.svg" alt="bob the bot image" width={200} height={350} className="absolute -bottom-4 right-24" />
              </div>

            </div>
            <div className="h-screen w-screen bg-purple-500" />
            <div className="h-screen w-screen bg-emerald-500" />
          </div>
        </motion.section>
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} />

      <Image src="/images/bottom-banner.svg" alt="bottom banner" width={120} height={30} className="fixed bottom-0 w-screen" />
    </>
  )
}

export default SmoothScroll
