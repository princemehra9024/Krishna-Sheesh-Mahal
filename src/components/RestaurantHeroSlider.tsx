import { useCallback, useEffect, useRef, useState } from "react";

/* ── image URLs ─────────────────────────────────────────── */
const PHOTOS = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600", // Fine Dining
  "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1600", // Plated Food
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1600", // Rooftop Terrace
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=1600", // Wine Cellar
  "https://images.unsplash.com/photo-1414235077428-33898bd1e0d5?auto=format&fit=crop&q=80&w=1600", // Intimate Dining
];

/* ── slide data ─────────────────────────────────────────── */
interface Slide {
  eyebrow: string;
  headBold: string;
  headItalic: string;
  desc: string;
  bullets: string[];
  cta: string;
  badge: string;
  isForm?: boolean;
}

const SLIDES: Slide[] = [
  {
    eyebrow: "SIGNATURE EXPERIENCE",
    headBold: "Fine Dining",
    headItalic: "Reimagined",
    desc: "An exquisite culinary journey that blends tradition with innovation, set against a backdrop of refined elegance.",
    bullets: ["Chef-curated tasting menus", "Live open kitchen", "Panoramic city views"],
    cta: "RESERVE A TABLE",
    badge: "Open 7 – 11 PM",
  },
  {
    eyebrow: "CHEF'S SPECIAL",
    headBold: "Taste the",
    headItalic: "Craft",
    desc: "Our executive chef brings a seasonal tasting menu that celebrates locally sourced ingredients and bold flavors.",
    bullets: ["Seasonal tasting highlights", "Farm-to-table philosophy", "Artisanal presentation"],
    cta: "VIEW MENU",
    badge: "Seasonal Menu",
  },
  {
    eyebrow: "AL FRESCO DINING",
    headBold: "Sunset",
    headItalic: "Terrace",
    desc: "Dine under the open sky on our rooftop terrace with golden-hour views and live evening entertainment.",
    bullets: ["Rooftop ambience", "Live music nights", "Sunset views"],
    cta: "BOOK A TABLE",
    badge: "Rooftop · 6 PM",
  },
  {
    eyebrow: "200+ LABEL CELLAR",
    headBold: "Curated",
    headItalic: "Cellar",
    desc: "An award-winning wine program featuring over 200 labels, expertly paired by our in-house sommelier.",
    bullets: ["Sommelier pairing", "Private tasting room", "Rare vintages"],
    cta: "EXPLORE WINES",
    badge: "Wine Cellar",
  },
  {
    eyebrow: "TABLE FOR TWO?",
    headBold: "Reserve",
    headItalic: "Tonight",
    desc: "Secure your table at Krishna Sheesh Mahal — an intimate dining experience awaits you and your guest.",
    bullets: [],
    cta: "CHECK AVAILABILITY",
    badge: "Reservations",
    isForm: true,
  },
];

/* ── 5 organic SVG blob paths ───────────────────────────── */
const BLOBS = [
  "M44.1,-56.3C55.7,-49.4,63,-34.2,67.3,-18.1C71.5,-2,72.8,15,65.8,27.3C58.8,39.6,43.6,47.3,28.8,53.5C14,59.7,-0.3,64.5,-15.8,62.4C-31.3,60.3,-48,51.4,-57.8,38C-67.5,24.6,-70.3,6.8,-67.2,-9.5C-64.1,-25.8,-55.2,-40.7,-43,-50.4C-30.8,-60.1,-15.4,-64.5,0.9,-65.7C17.3,-66.8,32.5,-63.2,44.1,-56.3Z",
  "M39.5,-51.2C50.2,-42.2,57.2,-29.4,60.8,-15.6C64.3,-1.7,64.4,13.2,58.4,24.8C52.4,36.5,40.3,44.8,27.2,51.8C14.1,58.8,0.1,64.4,-15.2,63.1C-30.5,61.8,-47.1,53.5,-56.6,40.6C-66.1,27.7,-68.5,10.2,-65.6,-5.7C-62.7,-21.6,-54.5,-35.9,-43.1,-44.9C-31.7,-53.9,-15.8,-57.5,-0.3,-57.1C15.3,-56.7,28.9,-60.2,39.5,-51.2Z",
  "M47.7,-58.9C59.4,-51.5,64.9,-34,67.2,-16.8C69.5,0.4,68.6,17.2,61.2,30.4C53.8,43.6,39.8,53.2,24.5,58.7C9.2,64.2,-7.5,65.6,-22.8,61.2C-38.2,56.7,-52.2,46.4,-60.5,32.5C-68.8,18.5,-71.5,0.8,-67.6,-14.8C-63.7,-30.4,-53.2,-43.8,-40.5,-51C-27.8,-58.3,-13.9,-59.3,2.4,-62.4C18.7,-65.4,36.1,-66.3,47.7,-58.9Z",
  "M42.9,-55C53.9,-46.6,60.5,-32.2,64.3,-17.1C68.1,-1.9,69.2,13.9,63.3,26.8C57.3,39.7,44.3,49.7,30,56.2C15.7,62.7,-0,65.7,-16.3,63.3C-32.7,60.9,-49.7,53.2,-59.2,40.3C-68.7,27.3,-70.7,9.2,-67.1,-7.2C-63.5,-23.5,-54.3,-38,-42.5,-46.3C-30.7,-54.7,-15.3,-56.8,0.5,-57.5C16.4,-58.2,31.9,-63.4,42.9,-55Z",
  "M45.3,-57.2C56.7,-49.5,62.8,-33.8,65.2,-18C67.6,-2.2,66.3,13.6,59.8,26.6C53.3,39.6,41.5,49.8,27.9,56C14.3,62.2,-1.1,64.5,-17,61.3C-32.9,58.1,-49.3,49.3,-58.7,36C-68.1,22.7,-70.5,4.8,-66.4,-10.6C-62.4,-26,-52,-38.9,-39.6,-46.5C-27.3,-54.1,-13.6,-56.5,2,-59.1C17.6,-61.6,33.9,-64.9,45.3,-57.2Z",
];

const AUTOPLAY_MS = 5000;
const TOTAL = SLIDES.length;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function RestaurantHeroSlider() {
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);     // bumped to retrigger stagger
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const touchRef = useRef(0);
  const reducedMotion = useRef(false);
  const sliderRef = useRef<HTMLElement>(null);
  const isScrolling = useRef(false);

  /* check prefers-reduced-motion once */
  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* go to slide */
  const goTo = useCallback(
    (n: number) => {
      setIdx(((n % TOTAL) + TOTAL) % TOTAL);
      setAnimKey((k) => k + 1);
    },
    [],
  );
  const next = useCallback(() => goTo(idx + 1), [goTo, idx]);
  const prev = useCallback(() => goTo(idx - 1), [goTo, idx]);

  /* autoplay */
  useEffect(() => {
    if (paused || reducedMotion.current) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [next, paused]);

  /* keyboard arrows */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  /* wheel scroll */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      
      // Allow normal page scroll if the slider is not exactly at the top of the viewport
      // (meaning the user has scrolled down the page, or is scrolling back up but hasn't reached the top yet)
      if (Math.abs(rect.top) > 5) {
        return;
      }

      const threshold = 40;

      if (e.deltaY > threshold) {
        // Scrolling down
        if (idx === TOTAL - 1) {
          // At the last slide, let normal scrolling take over
          return;
        }
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;
        next();
        setTimeout(() => { isScrolling.current = false; }, 1000);
      } else if (e.deltaY < -threshold) {
        // Scrolling up
        if (idx === 0) {
          // At the first slide, let normal scrolling take over to scroll up the page
          return;
        }
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;
        prev();
        setTimeout(() => { isScrolling.current = false; }, 1000);
      }
    };

    // Attach to window so we can catch wheel events cleanly even if they fire outside the element
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [next, prev, idx]);

  const slide = SLIDES[idx];
  const isReversed = idx % 2 === 1;

  /* stagger classes reset each slide via animKey */
  const stagger = (order: number) => ({
    animationDelay: `${order * 100}ms`,
  });

  return (
    <>
      <style>{`
        /* ── HERO SLIDER SHELL ── */
        .rhs {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          background: #fff;
          color: #111;
        }

        .rhs__track {
          display: flex;
          height: 100%;
          transition: transform 1.4s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .rhs__slide {
          width: 100vw;
          height: 100%;
          flex-shrink: 0;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* ── EDITORIAL LAYOUTS ── */
        .rhs__layout {
          width: 90%;
          max-width: 1400px;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          margin: 0 auto;
        }

        /* Base elements */
        .rhs__img-container { position: relative; z-index: 2; }
        .rhs__img-wrap { width: 100%; height: 100%; position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.12); }
        .rhs__img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.8s cubic-bezier(0.2, 1, 0.3, 1); filter: contrast(1.05) saturate(1.1); }
        
        .rhs__img-wrap-secondary { position: absolute; z-index: 5; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.15); opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.2, 1, 0.3, 1) 0.2s; }
        .rhs__slide.is-active .rhs__img-wrap-secondary { opacity: 1; transform: translateY(0); }
        .rhs__img-wrap-secondary img { width: 100%; height: 100%; object-fit: cover; }
        
        .rhs__content { position: relative; z-index: 3; }
        .rhs__decor-1 { position: absolute; z-index: 0; opacity: 0; transition: all 1.2s cubic-bezier(0.2, 1, 0.3, 1) 0.3s; }
        .rhs__bg-text { position: absolute; font-family: var(--font-2); font-size: 8rem; color: rgba(0,0,0,0.06); text-transform: uppercase; white-space: nowrap; pointer-events: none; z-index: 1; opacity: 0; transition: opacity 1s 0.5s; }
        
        .rhs__slide.is-active .rhs__decor-1 { opacity: 1; transform: scale(1) translate(0,0) !important; }
        .rhs__slide.is-active .rhs__bg-text { opacity: 1; }
        .rhs__slide:not(.is-active) .rhs__img-wrap img { transform: scale(1.15); }
        
        /* ── TYPOGRAPHY ── */
        .rhs__eyebrow { font-family: var(--font-1); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.35em; font-weight: 700; color: #344541; margin-bottom: 20px; }
        .rhs__headline { font-family: var(--font-2); font-size: clamp(4rem, 7.5vw, 8rem); line-height: 0.9; color: #111; margin-bottom: 30px; text-transform: uppercase; letter-spacing: -0.01em; }
        .rhs__headline em { font-family: var(--font-3); font-weight: 300; font-style: italic; display: block; color: #FF9F87; text-transform: none; font-size: 1.1em; margin-top: 10px; margin-left: 8%; }
        
        .rhs__desc-box { position: relative; padding-top: 10px; max-width: 550px; }
        .rhs__desc { font-family: var(--font-1); font-size: 1.15rem; line-height: 1.6; color: #444; margin-bottom: 30px; }

        /* ── LAYOUT 0 ── */
        .layout-0 .rhs__layout { justify-content: center; }
        .layout-0 .rhs__img-container { width: 35%; height: 75%; position: absolute; left: 15%; }
        .layout-0 .rhs__content { width: 45%; margin-left: auto; margin-right: 0; padding-top: 5%; }
        .layout-0 .rhs__decor-1 { width: 40vw; height: 40vw; max-width: 600px; max-height: 600px; background: linear-gradient(135deg, #FFEFEC 0%, #FFE3DD 100%); border-radius: 50%; top: 10%; left: 5%; transform: scale(0.8); }
        .layout-0 .rhs__bg-text { writing-mode: vertical-rl; top: 50%; transform: translateY(-50%) rotate(180deg); left: 5%; }

        /* ── LAYOUT 1 ── */
        .layout-1 .rhs__layout { justify-content: space-between; align-items: center; }
        .layout-1 .rhs__img-container { width: 40%; height: 65%; order: 2; margin-right: 2%; }
        .layout-1 .rhs__img-wrap-secondary { width: 50%; height: 45%; bottom: -10%; left: -25%; }
        .layout-1 .rhs__content { width: 50%; order: 1; padding-bottom: 5%; margin-left: 2%; }
        .layout-1 .rhs__decor-1 { width: 40%; height: 60%; background: #FAF9F7; bottom: 15%; right: 2%; transform: translateY(100px); }
        .layout-1 .rhs__bg-text { top: 10%; right: 5%; font-size: 10rem; }
        .layout-1 .rhs__headline { margin-left: 10%; }

        /* ── LAYOUT 2 ── */
        .layout-2 .rhs__layout { justify-content: space-between; align-items: center; flex-direction: row-reverse; }
        .layout-2 .rhs__img-container { width: 45%; height: 75%; margin-right: 2%; }
        .layout-2 .rhs__img-wrap { border-radius: 400px; }
        .layout-2 .rhs__content { width: 48%; margin-left: 2%; z-index: 4; }
        .layout-2 .rhs__decor-1 { width: 50vw; height: 50vw; background: linear-gradient(135deg, #F5EAE8 0%, #EFE1DE 100%); border-radius: 50%; top: -10%; right: -10%; transform: scale(1.2); }
        .layout-2 .rhs__bg-text { writing-mode: vertical-rl; top: 50%; transform: translateY(-50%); right: 2%; }

        /* ── LAYOUT 3 ── */
        .layout-3 .rhs__layout { justify-content: space-between; align-items: center; flex-direction: row; }
        .layout-3 .rhs__img-container { width: 35%; height: 85%; margin-left: 2%; }
        .layout-3 .rhs__img-wrap-secondary { width: 55%; height: 35%; top: 10%; right: -30%; }
        .layout-3 .rhs__content { width: 55%; margin-right: 2%; }
        .layout-3 .rhs__decor-1 { width: 40%; height: 100%; background: #FDF9F9; top: 0; left: 15%; transform: translateX(-50px); }
        .layout-3 .rhs__bg-text { bottom: 15%; left: 2%; }

        /* ── LAYOUT 4 (SPLIT SCREEN) ── */
        .layout-4 .rhs__layout { width: 100%; max-width: none; }
        .layout-4 .rhs__left-pane { width: 50%; height: 100%; position: relative; display: flex; flex-direction: column; justify-content: center; padding: 0 10%; }
        .layout-4 .rhs__right-pane { width: 50%; height: 100%; background: #FDF4F2; display: flex; align-items: center; justify-content: center; padding: 10%; }
        .layout-4 .rhs__img-container { width: 220px; height: 300px; position: absolute; bottom: 8%; right: 10%; }
        .layout-4 .rhs__img-wrap { box-shadow: 0 10px 40px rgba(0,0,0,0.15); }
        .layout-4 .rhs__headline { font-size: clamp(3rem, 5.5vw, 5.5rem); margin-top: -10%; }
        
        .rhs__form-wrap { background: transparent; width: 100%; max-width: 400px; }
        .rhs__form-title { font-family: var(--font-2); font-size: 2.5rem; text-transform: uppercase; color: #111; margin-bottom: 10px; }
        .rhs__form-desc { font-family: var(--font-1); font-size: 1.05rem; color: #555; margin-bottom: 30px; }

        /* ── ANIMATIONS ── */
        .rhs-anim { opacity: 0; transform: translateX(80px); transition: all 1.2s cubic-bezier(0.2, 1, 0.3, 1); }
        .rhs__slide.is-active .rhs-anim { opacity: 1; transform: translateX(0); }
        
        .delay-1 { transition-delay: 0.5s; }
        .delay-2 { transition-delay: 0.6s; }
        .delay-3 { transition-delay: 0.7s; }

        /* ── BADGE ── */
        .rhs__badge {
          position: absolute;
          bottom: -30px; left: -30px;
          width: 100px; height: 100px;
          border-radius: 50%; border: 1px solid rgba(0,0,0,0.05);
          background: #fff; z-index: 10;
          display: flex; align-items: center; justify-content: center; text-align: center;
          font-family: var(--font-1); font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
          animation: rhsSpin 20s linear infinite;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        @keyframes rhsSpin { to { transform: rotate(360deg); } }

        /* ── BUTTONS ── */
        .rhs__cta { display: inline-flex; align-items: center; gap: 12px; color: #111; font-family: var(--font-1); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; border-bottom: 2px solid #FF9F87; padding-bottom: 4px; transition: opacity 0.3s; }
        .rhs__cta:hover { opacity: 0.6; }

        /* Form Inputs */
        .rhs__form { display: flex; flex-direction: column; gap: 15px; }
        .rhs__input { width: 100%; padding: 15px 20px; border: 1px solid rgba(0,0,0,0.1); border-radius: 0; font-size: 0.95rem; font-family: var(--font-1); background: transparent; color: #111; outline: none; transition: border-color 0.3s; }
        .rhs__input:focus { border-color: #111; }
        .rhs__input::placeholder { color: #888; }
        .rhs__submit { background: #111; color: #fff; border: none; padding: 16px 20px; font-family: var(--font-1); font-weight: 700; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; transition: background 0.3s; margin-top: 10px; }
        .rhs__submit:hover { background: #FF9F87; color: #111; }

        /* ── PAGER ── */
        .rhs__pager {
          position: absolute;
          bottom: 40px;
          right: 5%;
          display: flex;
          align-items: center;
          gap: 25px;
          z-index: 100;
        }
        .layout-4.is-active ~ .rhs__pager { right: 55%; /* Move pager to left side on last slide */ }
        
        .rhs__arrow { font-size: 1.5rem; font-family: var(--font-1); color: #111; background: none; border: none; cursor: pointer; transition: transform 0.3s, opacity 0.3s; display: flex; align-items: center; }
        .rhs__arrow:hover { opacity: 0.5; transform: scale(1.1); }
        .rhs__pager-num { font-family: var(--font-2); font-size: 2.8rem; font-weight: 700; color: #111; display: flex; align-items: center; gap: 8px; }
        .rhs__pager-num::before { content: "*"; color: #FF9F87; font-size: 2.5rem; font-weight: 400; }

        @media (max-width: 1024px) {
          .rhs__layout { flex-direction: column !important; justify-content: flex-start !important; padding-top: 10vh; gap: 15px; width: 90%; }
          .rhs__img-container { width: 100% !important; height: 32vh !important; position: relative !important; left: auto !important; right: auto !important; bottom: auto !important; top: auto !important; margin: 0 !important; order: 1 !important; }
          .rhs__img-wrap { border-radius: 0 !important; box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
          .rhs__content { width: 100% !important; order: 2 !important; text-align: center; margin: 0 !important; padding: 0 !important; }
          
          .rhs__headline { font-size: clamp(2.5rem, 10vw, 3.5rem); margin-bottom: 8px; }
          .rhs__headline em { margin-left: 0; font-size: 1.1em; }
          .rhs__eyebrow { margin-bottom: 8px; font-size: 0.75rem; }
          .rhs__desc-box { margin: 0 auto !important; padding: 5px 0 0 0 !important; }
          .rhs__desc { font-size: 0.95rem; margin-bottom: 12px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
          
          /* Center bullets */
          .rhs__bullets { display: flex !important; flex-direction: column; align-items: center; margin-bottom: 15px !important; }
          .rhs__bullets li { font-size: 0.9rem !important; margin-bottom: 5px !important; }
          
          .rhs__cta { justify-content: center; font-size: 0.75rem; }
          
          /* Visuals */
          .rhs__badge { transform: scale(0.65); transform-origin: bottom right; bottom: -10px; right: -5px; left: auto; display: flex !important; }
          .rhs__bg-text { font-size: 4rem !important; top: 4% !important; left: 50% !important; transform: translateX(-50%) !important; writing-mode: horizontal-tb !important; letter-spacing: 0; opacity: 0.05 !important; }
          .rhs__img-wrap-secondary, .rhs__decor-1 { display: none !important; }
          
          /* Split screen */
          .layout-4 .rhs__layout { padding-top: 0; justify-content: flex-start !important; }
          .rhs__left-pane, .rhs__right-pane { width: 100% !important; height: auto !important; padding: 15% 5% 5% 5% !important; }
          .rhs__left-pane { order: 1; align-items: center; text-align: center; padding-bottom: 0 !important; }
          .rhs__right-pane { order: 2; align-items: center; padding-top: 5% !important; background: transparent; }
          .rhs__form-wrap { text-align: center; }
          
          .rhs__pager { right: 50%; transform: translateX(50%); bottom: 15px; gap: 20px; background: rgba(255,255,255,0.85); padding: 5px 20px; border-radius: 40px; backdrop-filter: blur(10px); box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
          .rhs__pager-num { font-size: 1.8rem; }
          .rhs__pager-num::before { font-size: 1.5rem; }
          .rhs__arrow { font-size: 1.2rem; }
          .layout-4.is-active ~ .rhs__pager { right: 50%; }
        }
      `}</style>

      <section
        ref={sliderRef}
        className="rhs"
        id="restaurant-hero"
        aria-label="Restaurant hero slider"
        onTouchStart={(e) => { touchRef.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const diff = e.changedTouches[0].clientX - touchRef.current;
          if (Math.abs(diff) > 50) diff < 0 ? next() : prev();
        }}
      >
        <div className="rhs__track" style={{ transform: `translateX(-${idx * 100}vw)` }}>
          {SLIDES.map((slide, i) => {
            const isActive = i === idx;
            return (
              <div key={i} className={`rhs__slide layout-${i} ${isActive ? 'is-active' : ''}`}>
                <div className="rhs__decor-1" />
                <div className="rhs__bg-text">{slide.headBold}</div>
                
                <div className="rhs__layout">
                  {i === 4 ? (
                    // Last Slide - Split Screen Layout
                    <>
                      <div className="rhs__left-pane">
                        <p className="rhs__eyebrow rhs-anim delay-1">{slide.eyebrow}</p>
                        <h2 className="rhs__headline rhs-anim delay-2">
                          {slide.headBold}
                          <em>{slide.headItalic}</em>
                        </h2>
                        <div className="rhs__img-wrap rhs-anim delay-3">
                          <img src={PHOTOS[i]} alt={slide.headBold} loading="lazy" />
                        </div>
                      </div>
                      <div className="rhs__right-pane">
                        <div className="rhs__form-wrap rhs-anim delay-2">
                          <h3 className="rhs__form-title">RESERVE TONIGHT</h3>
                          <p className="rhs__form-desc">Secure your table at Krishna Sheesh Mahal — an intimate dining experience awaits.</p>
                          <form className="rhs__form" onSubmit={(e) => e.preventDefault()}>
                            <input className="rhs__input" type="date" aria-label="Date" />
                            <input className="rhs__input" type="number" min={1} max={20} placeholder="Guests" aria-label="Number of guests" />
                            <input className="rhs__input" type="tel" placeholder="Phone number" aria-label="Phone number" />
                            <button className="rhs__submit" type="submit">CHECK AVAILABILITY</button>
                          </form>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Slides 1-4 Layouts
                    <>
                      <div className="rhs__img-container">
                        <div className="rhs__img-wrap">
                          <img src={PHOTOS[i]} alt={slide.headBold} loading={i === 0 ? "eager" : "lazy"} />
                        </div>
                        {(i === 1 || i === 3) && (
                          <div className="rhs__img-wrap-secondary">
                            <img src={PHOTOS[(i + 1) % TOTAL]} alt="" loading="lazy" />
                          </div>
                        )}
                        {i !== 4 && slide.badge && (
                          <div className="rhs__badge">
                            {slide.badge.split(" ").length > 2 ? slide.badge.split(" ").slice(0, 2).join(" ") + "\n" + slide.badge.split(" ").slice(2).join(" ") : slide.badge}
                          </div>
                        )}
                      </div>
                      
                      <div className="rhs__content">
                        <p className="rhs__eyebrow rhs-anim delay-1">{slide.eyebrow}</p>
                        <h2 className="rhs__headline rhs-anim delay-2">
                          {slide.headBold}
                          <em>{slide.headItalic}</em>
                        </h2>
                        
                        <div className="rhs__desc-box rhs-anim delay-3">
                          <p className="rhs__desc">{slide.desc}</p>
                          {slide.bullets && slide.bullets.length > 0 && (
                            <ul className="rhs__bullets" style={{ listStyle: 'none', padding: 0, margin: '0 0 25px' }}>
                              {slide.bullets.map(b => (
                                <li key={b} style={{ fontSize: '1rem', marginBottom: '10px', color: '#344541', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <span style={{ width: '6px', height: '6px', background: '#FF9F87', borderRadius: '50%' }} />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}
                          <button className="rhs__cta" type="button">
                            {slide.cta}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <nav className="rhs__pager" aria-label="Slide navigation">
          <button className="rhs__arrow" aria-label="Previous slide" onClick={prev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          
          <button className="rhs__arrow" aria-label="Next slide" onClick={next}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          <div className="rhs__pager-num">
            {String(idx + 1).padStart(2, "0")}
          </div>
        </nav>
      </section>
    </>
  );
}
