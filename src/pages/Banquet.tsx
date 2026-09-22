import { useEffect } from "react";
import { Link } from "react-router-dom";
import { scrollToTarget } from "../hooks/useScrollEngine";

/* ─── image paths ─── */
const IMG_HERO = "/images/banquet-2.jpg";
const IMG_WEDDING = "/images/banquet-1.jpg";
const IMG_CORPORATE = "/images/banquet-corporate-new.jpg";
const IMG_TABLE = "/images/banquet-3.jpg";

export default function Banquet() {
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
            border: 8px solid #fff;
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
            border: 12px solid #f5f2ef;
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
            background: #fff;
            padding: var(--spacing-small);
            border: 1px solid rgba(52,69,65,0.1);
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

          /* Packages - Premium Redesign */
          .pkg-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 40px;
          }
          @media (max-width: 900px) {
            .pkg-grid { grid-template-columns: 1fr; }
          }
          .pkg-card {
            background: #fff;
            padding: 40px 30px;
            border: 1px solid rgba(0,0,0,0.08);
            border-radius: 12px;
            position: relative;
            display: flex;
            flex-direction: column;
            transition: box-shadow 0.4s ease, border-color 0.4s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.02);
            text-align: left;
            
            /* Scroll animation */
            opacity: max(min((var(--progress, 1) - 0.2) * 3, 1), 0);
            transform: scale(calc(0.9 + (var(--progress, 1) * 0.1))) translateY(calc((1 - var(--progress, 1)) * 50px));
          }
          .pkg-card:hover {
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
            border-color: rgba(0,0,0,0.15);
          }
          .pkg-card--premium {
            background: linear-gradient(145deg, var(--maroon) 0%, #300f16 100%);
            color: #fff;
            border: 1px solid var(--gold);
            box-shadow: 0 15px 40px rgba(90, 31, 43, 0.2);
            z-index: 2;
            
            /* Enhanced scale for premium */
            transform: scale(calc(0.95 + (var(--progress, 1) * 0.1))) translateY(calc((1 - var(--progress, 1)) * 50px));
          }
          @media (max-width: 900px) {
            .pkg-card--premium {
               transform: scale(calc(0.9 + (var(--progress, 1) * 0.1))) translateY(calc((1 - var(--progress, 1)) * 50px));
            }
          }
          .pkg-card--premium:hover {
            box-shadow: 0 25px 50px rgba(90, 31, 43, 0.3), 0 0 40px rgba(197, 157, 58, 0.15);
            border-color: var(--gold);
          }
          .pkg-card--premium h3, .pkg-card--premium h4, .pkg-card--premium p, .pkg-card--premium li, .pkg-card--premium .pkg-card__price {
            color: #fff;
          }
          @keyframes goldGlow {
            0% { box-shadow: 0 0 5px rgba(197,157,58,0.2); }
            50% { box-shadow: 0 0 20px rgba(197,157,58,0.6); }
            100% { box-shadow: 0 0 5px rgba(197,157,58,0.2); }
          }
          .pkg-card__badge {
            position: absolute;
            top: -16px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--gold);
            color: #fff;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            padding: 8px 20px;
            font-weight: bold;
            border-radius: 30px;
            animation: goldGlow 2s infinite;
          }
          .pkg-card__price {
            font-size: 3rem;
            font-family: var(--font-2);
            margin: 20px 0;
            line-height: 1;
            color: var(--heading-color);
          }
          .pkg-card__price span {
            font-size: 1rem;
            font-family: var(--font-1);
            opacity: 0.6;
            font-weight: normal;
          }
          .pkg-list {
            margin-bottom: 30px;
            flex-grow: 1;
            padding: 0;
            list-style: none;
            font-size: 15px;
            line-height: 1.6;
          }
          .pkg-list li {
            position: relative;
            padding-left: 28px;
            margin-bottom: 15px;
            opacity: 0.85;
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .pkg-list li:hover {
            transform: translateX(5px);
            color: #000;
          }
          .pkg-card--premium .pkg-list li:hover {
            color: #fff;
          }
          .pkg-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            top: 0;
            font-size: 14px;
            color: var(--heading-color);
            font-weight: bold;
          }
          .pkg-card--premium .pkg-list li::before {
            color: var(--neon);
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
              <a href="#events" className="btn btn--regular" onClick={(e) => { e.preventDefault(); scrollToTarget(document.querySelector('#events'), -70); }}>
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
              <div className="h3">500+</div>
              <div className="subtitle" style={{ fontSize: '10px' }}>Guest Capacity</div>
            </div>
            <div>
              <div className="h3">8,000</div>
              <div className="subtitle" style={{ fontSize: '10px' }}>Sq.Ft Space</div>
            </div>
            <div>
              <div className="h3">1,200+</div>
              <div className="subtitle" style={{ fontSize: '10px' }}>Events Hosted</div>
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
                  <span style={{textAlign: 'center', flex: 1}}>500 GUESTS</span>
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
                  <span style={{textAlign: 'center', flex: 1}}>300 GUESTS</span>
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
                  <span style={{textAlign: 'center', flex: 1}}>50-200 GUESTS</span>
                  <span></span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PACKAGES SECTION */}
        <section className="section-colorway-gray pv-large">
          <div className="section section--large">
            <div className="content" style={{ textAlign: 'center', marginBottom: 'var(--spacing-small)' }}>
              <h2 className="subtitle">Pricing</h2>
              <h3 className="h2">Tailored <em>Packages</em></h3>
              <p style={{ maxWidth: '600px', margin: '0 auto' }}>Every celebration deserves a bespoke experience. Choose a package crafted to perfection.</p>
            </div>

            <div className="pkg-grid">
              {/* Silver */}
              <div className="pkg-card" data-scroll data-scroll-css-progress>
                <h4 className="subtitle">Classic</h4>
                <div className="pkg-card__price">₹850<span style={{ fontSize: '1rem', fontFamily: 'var(--font-1)' }}> / plate</span></div>
                <ul className="pkg-list">
                  <li>Welcome Beverages</li>
                  <li>3-Course Dinner</li>
                  <li>Basic Floral Décor</li>
                  <li>PA System</li>
                  <li>Standard Seating</li>
                </ul>
                <button className="btn btn--regular btn--full">Inquire Now</button>
              </div>

              {/* Signature */}
              <div className="pkg-card pkg-card--premium" data-scroll data-scroll-css-progress>
                <div className="pkg-card__badge">Most Popular</div>
                <h4 className="subtitle" style={{ color: 'var(--gold)' }}>Signature</h4>
                <div className="pkg-card__price">₹1,400<span style={{ fontSize: '1rem', fontFamily: 'var(--font-1)' }}> / plate</span></div>
                <ul className="pkg-list">
                  <li>Premium Welcome Drinks</li>
                  <li>5-Course Gourmet Dinner</li>
                  <li>Premium Floral Décor</li>
                  <li>Full AV System</li>
                  <li>Luxury Seating</li>
                  <li>Dedicated Event Manager</li>
                </ul>
                <button className="btn btn--white btn--full">Select Signature</button>
              </div>

              {/* Platinum */}
              <div className="pkg-card" data-scroll data-scroll-css-progress>
                <h4 className="subtitle">Bespoke</h4>
                <div className="pkg-card__price">Custom</div>
                <ul className="pkg-list">
                  <li>All Signature Perks</li>
                  <li>Unlimited Beverages</li>
                  <li>Celebrity Chef Menu</li>
                  <li>3D Floral & Light Art</li>
                  <li>Live Entertainment</li>
                  <li>Valet Parking</li>
                </ul>
                <button className="btn btn--regular btn--full">Contact Us</button>
              </div>
            </div>
          </div>
        </section>

        {/* IMAGE WITH TEXT: FLOOR PLAN / PLANNING */}
        <section className="section-image-with-text pv-large section-colorway-gray">
          <div className="img-w-txt img-w-txt--img-pair img-w-txt--align-left section section--large">
            <div className="img-w-txt__img">
              <picture>
                <img loading="lazy" className="img-full" src={IMG_HERO} alt="Banquet setup" />
              </picture>
              <div className="img-w-txt__img-secondary">
                <div data-scroll data-scroll-speed="0.15">
                  <img loading="lazy" className="img-full" src={IMG_CORPORATE} alt="Corporate setup" style={{ border: '8px solid #fff' }} />
                </div>
              </div>
            </div>

            <div className="img-w-txt__txt content parallax-opacity" data-scroll data-scroll-css-progress>
              <h2 className="subtitle">The Space</h2>
              <h3>
                Infinite <em>Configurations</em>
              </h3>
              <p>
                Our versatile hall adapts to your vision — Theatre style, Banquet rounds, U-shape, or a combination. Our spatial designers work hand-in-hand with you weeks before the event to ensure every detail is meticulously planned.
              </p>
              <ul style={{ marginBottom: '30px', marginTop: '20px', listStyleType: 'disc', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Theatre:</strong> Up to 500 Guests</li>
                <li style={{ marginBottom: '10px' }}><strong>Banquet Rounds:</strong> Up to 350 Guests</li>
                <li style={{ marginBottom: '10px' }}><strong>U-Shape:</strong> Up to 120 Guests</li>
              </ul>
              <Link to="/contact" className="btn btn--regular">
                Download Floor Plan
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-colorway-gray pv-large text-center">
          <div className="section section--tiny">
            <h2 className="subtitle">Plan Your Event</h2>
            <h3 className="h2" style={{ marginBottom: 'var(--spacing-small)' }}>Your Grand Celebration <em>Awaits</em></h3>
            <Link to="/contact" className="btn btn--regular">Book a Site Visit</Link>
          </div>
        </section>

      </div>
    </>
  );
}
