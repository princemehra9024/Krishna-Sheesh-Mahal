import { useEffect } from "react";
import RestaurantHeroSlider from "../components/RestaurantHeroSlider";
import QuoteSlider from "../components/QuoteSlider";
import IngredientsShowcase from "../components/IngredientsShowcase";
import PaneerScrollSequence from "../components/PaneerScrollSequence";

export default function Restaurant() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        /* ── RESTAURANT PAGE ── */
        .rest-page {
          padding-top: 0;
          background-color: #F3EDE4;
        }

        /* ── FEATURES STRIP ── */
        .rest-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: rgba(37, 28, 25, 0.1);
          border-top: 1px solid rgba(37, 28, 25, 0.1);
        }
        .rest-feat {
          background: #F3EDE4;
          padding: 52px 36px;
          text-align: center;
          transition: background 0.4s, transform 0.4s;
        }
        .rest-feat:hover {
          background: #fff;
          transform: translateY(-4px);
        }
        .rest-feat__icon {
          width: 44px; height: 44px;
          margin: 0 auto 20px;
          stroke: #251C19;
          opacity: 1;
        }
        .rest-feat__title {
          font-family: var(--font-2);
          font-size: 1.15rem;
          color: #251C19;
          margin-bottom: 8px;
        }
        .rest-feat__desc {
          font-family: var(--font-1);
          font-size: 0.9rem;
          color: #251C19;
          opacity: 0.8;
          line-height: 1.55;
        }

        /* ── SIGNATURE DISH SECTION ── */
        .rest-sig {
          background: linear-gradient(135deg, #1A1311 0%, #251C19 100%);
          display: flex;
          align-items: stretch;
          overflow: hidden;
          position: relative;
        }
        
        .rest-sig::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(94, 32, 45, 0.15) 0%, rgba(37, 28, 25, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .rest-sig__img, .rest-sig__text {
          width: 50%;
        }
        .rest-sig__img img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform 1.2s cubic-bezier(.2,1,.2,1);
        }
        .rest-sig:hover .rest-sig__img img {
          transform: scale(1.05);
        }
        .rest-sig__text {
          padding: 8vw 5vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        .rest-sig__text::before {
          content: '';
          position: absolute;
          top: 30px;
          right: 30px;
          width: 30%;
          height: 40%;
          border-top: 2px solid rgba(243, 237, 228, 0.2);
          border-right: 2px solid rgba(243, 237, 228, 0.2);
          pointer-events: none;
          transition: width 0.5s ease, height 0.5s ease, border-color 0.5s ease;
          border-top-right-radius: 4px;
        }
        .rest-sig__text::after {
          content: '';
          position: absolute;
          bottom: 30px;
          left: 30px;
          width: 30%;
          height: 40%;
          border-bottom: 2px solid rgba(243, 237, 228, 0.2);
          border-left: 2px solid rgba(243, 237, 228, 0.2);
          pointer-events: none;
          transition: width 0.5s ease, height 0.5s ease, border-color 0.5s ease;
          border-bottom-left-radius: 4px;
        }
        .rest-sig:hover .rest-sig__text::before,
        .rest-sig:hover .rest-sig__text::after {
          width: 35%;
          height: 45%;
          border-color: rgba(243, 237, 228, 0.5);
        }
        .rest-sig__eyebrow {
          font-family: var(--font-1);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          font-weight: 700;
          color: rgba(243, 237, 228, 0.6);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .rest-sig__eyebrow::before {
          content: '';
          width: 30px;
          height: 1px;
          background: rgba(243, 237, 228, 0.6);
        }
        
        .rest-sig__title {
          font-family: var(--font-2);
          font-size: clamp(3rem, 5vw, 5.5rem);
          line-height: 1.05;
          margin-bottom: 20px;
          font-weight: 500;
          color: #F3EDE4;
          text-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .rest-sig__title em {
          font-family: var(--font-3);
          font-weight: 300;
          font-style: italic;
          display: block;
          color: var(--cream, #F3EDE4);
          opacity: 0.8;
          font-size: 1.15em;
          margin-top: 5px;
        }
        .rest-sig__rule {
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, var(--maroon, #5E202D), transparent);
          border: none;
          margin: 32px 0;
        }
        .rest-sig__body {
          font-family: var(--font-1);
          font-size: 1.15rem;
          line-height: 1.7;
          color: #F3EDE4;
          opacity: 0.9;
          max-width: 460px;
          margin-bottom: 32px;
        }
        .rest-sig__cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          color: #F3EDE4;
          border: 1px solid rgba(243, 237, 228, 0.3);
          padding: 16px 36px;
          border-radius: 40px;
          font-family: var(--font-1);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.4s ease;
          align-self: flex-start;
          outline: none;
          position: relative;
          overflow: hidden;
        }
        .rest-sig__cta::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: #F3EDE4;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: -1;
        }
        .rest-sig__cta:focus-visible {
          box-shadow: 0 0 0 3px rgba(243, 237, 228, 0.5);
        }
        .rest-sig__cta:hover {
          color: #251C19;
          border-color: #F3EDE4;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .rest-sig__cta:hover::before {
          transform: translateX(0);
        }
        .rest-sig__cta svg {
          transition: transform 0.4s ease;
        }
        .rest-sig__cta:hover svg {
          transform: translateX(4px);
        }
        @media (max-width: 768px) {
          .rest-sig { flex-direction: column; }
          .rest-sig__img, .rest-sig__text { width: 100%; }
          .rest-sig__img { height: 50vh; }
          .rest-sig__text { padding: 10vw 5vw; }
        }
        @media (max-width: 480px) {
          .rest-features { grid-template-columns: 1fr; }
        }

        /* ── QUOTE SLIDER OVERRIDE ── */
        .rest-quote-wrapper .section-colorway-green {
          background-color: #251C19 !important;
          --background-color: #251C19 !important;
          --heading-color: #F3EDE4 !important;
          --text-color: #F3EDE4 !important;
          --border-color: #F3EDE4 !important;
        }
        .rest-quote-wrapper .quote p:not(.subtitle) {
          color: #F3EDE4 !important;
        }
        .rest-quote-wrapper .flickity-page-dots,
        .rest-quote-wrapper .quote cite strong {
          color: #F3EDE4 !important;
        }
        
        /* Carousel Controls Overhaul */
        .rest-quote-wrapper .section-quote-slider {
          padding-bottom: 40px !important;
        }
        .rest-quote-wrapper .flickity__controls {
          flex-direction: row !important;
          position: absolute !important;
          bottom: 20px !important;
          right: 50% !important;
          transform: translateX(50%) !important;
          gap: 20px !important;
          background: transparent !important;
        }
        .rest-quote-wrapper .flickity__controls::after { display: none !important; }
        .rest-quote-wrapper .flickity-button {
          width: 50px !important;
          height: 50px !important;
          border: 1px solid rgba(243, 237, 228, 0.3) !important;
          border-radius: 50% !important;
          background: transparent !important;
          transition: background 0.3s !important;
        }
        .rest-quote-wrapper .flickity-button:hover {
          background: rgba(243, 237, 228, 0.1) !important;
        }
        .rest-quote-wrapper .flickity-button::before {
          background-color: #F3EDE4 !important;
        }
        .rest-quote-wrapper .flickity-page-dots {
          position: absolute !important;
          bottom: -10px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          top: auto !important;
        }
        
        @media (max-width: 768px) {
          .rest-quote-wrapper .flickity__controls {
            bottom: -30px !important;
          }
          .rest-quote-wrapper .flickity-page-dots {
            bottom: -60px !important;
          }
        }
      `}</style>

      <div className="rest-page">
        {/* ── HERO SLIDER ── */}
        <RestaurantHeroSlider />

        {/* ── FEATURES STRIP ── */}
        <section className="rest-features" aria-label="Restaurant features">
          <div className="rest-feat">
            <svg className="rest-feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            <h3 className="rest-feat__title">Open Daily</h3>
            <p className="rest-feat__desc">Breakfast 7–10 AM · Dinner 7–11 PM</p>
          </div>
          <div className="rest-feat">
            <svg className="rest-feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <h3 className="rest-feat__title">Private Dining</h3>
            <p className="rest-feat__desc">Exclusive spaces for up to 30 guests</p>
          </div>
          <div className="rest-feat">
            <svg className="rest-feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
            <h3 className="rest-feat__title">Multi-Cuisine</h3>
            <p className="rest-feat__desc">Indian, Continental & Asian fusion menus</p>
          </div>
          <div className="rest-feat">
            <svg className="rest-feat__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h3 className="rest-feat__title">Curated by Love</h3>
            <p className="rest-feat__desc">Every dish crafted with passion & precision</p>
          </div>
        </section>

        {/* ── SIGNATURE DISH SECTION ── */}
        <section className="rest-sig" aria-label="Signature experience">
          <div className="rest-sig__img">
            <img
              src="/images/paan-shake.jpeg"
              alt="Paan Shake at Krishna Sheesh Mahal"
              loading="lazy"
            />
          </div>
          <div className="rest-sig__text">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <p className="rest-sig__eyebrow">OUR PHILOSOPHY</p>
              <h2 className="rest-sig__title">
                Flavour
                <em>Perfected.</em>
              </h2>
              <hr className="rest-sig__rule" />
              <p className="rest-sig__body">
                Every dish at Krishna Sheesh Mahal tells a story — of locally sourced ingredients, time-honored recipes, and a relentless pursuit of culinary excellence. Our chefs blend traditional Rajasthani flavors with contemporary techniques to create an experience that lingers long after the last bite.
              </p>
              <a href="#restaurant-hero" className="rest-sig__cta">
                RESERVE YOUR TABLE
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── PANEER SCROLL SEQUENCE ── */}
        <PaneerScrollSequence />

        {/* ── INGREDIENTS SHOWCASE ── */}
        <IngredientsShowcase />

        {/* ── QUOTE SLIDER ── */}
        <div className="rest-quote-wrapper">
          <QuoteSlider />
        </div>
      </div>
    </>
  );
}
