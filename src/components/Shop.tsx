"use client";

import { useState, useEffect } from "react";

// The premium collection with launch status and direct redirect URLs
const hampers = [
   {
    id: 1,
    title: "Brew & Bliss Box",
    price: "₹999 + Shipping",
    images: [
      "/coffee.png",
      "/coffee2.png",
    ],
    tag: "Trending",
    accent: "#C82525",
    isComingSoon: false,
    buyUrl: "https://payments.cashfree.com/forms/MTBO", // Redirect link for payment/checkout
    shortDescription:
  "Packed with warmth, sip and little joys for all your cozy coffee moments.",
    fullDescription: `A basket full of cozy sips, tasty bites & coffee-filled happiness!

Thoughtfully packed with 8 handpicked goodies in a neatly woven basket, wrapped with net detailing and tied with a cute ribbon.

Perfect for coffee lovers, gifting, coffee dates, picnics & warm little get-togethers.

Price - ₹999 + Shipping

Limited stock only!`,
  },
{
  id: 2,
  title: "Tiny Treasure Collection",
  price: "₹999 + Shipping",
  images: [
    "/tiny1.png",
    "/tiny2.png",
    "/tiny3.png",
    "/tiny4.png",
    "/tiny5.png",
  ],
  tag: "Trending",
  accent: "#C82525",
  isComingSoon: false,
  buyUrl: "#",
  shortDescription:
    "Filled with little joys, meaningful keepsakes & aesthetic surprises.",

  fullDescription: `Tiny Treasures is a curated hamper collection filled with little joys, meaningful keepsakes, and aesthetic surprises.

Thoughtfully packed with love, each box is designed to make gifting feel warm, memorable, and special. ✨

Perfect for birthdays, celebrations, thank-you gifts, and creating beautiful memories.

Includes:
• Handpicked keepsakes
• Aesthetic surprises
• Premium packaging
• Thoughtful gift elements
• Elegant presentation

Made to make every gift feel extra special.`,
},
];

const features = ["Handmade", "Premium Quality", "Luxury Packaging"];

export default function Shop() {
  const [selectedHamper, setSelectedHamper] = useState<null | typeof hampers[0]>(null);
  const [hoveredId, setHoveredId] = useState<null | number>(null);
  
  // Track active image index for each card
  const [cardImageIndices, setCardImageIndices] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
  });

  // Track active image index in the detail modal
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  // Buy Now redirect transition state
  const [redirectingId, setRedirectingId] = useState<null | number>(null);

  // Handle slide transitions on cards
  const nextCardImage = (e: React.MouseEvent, hamperId: number, maxImages: number) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [hamperId]: (prev[hamperId] + 1) % maxImages,
    }));
  };

  const prevCardImage = (e: React.MouseEvent, hamperId: number, maxImages: number) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [hamperId]: (prev[hamperId] - 1 + maxImages) % maxImages,
    }));
  };

  // Set card image index specifically
  const selectCardImageDot = (e: React.MouseEvent, hamperId: number, index: number) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [hamperId]: index,
    }));
  };

  // Buy Now trigger with elegant micro-animation and instant redirection
  const handleBuyNow = (e: React.MouseEvent, hamperId: number, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (url === "#") return;
    
    setRedirectingId(hamperId);
    
    setTimeout(() => {
      window.location.href = url; // Redirect the user to the purchase/payment link
    }, 850);
  };

  // Synchronize modal image index with currently selected hamper index
  useEffect(() => {
    if (selectedHamper) {
      setModalImageIndex(0);
    }
  }, [selectedHamper]);

  return (
    <>
      {/* Google Fonts & CSS Style Declarations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

  .shop-root {
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
  position: relative;
  overflow: hidden; /* scoped — won't bleed into siblings */
}

        .shop-root * { box-sizing: border-box; }

        /* Floating Sparks & Background Orbs animations */
        .ambient-sparkle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
          z-index: 0;
          animation: floatSparks 15s infinite alternate ease-in-out;
        }
        .ambient-sparkle-1 {
          width: 500px; height: 500px;
          top: 10%; left: -100px;
          animation-duration: 25s;
        }
        .ambient-sparkle-2 {
          width: 600px; height: 600px;
          bottom: 15%; right: -150px;
          animation-duration: 30s;
          background: radial-gradient(circle, rgba(200, 37, 37, 0.06) 0%, transparent 70%);
        }
        .ambient-sparkle-3 {
          width: 300px; height: 300px;
          top: 50%; left: 40%;
          animation-duration: 18s;
        }

        @keyframes floatSparks {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-40px) scale(1.08) rotate(180deg); }
          100% { transform: translateY(20px) scale(0.92) rotate(360deg); }
        }

        .shop-bg-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(200, 37, 37, 0.02) 1.5px, transparent 1.5px);
          background-size: 32px 32px;
          opacity: 0.8;
          z-index: 0;
        }

        /* Brand Navigation Bar (Only Logo) */
        .shop-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2.2rem 2rem;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
        }

        .shop-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--charcoal);
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .shop-brand span {
          color: var(--red-primary);
        }

  .shop-section {
  position: relative;
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 1;
}

        .shop-header {
          text-align: center;
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: fadeInUp 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .shop-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold-accent);
          margin-bottom: 1rem;
        }
        .shop-eyebrow::before,
        .shop-eyebrow::after {
          content: '';
          display: block;
          width: 32px;
          height: 1.5px;
          background: var(--gold-accent);
          opacity: 0.6;
        }

        .shop-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5.5vw, 5.2rem);
          font-weight: 300;
          color: var(--charcoal);
          line-height: 1.1;
          letter-spacing: -0.015em;
          margin: 0;
        }
        .shop-heading em {
          font-style: italic;
          color: var(--red-primary);
          font-weight: 400;
        }

        .shop-subtext {
          margin-top: 1.25rem;
          font-size: 15px;
          font-weight: 300;
          color: var(--text-muted);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
        }

        /* Divider Decoration */
        .shop-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 2rem;
        }
        .shop-divider-line {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-accent), transparent);
        }
        .shop-divider-diamond {
          width: 6px; height: 6px;
          background: var(--red-primary);
          transform: rotate(45deg);
          opacity: 0.85;
          box-shadow: 0 0 8px rgba(200, 37, 37, 0.4);
        }

        /* Staggered Grid Cards */
       .shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 3rem;
}

        /* Premium Card styling */
        .hamper-card {
          background: var(--white);
          border-radius: 24px;
          border: 1px solid var(--cream-border);
          overflow: hidden;
          box-shadow: var(--shadow-card);
          transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .hamper-card:nth-child(1) { animation-delay: 0.15s; }
        .hamper-card:nth-child(2) { animation-delay: 0.3s; }
        .hamper-card:nth-child(3) { animation-delay: 0.45s; }

        .hamper-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-10px);
          border-color: rgba(200, 37, 37, 0.25);
        }

        /* Coming Soon State overlay elements */
        .hamper-card.coming-soon-card {
          border-color: rgba(212, 175, 55, 0.18);
        }
        .hamper-card.coming-soon-card:hover {
          border-color: var(--gold-accent);
          box-shadow: 0 20px 48px rgba(212, 175, 55, 0.08), 0 6px 16px rgba(42, 23, 19, 0.03);
        }
        .coming-soon-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: var(--gold-light);
          color: var(--charcoal);
          border: 1px solid var(--gold-accent);
          border-radius: 100px;
          padding: 6px 14px;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
          animation: glowPulse 2s infinite alternate ease-in-out;
        }
        
        @keyframes glowPulse {
          from { box-shadow: 0 4px 10px rgba(212, 175, 55, 0.15); border-color: rgba(212, 175, 55, 0.6); }
          to { box-shadow: 0 4px 20px rgba(212, 175, 55, 0.35); border-color: var(--gold-accent); }
        }

        /* Image Carousel Container */
      .hamper-card-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: #eae3db;
}
        
        /* High-fashion Coming Soon Placeholder - NO IMAGE */
        .coming-soon-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #FFFDFB 0%, #FAF3EC 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border-bottom: 1px solid var(--cream-border);
          position: relative;
          overflow: hidden;
        }
        .coming-soon-placeholder::before {
          content: '';
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 16px;
          pointer-events: none;
        }
        .coming-soon-placeholder-emblem {
          font-size: 2.2rem;
          color: var(--gold-accent);
          margin-bottom: 0.5rem;
          animation: emblemFloat 4s infinite ease-in-out;
        }
        .coming-soon-placeholder-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-style: italic;
          color: var(--charcoal);
          letter-spacing: 0.04em;
          text-align: center;
        }
        .coming-soon-placeholder-subtitle {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }
        
        @keyframes emblemFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(8deg); }
        }

        .carousel-track {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .carousel-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.65s cubic-bezier(0.25, 0.8, 0.25, 1);
          pointer-events: none;
        }
        .carousel-slide.active {
          opacity: 1;
          pointer-events: auto;
        }

        .hamper-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        /* Mode of high fashion image scale and slight micro-rotation */
        .hamper-card:hover .hamper-card-img {
          transform: scale(1.08) rotate(0.4deg);
        }
        .hamper-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 45%, rgba(42, 23, 19, 0.55) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* Card Carousel Navigation Controls */
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%) scale(0.9);
          width: 38px;
          height: 38px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid var(--cream-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--charcoal);
          cursor: pointer;
          opacity: 0;
          z-index: 3;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .carousel-arrow:hover {
          background: var(--red-primary);
          color: var(--white);
          border-color: var(--red-primary);
          transform: translateY(-50%) scale(1.05);
        }
        .carousel-arrow-left {
          left: 16px;
          transform: translateY(-50%) translateX(-8px);
        }
        .carousel-arrow-right {
          right: 16px;
          transform: translateY(-50%) translateX(8px);
        }
        
        .hamper-card:not(.coming-soon-card):hover .carousel-arrow-left {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }
        .hamper-card:not(.coming-soon-card):hover .carousel-arrow-right {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        /* Carousel Tiny Dots Indicator */
        .carousel-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 3;
          padding: 6px 10px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
        }
        .carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .carousel-dot.active {
          background: var(--red-primary);
          width: 14px;
          border-radius: 100px;
        }

        /* Floating Tags */
        .hamper-tag {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          background: var(--white);
          color: var(--red-primary);
          border: 1px solid var(--cream-border);
          border-radius: 100px;
          padding: 5px 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .hamper-price-chip {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 2;
          background: var(--white);
          border: 1px solid var(--cream-border);
          border-radius: 100px;
          padding: 7px 16px;
          font-size: 13px;
          font-weight: 700;
          color: var(--red-primary);
          box-shadow: 0 4px 14px rgba(42, 23, 19, 0.08);
        }

        /* Card Body details */
        .hamper-card-body {
          padding: 1.2rem 1.4rem;
          background: var(--white);
          position: relative;
        }

        .hamper-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.85rem;
          font-weight: 500;
          color: var(--charcoal);
          line-height: 1.2;
          margin: 0 0 0.5rem;
          letter-spacing: -0.012em;
          transition: color 0.3s;
        }
        .hamper-card:hover .hamper-card-title {
          color: var(--red-primary);
        }
        .hamper-card.coming-soon-card:hover .hamper-card-title {
          color: var(--gold-accent);
        }

        .hamper-card-desc {
          font-size: 13px;
          font-weight: 300;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.7;
        }

        .hamper-card-actions {
          display: flex;
          gap: 12px;
          margin-top: 1.6rem;
        }

        /* Luxurious Premium Buttons */
        .btn-primary {
          flex: 1.3;
          background: var(--charcoal);
          color: var(--cream-light);
          border: 1px solid var(--charcoal);
          border-radius: 100px;
          padding: 12px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          position: relative;
          overflow: hidden;
          text-decoration: none; /* In case rendered as link anchor */
        }
        .btn-primary:hover {
          background: var(--red-primary);
          border-color: var(--red-primary);
          transform: translateY(-1.5px);
          box-shadow: 0 6px 20px rgba(200, 37, 37, 0.2);
        }
        .btn-primary:active {
          transform: translateY(0);
        }
        
        /* Disabled primary button for upcoming items */
        .btn-primary:disabled {
          background: #EAE6E1;
          color: #A69F96;
          border-color: #E2DDD7;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .btn-secondary {
          flex: 1;
          background: transparent;
          color: var(--charcoal);
          border: 1.5px solid var(--cream-border);
          border-radius: 100px;
          padding: 12px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .btn-secondary:hover {
          background: var(--red-light);
          border-color: var(--red-primary);
          color: var(--red-primary);
        }
        
        .hamper-card.coming-soon-card .btn-secondary:hover {
          background: rgba(212, 175, 55, 0.06);
          border-color: var(--gold-accent);
          color: var(--gold-accent);
        }

        /* Sparking Loading Redirect Micro-animation */
        .loading-dots {
          display: inline-flex;
          gap: 4px;
        }
        .loading-dots span {
          width: 5px; height: 5px;
          background: currentColor;
          border-radius: 50%;
          animation: dotFlash 0.6s infinite alternate;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotFlash {
          from { opacity: 0.3; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.2); }
        }

        /* ── LUXURY DETAILS MODAL ── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(42, 23, 19, 0.65);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeInBackdrop 0.35s ease forwards;
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-box {
          background: var(--cream-light);
          border-radius: 28px;
          border: 1px solid rgba(200, 37, 37, 0.15);
          width: 100%;
          max-width: 820px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          box-shadow: 0 32px 80px rgba(42, 23, 19, 0.24);
          max-height: 90vh;
          animation: modalElastic 0.55s cubic-bezier(0.25, 1.1, 0.4, 1) forwards;
          position: relative;
        }
        
        .modal-box.modal-coming-soon {
          border-color: rgba(212, 175, 55, 0.3);
        }
        
        @keyframes modalElastic {
          from { opacity: 0; transform: scale(0.88) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 768px) {
          .modal-box {
            grid-template-columns: 1fr;
            max-height: 95vh;
            overflow: hidden;
          }
          .modal-img-side {
            height: 280px;
            min-height: 280px !important;
          }
        }

        /* Modal Left Image Panel */
        .modal-img-side {
          position: relative;
          overflow: hidden;
          min-height: 440px;
          background: #f0eae1;
        }
        .modal-img-side img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .modal-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 60%, rgba(42, 23, 19, 0.65) 100%);
        }
        .modal-img-price {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: var(--white);
          border: 1.5px solid var(--gold-accent);
          border-radius: 100px;
          padding: 8px 18px;
          font-size: 16px;
          font-weight: 700;
          color: var(--red-primary);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        /* Modal Right Content Panel */
       .modal-content-side {
  padding: 3rem 2.2rem 2.2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  background: var(--cream-light);
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  -webkit-overflow-scrolling: touch;
}

.modal-content-side::-webkit-scrollbar {
  display: none;
}

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--white);
          border: 1px solid var(--cream-border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--charcoal);
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 5;
        }
        .modal-close-btn:hover {
          background: var(--red-primary);
          border-color: var(--red-primary);
          color: var(--white);
          transform: rotate(90deg) scale(1.05);
        }
        .modal-close-btn svg { width: 16px; height: 16px; stroke: currentColor; stroke-width: 2.5; }

        .modal-eyebrow {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold-accent);
        }
        .modal-eyebrow.eyebrow-coming-soon {
          color: var(--gold-accent);
          background: linear-gradient(90deg, #D4AF37 0%, #E6C875 50%, #D4AF37 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 2.5s linear infinite;
        }
        
        @keyframes textShimmer {
          to { background-position: 200% center; }
        }

        .modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--charcoal);
  margin: 0.8rem 0 1rem;
  line-height: 1.1;
}

        .modal-desc {
          font-size: 13.5px;
          font-weight: 300;
          color: var(--text-muted);
          margin-top: 1.2rem;
          line-height: 1.75;
          white-space: pre-line;
        }

        /* Modal Image Navigation Indicators (Pill Carousel) */
        .modal-thumbnails {
  display: flex;
  gap: 8px;
  margin: 1rem 0 1.5rem;
  flex-wrap: wrap;
}
        .modal-thumb {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          opacity: 0.6;
          transition: all 0.25s ease;
        }
        .modal-thumb:hover {
          opacity: 0.9;
        }
        .modal-thumb.active {
          opacity: 1;
          border-color: var(--red-primary);
          box-shadow: 0 4px 10px rgba(200, 37, 37, 0.15);
        }
        .modal-thumb.thumb-coming-soon.active {
          border-color: var(--gold-accent);
          box-shadow: 0 4px 10px rgba(212, 175, 55, 0.2);
        }
        .modal-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 1.3rem;
        }
        .modal-badge {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.05em;
          background: var(--white);
          color: var(--text-muted);
          border: 1px solid var(--cream-border);
          border-radius: 100px;
          padding: 6px 14px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.01);
        }

        .modal-divider {
          height: 1px;
          background: var(--cream-border);
          margin: 1.8rem 0 1.5rem;
        }

        .modal-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* Redirection Toast Notice */
        .toast-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          background: var(--white);
          border-left: 4px solid var(--red-primary);
          border-top: 1px solid var(--cream-border);
          border-right: 1px solid var(--cream-border);
          border-bottom: 1px solid var(--cream-border);
          border-radius: 12px;
          padding: 16px 24px;
          box-shadow: 0 10px 30px rgba(42, 23, 19, 0.15);
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--charcoal);
          animation: slideInToast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes slideInToast {
          from { transform: translateX(80px) translateY(0); opacity: 0; }
          to { transform: translateX(0) translateY(0); opacity: 1; }
        }
        .toast-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--red-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--red-primary);
          font-size: 11px;
        }

        /* Generic keyframe animation utility for elements sliding upwards on load */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="shop-root">
        {/* Floating Sparks/Background graphics */}
        <div className="shop-bg-dots" aria-hidden="true" />
        <div className="ambient-sparkle ambient-sparkle-1" aria-hidden="true" />
        <div className="ambient-sparkle ambient-sparkle-2" aria-hidden="true" />
        <div className="ambient-sparkle ambient-sparkle-3" aria-hidden="true" />

      

        <section className="shop-section" id="shop">
          {/* Header Description panel */}
          <div className="shop-header">
            <div className="shop-eyebrow">The Signature Collection</div>
            <h1 className="shop-heading">
              Gourmet Hampers
              <br />
              <em>Indulgence Redefined</em>
            </h1>
            <p className="shop-subtext">
              Hand-assembled with signature red ribbons, premium organic pairings, and aesthetic treats to celebrate special moments.
            </p>
            <div className="shop-divider" aria-hidden="true">
              <div className="shop-divider-line" />
              <div className="shop-divider-diamond" />
              <div className="shop-divider-diamond" style={{ opacity: 0.35, width: 4, height: 4 }} />
              <div className="shop-divider-diamond" />
              <div className="shop-divider-line" />
            </div>
          </div>

          {/* Staggered Hamper Card Grid */}
          <div className="shop-grid">
            {hampers.map((hamper) => {
              const activeImgIndex = cardImageIndices[hamper.id] || 0;
              
              return (
                <div
                  key={hamper.id}
                  className={`hamper-card ${hamper.isComingSoon ? "coming-soon-card" : ""}`}
                  onMouseEnter={() => setHoveredId(hamper.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image Carousel wrapping */}
                  <div className="hamper-card-img-wrap">
                    {/* Render high-end elegant placeholder for coming soon hampers (No image files) */}
                    {hamper.isComingSoon ? (
                      <div className="coming-soon-placeholder">
                        
                        <div className="coming-soon-placeholder-title">{hamper.title}</div>
                        <div className="coming-soon-placeholder-subtitle">Unveiling Soon</div>
                      </div>
                    ) : (
                      <>
                        {/* Left Carousel Arrow */}
                        <button
                          className="carousel-arrow carousel-arrow-left"
                          onClick={(e) => prevCardImage(e, hamper.id, hamper.images ? hamper.images.length : 0)}
                          aria-label="Previous image"
                        >
                          ‹
                        </button>

                        {/* Right Carousel Arrow */}
                        <button
                          className="carousel-arrow carousel-arrow-right"
                          onClick={(e) => nextCardImage(e, hamper.id, hamper.images ? hamper.images.length : 0)}
                          aria-label="Next image"
                        >
                          ›
                        </button>

                        {/* Image Track */}
                        <div className="carousel-track">
                          {hamper.images && hamper.images.map((imgUrl, index) => (
                            <div
                              key={index}
                              className={`carousel-slide ${index === activeImgIndex ? "active" : ""}`}
                            >
                              <img
                                src={imgUrl}
                                alt={`${hamper.title} View ${index + 1}`}
                                className="hamper-card-img"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="hamper-card-img-overlay" />
                        
                        <div className="hamper-tag">{hamper.tag}</div>
                        
                        {/* Small Dot Selectors */}
                        <div className="carousel-dots">
                          {hamper.images && hamper.images.map((_, index) => (
                            <span
                              key={index}
                              className={`carousel-dot ${index === activeImgIndex ? "active" : ""}`}
                              onClick={(e) => selectCardImageDot(e, hamper.id, index)}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {hamper.isComingSoon && (
                      <div className="coming-soon-badge">Coming Soon</div>
                    )}
                    
                    <div className="hamper-price-chip">{hamper.price}</div>
                  </div>

                  {/* Description Body */}
                  <div className="hamper-card-body">
                    <h3 className="hamper-card-title">{hamper.title}</h3>
                    <p className="hamper-card-desc">{hamper.shortDescription}</p>
                    
                    <div className="hamper-card-actions">
                      {hamper.isComingSoon ? (
                        <button
                          className="btn-primary"
                          disabled
                        >
                          Coming Soon
                        </button>
                      ) : (
                        <a
                          href={hamper.buyUrl}
                          className="btn-primary"
                          onClick={(e) => handleBuyNow(e, hamper.id, hamper.buyUrl)}
                        >
                          {redirectingId === hamper.id ? (
                            <span className="loading-dots">
                              <span></span><span></span><span></span>
                            </span>
                          ) : (
                            <>Buy Now</>
                          )}
                        </a>
                      )}
                      
                      <button
                        className="btn-secondary"
                        onClick={() => setSelectedHamper(hamper)}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Premium Detail Zoom Modal */}
        {selectedHamper && (
          <div
            className="modal-backdrop"
            onClick={() => setSelectedHamper(null)}
          >
            <div
              className={`modal-box ${selectedHamper.isComingSoon ? "modal-coming-soon" : ""}`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedHamper.title}
            >
              {/* Left Side Panel - Image or high-fidelity placeholder */}
              <div className="modal-img-side">
                {selectedHamper.isComingSoon ? (
                  <div className="coming-soon-placeholder" style={{ height: "100%", minHeight: "360px" }}>
                    <div className="coming-soon-placeholder-emblem" style={{ fontSize: "3rem" }}>⚜</div>
                    <div className="coming-soon-placeholder-title" style={{ fontSize: "2rem" }}>
                      {selectedHamper.title}
                    </div>
                    <div className="coming-soon-placeholder-subtitle" style={{ fontSize: "11px" }}>
                      Curating A Masterpiece
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={selectedHamper.images ? selectedHamper.images[modalImageIndex] : ""}
                      alt={`${selectedHamper.title} detail view ${modalImageIndex + 1}`}
                    />
                    <div className="modal-img-overlay" />
                  </>
                )}
                <div className="modal-img-price">{selectedHamper.price}</div>
              </div>

              {/* Content side */}
              <div className="modal-content-side">
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedHamper(null)}
                  aria-label="Close details"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {selectedHamper.isComingSoon ? (
                  <div className="modal-eyebrow eyebrow-coming-soon">⚜ Exclusive Preview</div>
                ) : (
                  <div className="modal-eyebrow">⚜ Signature Curation</div>
                )}
                
                <h2 className="modal-title">{selectedHamper.title}</h2>
                
                {/* Thumbnail carousel selector inside Modal - ONLY rendered if not coming soon */}
                {!selectedHamper.isComingSoon && selectedHamper.images && (
                  <div className="modal-thumbnails">
                    {selectedHamper.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`modal-thumb ${idx === modalImageIndex ? "active" : ""}`}
                        onClick={() => setModalImageIndex(idx)}
                      >
                        <img src={imgUrl} alt="Thumbnail view" />
                      </div>
                    ))}
                  </div>
                )}

                <p className="modal-desc">{selectedHamper.fullDescription}</p>

                {/* Handcrafted Badges */}
                <div className="modal-badges">
                  {features.map((f) => (
                    <span key={f} className="modal-badge">✓ {f}</span>
                  ))}
                </div>

                <div className="modal-divider" />

                {/* Add actions */}
                <div className="modal-actions">
                  {selectedHamper.isComingSoon ? (
                    <button
                      className="btn-primary"
                      disabled
                      style={{ padding: "14px 0" }}
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <a
                      href={selectedHamper.buyUrl}
                      className="btn-primary"
                      style={{ padding: "14px 0" }}
                      onClick={(e) => {
                        handleBuyNow(e, selectedHamper.id, selectedHamper.buyUrl);
                        setSelectedHamper(null);
                      }}
                    >
                      {redirectingId === selectedHamper.id ? (
                        <span className="loading-dots">
                          <span></span><span></span><span></span>
                        </span>
                      ) : (
                        <>Confirm &amp; Buy Now</>
                      )}
                    </a>
                  )}
                  <button
                    className="btn-secondary"
                    style={{ padding: "14px 0" }}
                    onClick={() => setSelectedHamper(null)}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Redirecting Notification Toast */}
        {redirectingId !== null && (
          <div className="toast-notification">
            <span className="toast-icon">⚜</span>
            <span>Securing connection, redirecting you to checkout...</span>
          </div>
        )}
      </div>
    </>
  );
}