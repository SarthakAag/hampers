"use client";

import { useState } from "react";

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <style>{`
        .footer {
          border-top: 1px solid rgba(201,145,61,0.25);
          padding: 3rem 2rem;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(245,233,211,0.22)
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
          color: #1a0f07;
        }

        .footer-brand span {
          color: #c9913d;
          margin-right: 6px;
        }

        .footer-copy {
          font-size: 13px;
          font-weight: 500;
          color: #3a2416;
          margin: 0;
          text-align: center;
          flex: 1;
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
          color: #3a2416;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-nav a:hover {
          color: #b83a2f;
        }

        .terms-wrapper {
          text-align: center;
          margin-top: 1rem;
        }

        .terms-btn {
          background: linear-gradient(135deg, #b83a2f, #d34d3f);
          color: white;
          border: none;
          padding: 12px 22px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.25s ease;
        }

        .terms-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(184,58,47,0.25);
        }

        /* MODAL */

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 9999;
          animation: fadeIn 0.2s ease;
        }

        .modal {
          background: #fff;
          width: 100%;
          max-width: 700px;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          max-height: 85vh;
          overflow-y: auto;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a0f07;
          margin-bottom: 1rem;
        }

        .modal-list {
          padding-left: 20px;
          margin: 0;
        }

        .modal-list li {
          color: #2b1a10;
          font-size: 15px;
          line-height: 1.9;
          margin-bottom: 12px;
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
        }

        .close-btn:hover {
          background: #a02f25;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
              <li>
                Only one product per purchase.
              </li>

              <li>
                There is no refund policy. The product
                will be delivered once the purchase is
                completed to the provided address.
              </li>

              <li>
                Shipping usually takes 3–7 working days.
              </li>

              <li>
                There is no compromise on pricing.
              </li>

              <li>
                We may contact you through the provided
                phone number or email address regarding
                any important updates related to your
                purchase.
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