"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";
import { tabs } from "@/utils/data";
import { PullUpAnimation } from "../Animation";

const TabCardCarousel: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSmallMobile = useMediaQuery("(max-width: 500px)");

  const [activeTabId, setActiveTabId] = useState("market-prediction");
  const [hoveredTabId, setHoveredTabId] = useState<string | null>(null);
  const [activeTabPosition, setActiveTabPosition] = useState({
    x: 0,
    width: 0,
  });
  const [hoverTabPosition, setHoverTabPosition] = useState({ x: 0, width: 0 });

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const controls = useAnimation();

  // Calculate and update positions when tabs are hovered or active
  useEffect(() => {
    const updatePositions = () => {
      // Only run if DOM is ready
      if (!containerRef.current) return;

      // Get container's left position for relative positioning
      const containerLeft = containerRef.current.getBoundingClientRect().left;

      // Update active tab position
      const activeTab = tabRefs.current[activeTabId];
      if (activeTab) {
        const { left, width } = activeTab.getBoundingClientRect();
        setActiveTabPosition({
          x: left - containerLeft,
          width,
        });
      }

      // Update hovered tab position if there is one
      if (hoveredTabId && hoveredTabId !== activeTabId) {
        const hoverTab = tabRefs.current[hoveredTabId];
        if (hoverTab) {
          const { left, width } = hoverTab.getBoundingClientRect();
          setHoverTabPosition({
            x: left - containerLeft,
            width,
          });
        }
      }
    };

    // Run once on component mount and whenever tabs change
    updatePositions();

    // Add window resize listener
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [activeTabId, hoveredTabId]);

  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  // Calculate position index with circular logic
  const getPositionIndex = (tabId: string) => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    const currentIndex = tabs.findIndex((tab) => tab.id === tabId);
    const totalTabs = tabs.length;

    // Calculate the difference in a circular manner
    let diff = currentIndex - activeIndex;
    if (diff > totalTabs / 2) diff -= totalTabs;
    if (diff < -totalTabs / 2) diff += totalTabs;

    return diff;
  };

  // Function to move to the next tab
  const goToNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTabId(tabs[nextIndex].id);
  };

  // Function to move to the previous tab
  const goToPreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTabId(tabs[prevIndex].id);
  };

  // Handle swipe/drag gesture using Framer Motion
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset } = info;

    // If drag/swipe to the left (negative offset.x), go to next tab
    if (offset.x < -50) {
      goToNextTab();
    }
    // If drag/swipe to the right (positive offset.x), go to previous tab
    else if (offset.x > 50) {
      goToPreviousTab();
    }
  };

  // Control video playback based on active tab
  useEffect(() => {
    tabs.forEach((tab) => {
      const video = videoRefs.current[tab.id];
      if (video) {
        if (tab.id === activeTabId) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [activeTabId]);

  return (
    <div
      className={`w-full overflow-hidden bg-white ${
        isSmallMobile ? "min-h-[70vh]" : "min-h-[100vh]"
      }`}
    >
      {/* Tab Navigation */}
      {!isMobile && (
        <div className="flex justify-center mb-6 relative">
          <div
            ref={containerRef}
            className="flex space-x-2 rounded-[12px] relative border border-[#E4E4E7] p-2 items-center"
          >
            {/* Background highlight for hover state (gray) */}
            {hoveredTabId && hoveredTabId !== activeTabId && (
              <motion.div
                className="absolute inset-y-2 rounded-[8px] bg-gray-300 z-0"
                initial={false}
                animate={{
                  x: hoverTabPosition.x,
                  width: hoverTabPosition.width,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Background highlight for active state (blue) */}
            <motion.div
              className="absolute inset-y-2 rounded-[8px] bg-[#03217F] z-0 shadow-[0_4px_6px_-1px_rgba(3,33,127,0.3)]"
              initial={false}
              animate={{
                x: activeTabPosition.x,
                width: activeTabPosition.width,
              }}
              transition={{ type: "keyframes", stiffness: 300, damping: 30 }}
            />

            {tabs.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                className={`relative z-10 px-4 py-2 rounded-[8px] w-fit text-[16px] font-[600] transition-colors duration-200 cursor-pointer ${
                  activeTabId === tab.id
                    ? "text-white font-medium"
                    : "text-[#A7A7A7] hover:text-gray-900"
                }`}
                onClick={() => handleTabClick(tab.id)}
                onMouseEnter={() => setHoveredTabId(tab.id)}
                onMouseLeave={() => setHoveredTabId(null)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cards Container with Framer Motion drag/swipe */}
      <motion.div
        ref={cardsContainerRef}
        className="relative h-full w-full mt-6 sm:mt-8 md:mt-12 overflow-visible"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {tabs.map((tab) => {
          const positionIndex = getPositionIndex(tab.id);

          return (
            <motion.div
              key={tab.id}
              className={`absolute w-[280px] sm:w-[320px] md:w-[400px] lg:w-full bg-[#F6FAF3] max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-5xl left-1/2 top-0 overflow-hidden rounded-br-lg sm:rounded-br-xl md:rounded-br-2xl ${
                positionIndex === 0 ? "cursor-grab active:cursor-grabbing" : ""
              }`}
              style={{
                originX: 0.5,
                originY: 0,
              }}
              animate={{
                x: "-50%",
                translateX: `${positionIndex * 100}%`, // Reduced percentage to show side cards on mobile
                opacity: 1,
                scale: positionIndex === 0 ? 1 : 0.9,
                zIndex: positionIndex === 0 ? 10 : 5 - Math.abs(positionIndex),
                y: positionIndex === 0 ? -20 : 20,
              }}
              transition={{
                type: "spring",
                stiffness: 170,
                damping: 20,
                mass: 1.2   
              }}
            >
              <div className="flex flex-col-reverse lg:flex-row pl-4 sm:pl-5 md:pl-6 pt-4 sm:pt-5 md:pt-6 pb-4 md:pb-0">
                <div className="flex-1 pr-0 md:pr-6 flex flex-col justify-center mt-3 md:mt-0 mb-0 md:mb-0">
                  <PullUpAnimation delay={1} yOffset={30} isActive={positionIndex === 0}>
                  <h3 className="text-base sm:text-lg md:text-[20px] text-[#828282] font-[600] mb-1 sm:mb-2">
                    {tab.label}
                  </h3>
                  </PullUpAnimation>
                  <PullUpAnimation delay={1} yOffset={30} isActive={positionIndex === 0}>
                    <h2 className="text-2xl sm:text-3xl md:text-[25px] lg:text-[42px] font-bold mb-3 md:mb-4 text-[#22263F] leading-tight">
                      {tab.title}
                    </h2>
                  </PullUpAnimation>

                  <button
                    className="bg-[#03217F] max-w-[120px] sm:max-w-[133px] w-full text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm"
                    onClick={(e) => e.stopPropagation()} // Prevent button click from triggering swipe
                  >
                    Learn More
                  </button>
                </div>
                <div className="relative  h-[180px] sm:h-[220px] md:h-[300px] bg-red-500 lg:h-[514px] sm:w-[320px] md:w-[420px] lg:w-[520px] rounded-tl-lg sm:rounded-tl-xl md:rounded-tl-2xl rounded-br-lg sm:rounded-br-xl md:rounded-br-2xl overflow-hidden">
                  <video
                    ref={(el) => {
                      videoRefs.current[tab.id] = el;
                    }}
                    src={tab.clip}
                    autoPlay={tab.id === activeTabId}
                    muted
                    loop={tab.id === activeTabId}
                    className="h-full w-full rounded-tl-lg sm:rounded-tl-xl md:rounded-tl-2xl rounded-br-lg sm:rounded-br-xl md:rounded-br-2xl object-cover"
                  ></video>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TabCardCarousel;
