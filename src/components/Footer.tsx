import { useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FOOTER_AVATAR, FOOTER_MENUS } from "../data";
import { LogoHorizontal } from "./Logos";
import { scrollToTarget } from "../hooks/useScrollEngine";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const navigateRouter = useNavigate();
  const location = useLocation();
  const isRestaurant = location.pathname === "/restaurant";

  const menus = FOOTER_MENUS.map(menu => {
    if (isRestaurant && menu.title === "Rooms") {
      return {
        title: "Restaurant",
        items: [
          { label: "Menu", href: "#restaurant-hero" },
          { label: "Reserve", href: "#footer" },
          { label: "Timings", href: "#footer" },
        ]
      };
    }
    if (menu.title === "Connect") {
      return {
        ...menu,
        items: [
          ...menu.items,
          { label: "WhatsApp", href: "https://api.whatsapp.com/send/?phone=%2B919024546041", external: true },
          { label: "Phone", href: "tel:+919024546041", external: true },
          { label: "Location", href: "https://maps.google.com/?q=Krishna+Sheesh+Mahal,+Kota", external: true },
        ]
      };
    }
    return menu;
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) return;
    e.preventDefault();
    if (href.startsWith("/")) {
      navigateRouter(href);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10);
    } else {
      scrollToTarget(href, -70);
    }
  };

  return (
    <div className="page-wrap" id="footer">
      <footer className="footer pt-medium pb-small premium-footer">
        <style>{`
          .premium-footer { position: relative; overflow: hidden; background-color: #1A1311; color: #FFF2DF; font-family: var(--font-1, sans-serif); border-top: 1px solid rgba(255, 215, 140, 0.1); }
          .premium-footer-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(243, 237, 228, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(243, 237, 228, 0.03) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; z-index: 0; }
          .premium-footer-bg::after { content: ''; position: absolute; bottom: -50%; left: 50%; transform: translateX(-50%); width: 150vw; height: 100vw; max-width: 1600px; max-height: 1600px; background: radial-gradient(circle, rgba(94, 32, 45, 0.5) 0%, rgba(200, 150, 100, 0.15) 30%, transparent 60%); border-radius: 50%; filter: blur(100px); animation: footerPulseGlow 10s ease-in-out infinite alternate; pointer-events: none; }
          @keyframes footerPulseGlow { 0% { opacity: 0.5; transform: translateX(-50%) scale(0.9); } 100% { opacity: 1; transform: translateX(-50%) scale(1.1); } }
          
          .footer-input::placeholder { color: rgba(255, 242, 223, 0.5) !important; opacity: 1 !important; }
          
          .premium-avatar-wrap { width: 80px; height: 80px; border-radius: 50%; padding: 4px; background: linear-gradient(135deg, rgba(255, 215, 140, 0.8), rgba(94, 32, 45, 0.8)); box-shadow: 0 0 20px rgba(255, 215, 140, 0.4); animation: avatarBreathe 4s infinite alternate; transition: transform 0.4s; }
          .premium-avatar-wrap:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 0 40px rgba(255, 215, 140, 0.8); }
          .premium-avatar-inner { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; border: 2px solid #1A1311; }
          @keyframes avatarBreathe { 0% { box-shadow: 0 0 15px rgba(255, 215, 140, 0.3); } 100% { box-shadow: 0 0 30px rgba(255, 215, 140, 0.6); } }
          
          .premium-btn { border-radius: 50px; padding: 14px 32px; font-weight: 700; background: linear-gradient(90deg, rgba(255, 215, 140, 0.1), rgba(255, 215, 140, 0.2)); color: #FFF2DF; border: 1px solid rgba(255, 215, 140, 0.4); backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 10px rgba(255, 215, 140, 0.1); transition: all 0.4s ease; text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px; }
          .premium-btn:hover { background: rgba(255, 215, 140, 0.2); border-color: rgba(255, 215, 140, 0.8); transform: translateY(-4px); box-shadow: 0 15px 40px rgba(94, 32, 45, 0.5), 0 0 25px rgba(255, 215, 140, 0.4); color: #FFF; }
          
          .premium-menu-link { text-decoration: none; color: rgba(255, 242, 223, 0.7); position: relative; padding-bottom: 4px; transition: color 0.3s ease; font-weight: 500; font-size: 15px; }
          .premium-menu-link::after { content: ''; position: absolute; left: 0; bottom: 0; width: 0; height: 1px; background: rgba(255, 215, 140, 0.8); transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1); box-shadow: 0 0 8px rgba(255, 215, 140, 0.8); }
          .premium-menu-link:hover { color: #FFF2DF; }
          .premium-menu-link:hover::after { width: 100%; }
          
          .premium-input-wrap { display: flex; background: rgba(30, 22, 20, 0.5); backdrop-filter: blur(15px); border: 1px solid rgba(255, 215, 140, 0.25); border-radius: 50px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 0 15px rgba(255, 215, 140, 0.05); transition: border-color 0.3s, box-shadow 0.3s; }
          .premium-input-wrap:focus-within { border-color: rgba(255, 215, 140, 0.6); box-shadow: 0 15px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(255, 215, 140, 0.15), 0 0 20px rgba(255, 215, 140, 0.2); }
          
          .premium-subscribe-btn { padding: 0 30px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; font-size: 11px; background: rgba(255, 215, 140, 0.15); color: #FFF2DF; border-left: 1px solid rgba(255, 215, 140, 0.25); transition: all 0.4s; }
          .premium-subscribe-btn:hover { background: rgba(255, 215, 140, 0.3); color: #FFF; box-shadow: inset 0 0 20px rgba(255, 215, 140, 0.4); }
          
          .premium-logo-text { font-size: clamp(40px, 8vw, 110px); font-weight: 700; font-family: var(--font-2, serif); line-height: 1; letter-spacing: -0.01em; color: transparent; background: linear-gradient(180deg, #FFFFFF 0%, #E8CDA6 100%); -webkit-background-clip: text; background-clip: text; padding-bottom: 40px; margin-bottom: 40px; border-bottom: 1px solid rgba(255, 215, 140, 0.15); filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8)); position: relative; }
          .premium-logo-text::after { content: ''; position: absolute; left: 0; bottom: -1px; width: 30%; height: 1px; background: linear-gradient(90deg, rgba(255, 215, 140, 0.8), transparent); }
        `}</style>
        
        <div className="premium-footer-bg" />
        
        <div className="footer__inner section section--large relative z-10">
          <div className="footer__main">
            <div className="contact-cta group">
              <p className="subtitle mb-2 uppercase tracking-widest text-[11px] font-bold" style={{ color: 'rgba(255, 215, 140, 0.7)' }}>We're Online</p>
              <div className="contact-cta__content flex items-center gap-6 mb-8">
                <div className="premium-avatar-wrap">
                  <div className="premium-avatar-inner">
                    <img loading="lazy" className="w-full h-full object-cover" src={FOOTER_AVATAR} alt="Let's Chat" />
                  </div>
                </div>
                <div className="contact-cta__txt content content--small">
                  <h4 style={{ fontFamily: 'var(--font-2)', fontSize: '3.5rem', margin: 0, color: '#FFF2DF', lineHeight: 1 }}>
                    Let’s <em style={{ fontStyle: 'italic', color: 'rgba(255, 215, 140, 0.9)' }}>Chat</em>
                  </h4>
                </div>
              </div>
              <div className="contact-cta__btn">
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B919024546041&text&type=phone_number&app_absent=0"
                  className="premium-btn inline-block"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>

            <nav className="footer__menus">
              {menus.map((menu) => (
                <div className="footer__menu" key={menu.title}>
                  <p className="subtitle mb-6 uppercase tracking-widest text-[11px] font-bold" style={{ color: 'rgba(255, 215, 140, 0.7)' }}>{menu.title}</p>
                  <ul className="menu space-y-4">
                    {menu.items.map((item) => (
                      <li className="menu-item" key={item.label}>
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noreferrer" : undefined}
                          onClick={(e) => go(e, item.href, item.external)}
                          className="premium-menu-link inline-block"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="footer__subscribe pt-8">
            <div className="txt-small content content--small mb-6">
              <p>
                <span className="subtitle uppercase tracking-widest text-[11px] font-bold" style={{ color: 'rgba(255, 215, 140, 0.9)' }}>Join Our Community</span>
              </p>
              <p className="text-[15px] mt-3 font-medium leading-relaxed" style={{ color: 'rgba(255, 242, 223, 0.6)' }}>
                Be the first to hear about special offers, exciting updates, and curated content tailored just for you.
              </p>
            </div>
            <div className="footer__subscribe-form">
              {done ? (
                <div className="p-5 rounded-2xl text-center animate-fade-in" style={{ background: 'rgba(255, 215, 140, 0.1)', border: '1px solid rgba(255, 215, 140, 0.3)', backdropFilter: 'blur(10px)' }}>
                  <p className="txt-small font-bold" style={{ color: '#FFF2DF', letterSpacing: '0.05em' }}>✨ Thank you — you’re on the list.</p>
                </div>
              ) : (
                <form className="inline-form w-full max-w-md" onSubmit={submit} noValidate>
                  <div className="premium-input-wrap">
                    <label htmlFor="footer-email" className="sr-only">Email Address</label>
                    <input
                      id="footer-email"
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="footer-input bg-transparent px-6 py-4 w-full outline-none"
                      style={{ color: '#FFF2DF', fontSize: '15px' }}
                    />
                    <button className="premium-subscribe-btn" type="submit" aria-label="Subscribe">
                      Subscribe
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="footer__logo mt-24">
            <div className="premium-logo-text">
              Krishna Sheesh Mahal
            </div>
          </div>

          <div className="footer__bottom flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8">
            <div className="footer__bottom-menu">
              <ul className="menu flex flex-wrap gap-x-8 gap-y-3">
                <li className="menu-item">
                  <a href="#footer" onClick={(e) => e.preventDefault()} className="premium-menu-link text-[13px]">Privacy Policy</a>
                </li>
                <li className="menu-item">
                  <a href="#footer" onClick={(e) => e.preventDefault()} className="premium-menu-link text-[13px]">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
            <div className="footer__bottom-extra text-[13px] md:text-right font-medium leading-relaxed" style={{ color: 'rgba(255, 242, 223, 0.5)' }}>
              <p className="mb-1 hover:text-[#FFF2DF] transition-colors cursor-default">Near Gad Circle, Sector - B, Shrinath Puram, Kota, Rajasthan</p>
              <p className="mb-1">© {new Date().getFullYear()} Krishna Sheesh Mahal</p>
              <p>
                <a href="https://www.fhoke.com" target="_blank" rel="noreferrer" className="hover:text-[#FFF2DF] transition-colors" style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,215,140,0.3)', textUnderlineOffset: '4px' }}>
                  Web Design by Fhoke
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
