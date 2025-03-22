"use client";

import React from "react";

import Link from "next/link";
import { PullUpAnimation } from "../Animation";

const HeroSection = ({ font }: any) => {
  return (
    <section className="py-10 md:py-16 lg:py-20 px-4 text-center relative z-10">
      <PullUpAnimation delay={1} yOffset={30}>
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-400 mb-3 md:mb-4 text-[14px] sm:text-[16px] font-[700]">
            Leverage on Automation
          </p>

          <h1
            className={`${font.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[76px] font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight`}
          >
            AI Models for
            <br className="md:block hidden" />
            <span className="md:hidden"> </span>
            Business Solutions
          </h1>

          <p className="text-white text-base sm:text-lg md:text-xl lg:text-[22px] mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
            Leverage the power of AI to automate, analyze, and optimize your
            workflows. Our specialized models are designed to fit different
            business needs
          </p>

          <Link href="/signup">
            <button className="rounded-[12px] h-[45px] md:h-[50px] bg-white text-[#05152C] text-[16px] md:text-[18px] font-[600] hover:bg-blue-100 transition w-[170px] md:w-[192px]">
              Get Started Now
            </button>
          </Link>
        </div>
      </PullUpAnimation>
    </section>
  );
};

export default HeroSection;
