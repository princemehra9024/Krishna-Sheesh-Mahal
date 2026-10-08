import { useEffect } from "react";
import { Link } from "react-router-dom";
import { scrollToTarget } from "../hooks/useScrollEngine";

/* ─── image paths ─── */
const IMG_HERO = "/images/banquet-2.jpg";
const IMG_WEDDING = "/images/banquet-1.jpg";
const IMG_CORPORATE = "/images/banquet-corporate-new.jpg";
const IMG_TABLE = "/images/banquet-3.jpg";

interface BanquetProps {
  onBookNow?: (type: string) => void;
}

import { useSEO } from "../hooks/useSEO";

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

          /* KITTY PARTY MENU STYLES */
          .kitty-menu-container {
            width: 100%;
            overflow-x: auto;
            margin-top: 40px;
            background-color: #f6f3eb; /* Creamy paper background */
            background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10zM0 10h10v10H0V10z' fill='%23ebe7dd' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          }
          
          .kitty-table {
            width: 100%;
            min-width: 900px;
            border-collapse: collapse;
          }
          
          .kitty-table th, .kitty-table td {
            padding: 15px 20px;
            border-bottom: 1px solid rgba(0,0,0,0.08);
            vertical-align: top;
            text-align: center;
          }
          
          .kitty-table tr:last-child td {
            border-bottom: none;
          }
          
          .kitty-table td.col-category {
            text-align: left;
            font-weight: 800;
            color: #2b1f17;
            font-size: 1.15rem;
            width: 20%;
            vertical-align: top;
            padding-top: 20px;
          }
          
          /* Header Styling */
          .kitty-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .kitty-badge {
            display: flex;
            align-items: stretch;
            margin-bottom: 25px;
            transform: scale(0.9);
          }
          
          .kitty-badge-text {
            background-color: #8c2633; /* deep maroon */
            color: #fff;
            font-weight: 800;
            font-size: 1.5rem;
            padding: 8px 20px;
            border-radius: 30px 0 0 30px;
            letter-spacing: 1px;
            box-shadow: 2px 4px 10px rgba(140, 38, 51, 0.2);
            font-family: "Inter", sans-serif;
          }
          
          .kitty-badge-no {
            background-color: #b73a43; /* lighter red */
            color: #fff;
            padding: 6px 15px;
            border-radius: 0 15px 15px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-weight: 800;
            font-size: 1.4rem;
            line-height: 1;
            box-shadow: 2px 4px 10px rgba(183, 58, 67, 0.2);
            font-family: "Inter", sans-serif;
          }
          
          .kitty-badge-no span {
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: -2px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          
          .kitty-price {
            background-color: #1a1a1a;
            color: #e2b761; /* dull gold */
            font-family: "Georgia", serif;
            font-size: 1.8rem;
            font-weight: bold;
            padding: 6px 30px;
            border-radius: 255px 15px 225px 15px/15px 225px 15px 255px; /* organic brush shape */
            transform: rotate(-2deg);
            box-shadow: 2px 5px 12px rgba(0,0,0,0.3);
            display: inline-block;
          }
          
          .kitty-price span {
            font-family: sans-serif;
            margin-right: 2px;
          }

          /* Content Styling */
          .kitty-item-line {
            font-size: 1.05rem;
            color: #111;
            font-weight: 500;
            line-height: 1.4;
            margin-bottom: 4px;
          }
          
          .kitty-item-any2 {
            font-size: 0.9rem;
            color: #444;
            font-weight: 500;
            margin-top: 6px;
            font-style: italic;
          }
          
          .kitty-dash {
            color: #222;
            font-weight: 700;
          }
          
          .kitty-footer {
            text-align: left;
            font-weight: 700;
            font-size: 1.1rem;
            color: #111;
            padding-top: 20px;
            padding-bottom: 10px;
          }
          
          .kitty-footer span {
            display: inline-block;
            width: 150px;
            border-bottom: 1px dashed #333;
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
              <div className="h3">50-80</div>
              <div className="subtitle" style={{ fontSize: '10px' }}>Guest Capacity</div>
            </div>
            <div>
              <div className="h3">Packages</div>
              <div className="subtitle" style={{ fontSize: '10px' }}>₹350, ₹450, ₹600</div>
            </div>
            <div>
              <div className="h3">+91 8690393734</div>
              <div className="subtitle" style={{ fontSize: '10px' }}>Booking Contact</div>
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

        {/* KITTY PARTY MENUS SECTION */}
        <section className="section-colorway-gray pv-large">
          <div className="section section--large">
            <div className="content" style={{ textAlign: 'center', marginBottom: 'var(--spacing-small)' }}>
              <h2 className="subtitle">Pricing & Menus</h2>
              <h3 className="h2">Kitty Party <em>Packages</em></h3>
              <p style={{ maxWidth: '600px', margin: '0 auto' }}>Host an unforgettable Kitty Party with our specially curated menus. Choose the perfect spread for your celebration.</p>
            </div>

            <div className="kitty-menu-container" data-scroll data-scroll-css-progress style={{ opacity: 'max(min((var(--progress, 1) - 0.2) * 3, 1), 0)', transform: 'translateY(calc((1 - var(--progress, 1)) * 50px))' }}>
              <table className="kitty-table">
                <thead>
                  <tr>
                    <th className="col-category"></th>
                    <th>
                      <div className="kitty-header">
                        <div className="kitty-badge">
                          <div className="kitty-badge-text">KITTY PARTY</div>
                          <div className="kitty-badge-no"><span>Menu</span>01</div>
                        </div>
                        <div className="kitty-price">
                          <span>₹</span> 299/-
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="kitty-header">
                        <div className="kitty-badge">
                          <div className="kitty-badge-text">KITTY PARTY</div>
                          <div className="kitty-badge-no"><span>Menu</span>02</div>
                        </div>
                        <div className="kitty-price">
                          <span>₹</span> 330/-
                        </div>
                      </div>
                    </th>
                    <th>
                      <div className="kitty-header">
                        <div className="kitty-badge">
                          <div className="kitty-badge-text">KITTY PARTY</div>
                          <div className="kitty-badge-no"><span>Menu</span>03</div>
                        </div>
                        <div className="kitty-price">
                          <span>₹</span> 350/-
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-category">Welcome Drink</td>
                    <td>
                      <div className="kitty-item-line">Tea / Coffee / Soup</div>
                    </td>
                    <td>
                      <div className="kitty-item-line">Tea / Coffee / Soup</div>
                    </td>
                    <td>
                      <div className="kitty-item-line">Tea / Coffee / Soup</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="col-category">Starter</td>
                    <td>
                      <div className="kitty-item-line">Spring Roll-2pc, Harabara</div>
                      <div className="kitty-item-line">kabab-2Pc / Veg Pakoda /</div>
                      <div className="kitty-item-line">Crispi Corn / Honey Chilli Potato</div>
                      <div className="kitty-item-any2">any 2</div>
                    </td>
                    <td>
                      <div className="kitty-item-line">Spring Roll-2pc, Harabara</div>
                      <div className="kitty-item-line">kabab-2Pc / Veg Pakoda /</div>
                      <div className="kitty-item-line">Crispi Corn / Honey Chilli Potato</div>
                      <div className="kitty-item-any2">any 2</div>
                    </td>
                    <td>
                      <div className="kitty-item-line">Spring Roll-2pc, Harabara</div>
                      <div className="kitty-item-line">kabab-2Pc / Veg Pakoda /</div>
                      <div className="kitty-item-line">Crispi Corn / Honey Chilli Potato</div>
                      <div className="kitty-item-any2">any 2</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="col-category">Main Course</td>
                    <td>
                      <div className="kitty-item-line">Mix Dal, Kadi</div>
                      <div className="kitty-item-line">2 Bati</div>
                      <div className="kitty-item-line">Churma <span style={{fontSize: '0.85em'}}>(Desi ghee)</span></div>
                      <div className="kitty-item-line">Pulao</div>
                      <div className="kitty-item-line">Lehsun Ki Chutney</div>
                    </td>
                    <td>
                      <div className="kitty-item-line">Chola Bhatura</div>
                      <div className="kitty-item-line">Pav Bhaji</div>
                      <div className="kitty-item-line">Masala Dosa</div>
                    </td>
                    <td>
                      <div className="kitty-item-line">Paneer Veg</div>
                      <div className="kitty-item-line">Mix Veg</div>
                      <div className="kitty-item-line">Dal Tadka</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="col-category">Salad</td>
                    <td><div className="kitty-item-line">Onion Salad</div></td>
                    <td><div className="kitty-item-line">Onion Salad</div></td>
                    <td><div className="kitty-item-line">Green Salad</div></td>
                  </tr>
                  <tr>
                    <td className="col-category">Curd Preparation</td>
                    <td><div className="kitty-item-line">Chhachh</div></td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><div className="kitty-item-line">Boondi Raita</div></td>
                  </tr>
                  <tr>
                    <td className="col-category">Rice Preparation</td>
                    <td><div className="kitty-item-line">Pulao</div></td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><div className="kitty-item-line">Veg Pulao</div></td>
                  </tr>
                  <tr>
                    <td className="col-category">Indian Bread</td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><div className="kitty-item-line">Butter Roti / Lachha</div></td>
                  </tr>
                  <tr>
                    <td className="col-category">Accompaniments</td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><div className="kitty-item-line">Achar, Papad, Chutney</div></td>
                  </tr>
                  <tr>
                    <td className="col-category">Desert</td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><div className="kitty-item-line">Gulab Jamun</div></td>
                    <td><div className="kitty-item-line">Gulab Jamun</div></td>
                  </tr>
                  <tr>
                    <td className="col-category">Ice Cream</td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><span className="kitty-dash">-</span></td>
                  </tr>
                  <tr>
                    <td className="col-category">Premium Desert</td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><span className="kitty-dash">-</span></td>
                  </tr>
                  <tr>
                    <td className="col-category">Mouth Freshner</td>
                    <td><span className="kitty-dash">-</span></td>
                    <td><div className="kitty-item-line">Pan Shot <span style={{fontSize: '0.85em'}}>(one time)</span></div></td>
                    <td><div className="kitty-item-line">Pan Shot <span style={{fontSize: '0.85em'}}>(one time)</span></div></td>
                  </tr>
                  <tr style={{borderBottom: 'none'}}>
                    <td colSpan={4}>
                      <div className="kitty-footer">
                        Additional Item Charge Extra: <span></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
              <h2 className="subtitle">Banquet & Venue</h2>
              <h3>
                Krishna Sheesh Mahal <em>Banquet</em>
              </h3>
              <p>
                Our versatile banquet hall is the perfect venue for your next event. We offer comprehensive facilities including professional DJ, sound systems, and stunning decorations to bring your vision to life.
              </p>
              <ul style={{ marginBottom: '30px', marginTop: '20px', listStyleType: 'disc', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Capacity:</strong> 50 to 80 Guests</li>
                <li style={{ marginBottom: '10px' }}><strong>Packages:</strong> ₹350, ₹450, and ₹600</li>
                <li style={{ marginBottom: '10px' }}><strong>Facilities & Amenities:</strong> DJ, Sound System, Decoration</li>
                <li style={{ marginBottom: '10px' }}><strong>Booking Contact:</strong> +91 8690393734</li>
              </ul>
              <a href="tel:+918690393734" className="btn btn--regular">
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-colorway-gray pv-large text-center">
          <div className="section section--tiny">
            <h2 className="subtitle">Plan Your Event</h2>
            <h3 className="h2" style={{ marginBottom: 'var(--spacing-small)' }}>Your Grand Celebration <em>Awaits</em></h3>
            <button onClick={() => onBookNow?.("Banquet")} className="btn btn--regular" style={{ background: 'transparent', border: '1px solid var(--heading-color)', color: 'var(--heading-color)', cursor: 'pointer' }}>Book Now</button>
          </div>
        </section>

      </div>
    </>
  );
}
