"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import albumData from "@/data/albumData";

export default function Album() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ cardIdx: number; photoIdx: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const dragMoved = useRef(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  /* ── Update arrow visibility ── */
  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  /* ── Auto scroll every 2.5s ── */
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + 280, behavior: "smooth" });
    }, 2500);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
  }, []);

  useEffect(() => {
    startAutoScroll();
    updateScrollState();
    const el = trackRef.current;
    el?.addEventListener("scroll", updateScrollState);
    return () => {
      stopAutoScroll();
      el?.removeEventListener("scroll", updateScrollState);
    };
  }, [startAutoScroll, stopAutoScroll, updateScrollState]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightbox) return;
      const { cardIdx, photoIdx } = lightbox;
      const total = albumData[cardIdx].photos.length;
      if (e.key === "Escape")     setLightbox(null);
      if (e.key === "ArrowRight") setLightbox({ cardIdx, photoIdx: (photoIdx + 1) % total });
      if (e.key === "ArrowLeft")  setLightbox({ cardIdx, photoIdx: (photoIdx - 1 + total) % total });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  /* ── Lock body scroll when lightbox open ── */
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  /* ── Drag-to-scroll ── */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    stopAutoScroll();
    setIsDragging(true);
    dragMoved.current = false;
    dragStart.current = { x: e.pageX, scrollLeft: trackRef.current.scrollLeft };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.pageX - dragStart.current.x;
    if (Math.abs(dx) > 4) dragMoved.current = true;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };
  const onMouseUp = () => {
    setIsDragging(false);
    startAutoScroll();
  };

  const handleCardClick = useCallback((i: number) => {
    if (!dragMoved.current) setLightbox({ cardIdx: i, photoIdx: 0 });
  }, []);

  /* ── Manual arrow scroll ── */
  const scroll = (dir: "left" | "right") => {
    stopAutoScroll();
    trackRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    setTimeout(startAutoScroll, 3000);
  };

  /* ── Lightbox helpers ── */
  const prevPhoto = () => {
    if (!lightbox) return;
    const total = albumData[lightbox.cardIdx].photos.length;
    setLightbox({ ...lightbox, photoIdx: (lightbox.photoIdx - 1 + total) % total });
  };
  const nextPhoto = () => {
    if (!lightbox) return;
    const total = albumData[lightbox.cardIdx].photos.length;
    setLightbox({ ...lightbox, photoIdx: (lightbox.photoIdx + 1) % total });
  };

  /* ── Touch swipe in lightbox ── */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextPhoto() : prevPhoto();
    }
  };

  const activeCard  = lightbox !== null ? albumData[lightbox.cardIdx] : null;
  const activePhoto = lightbox !== null ? activeCard!.photos[lightbox.photoIdx] : null;

  return (
    <>
      <section id="album" className="relative bg-[#fffaf2] py-12 sm:py-16 lg:py-20 overflow-hidden">

        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] bg-red-200/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] bg-orange-100/35 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

          {/* Section header */}
          <div className="mb-8 sm:mb-10 text-center sm:text-left">
            <p className="text-red-700 uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold mb-2">
              Our Collection
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#4b2e1f] leading-tight">
              Explore Every Hamper
            </h2>
          </div>

          {/* Track wrapper — arrows sit on top of the images */}
          <div className="relative">

            {/* Left arrow — overlays the track */}
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10
                         w-9 h-9 sm:w-11 sm:h-11 rounded-full
                         bg-black/40 backdrop-blur-sm text-white flex items-center justify-center
                         hover:bg-red-700 transition-all duration-200 shadow-lg
                         ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 
                     01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
              </svg>
            </button>

            {/* Right arrow — overlays the track */}
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10
                         w-9 h-9 sm:w-11 sm:h-11 rounded-full
                         bg-black/40 backdrop-blur-sm text-white flex items-center justify-center
                         hover:bg-red-700 transition-all duration-200 shadow-lg
                         ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 
                     011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
              </svg>
            </button>

            {/* Scrollable track */}
            <div
              ref={trackRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              className={`flex gap-3 sm:gap-4 overflow-x-auto pb-2
                          scroll-smooth snap-x snap-mandatory
                          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                          ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {albumData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleCardClick(i)}
                  className="relative flex-shrink-0 snap-start cursor-pointer group rounded-xl sm:rounded-2xl overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.photos[0]}
                    alt={item.title}
                    className="h-[260px] sm:h-[300px] md:h-[320px] lg:h-[360px]
                               w-[200px] sm:w-[240px] md:w-[270px] lg:w-[300px]
                               object-cover
                               transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Hover dim */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15
                                  transition-all duration-300 rounded-xl sm:rounded-2xl" />

                  {/* Extra photos badge */}
                  {item.photos.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/55 backdrop-blur-sm
                                    text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      +{item.photos.length - 1}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile swipe hint */}
          <p className="mt-3 text-center text-xs text-gray-400 sm:hidden tracking-wide">
            ← swipe to explore →
          </p>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && activeCard && activePhoto && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* ✕ Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full
                       bg-black/60 backdrop-blur-sm flex items-center justify-center
                       hover:bg-red-700 hover:scale-110 transition-all duration-200"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          {/* Prev */}
          {activeCard.photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20
                         w-9 h-9 sm:w-11 sm:h-11 rounded-full
                         bg-black/60 backdrop-blur-sm flex items-center justify-center
                         hover:bg-red-700 transition-all duration-200 text-white"
              aria-label="Previous photo"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 
                     01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
              </svg>
            </button>
          )}

          {/* Next */}
          {activeCard.photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20
                         w-9 h-9 sm:w-11 sm:h-11 rounded-full
                         bg-black/60 backdrop-blur-sm flex items-center justify-center
                         hover:bg-red-700 transition-all duration-200 text-white"
              aria-label="Next photo"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 
                     011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
              </svg>
            </button>
          )}

          {/* Full image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={activePhoto}
            src={activePhoto}
            alt={`photo ${lightbox.photoIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[88vw] max-h-[85vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl"
          />

          {/* Dot indicators */}
          {activeCard.photos.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {activeCard.photos.map((_, di) => (
                <button
                  key={di}
                  onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, photoIdx: di }); }}
                  className={`rounded-full transition-all duration-300 ${
                    di === lightbox.photoIdx ? "bg-white w-6 h-2.5" : "bg-white/40 w-2.5 h-2.5"
                  }`}
                  aria-label={`Go to photo ${di + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}