import { HERO_POSTER, ABOUT_IMAGES } from "../data";
import ScrollingLogos from "../components/ScrollingLogos";
import QuoteSlider from "../components/QuoteSlider";
import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

export default function About() {
  const statement = "Born from a passion for creating unforgettable memories, our journey began in Kota, where we sought to transform how people experience hospitality.";
  const words = useMemo(() => statement.split(" "), []);

  const [activeIndex, setActiveIndex] = useState(1);
  const showcaseCards = useMemo(() => [
    {
      title: "Fine Dining",
      subtitle: "Savor the extraordinary.",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600",
      link: "/restaurant",
      btnText: "Explore Menu"
    },
    {
      title: "Professional",
      subtitle: "Fuel Your Ambition.",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1600",
      link: "/rooms",
      btnText: "View Suites"
    },
    {
      title: "Relaxation",
      subtitle: "Unwind in luxury.",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1600",
      link: "/rooms",
      btnText: "Discover More"
    }
  ], []);

  const prevIdx = (activeIndex - 1 + showcaseCards.length) % showcaseCards.length;
  const nextIdx = (activeIndex + 1) % showcaseCards.length;

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseCards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [showcaseCards.length]);

  return (
    <>
      <style>
        {`
          @keyframes revealUp {
            0% { opacity: 0; transform: translateY(40px) rotate(2deg); filter: blur(4px); }
            100% { opacity: 1; transform: translateY(0) rotate(0deg); filter: blur(0); }
          }
          @keyframes slowZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
          }
          .word-wrap {
            display: inline-block;
            overflow: hidden;
            vertical-align: top;
            margin-right: 0.25em;
          }
          .word-reveal {
            display: inline-block;
            opacity: 0;
            animation: revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          .image-collage {
            position: relative;
            width: 100%;
            padding-bottom: 120%; /* Creates a tall aspect ratio container */
          }
          .image-collage__img-1 {
            position: absolute;
            top: 0;
            left: 0;
            width: 75%;
            height: 70%;
            object-fit: cover;
            border-radius: 4px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            z-index: 1;
          }
          .image-collage__img-2 {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 65%;
            height: 60%;
            object-fit: cover;
            border: 12px solid #fff;
            border-radius: 4px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.15);
            z-index: 2;
          }
          .image-collage__img-3 {
            position: absolute;
            top: 20%;
            right: -10%;
            width: 40%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 1000px; /* Perfect circle */
            border: 8px solid #f5f2ef;
            z-index: 3;
          }

          /* ── NEW DARK HIGHLIGHT SECTIONS ── */
          .about-dark-section {
            background-color: var(--charcoal);
            color: #fff;
            position: relative;
            overflow: hidden;
          }
          
          /* Background Grid */
          .about-dark-section::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
            background-size: 80px 80px;
            background-position: center;
            pointer-events: none;
            z-index: 0;
            mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
            -webkit-mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
          }

          /* Fresh Card Layout */
          .fresh-card-layout {
            display: flex;
            align-items: stretch;
            gap: 20px;
            position: relative;
            z-index: 1;
            max-width: 1300px;
            margin: 0 auto;
            padding: 100px 5%;
          }
          .fresh-card-img {
            flex: 1.2;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          }
          .fresh-card-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .fresh-card-content {
            flex: 1;
            background: linear-gradient(145deg, #302421, #1f1715);
            border: 1px solid var(--gold);
            border-radius: 20px;
            padding: 70px 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5), inset 0 0 60px rgba(197, 157, 58, 0.05);
            position: relative;
            overflow: hidden;
          }
          /* Subtle gold glow */
          .fresh-card-content::before {
            content: "";
            position: absolute;
            top: -30%; left: -30%; width: 160%; height: 160%;
            background: radial-gradient(circle at center, rgba(197, 157, 58, 0.15) 0%, transparent 60%);
            pointer-events: none;
            z-index: 0;
          }
          .fresh-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            border: 1px solid var(--gold);
            border-radius: 40px;
            padding: 8px 18px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            margin-bottom: 30px;
            align-self: flex-start;
            color: #ddd;
            z-index: 1;
          }
          .fresh-badge::before {
            content: "";
            display: block;
            width: 6px; height: 6px;
            background: var(--gold);
            border-radius: 50%;
          }
          .fresh-card-subtitle {
            font-size: 1.1rem;
            color: #a0a0a0;
            margin-bottom: 25px;
            z-index: 1;
            position: relative;
          }
          .fresh-card-title {
            font-size: clamp(2.5rem, 4vw, 4rem);
            font-family: var(--font-2);
            line-height: 1.1;
            margin-bottom: 30px;
            color: #e5e5e5;
            z-index: 1;
            position: relative;
          }
          .fresh-highlight {
            color: var(--gold);
            font-style: italic;
            font-family: var(--font-3);
            font-weight: 300;
          }
          .fresh-card-desc {
            font-size: 1.1rem;
            color: #888;
            line-height: 1.7;
            z-index: 1;
            position: relative;
          }

          /* Carousel Showcase Section */
          .showcase-section {
            padding: 60px 0 60px;
            text-align: center;
            position: relative;
            z-index: 1;
          }
          .showcase-carousel {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            margin-bottom: 40px;
            overflow: hidden;
            padding: 0 5%;
          }
          .showcase-card {
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            transition: all 0.5s ease;
          }
          .showcase-card--side {
            flex: 0 1 25%;
            aspect-ratio: 4/3;
            opacity: 0.6;
            filter: blur(1.5px) grayscale(30%) brightness(0.6);
            transform: scale(0.9);
          }
          .showcase-card--side:hover {
            filter: blur(0px) grayscale(0%) brightness(0.9);
            transform: scale(0.93);
            opacity: 0.9;
          }
          .showcase-card-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,0.4);
            opacity: 0;
            transition: all 0.3s ease;
          }
          .showcase-card--side:hover .showcase-card-overlay {
            opacity: 1;
          }
          .showcase-card-overlay h4 {
            color: #fff;
            font-size: 2rem;
            font-family: var(--font-2);
            text-shadow: 0 4px 10px rgba(0,0,0,0.5);
            margin: 0;
          }
          @keyframes showcaseFade {
            0% { opacity: 0; transform: scale(0.98); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: showcaseFade 0.6s cubic-bezier(0.2, 1, 0.2, 1) forwards;
          }
          .showcase-card--center {
            flex: 0 1 45%;
            aspect-ratio: 16/9;
            box-shadow: 0 30px 70px rgba(0,0,0,0.8), 0 0 30px rgba(197, 157, 58, 0.08);
            border: 1px solid rgba(255,255,255,0.1);
            z-index: 2;
          }
          .showcase-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .showcase-card-content {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            padding: 50px 40px 40px;
            background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%);
            text-align: left;
          }
          .showcase-card-title {
            font-size: 3.5rem;
            font-family: var(--font-1);
            font-weight: 500;
            letter-spacing: -0.02em;
            margin-bottom: 5px;
            color: #fff;
          }
          .showcase-card-subtitle {
            font-size: 1.15rem;
            color: #aaa;
            margin-bottom: 30px;
          }
          .showcase-btn {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.15);
            padding: 8px 24px 8px 8px;
            border-radius: 40px;
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            transition: all 0.3s;
            backdrop-filter: blur(10px);
          }
          .showcase-btn:hover {
            background: rgba(255,255,255,0.2);
          }
          .showcase-btn-icon {
            background: var(--gold);
            width: 32px; height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          .showcase-btn:hover .showcase-btn-icon {
            transform: scale(1.1);
          }

          .showcase-headline {
            font-size: clamp(3rem, 5vw, 5rem);
            font-family: var(--font-2);
            max-width: 900px;
            margin: 0 auto;
            line-height: 1.1;
          }

          @media (max-width: 992px) {
            .fresh-card-layout { flex-direction: column; }
            .showcase-carousel { flex-direction: column; }
            .showcase-card--side { display: none; }
            .showcase-card--center { flex: 0 1 100%; aspect-ratio: 4/3; }
          }
        `}
      </style>

      {/* Hero Banner */}
      <section className="section-flagship-banner bg-colorway-black" style={{ minHeight: '80vh', position: 'relative', overflow: 'hidden' }}>
        <div className="flagship-banner" style={{ minHeight: '80vh' }}>
          <div className="flagship-banner__bg" style={{ animation: 'slowZoom 20s infinite alternate ease-in-out' }}>
            <div className="flagship-banner__bg-inner" data-scroll data-scroll-speed="-0.25">
              <img src={HERO_POSTER} alt="Krishna Sheesh Mahal" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75) contrast(1.05)' }} />
            </div>
            {/* Overlay Gradient */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)', zIndex: 1 }} />
          </div>
          <div className="flagship-banner__inner section section--large" style={{ justifyContent: 'center', alignItems: 'center', zIndex: 2, position: 'relative' }}>
            <div style={{ textAlign: 'center', maxWidth: '800px' }}>
              <h4 style={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem', margin: '0 auto 1rem', animation: 'revealUp 1s ease forwards', opacity: 0, display: 'inline-block', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                Krishna Sheesh Mahal
              </h4>
              <h1 style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', color: '#fff', fontFamily: 'var(--font-2)', lineHeight: 1.1, marginBottom: '1.5rem', textShadow: '0 4px 20px rgba(0,0,0,0.8)', animation: 'revealUp 1.2s ease forwards', opacity: 0, animationDelay: '0.2s' }}>
                Our <em>Story</em>
              </h1>
              <p style={{ color: '#eaeaea', fontSize: '1.2rem', lineHeight: 1.6, margin: '0 auto', maxWidth: '500px', animation: 'revealUp 1.4s ease forwards', opacity: 0, animationDelay: '0.4s', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                A legacy of unforgettable experiences, crafted with passion and dedication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Animated Statement Section */}
      <section className="pt-medium pb-small section-colorway-gray">
        <div className="section section--large content" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-3)', 
            fontWeight: '300', 
            fontStyle: 'italic', 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            lineHeight: '1.3', 
            color: 'var(--heading-color)',
            letterSpacing: '-0.02em',
            maxWidth: '1000px'
          }}>
            {words.map((word, i) => (
              <span className="word-wrap" key={i}>
                <span className="word-reveal" style={{ animationDelay: `${0.2 + (i * 0.04)}s` }}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>
      </section>

      {/* Collaborators & Clients */}
      <ScrollingLogos />

      {/* Unique Image Collage with Text Section */}
      <section className="section-image-with-text pv-large section-colorway-gray">
        <div className="img-w-txt img-w-txt--img-pair img-w-txt--align-left section section--large" style={{ alignItems: 'center' }}>
          <div className="img-w-txt__img" style={{ width: '45%' }}>
            <div className="image-collage" data-scroll data-scroll-speed="0.1">
              <img
                loading="lazy"
                className="image-collage__img-1"
                src={ABOUT_IMAGES.secondary2x}
                alt="Hospitality Experience"
              />
              <img
                loading="lazy"
                className="image-collage__img-2"
                src={ABOUT_IMAGES.primary2x}
                alt="Comfort and Creativity"
                data-scroll data-scroll-speed="0.05"
              />
              <img
                loading="lazy"
                className="image-collage__img-3"
                src="https://thepopuphotel.com/wp-content/uploads/2026/03/Monza13-2560x1440.webp"
                alt="Detail"
                data-scroll data-scroll-speed="-0.1"
              />
            </div>
          </div>

          <div className="img-w-txt__txt content parallax-opacity" data-scroll data-scroll-css-progress style={{ width: '50%', paddingLeft: '8%' }}>
            <h2 className="subtitle" style={{ letterSpacing: '0.2em', color: 'color-mix(in srgb, var(--heading-color) 60%, transparent)' }}>A PASSION FOR</h2>
            <h3 style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', lineHeight: '1', marginBottom: 'var(--spacing-mini)', fontFamily: 'var(--font-2)' }}>
              Comfort and <br/>
              <em style={{ fontFamily: 'var(--font-3)', fontStyle: 'italic', fontWeight: '300' }}>Creativity.</em>
            </h3>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--heading-color)', margin: 'var(--spacing-mini) 0' }}></div>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: 'var(--spacing-small)', maxWidth: '450px', color: 'color-mix(in srgb, var(--text-color) 80%, transparent)' }}>
              At Krishna Sheesh Mahal, we redefine your stay experience by blending immersive luxury, comfort, and seamless hospitality to create unforgettable memories.
              <br/><br/>
              <strong>Check-in / Check-out:</strong> 11 AM TO 11 PM<br/>
              <strong>Total Rooms:</strong> 16 (3 Deluxe, 10 Super Deluxe, 1 Premium, 2 Suites)<br/>
              <strong>Floors:</strong> 2nd or 3rd<br/>
              <strong>Guest Capacity:</strong> 50-60<br/>
              <strong>Facilities:</strong> Free Wi-Fi, Smart TV, AC, Tea Kettle, Big space parking<br/>
              <strong>Services:</strong> Water, Food, Bath Towels
            </p>
            <Link to="/" className="btn btn--regular">
              OUR HOTELS
            </Link>
          </div>
        </div>
      </section>

      {/* --- NEW SECTIONS INSPIRED BY USER REF --- */}
      <div className="about-dark-section">
        
        {/* Glowing Fresh Card Section */}
        <div className="fresh-card-layout">
          <div className="fresh-card-img" data-scroll data-scroll-speed="0.1">
            <img src={ABOUT_IMAGES.primary2x} alt="Premium Ingredients" loading="lazy" />
          </div>
          <div className="fresh-card-content" data-scroll data-scroll-speed="0.05">
            <div className="fresh-badge">Always Premium</div>
            <p className="fresh-card-subtitle">Our ever-evolving spaces celebrate the best of luxury living</p>
            <h2 className="fresh-card-title">
              Blending Impeccable Hospitality With <br/>
              <span className="fresh-highlight">Fresh, Vibrant Experiences.</span>
            </h2>
            <p className="fresh-card-desc">
              From everyday stays to holidays and special occasions, every detail is crafted to elevate your experience and fit seamlessly into your lifestyle.
            </p>
          </div>
        </div>

        {/* Carousel Showcase Section */}
        <div className="showcase-section">
          <div className="showcase-carousel">
            <div className="showcase-card showcase-card--side" onClick={() => setActiveIndex(prevIdx)} style={{ cursor: 'pointer' }}>
              <img src={showcaseCards[prevIdx].img} alt={showcaseCards[prevIdx].title} />
              <div className="showcase-card-overlay">
                <h4>{showcaseCards[prevIdx].title}</h4>
              </div>
            </div>
            
            <div className="showcase-card showcase-card--center">
              <img src={showcaseCards[activeIndex].img} alt={showcaseCards[activeIndex].title} key={showcaseCards[activeIndex].img} className="animate-fade-in" />
              <div className="showcase-card-content animate-fade-in" key={showcaseCards[activeIndex].title}>
                <h3 className="showcase-card-title">{showcaseCards[activeIndex].title}</h3>
                <p className="showcase-card-subtitle">{showcaseCards[activeIndex].subtitle}</p>
                <Link to={showcaseCards[activeIndex].link} className="showcase-btn">
                  <span className="showcase-btn-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </span>
                  {showcaseCards[activeIndex].btnText}
                </Link>
              </div>
            </div>

            <div className="showcase-card showcase-card--side" onClick={() => setActiveIndex(nextIdx)} style={{ cursor: 'pointer' }}>
              <img src={showcaseCards[nextIdx].img} alt={showcaseCards[nextIdx].title} />
              <div className="showcase-card-overlay">
                <h4>{showcaseCards[nextIdx].title}</h4>
              </div>
            </div>
          </div>

          <h2 className="showcase-headline" data-scroll data-scroll-speed="0.05">
            Designed For Your Taste,<br/>
            Built For Your Stay.
          </h2>
        </div>
      </div>

      <QuoteSlider />
    </>
  );
}
