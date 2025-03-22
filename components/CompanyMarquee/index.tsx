// components/CompanyMarquee.tsx
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";



const CompanyMarquee: React.FC = () => {
    const companies = [
      { name: "Layers", logo: "/images/layers.svg", color: "text-black" },
      { name: "Sisyphus", logo: "/images/sysphus.svg", color: "text-green-500" },
      { name: "Circooles", logo: "/images/circools.svg", color: "text-blue-500" },
      { name: "Catalog", logo: "/images/catalog.svg", color: "text-blue-600" },
      { name: "Quotient", logo: "/images/quotie.svg", color: "text-purple-600" },
    ];
  
    return (
      <div className="w-full border-t border-b border-gray-200 py-4 sm:py-6 md:py-8 bg-white ">
        <div className="text-center mb-4 md:mb-6">
          <p className="text-gray-700 text-sm sm:text-base">Join 4,000+ companies already growing</p>
        </div>
  
        <div className="relative overflow-hidden text-black">
          <Marquee autoFill={true} speed={40} pauseOnHover={true}>
            <div className="flex flex-row justify-between gap-8 sm:gap-12 md:gap-16 lg:gap-[80px] mr-6 sm:mr-8 md:mr-12">
              {companies.map((company, index) => (
                <div key={index} className="flex items-center justify-center h-8 sm:h-10 md:h-12">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={120}
                    height={32}
                    className="object-contain w-auto h-full max-w-[100px] sm:max-w-[140px] md:max-w-[183px]"
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    );
  };
  
  export default CompanyMarquee;
