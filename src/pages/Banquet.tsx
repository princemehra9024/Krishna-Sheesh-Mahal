import { useEffect } from "react";
import { scrollToTarget } from "../hooks/useScrollEngine";

/* ─── image paths ─── */
const IMG_HERO = "/images/banquet/festive-facade.png";
const IMG_WEDDING = "/images/banquet/wedding-canopy.png";
const IMG_CORPORATE = "/images/banquet/conference-hall.png";
const IMG_TABLE = "/images/banquet/elegant-interior.png";

interface BanquetProps {
  onBookNow?: (type: string) => void;
}

import { useSEO } from "../hooks/useSEO";
import BanquetMenuSection from "../components/BanquetMenuSection";

export default function Banquet({ onBookNow }: BanquetProps) {
  useSEO("Banquet & Events | Krishna Sheesh Mahal Kota", "Host your dream wedding, corporate event, or private party at our majestic banquet hall. State-of-the-art facilities and royal catering in Kota.");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>
        {`
          .banquet-collage {
            position: relative;
            width: 100%;
            padding-bottom: 110%;
            perspective: 1000px;
          }
          .banquet-collage__img-1 {
            position: absolute;
            top: 0;
            left: 0;
            width: 70%;
            height: 75%;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.08);
            z-index: 1;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .banquet-collage__img-2 {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 65%;
            height: 60%;
            object-fit: cover;
            border: 8px solid #FAF7F2;
            border-radius: 12px;
            box-shadow: 0 40px 80px rgba(0,0,0,0.12);
            z-index: 2;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .banquet-collage__img-3 {
            position: absolute;
            top: 25%;
            right: -10%;
            width: 48%;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 50%;
            border: 12px solid #FAF7F2;
            box-shadow: 0 20px 50px rgba(0,0,0,0.15);
            z-index: 3;
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .banquet-collage:hover .banquet-collage__img-1 {
            transform: scale(1.02) translate(-10px, -10px);
          }
          .banquet-collage:hover .banquet-collage__img-2 {
            transform: scale(1.03) translate(10px, 10px);
          }
          .banquet-collage:hover .banquet-collage__img-3 {
            transform: scale(1.06) rotate(3deg);
          }
          .banquet-hero {
            padding-top: calc(var(--header-height) + var(--spacing-mini));
            padding-bottom: var(--spacing-large);
          }
          .banquet-hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-large);
            align-items: center;
          }
          @media (max-width: 900px) {
            .banquet-hero-grid {
              grid-template-columns: 1fr;
            }
          }
          
          /* Events Grid */
          .event-card {
            background: #FAF7F2;
            padding: var(--spacing-small);
            border: 1px solid rgba(197, 160, 89, 0.25);
            border-radius: 16px;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }
          .event-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          }
          .event-card__img {
            width: 100%;
            aspect-ratio: 4/3;
            object-fit: cover;
            margin-bottom: var(--spacing-mini);
          }
          .event-card__features {
            margin-top: var(--spacing-mini);
            padding-top: var(--spacing-mini);
            border-top: 1px solid rgba(52,69,65,0.1);
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .event-card__feature {
            font-size: var(--text-mini);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            background: rgba(52,69,65,0.05);
            padding: 4px 10px;
            border-radius: 20px;
          }

          /* Brutalist Cards */
          .brutal-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 40px;
          }
          @media (max-width: 1000px) {
            .brutal-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 700px) {
            .brutal-grid {
              grid-template-columns: 1fr;
            }
          }
          .brutal-card {
            background-color: var(--cream);
            background-image: 
              linear-gradient(to right, rgba(90,31,43,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(90,31,43,0.05) 1px, transparent 1px);
            background-size: 20px 20px;
            color: var(--charcoal);
            position: relative;
            display: flex;
            flex-direction: column;
            aspect-ratio: 3 / 4.2;
            border: 1px solid rgba(0,0,0,0.1);
            overflow: hidden;
            text-align: left;
            
            /* Scroll-linked animation using --progress */
            opacity: max(min((var(--progress, 1) - 0.1) * 3, 1), 0);
            transform: translateY(calc((1 - var(--progress, 1)) * 100px));
            transition: box-shadow 0.4s ease;
          }
          
          /* Hover effect */
          .brutal-card:hover {
            transform: translateY(calc((1 - var(--progress, 1)) * 100px - 8px));
          }
          
          .brutal-card__line-h1 {
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            height: 1px;
            background-color: rgba(0,0,0,0.7);
            z-index: 1;
          }
          .brutal-card__line-v {
            position: absolute;
            top: 0;
            bottom: 50px;
            left: 55%;
            width: 1px;
            background-color: rgba(0,0,0,0.7);
            z-index: 1;
          }
          .brutal-card__line-h2 {
            position: absolute;
            bottom: 50px;
            left: 0;
            right: 0;
            height: 1px;
            background-color: rgba(0,0,0,0.7);
            z-index: 1;
          }
          
          .brutal-card__header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 70px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            z-index: 2;
          }
          .brutal-card__no {
            font-size: 28px;
            line-height: 1;
            font-family: "Inter", "Helvetica Neue", Helvetica, sans-serif;
            font-weight: 300;
            letter-spacing: -1px;
          }
          .brutal-card__no span {
            font-size: 10px;
            display: block;
            margin-bottom: 2px;
            letter-spacing: 1px;
            font-weight: 500;
          }
          .brutal-card__badge {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-family: "Inter", Helvetica, sans-serif;
            font-weight: 400;
          }
          
          .brutal-card__main {
            position: absolute;
            top: 70px;
            bottom: 50px;
            left: 0;
            right: 0;
            z-index: 2;
            padding: 25px 20px;
            display: flex;
            flex-direction: column;
          }
          .brutal-card__title {
            font-size: 26px;
            line-height: 1.1;
            margin-bottom: 15px;
            width: 50%;
            font-weight: 500;
            font-family: "Inter", Helvetica, sans-serif;
            letter-spacing: -0.5px;
          }
          .brutal-card__desc {
            font-size: 10px;
            line-height: 1.5;
            width: 48%;
            opacity: 0.8;
            font-family: "Inter", Helvetica, sans-serif;
          }
          .brutal-card__vert {
            position: absolute;
            bottom: 20px;
            left: 20px;
            writing-mode: vertical-rl;
            text-orientation: upright;
            font-size: 14px;
            letter-spacing: 4px;
            font-weight: 600;
            font-family: "Inter", Helvetica, sans-serif;
            color: rgba(0,0,0,0.8);
          }
          .brutal-card__brand {
            position: absolute;
            bottom: 12px;
            right: 20px;
            font-size: 20px;
            font-weight: 600;
            font-family: "Inter", Helvetica, sans-serif;
            letter-spacing: -0.5px;
            color: rgba(0,0,0,0.85);
          }
          
          .brutal-card__image {
            position: absolute;
            top: 25%;
            left: 35%;
            width: 75%;
            height: 55%;
            z-index: 3;
            transition: transform 0.5s ease;
          }
          .brutal-card:hover .brutal-card__image {
            transform: scale(1.03) translateX(-5px);
          }
          .brutal-card__image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            box-shadow: -5px 15px 30px rgba(0,0,0,0.15);
            /* Optional: Add a subtle grayscale for more editorial look */
            /* filter: grayscale(20%); */
          }
          
          .brutal-card__footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            font-family: "Inter", Helvetica, sans-serif;
            opacity: 0.7;
            padding: 0 20px;
            z-index: 2;
          }
        `}
      </style>

      <div className="page-wrap" id="top">
        {/* HERO SECTION */}
        <section className="banquet-hero section-colorway-gray">
          <div className="section section--large banquet-hero-grid">
            <div className="content" data-scroll data-scroll-speed="0.1">
              <h2 className="subtitle">Krishna Sheesh Mahal</h2>
              <h1 className="h1">
                A Venue for <em>Legendary</em> Celebrations.
              </h1>
              <p className="mt-tiny mb-small">
                Nestled in the heart of Kota, our banquet halls redefine grandeur. Whether you're planning a royal wedding or an intimate corporate gala, we blend immersive luxury, exceptional service, and striking architecture to create unforgettable moments.
              </p>
              <a href="#events" className="btn btn--regular" onClick={(e) => { e.preventDefault(); scrollToTarget('#events', -70); }}>
                Explore Venues
              </a>
            </div>
            
            <div className="banquet-collage" data-scroll data-scroll-speed="0.2">
              <img src={IMG_HERO} alt="Banquet Hall" className="banquet-collage__img-1" />
              <img src={IMG_TABLE} alt="Luxury Table Setup" className="banquet-collage__img-2" />
              <img src={IMG_WEDDING} alt="Wedding Setup" className="banquet-collage__img-3" />
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="section-colorway-gray pv-inset border-top border-bottom" style={{ borderColor: 'rgba(52,69,65,0.1)', borderStyle: 'solid', borderWidth: '1px 0' }}>
          <div className="section section--large" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', textAlign: 'center' }}>
            <div>
              <div className="h3">50-80</div>
              <div className="subtitle" style={{ fontSize: '10px' }}>Guest Capacity</div>
            </div>
            <div>
              <div className="h3">Packages</div>
              <div className="subtitle" style={{ fontSize: '10px' }}>Kitty (₹299-₹350) • Party (₹350-₹600)</div>
            </div>
            <div>
              <div className="h3">+91 9799788514</div>
              <div className="subtitle" style={{ fontSize: '10px' }}>Event Concierge (Ronak)</div>
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events" className="section-colorway-gray pv-large">
          <div className="section section--large">
            <div className="content" style={{ textAlign: 'center', marginBottom: 'var(--spacing-small)' }}>
              <h2 className="subtitle">Venues</h2>
              <h3 className="h2">Curated <em>Experiences</em></h3>
            </div>
            
            <div className="brutal-grid">
              
              {/* Event 1 */}
              <div className="brutal-card" data-scroll data-scroll-css-progress>
                <div className="brutal-card__line-h1"></div>
                <div className="brutal-card__line-v"></div>
                <div className="brutal-card__line-h2"></div>
                
                <div className="brutal-card__header">
                  <div className="brutal-card__no"><span>NO.</span>001</div>
                  <div className="brutal-card__badge">E</div>
                </div>
                
                <div className="brutal-card__main">
                  <div className="brutal-card__title">Royal<br/>Weddings</div>
                  <div className="brutal-card__desc">Transform your most cherished day into an unforgettable legend.</div>
                  
                  <div className="brutal-card__image" data-scroll data-scroll-speed="0.05">
                    <img src={IMG_WEDDING} alt="Royal Weddings" />
                  </div>
                  
                  <div className="brutal-card__vert">WEDDING</div>
                  <div className="brutal-card__brand">celebration.</div>
                </div>
                
                <div className="brutal-card__footer">
                  <span></span>
                  <span style={{textAlign: 'center', flex: 1}}>50-80 GUESTS</span>
                  <span></span>
                </div>
              </div>

              {/* Event 2 */}
              <div className="brutal-card" data-scroll data-scroll-css-progress>
                <div className="brutal-card__line-h1"></div>
                <div className="brutal-card__line-v"></div>
                <div className="brutal-card__line-h2"></div>
                
                <div className="brutal-card__header">
                  <div className="brutal-card__no"><span>NO.</span>004</div>
                  <div className="brutal-card__badge">E</div>
                </div>
                
                <div className="brutal-card__main">
                  <div className="brutal-card__title">Corporate<br/>Galas</div>
                  <div className="brutal-card__desc">Elevate your brand with events that leave an impression.</div>
                  
                  <div className="brutal-card__image" data-scroll data-scroll-speed="0.05">
                    <img src={IMG_CORPORATE} alt="Corporate Galas" />
                  </div>
                  
                  <div className="brutal-card__vert">CORPORATE</div>
                  <div className="brutal-card__brand">celebration.</div>
                </div>
                
                <div className="brutal-card__footer">
                  <span></span>
                  <span style={{textAlign: 'center', flex: 1}}>50-80 GUESTS</span>
                  <span></span>
                </div>
              </div>

              {/* Event 3 */}
              <div className="brutal-card" data-scroll data-scroll-css-progress>
                <div className="brutal-card__line-h1"></div>
                <div className="brutal-card__line-v"></div>
                <div className="brutal-card__line-h2"></div>
                
                <div className="brutal-card__header">
                  <div className="brutal-card__no"><span>NO.</span>007</div>
                  <div className="brutal-card__badge">E</div>
                </div>
                
                <div className="brutal-card__main">
                  <div className="brutal-card__title">Social<br/>Soirées</div>
                  <div className="brutal-card__desc">Birthdays, anniversaries, reunions — intimate or grand.</div>
                  
                  <div className="brutal-card__image" data-scroll data-scroll-speed="0.05">
                    <img src={IMG_TABLE} alt="Social Soirées" />
                  </div>
                  
                  <div className="brutal-card__vert">SOIREE</div>
                  <div className="brutal-card__brand">celebration.</div>
                </div>
                
                <div className="brutal-card__footer">
                  <span></span>
                  <span style={{textAlign: 'center', flex: 1}}>50-80 GUESTS</span>
                  <span></span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE BANQUET & KITTY PARTY MENUS SECTION */}
        <BanquetMenuSection onBookNow={onBookNow} />

        {/* IMAGE WITH TEXT: FLOOR PLAN / PLANNING */}
        <section className="section-image-with-text pv-large section-colorway-gray">
          <div className="img-w-txt img-w-txt--img-pair img-w-txt--align-left section section--large">
            <div className="img-w-txt__img">
              <picture>
                <img loading="lazy" className="img-full" src={IMG_HERO} alt="Banquet setup" />
              </picture>
              <div className="img-w-txt__img-secondary">
                <div data-scroll data-scroll-speed="0.15">
                  <img loading="lazy" className="img-full" src={IMG_CORPORATE} alt="Corporate setup" style={{ border: '8px solid #FAF7F2', borderRadius: '12px' }} />
                </div>
              </div>
            </div>

            <div className="img-w-txt__txt content parallax-opacity" data-scroll data-scroll-css-progress>
              <h2 className="subtitle">Banquet & Venue</h2>
              <h3>
                Krishna Sheesh Mahal <em>Banquet</em>
              </h3>
              <p>
                Our versatile banquet hall is the perfect venue for your next event. We offer comprehensive facilities including professional DJ, sound systems, and stunning decorations to bring your vision to life.
              </p>
              <ul style={{ marginBottom: '30px', marginTop: '20px', listStyleType: 'disc', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Capacity:</strong> 50 to 80 Guests</li>
                <li style={{ marginBottom: '10px' }}><strong>Kitty Party Packages:</strong> ₹299, ₹330, and ₹350 per guest</li>
                <li style={{ marginBottom: '10px' }}><strong>Grand Banquet Packages:</strong> ₹350, ₹450, and ₹600 (Unlimited Feast)</li>
                <li style={{ marginBottom: '10px' }}><strong>Facilities & Amenities:</strong> Central AC, DJ, Sound System, Royal Decoration & Live Kitchen</li>
                <li style={{ marginBottom: '10px' }}><strong>Banquet Concierge:</strong> Ronak (+91 9799788514) / Front (+91 8302903734)</li>
              </ul>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="tel:+919799788514" className="btn btn--regular btn--red">
                  Call Ronak
                </a>
                <a href="tel:+918302903734" className="btn btn--regular" style={{ background: '#FAF7F2', border: '1px solid var(--heading-color)', color: 'var(--heading-color)' }}>
                  Hotel Reception
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-colorway-gray pv-large text-center">
          <div className="section section--tiny">
            <h2 className="subtitle">Plan Your Event</h2>
            <h3 className="h2" style={{ marginBottom: 'var(--spacing-small)' }}>Your Grand Celebration <em>Awaits</em></h3>
            <button onClick={() => onBookNow?.("Banquet")} className="btn btn--regular btn--red" style={{ cursor: 'pointer' }}>Book Now</button>
          </div>
        </section>

      </div>
    </>
  );
}
