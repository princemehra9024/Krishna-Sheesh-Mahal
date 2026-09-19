import { useEffect, useState, type FormEvent } from "react";
import { POPUP_IMAGE } from "../data";
import { lockScroll } from "../hooks/useScrollEngine";

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
}

/** "Join Our Community" modal — opens on exit intent (like the original) or via Book Now */
export default function PopupModal({ open, onClose }: PopupModalProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("modal-open", open);
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setTimeout(onClose, 1400);
  };

  return (
    <div className={`popup-modal${open ? " active" : ""}`} role="dialog" aria-modal="true" aria-hidden={!open} aria-label="Join Our Community">
      <span className="popup-modal__overlay" onClick={onClose} />
      <div className="popup-modal__inner bg-colorway-white">
        <div className="popup-modal__img">
          <img loading="lazy" className="img-full" width={520} height={684} src={POPUP_IMAGE} alt="" />
        </div>
        <div className="popup-modal__content">
          <i className="popup-modal__close" role="button" aria-label="Close" onClick={onClose} />
          <div className="popup-modal__content-txt content">
            <h2 className="h4">
              Welcome to <em>The Pop-Up Hotel</em>
            </h2>
            <p>Experience unparalleled comfort and unforgettable moments at the world's greatest events.</p>
          </div>
          <div className="popup-modal__content-form">
            <button className="btn btn--regular btn--full" onClick={onClose} type="button">
              <span>Enter Site</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
