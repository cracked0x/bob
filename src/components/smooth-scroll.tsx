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
          className="relative flex h-screen w-max items-center"
        >
          <div className="relative flex">
            <FirstScreen />

            <SecondScreen />

            <ThirdScreen />
          </div>
        </motion.section>
      </div>
      <div
        ref={ghostRef}
        style={{ height: scrollRange }}
      />

      <Image
        src="/images/background.png"
        alt="background"
        width={5000}
        height={5000}
        className="pointer-events-none fixed bottom-0 -z-10"
      />
      <Image
        src="/images/grain.png"
        alt="grain background"
        width={5000}
        height={5000}
        className="pointer-events-none fixed top-0 -z-10 opacity-60"
      />
      <CautionTape
        stripeWidth={20}
        angle={110}
        className="fixed bottom-0 w-screen"
      />
    </>
  );
};

const Header = () => {
  return (
    <header>
      <div className="font-anticSlab 3xl:pt-[90px] flex items-center gap-[14px] place-self-end pt-12">
        <YellowButton>How it works</YellowButton>
        <YellowButton>Features</YellowButton>
      </div>
    </header>
  );
};

const FirstScreen = () => {
  return (
    <div className="h-screen w-screen px-[140px]">
      <div className="relative h-full">
        <Header />

        <h1 className="font-fablab 3xl:mb-24 3xl:text-6xl mt-10 mb-16 text-5xl">BobTheBot</h1>
        <p className="3xl:max-w-xl 3xl:text-4xl max-w-sm text-2xl font-bold 2xl:max-w-lg">
          Bob transforms web3 interaction through Telegram's familiar interface, removing technical barriers while
          preserving security.
        </p>

        <Image
          src="/images/handle.png"
          alt="handle"
          width={65}
          height={100}
          className="3xl:w-[80px] pointer-events-none absolute bottom-6"
        />
        <Image
          src="/images/hook.png"
          alt="hook"
          width={180}
          height={1000}
          className="3xl:w-[230px] pointer-events-none absolute top-0 right-[40%] 2xl:w-[200px]"
        />
        {/* LOOP AND ARROW */}
        <div className="3xl:top-[35%] 3xl:right-[25%] absolute top-[30%] right-1/5 2xl:top-[33%] 2xl:right-[23%]">
          <div className="relative">
            <Image
              src="/images/clickonstart.svg"
              alt="click here to start"
              width={271}
              height={156}
              className="w-56"
            />
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
          src="/images/bob.png"
          alt="bob the bot image"
          width={200}
          height={350}
          className="3xl:w-[250px] pointer-events-none absolute right-24 bottom-1"
        />
      </div>
    </div>
  );
};

const SecondScreen = () => {
  return (
    <div className="flex h-screen w-screen justify-center px-[140px]">
      <Image
        src="/images/grid.png"
        alt="a table of information"
        width={1412}
        height={300}
        className="pointer-events-none relative place-self-end"
      />
    </div>
  );
};

const ThirdScreen = () => {
  return (
    <div className="relative h-screen w-screen px-[140px]">
      <h2 className="3xl:mt-32 3xl:text-4xl 3xl:max-w-3xl mt-24 max-w-2xl text-2xl font-bold 2xl:mt-24 2xl:max-w-2xl 2xl:text-3xl">
        Traditional web3 bots compromise security for convenience. Bob delivers both - the seamless experience of a
        Telegram bot with the security guarantees of self-custodial solutions.
      </h2>

      <div className="absolute bottom-5">
        <img
          src="/images/arrow-2.svg"
          alt="arrow"
          className="absolute top-0 left-84 2xl:-top-10 2xl:left-96"
        />
        <img
          src="/images/bob-on-truck.png"
          alt="bob on truck"
          className="3xl:w-md w-sm"
        />
      </div>

      <img
        src="/images/truck.png"
        alt="a truck"
        className="absolute right-0 bottom-0 h-screen"
      />
    </div>
  );
};

export default SmoothScroll;
