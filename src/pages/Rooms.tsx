import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HERO_POSTER } from "../data";
import QuoteSlider from "../components/QuoteSlider";

const U = "https://thepopuphotel.com/wp-content/uploads";
const ROOM_SINGLE = `${U}/2026/03/Monza13-2560x1440.webp`;
const ROOM_DOUBLE = `${U}/2026/03/img-5-1600x900.webp`;
const ROOM_SUITE = `${U}/2026/03/The-Pop-Up-Hotel-Silverstone-1600x900.webp`;

export default function Rooms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>
        {`
          .rooms-container {
            background-color: #fff;
            padding: 0;
          }
          /* Improve header visibility on scroll for this page */
          body.scroll-active .header {
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          .room-card {
            position: relative;
            display: block;
            height: 90vh;
            min-height: 600px;
            margin: 0;
            width: 100%;
            overflow: hidden;
            background: #fff;
          }
          .room-image-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 75%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
          }
          .room-card--reverse .room-image-wrapper {
            left: auto;
            right: 0;
          }
          .room-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1.2s cubic-bezier(0.2, 1, 0.2, 1);
          }
          .room-card:hover .room-img {
            transform: scale(1.05);
          }
          
          .room-content {
            position: absolute;
            top: 50%;
            right: 5%;
            transform: translateY(-50%);
            width: 40%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            padding: 4%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            z-index: 2;
            box-shadow: 0 30px 60px rgba(0,0,0,0.08);
            border: 1px solid rgba(255,255,255,0.5);
            transition: transform 0.6s cubic-bezier(0.2, 1, 0.2, 1), box-shadow 0.6s ease;
          }
          /* Improve readability inside the glass card */
          .room-content p {
            color: var(--text-color) !important;
            font-weight: 500;
          }
          .room-content h2.subtitle {
            color: color-mix(in srgb, var(--heading-color) 85%, transparent) !important;
            font-weight: 700;
          }
          .room-card--reverse .room-content {
            right: auto;
            left: 5%;
          }
          .room-card:hover .room-content {
            transform: translateY(-52%);
            box-shadow: 0 40px 80px rgba(0,0,0,0.12);
          }

          @media (max-width: 1024px) {
            .room-card {
              height: auto;
              display: flex;
              flex-direction: column;
              padding-bottom: var(--spacing-large);
            }
            .room-image-wrapper {
              position: relative;
              width: 100%;
              height: 50vh;
            }
            .room-content {
              position: relative;
              top: auto; right: auto; left: auto;
              transform: none !important;
              width: 90%;
              margin: -10vh auto 0;
            }
            .room-card--reverse .room-content {
              left: auto;
            }
          }
          .feature-list {
            list-style: none;
            padding: 0;
            margin: var(--spacing-mini) 0;
          }
          .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            font-size: 1.05rem;
            color: var(--text-color);
            font-weight: 500;
          }
          .feature-dot {
            width: 8px;
            height: 8px;
            background-color: #ff9f87;
            border-radius: 50%;
          }
          .price-tag {
            font-size: 1.75rem;
            font-family: var(--font-2);
            color: var(--heading-color);
            margin-bottom: 5px;
          }
          .price-label {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: color-mix(in srgb, var(--text-color) 85%, transparent);
            font-weight: 600;
          }

          /* --- ROOMS GRID HERO --- */
          .rooms-hero-grid {
            width: 100%;
            min-height: 100vh;
            padding-top: calc(var(--header-height) + 16px);
            background-color: #faf9f8;
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding-bottom: 16px;
            overflow: hidden;
          }

          .rg-top-row {
            display: flex;
            height: 60vh;
            min-height: 550px;
            gap: 16px;
          }

          .rg-text-block {
            flex: 1;
            background: #faf9f8;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 4% 0 6%;
            opacity: 0;
            animation: rgFadeInUp 0.8s cubic-bezier(0.2, 1, 0.2, 1) 0.1s forwards;
          }

          .rg-subtitle {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.4em;
            color: #777;
            margin-bottom: 20px;
            font-weight: 600;
          }

          .rg-title {
            font-size: clamp(3.5rem, 5.5vw, 6.5rem);
            font-family: var(--font-2);
            line-height: 1.05;
            color: #111;
            margin-bottom: 24px;
            font-weight: 500;
          }
          
          .rg-title em {
            font-family: var(--font-3);
            font-style: italic;
            font-weight: 400;
            color: #d88373;
          }

          .rg-desc {
            font-size: 1.05rem;
            color: #555;
            line-height: 1.6;
            max-width: 90%;
            margin-bottom: 40px;
          }

          .rg-buttons {
            display: flex;
            align-items: center;
            gap: 24px;
          }

          .rg-btn-primary {
            background: #111;
            color: #fff;
            padding: 16px 36px;
            border-radius: 40px;
            font-weight: 500;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            transition: all 0.4s cubic-bezier(0.2, 1, 0.2, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }
          .rg-btn-primary::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(255,255,255,0.1);
            transform: translateX(-100%);
            transition: transform 0.4s ease;
          }
          .rg-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          .rg-btn-primary:hover::before {
            transform: translateX(0);
          }
          .rg-btn-primary svg {
            transition: transform 0.4s cubic-bezier(0.2, 1, 0.2, 1);
          }
          .rg-btn-primary:hover svg {
            transform: translateX(4px);
          }

          .rg-btn-secondary {
            color: #111;
            text-decoration: none;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: opacity 0.3s;
          }
          .rg-btn-secondary:hover {
            opacity: 0.7;
          }

          .rg-media-block {
            flex: 1.2;
            border-top-left-radius: 40px;
            border-bottom-left-radius: 40px;
            overflow: hidden;
            position: relative;
            opacity: 0;
            animation: rgFadeInRight 0.8s cubic-bezier(0.2, 1, 0.2, 1) 0.3s forwards;
          }

          .rg-media-block img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1.5s cubic-bezier(0.2, 1, 0.2, 1);
          }
          .rg-media-block:hover img {
            transform: scale(1.03);
          }

          .rg-bottom-row {
            display: flex;
            height: 22vh;
            min-height: 200px;
            gap: 16px;
          }

          .rg-feature-box {
            flex: 1;
            background: #f2f0ec;
            display: flex;
            align-items: center;
            padding: 2% 4%;
            gap: 24px;
            opacity: 0;
            animation: rgFadeInUp 0.8s cubic-bezier(0.2, 1, 0.2, 1) forwards;
          }
          
          .rg-feature-box-1 {
            border-top-right-radius: 40px;
            border-bottom-right-radius: 40px;
            animation-delay: 0.4s;
          }

          .rg-feature-box-2 {
            border-radius: 40px;
            animation-delay: 0.5s;
          }

          .rg-feature-col {
            flex: 1;
          }
          
          /* Icons */
          .rg-feature-icon {
            width: 32px;
            height: 32px;
            margin-bottom: 16px;
            opacity: 0.6;
            stroke-width: 1.2;
          }

          .rg-feature-col h4 {
            font-size: 0.95rem;
            color: #111;
            margin-bottom: 8px;
            font-weight: 600;
            letter-spacing: 0.02em;
          }
          .rg-feature-col p {
            font-size: 0.85rem;
            color: #777;
            line-height: 1.6;
          }

          .rg-arrow-box {
            flex: 0 0 22vh;
            max-width: 250px;
            background: #111;
            border-top-left-radius: 40px;
            border-bottom-left-radius: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.2, 1, 0.2, 1);
            opacity: 0;
            animation: rgFadeInRight 0.8s cubic-bezier(0.2, 1, 0.2, 1) 0.6s forwards;
          }
          .rg-arrow-box:hover {
            background: #222;
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          }
          .rg-arrow-box:hover svg {
            transform: translate(6px, -6px) scale(1.1);
          }
          .rg-arrow-box svg {
            transition: transform 0.5s cubic-bezier(0.2, 1, 0.2, 1);
            stroke-width: 1.2;
          }

          @keyframes rgFadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes rgFadeInRight {
            0% { opacity: 0; transform: translateX(30px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @media (max-width: 1024px) {
            .rg-top-row {
              flex-direction: column;
              height: auto;
            }
            .rg-text-block {
              padding: 5% 4%;
            }
            .rg-media-block {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              height: 50vh;
            }
            .rg-bottom-row {
              flex-direction: column;
              height: auto;
            }
            .rg-feature-box, .rg-arrow-box {
              border-radius: 0 !important;
              padding: 40px 6%;
            }
            .rg-arrow-box {
              max-width: none;
              height: 150px;
              flex: 0 0 150px;
            }
          }


          /* --- SERVICES GRID --- */
          .services-section {
            background-color: #050505;
            height: 100vh;
            width: 100%;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: stretch;
            overflow: hidden;
          }
          .services-grid-wrapper {
            width: 100%;
            height: 100%;
            max-width: none;
            margin: 0;
            padding: 0;
          }
          .services-grid {
            display: grid;
            width: 100%;
            height: 100%;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 2px;
            background: #111;
          }
          .srv-block {
            position: relative;
            padding: 3vw;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: #0a0a0a;
            color: #fff;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
            cursor: pointer;
            text-decoration: none;
            z-index: 1;
          }
          .srv-block:hover {
            background-color: #1a1a1a;
            transform: scale(0.95);
            border-radius: 24px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            z-index: 10;
          }
          /* Glare effect on hover */
          .srv-block::before {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 50%; height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%);
            transform: skewX(-25deg);
            z-index: 3;
            pointer-events: none;
          }
          .srv-block:hover::before {
            animation: glare 0.8s ease forwards;
          }
          @keyframes glare {
            0% { left: -100%; }
            100% { left: 200%; }
          }
          
          .srv-block::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #fff;
            transition: width 0.6s cubic-bezier(0.8, 0, 0.2, 1);
            z-index: 5;
          }
          .srv-block:hover::after {
            width: 100%;
          }
          
          .srv-block-bg {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover;
            background-position: center;
            z-index: 0;
            transition: transform 1.5s cubic-bezier(0.2, 1, 0.2, 1);
          }
          .srv-block:hover .srv-block-bg {
            transform: scale(1.08);
          }
          .srv-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9));
            z-index: 1;
            transition: opacity 0.5s ease;
          }
          .srv-block:hover .srv-overlay {
            opacity: 0.8;
          }
          
          .srv-content {
            position: relative;
            z-index: 4;
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          .srv-block-num {
            position: absolute;
            top: 2vw;
            right: 2vw;
            font-size: 1.5rem;
            font-family: var(--font-2);
            color: rgba(255,255,255,0.15);
            font-weight: 300;
            transition: color 0.3s ease;
            z-index: 4;
          }
          .srv-block:hover .srv-block-num {
            color: rgba(255,255,255,0.5);
          }
          
          .srv-icon {
            width: 48px;
            height: 48px;
            stroke: rgba(255,255,255,0.4);
            margin-bottom: auto;
            transition: all 0.5s cubic-bezier(0.2, 1, 0.2, 1);
            transform-origin: left center;
          }
          .srv-block:hover .srv-icon {
            stroke: #fff;
            transform: scale(1.15) translateY(-5px);
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
          }
          
          .srv-title {
            font-size: 2rem;
            font-family: var(--font-2);
            line-height: 1.1;
            margin-bottom: 10px;
            color: #fff;
            transition: transform 0.4s ease;
          }
          .srv-block:hover .srv-title {
            transform: translateY(-5px);
          }
          
          .srv-desc {
            font-size: 1.05rem;
            color: rgba(255,255,255,0.5);
            line-height: 1.5;
            transition: color 0.4s ease, transform 0.4s ease;
          }
          .srv-block:hover .srv-desc {
            color: rgba(255,255,255,0.9);
            transform: translateY(-2px);
          }
          
          .srv-link {
            align-self: flex-start;
            margin-top: 20px;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #fff;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
          .srv-block:hover .srv-link {
            opacity: 1;
            transform: translateY(0);
          }
          .srv-link::after {
            content: "↗";
            font-size: 1.2rem;
            transition: transform 0.3s ease;
          }
          .srv-link:hover::after {
            transform: translate(3px, -3px);
          }

          .srv-block--large .srv-title {
            font-size: 3.5rem;
          }

          @media (max-width: 1024px) {
            .services-section { height: auto; min-height: 100vh; padding: 2px 0; }
            .services-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
            .srv-block { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 400px; padding: 40px; }
            .srv-block--large { grid-column: span 2 !important; }
            .srv-block-num { top: 20px; right: 20px; }
          }
          @media (max-width: 650px) {
            .services-grid { grid-template-columns: 1fr; }
            .srv-block--large { grid-column: span 1 !important; }
          }
        `}
      </style>      {/* Rooms Grid Hero */}
      <section className="rooms-hero-grid">
        <div className="rg-top-row">
          <div className="rg-text-block">
            <h2 className="rg-subtitle">Krishna Sheesh Mahal</h2>
            <h1 className="rg-title">Our <em>Rooms</em></h1>
            <p className="rg-desc">
              Discover a sanctuary of peace in the heart of Kota. Immerse yourself in refined luxury, 
              thoughtful amenities, and spaces designed for ultimate relaxation.
            </p>
            <div className="rg-buttons">
              <a href="#single-room" className="rg-btn-primary">
                Explore Rooms 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="rg-media-block">
            <img src={ROOM_SUITE} alt="Luxury Room" />
          </div>
        </div>

        <div className="rg-bottom-row">
          {/* Block 1 */}
          <div className="rg-feature-box rg-feature-box-1">
            <div className="rg-feature-col">
              <svg className="rg-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M22 4v16M4 8h16M4 16h16"></path></svg>
              <h4>Plush Bedding</h4>
              <p>Premium mattresses and fine linens for a perfect night's sleep.</p>
            </div>
            <div className="rg-feature-col">
              <svg className="rg-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
              <h4>High-Speed Wi-Fi</h4>
              <p>Stay connected with complimentary high-speed internet in every room.</p>
            </div>
          </div>
          
          {/* Block 2 */}
          <div className="rg-feature-box rg-feature-box-2">
            <div className="rg-feature-col">
              <svg className="rg-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>
              <h4>Smart Climate</h4>
              <p>Personalized temperature control for your optimal comfort.</p>
            </div>
            <div className="rg-feature-col">
              <svg className="rg-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              <h4>In-Room Dining</h4>
              <p>Exquisite culinary experiences delivered right to your door.</p>
            </div>
          </div>
          
          {/* Arrow Block (Pointing down to the rooms list) */}
          <a href="#single-room" className="rg-arrow-box">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="19" x2="19" y2="5"></line>
              <polyline points="9 5 19 5 19 15"></polyline>
            </svg>
          </a>
        </div>
      </section>

      <div className="rooms-container">
        {/* Single / Deluxe Room Section */}
        <section id="single-room">
          <div className="room-card">
            <div className="room-image-wrapper">
              <img src={ROOM_SINGLE} alt="Single Room" className="room-img" loading="lazy" />
            </div>
            
            <div className="room-content">
              <h2 className="subtitle" style={{ letterSpacing: '0.2em', color: 'color-mix(in srgb, var(--heading-color) 60%, transparent)' }}>COMFORT & STYLE</h2>
              <h3 style={{ fontSize: 'var(--h3)', lineHeight: '1.1', marginBottom: '10px', fontFamily: 'var(--font-2)', color: 'var(--heading-color)' }}>
                Single <em style={{ fontFamily: 'var(--font-3)', fontStyle: 'italic', fontWeight: '300' }}>Room</em>
              </h3>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#ff9f87', margin: '20px 0' }}></div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px', color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}>
                Perfect for solo travelers and business professionals, our Single Room offers a cozy retreat with a plush single bed, dedicated workspace, and modern amenities.
              </p>
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot"></div> 1 King Size or Twin Bed</li>
                <li className="feature-item"><div className="feature-dot"></div> High-speed Wi-Fi & Smart TV</li>
                <li className="feature-item"><div className="feature-dot"></div> En-suite bathroom with rain shower</li>
              </ul>
              <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <div className="price-tag">$120</div>
                  <div className="price-label">Per Night</div>
                </div>
                <a href="#book" className="btn btn--regular" style={{ backgroundColor: 'var(--heading-color)', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '30px' }}>Book Now</a>
              </div>
            </div>
          </div>
        </section>

        {/* Double Room Section */}
        <section id="double-room">
          <div className="room-card room-card--reverse">
            <div className="room-image-wrapper">
              <img src={ROOM_DOUBLE} alt="Double Room" className="room-img" loading="lazy" />
            </div>
            
            <div className="room-content">
              <h2 className="subtitle" style={{ letterSpacing: '0.2em', color: 'color-mix(in srgb, var(--heading-color) 60%, transparent)' }}>SPACIOUS LUXURY</h2>
              <h3 style={{ fontSize: 'var(--h3)', lineHeight: '1.1', marginBottom: '10px', fontFamily: 'var(--font-2)', color: 'var(--heading-color)' }}>
                Double <em style={{ fontFamily: 'var(--font-3)', fontStyle: 'italic', fontWeight: '300' }}>Room</em>
              </h3>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#ff9f87', margin: '20px 0' }}></div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px', color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}>
                Designed for couples or companions, our Double Room provides ample space and premium comfort. Enjoy relaxing evenings and wake up refreshed.
              </p>
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot"></div> 1 Large Double Bed</li>
                <li className="feature-item"><div className="feature-dot"></div> Scenic City Views</li>
                <li className="feature-item"><div className="feature-dot"></div> Complimentary minibar & espresso machine</li>
              </ul>
              <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <div className="price-tag">$190</div>
                  <div className="price-label">Per Night</div>
                </div>
                <a href="#book" className="btn btn--regular" style={{ backgroundColor: 'var(--heading-color)', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '30px' }}>Book Now</a>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Suite Section */}
        <section id="suite">
          <div className="room-card">
            <div className="room-image-wrapper">
              <img src={ROOM_SUITE} alt="Premium Suite" className="room-img" loading="lazy" />
            </div>
            
            <div className="room-content">
              <h2 className="subtitle" style={{ letterSpacing: '0.2em', color: 'color-mix(in srgb, var(--heading-color) 60%, transparent)' }}>ULTIMATE EXPERIENCE</h2>
              <h3 style={{ fontSize: 'var(--h3)', lineHeight: '1.1', marginBottom: '10px', fontFamily: 'var(--font-2)', color: 'var(--heading-color)' }}>
                Premium <em style={{ fontFamily: 'var(--font-3)', fontStyle: 'italic', fontWeight: '300' }}>Suite</em>
              </h3>
              <div style={{ width: '40px', height: '2px', backgroundColor: '#ff9f87', margin: '20px 0' }}></div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '20px', color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}>
                Experience the pinnacle of luxury in our Premium Suite. Featuring a separate living area, panoramic views, and exclusive VIP amenities for an unforgettable stay.
              </p>
              <ul className="feature-list">
                <li className="feature-item"><div className="feature-dot"></div> Separate Living & Bedroom Areas</li>
                <li className="feature-item"><div className="feature-dot"></div> Luxury Bathtub & Premium Toiletries</li>
                <li className="feature-item"><div className="feature-dot"></div> 24/7 Dedicated Butler Service</li>
              </ul>
              <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <div className="price-tag">$350</div>
                  <div className="price-label">Per Night</div>
                </div>
                <a href="#book" className="btn btn--regular" style={{ backgroundColor: 'var(--heading-color)', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '30px' }}>Book Now</a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Services & Amenities Grid */}
      <section className="services-section">
        <div className="services-grid-wrapper">
          <div className="services-grid">
            
            {/* Block 1 (Large Intro) */}
            <a href="#book" className="srv-block srv-block--large" style={{ gridColumn: '1 / 2', gridRow: '1 / 3' }}>
              <div className="srv-block-bg" style={{ backgroundImage: `url(${ROOM_SUITE})` }}></div>
              <div className="srv-overlay"></div>
              <div className="srv-content" style={{ justifyContent: 'flex-end' }}>
                <h3 className="srv-title">Book an<br/>Experience</h3>
                <p className="srv-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>With country's leading hospitality experts.</p>
                <span className="srv-link">Book Now</span>
              </div>
            </a>

            {/* Block 2 (Fine Dining) */}
            <a href="#dining" className="srv-block" style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }}>
              <span className="srv-block-num">01</span>
              <div className="srv-content">
                <svg className="srv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <div style={{ marginTop: 'auto' }}>
                  <h4 className="srv-title">Fine Dining</h4>
                  <p className="srv-desc">Our culinary expertise delivering world-class flavors.</p>
                </div>
              </div>
            </a>

            {/* Block 3 (Concierge) */}
            <a href="#concierge" className="srv-block" style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
              <span className="srv-block-num">02</span>
              <div className="srv-content">
                <svg className="srv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <div style={{ marginTop: 'auto' }}>
                  <h4 className="srv-title">Concierge</h4>
                  <p className="srv-desc">Top experts to curate your perfect stay.</p>
                </div>
              </div>
            </a>

            {/* Block 4 (Spa) */}
            <a href="#spa" className="srv-block" style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }}>
              <span className="srv-block-num">03</span>
              <div className="srv-content">
                <svg className="srv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                <div style={{ marginTop: 'auto' }}>
                  <h4 className="srv-title">Luxury Spa</h4>
                  <p className="srv-desc">Preventive and restorative care packages.</p>
                </div>
              </div>
            </a>

            {/* Block 5 (24/7 Service) */}
            <a href="#service" className="srv-block" style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}>
              <span className="srv-block-num">04</span>
              <div className="srv-content">
                <svg className="srv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <div style={{ marginTop: 'auto' }}>
                  <h4 className="srv-title">24/7 Service</h4>
                  <p className="srv-desc">Immediate support anytime you need it.</p>
                </div>
              </div>
            </a>

            {/* Block 6 (Experiences - Large Right) */}
            <a href="#experiences" className="srv-block srv-block--large" style={{ gridColumn: '4 / 5', gridRow: '1 / 3' }}>
              <div className="srv-block-bg" style={{ backgroundImage: `url(${ROOM_SINGLE})` }}></div>
              <div className="srv-overlay"></div>
              <div className="srv-content" style={{ justifyContent: 'flex-end' }}>
                <h3 className="srv-title">Experiences</h3>
                <p className="srv-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>Curated local tours and activities designed for you.</p>
                <span className="srv-link">View Guide</span>
              </div>
            </a>

          </div>
        </div>
      </section>

      <QuoteSlider />
    </>
  );
}
