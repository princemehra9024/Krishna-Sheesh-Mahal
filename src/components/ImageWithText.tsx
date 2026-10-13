import { ABOUT_IMAGES } from "../data";

export default function ImageWithText() {
  return (
    <section id="about" className="section-image-with-text compact-frame section-colorway-gray">
      <style>{`
        .section-image-with-text.compact-frame {
          padding: clamp(35px, 5vh, 55px) 0 !important;
          min-height: auto;
        }
        .section-image-with-text.compact-frame .img-w-txt {
          align-items: center;
        }
        .section-image-with-text.compact-frame .img-w-txt__img {
          max-width: 470px;
        }
        .section-image-with-text.compact-frame .img-w-txt__img picture img {
          max-height: clamp(350px, 58vh, 470px);
          width: 100%;
          object-fit: cover;
          border-radius: 14px;
          box-shadow: 0 20px 45px rgba(0,0,0,0.12);
        }
        .section-image-with-text.compact-frame .img-w-txt__img-secondary {
          top: 48%;
          right: -15px;
        }
        .section-image-with-text.compact-frame .img-w-txt__img-secondary img {
          max-height: clamp(170px, 30vh, 230px);
          width: auto;
          object-fit: cover;
          border-radius: 10px;
          border: 4px solid #fff;
          box-shadow: 0 15px 35px rgba(0,0,0,0.18);
        }
        .section-image-with-text.compact-frame .img-w-txt__txt {
          padding-left: clamp(15px, 2.5vw, 40px);
        }
        .section-image-with-text.compact-frame .img-w-txt__txt h2.subtitle {
          margin-bottom: 6px;
        }
        .section-image-with-text.compact-frame .img-w-txt__txt h3 {
          font-size: clamp(2rem, 3.2vw, 2.85rem);
          line-height: 1.15;
          margin-bottom: 12px;
        }
        .section-image-with-text.compact-frame .img-w-txt__txt p {
          font-size: clamp(0.92rem, 1.05vw, 1.02rem);
          line-height: 1.5;
          margin-bottom: 14px;
        }
      `}</style>
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
              alt="Hotel Krishna Sheesh Mahal Exterior"
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
                alt="Krishna Sheesh Mahal Reception Lobby"
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
          
          <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 22px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", fontSize: "0.92rem" }}>
            <li style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#712135" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px", flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Free Wi-Fi in all rooms
            </li>
            <li style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#712135" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px", flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              4.0-Star Property
            </li>
            <li style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#712135" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px", flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              In-house Restaurant
            </li>
            <li style={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#712135" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px", flexShrink: 0 }}>
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
