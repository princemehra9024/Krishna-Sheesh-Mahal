import { HERO_POSTER, ABOUT_IMAGES } from "../data";
import ScrollingLogos from "../components/ScrollingLogos";
import QuoteSlider from "../components/QuoteSlider";
import { Link } from "react-router-dom";
import { useMemo, useRef } from "react";
import { useSEO } from "../hooks/useSEO";
import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";

export default function About() {
  useSEO("About Us | Krishna Sheesh Mahal Kota", "Experience an era of royal elegance reimagined for the modern traveler.");
  
  const statement = "Born from a passion for creating unforgettable memories, our journey began in Kota, where we sought to transform how people experience hospitality.";
  const words = useMemo(() => statement.split(" "), [statement]);

  // Framer Motion physics for dragging the 3D cylinder
  const dragX = useMotionValue(0);
  const smoothDragX = useSpring(dragX, { damping: 30, stiffness: 90 });
  const rotationY = useTransform(smoothDragX, [-1500, 1500], [-90, 90]);

  const cards = [
    { title: "Dining", subtitle: "Culinary Excellence", img: ABOUT_IMAGES.primary2x, angle: -80 },
    { title: "Heritage", subtitle: "Our Legacy", img: ABOUT_IMAGES.secondary2x, angle: -40 },
    { title: "Events", subtitle: "Grand Celebrations", img: HERO_POSTER, angle: 0 },
    { title: "Stays", subtitle: "Premium Comfort", img: ABOUT_IMAGES.primary2x, angle: 40 },
    { title: "Design", subtitle: "Timeless Architecture", img: ABOUT_IMAGES.secondary2x, angle: 80 },
  ];

  // --- LXL Creative Premium Card Animation Math ---
  const lxlRef = useRef(null);
  
  // 1. Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: lxlRef,
    offset: ["start end", "end start"]
  });
  
  // Card moves up slightly on scroll
  const cardScrollY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  // Image moves down inside the card on scroll (inner parallax)
  const imageScrollY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // 2. 3D Magnetic Hover Tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Map mouse 0-1 to rotation degrees
  const cardRotateX = useTransform(smoothMouseY, [0, 1], [12, -12]);
  const cardRotateY = useTransform(smoothMouseX, [0, 1], [-12, 12]);
  
  // Map mouse to magnetic arrow movement
  const arrowX = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const arrowY = useTransform(smoothMouseY, [0, 1], [-20, 20]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  
  const handleCardMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

          /* --- Studio Animation Hero (Jesper Landberg exact clone) --- */
          :root {
            --about-light: #f5f3ed;
            --about-text: #111111;
            --about-accent: var(--maroon);
          }

          .jl-hero {
            --radius: 60vw;
            position: relative;
            width: 100%;
            height: 100vh;
            background-color: var(--about-light);
            overflow: hidden;
            color: var(--about-text);
            font-family: var(--font-1), sans-serif;
          }

          /* Minimal UI Overlays */
          .jl-ui {
            position: absolute;
            z-index: 50;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            color: rgba(0,0,0,0.5);
            font-weight: 600;
            pointer-events: none;
          }
          .jl-ui-tl { top: 40px; left: 40px; }
          .jl-ui-tr { top: 40px; right: 40px; }
          .jl-ui-bl { bottom: 40px; left: 40px; }
          .jl-ui-br { bottom: 40px; right: 40px; }

          .jl-scene {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            perspective: 1200px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            overflow: hidden;
          }

          .jl-carousel-container {
            position: relative;
            width: 100%; height: 100%;
            transform-style: preserve-3d;
            transform: translateZ(calc(var(--radius) * -1)); 
          }

          .jl-carousel {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            transform-style: preserve-3d;
          }

          .jl-floor {
            position: absolute;
            top: 50%; left: -100vw;
            width: 300vw; height: 300vw;
            background-image: 
              linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
            background-size: 80px 80px;
            transform: translate3d(0, 35vh, 0) rotateX(90deg);
            pointer-events: none;
            mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 50%);
            -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 50%);
          }

          .jl-card {
            position: absolute;
            top: 50%; left: 50%;
            width: 30vw;
            height: 55vh;
            margin-top: -27.5vh;
            margin-left: -15vw;
            background: #fff;
            border-radius: 6px;
            overflow: visible; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            border: 1px solid rgba(0,0,0,0.05);
            transform-style: preserve-3d;
            pointer-events: none;
          }

          .jl-card img {
            width: 100%; height: 100%;
            object-fit: cover;
            opacity: 1;
            filter: grayscale(0%) contrast(1.05);
            border-radius: 6px;
            transition: all 0.4s ease;
          }

          /* Add a strong gradient overlay for text readability */
          .jl-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
            border-radius: 6px;
            pointer-events: none;
            z-index: 5;
          }

          .jl-card-title {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%) translateZ(40px);
            font-family: var(--font-2), serif;
            font-size: clamp(2.5rem, 5vw, 6rem);
            color: #fff;
            z-index: 10;
            margin: 0;
            text-align: center;
            white-space: nowrap;
            text-shadow: 0 10px 40px rgba(0,0,0,0.9);
            line-height: 1;
            letter-spacing: -0.02em;
          }

          .jl-card-subtitle {
            position: absolute;
            top: calc(50% + 5vw); left: 50%;
            transform: translate(-50%, -50%) translateZ(40px);
            font-family: var(--font-1), sans-serif;
            font-size: 0.85rem;
            letter-spacing: 0.4em;
            text-transform: uppercase;
            color: var(--about-accent);
            z-index: 10;
            background: rgba(0,0,0,0.75);
            padding: 8px 20px;
            border-radius: 30px;
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255,255,255,0.1);
            white-space: nowrap;
          }

          .jl-drag-area {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            z-index: 30;
            cursor: grab;
          }
          .jl-drag-area:active { cursor: grabbing; }

          /* --- Story Section --- */
          .about-story {
            padding: 120px 5%;
            background-color: var(--about-light);
            text-align: center;
            position: relative;
            z-index: 5;
          }
          .about-story-text {
            font-family: var(--font-1);
            font-size: clamp(2rem, 4vw, 3.5rem);
            line-height: 1.35;
            max-width: 1100px;
            margin: 0 auto;
            color: var(--about-text);
            letter-spacing: -0.01em;
          }
          .word-wrap { display: inline-block; overflow: hidden; vertical-align: top; margin-right: 0.25em; }
          .word-reveal { display: inline-block; opacity: 0; transform: translateY(100%); animation: revealText 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          @keyframes revealText { 0% { opacity: 0; transform: translateY(100%); } 100% { opacity: 1; transform: translateY(0); } }

          /* --- Pillars Section --- */
          .about-pillars {
            padding: 40px 5% 120px;
            background-color: var(--about-light);
            position: relative;
            z-index: 5;
          }
          .pillars-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem; max-width: 1300px; margin: 0 auto; }
          .pillar-card { border-top: 1px solid rgba(0,0,0,0.1); padding-top: 2.5rem; transition: all 0.4s ease; position: relative; }
          .pillar-card::before { content: ''; position: absolute; top: -1px; left: 0; width: 0; height: 1px; background-color: var(--about-accent); transition: width 0.4s ease; }
          .pillar-card:hover::before { width: 100%; }
          .pillar-card:hover { transform: translateY(-10px); }
          .pillar-num { font-family: var(--font-2); font-size: 3rem; color: var(--about-accent); margin-bottom: 1.5rem; opacity: 0.8; line-height: 1; }
          .pillar-title { font-size: 2rem; font-family: var(--font-2); margin-bottom: 1.5rem; color: var(--about-text); letter-spacing: -0.01em; }
          .pillar-desc { font-size: 1.1rem; line-height: 1.7; color: #666; font-weight: 300; }

          /* --- LXL Creative Style Services Section --- */
          .lxl-section {
            background-color: #fff;
            color: var(--about-text);
            padding: 120px 5%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
            font-family: var(--font-1), sans-serif;
          }

          .lxl-content {
            flex: 1;
            max-width: 500px;
            position: relative;
            z-index: 10;
            padding-left: 5%;
          }

          .lxl-script {
            font-family: 'Caveat', cursive;
            color: var(--about-accent);
            font-size: clamp(4rem, 8vw, 6rem);
            line-height: 0.5;
            display: inline-block;
          }

          .lxl-title {
            font-size: clamp(3.5rem, 7vw, 6rem);
            font-family: var(--font-1), sans-serif;
            font-weight: 900;
            line-height: 1.1;
            margin: 0 0 1.5rem 0;
            letter-spacing: -0.02em;
            color: var(--about-text);
          }

          .lxl-text {
            font-size: 1.15rem;
            color: #666;
            line-height: 1.6;
            margin-bottom: 3rem;
            font-weight: 400;
          }

          .lxl-btn {
            background-color: var(--about-accent);
            color: #fff;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            transition: all 0.3s ease;
          }
          .lxl-btn:hover {
            background-color: var(--about-text);
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }

          .lxl-image-container {
            flex: 1.2;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            perspective: 1500px; /* Important for 3D tilt */
          }

          /* Squiggly line */
          .lxl-squiggle {
            position: absolute;
            right: 0%;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            height: 120%;
            pointer-events: none;
            z-index: 1;
            overflow: visible;
          }

          .lxl-card {
            position: relative;
            width: 75%;
            height: 85%;
            border-radius: 20px;
            overflow: hidden;
            z-index: 2;
            box-shadow: 0 30px 60px rgba(0,0,0,0.15);
            background: #e8e4dc;
            transform-style: preserve-3d;
          }

          /* Inner shadow overlay for premium look */
          .lxl-card::after {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%);
            pointer-events: none;
            z-index: 2;
          }

          .lxl-card-label {
            position: absolute;
            bottom: 35px;
            left: 35px;
            color: #fff;
            font-family: var(--font-1);
            font-size: 1.6rem;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            text-shadow: 0 5px 15px rgba(0,0,0,0.8);
            z-index: 3;
            pointer-events: none;
          }

          .lxl-card-arrow {
            position: absolute;
            bottom: 35px;
            right: 35px;
            color: var(--about-accent);
            z-index: 3;
            pointer-events: none;
          }

          /* Responsive */
          @media (max-width: 1024px) {
             .jl-hero { --radius: 80vw; }
             .jl-card { width: 45vw; height: 50vh; margin-left: -22.5vw; margin-top: -25vh; }
             
             .lxl-section { flex-direction: column; padding: 100px 5%; text-align: left; }
             .lxl-content { padding-left: 0; margin-bottom: 80px; max-width: 100%; }
             .lxl-script { transform: rotate(-5deg) translateY(10px); }
             .lxl-image-container { width: 100%; height: 60vh; }
             .lxl-card { width: 90%; height: 100%; }
             .lxl-squiggle { right: -20%; }
          }
          @media (max-width: 600px) {
             .jl-hero { --radius: 100vw; }
             .jl-ui { font-size: 9px; }
             .jl-card { width: 65vw; margin-left: -32.5vw; }
             .jl-card-title { transform: translate(-50%, -50%) translateZ(25px); font-size: 3.5rem; }
             
             .about-story { padding: 80px 5%; }
             .pillars-grid { gap: 3rem; }
             .lxl-title { font-size: 3.5rem; }
          }
        `}
      </style>

      {/* Jesper Landberg Clone Hero */}
      <section className="jl-hero">
        <span className="jl-ui jl-ui-tl">KRISHNA SHEESH MAHAL</span>
        <span className="jl-ui jl-ui-tr">PROFILE</span>
        <span className="jl-ui jl-ui-bl">FEATURED / FULL</span>
        <span className="jl-ui jl-ui-br">DRAG TO EXPLORE</span>
        
        <motion.div 
          className="jl-drag-area"
          drag="x"
          dragConstraints={{ left: -1000, right: 1000 }}
          dragElastic={0.1}
          style={{ x: dragX }}
        />

        <div className="jl-scene">
          <div className="jl-carousel-container">
            <motion.div className="jl-carousel" style={{ rotateY: rotationY }}>
              <div className="jl-floor"></div>
              {cards.map((c, i) => (
                <div 
                  key={i} 
                  className="jl-card"
                  style={{ transform: `rotateY(${c.angle}deg) translateZ(var(--radius))` }}
                >
                  <img src={c.img} alt={c.title} />
                  <h2 className="jl-card-title">{c.title}</h2>
                  <div className="jl-card-subtitle">{c.subtitle}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="about-story">
        <div className="about-story-text" data-scroll>
          {words.map((word, i) => (
            <span className="word-wrap" key={i}>
              <span className="word-reveal" style={{ animationDelay: `${0.1 + (i * 0.025)}s` }}>
                {word}
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section className="about-pillars">
        <div className="pillars-grid" data-scroll data-scroll-speed="0.05">
          <div className="pillar-card">
            <div className="pillar-num">01</div>
            <h3 className="pillar-title">Our Story & History</h3>
            <p className="pillar-desc">Opening our doors on 15 Feb 2025, Krishna Sheesh Mahal was born from a passion for creating unforgettable memories and a desire to transform hospitality in Kota.</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-num">02</div>
            <h3 className="pillar-title">Our Mission</h3>
            <p className="pillar-desc">To provide impeccable luxury and culinary excellence, ensuring every guest experiences tailored hospitality, royal comfort, and a truly unforgettable stay.</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-num">03</div>
            <h3 className="pillar-title">Our Vision</h3>
            <p className="pillar-desc">To be the premier destination in Kota for majestic celebrations and luxurious stays, setting new standards in the hospitality industry for generations to come.</p>
          </div>
        </div>
      </section>

      {/* LXL Creative Clone Section */}
      <section className="lxl-section" ref={lxlRef}>
        <div className="lxl-content">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -15 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lxl-script"
          >
            Our
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lxl-title"
          >
            AMENITIES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lxl-text"
          >
            From luxurious stays to majestic celebrations, we create and curate experiences that are thoughtful, tailored, and built to leave a lasting impression across every touchpoint.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/rooms" className="lxl-btn">
              Explore all 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="lxl-image-container">
          <svg className="lxl-squiggle" viewBox="0 0 400 600" preserveAspectRatio="none">
            <motion.path 
              d="M -50 0 C 150 100 250 200 100 300 C -50 400 150 500 250 600 C 350 700 150 800 -50 900"
              fill="none" 
              stroke="var(--about-accent)" 
              strokeWidth="24"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Premium Parallax & Magnetic Tilt Card */}
          <motion.div 
            className="lxl-card"
            style={{ 
              y: cardScrollY, 
              rotateX: cardRotateX, 
              rotateY: cardRotateY,
            }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Inner Image Parallax */}
            <motion.img 
              src={ABOUT_IMAGES.primary2x} 
              alt="Luxury Stays" 
              style={{ 
                y: imageScrollY, 
                width: '100%', 
                height: '140%', 
                objectFit: 'cover',
                scale: 1.05 
              }} 
            />
            <div className="lxl-card-label">LUXURY STAYS</div>
            
            {/* Magnetic Arrow */}
            <motion.div className="lxl-card-arrow" style={{ x: arrowX, y: arrowY }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div style={{ backgroundColor: 'var(--about-light)' }}>
        <ScrollingLogos />
      </div>
      <QuoteSlider />
    </>
  );
}
