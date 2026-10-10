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

  // Use constrained ranges to ensure we never run out of duplicated images at the top or bottom
  const y1 = useTransform(scrollYProgress, [0, 1], ["-15%", "-40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-40%", "-15%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-20%", "-45%"]);

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
