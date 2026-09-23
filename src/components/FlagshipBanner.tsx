import { HERO_VIDEO, HERO_POSTER } from "../data";


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
        <em>Your Comfort, Our Priority</em>
      </h1>

      <div className="flagship-banner__inner">
        <div className="flagship-banner__logo" data-scroll data-scroll-speed="0.5">
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: '1.1', fontWeight: 400, fontFamily: 'var(--font-2)', color: '#fff', letterSpacing: '0.05em', textAlign: 'center', textTransform: 'uppercase', margin: 0 }}>Krishna<br/>Sheesh<br/>Mahal</h1>
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
