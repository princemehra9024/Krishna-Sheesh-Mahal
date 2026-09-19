import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FOOTER_AVATAR, FOOTER_MENUS } from "../data";
import { LogoHorizontal } from "./Logos";
import { scrollToTarget } from "../hooks/useScrollEngine";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const navigateRouter = useNavigate();

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
      <footer className="footer section-colorway-black pt-medium pb-small">
        <div className="footer__inner section section--large">
          <div className="footer__main">
            <div className="contact-cta">
              <p className="contact-cta__subtitle subtitle">We're Online</p>
              <div className="contact-cta__content">
                <div className="contact-cta__avatar">
                  <img loading="lazy" className="img-full" width={150} height={150} src={FOOTER_AVATAR} alt="" />
                </div>
                <div className="contact-cta__txt content content--small">
                  <h4>
                    Let’s <em>Chat</em>
                  </h4>
                </div>
              </div>
              <div className="contact-cta__btn">
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B447725696566&text&type=phone_number&app_absent=0"
                  className="btn--full btn btn--regular"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>

            <nav className="footer__menus">
              {FOOTER_MENUS.map((menu) => (
                <div className="footer__menu" key={menu.title}>
                  <p className="subtitle mb-mini">{menu.title}</p>
                  <ul className="menu">
                    {menu.items.map((item) => (
                      <li className="menu-item" key={item.label}>
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noreferrer" : undefined}
                          onClick={(e) => go(e, item.href, item.external)}
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

          <div className="footer__subscribe">
            <div className="txt-small content content--small">
              <p>
                <span className="subtitle">Join Our Community</span>
              </p>
              <p>Be the first to hear about special offers, exciting updates, and curated content tailored just for you.</p>
            </div>
            <div className="footer__subscribe-form">
              {done ? (
                <p className="txt-small">Thank you — you’re on the list.</p>
              ) : (
                <form className="inline-form" onSubmit={submit} noValidate>
                  <div className="inline-form__body">
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
                    />
                  </div>
                  <div className="inline-form__footer">
                    <button className="btn btn--regular" type="submit" aria-label="Subscribe">
                      <span>Subscribe</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="footer__logo">
            <span style={{ fontSize: '3.5rem', fontWeight: 600, fontFamily: 'var(--font-2)', color: '#fff', letterSpacing: '0.02em', display: 'block', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '20px', marginBottom: '20px' }}>Krishna Sheesh Mahal</span>
          </div>

          <div className="footer__bottom">
            <div className="footer__bottom-menu">
              <ul className="menu">
                <li className="menu-item">
                  <a href="#footer" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                </li>
                <li className="menu-item">
                  <a href="#footer" onClick={(e) => e.preventDefault()}>Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
            <div className="footer__bottom-extra" style={{ wordBreak: 'break-word' }}>
              <p>Near Gad Circle, Sector - B, Shrinath Puram, Kota, Rajasthan 324010, India</p>
              <p>© {new Date().getFullYear()} Krishna Sheesh Mahal</p>
              <p>
                <a href="https://www.fhoke.com" target="_blank" rel="noreferrer">
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
