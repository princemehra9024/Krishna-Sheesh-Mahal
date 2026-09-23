import { useCallback, useState, useEffect } from "react";
import { QUOTES } from "../data";

const pad = (n: number) => String(n).padStart(2, "0");

export default function QuoteSlider() {
  const [index, setIndex] = useState(0);
  const total = QUOTES.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  // Automatic scrolling (autoplay)
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      <style>{`
        .flickity__item-img {
          transition: box-shadow 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1);
          border-radius: 16px;
          overflow: hidden;
        }
        
        .flickity__item.is-selected .flickity__item-img {
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
          transform: translateY(-12px);
        }

        .flickity__item-img picture img {
          transition: transform 9s cubic-bezier(0.25, 1, 0.5, 1);
          transform: scale(1.0);
        }

        .flickity__item.is-selected .flickity__item-img picture img {
          transform: scale(1.15);
        }

        .quote__logo, .quote p, .quote footer {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .flickity__item.is-selected .quote__logo {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.15s;
        }

        .flickity__item.is-selected .quote p {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.35s;
          position: relative;
        }

        .flickity__item.is-selected .quote p::before {
          content: '“';
          position: absolute;
          top: -70px;
          left: -50px;
          font-family: var(--font-2, serif);
          font-size: 10rem;
          color: rgba(255,255,255,0.08);
          line-height: 1;
          z-index: -1;
          opacity: 0;
          transform: scale(0.3) rotate(-20deg);
          animation: quoteMarkPop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.5s;
          pointer-events: none;
        }

        @keyframes quoteMarkPop {
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .flickity__item.is-selected .quote footer {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.55s;
        }

        /* Autoplay Progress Bar */
        .autoplay-progress-container {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 3px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .autoplay-progress-bar {
          height: 100%;
          background: rgba(255,255,255,0.7);
          width: 0%;
          animation: progressFill 6s linear infinite;
        }

        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
      <section id="section-4-1" className="section-quote-slider pv-large section-colorway-green">
      <div className="hide-overflow">
        <div className="section section--large">
          <div className="flickity flickity--quote flickity-enabled" data-scroll data-scroll-css-progress>
            <div className="flickity__viewport">
              {QUOTES.map((q, i) => (
                <div className={`flickity__item${i === index ? " is-selected" : ""}`} key={q.source} aria-hidden={i !== index}>
                  <div className="flickity__item-img parallax-opacity">
                    <picture>
                      <img loading={i === 0 ? "eager" : "lazy"} className="img-full" width={790} height={790} src={q.img} alt="" />
                    </picture>
                  </div>
                  <div className="flickity__item-quote" data-scroll data-scroll-speed="0.05">
                    <blockquote className="quote">
                      <div className="quote__logo quote__logo--recolor">
                        <img loading="lazy" className="img-full" width={q.logoW} height={q.logoH} src={q.logo} alt={q.source} />
                      </div>
                      <p>{q.text}</p>
                      <footer>
                        <cite>
                          <strong>{q.source}</strong>
                        </cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>

            <div className="flickity__controls">
              <button className="flickity-button previous" type="button" aria-label="Previous" onClick={prev} />
              <button className="flickity-button next" type="button" aria-label="Next" onClick={next} />
            </div>
            <div className="flickity-page-dots" aria-live="polite" style={{ position: 'relative', marginTop: '20px' }}>
              <span style={{ display: 'block', marginBottom: '15px' }}>{pad(index + 1)} / {pad(total)}</span>
              <div className="autoplay-progress-container">
                <div key={index} className="autoplay-progress-bar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
