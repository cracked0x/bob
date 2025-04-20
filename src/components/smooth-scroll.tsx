"use client";

import React, { useRef, useState, useLayoutEffect, useCallback, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Image from "next/image";
import YellowButton from "@/components/button";
import CautionTape from "@/components/caution-tape";
import { MotionArrowDown, MotionArrowUp } from "@/components/motion-arrows";

export const SmoothScroll = () => {
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
      <div className="hidden lg:block fixed right-0 left-0 font-sans will-change-transform">
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
        className="hidden pointer-events-none lg:block fixed bottom-0 -z-10"
      />
      <Image
        src="/images/grain.png"
        alt="grain background"
        width={5000}
        height={5000}
        className="hidden pointer-events-none lg:block fixed top-0 -z-10 opacity-60"
      />
      <CautionTape
        stripeWidth={20}
        angle={110}
        className="hidden fixed bottom-0 lg:block w-screen"
      />
    </>
  );
};

const Header = () => {
  return (
    <header>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", bounce: 0, delay: 0.1 }}
        className="font-anticSlab 3xl:pt-[90px] flex flex-col lg:flex-row items-end lg:items-center gap-[14px] place-self-end pt-12 pr-5 lg:pr-0"
      >
        <YellowButton>How it works</YellowButton>
        <YellowButton>Features</YellowButton>
      </motion.div>
    </header>
  );
};

const FirstScreen = () => {
  const headingContainer = {
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        bounce: 0,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-screen w-screen px-[140px]">
      <div className="relative h-full">
        <Header />

        <motion.div
          variants={headingContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={item}
            className="font-fablab 3xl:mb-24 3xl:text-6xl mt-10 mb-16 text-5xl"
          >
            BobTheBot
          </motion.h1>
          <motion.p
            variants={item}
            className="3xl:max-w-xl 3xl:text-4xl max-w-sm text-2xl font-bold 2xl:max-w-lg"
          >
            Bob transforms web3 interaction through Telegram's familiar interface, removing technical barriers while
            preserving security.
          </motion.p>
        </motion.div>

        <motion.img
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0 }}
          src="/images/handle.png"
          alt="handle"
          width={65}
          height={100}
          className="3xl:w-[80px] pointer-events-none absolute bottom-6"
        />
        <motion.img
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.1 }}
          src="/images/hook.png"
          alt="hook"
          width={180}
          height={1000}
          className="3xl:w-[230px] pointer-events-none absolute top-0 right-[40%] 2xl:w-[200px]"
        />
        {/* LOOP AND ARROW */}
        <div className="3xl:top-[35%] 3xl:right-[25%] absolute top-[30%] right-1/5 2xl:top-[33%] 2xl:right-[23%]">
          <div className="relative">
            <motion.img
              src="/images/clickonstart.svg"
              alt="click here to start"
              width={271}
              height={156}
              className="w-56"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", bounce: 0, delay: 0.5 }}
            />
            <div className="mt-5 h-[116px] w-[143px]">
              <MotionArrowDown />
            </div>
          </div>
        </div>
        <motion.img
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0 }}
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
      <motion.img
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.2 }}
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
    <div className="relative h-screen w-screen overflow-x-hidden px-[140px]">
      <motion.h2
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0, delay: 1.1 }}
        className="3xl:mt-32 3xl:text-4xl 3xl:max-w-3xl mt-24 max-w-2xl text-2xl font-bold 2xl:mt-24 2xl:max-w-2xl 2xl:text-3xl"
      >
        Traditional web3 bots compromise security for convenience. Bob delivers both - the seamless experience of a
        Telegram bot with the security guarantees of self-custodial solutions.
      </motion.h2>

      <div className="absolute bottom-5">
        <div className="absolute top-0 left-84 2xl:top-10 2xl:left-96">
          <MotionArrowUp />
        </div>
        <motion.img
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ type: "spring", bounce: 0, delay: 0.7 }}
          src="/images/bob-on-truck.png"
          alt="bob on truck"
          className="3xl:w-md w-sm"
        />
      </div>

      <div className="absolute right-0 bottom-0 h-screen">
        <motion.img
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          transition={{ type: "spring", bounce: 0.05 }}
          src="/images/truck.png"
          alt="a truck"
          className="h-screen"
        />
      </div>
    </div>
  );
};

export const MobileView = () => {
  const headingContainer = {
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        bounce: 0,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="lg:hidden relative">
      <div className="relative min-h-screen">
        <Header />

        <motion.img
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", bounce: 0.1 }}
          src="/images/hook.png"
          alt="hook"
          width={180}
          height={1000}
          className="pointer-events-none absolute top-0 right-[40%]"
        />
        {/* LOOP AND ARROW */}
        <div className="absolute top-[43%] right-10 sm:right-[15%] md:right-1/5">
          <div className="relative">
            <motion.img
              src="/images/clickonstart.svg"
              alt="click here to start"
              width={138}
              height={80}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", bounce: 0, delay: 0.5 }}
              className="w-[138px] sm:w-[180px]"
            />
            <div>
              <MotionArrowDown height="80" width="80" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full">
          <motion.div variants={headingContainer} initial="hidden" animate="show" className="px-2 sm:px-4">
            <motion.h1 variants={item} className="font-fablab text-[40px] uppercase text-shadow-sm text-center">bobthebot</motion.h1>
            <motion.p variants={item} className="max-w-xl mx-auto text-center font-sans text-lg font-bold leading-[100%] mt-6 text-shadow-sm">Bob transforms web3 interaction through Telegram's familiar interface, removing technical barriers while preserving security.</motion.p>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center relative py-20">
        <img src="/images/bob.png" alt="bob the bot" />  
        <img src="/images/mobile-grid.png" alt="table of information" className="relative mx-auto" />
      </div>

      <div>
        <motion.h2
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0 }}
          className="font-sans max-w-xl mx-auto font-bold text-lg text-shadow-sm leading-[100%] px-2 sm:px-4 text-center mb-6"
        >
          Traditional web3 bots compromise security for convenience. Bob delivers both - the seamless experience of a Telegram bot with the security guarantees of self-custodial solutions.
        </motion.h2>

        <img
          src="/images/bob-on-truck.png"
          alt="bob on truck"
          className="max-w-[352px] mx-auto"
        />

        <CautionTape />
      </div>

      <Image
        src="/images/background.png"
        alt="background"
        width={5000}
        height={5000}
        className="pointer-events-none object-cover fixed top-0 left-0 w-full h-full -z-10"
      />
      <Image
        src="/images/grain.png"
        alt="grain background"
        width={5000}
        height={5000}
        className="pointer-events-none opacity-60 fixed top-0 left-0 w-full h-full -z-10"
      />
    </div>
  )
}