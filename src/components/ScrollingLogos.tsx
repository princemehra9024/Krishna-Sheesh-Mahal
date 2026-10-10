import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HERO_POSTER, ABOUT_IMAGES } from "../data";

interface ScrollingLogosProps {
  title?: string;
}

// Custom images for the hotel spaces with descriptive labels
const SPACE_IMAGES = [
  { src: "/images/restaurant-img.jpeg", label: "Fine Dining" },
  { src: "/images/cafe/cafe_hero.jpg", label: "Cafe & Lounge" },
  { src: "/banquet-hero.jpg", label: "Majestic Banquet" },
  { src: HERO_POSTER, label: "Grand Celebrations" },
  { src: ABOUT_IMAGES.primary2x, label: "Luxury Suites" },
  { src: ABOUT_IMAGES.secondary2x, label: "Reception" },
  { src: "/images/restaurant-img.jpeg", label: "Culinary Excellence" },
  { src: "/images/cafe/cafe_hero.jpg", label: "Coffee Shop" },
  { src: "/banquet-hero.jpg", label: "Event Spaces" },
  { src: HERO_POSTER, label: "Nightlife" },
  { src: ABOUT_IMAGES.primary2x, label: "Premium Comfort" },
  { src: ABOUT_IMAGES.secondary2x, label: "Our Lobby" },
];

export default function ScrollingLogos({ title = "DISCOVER OUR SPACES" }: ScrollingLogosProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Split images into 3 columns
  const col1 = SPACE_IMAGES.slice(0, 4);
  const col2 = SPACE_IMAGES.slice(4, 8);
  const col3 = SPACE_IMAGES.slice(8, 12);

  const LogoColumn = ({ images, y }: { images: typeof SPACE_IMAGES, y: any }) => (
    <motion.div style={{ y }} className="logo-column">
      {images.map((img, i) => (
        <div key={i} className="logo-box" data-cursor-txt="VIEW">
          <img src={img.src} alt={img.label} />
          <div className="logo-box-overlay"></div>
          <h3 className="logo-box-label">{img.label}</h3>
        </div>
      ))}
    </motion.div>
  );

  return (
    <section ref={containerRef} className="parallax-logos-section">
      <style>{`
        .parallax-logos-section {
          padding: 120px 5%;
          background-color: var(--about-light);
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
        }
        .parallax-logos-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1300px;
          gap: 4rem;
        }
        .parallax-logos-text {
          flex: 1;
          z-index: 10;
        }
        .parallax-logos-title {
          font-family: var(--font-2), serif;
          font-size: clamp(3.5rem, 5vw, 5rem);
          color: var(--about-text);
          line-height: 1.1;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
        }
        .parallax-logos-desc {
          font-size: 1.25rem;
          color: #444; /* Darkened for better contrast and visibility */
          font-weight: 400;
          line-height: 1.7;
          max-width: 420px;
        }
        .parallax-logos-grid {
          flex: 1.8;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          height: 700px;
          overflow: hidden;
          position: relative;
          /* Fade out top and bottom for a seamless look */
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
        .logo-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .parallax-logos-grid > .logo-column:nth-child(2) {
          margin-top: 80px;
        }
        .logo-box {
          background: #ffffff;
          border-radius: 20px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          aspect-ratio: 4/5;
          border: 1px solid rgba(0,0,0,0.04);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        
        /* Gradient overlay to protect the text label and add subtle dimming */
        .logo-box-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
          transition: background 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }
        .logo-box:hover .logo-box-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 100%);
        }
        
        .logo-box-label {
          position: absolute;
          bottom: 25px;
          left: 25px;
          right: 25px;
          margin: 0;
          color: #fff;
          font-family: var(--font-1);
          font-size: 1.35rem;
          font-weight: 700;
          z-index: 2;
          text-shadow: 0 4px 15px rgba(0,0,0,0.6);
          letter-spacing: 0.02em;
          text-transform: uppercase;
          opacity: 0.9;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          transform: translateY(10px);
        }
        .logo-box:hover .logo-box-label {
          transform: translateY(0);
          opacity: 1;
        }

        .logo-box:hover {
          transform: scale(1.03) translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          z-index: 2;
        }
        .logo-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .logo-box:hover img {
          transform: scale(1.08);
        }
        
        /* Responsive adjustments */
        @media (max-width: 900px) {
          .parallax-logos-content {
            flex-direction: column;
            text-align: center;
          }
          .parallax-logos-desc {
            margin: 0 auto;
          }
          .parallax-logos-grid {
            width: 100%;
            height: 600px; /* Taller on tablet to show more */
          }
          .parallax-logos-grid > .logo-column:nth-child(2) {
            margin-top: 50px;
          }
        }
        @media (max-width: 600px) {
          .parallax-logos-section {
            padding: 80px 5%;
          }
          .parallax-logos-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            height: 500px;
          }
          .logo-column {
            gap: 1rem;
          }
          .parallax-logos-grid > .logo-column:nth-child(2) {
            margin-top: 30px;
          }
          .parallax-logos-grid > .logo-column:nth-child(3) {
            display: none; /* hide 3rd column on small screens */
          }
          .logo-box-label {
            font-size: 1rem;
            bottom: 15px;
            left: 15px;
            right: 15px;
          }
          .logo-box {
            border-radius: 12px;
          }
        }
      `}</style>

      <div className="parallax-logos-content">
        <div className="parallax-logos-text">
          <motion.h2 
            className="parallax-logos-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="parallax-logos-desc"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Explore our elegantly designed rooms, fine dining restaurant, relaxing cafe, and majestic banquet halls, all tailored for an unforgettable experience.
          </motion.p>
        </div>

        <div className="parallax-logos-grid">
          {/* Double the images in each column to allow smooth parallax scrolling */}
          <LogoColumn images={[...col1, ...col1, ...col1]} y={y1} />
          <LogoColumn images={[...col2, ...col2, ...col2]} y={y2} />
          <LogoColumn images={[...col3, ...col3, ...col3]} y={y3} />
        </div>
      </div>
    </section>
  );
}
