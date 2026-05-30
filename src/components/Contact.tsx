"use client";

import { useEffect, useState } from "react";

// The Gifting curation team profiles
const people = [
  { 
    name: "Aryan", 
    phone: "8217872439", 
    initials: "A", 
    role: "Brand & Partnerships" 
  },
  { 
    name: "Shruthi", 
    phone: "6380217412", 
    initials: "S", 
    role: "Gifting Consultant" 
  },
];

// Curated social and contact channels specifically for the Gifting Shop
const socials = [
  {
    id: 1,
    label: "Write To Us",
    value: "meanttobe.originals@gmail.com",
    href: "mailto:meanttobe.originals@gmail.com",
    subtext: "Typically replies within 24 hours",
    svgIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    )
  },
  {
    id: 2,
    label: "Follow Us",
    value: "@meant.to.be_originals",
    href: "https://www.instagram.com/meanttobe.originals?igsh=MWF0azJ1bmpzazMxcw%3D%3D&utm_source=qr",
    subtext: "Explore curations & customer reviews",
    svgIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )
  },
  {
    id: 3,
    label: "Like Us",
    value: "Meant To Be Originals",
    href: "https://www.facebook.com/people/Meant-to-be/61589726623889/",
    subtext: "Join our growing community",
    svgIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  }
];

export default function Contact() {
  return (
    <>
      {/* Google Fonts & CSS Style Declarations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;700&display=swap');

        .contact-root {
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
  padding: 6rem 2rem 7rem;
  position: relative;
  overflow: hidden; /* scoped — won't bleed into siblings */
}
        .contact-root * { box-sizing: border-box; }

        /* Floating Sparks & Background animations */
        .contact-sparkle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, transparent 70%);
          z-index: 0;
          animation: contactFloatSparks 15s infinite alternate ease-in-out;
        }
        .contact-sparkle-1 {
          width: 450px; height: 450px;
          top: -100px; left: -150px;
          animation-duration: 22s;
        }
        .contact-sparkle-2 {
          width: 500px; height: 500px;
          bottom: -150px; right: -120px;
          animation-duration: 26s;
          background: radial-gradient(circle, rgba(200, 37, 37, 0.05) 0%, transparent 70%);
        }

        @keyframes contactFloatSparks {
          0% { transform: translateY(0) scale(1) rotate(0deg); }
          50% { transform: translateY(-30px) scale(1.06) rotate(180deg); }
          100% { transform: translateY(15px) scale(0.94) rotate(360deg); }
        }

        .contact-bg-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(200, 37, 37, 0.015) 1.5px, transparent 1.5px);
          background-size: 32px 32px;
          opacity: 0.8;
          z-index: 0;
        }

        .contact-container {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Premium Header Section */
        .contact-header {
          text-align: center;
          margin-bottom: 5rem;
          opacity: 0;
          animation: contactFadeInUp 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .contact-eyebrow {
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
        .contact-eyebrow::before,
        .contact-eyebrow::after {
          content: '';
          display: block;
          width: 32px;
          height: 1.5px;
          background: var(--gold-accent);
          opacity: 0.6;
        }

        .contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5.5vw, 5.0rem);
          font-weight: 300;
          color: var(--charcoal);
          line-height: 1.1;
          letter-spacing: -0.015em;
          margin: 0;
        }
        .contact-title span {
          color: var(--red-primary);
          font-style: italic;
          font-weight: 400;
        }

        .contact-subtitle {
          margin-top: 1.25rem;
          font-size: 16px;
          font-weight: 300;
          color: var(--text-muted);
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
        }

        /* Divider Decoration */
        .contact-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 2rem;
        }
        .contact-divider-line {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold-accent), transparent);
        }
        .contact-divider-diamond {
          width: 6px; height: 6px;
          background: var(--red-primary);
          transform: rotate(45deg);
          opacity: 0.85;
          box-shadow: 0 0 8px rgba(200, 37, 37, 0.4);
        }

        /* Balanced 5-Column Responsive Auto-Fit Grid Layout */
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 22px;
          margin-top: 2.5rem;
        }

        @media (max-width: 480px) {
          .contact-grid {
            grid-template-columns: 1fr;
            max-width: 380px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        /* Premium Info Cards */
        .contact-card {
          background: var(--white);
          border-radius: 26px;
          border: 1px solid var(--cream-border);
          padding: 2.5rem 1.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: var(--shadow-card);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          text-decoration: none; /* Make entire card clickable */
          color: inherit;
          opacity: 0;
          transform: translateY(30px);
          animation: contactFadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        
        .contact-card:nth-child(1) { animation-delay: 0.08s; }
        .contact-card:nth-child(2) { animation-delay: 0.16s; }
        .contact-card:nth-child(3) { animation-delay: 0.24s; }
        .contact-card:nth-child(4) { animation-delay: 0.32s; }
        .contact-card:nth-child(5) { animation-delay: 0.4s; }

        .contact-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-card-hover);
          border-color: rgba(200, 37, 37, 0.28);
        }

        /* Avatar and Icon Badges */
        .avatar-badge, .icon-badge {
          width: 64px;
          height: 64px;
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.6rem;
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          box-shadow: 0 8px 20px rgba(200, 37, 37, 0.05);
        }
        
        .icon-badge {
          background: linear-gradient(135deg, var(--red-light), var(--gold-light) 150%);
          color: var(--red-primary);
        }

        /* Red-Gold luxury avatar for Shruthi and Aryan */
        .avatar-badge {
          background: linear-gradient(135deg, var(--red-primary), var(--red-hover));
          color: var(--white);
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          font-size: 24px;
          border: 1.5px solid rgba(212, 175, 55, 0.35);
        }

        .contact-card:hover .icon-badge,
        .contact-card:hover .avatar-badge {
          background: var(--red-primary);
          color: var(--white);
          transform: scale(1.08) rotate(4deg);
          box-shadow: 0 10px 24px rgba(200, 37, 37, 0.25);
          border-color: var(--gold-accent);
        }

        .icon-badge svg {
          transition: transform 0.35s ease;
        }
        .contact-card:hover .icon-badge svg {
          transform: scale(1.05);
        }

        /* Card Typography */
        .card-label {
          font-size: 10.5px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-accent);
          margin: 0 0 0.6rem;
          font-weight: 700;
          transition: color 0.3s;
        }
        .contact-card:hover .card-label {
          color: var(--red-primary);
        }

        .card-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 500;
          color: var(--charcoal);
          margin: 0 0 0.5rem;
          line-height: 1.25;
          letter-spacing: -0.01em;
          transition: color 0.3s;
        }
        .contact-card:hover .card-value {
          color: var(--red-primary);
        }

        .card-subtext {
          font-size: 12.5px;
          font-weight: 300;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.6;
        }

        /* Generic keyframe animation utility for elements sliding upwards on load */
        @keyframes contactFadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="contact-root" id="contact">
        {/* Floating Sparks/Background graphics */}
        <div className="contact-bg-dots" aria-hidden="true" />
        <div className="contact-sparkle contact-sparkle-1" aria-hidden="true" />
        <div className="contact-sparkle contact-sparkle-2" aria-hidden="true" />

        <div className="contact-container">
          {/* Header Description Section */}
          <div className="contact-header">
          
            <h2 className="contact-title">
              Contact <span>Us</span>
            </h2>
            <p className="contact-subtitle">
              We'd love to create your perfect hamper. Let's design custom gift experiences crafted specially for your brand and celebrations.
            </p>
            <div className="contact-divider" aria-hidden="true">
              <div className="contact-divider-line" />
              <div className="contact-divider-diamond" />
              <div className="contact-divider-diamond" style={{ opacity: 0.35, width: 4, height: 4 }} />
              <div className="contact-divider-diamond" />
              <div className="contact-divider-line" />
            </div>
          </div>

          {/* Centered 5-Column Luxury Cards */}
          <div className="contact-grid">
            
            {/* Render Shruthi & Aryan profiles from the people array */}
            {people.map((p) => (
              <a
                key={p.name}
                href={`tel:${p.phone}`}
                className="contact-card"
              >
                {/* Red-Gold Avatar Initials badge */}
                <div className="avatar-badge">
                  {p.initials}
                </div>

                <p className="card-label">Talk to {p.name}</p>
                <h3 className="card-value">+91 {p.phone}</h3>
                <p className="card-subtext">{p.role}</p>
              </a>
            ))}

            {/* Render Email, Instagram, and Facebook socials */}
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-card"
              >
                {/* SVG Icon Badge */}
                <div className="icon-badge">
                  {item.svgIcon}
                </div>

                <p className="card-label">{item.label}</p>
                <h3 className="card-value">{item.value}</h3>
                <p className="card-subtext">{item.subtext}</p>
              </a>
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}