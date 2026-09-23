import { Wifi, Car, Utensils, Clock, Wind, Coffee } from 'lucide-react';

const amenitiesData = [
  { icon: Wifi, title: "High-Speed Wi-Fi", description: "Seamless connectivity throughout the entire property." },
  { icon: Car, title: "Valet Parking", description: "Complimentary secure parking and valet service." },
  { icon: Utensils, title: "In-House Restaurant", description: "Award-winning local and multi-cuisine dining." },
  { icon: Clock, title: "24/7 Concierge", description: "Round-the-clock service for your every need." },
  { icon: Wind, title: "Climate Control", description: "Personalized comfort in every suite." },
  { icon: Coffee, title: "In-Room Dining", description: "Exquisite meals delivered to your door." }
];

export default function Amenities() {
  return (
    <>
      <style>{`
        @keyframes floatWatermark {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(15px, -10px) rotate(1deg);
          }
        }
        
        @keyframes outlinePulse {
          0%, 100% {
            opacity: 0.3;
            filter: drop-shadow(0 0 0 rgba(94, 32, 45, 0));
          }
          50% {
            opacity: 0.6;
            filter: drop-shadow(0 0 8px rgba(94, 32, 45, 0.4));
          }
        }

        .amenities-section {
          background-color: var(--cream, #F3EDE4);
          padding: 120px 0;
          overflow: hidden;
          position: relative;
        }
        
        .amenities-container {
          width: 90%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }
        
        @media (min-width: 1024px) {
          .amenities-container {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        
        .amenities-header {
          flex: 0 0 42%;
          position: sticky;
          top: 140px;
          align-self: flex-start;
          padding: 40px 40px 40px 30px;
          transition: transform 0.4s ease;
        }
        
        .amenities-header:hover {
          transform: translateY(-5px);
        }
        
        .amenities-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 35%;
          height: 45%;
          border-top: 2px solid var(--maroon, #5E202D);
          border-left: 2px solid var(--maroon, #5E202D);
          opacity: 0.3;
          pointer-events: none;
          transition: width 0.5s ease, height 0.5s ease, opacity 0.5s ease;
          border-top-left-radius: 4px;
          animation: outlinePulse 5s ease-in-out infinite;
        }
        
        .amenities-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 20px;
          width: 35%;
          height: 45%;
          border-bottom: 2px solid var(--maroon, #5E202D);
          border-right: 2px solid var(--maroon, #5E202D);
          opacity: 0.3;
          pointer-events: none;
          transition: width 0.5s ease, height 0.5s ease, opacity 0.5s ease;
          border-bottom-right-radius: 4px;
          animation: outlinePulse 5s ease-in-out infinite;
          animation-delay: 2.5s;
        }
        
        .amenities-header:hover::before,
        .amenities-header:hover::after {
          width: 45%;
          height: 55%;
          opacity: 0.8 !important;
          animation-play-state: paused;
        }
        
        .amenities-eyebrow {
          font-family: var(--font-1, sans-serif);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--maroon, #5E202D);
          margin-bottom: 24px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .amenities-eyebrow::before {
          content: '';
          width: 40px;
          height: 1px;
          background: var(--maroon, #5E202D);
        }
        
        .amenities-title {
          font-family: var(--font-2, serif);
          font-size: clamp(3.5rem, 6vw, 5.5rem);
          line-height: 1.05;
          margin-bottom: 24px;
          color: var(--charcoal, #251C19);
        }
        
        .amenities-title em {
          font-family: var(--font-3, serif);
          font-style: italic;
          font-weight: 300;
          color: var(--maroon, #5E202D);
          display: block;
          margin-top: 5px;
        }
        
        .amenities-desc {
          font-family: var(--font-1, sans-serif);
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--body-gray, #635C56);
          max-width: 450px;
          margin-bottom: 40px;
        }
        
        .amenities-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--charcoal, #251C19);
          font-family: var(--font-1, sans-serif);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-bottom: 2px solid var(--charcoal, #251C19);
          padding-bottom: 6px;
          transition: opacity 0.3s, transform 0.3s;
          text-decoration: none;
        }
        
        .amenities-btn:hover {
          opacity: 0.6;
          transform: translateX(5px);
        }
        
        .amenities-watermark {
          position: absolute;
          top: -30px;
          left: -20px;
          font-family: var(--font-2, serif);
          font-size: 14rem;
          color: rgba(37, 28, 25, 0.03);
          z-index: -1;
          pointer-events: none;
          text-transform: uppercase;
          white-space: nowrap;
          letter-spacing: -0.02em;
          animation: floatWatermark 10s ease-in-out infinite;
        }
        
        @media (max-width: 1023px) {
          .amenities-header {
            position: relative;
            top: auto;
          }
          .amenities-watermark {
            font-size: 8rem;
          }
        }
        
        .amenities-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          border-top: 1px solid rgba(37, 28, 25, 0.1);
        }
        
        @media (min-width: 768px) {
          .amenities-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .amenity-item {
          padding: 40px 30px;
          border-bottom: 1px solid rgba(37, 28, 25, 0.1);
          border-right: 1px solid rgba(37, 28, 25, 0.1);
          transition: background-color 0.4s ease, transform 0.4s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: transparent;
        }
        
        @media (min-width: 768px) {
          .amenity-item:nth-child(even) {
            border-right: none;
          }
        }
        @media (max-width: 767px) {
          .amenity-item {
            border-right: none;
          }
        }
        
        .amenity-item:hover {
          background-color: #ffffff;
        }
        
        .amenity-icon-wrap {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.04);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.4s ease, box-shadow 0.4s ease;
        }
        
        .amenity-item:hover .amenity-icon-wrap {
          transform: translateY(-5px) scale(1.1);
          background: var(--maroon, #5E202D);
          box-shadow: 0 10px 25px rgba(94, 32, 45, 0.2);
        }
        
        .amenity-icon-wrap svg {
          color: var(--maroon, #5E202D);
          transition: color 0.4s ease;
        }
        
        .amenity-item:hover .amenity-icon-wrap svg {
          color: #ffffff;
        }
        
        .amenity-item-title {
          font-family: var(--font-2, serif);
          font-size: 1.75rem;
          margin-bottom: 12px;
          letter-spacing: 0.02em;
          color: var(--charcoal, #251C19);
        }
        
        .amenity-item-desc {
          font-family: var(--font-1, sans-serif);
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--body-gray, #635C56);
        }
      `}</style>

      <section className="amenities-section" id="amenities">
        <div className="amenities-container">
          
          <div className="amenities-header">
            <div className="amenities-watermark">Features</div>
            <p className="amenities-eyebrow">Our Amenities</p>
            <h2 className="amenities-title">
              Curated for
              <em>Excellence</em>
            </h2>
            <p className="amenities-desc">
              Experience unparalleled comfort and world-class service. Every detail of your stay has been thoughtfully designed to exceed your expectations.
            </p>
            <a href="/rooms" className="amenities-btn">
              Explore Suites
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>

          <div className="amenities-grid">
            {amenitiesData.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="amenity-item" data-scroll data-scroll-offset="20%">
                  <div className="amenity-icon-wrap">
                    <Icon strokeWidth={1.5} size={26} />
                  </div>
                  <h3 className="amenity-item-title">{amenity.title}</h3>
                  <p className="amenity-item-desc">{amenity.description}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
