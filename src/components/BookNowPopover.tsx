import { useEffect } from "react";
import { lockScroll, scrollToTarget } from "../hooks/useScrollEngine";

const U = "https://thepopuphotel.com/wp-content/uploads";

const HOTELS = [
  { title: "Glastonbury", src: `${U}/2026/03/img-4-655x368.webp` },
  { title: "Monaco", src: `${U}/2026/03/img-5-655x368.webp` },
  { title: "Silverstone", src: `${U}/2026/03/The-Pop-Up-Hotel-Silverstone-655x368.webp` },
  { title: "Monza", src: `${U}/2026/05/monza2_compressed-655x368.webp` },
  { title: "Adare", src: `${U}/2026/05/adare_header_compressed-scaled-1-655x368.webp` },
];

interface Props {
  open: boolean;
  onClose: () => void;
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
                  <a
                    className="img-links__row-item txt-colorway-light"
                    href="#hotels"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      setTimeout(() => scrollToTarget("#hotels", -70), 100);
                    }}
                  >
                    <div className="img-links__row-item-img">
                      <img loading="lazy" className="img-full" width={655} height={368} src={h.src} alt={h.title} />
                    </div>
                    <p className="img-links__row-item-title h3 txt-script">{h.title}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
