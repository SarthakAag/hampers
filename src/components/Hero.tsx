"use client";

import { useEffect, useRef, useState } from "react";

const videos = [
  { src: "/video1.mp4" },
  { src: "/video2.mp4" },
  { src: "/video3.mp4" },
];

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      const nextIndex = (currentVideo + 1) % videos.length;

      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: nextIndex * 620,
          behavior: "smooth",
        });
      }

      setCurrentVideo(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentVideo, mounted]);

  // Update active indicator while user scrolls
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / 620);
      setCurrentVideo(index);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToShop = () => {
    const section = document.getElementById("shop");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  if (!mounted) return null;

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#fffaf2] pt-28"
    >
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-150px] left-[-120px] w-[420px] h-[420px] bg-red-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] right-[-120px] w-[420px] h-[420px] bg-orange-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-6 sm:px-10 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">

            <p className="text-red-700 uppercase tracking-[0.3em] text-sm sm:text-base font-semibold">
              Premium Luxury Hampers
            </p>

            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-[#4b2e1f] leading-tight">
              Beautiful Hampers
              <br />
              Made With Love
            </h1>

            <p className="mt-8 text-gray-600 text-base sm:text-lg md:text-xl leading-8 max-w-2xl">
              Curated luxury hampers for weddings,
              birthdays, festive occasions, and memorable
              celebrations crafted with elegance and care.
            </p>

            <div className="mt-10 flex justify-center lg:justify-start">
              <button
                onClick={scrollToShop}
                className="bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-full text-lg font-semibold transition duration-300 shadow-xl hover:scale-105 active:scale-100"
              >
                Shop Now
              </button>
            </div>

          </div>

          {/* RIGHT SIDE VIDEO REELS */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-red-300/20 blur-3xl rounded-full pointer-events-none" />

              {/* Reel Container */}
              <div
                ref={containerRef}
                className="relative w-[320px] sm:w-[360px] h-[620px] overflow-y-auto rounded-[2.5rem] border border-red-100 shadow-2xl bg-black scrollbar-hide"
                style={{
                  scrollSnapType: "y mandatory",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                }}
              >
                <div className="flex flex-col">
                  {videos.map((video, index) => (
                    <div
                      key={index}
                      className="relative w-full h-[620px] flex-shrink-0 snap-start"
                    >
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      >
                        <source src={video.src} type="video/mp4" />
                      </video>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Trending Badge */}
                <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-lg px-5 py-3 rounded-2xl shadow-lg">
                  <p className="text-red-700 text-sm font-semibold">
                    Trending
                  </p>
                </div>

                {/* Indicators */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {videos.map((_, index) => (
                    <div
                      key={index}
                      className={`rounded-full transition-all duration-300 ${
                        currentVideo === index
                          ? "bg-red-700 w-2.5 h-8"
                          : "bg-red-300 w-2.5 h-2.5"
                      }`}
                    />
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}