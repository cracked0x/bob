"use client";

import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import YellowButton from "@/components/button";
import CautionTape from "@/components/caution-tape";

const SmoothScroll = () => {
  const scrollRef = useRef<HTMLSelectElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState<number>(0);
  const [viewportW, setViewportW] = useState<number>(0);

  const { scrollYProgress } = useScroll();
  const transform = useTransform(scrollYProgress, [0, 1], [0, -scrollRange + viewportW]);
  const spring = useSpring(transform, { bounce: 0, duration: 5 });

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    ghostRef && ghostRef.current && resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  useLayoutEffect(() => {
    scrollRef && scrollRef.current && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  return (
    <>
      <div className="fixed right-0 left-0 font-sans will-change-transform">
        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="h-screen relative flex w-max items-center"
        >
          <div className="relative flex">
            <div className="h-screen w-screen px-[140px]">
              <div className="relative h-full">
                <header>
                  <div className="font-anticSlab flex items-center gap-[14px] place-self-end pt-12 3xl:pt-[90px]">
                    <YellowButton>How it works</YellowButton>
                    <YellowButton>Features</YellowButton>
                  </div>
                </header>

                <h1 className="font-fablab mt-10 mb-16 text-5xl 3xl:mb-24 3xl:text-6xl">BobTheBot</h1>
                <p className="max-w-sm text-2xl font-bold 2xl:max-w-lg 3xl:max-w-xl 3xl:text-4xl">
                  Bob transforms web3 interaction through Telegram's familiar interface, removing technical barriers
                  while preserving security.
                </p>

                <Image
                  src="/images/handle.svg"
                  alt="handle"
                  width={65}
                  height={100}
                  className="absolute bottom-6 3xl:w-[80px]"
                />
                <Image
                  src="/images/hook.svg"
                  alt="hook"
                  width={180}
                  height={1000}
                  className="absolute top-0 2xl:w-[200px] right-[40%] 3xl:w-[230px]"
                />
                {/* LOOP AND ARROW */}
                <div className="absolute right-1/5 top-[30%] 2xl:top-[33%] 2xl:right-[23%] 3xl:top-[35%] 3xl:right-[25%]">
                  <div className="relative">
                    <img src="/images/clickonstart.svg" alt="click here to start" className="w-56" />
                    <Image
                      src="/images/arrow.svg"
                      alt="arrow"
                      width={143}
                      height={116}
                      className="mt-5"
                    />
                  </div>
                </div>
                <Image
                  src="/images/bob.svg"
                  alt="bob the bot image"
                  width={200}
                  height={350}
                  className="absolute right-24 bottom-1 3xl:w-[250px]"
                />
              </div>
            </div>
            <div className="h-screen w-screen bg-purple-500" />
            <div className="h-screen w-screen bg-emerald-500" />
          </div>
        </motion.section>
      </div>
      <div
        ref={ghostRef}
        style={{ height: scrollRange }}
      />

      <Image src="/images/background.png" alt="background" width={5000} height={5000} className="fixed bottom-0 -z-10"/>
      <Image src="/images/grain.png" alt="grain background" width={5000} height={5000} className="fixed top-0 -z-10 opacity-60"/>
      <CautionTape
        stripeWidth={20}
        angle={110}
        className="fixed bottom-0 w-screen"
      />
    </>
  );
};

export default SmoothScroll;
