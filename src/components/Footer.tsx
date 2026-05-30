"use client";

import { useState } from "react";

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <style>{`
        .footer {
          border-top: 1px solid rgba(201, 145, 61, 0.3);
          padding: 3rem 2rem;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(201, 145, 61, 0.06)
          );
        }

        .footer-inner {
          max-width: 1120px;
          margin: 0 auto;
        }

        .footer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .footer-brand {
          font-family: Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          color: #c9913d;
          text-shadow: 0 0 18px rgba(201, 145, 61, 0.35);
          letter-spacing: 0.01em;
        }

        .footer-brand span {
          color: #c9913d;
          margin-right: 6px;
          display: inline-block;
          animation: twinkle 3s ease-in-out infinite;
        }

        .footer-copy {
          font-size: 13px;
          font-weight: 500;
          color: light-dark(#3a2416, #c9a97a);
          margin: 0;
          text-align: center;
          flex: 1;
          opacity: 0.85;
        }

        .footer-nav {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .footer-nav a {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: light-dark(#3a2416, #c9a97a);
          text-decoration: none;
          transition: color 0.2s ease, text-shadow 0.2s ease;
          opacity: 0.85;
        }

        .footer-nav a:hover {
          color: #c9913d;
          text-shadow: 0 0 10px rgba(201, 145, 61, 0.5);
          opacity: 1;
        }

        .terms-wrapper {
          text-align: center;
          margin-top: 1rem;
        }

        .terms-btn {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #b83a2f, #d34d3f);
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(184, 58, 47, 0.3);
        }

        .terms-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.45s ease;
        }

        .terms-btn:hover::before {
          left: 160%;
        }

        .terms-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(184, 58, 47, 0.4);
        }

        /* MODAL OVERLAY — uses min-height trick to avoid fixed positioning */

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 9999;
          animation: fadeIn 0.2s ease;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
        }

        .modal {
          background: light-dark(#fff, #1e130b);
          border: 1px solid light-dark(rgba(201,145,61,0.15), rgba(201,145,61,0.25));
          width: 100%;
          max-width: 700px;
          border-radius: 24px;
          padding: 30px;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(201, 145, 61, 0.1);
          max-height: 85vh;
          overflow-y: auto;
          animation: slideUp 0.25s ease;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: light-dark(#1a0f07, #f0dab8);
          margin-bottom: 1rem;
        }

        .modal-list {
          padding-left: 20px;
          margin: 0;
        }

        .modal-list li {
          color: light-dark(#2b1a10, #c9a97a);
          font-size: 15px;
          line-height: 1.9;
          margin-bottom: 12px;
        }

        .modal-list li::marker {
          color: #c9913d;
        }

        .close-btn {
          margin-top: 20px;
          background: #b83a2f;
          color: white;
          border: none;
          padding: 12px 22px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 12px rgba(184, 58, 47, 0.3);
        }

        .close-btn:hover {
          background: #a02f25;
          transform: translateY(-1px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.7; transform: scale(1.15) rotate(20deg); }
        }

        /* Dark mode explicit fallback for browsers that don't support light-dark() */
        @media (prefers-color-scheme: dark) {
          .footer-copy,
          .footer-nav a {
            color: #c9a97a;
          }
          .modal {
            background: #1e130b;
            border-color: rgba(201, 145, 61, 0.25);
          }
          .modal-title {
            color: #f0dab8;
          }
          .modal-list li {
            color: #c9a97a;
          }
        }

        @media (max-width: 680px) {
          .footer-top {
            flex-direction: column;
            text-align: center;
          }

          .footer-nav {
            justify-content: center;
            flex-wrap: wrap;
          }

          .modal {
            padding: 22px;
          }

          .modal-title {
            font-size: 20px;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">

          <div className="footer-top">
            <span className="footer-brand">
              <span>✦</span>Meant to Be Originals
            </span>

            <p className="footer-copy">
              © {new Date().getFullYear()} Meant to Be Originals. Made with ❤️
            </p>

            <nav className="footer-nav">
              <a href="#home">Home</a>
              <a href="#shop">Shop</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>

          <div className="terms-wrapper">
            <button
              className="terms-btn"
              onClick={() => setShowTerms(true)}
            >
              Terms & Conditions
            </button>
          </div>

        </div>
      </footer>

      {showTerms && (
        <div
          className="modal-overlay"
          onClick={() => setShowTerms(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">
              Terms & Conditions
            </h2>

            <ol className="modal-list">
              <li>Only one product per purchase.</li>
              <li>
                There is no refund policy. The product will be delivered once
                the purchase is completed to the provided address.
              </li>
              <li>Shipping usually takes 3–7 working days.</li>
              <li>There is no compromise on pricing.</li>
              <li>
                We may contact you through the provided phone number or email
                address regarding any important updates related to your purchase.
              </li>
            </ol>

            <button
              className="close-btn"
              onClick={() => setShowTerms(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
