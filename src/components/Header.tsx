import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MENU, type MenuItem } from "../data";
import { IconAccount, IconBag, IconHeart, IconSearch, LogoHorizontal } from "./Logos";
import { lockScroll, scrollToTarget } from "../hooks/useScrollEngine";

interface HeaderProps {
  onBookNow: () => void;
}

export default function Header({ onBookNow }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateRouter = useNavigate();
  const location = useLocation();
  const isLightHero = location.pathname !== "/";
  // open path: [depth0 index, depth1 index]
  const [openPath, setOpenPath] = useState<number[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const MENU_IMAGES: Record<string, string> = {
    "Home": "/logo.jpg", 
    "Rooms": "https://thepopuphotel.com/wp-content/uploads/2026/03/img-5-1600x900.webp",
    "Restaurant": "/images/restaurant-img.jpeg",
    "Cafe": "/images/cafe/cafe_hero.jpg",
    "Banquet": "/banquet-hero.jpg",
    "Team": "/images/hotel_receptionist.jpg",
    "About Us": "https://thepopuphotel.com/wp-content/uploads/2026/03/img-2-770x1012.webp",
    "Contact": "/images/quote-cooking.jpg"
  };

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    lockScroll(menuOpen);
    if (!menuOpen) {
      setOpenPath([]);
      setHoveredItem(null);
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navigate = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const target = document.querySelector<HTMLElement>(href);
      if (target) setTimeout(() => scrollToTarget(target, href === "#hotels" ? -70 : -70), 50);
      else {
        navigateRouter("/");
        setTimeout(() => {
          const t = document.querySelector<HTMLElement>(href);
          if (t) scrollToTarget(t, href === "#hotels" ? -70 : -70);
        }, 100);
      }
    } else if (href.startsWith("/")) {
      const [path, hash] = href.split("#");
      navigateRouter(path);
      if (hash) {
        setTimeout(() => scrollToTarget("#" + hash, -70), 100);
      } else {
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 10);
      }
    } else {
      window.open(href, "_blank", "noopener");
    }
  };

  const toggleAt = (depth: number, index: number) => {
    setOpenPath((p) => {
      const same = p[depth] === index;
      const next = p.slice(0, depth);
      if (!same) next.push(index);
      return next;
    });
  };

  const renderItems = (items: MenuItem[], depth: number) =>
    items.map((item, i) => {
      const hasChildren = !!item.children?.length;
      const isOpen = openPath[depth] === i;
      return (
        <li 
          key={item.label} 
          className={`menu-item${hasChildren ? " menu-item-has-children" : ""}${isOpen ? " sub-menu-open" : ""}`}
          onMouseEnter={() => setHoveredItem(item.label)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {hasChildren ? (
            <span role="button" tabIndex={0} onClick={() => toggleAt(depth, i)} onKeyDown={(e) => e.key === "Enter" && toggleAt(depth, i)}>
              {item.label}
            </span>
          ) : (
            <a href={item.href} onClick={(e) => { e.preventDefault(); navigate(item.href); }}>{item.label}</a>
          )}
          {hasChildren && (
            <div className={`sub-menu sub-menu--depth-${depth}`}>
              <div className="sub-menu__inner">
                <p className="sub-menu__title">
                  <i className="sub-menu__title-back" role="button" aria-label="Back" onClick={() => toggleAt(depth, i)} />
                  {item.label}
                </p>
                <ul className="sub-menu__items">{renderItems(item.children!, depth + 1)}</ul>
              </div>
            </div>
          )}
        </li>
      );
    });

  return (
    <header className="header header--has-title">
      <div className="header__inner">
        <div className="header__section header__section--hamburger">
          <style>{`
            .premium-hamburger-wrap { width: 50px; height: 50px; border-radius: 50%; border: 1px solid rgba(255, 215, 140, 0.4); display: flex; align-items: center; justify-content: center; margin: 0 auto; transition: all 0.4s ease; box-shadow: 0 0 10px rgba(255, 215, 140, 0.1); cursor: pointer; }
            .premium-hamburger-wrap:hover { background: rgba(255, 215, 140, 0.1); box-shadow: 0 0 20px rgba(255, 215, 140, 0.4); transform: scale(1.05); }
            
            .main-menu .menu {
              background-color: transparent !important;
            }
            .menu-bg-container {
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              z-index: 0;
              pointer-events: none;
              overflow: hidden;
            }
            .menu-bg-image {
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              background-size: cover;
              background-position: center;
              transition: opacity 0.6s ease, transform 6s linear;
              opacity: 0;
              transform: scale(1);
            }
            .menu-bg-image.active {
              opacity: 0.3;
              transform: scale(1.05);
            }
            .main-menu__inner {
              background-color: var(--heading-color) !important;
            }
            .menu-item > a, .menu-item > span {
              position: relative;
              z-index: 2;
            }
          `}</style>
          <div className="premium-hamburger-wrap" onClick={() => setMenuOpen((v) => !v)}>
            <i
              className={`header__menu-toggle${menuOpen ? " active" : ""}`}
              role="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{ width: '22px', height: '18px' }}
            />
          </div>
        </div>

        <div className="header__section header__section--book">
          <div className="header__link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button className="btn btn--regular" style={{ height: '36px', padding: '0 20px', fontSize: '0.75rem', borderRadius: '40px', backgroundColor: 'var(--maroon)', color: '#F3EDE4', border: '1px solid rgba(255, 215, 140, 0.4)', transition: 'all 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 215, 140, 0.4)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'} onClick={onBookNow}>BOOK NOW</button>
          </div>
        </div>

        <div className="header__section header__section--center">
          <a className="header__logo" href="#top" aria-label="Krishna Sheesh Mahal" onClick={(e) => { e.preventDefault(); scrollToTarget(0); }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.jpg" alt="Krishna Sheesh Mahal Logo" style={{ height: '50px', objectFit: 'contain' }} />
          </a>
        </div>

        <div className="header__section header__section--right">
          {/* Icons removed as requested */}
        </div>

        <nav className={`main-menu${menuOpen ? " active" : ""}`} aria-hidden={!menuOpen}>
          <div className="main-menu__inner">
            <div className="menu-bg-container">
              {Object.entries(MENU_IMAGES).map(([label, src]) => (
                <div 
                  key={label}
                  className={`menu-bg-image ${hoveredItem === label ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </div>
            <ul className="menu" style={{ position: 'relative', zIndex: 1 }}>
              {renderItems(MENU, 0)}
              <li className="menu-item menu-item--btn menu-item--mobile">
                <span>
                  <button className="btn--full btn btn--regular" onClick={(e) => { e.preventDefault(); onBookNow(); }}>Book Now</button>
                </span>
              </li>
              <li className="menu-item menu-item--secondary menu-item--mobile">
                <a href="#footer" onClick={(e) => { e.preventDefault(); navigate("#footer"); }}>Log In</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
