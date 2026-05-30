"use client";

import { useEffect, useState } from "react";

const rotatingWords = ["Love", "Luxury", "Creativity", "Elegance"];

const coreValues = [
  {
    id: 1,
    title: "Designed with Love",
    desc: "Every ribbon tied, every element hand-placed to perfection.",
  },
  {
    id: 2,
    title: "Curated with Luxury",
    desc: "Sourcing premium imported chocolates, organic treats, and artisan mugs.",
  },
  {
    id: 3,
    title: "Expressed with Creativity",
    desc: "Bespoke arrangements styled to leave a breathtaking first impression.",
  }
];

export default function About() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(rotatingWords[0]);
  const [fadeState, setFadeState] = useState("fade-in");

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setFadeState("fade-out");
      setTimeout(() => {
        setWordIndex((prev) => {
          const next = (prev + 1) % rotatingWords.length;
          setCurrentWord(rotatingWords[next]);
          return next;
        });
        setFadeState("fade-in");
      }, 350);
    }, 3000);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        .about-root {
          --cream-bg: #FCF8F4;
          --cream-light: #FFFDFB;
          --cream-border: rgba(200, 37, 37, 0.1);
          --red-primary: #C82525;
          --red-hover: #9E1A1A;
          --red-light: #FFF1F1;
          --gold-accent: #D4AF37;
          --gold-light: #F6ECD0;
          --white: #FFFFFF;
          --charcoal: #2A1713;
          --text-muted: #6B524E;
          --shadow-card: 0 4px 28px rgba(42, 23, 19, 0.04), 0 1px 4px rgba(42, 23, 19, 0.02);
          --shadow-card-hover: 0 20px 48px rgba(200, 37, 37, 0.08), 0 6px 16px rgba(42, 23, 19, 0.04);
          font-family: 'DM Sans', sans-serif;
          background: var(--cream-bg);
          color: var(--charcoal);
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .about-root * { box-sizing: border-box; }

        .about-sparkle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%);
          z-index: 0;
          animation: aboutFloatSparks 15s infinite alternate ease-in-out;
        }
        .about-sparkle-1 {
          width: 500px; height: 500px;
          top: -80px; right: -100px;
          animation-duration: 24s;
        }
        .about-sparkle-2 {
          width: 450px; height: 450px;
          bottom: -100px; left: -120px;
          animation-duration: 28s;
          background: radial-gradient(circle, rgba(200, 37, 37, 0.05) 0%, transparent 70%);
        }

        @keyframes aboutFloatSparks {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-40px) scale(1.08) rotate(180deg); }
          100% { transform: translateY(20px) scale(0.92) rotate(360deg); }
        }

        .about-bg-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(200, 37, 37, 0.015) 1.5px, transparent 1.5px);
          background-size: 32px 32px;
          opacity: 0.8;
          z-index: 0;
        }

        .about-container {
          position: relative;
          z-index: 1;
          max-width: 1140px;
          margin: 0 auto;
          width: 100%;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        .about-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .visual-circle-bg {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1px dashed rgba(212, 175, 55, 0.35);
          animation: spinRound 30s linear infinite;
        }

        .visual-circle-glow {
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200, 37, 37, 0.04) 0%, transparent 70%);
        }

        .visual-card {
          width: 280px;
          height: 360px;
          background: var(--white);
          border-radius: 28px;
          border: 1.5px solid var(--cream-border);
          box-shadow: 0 20px 48px rgba(200, 37, 37, 0.07);
          position: relative;
          z-index: 2;
          overflow: hidden;
          padding: 0;
          transform: rotate(-3deg);
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .visual-card:hover {
          transform: rotate(0deg) translateY(-8px);
          box-shadow: 0 24px 60px rgba(200, 37, 37, 0.12);
          border-color: rgba(200, 37, 37, 0.25);
        }

        .visual-card::before {
          content: '';
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 20px;
          z-index: 2;
          pointer-events: none;
        }

        .visual-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 28px;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .visual-card:hover img {
          transform: scale(1.05);
        }

        @keyframes spinRound {
          to { transform: rotate(360deg); }
        }

        .about-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          opacity: 0;
          animation: contactFadeInUp 1s cubic-bezier(0.25, 1, 0.5, 1) 0.2s forwards;
        }

        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold-accent);
          margin-bottom: 1.25rem;
        }
        .about-eyebrow::after {
          content: '';
          display: block;
          width: 32px;
          height: 1.5px;
          background: var(--gold-accent);
          opacity: 0.6;
        }

        .about-title-block {
          margin: 0 0 1.5rem;
        }
        .about-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 4.5vw, 4.4rem);
          font-weight: 300;
          color: var(--charcoal);
          line-height: 1.15;
          letter-spacing: -0.015em;
          margin: 0;
        }

        .word-slider-wrap {
          display: inline-block;
          min-width: 160px;
          position: relative;
          margin-left: 10px;
        }
        .word-span {
          display: inline-block;
          color: var(--red-primary);
          font-style: italic;
          font-weight: 400;
          transition: opacity 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .word-span.fade-in  { opacity: 1; transform: translateY(0); }
        .word-span.fade-out { opacity: 0; transform: translateY(-8px); }

        .about-editorial {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          line-height: 1.6;
          color: var(--charcoal);
          margin: 0 0 1.6rem;
          font-style: italic;
          border-left: 3px solid var(--red-primary);
          padding-left: 1.25rem;
        }

        .about-description {
          font-size: 15.5px;
          line-height: 1.8;
          color: var(--text-muted);
          margin: 0 0 2.5rem;
          font-weight: 300;
        }

        .about-values-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .value-card {
          background: var(--white);
          border: 1px solid var(--cream-border);
          border-radius: 18px;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          box-shadow: var(--shadow-card);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
        }
        .value-card:hover {
          transform: translateX(6px);
          border-color: rgba(200, 37, 37, 0.2);
          box-shadow: 0 10px 24px rgba(200, 37, 37, 0.04);
        }

        .value-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: var(--red-light);
          border: 1px solid rgba(200, 37, 37, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s;
        }
        .value-icon svg {
          width: 20px;
          height: 20px;
          stroke: var(--red-primary);
          fill: none;
          stroke-width: 1.75;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .value-card:hover .value-icon {
          transform: scale(1.1) rotate(-4deg);
          background: var(--red-primary);
        }
        .value-card:hover .value-icon svg { stroke: #fff; }

        .value-info { display: flex; flex-direction: column; }

        .value-title {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--charcoal);
          margin: 0 0 0.25rem;
        }

        .value-desc {
          font-size: 13px;
          font-weight: 300;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        @keyframes contactFadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="about-root" id="about">
        <div className="about-bg-dots" aria-hidden="true" />
        <div className="about-sparkle about-sparkle-1" aria-hidden="true" />
        <div className="about-sparkle about-sparkle-2" aria-hidden="true" />

        <div className="about-container">
          <div className="about-grid">

            {/* LEFT COLUMN */}
            <div className="about-visual">
              <div className="visual-circle-bg" />
              <div className="visual-circle-glow" />
              <div className="visual-card">
                {/* ── Drop your image as /public/about.png ── */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about.png" alt="About our hampers" />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="about-content">
              <div className="about-eyebrow">Our Philosophy</div>

              <div className="about-title-block">
                <h2 className="about-heading">
                  Designed with
                  <span className="word-slider-wrap">
                    <span className={`word-span ${fadeState}`}>
                      {currentWord}
                    </span>
                  </span>
                </h2>
              </div>

              <p className="about-editorial">
                "We create elegant and premium hampers crafted carefully to make every occasion memorable."
              </p>

              <p className="about-description">
                Gifting is the art of expressing affection, respect, and connection. Our signature gift boxes are styled with love, luxury, and creativity, sourcing the finest details to deliver breathtaking experiences for your loved ones.
              </p>

              <div className="about-values-list">
                {coreValues.map((val, i) => (
                  <div key={val.id} className="value-card">
                    <div className="value-icon">
                      {i === 0 && (
                        <svg viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      )}
                      {i === 1 && (
                        <svg viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                      {i === 2 && (
                        <svg viewBox="0 0 24 24">
                          <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" />
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="value-info">
                      <h4 className="value-title">{val.title}</h4>
                      <p className="value-desc">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}