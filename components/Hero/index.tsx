"use client";

import React from "react";

import Link from "next/link";
import { PullUpAnimation } from "../Animation";
import Image from "next/image";
import { Button } from "../ui/button";

const HeroSection = ({ font }: any) => {
  return (
    <section className="mt-10">
      <PullUpAnimation delay={1} yOffset={30}>
        <div className=" text-start">
          <h1
            className={`${font.className} sm:text-4xl md:text-5xl lg:text-6xl xl:text-[78px] font-bold text-white mb-4 sm:mb-6 md:mb-8 `}
          >
            Supercharge Your <br className="md:block hidden" />
            Business with our <br className="md:block hidden" />
            AI-work models
            <br className="md:block hidden" />
            <span className="md:hidden"> </span>
            Business Solutions
          </h1>

          <p className="text-white text-base sm:text-lg md:text-xl lg:text-[22px] mb-6 sm:mb-8 md:mb-10">
            Streamline operations, automate tasks, and make smarter decisions
            all with
            <br className="md:block hidden" /> the power of AI. Stay focused on
            growth while your AI employee handles{" "}
            <br className="md:block hidden" />
            the heavy lifting.
          </p>

          <Link href="/signup">
            <button className="rounded-[12px] h-[45px] md:h-[50px] bg-white text-[#05152C] text-[16px] md:text-[18px] font-[600] hover:bg-blue-100 transition w-[170px] md:w-[192px]">
              
            </button>
            <Button className="bg-red-400">Get Started Now</Button>
          </Link>
        </div>
      </PullUpAnimation>
    </section>
  );
};

export default HeroSection;
