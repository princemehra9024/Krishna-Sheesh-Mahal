import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowUpRight, Utensils, Coffee, Bed, PartyPopper } from "lucide-react";

interface ScrollingLogosProps {
  title?: string;
  subtitle?: string;
}

export interface SpaceCard {
  id: string;
  title: string;
  subtitle: string;
  category: "dining" | "stay" | "events";
  tag: string;
  src: string;
  href: string;
  icon?: string;
}

// Curated 12 distinct luxury spaces for desktop columns
const DESKTOP_SPACES: SpaceCard[] = [
  // Column 1
  {
    id: "celebrations",
    title: "Grand Celebrations",
    subtitle: "Royal Weddings & Sangeet",
    category: "events",
    tag: "Royal Wedding",
    src: "/images/banquet/wedding-canopy.png",
    href: "/banquet",
    icon: "events",
  },
  {
    id: "fine-dining",
    title: "Fine Dining",
    subtitle: "Heritage Multi-Cuisine",
    category: "dining",
    tag: "Gourmet Dining",
    src: "/images/restaurant-img.jpeg",
    href: "/restaurant",
    icon: "dining",
  },
  {
    id: "cafe-lounge",
    title: "Cafe & Lounge",
    subtitle: "Bistro Bites & Relaxed Vibes",
    category: "dining",
    tag: "Cozy Bistro",
    src: "/images/cafe/neon-lit-cafe-lounge-interior.png",
    href: "/cafe",
    icon: "dining",
  },
  {
    id: "chef-mastery",
    title: "Culinary Mastery",
    subtitle: "Signature Chef's Platters",
    category: "dining",
    tag: "Chef's Table",
    src: "/images/restaurant-hero-5.jpeg",
    href: "/restaurant",
    icon: "dining",
  },

  // Column 2
  {
    id: "artisan-coffee",
    title: "Artisan Coffee",
    subtitle: "Specialty Roasts & Brews",
    category: "dining",
    tag: "Specialty Brews",
    src: "/images/cafe-pour.jpg",
    href: "/cafe",
    icon: "coffee",
  },
  {
    id: "luxury-suites",
    title: "Luxury Suites",
    subtitle: "Palatial Comfort & Royal Decor",
    category: "stay",
    tag: "Palatial Suites",
    src: "/images/rooms/luxury-suite-royal.jpg",
    href: "/rooms",
    icon: "stay",
  },
  {
    id: "majestic-banquet",
    title: "Majestic Banquet",
    subtitle: "Crystal Chandeliers & Halls",
    category: "events",
    tag: "Grand Ballroom",
    src: "/images/banquet/festive-facade.png",
    href: "/banquet",
    icon: "events",
  },
  {
    id: "corporate-venues",
    title: "Corporate Venues",
    subtitle: "High-Tech Summits & Meets",
    category: "events",
    tag: "Business Meets",
    src: "/images/banquet/conference-hall.png",
    href: "/banquet",
    icon: "events",
  },

  // Column 3
  {
    id: "sweet-patisserie",
    title: "Sweet Patisserie",
    subtitle: "Fresh Pastries & Shakes",
    category: "dining",
    tag: "Artisan Bakery",
    src: "/images/cafe/cafe_special.jpg",
    href: "/cafe",
    icon: "coffee",
  },
  {
    id: "bespoke-decor",
    title: "Bespoke Banquets",
    subtitle: "Custom Themes & Table Decor",
    category: "events",
    tag: "Luxury Styling",
    src: "/images/banquet/elegant-interior.png",
    href: "/banquet",
    icon: "events",
  },
  {
    id: "royal-welcome",
    title: "Palace Welcome",
    subtitle: "24/7 Personalized Hospitality",
    category: "stay",
    tag: "Royal Courtesy",
    src: "/images/hotel-reception-lobby.png",
    href: "/about",
    icon: "stay",
  },
  {
    id: "premium-comfort",
    title: "Executive Comfort",
    subtitle: "Modern Luxury & City Panoramas",
    category: "stay",
    tag: "Deluxe Stay",
    src: "/banquet-corporate.jpg",
    href: "/rooms",
    icon: "stay",
  },
];

// Curated 6 high-impact cards for mobile (3 in Column 1, 3 in Column 2)
const MOBILE_COL_1: SpaceCard[] = [
  {
    id: "mob-celebrations",
    title: "Grand Celebrations",
    subtitle: "Weddings & Royal Galas",
    category: "events",
    tag: "Royal Weddings",
    src: "/images/banquet/wedding-canopy.png",
    href: "/banquet",
    icon: "events",
  },
  {
    id: "mob-dining",
    title: "Fine Dining",
    subtitle: "Heritage Multi-Cuisine",
    category: "dining",
    tag: "Gourmet Dining",
    src: "/images/restaurant-img.jpeg",
    href: "/restaurant",
    icon: "dining",
  },
  {
    id: "mob-cafe-lounge",
    title: "Cafe & Lounge",
    subtitle: "Social Bistro & Mocktails",
    category: "dining",
    tag: "Cozy Bistro",
    src: "/images/cafe/neon-lit-cafe-lounge-interior.png",
    href: "/cafe",
    icon: "dining",
  },
];

const MOBILE_COL_2: SpaceCard[] = [
  {
    id: "mob-coffee",
    title: "Artisan Coffee",
    subtitle: "Specialty Roasts & Bakery",
    category: "dining",
    tag: "Specialty Brews",
    src: "/images/cafe-pour.jpg",
    href: "/cafe",
    icon: "coffee",
  },
  {
    id: "mob-suites",
    title: "Luxury Suites",
    subtitle: "Palatial Comfort & Grandeur",
    category: "stay",
    tag: "Palatial Suites",
    src: "/images/rooms/luxury-suite-royal.jpg",
    href: "/rooms",
    icon: "stay",
  },
  {
    id: "mob-banquet",
    title: "Event Spaces",
    subtitle: "Grand Chandeliers & Ballrooms",
    category: "events",
    tag: "Grand Ballroom",
    src: "/banquet-hero.jpg",
    href: "/banquet",
    icon: "events",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Spaces" },
  { id: "dining", label: "Dining & Cafe" },
  { id: "stay", label: "Royal Suites" },
  { id: "events", label: "Banquets & Events" },
] as const;

export default function ScrollingLogos({ 
  title = "DISCOVER OUR SPACES",
  subtitle = "Explore our exquisitely decorated rooms, authentic fine dining restaurant, artisan coffee bar, and opulent banquet halls tailored for royalty."
}: ScrollingLogosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth spring-based transforms for zero jitter and buttery-smooth glide
  const rawY1 = useTransform(scrollYProgress, [0, 1], ["-12%", "-38%"]);
  const rawY2 = useTransform(scrollYProgress, [0, 1], ["-38%", "-12%"]);
  const rawY3 = useTransform(scrollYProgress, [0, 1], ["-18%", "-42%"]);

  const y1 = useSpring(rawY1, { stiffness: 90, damping: 25 });
  const y2 = useSpring(rawY2, { stiffness: 90, damping: 25 });
  const y3 = useSpring(rawY3, { stiffness: 90, damping: 25 });

  // Mobile smooth dynamic differential glide (glides ±48px with silky spring physics)
  const rawYMob1 = useTransform(scrollYProgress, [0, 1], [40, -42]);
  const rawYMob2 = useTransform(scrollYProgress, [0, 1], [-35, 45]);
  const yMob1 = useSpring(rawYMob1, { stiffness: 85, damping: 22 });
  const yMob2 = useSpring(rawYMob2, { stiffness: 85, damping: 22 });

  // Filtered lists for category tabs
  const filteredDesktop = activeCategory === "all" 
    ? DESKTOP_SPACES 
    : DESKTOP_SPACES.filter(s => s.category === activeCategory);

  const col1 = filteredDesktop.slice(0, 4);
  const col2 = filteredDesktop.slice(4, 8);
  const col3 = filteredDesktop.slice(8, 12);

  const filteredMobile = activeCategory === "all"
    ? null
    : [...MOBILE_COL_1, ...MOBILE_COL_2].filter(s => s.category === activeCategory);

  const handleCardClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderIcon = (icon?: string) => {
    switch (icon) {
      case "dining": return <Utensils size={12} />;
      case "coffee": return <Coffee size={12} />;
      case "stay": return <Bed size={12} />;
      case "events": return <PartyPopper size={12} />;
      default: return <Sparkles size={12} />;
    }
  };

  const SpaceBox = ({ item, index }: { item: SpaceCard; index: number }) => {
    // Subtle continuous ambient floating animation with staggered durations
    const floatDuration = 3.8 + (index % 3) * 0.4;
    const floatDelay = (index % 4) * 0.3;

    return (
      <motion.div
        layout
        className="logo-box group"
        onClick={() => handleCardClick(item.href)}
        data-cursor-txt="EXPLORE"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.025, y: -6 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Ambient gentle breathing float */}
        <motion.div 
          className="logo-box-inner"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: floatDelay
          }}
        >
          {/* Main Card Image */}
          <img 
            src={item.src} 
            alt={item.title} 
            loading="lazy"
            className="logo-box-img"
          />

          {/* Shimmer sheen light reflection */}
          <div className="logo-box-sheen" />

          {/* Luxury multi-layer overlay */}
          <div className="logo-box-overlay" />

          {/* Top header: Glassmorphic Tag + Arrow Button */}
          <div className="logo-box-top">
            <span className="logo-box-tag">
              {renderIcon(item.icon)}
              <span>{item.tag}</span>
            </span>
            <div className="logo-box-arrow" aria-label="Explore space">
              <ArrowUpRight size={15} />
            </div>
          </div>

          {/* Bottom content: Title and Subtitle */}
          <div className="logo-box-bottom">
            <h3 className="logo-box-label">{item.title}</h3>
            <p className="logo-box-subtitle">{item.subtitle}</p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const LogoColumn = ({ items, y, className = "logo-column" }: { items: SpaceCard[]; y: any; className?: string }) => (
    <motion.div style={{ y }} className={className}>
      {items.map((item, i) => (
        <SpaceBox key={item.id + i} item={item} index={i} />
      ))}
    </motion.div>
  );

  return (
    <section ref={containerRef} className="parallax-logos-section" id="spaces">
      {/* Background ambient royal glow orbs */}
      <div className="parallax-bg-glow-1" />
      <div className="parallax-bg-glow-2" />

      <div className="parallax-logos-content">
        <div className="parallax-logos-text">
          {/* Pre-header luxury badge */}
          <motion.div 
            className="parallax-badge"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={13} className="parallax-badge-icon" />
            <span>Royal Hospitality &amp; Grandeur</span>
          </motion.div>

          <motion.h2 
            className="parallax-logos-title"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            {title.includes("OUR SPACES") ? (
              <>
                DISCOVER OUR <span className="title-accent-gold">SPACES</span>
              </>
            ) : (
              title
            )}
          </motion.h2>

          <motion.p 
            className="parallax-logos-desc"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
          >
            {subtitle}
          </motion.p>

          {/* Interactive Category Filter Pills */}
          <motion.div 
            className="parallax-filter-tabs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`parallax-filter-btn ${isActive ? "active" : ""}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="parallax-filter-pill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="parallax-filter-label">{cat.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="parallax-logos-grid">
          {isMobile ? (
            filteredMobile ? (
              <div className="logo-column-filtered-mobile">
                <AnimatePresence mode="popLayout">
                  {filteredMobile.map((item, idx) => (
                    <SpaceBox key={item.id} item={item} index={idx} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <LogoColumn items={MOBILE_COL_1} y={yMob1} className="logo-column logo-column--mob-1" />
                <LogoColumn items={MOBILE_COL_2} y={yMob2} className="logo-column logo-column--mob-2" />
              </>
            )
          ) : (
            <>
              <LogoColumn items={[...col1, ...col1]} y={y1} />
              <LogoColumn items={[...col2, ...col2]} y={y2} />
              <LogoColumn items={[...col3, ...col3]} y={y3} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

