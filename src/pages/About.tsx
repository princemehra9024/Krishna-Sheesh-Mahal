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

  // --- Scroll-Pinned Card Stack Math ---
  const stackRef = useRef(null);
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"]
  });

  const generateDeceleration = (start: number, end: number) => {
    const d = end - start;
    // 5 points for an incredibly smooth, continuous deceleration curve
    return [
      start, 
      start + d * 0.2, 
      start + d * 0.45, 
      start + d * 0.75, 
      end
    ];
  };

  const p2 = generateDeceleration(0, 0.25);
  const p3 = generateDeceleration(0.3, 0.55);
  const p4 = generateDeceleration(0.6, 0.85);

  const yVals = ["-130vh", "-80vh", "-40vh", "-10vh", "0vh"];
  const rotVals = [35, 22, 12, 4, 0];
  const scaleVals = [1.2, 1.12, 1.06, 1.02, 1];
  const shadowVals = [
    "0 60px 120px rgba(0,0,0,0.3)",
    "0 45px 90px rgba(0,0,0,0.25)",
    "0 30px 60px rgba(0,0,0,0.2)",
    "0 15px 45px rgba(0,0,0,0.15)",
    "0 10px 30px rgba(0,0,0,0.1)"
  ];

  const y2 = useTransform(stackProgress, p2, yVals);
  const rot2 = useTransform(stackProgress, p2, rotVals);
  const scale2 = useTransform(stackProgress, p2, scaleVals);
  const shadow2 = useTransform(stackProgress, p2, shadowVals);

  const y3 = useTransform(stackProgress, p3, yVals);
  const rot3 = useTransform(stackProgress, p3, rotVals);
  const scale3 = useTransform(stackProgress, p3, scaleVals);
  const shadow3 = useTransform(stackProgress, p3, shadowVals);

  const y4 = useTransform(stackProgress, p4, yVals);
  const rot4 = useTransform(stackProgress, p4, rotVals);
  const scale4 = useTransform(stackProgress, p4, scaleVals);
  const shadow4 = useTransform(stackProgress, p4, shadowVals);

  const squigglePath = useTransform(stackProgress, [0.8, 1], [0, 1]);
  // Make the squiggle float down slightly as we scroll
  const squiggleY = useTransform(stackProgress, [0, 1], ["-60%", "-30%"]);

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

          /* --- Scroll-Pinned Card Stack Section --- */
          .stack-section {
            position: relative;
            height: 400vh; /* 4 cards = 400vh scroll distance */
            background-color: #fff;
            z-index: 10;
            font-family: var(--font-1), sans-serif;
          }

          .stack-sticky {
            position: sticky;
            top: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            padding: 0 5%;
          }

          .stack-left {
            flex: 1;
            max-width: 500px;
            z-index: 10;
            padding-left: 5%;
          }

          .stack-script {
            font-family: 'Caveat', cursive;
            color: var(--about-accent);
            font-size: clamp(4rem, 8vw, 6rem);
            line-height: 0.5;
            display: inline-block;
            transform: rotate(-5deg);
            margin-bottom: 20px;
          }

          .stack-title {
            font-size: clamp(3.5rem, 7vw, 6rem);
            font-family: var(--font-1), sans-serif;
            font-weight: 900;
            line-height: 1.1;
            margin: 0 0 1.5rem 0;
            letter-spacing: -0.02em;
            color: var(--about-text);
          }

          .stack-text {
            font-size: 1.15rem;
            color: #666;
            line-height: 1.6;
            margin-bottom: 3rem;
            font-weight: 400;
          }

          .stack-btn {
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
          .stack-btn:hover {
            background-color: var(--about-text);
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }

          .stack-right {
            flex: 1.2;
            height: 100vh;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .stack-squiggle {
            position: absolute;
            right: -10%;
            top: 50%;
            /* Removed fixed transform to allow Framer Motion to control Y */
            width: 100%;
            height: 120%;
            pointer-events: none;
            z-index: 0;
            overflow: visible;
          }

          .stack-card {
            position: absolute;
            inset: 0;
            margin: auto;
            width: 28vw;
            height: 37.3vw;
            max-width: 550px;
            max-height: 733px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.15);
            background: #e8e4dc;
            will-change: transform;
          }

          .stack-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .stack-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50%;
            background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
            pointer-events: none;
            z-index: 1;
          }

          .stack-card-title {
            position: absolute;
            bottom: 30px;
            left: 30px;
            color: #fff;
            font-family: var(--font-1);
            font-size: 1.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            z-index: 2;
            margin: 0;
          }

          .stack-card-arrow {
            position: absolute;
            bottom: 30px;
            right: 30px;
            color: #fff;
            z-index: 2;
            display: flex;
            background: var(--about-accent);
            border-radius: 50%;
            padding: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }

          /* Responsive */
          @media (max-width: 1024px) {
             .jl-hero { --radius: 80vw; }
             .jl-card { width: 45vw; height: 50vh; margin-left: -22.5vw; margin-top: -25vh; }
             
             .stack-sticky { flex-direction: column; justify-content: flex-start; padding: 0; }
             .stack-left { padding: 60px 5% 20px; max-width: 100%; text-align: center; flex: 0 0 auto; }
             .stack-script { margin-bottom: 10px; }
             .stack-text { margin-bottom: 2rem; }
             .stack-right { flex: 1; width: 100%; }
             .stack-card { width: 45vw; height: 60vw; }
             .stack-card-title { font-size: 1.5rem; bottom: 20px; left: 20px; }
             .stack-card-arrow { bottom: 20px; right: 20px; }
             .stack-squiggle { right: -20%; }
          }
          @media (max-width: 600px) {
             .jl-hero { --radius: 100vw; }
             .jl-ui { font-size: 9px; }
             .jl-card { width: 65vw; margin-left: -32.5vw; }
             .jl-card-title { transform: translate(-50%, -50%) translateZ(25px); font-size: 3.5rem; }
             
             .about-story { padding: 80px 5%; }
             .pillars-grid { gap: 3rem; }
             .stack-title { font-size: 3rem; }
             .stack-card { width: 80vw; height: 106vw; }
             .stack-left { padding: 40px 5% 10px; }
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

      {/* Scroll-Pinned Card Stack Section */}
      <section className="stack-section" ref={stackRef}>
        <div className="stack-sticky">
          <div className="stack-left">
            <motion.div 
              className="stack-script"
              initial={{ opacity: 0, y: 30, rotate: -15 }}
              whileInView={{ opacity: 1, y: 0, rotate: -5 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Our
            </motion.div>
            <motion.h2 
              className="stack-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              AMENITIES
            </motion.h2>
            <motion.p 
              className="stack-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              From luxurious stays to majestic celebrations, we create and curate experiences that are thoughtful, tailored, and built to leave a lasting impression across every touchpoint.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/rooms" className="stack-btn">
                Explore all
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>

          <div className="stack-right">
            <motion.svg 
              className="stack-squiggle" 
              viewBox="0 0 400 600" 
              preserveAspectRatio="none"
              style={{ y: squiggleY }}
            >
              <motion.path
                d="M -50 0 C 150 100 250 200 100 300 C -50 400 150 500 250 600 C 350 700 150 800 -50 900"
                fill="none"
                stroke="var(--about-accent)"
                strokeWidth="24"
                strokeLinecap="round"
                style={{ pathLength: squigglePath }}
              />
            </motion.svg>

            {/* Card 1: Base */}
            <motion.div className="stack-card" style={{ zIndex: 1, boxShadow: shadowVals[4] }}>
              <img src={ABOUT_IMAGES.primary2x} alt="Luxury Stays" />
              <h3 className="stack-card-title">Luxury Stays</h3>
              <div className="stack-card-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div className="stack-card" style={{ zIndex: 2, y: y2, rotate: rot2, scale: scale2, boxShadow: shadow2 }}>
              <img src={ABOUT_IMAGES.secondary2x} alt="Dining" />
              <h3 className="stack-card-title">Dining</h3>
              <div className="stack-card-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div className="stack-card" style={{ zIndex: 3, y: y3, rotate: rot3, scale: scale3, boxShadow: shadow3 }}>
              <img src={HERO_POSTER} alt="Events" />
              <h3 className="stack-card-title">Events</h3>
              <div className="stack-card-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div className="stack-card" style={{ zIndex: 4, y: y4, rotate: rot4, scale: scale4, boxShadow: shadow4 }}>
              <img src={ABOUT_IMAGES.primary2x} alt="Heritage" />
              <h3 className="stack-card-title">Heritage</h3>
              <div className="stack-card-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div style={{ backgroundColor: 'var(--about-light)' }}>
        <ScrollingLogos />
      </div>
      <QuoteSlider />
    </>
  );
}
