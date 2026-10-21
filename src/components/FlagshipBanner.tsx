import { useState, useEffect } from "react";
import { HERO_YOUTUBE_ID, HERO_POSTER } from "../data";
import { Play, X, Sparkles } from "lucide-react";

export default function FlagshipBanner() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <>
      <section className="flagship-banner section-colorway-black">
        <div className="flagship-banner__bg">
          <div className="flagship-banner__bg-inner" data-scroll data-scroll-speed="-0.25">
            <div className="flagship-banner__yt-container">
              {/* High-res poster preview while YouTube iframe initializes */}
              <img
                src={HERO_POSTER}
                alt="Krishna Sheesh Mahal"
                className={`flagship-banner__poster ${videoLoaded ? "is-hidden" : ""}`}
                loading="eager"
              />

              {/* Seamless looping background video */}
              <iframe
                className="flagship-banner__iframe"
                src={`https://www.youtube-nocookie.com/embed/${HERO_YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_YOUTUBE_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1`}
                title="Krishna Sheesh Mahal Hero Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onLoad={() => setVideoLoaded(true)}
              />
            </div>
            {/* Cinematic dark gradient overlay for text readability */}
            <div className="flagship-banner__overlay" />
          </div>
        </div>

        <div className="flagship-banner__inner" style={{ paddingTop: "10vh" }}>
          <h2
            className="flagship-banner__title-inline"
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.95)",
              marginBottom: "-2rem",
              zIndex: 2,
              position: "relative",
              textShadow: "0 2px 12px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)",
            }}
            data-scroll
            data-scroll-speed="0.3"
          >
            <em>Your Comfort, Our Priority</em>
          </h2>

          <div className="flagship-banner__logo" data-scroll data-scroll-speed="0.5">
            <h1
              style={{
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                lineHeight: "1",
                fontWeight: 400,
                fontFamily: "var(--font-2)",
                color: "#fff",
                letterSpacing: "0.05em",
                textAlign: "center",
                textTransform: "uppercase",
                margin: 0,
                textShadow: "0 4px 25px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.95)",
              }}
            >
              Krishna
              <br />
              Sheesh
              <br />
              Mahal
            </h1>
          </div>

          <div className="flagship-banner__txt-cols section section--large">
            <div className="flagship-banner__txt-col">
              <p>Experience the perfect blend of quality, luxury, and design in every room.</p>
            </div>
          </div>

          {/* Interactive Luxury Film Button */}
          <div className="flagship-banner__actions" data-scroll data-scroll-speed="0.2">
            <button
              type="button"
              className="flagship-banner__watch-btn"
              onClick={() => setIsModalOpen(true)}
              aria-label="Watch video with sound"
            >
              <span className="flagship-banner__watch-icon">
                <Play size={13} fill="currentColor" />
              </span>
              <span>Watch Film & Dining</span>
              <Sparkles size={14} style={{ color: "var(--color-gold, #c5a880)" }} />
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal with sound and full HD playback */}
      {isModalOpen && (
        <div
          className="flagship-modal"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="flagship-modal__box" onClick={(e) => e.stopPropagation()}>
            <div className="flagship-modal__header">
              <h3 className="flagship-modal__title">Krishna Sheesh Mahal | A Premium Dining Experience</h3>
              <button
                type="button"
                className="flagship-modal__close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close video player"
              >
                <X size={16} />
                <span>Close</span>
              </button>
            </div>
            <div className="flagship-modal__player-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${HERO_YOUTUBE_ID}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
                title="Krishna Sheesh Mahal Experience"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
