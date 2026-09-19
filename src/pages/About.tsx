import { HERO_POSTER, ABOUT_IMAGES } from "../data";
import ScrollingLogos from "../components/ScrollingLogos";
import QuoteSlider from "../components/QuoteSlider";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function About() {
  const statement = "Born from a passion for creating unforgettable memories, our journey began in Kota, where we sought to transform how people experience hospitality.";
  
  const words = useMemo(() => statement.split(" "), []);

  return (
    <>
      <style>
        {`
          @keyframes revealUp {
            0% { opacity: 0; transform: translateY(40px) rotate(2deg); filter: blur(4px); }
            100% { opacity: 1; transform: translateY(0) rotate(0deg); filter: blur(0); }
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
        `}
      </style>

      {/* Hero Banner */}
      <section className="section-flagship-banner bg-colorway-black" style={{ minHeight: '60vh' }}>
        <div className="flagship-banner" style={{ minHeight: '60vh' }}>
          <div className="flagship-banner__bg">
            <div className="flagship-banner__bg-inner" data-scroll data-scroll-speed="-0.25">
              <img src={HERO_POSTER} alt="Krishna Sheesh Mahal" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
            </div>
          </div>
          <div className="flagship-banner__inner section section--large" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ fontSize: 'var(--h1)', color: '#fff', textAlign: 'center', fontFamily: 'var(--font-2)', marginBottom: 'var(--spacing-small)' }}>
              Our <em>Story</em>
            </h1>
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
      <section className="section-image-with-text pv-large section-colorway-white">
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
              At Krishna Sheesh Mahal, we redefine your stay experience by blending immersive luxury, comfort, and seamless hospitality to create unforgettable memories. Our mission is simple: to deliver exceptional service, impeccable comfort, and a carefully curated environment that enhances every moment of your visit beyond expectation.
            </p>
            <Link to="/" className="btn btn--regular">
              OUR HOTELS
            </Link>
          </div>
        </div>
      </section>

      <QuoteSlider />
    </>
  );
}
