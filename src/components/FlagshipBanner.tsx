import { HERO_VIDEO, HERO_POSTER } from "../data";
import { LogoStacked } from "./Logos";

export default function FlagshipBanner() {
  return (
    <section className="flagship-banner section-colorway-black">
      <div className="flagship-banner__bg">
        <div className="flagship-banner__bg-inner" data-scroll data-scroll-speed="-0.25">
          <video autoPlay muted loop playsInline poster={HERO_POSTER}>
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>
      </div>
      
      <h1 className="flagship-banner__title h2" data-scroll data-scroll-speed="0.25">
        <em>Your Comfort Zone Begins With Us</em>
      </h1>

      <div className="flagship-banner__inner">
        <div className="flagship-banner__logo" data-scroll data-scroll-speed="0.5">
          <LogoStacked />
        </div>
        
        <div className="flagship-banner__txt-cols section section--large">
          <div className="flagship-banner__txt-col">
            <p>Experience the perfect blend of quality, luxury, and design in every room.</p>
          </div>
          <div className="flagship-banner__txt-col">
            <p>We guarantee to revamp your stay and cater to your unique taste and lifestyle.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
