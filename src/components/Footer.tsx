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
      <footer className="footer pt-medium pb-small" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#251C19', color: '#F3EDE4' }}>
        <style>{`
          .footer-input::placeholder { color: rgba(243, 237, 228, 0.7) !important; opacity: 1 !important; }
        `}</style>
        {/* Decorative background element */}
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '40%', height: '50%', background: 'radial-gradient(circle, rgba(243, 237, 228, 0.05) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '40%', height: '50%', background: 'radial-gradient(circle, rgba(243, 237, 228, 0.03) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        
        <div className="footer__inner section section--large" style={{ position: 'relative', zIndex: 1 }}>
          <div className="footer__main">
            <div className="contact-cta group">
              <p className="contact-cta__subtitle subtitle mb-2 uppercase tracking-widest text-xs" style={{ color: 'rgba(243, 237, 228, 0.7)' }}>We're Online</p>
              <div className="contact-cta__content flex items-center gap-4 mb-6 transition-transform duration-500 hover:-translate-y-1">
                <div className="contact-cta__avatar rounded-full overflow-hidden border-2 border-transparent transition-all duration-300 shadow-[0_0_15px_rgba(243, 237, 228,0.15)] hover:shadow-[0_0_25px_rgba(243, 237, 228,0.4)]" style={{ borderColor: 'rgba(243, 237, 228, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#F3EDE4'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(243, 237, 228, 0.1)'}>
                  <img loading="lazy" className="img-full object-cover" width={150} height={150} src={FOOTER_AVATAR} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
                </div>
                <div className="contact-cta__txt content content--small">
                  <h4 style={{ fontFamily: 'var(--font-2)', fontSize: '2.5rem', margin: 0, color: '#F3EDE4' }}>
                    Let’s <em style={{ fontStyle: 'italic', color: '#F3EDE4' }}>Chat</em>
                  </h4>
                </div>
              </div>
              <div className="contact-cta__btn">
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B919024546041&text&type=phone_number&app_absent=0"
                  className="btn--full btn btn--regular transition-all duration-300"
                  target="_blank"
                  rel="noreferrer"
                  style={{ borderRadius: '50px', padding: '12px 24px', fontWeight: 'bold', backgroundColor: '#F3EDE4', color: '#251C19', border: '1px solid #F3EDE4' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F3EDE4'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F3EDE4'; e.currentTarget.style.color = '#251C19'; }}
                >
                  Open WhatsApp
                </a>
              </div>
            </div>

            <nav className="footer__menus">
              {menus.map((menu) => (
                <div className="footer__menu" key={menu.title}>
                  <p className="subtitle mb-mini uppercase tracking-wider text-xs font-bold" style={{ color: '#F3EDE4', opacity: 0.8 }}>{menu.title}</p>
                  <ul className="menu">
                    {menu.items.map((item) => (
                      <li className="menu-item overflow-hidden" key={item.label}>
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noreferrer" : undefined}
                          onClick={(e) => go(e, item.href, item.external)}
                          className="inline-block transition-all duration-300 hover:translate-x-2 relative group"
                          style={{ textDecoration: 'none', color: '#F3EDE4' }}
                        >
                          <span style={{ opacity: 0.9 }}>{item.label}</span>
                          <span className="absolute left-0 bottom-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F3EDE4' }}></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="footer__subscribe">
            <div className="txt-small content content--small mb-4">
              <p>
                <span className="subtitle uppercase tracking-widest text-xs font-bold" style={{ color: '#F3EDE4' }}>Join Our Community</span>
              </p>
              <p className="text-sm mt-2 font-medium" style={{ color: 'rgba(243, 237, 228, 0.8)' }}>Be the first to hear about special offers, exciting updates, and curated content tailored just for you.</p>
            </div>
            <div className="footer__subscribe-form">
              {done ? (
                <div className="p-4 rounded-lg text-center animate-fade-in" style={{ backgroundColor: 'rgba(243, 237, 228,0.1)', border: '1px solid rgba(243, 237, 228,0.3)' }}>
                  <p className="txt-small font-semibold" style={{ color: '#F3EDE4' }}>✨ Thank you — you’re on the list.</p>
                </div>
              ) : (
                <form className="inline-form group relative" onSubmit={submit} noValidate>
                  <div className="inline-form__body relative z-10 overflow-hidden transition-all duration-300 flex" style={{ backgroundColor: 'transparent', border: '1px solid rgba(243, 237, 228,0.3)', borderRadius: '50px' }}>
                    <label htmlFor="footer-email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="footer-input bg-transparent px-6 py-4 w-full outline-none"
                      style={{ color: '#F3EDE4' }}
                    />
                    <button className="px-6 font-bold tracking-wide transition-colors duration-300" type="submit" aria-label="Subscribe" style={{ backgroundColor: '#F3EDE4', color: '#251C19', borderRadius: '0 50px 50px 0', borderLeft: '1px solid rgba(243, 237, 228,0.3)' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                      <span className="uppercase text-xs tracking-widest">Subscribe</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="footer__logo mt-16 group cursor-default">
            <span 
              className="block pb-5 mb-5 transition-all duration-700 bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-[#F3EDE4] group-hover:to-[rgba(243, 237, 228,0.5)]"
              style={{ 
                fontSize: '4.5rem', 
                fontWeight: 700, 
                fontFamily: 'var(--font-2)', 
                color: '#F3EDE4', 
                letterSpacing: '0.02em', 
                borderBottom: '1px solid rgba(243, 237, 228, 0.1)',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                lineHeight: '1.1'
              }}
            >
              Krishna Sheesh Mahal
            </span>
          </div>

          <div className="footer__bottom flex justify-between items-center pt-2" style={{ borderTop: 'none' }}>
            <div className="footer__bottom-menu">
              <ul className="menu flex gap-6">
                <li className="menu-item">
                  <a href="#footer" onClick={(e) => e.preventDefault()} className="transition-colors duration-300 text-sm font-medium" style={{ color: 'rgba(243, 237, 228,0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#F3EDE4'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(243, 237, 228,0.7)'}>Privacy Policy</a>
                </li>
                <li className="menu-item">
                  <a href="#footer" onClick={(e) => e.preventDefault()} className="transition-colors duration-300 text-sm font-medium" style={{ color: 'rgba(243, 237, 228,0.7)' }} onMouseEnter={(e) => e.currentTarget.style.color = '#F3EDE4'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(243, 237, 228,0.7)'}>Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
            <div className="footer__bottom-extra text-xs text-right font-medium" style={{ wordBreak: 'break-word', color: 'rgba(243, 237, 228,0.8)' }}>
              <p className="mb-1 transition-colors hover:text-[#fff]">Near Gad Circle, Sector - B, Shrinath Puram, Kota, Rajasthan 324010, India</p>
              <p className="mb-1">© {new Date().getFullYear()} Krishna Sheesh Mahal</p>
              <p>
                <a href="https://www.fhoke.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-[#F3EDE4]" style={{ color: 'rgba(243, 237, 228,0.8)' }}>
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
