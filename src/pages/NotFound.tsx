import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

const QUICK_LINKS = [
  { label: "Rooms & Suites", href: "/rooms", icon: "🛏️", desc: "Deluxe · Super Deluxe · Premium · Suite" },
  { label: "Restaurant", href: "/restaurant", icon: "🍽️", desc: "Fine multi-cuisine dining" },
  { label: "Rama's Sky Lounge", href: "/cafe", icon: "☕", desc: "Rooftop café · Open 2–11 PM" },
  { label: "Banquet & Events", href: "/banquet", icon: "🎊", desc: "Weddings · Corporate · Private" },
  { label: "Book Now", href: "/booking", icon: "✨", desc: "Reserve your royal experience" },
  { label: "Contact Us", href: "/contact", icon: "📞", desc: "We're here to help" },
];

export default function NotFound() {
  useSEO({
    title: "404 — Page Not Found | Krishna Sheesh Mahal Kota",
    description: "This page does not exist. Return to Krishna Sheesh Mahal luxury hotel in Kota, Rajasthan.",
    noindex: true,
  });

  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  /* ── golden particle canvas ── */
  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number; va: number };
    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.5 - 0.15,
      r: Math.random() * 2.2 + 0.4,
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.008,
    }));

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.va;
        if (p.a < 0) p.va = Math.abs(p.va);
        if (p.a > 1) p.va = -Math.abs(p.va);
        if (p.y < -10) { p.y = H + 5; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 5;
        if (p.x > W + 10) p.x = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 157, 58, ${p.a * 0.6})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="nf-root">
      <style>{`
        /* ── root ── */
        .nf-root {
          position: relative;
          min-height: 100vh;
          background: #1A1311;
          color: #FFF2DF;
          overflow: hidden;
          font-family: var(--font-1, 'Satoshi', sans-serif);
        }

        /* ── canvas ── */
        .nf-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* ── radial glow ── */
        .nf-glow {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 60%,
            rgba(94,32,45,0.45) 0%,
            rgba(197,157,58,0.08) 40%,
            transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── grid overlay ── */
        .nf-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,242,223,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,242,223,0.025) 1px, transparent 1px);
          background-size: 70px 70px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── main content ── */
        .nf-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 100px 24px 60px;
          text-align: center;
        }

        /* ── top badge ── */
        .nf-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(197,157,58,0.1);
          border: 1px solid rgba(197,157,58,0.3);
          border-radius: 999px;
          padding: 6px 18px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(197,157,58,0.9);
          margin-bottom: 32px;
          animation: nfFadeUp 0.7s ease both;
        }
        .nf-badge::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #C59D3A;
          animation: nfPulse 2s infinite;
        }

        /* ── 404 number ── */
        .nf-number {
          font-family: var(--font-2, 'Noe Display', Georgia, serif);
          font-size: clamp(120px, 22vw, 220px);
          font-weight: 700;
          line-height: 0.85;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg,
            rgba(255,242,223,0.15) 0%,
            rgba(197,157,58,0.5) 40%,
            rgba(255,242,223,0.12) 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          user-select: none;
          margin-bottom: 4px;
          animation: nfFadeUp 0.7s 0.1s ease both;
          filter: drop-shadow(0 0 60px rgba(197,157,58,0.18));
        }

        /* ── divider ── */
        .nf-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 20px auto 28px;
          width: min(320px, 80vw);
          animation: nfFadeUp 0.7s 0.2s ease both;
        }
        .nf-divider__line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(197,157,58,0.5), transparent);
        }
        .nf-divider__diamond {
          width: 6px; height: 6px;
          border: 1px solid rgba(197,157,58,0.7);
          transform: rotate(45deg);
          background: rgba(197,157,58,0.3);
        }

        /* ── heading ── */
        .nf-heading {
          font-family: var(--font-script, var(--font-5, cursive));
          font-size: clamp(1.6rem, 4vw, 2.8rem);
          color: #FFF2DF;
          margin-bottom: 14px;
          animation: nfFadeUp 0.7s 0.25s ease both;
          font-weight: 400;
        }
        .nf-heading em {
          font-style: italic;
          color: rgba(197,157,58,0.9);
        }

        /* ── description ── */
        .nf-desc {
          font-size: 0.95rem;
          color: rgba(255,242,223,0.5);
          line-height: 1.75;
          max-width: 420px;
          margin: 0 auto 40px;
          animation: nfFadeUp 0.7s 0.3s ease both;
        }

        /* ── CTA buttons ── */
        .nf-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          margin-bottom: 64px;
          animation: nfFadeUp 0.7s 0.35s ease both;
        }
        .nf-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #C51D24, #9B1C23);
          color: #FFF2DF;
          padding: 14px 32px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 20px rgba(197,29,36,0.3);
        }
        .nf-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(197,29,36,0.45);
        }
        .nf-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: rgba(255,242,223,0.8);
          padding: 13px 28px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(255,242,223,0.2);
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .nf-btn-secondary:hover {
          border-color: rgba(197,157,58,0.5);
          color: rgba(197,157,58,0.9);
          transform: translateY(-2px);
        }

        /* ── quick links grid ── */
        .nf-links-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(197,157,58,0.6);
          margin-bottom: 20px;
          animation: nfFadeUp 0.7s 0.4s ease both;
        }
        .nf-grid-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          width: min(680px, 92vw);
          animation: nfFadeUp 0.7s 0.45s ease both;
        }
        .nf-quick-link {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 14px 16px;
          border: 1px solid rgba(255,242,223,0.07);
          border-radius: 12px;
          background: rgba(255,242,223,0.03);
          text-decoration: none;
          color: inherit;
          text-align: left;
          transition: all 0.25s ease;
          backdrop-filter: blur(4px);
        }
        .nf-quick-link:hover {
          border-color: rgba(197,157,58,0.35);
          background: rgba(197,157,58,0.06);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.25);
        }
        .nf-quick-link__icon {
          font-size: 1.1rem;
          line-height: 1;
          margin-top: 1px;
          flex-shrink: 0;
        }
        .nf-quick-link__body {}
        .nf-quick-link__name {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: rgba(255,242,223,0.9);
          margin-bottom: 2px;
          transition: color 0.2s;
        }
        .nf-quick-link:hover .nf-quick-link__name {
          color: rgba(197,157,58,0.95);
        }
        .nf-quick-link__sub {
          display: block;
          font-size: 0.68rem;
          color: rgba(255,242,223,0.35);
          line-height: 1.4;
        }

        /* ── footer brand ── */
        .nf-brand {
          margin-top: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          animation: nfFadeUp 0.7s 0.5s ease both;
          opacity: 0.45;
        }
        .nf-brand__logo {
          width: 36px; height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(197,157,58,0.4);
        }
        .nf-brand__name {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,242,223,0.7);
        }

        /* ── animations ── */
        @keyframes nfFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nfPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.75); }
        }

        /* ── responsive ── */
        @media (max-width: 600px) {
          .nf-grid-links { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 380px) {
          .nf-grid-links { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Background layers */}
      <canvas ref={canvasRef} className="nf-canvas" aria-hidden="true" />
      <div className="nf-glow" aria-hidden="true" />
      <div className="nf-grid" aria-hidden="true" />

      {/* Content */}
      <main className="nf-content">
        {/* Badge */}
        <div className="nf-badge" aria-label="Error 404">Error 404</div>

        {/* Giant number */}
        <div className="nf-number" aria-hidden="true">404</div>

        {/* Ornamental divider */}
        <div className="nf-divider" aria-hidden="true">
          <div className="nf-divider__line" />
          <div className="nf-divider__diamond" />
          <div className="nf-divider__line" />
        </div>

        {/* Heading */}
        <h1 className="nf-heading">
          This room is <em>unavailable</em>
        </h1>

        {/* Description */}
        <p className="nf-desc">
          The page you're looking for may have moved, been removed, or never
          existed. Allow us to guide you back to your royal stay.
        </p>

        {/* Primary CTAs */}
        <div className="nf-ctas">
          <Link to="/" className="nf-btn-primary">
            ← Return to Home
          </Link>
          <Link to="/booking" className="nf-btn-secondary">
            Book a Room
          </Link>
        </div>

        {/* Quick Links */}
        <p className="nf-links-label">Or explore our offerings</p>
        <nav className="nf-grid-links" aria-label="Quick navigation">
          {QUICK_LINKS.map((link) => (
            <Link to={link.href} className="nf-quick-link" key={link.href}>
              <span className="nf-quick-link__icon" aria-hidden="true">{link.icon}</span>
              <span className="nf-quick-link__body">
                <span className="nf-quick-link__name">{link.label}</span>
                <span className="nf-quick-link__sub">{link.desc}</span>
              </span>
            </Link>
          ))}
        </nav>

        {/* Brand watermark */}
        <div className="nf-brand">
          <img
            src="/logo.png"
            alt="Krishna Sheesh Mahal Logo"
            className="nf-brand__logo"
            loading="lazy"
          />
          <span className="nf-brand__name">Krishna Sheesh Mahal</span>
        </div>
      </main>
    </div>
  );
}
