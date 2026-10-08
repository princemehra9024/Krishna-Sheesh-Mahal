import { HERO_POSTER, ABOUT_IMAGES } from "../data";
import ScrollingLogos from "../components/ScrollingLogos";
import QuoteSlider from "../components/QuoteSlider";
import { Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useSEO } from "../hooks/useSEO";

export default function About() {
  useSEO("About Us | Krishna Sheesh Mahal Kota", "Learn about the rich heritage, majestic architecture, and luxurious royal hospitality at Krishna Sheesh Mahal, the finest 4-star property in Kota.");
  
  const statement = "Born from a passion for creating unforgettable memories, our journey began in Kota, where we sought to transform how people experience hospitality.";
  const words = useMemo(() => statement.split(" "), [statement]);

  return (
    <>
      <style>
        {`
          /* Minimalist Custom About Styles */
          :root {
            --about-bg: #fdfdfc;
            --about-dark: #111111;
            --about-accent: #c59d3a;
          }

          .about-hero-custom {
            height: 100vh;
            background-color: #fdfdfc;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
          }

          .hero-img-main {
            position: absolute;
            right: 4%;
            top: 50%;
            transform: translateY(-45%);
            width: 48vw;
            height: 75vh;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.12);
            z-index: 1;
          }
          
          .hero-img-main img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            animation: panImage 25s infinite alternate ease-in-out;
            transform: scale(1.05);
          }

          .hero-img-accent {
            position: absolute;
            left: 45%;
            bottom: 8%;
            width: 18vw;
            height: 28vh;
            border-radius: 100px 100px 16px 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            z-index: 3;
            border: 8px solid #fdfdfc;
          }

          .hero-img-accent img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .hero-text-content {
            position: relative;
            z-index: 4;
            padding-left: 8%;
            max-width: 70vw;
            pointer-events: none;
          }

          .hero-label {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.35em;
            color: var(--about-accent);
            margin-bottom: 2rem;
            display: inline-flex;
            align-items: center;
            gap: 15px;
            animation: slideUp 1s ease forwards;
            opacity: 0;
            font-weight: 500;
          }
          
          .hero-label::before {
            content: "";
            display: block;
            width: 50px;
            height: 1px;
            background-color: var(--about-accent);
          }

          .hero-title {
            font-size: clamp(5rem, 13vw, 15rem);
            font-family: var(--font-2);
            line-height: 0.85;
            color: var(--about-dark);
            margin: 0;
            letter-spacing: -0.02em;
            text-transform: capitalize;
            animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s;
            opacity: 0;
          }

          .hero-subtitle {
            font-family: var(--font-3);
            font-style: italic;
            font-weight: 300;
            color: var(--about-dark);
            display: block;
            margin-left: 12vw;
            margin-top: -10px;
          }

          .hero-desc {
            margin-top: 4rem;
            font-size: 1.15rem;
            line-height: 1.6;
            color: #555;
            max-width: 380px;
            margin-left: 18vw;
            animation: slideUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.4s;
            opacity: 0;
          }

          /* The Story Section - Reduced Height */
          .about-story {
            padding: 100px 5%;
            background-color: var(--about-bg);
            text-align: center;
            position: relative;
            z-index: 5;
          }

          .about-story-text {
            font-family: var(--font-1);
            font-size: clamp(1.8rem, 3.5vw, 3rem);
            line-height: 1.4;
            max-width: 1000px;
            margin: 0 auto;
            color: var(--about-dark);
            letter-spacing: -0.01em;
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
            transform: translateY(30px);
            animation: revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* Core Pillars / Grid - More Compact */
          .about-pillars {
            padding: 40px 5% 100px;
            background-color: var(--about-bg);
            position: relative;
            z-index: 5;
          }
          
          .pillars-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 3rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .pillar-card {
            border-top: 2px solid rgba(0,0,0,0.08);
            padding-top: 2rem;
            transition: transform 0.3s ease;
          }
          .pillar-card:hover {
            transform: translateY(-5px);
          }

          .pillar-num {
            font-family: var(--font-2);
            font-size: 2.5rem;
            color: var(--about-accent);
            margin-bottom: 1rem;
            opacity: 0.9;
          }

          .pillar-title {
            font-size: 1.75rem;
            font-family: var(--font-2);
            margin-bottom: 1rem;
            color: var(--about-dark);
            letter-spacing: -0.01em;
          }

          .pillar-desc {
            font-size: 1.05rem;
            line-height: 1.6;
            color: #555;
            font-weight: 400;
          }

          /* Minimalist Feature Section - Shorter Height */
          .about-feature {
            display: flex;
            align-items: stretch;
            min-height: 70vh;
            background-color: var(--about-dark);
            color: #fff;
            position: relative;
            z-index: 5;
          }

          .feature-image {
            flex: 1;
            position: relative;
            overflow: hidden;
          }
          .feature-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.9);
          }

          .feature-content {
            flex: 1;
            padding: 6% 8%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .feature-label {
            color: var(--about-accent);
            text-transform: uppercase;
            letter-spacing: 0.25em;
            font-size: 0.8rem;
            margin-bottom: 1.5rem;
            display: block;
          }

          .feature-title {
            font-size: clamp(2.5rem, 4.5vw, 4.5rem);
            font-family: var(--font-2);
            line-height: 1.1;
            margin-bottom: 2rem;
            letter-spacing: -0.02em;
          }

          .feature-text {
            font-size: 1.1rem;
            color: #ccc;
            line-height: 1.7;
            max-width: 500px;
            margin-bottom: 2.5rem;
            font-weight: 300;
          }

          .btn-minimal {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 1rem 2.5rem;
            background: transparent;
            border: 1px solid rgba(255,255,255,0.4);
            border-radius: 50px;
            color: #fff;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 0.85rem;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            align-self: flex-start;
          }

          .btn-minimal:hover {
            background: #fff;
            color: var(--about-dark);
            border-color: #fff;
          }

          @keyframes panImage {
            0% { transform: scale(1.05) translateY(0); }
            100% { transform: scale(1.05) translateY(-3%); }
          }
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes revealUp {
            0% { opacity: 0; transform: translateY(30px); filter: blur(4px); }
            100% { opacity: 1; transform: translateY(0); filter: blur(0); }
          }

          @media (max-width: 992px) {
             .hero-img-main { width: 85vw; height: 55vh; top: 12%; right: 7%; transform: none; }
             .hero-img-accent { display: none; }
             .hero-text-content { padding-top: 55vh; padding-left: 5%; }
             .hero-title { font-size: 5.5rem; }
             .hero-subtitle { margin-left: 0; }
             .hero-desc { margin-left: 0; margin-top: 2rem; max-width: 90%; }
             
             .about-feature { flex-direction: column; }
             .feature-image { width: 100%; height: 50vh; flex: none; }
             .feature-content { padding: 4rem 2rem; }
          }
        `}
      </style>

      {/* Custom Editorial Hero Section */}
      <section className="about-hero-custom">
        <div className="hero-img-main" data-scroll data-scroll-speed="-0.1">
          <img src={ABOUT_IMAGES.primary2x} alt="Krishna Sheesh Mahal History" />
        </div>
        <div className="hero-img-accent" data-scroll data-scroll-speed="0.15">
          <img src={ABOUT_IMAGES.secondary2x} alt="Krishna Sheesh Mahal Interior" />
        </div>
        <div className="hero-text-content">
          <div className="hero-label">Heritage & Hospitality</div>
          <h1 className="hero-title">
            Our <br />
            <span className="hero-subtitle">Legacy</span>
          </h1>
          <p className="hero-desc">
            Experience an era of royal elegance reimagined for the modern traveler. 
            Every detail is crafted with passion in the heart of Kota.
          </p>
        </div>
      </section>

      {/* The Story / Animated Text */}
      <section className="about-story">
        <div className="about-story-text" data-scroll>
          {words.map((word, i) => (
            <span className="word-wrap" key={i}>
              <span className="word-reveal" style={{ animationDelay: `${0.1 + (i * 0.03)}s` }}>
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

      {/* Feature Split Section */}
      <section className="about-feature">
        <div className="feature-image" data-scroll data-scroll-speed="0.05">
          <img src={ABOUT_IMAGES.secondary2x} alt="Comfort and Creativity" />
        </div>
        <div className="feature-content" data-scroll data-scroll-speed="-0.02">
          <span className="feature-label">The Experience</span>
          <h2 className="feature-title">
            Comfort and <br/>
            <em style={{ fontFamily: 'var(--font-3)', fontStyle: 'italic', fontWeight: '300', color: 'var(--about-accent)' }}>Creativity.</em>
          </h2>
          <p className="feature-text">
            At Krishna Sheesh Mahal, we redefine your stay experience by blending immersive luxury, comfort, and seamless hospitality to create unforgettable memories.
            <br/><br/>
            <strong>Check-in / Check-out:</strong> 11 AM TO 11 PM<br/>
            <strong>Total Rooms:</strong> 16 (Including Suites)<br/>
            <strong>Facilities:</strong> Free Wi-Fi, Smart TV, AC, Event Spaces
          </p>
          <Link to="/rooms" className="btn-minimal">
            Discover Rooms
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>
      </section>

      <div style={{ backgroundColor: 'var(--about-bg)' }}>
        <ScrollingLogos />
      </div>
      <QuoteSlider />
    </>
  );
}
