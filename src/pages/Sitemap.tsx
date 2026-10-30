import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

interface SitemapLink {
  label: string;
  href: string;
  desc: string;
}

interface SitemapSection {
  title: string;
  icon: string;
  links: SitemapLink[];
}

const SECTIONS: SitemapSection[] = [
  {
    title: "Main Pages",
    icon: "🏛️",
    links: [
      { label: "Home", href: "/", desc: "Welcome to Krishna Sheesh Mahal — Luxury Hotel in Kota" },
      { label: "About Us", href: "/about", desc: "Our heritage, story, and royal vision" },
      { label: "Our Team", href: "/team", desc: "Meet the dedicated team behind your royal stay" },
      { label: "Contact", href: "/contact", desc: "Reach us for bookings, enquiries, and support" },
    ],
  },
  {
    title: "Rooms & Booking",
    icon: "🛏️",
    links: [
      { label: "Rooms & Suites", href: "/rooms", desc: "Deluxe, Super Deluxe, Premium & Royal Suite" },
      { label: "Book Now", href: "/booking", desc: "Reserve a room, banquet, or dining experience" },
      { label: "Deluxe Room", href: "/rooms#deluxe", desc: "Comfort & style at ₹1,200/night (EP)" },
      { label: "Super Deluxe Room", href: "/rooms#super-deluxe", desc: "Spacious luxury at ₹1,500/night (EP)" },
      { label: "Premium Room", href: "/rooms#premium", desc: "Elevated comfort at ₹1,800/night (EP)" },
    ],
  },
  {
    title: "Dining",
    icon: "🍽️",
    links: [
      { label: "Restaurant", href: "/restaurant", desc: "Fine multi-cuisine dining experience" },
      { label: "Rama's Sky Lounge", href: "/cafe", desc: "Rooftop café & lounge open 2 PM – 11 PM" },
    ],
  },
  {
    title: "Events & Banquet",
    icon: "🎊",
    links: [
      { label: "Banquet & Events", href: "/banquet", desc: "Weddings, corporate events & private celebrations" },
    ],
  },
  {
    title: "Legal",
    icon: "📄",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy", desc: "How we collect and protect your data" },
      { label: "Terms & Conditions", href: "/terms", desc: "Terms governing use of our website and services" },
    ],
  },
];

export default function Sitemap() {
  useSEO(
    "Sitemap | Krishna Sheesh Mahal Kota",
    "Browse all pages of Krishna Sheesh Mahal — hotel rooms, dining, banquet halls, and more in Kota, Rajasthan."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrap" style={{ backgroundColor: "var(--cream)", minHeight: "100vh" }}>
      <style>{`
        .sitemap-page {
          padding: clamp(120px, 15vw, 160px) 20px clamp(60px, 10vw, 100px);
          max-width: 960px;
          margin: 0 auto;
        }
        .sitemap-breadcrumb {
          font-family: var(--font-1, sans-serif);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 48px;
          color: var(--text-color, #251C19);
          opacity: 0.5;
        }
        .sitemap-breadcrumb a {
          color: inherit;
          text-decoration: none;
        }
        .sitemap-breadcrumb a:hover { opacity: 0.8; }
        .sitemap-breadcrumb span { margin: 0 8px; }

        .sitemap-hero {
          margin-bottom: 64px;
          border-bottom: 1px solid rgba(197, 160, 89, 0.25);
          padding-bottom: 40px;
        }
        .sitemap-hero__eyebrow {
          font-family: var(--font-1, sans-serif);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--gold, #C5A059);
          margin-bottom: 14px;
        }
        .sitemap-hero__title {
          font-family: var(--font-script, Georgia, serif);
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          color: var(--charcoal, #251C19);
          margin-bottom: 14px;
          line-height: 1.1;
        }
        .sitemap-hero__sub {
          font-family: var(--font-1, sans-serif);
          font-size: 1rem;
          color: var(--text-color, #251C19);
          opacity: 0.6;
          max-width: 520px;
          line-height: 1.7;
        }

        .sitemap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 36px;
        }
        .sitemap-section {
          background: #fff;
          border: 1px solid rgba(197, 160, 89, 0.2);
          border-radius: 16px;
          padding: 28px 28px 24px;
          box-shadow: 0 4px 20px rgba(37,28,25,0.04);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .sitemap-section:hover {
          box-shadow: 0 8px 32px rgba(37,28,25,0.09);
          transform: translateY(-3px);
        }
        .sitemap-section__header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(197, 160, 89, 0.18);
        }
        .sitemap-section__icon {
          font-size: 1.2rem;
          line-height: 1;
        }
        .sitemap-section__title {
          font-family: var(--font-1, sans-serif);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-weight: 700;
          color: var(--gold, #C5A059);
        }
        .sitemap-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sitemap-link-item {}
        .sitemap-link {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          text-decoration: none;
          color: inherit;
          group: true;
        }
        .sitemap-link__bullet {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold, #C5A059);
          margin-top: 7px;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .sitemap-link:hover .sitemap-link__bullet {
          transform: scale(1.6);
        }
        .sitemap-link__text {}
        .sitemap-link__label {
          font-family: var(--font-1, sans-serif);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--charcoal, #251C19);
          display: block;
          margin-bottom: 2px;
          transition: color 0.2s ease;
        }
        .sitemap-link:hover .sitemap-link__label {
          color: var(--red, #C51D24);
        }
        .sitemap-link__desc {
          font-family: var(--font-1, sans-serif);
          font-size: 0.78rem;
          color: var(--text-color, #251C19);
          opacity: 0.52;
          line-height: 1.4;
        }

        .sitemap-footer-note {
          margin-top: 64px;
          padding-top: 32px;
          border-top: 1px solid rgba(197, 160, 89, 0.2);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .sitemap-footer-note__text {
          font-family: var(--font-1, sans-serif);
          font-size: 0.8rem;
          color: var(--text-color, #251C19);
          opacity: 0.45;
        }
        .sitemap-footer-note__xml a {
          font-family: var(--font-1, sans-serif);
          font-size: 0.8rem;
          color: var(--gold, #C5A059);
          text-decoration: none;
          border-bottom: 1px solid rgba(197, 160, 89, 0.4);
          padding-bottom: 1px;
          transition: opacity 0.2s;
        }
        .sitemap-footer-note__xml a:hover { opacity: 0.7; }

        @media (max-width: 600px) {
          .sitemap-grid { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>

      <div className="sitemap-page">
        {/* Breadcrumb */}
        <div className="sitemap-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>Sitemap</span>
        </div>

        {/* Hero */}
        <div className="sitemap-hero">
          <p className="sitemap-hero__eyebrow">Website Navigation</p>
          <h1 className="sitemap-hero__title txt-script">Sitemap</h1>
          <p className="sitemap-hero__sub">
            A complete guide to every page on the Krishna Sheesh Mahal website.
            Find rooms, dining, events, and more.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="sitemap-grid">
          {SECTIONS.map((section) => (
            <div className="sitemap-section" key={section.title}>
              <div className="sitemap-section__header">
                <span className="sitemap-section__icon" aria-hidden="true">{section.icon}</span>
                <h2 className="sitemap-section__title">{section.title}</h2>
              </div>
              <ul className="sitemap-links">
                {section.links.map((link) => (
                  <li className="sitemap-link-item" key={link.href}>
                    <Link to={link.href} className="sitemap-link">
                      <span className="sitemap-link__bullet" aria-hidden="true" />
                      <span className="sitemap-link__text">
                        <span className="sitemap-link__label">{link.label}</span>
                        <span className="sitemap-link__desc">{link.desc}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="sitemap-footer-note">
          <p className="sitemap-footer-note__text">
            Last updated: 30 October 2026 &nbsp;·&nbsp; Krishna Sheesh Mahal, RK Puram, Kota, Rajasthan
          </p>
          <div className="sitemap-footer-note__xml">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              View XML Sitemap ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
