import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";

export default function NotFound() {
  useSEO("404 — Page Not Found | Krishna Sheesh Mahal", "The page you're looking for doesn't exist.");

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--cream, #F3EDE4)",
      padding: "20px",
    }}>
      <style>{`
        .nf { text-align: center; }
        .nf-code {
          font-family: var(--font-2, serif);
          font-size: clamp(80px, 18vw, 160px);
          font-weight: 700;
          line-height: 1;
          color: var(--heading-color, #251C19);
          opacity: 0.08;
          margin-bottom: -30px;
          user-select: none;
        }
        .nf-title {
          font-family: var(--font-2, serif);
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          color: var(--heading-color, #251C19);
          margin-bottom: 12px;
        }
        .nf-desc {
          font-family: var(--font-1, sans-serif);
          font-size: 0.95rem;
          color: var(--text-color, #251C19);
          opacity: 0.5;
          margin-bottom: 32px;
        }
        .nf-link {
          display: inline-block;
          font-family: var(--font-1, sans-serif);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--heading-color, #251C19);
          text-decoration: none;
          padding: 12px 28px;
          border: 1px solid rgba(37, 28, 25, 0.2);
          border-radius: 40px;
          transition: all 0.3s ease;
        }
        .nf-link:hover {
          background: var(--heading-color, #251C19);
          color: var(--cream, #F3EDE4);
        }
      `}</style>

      <div className="nf">
        <div className="nf-code">404</div>
        <h1 className="nf-title">Page not found</h1>
        <p className="nf-desc">This page doesn't exist or has been moved.</p>
        <Link to="/" className="nf-link">Go Home</Link>
      </div>
    </div>
  );
}
