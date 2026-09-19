import { useEffect } from "react";
import RestaurantHeroSlider from "../components/RestaurantHeroSlider";
import QuoteSlider from "../components/QuoteSlider";

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
        }

        /* ── FEATURES STRIP ── */
        .rest-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          background: #f5f2ef;
          border-top: 1px solid #eae7e3;
        }
        .rest-feat {
          background: #fff;
          padding: 52px 36px;
          text-align: center;
          transition: background 0.4s, transform 0.4s;
        }
        .rest-feat:hover {
          background: #faf9f7;
          transform: translateY(-4px);
        }
        .rest-feat__icon {
          width: 44px; height: 44px;
          margin: 0 auto 20px;
          stroke: #344541;
          opacity: 0.6;
        }
        .rest-feat__title {
          font-family: var(--font-2);
          font-size: 1.15rem;
          color: #344541;
          margin-bottom: 8px;
        }
        .rest-feat__desc {
          font-family: var(--font-1);
          font-size: 0.9rem;
          color: #6B6B6B;
          line-height: 1.55;
        }

        /* ── SIGNATURE DISH SECTION ── */
        .rest-sig {
          display: flex;
          align-items: stretch;
          min-height: 70vh;
          background: #344541;
          color: #fff;
        }
        .rest-sig__img {
          flex: 0 0 50%;
          overflow: hidden;
          position: relative;
        }
        .rest-sig__img img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(.2,1,.2,1);
        }
        .rest-sig:hover .rest-sig__img img {
          transform: scale(1.04);
        }
        .rest-sig__text {
          flex: 1;
          padding: 6% 6%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .rest-sig__eyebrow {
          font-family: var(--font-1);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          color: #FF9F87;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .rest-sig__title {
          font-family: var(--font-2);
          font-size: clamp(2.5rem, 4vw, 4.5rem);
          line-height: 1.08;
          margin-bottom: 16px;
          font-weight: 600;
        }
        .rest-sig__title em {
          font-family: var(--font-3);
          font-style: italic;
          font-weight: 300;
          display: block;
        }
        .rest-sig__rule {
          width: 40px; height: 2px;
          background: #FF9F87;
          border: none;
          margin-bottom: 24px;
        }
        .rest-sig__body {
          font-family: var(--font-1);
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.7);
          max-width: 460px;
          margin-bottom: 32px;
        }
        .rest-sig__cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FF9F87;
          color: #344541;
          border: none;
          padding: 14px 34px;
          border-radius: 40px;
          font-family: var(--font-1);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          transition: background 0.3s, transform 0.3s;
          align-self: flex-start;
        }
        .rest-sig__cta:hover {
          background: #f08e74;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .rest-features { grid-template-columns: repeat(2, 1fr); }
          .rest-sig { flex-direction: column; }
          .rest-sig__img { flex: none; height: 50vh; }
          .rest-sig__text { padding: 10% 6%; }
        }
        @media (max-width: 480px) {
          .rest-features { grid-template-columns: 1fr; }
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
              src="https://thepopuphotel.com/wp-content/uploads/2023/11/tpuh-restaurant-790x790.jpg"
              alt="Signature dining experience at Krishna Sheesh Mahal"
              loading="lazy"
            />
          </div>
          <div className="rest-sig__text">
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
        </section>

        {/* ── QUOTE SLIDER ── */}
        <QuoteSlider />
      </div>
    </>
  );
}
