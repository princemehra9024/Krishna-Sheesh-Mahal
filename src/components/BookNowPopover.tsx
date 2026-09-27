import { useEffect } from "react";
import { Link } from "react-router-dom";
import { lockScroll, scrollToTarget } from "../hooks/useScrollEngine";

const U = "https://thepopuphotel.com/wp-content/uploads";

const HOTELS = [
  { title: "Rooms & Suites", src: `${U}/2026/03/img-5-1600x900.webp`, href: "/booking?type=rooms" },
  { title: "Banquet & Events", src: "/images/banquet-corporate-new.jpg", href: "/booking?type=banquet" },
  { title: "Fine Dining", src: "/images/restaurant-img.jpeg", href: "/booking?type=dining" },
  { title: "Cafe", src: "/images/cafe/cafe_hero.jpg", href: "/booking?type=cafe" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  initialType?: string;
}

/** Left-hand "Book Now" drawer, identical structure to the original popover */
export default function BookNowPopover({ open, onClose }: Props) {
  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`popover popover--align-left popover--slim${open ? " active" : ""}`} aria-hidden={!open}>
      <div className="popover__overlay" onClick={onClose} />
      <div className="popover__inner" data-lenis-prevent>
        <header className="popover__header">
          <h3 className="popover__header-title">Book Now</h3>
          <span className="popover__header-close" role="button" aria-label="Close" onClick={onClose} />
        </header>
        <div className="popover__content">
          <div className="popover__content-inner">
            <div className="img-links img-links--small">
              {HOTELS.map((h) => (
                <div className="img-links__row" key={h.title}>
                  <Link
                    className="img-links__row-item txt-colorway-light"
                    to={h.href}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    <div className="img-links__row-item-img">
                      <img loading="lazy" className="img-full" width={655} height={368} src={h.src} alt={h.title} />
                    </div>
                    <p className="img-links__row-item-title h3 txt-script">{h.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
