import { FC } from "react";
import { Figtree } from "next/font/google";
import CompanyMarquee from "@/components/CompanyMarquee";
import TabCardCarousel from "@/components/TabCarousel";
import Header from "@/components/Header";
import HeroSection from "@/components/Hero";
import Image from "next/image";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "700"], // Add the weights you need
  variable: "--font-figtree", // Optional variable name
});

const Home: FC = () => {
  return (
    <div className=" bg-white overflow-hidden">
      <div className="relative w-full min-h-screen px-[5%]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/aiwkhero.png"
            alt=""
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="relative z-10">
          <Header />
          <HeroSection font={figtree} />
        </div>
      </div>

      <div className="relative z-10">
        <CompanyMarquee />

        <section className="py-8 sm:py-12 md:py-16 px-4 bg-white ">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className={`${figtree.className} text-3xl sm:text-4xl md:text-[50px] font-[600] text-[#22263F] mb-3 sm:mb-4 md:mb-6 leading-tight`}
            >
              AI Models tailored for your
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              business needs
            </h1>

            <p className="text-base sm:text-lg md:text-[22px] text-[#828282] font-[500] mx-auto leading-relaxed">
              Leverage the power of AI to automate, analyze, and optimize your
              workflows. Our
              <br className="hidden md:block" />
              specialized models are designed to fit different business needs
            </p>
          </div>
        </section>

        <TabCardCarousel />
      </div>
    </div>
  );
};

export default Home;
