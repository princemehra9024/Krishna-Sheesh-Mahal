import { ABOUT_IMAGES } from "../data";
import { scrollToTarget } from "../hooks/useScrollEngine";

export default function ImageWithText() {
  return (
    <section id="about" className="section-image-with-text pv-large section-colorway-gray">
      <div className="img-w-txt img-w-txt--img-pair img-w-txt--align-left section section--large">
        <div className="img-w-txt__img reveal">
          <picture>
            <img
              loading="lazy"
              className="img-full"
              width={655}
              height={862}
              src={ABOUT_IMAGES.primary}
              srcSet={`${ABOUT_IMAGES.primary} 1x, ${ABOUT_IMAGES.primary2x} 2x`}
              alt="The Pop-Up Hotel tent interior"
            />
          </picture>
          <div className="img-w-txt__img-secondary">
            <div data-scroll data-scroll-speed="0.15">
              <img
                loading="lazy"
                className="img-full"
                width={385}
                height={506}
                src={ABOUT_IMAGES.secondary}
                srcSet={`${ABOUT_IMAGES.secondary} 1x, ${ABOUT_IMAGES.secondary2x} 2x`}
                alt="Guests at The Pop-Up Hotel"
              />
            </div>
          </div>
        </div>

        <div className="img-w-txt__txt content parallax-opacity" data-scroll data-scroll-css-progress>
          <h2 className="subtitle">About Us</h2>
          <h3>
            Your <em>Stress-Free</em> Stay Awaits
          </h3>
          <p>
            Get your trip off to a great start with a stay at our property, thoughtfully designed to offer you the best amenities and a prime location in Kota.
          </p>
          
          <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", fontSize: "0.95rem" }}>
            <li style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#712135" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "10px", flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Free Wi-Fi in all rooms
            </li>
            <li style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#712135" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "10px", flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              4.0-Star Property
            </li>
            <li style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#712135" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "10px", flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              In-house Restaurant
            </li>
            <li style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#712135" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "10px", flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Near City Attractions
            </li>
          </ul>
          <a
            href="/rooms"
            className="btn btn--regular"
          >
            Explore Rooms
          </a>
        </div>
      </div>
    </section>
  );
}
