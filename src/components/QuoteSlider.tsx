import { useCallback, useState, useEffect, useRef } from "react";
import { QUOTES } from "../data";

const pad = (n: number) => String(n).padStart(2, "0");

export default function QuoteSlider() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const total = QUOTES.length;
  const current = QUOTES[index];
  const sectionRef = useRef<HTMLElement | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  // Autoplay timer with pause support
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, [next, isPlaying, isHovered]);

  // Keyboard navigation when section is in viewport
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      next(); // Swiped left -> next
    } else if (diff < -50) {
      prev(); // Swiped right -> prev
    }
    setTouchStartX(null);
  };

  return (
    <>
      <style>{`
        .luxury-quote-section {
          position: relative;
          background: linear-gradient(145deg, #3d1219 0%, #240a0e 100%);
          overflow: hidden;
          padding: 100px 0;
          color: #f7f3ec;
        }

        /* Ambient luxury glow effects */
        .luxury-quote-section::before {
          content: "";
          position: absolute;
          top: -20%;
          left: -10%;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .luxury-quote-section::after {
          content: "";
          position: absolute;
          bottom: -15%;
          right: -5%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 75%);
          pointer-events: none;
          z-index: 0;
        }

        .luxury-quote-container {
          position: relative;
          z-index: 1;
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 30px;
        }

        /* Top Bar: Section Title & Interactive Autoplay Status */
        .quote-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .quote-category-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-1, sans-serif);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #d4af37;
        }

        .quote-category-tag .tag-sparkle {
          display: inline-block;
          font-size: 1rem;
          color: #e5c158;
          animation: sparkleSpin 4s ease-in-out infinite;
        }

        @keyframes sparkleSpin {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
          50% { transform: scale(1.25) rotate(180deg); opacity: 1; }
        }

        .quote-autoplay-toggle {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 30px;
          padding: 6px 14px;
          font-size: 0.78rem;
          color: #e3ded6;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .quote-autoplay-toggle:hover {
          background: rgba(212, 175, 55, 0.15);
          border-color: #d4af37;
          color: #fff;
          transform: translateY(-1px);
        }

        .quote-autoplay-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 10px #4ade80;
          transition: background 0.3s ease;
        }

        .quote-autoplay-dot.is-paused {
          background: #fbbf24;
          box-shadow: 0 0 8px #fbbf24;
        }

        /* Main Grid: Quote Content & Hero Media */
        .quote-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
        }

        /* Left Side: Editorial Quote Card */
        .quote-editorial-card {
          position: relative;
          padding: 20px 0;
        }

        /* Giant Watermark Quote Mark */
        .quote-watermark {
          position: absolute;
          top: -40px;
          left: -20px;
          font-family: var(--font-2, "Playfair Display", Georgia, serif);
          font-size: 11rem;
          line-height: 0.8;
          color: rgba(212, 175, 55, 0.08);
          pointer-events: none;
          user-select: none;
          z-index: -1;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .quote-rating-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .quote-stars {
          display: flex;
          gap: 4px;
          color: #d4af37;
          font-size: 1.15rem;
          text-shadow: 0 0 12px rgba(212, 175, 55, 0.4);
        }

        .quote-score-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #fce79a;
          letter-spacing: 0.5px;
        }

        .quote-badge-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          font-size: 0.78rem;
          color: #ddd5c9;
        }

        .quote-text-quote {
          font-family: var(--font-2, "Playfair Display", Georgia, serif);
          font-size: clamp(1.45rem, 2.4vw, 2.15rem);
          font-weight: 400;
          font-style: italic;
          line-height: 1.45;
          color: #ffffff;
          margin: 0 0 32px 0;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
          transition: all 0.5s ease;
        }

        .quote-reviewer-info {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          padding-top: 15px;
          border-top: 1px dashed rgba(212, 175, 55, 0.25);
        }

        .quote-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 8px 16px;
          min-height: 50px;
          backdrop-filter: blur(4px);
        }

        .quote-logo-wrap img {
          max-height: 28px;
          max-width: 140px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }

        .quote-author-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .quote-author-name {
          font-size: 1.05rem;
          font-weight: 600;
          color: #f7f3ec;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .quote-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #4ade80;
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(74, 222, 128, 0.12);
          padding: 2px 8px;
          border-radius: 12px;
          border: 1px solid rgba(74, 222, 128, 0.25);
        }

        .quote-author-tag {
          font-size: 0.82rem;
          color: #c9bca9;
          letter-spacing: 0.5px;
        }

        /* Right Side: Visual Showcase Card */
        .quote-visual-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(212, 175, 55, 0.25);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
          background: #1a060a;
          aspect-ratio: 1 / 1;
          max-height: 520px;
        }

        .quote-visual-wrapper:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 40px 75px -15px rgba(0, 0, 0, 0.75), 0 0 0 1.5px rgba(212, 175, 55, 0.45);
        }

        .quote-visual-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 7s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s ease;
          transform: scale(1.02);
        }

        .quote-visual-wrapper:hover .quote-visual-img {
          transform: scale(1.08);
        }

        /* Overlay glass gradient for the image */
        .quote-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 40%, rgba(20,5,8,0.75) 100%);
          pointer-events: none;
        }

        .quote-visual-caption {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(18, 5, 8, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 14px;
          padding: 12px 18px;
          color: #f7f3ec;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .quote-visual-caption span {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f2eade;
        }

        .quote-visual-caption .caption-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4af37;
        }

        /* Bottom Controls & Interactive Selector Tabs */
        .quote-bottom-controls {
          margin-top: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          flex-wrap: wrap;
        }

        /* Interactive Review Tabs */
        .quote-selector-tabs {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .quote-tab-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 30px;
          padding: 10px 18px;
          color: #d1c8bc;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .quote-tab-btn:hover {
          background: rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.4);
          color: #fff;
          transform: translateY(-2px);
        }

        .quote-tab-btn.is-active {
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(184, 134, 11, 0.15) 100%);
          border-color: #d4af37;
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.2);
        }

        .quote-tab-btn .tab-num {
          font-family: var(--font-1, sans-serif);
          font-size: 0.75rem;
          opacity: 0.7;
          letter-spacing: 1px;
        }

        .quote-tab-btn.is-active .tab-num {
          color: #fce79a;
          opacity: 1;
        }

        /* Action Buttons: Prev, Next & Progress */
        .quote-nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .quote-counter-display {
          font-family: var(--font-1, sans-serif);
          font-size: 0.95rem;
          letter-spacing: 2px;
          color: #e5ded2;
          font-weight: 600;
        }

        .quote-nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #f7f3ec;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
        }

        .quote-nav-btn:hover {
          background: #d4af37;
          border-color: #d4af37;
          color: #1a0508;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
        }

        .quote-nav-btn:active {
          transform: scale(0.96);
        }

        /* Global Continuous Progress Bar */
        .quote-progress-track {
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          margin-top: 36px;
          overflow: hidden;
        }

        .quote-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #d4af37 0%, #f9e29f 50%, #d4af37 100%);
          width: 0%;
          animation: luxuryProgressFill 6s linear infinite;
        }

        .quote-progress-fill.is-paused {
          animation-play-state: paused;
        }

        @keyframes luxuryProgressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* Responsive breakpoints */
        @media (max-width: 1024px) {
          .quote-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .quote-visual-wrapper {
            max-height: 420px;
            order: -1;
          }
          .quote-watermark {
            font-size: 8rem;
          }
        }

        @media (max-width: 768px) {
          .luxury-quote-section {
            padding: 60px 0;
          }
          .quote-top-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .quote-bottom-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 20px;
          }
          .quote-selector-tabs {
            justify-content: center;
          }
          .quote-nav-actions {
            justify-content: space-between;
          }
        }
      `}</style>

      <section
        id="section-4-1"
        ref={sectionRef}
        className="luxury-quote-section"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="luxury-quote-container">
          {/* Header row with luxury badge & interactive autoplay control */}
          <div className="quote-top-bar">
            <div className="quote-category-tag">
              <span className="tag-sparkle">✦</span>
              <span>Distinguished Guest Reviews &amp; Press Accolades</span>
            </div>

            <button
              type="button"
              className="quote-autoplay-toggle"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause auto-rotation" : "Start auto-rotation"}
            >
              <span className={`quote-autoplay-dot ${!isPlaying || isHovered ? "is-paused" : ""}`} />
              <span>
                {!isPlaying ? "Autoplay: Paused" : isHovered ? "Hovered: Paused" : "Autoplay: Active"}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                {isPlaying && !isHovered ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
            </button>
          </div>

          {/* Main Hero Grid */}
          <div className="quote-hero-grid">
            {/* Left Column: Editorial Quote */}
            <div className="quote-editorial-card">
              <div className="quote-watermark">“</div>

              {/* Rating stars & score badges */}
              <div className="quote-rating-bar">
                <div className="quote-stars" aria-label="5 out of 5 stars">
                  {"★".repeat(current.rating || 5)}
                </div>
                {current.score && (
                  <span className="quote-score-pill">
                    <span>★</span> {current.score}
                  </span>
                )}
                {current.badge && (
                  <span className="quote-badge-pill">{current.badge}</span>
                )}
                {current.tag && (
                  <span className="quote-badge-pill">{current.tag}</span>
                )}
              </div>

              {/* Quote Headline / Content */}
              <blockquote className="quote-text-quote" key={`text-${index}`}>
                “{current.text.replace(/^["“]+|["”]+$/g, "")}”
              </blockquote>

              {/* Reviewer / Publication attribution */}
              <div className="quote-reviewer-info">
                {current.logo && (
                  <div className="quote-logo-wrap">
                    <img
                      src={current.logo}
                      alt={current.source}
                      width={current.logoW}
                      height={current.logoH}
                    />
                  </div>
                )}
                <div className="quote-author-meta">
                  <div className="quote-author-name">
                    <span>{current.source}</span>
                    <span className="quote-verified-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified
                    </span>
                  </div>
                  <span className="quote-author-tag">
                    Krishna Sheesh Mahal • Kota, Rajasthan
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase Media */}
            <div className="quote-visual-wrapper">
              <img
                key={`img-${index}`}
                className="quote-visual-img"
                src={current.img}
                alt={current.imageCaption || current.source}
                loading="lazy"
              />
              <div className="quote-visual-overlay" />
              <div className="quote-visual-caption">
                <span>
                  <span className="caption-dot" />
                  {current.imageCaption || "Luxury Sheesh Mahal Hospitality"}
                </span>
                <span style={{ fontSize: "0.78rem", opacity: 0.8 }}>
                  {pad(index + 1)} / {pad(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Bottom Controls: Tab Selector & Navigation */}
          <div className="quote-bottom-controls">
            {/* Direct selector pills */}
            <div className="quote-selector-tabs" role="tablist">
              {QUOTES.map((q, i) => (
                <button
                  key={q.source + i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  className={`quote-tab-btn ${i === index ? "is-active" : ""}`}
                  onClick={() => setIndex(i)}
                >
                  <span className="tab-num">{pad(i + 1)}</span>
                  <span>{q.badge || q.source.split("•")[0].trim()}</span>
                </button>
              ))}
            </div>

            {/* Action buttons with custom luxury SVG arrows */}
            <div className="quote-nav-actions">
              <span className="quote-counter-display">
                {pad(index + 1)} <span style={{ opacity: 0.4 }}>/</span> {pad(total)}
              </span>

              <button
                type="button"
                className="quote-nav-btn"
                onClick={prev}
                aria-label="Previous review"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                className="quote-nav-btn"
                onClick={next}
                aria-label="Next review"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Continuous luxury auto-play progress bar */}
          <div className="quote-progress-track">
            <div
              key={`${index}-${isPlaying}-${isHovered}`}
              className={`quote-progress-fill ${!isPlaying || isHovered ? "is-paused" : ""}`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
