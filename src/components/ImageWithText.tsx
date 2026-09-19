import { ABOUT_IMAGES } from "../data";
import { scrollToTarget } from "../hooks/useScrollEngine";

export default function ImageWithText() {
  return (
    <section id="about" className="section-image-with-text pv-large section-colorway-gray">
      <div className="img-w-txt img-w-txt--img-pair img-w-txt--align-left section section--large">
        <div className="img-w-txt__img">
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
            Get your trip off to a great start with a stay at this property, which offers free Wi-Fi in all rooms. Conveniently situated in the Rama Krishna Puram part of Kota, this property puts you close to attractions and interesting dining options. This 4.0-star property features a restaurant to make your stay more indulgent and memorable.
          </p>
          <a
            href="#rooms"
            className="btn btn--regular"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#rooms", -70);
            }}
          >
            Explore Rooms
          </a>
        </div>
      </div>
    </section>
  );
}
