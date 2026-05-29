"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  // Only mount the mobile menu into the DOM after first open
  // This prevents any flash on initial page load / reload
  const openMenu = () => {
    setMenuMounted(true);
    // tiny delay so display:flex is painted before opacity transitions in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuOpen(true));
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    // wait for fade-out transition to finish before unmounting
    setTimeout(() => setMenuMounted(false), 400);
  };

  const scrollToSection = (id: string) => {
    closeMenu();
    // slight delay so menu closes before scroll happens
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Shop", id: "shop" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          max-width: 1280px;
          z-index: 999;
          background: rgba(255, 250, 242, 0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(243, 223, 211, 0.9);
          border-radius: 999px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06),
            0 2px 10px rgba(185, 28, 28, 0.04);
          padding: 10px 28px;
          font-family: sans-serif;
          transition: all 0.3s ease;
        }

        .navbar-inner {
          max-width: 1280px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* BRAND */
        .brand {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  user-select: none;
  align-items: flex-end; /* aligns logo bottom with text baseline */
}

 .logo-wrapper {
  width: 58px;
  height: 58px;
  min-width: 58px;   /* prevents flex from squishing or expanding it */
  min-height: 58px;
  overflow: hidden;  /* hard clips anything that escapes */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.35s ease;
}

        .brand:hover .logo-wrapper {
          transform: scale(1.06);
        }

       .logo-image {
  width: 100%;
  height: 100%;
  max-width: 58px;
  max-height: 58px;
  object-fit: contain;
  filter: drop-shadow(0 8px 18px rgba(192, 57, 43, 0.18));
}
        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 1.45rem;
          font-weight: 700;
          color: #b91c1c;
          letter-spacing: -0.5px;
        }

        .brand-tagline {
          font-size: 0.62rem;
          color: #9a6a4b;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          margin-top: 2px;
        }

        /* NAV LINKS */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 12px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links li button {
          background: none;
          border: none;
          cursor: pointer;
          color: #5b4332;
          font-size: 0.98rem;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 999px;
          transition: 0.3s ease;
        }

        .nav-links li button:hover {
          background: #fde6d7;
          color: #b91c1c;
        }

        .nav-btn {
          background: linear-gradient(135deg, #c0392b, #e74c3c) !important;
          color: white !important;
          box-shadow: 0 6px 20px rgba(192, 57, 43, 0.18);
        }

        .nav-btn:hover {
          transform: translateY(-2px);
        }

        /* HAMBURGER */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .hamburger span {
          display: block;
          width: 24px;
          height: 3px;
          background: #b91c1c;
          border-radius: 4px;
          transition: 0.3s ease;
        }

        /* MOBILE MENU
           — NOT in DOM at all until first open (menuMounted).
           — No backdrop-filter: avoids the black-blur flash on mobile WebKit.
           — Solid background instead, which paints reliably. */
        .mobile-menu {
          position: fixed;
          inset: 0;
          /* solid cream — no backdrop-filter which causes black flash on mobile */
          background: #fffaf2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          z-index: 998;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .mobile-menu.open {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-menu button {
          background: none;
          border: none;
          font-size: 2rem;
          font-weight: 700;
          color: #5b4332;
          cursor: pointer;
          font-family: sans-serif;
          transition: color 0.2s ease;
        }

        .mobile-menu button:hover {
          color: #b91c1c;
        }

        .mobile-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50% !important;
          background: #fde6d7 !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem !important;
          color: #b91c1c !important;
          font-weight: 400 !important;
        }

        .mobile-btn {
          background: linear-gradient(135deg, #c0392b, #e74c3c) !important;
          color: white !important;
          padding: 14px 36px !important;
          border-radius: 999px !important;
          font-size: 1.1rem !important;
          box-shadow: 0 6px 20px rgba(192, 57, 43, 0.22);
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }

        @media (max-width: 600px) {
          .navbar {
            width: calc(100% - 20px);
            top: 10px;
            padding: 10px 18px;
          }
          .brand-name {
            font-size: 1.2rem;
          }
          .brand-tagline {
            font-size: 0.55rem;
          }
          .logo-wrapper {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>

      {/* MOBILE MENU — only rendered in DOM when menuMounted is true */}
      {menuMounted && (
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {/* Close X button */}
          <button className="mobile-close" onClick={closeMenu} aria-label="Close menu">
            ✕
          </button>

          {navItems.map((item) => (
            <button key={item.label} onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}

          <button className="mobile-btn" onClick={() => scrollToSection("shop")}>
            Shop Now
          </button>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">

          {/* BRAND */}
          <div className="brand" onClick={() => scrollToSection("home")}>
            <div className="logo-wrapper">
              <img
                src="/logo.png"
                alt="Luxury Hampers Logo"
                className="logo-image"
                  width={58}
  height={58}
  style={{ width: "58px", height: "58px", objectFit: "contain" }}
              />
            </div>
            <div className="brand-text">
              <span className="brand-name">Luxury Hampers</span>
              <span className="brand-tagline">Curated Gift Experiences</span>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <button onClick={() => scrollToSection(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                className="nav-btn"
                onClick={() => scrollToSection("shop")}
              >
                Shop Now
              </button>
            </li>
          </ul>

          {/* HAMBURGER */}
          <button
            className="hamburger"
            onClick={openMenu}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>
    </>
  );
}