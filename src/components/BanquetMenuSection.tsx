import { useState } from "react";
import {
  KITTY_PARTY_PACKAGES,
  PARTY_BANQUET_PACKAGES,
  BANQUET_CONTACT,
  BanquetPackage,
} from "../data/banquetMenus";
import {
  Utensils,
  Coffee,
  Sparkles,
  PartyPopper,
  Check,
  Phone,
  MessageCircle,
  FileDown,
  ChevronDown,
  ChevronUp,
  Star,
  Crown,
  Grid,
  TableProperties,
  Flame,
  Volume2,
  Wind,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

interface BanquetMenuSectionProps {
  onBookNow?: (type: string) => void;
}

export default function BanquetMenuSection({ onBookNow }: BanquetMenuSectionProps) {
  // Active Tab: 'party' or 'kitty'
  const [activeTab, setActiveTab] = useState<"party" | "kitty">("party");
  // View Mode: 'cards' or 'table'
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  // Expanded package card id for detailed breakdown
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const currentPackages: BanquetPackage[] =
    activeTab === "kitty" ? KITTY_PARTY_PACKAGES : PARTY_BANQUET_PACKAGES;

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const scrollTableTo = (index: number) => {
    const el = document.getElementById("banquet-table-scroll");
    if (el) {
      const colWidth = 165;
      el.scrollTo({ left: index * colWidth, behavior: "smooth" });
    }
  };

  const getWhatsAppUrl = (pkg?: BanquetPackage) => {
    const text = pkg
      ? `Hello Krishna Sheesh Mahal! I am interested in booking the *${pkg.menuNo} (${pkg.name}) - ${pkg.priceFormatted}* for an upcoming event. Please share availability and details.`
      : `Hello Krishna Sheesh Mahal! I would like to inquire about Banquet & Kitty Party packages.`;
    return `https://wa.me/${BANQUET_CONTACT.cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="banquet-menus-wrapper" id="menus-section">
      <style>{`
        /* ── BANQUET MENU LUXURY STYLES ── */
        .banquet-menus-wrapper {
          position: relative;
          background: #FAF7F2;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(197, 29, 36, 0.04) 0%, transparent 40%),
            url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 0l4 12 12 4-12 4-4 12-4-12L0 16l12-4z' fill='%23d4af37' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          padding: clamp(35px, 4.2vh, 52px) 20px clamp(45px, 5.5vh, 70px);
          color: #1A1311;
          overflow: hidden;
          scroll-margin-top: 85px;
        }

        .banquet-menu-inner {
          max-width: 1260px;
          margin: 0 auto;
        }

        /* ── HEADER ── */
        .menu-hero-header {
          text-align: center;
          margin-bottom: 22px;
        }
        .menu-pill-subtitle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(197, 29, 36, 0.08);
          border: 1px solid rgba(197, 29, 36, 0.22);
          color: #9B1C23;
          font-family: var(--font-1, sans-serif);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          padding: 5px 16px;
          border-radius: 30px;
          margin-bottom: 10px;
        }
        .menu-main-title {
          font-family: var(--font-2, serif);
          font-size: clamp(2rem, 3.8vw, 3rem);
          font-weight: 500;
          line-height: 1.15;
          color: #1A1311;
          margin: 0 0 8px 0;
        }
        .menu-main-title em {
          font-family: var(--font-3, italic);
          font-style: italic;
          color: #C51D24;
          font-weight: 400;
        }
        .menu-desc {
          max-width: 660px;
          margin: 0 auto 18px;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #554844;
        }

        /* Main Category Segmented Tabs (Desktop) */
        .category-switcher {
          display: inline-flex;
          background: #EFE9DF;
          padding: 4px;
          border-radius: 50px;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.06);
          border: 1px solid rgba(197, 160, 89, 0.35);
          box-sizing: border-box;
          max-width: 100%;
        }
        .category-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 24px;
          border-radius: 40px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: var(--font-1, sans-serif);
          font-size: 0.9rem;
          font-weight: 600;
          color: #5A4A45;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .category-btn.active {
          background: linear-gradient(135deg, #C51D24 0%, #9B1C23 100%);
          color: #FFFFFF;
          box-shadow: 0 6px 18px rgba(197, 29, 36, 0.32);
          transform: translateY(-1px);
        }
        .category-btn.active .category-badge-chip {
          background: rgba(255, 255, 255, 0.22);
          color: #FFF;
        }
        .category-badge-chip {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 8px;
          border-radius: 10px;
          background: rgba(0,0,0,0.07);
          font-weight: 700;
        }

        /* ── INTERACTIVE CONTROLS ── */
        .menu-controls-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 18px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }

        .actions-sub-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .view-mode-toggle {
          display: inline-flex;
          background: #FAF7F2;
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: 30px;
          padding: 3px;
        }
        .view-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border: none;
          background: transparent;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #665;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .view-btn.active {
          background: #1A1311;
          color: #FFD78C;
        }
        .download-flyer-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          background: #FAF7F2;
          border: 1px solid #C5A059;
          color: #C51D24;
          border-radius: 30px;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .download-flyer-btn:hover {
          background: #C51D24;
          color: #FAF7F2;
          box-shadow: 0 4px 15px rgba(197, 29, 36, 0.35);
        }

        /* ── SINGLE ROYAL FRAME CONTAINER ── */
        .banquet-single-frame {
          position: relative;
          background: #FFFFFF;
          border: 2px solid #C5A059;
          border-radius: 22px;
          box-shadow: 
            0 0 0 4px rgba(197, 160, 89, 0.14),
            0 16px 45px rgba(26, 19, 17, 0.06);
          padding: 20px 22px 18px;
          margin-bottom: 24px;
          scroll-margin-top: 85px;
        }
        .banquet-single-frame::before {
          content: "";
          position: absolute;
          inset: 5px;
          border: 1px solid rgba(197, 160, 89, 0.32);
          border-radius: 17px;
          pointer-events: none;
        }
        .single-frame-topbar {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding: 9px 16px;
          background: linear-gradient(135deg, rgba(197, 29, 36, 0.05) 0%, rgba(197, 160, 89, 0.1) 100%);
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: 12px;
          margin-bottom: 18px;
        }
        .frame-crest-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-1, sans-serif);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9B1C23;
        }
        .frame-crest-sep {
          color: #C5A059;
        }
        .frame-crest-sub {
          color: #6C5D58;
          font-weight: 600;
          font-size: 0.74rem;
          letter-spacing: 0.06em;
        }
        .frame-highlights-pills {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .frame-highlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #FAF7F2;
          border: 1px solid rgba(197, 160, 89, 0.35);
          color: #4A3A34;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 12px;
        }

        .single-frame-bottombar {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px dashed rgba(197, 160, 89, 0.4);
          font-size: 0.82rem;
          color: #5A4A45;
        }
        .frame-bottom-note {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 260px;
        }
        .frame-bottom-cta {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .frame-wa-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #128C7E;
          background: rgba(37, 211, 102, 0.09);
          border: 1px solid rgba(37, 211, 102, 0.35);
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.76rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .frame-wa-link:hover {
          background: #25D366;
          color: #FFFFFF;
        }

        /* ── LUXURY CARDS GRID (INSIDE SINGLE FRAME) ── */
        .banquet-cards-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          align-items: stretch;
        }

        /* Single Package Card */
        .pkg-card {
          position: relative;
          background: #FAF7F2;
          border: 1px solid rgba(197, 160, 89, 0.35);
          border-radius: 16px;
          padding: 22px 18px 18px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pkg-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(197, 29, 36, 0.12), 0 0 0 1px #C51D24;
        }
        .pkg-card.popular {
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF5ED 100%);
          border: 2px solid #C5A059;
          box-shadow: 0 8px 24px rgba(197, 160, 89, 0.2);
        }

        /* Ribbons & Badges */
        .pkg-floating-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #C51D24 0%, #9B1C23 100%);
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(197, 29, 36, 0.3);
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          z-index: 2;
          border: 1px solid rgba(255, 215, 140, 0.4);
        }
        .pkg-card.popular .pkg-floating-badge {
          background: linear-gradient(135deg, #C5A059 0%, #9B7834 100%);
          color: #1A1311;
          border: 1px solid #FFE6A3;
        }

        .pkg-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .pkg-menu-no {
          font-family: var(--font-1, sans-serif);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9B1C23;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pkg-unlimited-pill {
          background: rgba(34, 139, 34, 0.09);
          color: #1b631b;
          border: 1px solid rgba(34, 139, 34, 0.3);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 3px 8px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .pkg-title {
          font-family: var(--font-2, serif);
          font-size: 1.35rem;
          line-height: 1.22;
          color: #1A1311;
          margin: 0 0 6px 0;
          font-weight: 600;
          min-height: 44px;
          display: flex;
          align-items: center;
        }
        .pkg-tagline {
          font-size: 0.82rem;
          color: #6C5D58;
          line-height: 1.35;
          margin-bottom: 12px;
          min-height: 38px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Price Box */
        .pkg-price-box {
          background: rgba(197, 160, 89, 0.08);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 14px;
          border: 1px dashed rgba(197, 160, 89, 0.5);
        }
        .pkg-price-amount {
          font-family: var(--font-2, serif);
          font-size: 1.95rem;
          font-weight: 700;
          color: #9B1C23;
          line-height: 1;
        }
        .pkg-price-label {
          font-size: 0.74rem;
          color: #776A65;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 700;
        }

        /* Inclusions List */
        .pkg-features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 16px 0;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .pkg-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.84rem;
          line-height: 1.32;
          color: #2D221E;
        }
        .pkg-feature-icon {
          flex-shrink: 0;
          margin-top: 2px;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: rgba(197, 29, 36, 0.09);
          color: #C51D24;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pkg-card.popular .pkg-feature-icon {
          background: rgba(197, 160, 89, 0.22);
          color: #8C6A1D;
        }

        /* Expanded Details Accordion */
        .pkg-details-drawer {
          background: #FAF7F2;
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          font-size: 0.82rem;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .drawer-row {
          margin-bottom: 9px;
          padding-bottom: 7px;
          border-bottom: 1px dashed rgba(0,0,0,0.07);
        }
        .drawer-row:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        .drawer-label {
          font-weight: 700;
          color: #9B1C23;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 3px;
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .drawer-val {
          color: #332724;
          line-height: 1.32;
        }

        /* Card Action Buttons */
        .pkg-cta-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: auto;
        }
        .btn-book-pkg {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          background: linear-gradient(135deg, #C51D24 0%, #9B1C23 100%);
          color: #FFFFFF;
          font-family: var(--font-1, sans-serif);
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          border: 1px solid rgba(255, 215, 140, 0.35);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          box-shadow: 0 4px 14px rgba(197, 29, 36, 0.25);
          transition: all 0.25s ease;
        }
        .btn-book-pkg:hover {
          background: linear-gradient(135deg, #D4262E 0%, #A81E26 100%);
          box-shadow: 0 8px 20px rgba(197, 29, 36, 0.4);
          transform: translateY(-2px);
        }
        .pkg-card.popular .btn-book-pkg {
          background: linear-gradient(135deg, #C51D24 0%, #8C191E 100%);
        }
        .btn-toggle-details {
          background: transparent;
          border: 1px solid rgba(0,0,0,0.1);
          color: #554844;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: all 0.2s ease;
        }
        .btn-toggle-details:hover {
          background: #EFE9DF;
          color: #1A1311;
        }

        /* ── EXECUTIVE COMPARISON TABLE ── */
        .comparison-table-wrapper {
          background: #FAF7F2;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.06);
          border: 1px solid rgba(197, 160, 89, 0.3);
          overflow-x: auto;
          margin-top: 10px;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        .comp-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 820px;
          text-align: left;
        }
        .comp-table th, .comp-table td {
          padding: 16px 22px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          vertical-align: top;
        }
        .comp-table thead th {
          background: #FAF7F2;
          font-family: var(--font-2, serif);
          padding: 24px 22px;
        }

        /* Sticky Left Column for Table */
        .comp-table th.col-feature,
        .comp-table td.comp-cat-title {
          position: sticky;
          left: 0;
          background: #FAF7F2;
          z-index: 5;
          box-shadow: 3px 0 8px rgba(0,0,0,0.06);
        }
        .comp-table thead th.col-feature {
          z-index: 7;
          background: #F2EBE0;
        }
        .comp-table th.col-feature {
          width: 25%;
          font-family: var(--font-1, sans-serif);
          font-size: 0.85rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #6C5D58;
        }

        .comp-col-header {
          text-align: center;
        }
        .comp-badge-no {
          font-family: var(--font-1, sans-serif);
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8C2633;
          margin-bottom: 4px;
        }
        .comp-pkg-name {
          font-size: 1.15rem;
          font-weight: 600;
          color: #1A1311;
          margin-bottom: 8px;
        }
        .comp-price-pill {
          display: inline-block;
          background: #2B1F17;
          color: #FFD78C;
          font-family: var(--font-2, serif);
          font-size: 1.25rem;
          font-weight: 700;
          padding: 4px 16px;
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .comp-table tbody tr:hover {
          background: rgba(248, 245, 240, 0.6);
        }
        .comp-cat-title {
          font-weight: 700;
          color: #8C2633;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
        }
        .comp-cell-content {
          font-size: 0.92rem;
          line-height: 1.45;
          color: #2D221E;
          text-align: center;
        }
        .comp-dash {
          color: #AAA;
          font-weight: 600;
          font-size: 1.2rem;
        }

        /* Mobile Helpers for Comparison Table */
        .table-mobile-helpers {
          display: none;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 14px;
        }
        .table-swipe-cue {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #8C2633;
          background: rgba(140, 38, 51, 0.08);
          padding: 8px 14px;
          border-radius: 20px;
          text-align: center;
        }
        .table-col-jumper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .col-jump-btn {
          background: #FAF7F2;
          border: 1px solid #C5A059;
          color: #1A1311;
          border-radius: 10px;
          padding: 8px 4px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s ease;
        }
        .col-jump-btn:active, .col-jump-btn:hover {
          background: #C51D24;
          color: #FAF7F2;
          border-color: #C51D24;
        }

        /* ── FOOTER CALLOUT & AMENITIES ── */
        .banquet-bottom-strip {
          margin-top: 50px;
          background: linear-gradient(135deg, #2B1F17 0%, #1A1311 100%);
          border-radius: 24px;
          padding: 40px 35px;
          color: #F3EDE4;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }
        .banquet-bottom-strip::before {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l5 15 15 5-15 5-5 15-5-15-15-5 15-5z' fill='%23ffd78c' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
          pointer-events: none;
        }
        .bottom-strip-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .amenities-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        .amenity-chip {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .amenity-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 215, 140, 0.15);
          color: #FFD78C;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .amenity-chip h5 {
          margin: 0 0 3px 0;
          font-size: 0.95rem;
          color: #FFF;
          font-weight: 600;
        }
        .amenity-chip p {
          margin: 0;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.3;
        }

        .coordinator-card {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 215, 140, 0.2);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
        }
        .coordinator-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #FFD78C;
          margin-bottom: 6px;
          font-weight: 700;
        }
        .coordinator-name {
          font-family: var(--font-2, serif);
          font-size: 1.6rem;
          color: #FFF;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .coord-btns {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-coord-call {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #8C2633;
          color: #FFF;
          padding: 10px 18px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-coord-call:hover {
          background: #A83241;
          box-shadow: 0 4px 15px rgba(168, 50, 65, 0.4);
        }
        .btn-coord-wa {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: #FFF;
          padding: 10px 18px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-coord-wa:hover {
          background: #20BA5A;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
        }

        .extra-charge-notice {
          margin-top: 20px;
          text-align: center;
          font-size: 0.85rem;
          color: #7E706A;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* ── RESPONSIVE MEDIA QUERIES (TABLETS & PHONES) ── */
        @media (max-width: 1024px) {
          .banquet-single-frame {
            padding: 16px 14px 14px;
            border-radius: 18px;
          }
          .banquet-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 900px) {
          .bottom-strip-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .banquet-menus-wrapper {
            padding: 35px 12px 50px;
          }
          .menu-hero-header {
            margin-bottom: 20px;
          }
          .menu-main-title {
            font-size: 1.95rem;
          }
          .menu-desc {
            font-size: 0.9rem;
            margin-bottom: 16px;
          }

          /* Single Frame on mobile */
          .banquet-single-frame {
            padding: 14px 10px 12px;
            border-radius: 16px;
          }
          .single-frame-topbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 10px 12px;
          }
          .frame-crest-sep {
            display: none;
          }
          .single-frame-bottombar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          /* Tab Switcher on Mobile: 2-column full-width grid */
          .category-switcher {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            max-width: 100%;
            padding: 4px;
            border-radius: 16px;
            gap: 4px;
            box-sizing: border-box;
          }
          .category-btn {
            padding: 10px 4px;
            border-radius: 12px;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            gap: 3px;
            font-size: 0.82rem;
            width: 100%;
            box-sizing: border-box;
          }
          .category-btn svg {
            width: 16px;
            height: 16px;
          }
          .category-btn span:first-of-type {
            font-size: 0.82rem;
            line-height: 1.2;
            font-weight: 700;
          }
          .category-badge-chip {
            font-size: 0.65rem;
            padding: 2px 6px;
            letter-spacing: 0;
            white-space: nowrap;
            border-radius: 8px;
          }

          /* Controls row on mobile */
          .menu-controls-row {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-bottom: 18px;
            padding-bottom: 12px;
          }
          .actions-sub-group {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .view-mode-toggle {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
          }
          .view-btn {
            justify-content: center;
            padding: 8px;
            font-size: 0.8rem;
          }
          .download-flyer-btn {
            width: 100%;
            justify-content: center;
            padding: 10px;
            font-size: 0.82rem;
            box-sizing: border-box;
          }

          /* Cards on mobile */
          .banquet-cards-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .pkg-card {
            padding: 20px 15px 16px;
            border-radius: 14px;
          }
          .pkg-title {
            font-size: 1.25rem;
            min-height: auto;
          }
          .pkg-tagline {
            min-height: auto;
            margin-bottom: 10px;
          }
          .pkg-price-amount {
            font-size: 1.75rem;
          }
          .pkg-features-list {
            gap: 6px;
          }
          .pkg-feature-item {
            font-size: 0.82rem;
          }

          /* Comparison Table on Mobile */
          .table-mobile-helpers {
            display: flex;
          }
          .comparison-table-wrapper {
            border-radius: 16px;
            margin-top: 6px;
          }
          .comp-table {
            min-width: 580px;
          }
          .comp-table th, .comp-table td {
            padding: 12px 10px;
            font-size: 0.82rem;
          }
          .comp-table th.col-feature,
          .comp-table td.comp-cat-title {
            width: 125px;
            min-width: 125px;
            max-width: 125px;
            font-size: 0.78rem;
            padding: 12px 8px;
          }
          .comp-pkg-name {
            font-size: 0.95rem;
          }
          .comp-price-pill {
            font-size: 1.05rem;
            padding: 3px 10px;
          }
          .comp-cell-content {
            font-size: 0.8rem;
            min-width: 135px;
            padding: 10px 8px;
          }

          /* Amenities strip on mobile */
          .banquet-bottom-strip {
            padding: 28px 18px;
            border-radius: 18px;
            margin-top: 35px;
          }
          .amenities-list {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .coordinator-card {
            padding: 20px 14px;
          }
          .coordinator-name {
            font-size: 1.4rem;
          }
          .btn-coord-call, .btn-coord-wa {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="banquet-menu-inner">
        {/* ── HEADER ── */}
        <div className="menu-hero-header">
          <div className="menu-pill-subtitle">
            <Sparkles size={14} /> Curated Catering & Celebration Menus
          </div>
          <h2 className="menu-main-title">
            Banquet & Kitty Party <em>Packages</em>
          </h2>
          <p className="menu-desc">
            Host unforgettable gatherings at Krishna Sheesh Mahal Kota. Discover our authentic
            Rajasthani spreads, vibrant street-food chaat feasts, and lavish unlimited royal banquet buffets.
          </p>

          {/* ── INTERACTIVE CATEGORY SELECTOR ── */}
          <div className="category-switcher" role="tablist">
            <button
              className={`category-btn ${activeTab === "party" ? "active" : ""}`}
              onClick={() => setActiveTab("party")}
              role="tab"
              aria-selected={activeTab === "party"}
            >
              <Crown size={16} />
              <span>Party & Banquet Menus</span>
              <span className="category-badge-chip">₹350 – ₹600 • Unlimited</span>
            </button>
            <button
              className={`category-btn ${activeTab === "kitty" ? "active" : ""}`}
              onClick={() => setActiveTab("kitty")}
              role="tab"
              aria-selected={activeTab === "kitty"}
            >
              <PartyPopper size={16} />
              <span>Kitty Party Menus</span>
              <span className="category-badge-chip">₹299 – ₹350</span>
            </button>
          </div>
        </div>

        {/* ── VIEW CONTROLS & DOWNLOAD FLYER ── */}
        <div className="menu-controls-row">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1A1311" }}>
              {activeTab === "party" ? "Banquet Unlimited Feasts" : "Kitty Party Curated Packages"}
            </span>
            <span style={{ fontSize: "0.85rem", color: "#8C2633", fontWeight: 600 }}>
              ({currentPackages.length} Packages Available)
            </span>
          </div>

          <div className="actions-sub-group">
            {/* View Mode Toggle */}
            <div className="view-mode-toggle">
              <button
                className={`view-btn ${viewMode === "cards" ? "active" : ""}`}
                onClick={() => setViewMode("cards")}
                title="View as Cards"
              >
                <Grid size={15} /> Card View
              </button>
              <button
                className={`view-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="View Comparison Matrix"
              >
                <TableProperties size={15} /> Compare Table
              </button>
            </div>

            {/* Official PDF Download Link */}
            <a
              href={activeTab === "party" ? BANQUET_CONTACT.partyMenuPdf : BANQUET_CONTACT.kittyMenuPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="download-flyer-btn"
              title="Download original printed menu flyer"
            >
              <FileDown size={15} />
              <span>Download PDF Flyer</span>
            </a>
          </div>
        </div>

        {/* ── CARD VIEW ENCLOSED IN SINGLE ROYAL FRAME ── */}
        {viewMode === "cards" ? (
          <div className="banquet-single-frame">
            {/* Top Frame Banner */}
            <div className="single-frame-topbar">
              <div className="frame-crest-title">
                <Crown size={15} />
                <span>{activeTab === "party" ? "Rajputana Royal Banquet Feasts" : "Curated Kitty Party Celebrations"}</span>
                <span className="frame-crest-sep">•</span>
                <span className="frame-crest-sub">All-Inclusive Luxury Dining Spread</span>
              </div>
              <div className="frame-highlights-pills">
                <span className="frame-highlight-pill">
                  <Check size={12} color="#C51D24" /> 100% Pure Veg
                </span>
                <span className="frame-highlight-pill">
                  <Sparkles size={12} color="#C5A059" /> Unlimited Refills
                </span>
                <span className="frame-highlight-pill">
                  <Utensils size={12} color="#C51D24" /> Live Kitchen
                </span>
              </div>
            </div>

            <div className="banquet-cards-grid">
            {currentPackages.map((pkg) => {
              const isExpanded = expandedId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`pkg-card ${pkg.isPopular ? "popular" : ""}`}
                >
                  {/* Floating Badge */}
                  {pkg.badge && (
                    <div className="pkg-floating-badge">
                      {pkg.isPopular && <Star size={11} fill="currentColor" />}
                      {pkg.badge}
                    </div>
                  )}

                  {/* Header Row */}
                  <div className="pkg-header">
                    <span className="pkg-menu-no">
                      <Utensils size={14} /> {pkg.menuNo}
                    </span>
                    {pkg.unlimitedMeal && (
                      <span className="pkg-unlimited-pill">
                        <Sparkles size={11} /> Unlimited Meal
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="pkg-title">{pkg.name}</h3>
                  <p className="pkg-tagline">{pkg.tagline}</p>

                  {/* Price Tag */}
                  <div className="pkg-price-box">
                    <div>
                      <span className="pkg-price-amount">{pkg.priceFormatted}</span>
                    </div>
                    <span className="pkg-price-label">Per Guest</span>
                  </div>

                  {/* Curated Highlights */}
                  <ul className="pkg-features-list">
                    {/* Welcome Drink */}
                    <li className="pkg-feature-item">
                      <span className="pkg-feature-icon">
                        <Coffee size={12} />
                      </span>
                      <div>
                        <strong>Drink:</strong> {pkg.welcomeDrink}
                      </div>
                    </li>

                    {/* Starters */}
                    <li className="pkg-feature-item">
                      <span className="pkg-feature-icon">
                        <Flame size={12} />
                      </span>
                      <div>
                        <strong>Starters ({pkg.startersCount}):</strong>{" "}
                        {activeTab === "kitty"
                          ? "Spring Roll, Hara Bhara Kabab, Pakoda, Crispy Corn, Honey Chilli Potato (Any 2)"
                          : pkg.starters.join(" • ")}
                      </div>
                    </li>

                    {/* Main Course */}
                    <li className="pkg-feature-item">
                      <span className="pkg-feature-icon">
                        <Utensils size={12} />
                      </span>
                      <div>
                        <strong>Main Course:</strong> {pkg.mainCourse.join(" • ")}
                      </div>
                    </li>

                    {/* Breads & Rice */}
                    <li className="pkg-feature-item">
                      <span className="pkg-feature-icon">
                        <Check size={12} />
                      </span>
                      <div>
                        <strong>Breads & Rice:</strong> {pkg.breads}{" "}
                        {pkg.rice !== "-" && `• ${pkg.rice}`}
                      </div>
                    </li>

                    {/* Desserts */}
                    <li className="pkg-feature-item">
                      <span className="pkg-feature-icon">
                        <Sparkles size={12} />
                      </span>
                      <div>
                        <strong>Desserts:</strong> {pkg.dessert}
                        {pkg.iceCream && pkg.iceCream !== "-" && ` + ${pkg.iceCream}`}
                        {pkg.premiumDessert && pkg.premiumDessert !== "-" && (
                          <span style={{ color: "#8C2633", fontWeight: 600 }}>
                            {" "}
                            + {pkg.premiumDessert}
                          </span>
                        )}
                      </div>
                    </li>

                    {/* Mouth Freshener if present */}
                    {pkg.mouthFreshener && pkg.mouthFreshener !== "-" && (
                      <li className="pkg-feature-item">
                        <span className="pkg-feature-icon">
                          <Check size={12} />
                        </span>
                        <div>
                          <strong>Special Touch:</strong> {pkg.mouthFreshener}
                        </div>
                      </li>
                    )}
                  </ul>

                  {/* Expandable Course Breakdown */}
                  {isExpanded && (
                    <div className="pkg-details-drawer">
                      <div className="drawer-row">
                        <div className="drawer-label">
                          <Coffee size={12} /> Welcome Drink
                        </div>
                        <div className="drawer-val">{pkg.welcomeDrink}</div>
                      </div>
                      <div className="drawer-row">
                        <div className="drawer-label">
                          <Flame size={12} /> Appetizers & Starters
                        </div>
                        <div className="drawer-val">
                          {pkg.starters.join(", ")}
                          {pkg.startersNote && (
                            <div style={{ fontSize: "0.76rem", color: "#8C2633", marginTop: 2 }}>
                              *{pkg.startersNote}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="drawer-row">
                        <div className="drawer-label">
                          <Utensils size={12} /> Main Course Spread
                        </div>
                        <div className="drawer-val">{pkg.mainCourse.join(", ")}</div>
                      </div>
                      <div className="drawer-row">
                        <div className="drawer-label">Salad & Raita</div>
                        <div className="drawer-val">
                          Salad: {pkg.salad} | Curd: {pkg.curd}
                        </div>
                      </div>
                      <div className="drawer-row">
                        <div className="drawer-label">Breads & Rice</div>
                        <div className="drawer-val">
                          Breads: {pkg.breads} | Rice: {pkg.rice}
                        </div>
                      </div>
                      <div className="drawer-row">
                        <div className="drawer-label">Accompaniments</div>
                        <div className="drawer-val">{pkg.accompaniments}</div>
                      </div>
                      <div className="drawer-row">
                        <div className="drawer-label">Dessert & Sweets</div>
                        <div className="drawer-val">
                          {pkg.dessert}
                          {pkg.iceCream !== "-" && ` | Ice Cream: ${pkg.iceCream}`}
                          {pkg.premiumDessert !== "-" && ` | Premium Sweets: ${pkg.premiumDessert}`}
                        </div>
                      </div>
                      {pkg.mouthFreshener !== "-" && (
                        <div className="drawer-row">
                          <div className="drawer-label">Mouth Freshener</div>
                          <div className="drawer-val">{pkg.mouthFreshener}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action CTAs */}
                  <div className="pkg-cta-stack">
                    <button
                      className="btn-book-pkg"
                      onClick={() => {
                        if (onBookNow) {
                          onBookNow("Banquet");
                        } else {
                          window.open(getWhatsAppUrl(pkg), "_blank");
                        }
                      }}
                    >
                      <PartyPopper size={16} /> Book This Package
                    </button>

                    <button
                      className="btn-toggle-details"
                      onClick={() => toggleExpand(pkg.id)}
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={14} /> Hide Detailed Breakdown
                        </>
                      ) : (
                        <>
                          <ChevronDown size={14} /> View Complete Course Menu
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
            </div>

            {/* Integrated Frame Bottom Footnote Bar */}
            <div className="single-frame-bottombar">
              <div className="frame-bottom-note">
                <HeartHandshake size={15} color="#C51D24" />
                <span>
                  <strong>Guest Guarantee:</strong> 100% Pure Vegetarian dining. Jain & No Onion-Garlic preparations available on request. Additional customized dishes charged extra.
                </span>
              </div>
              <div className="frame-bottom-cta">
                <span style={{ fontSize: "0.8rem", color: "#6C5D58", fontWeight: 500 }}>Custom guest count or menu?</span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="frame-wa-link"
                >
                  <MessageCircle size={13} /> Chat with Banquet Chef
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* ── COMPARISON TABLE VIEW ── */
          <div>
            {/* Mobile helper jumper and swipe cue */}
            <div className="table-mobile-helpers">
              <div className="table-swipe-cue">
                <Sparkles size={13} />
                <span>Swipe table horizontally or tap to jump:</span>
              </div>
              <div className="table-col-jumper">
                {currentPackages.map((pkg, idx) => (
                  <button
                    key={pkg.id}
                    className="col-jump-btn"
                    onClick={() => scrollTableTo(idx)}
                  >
                    {pkg.menuNo} ({pkg.priceFormatted})
                  </button>
                ))}
              </div>
            </div>

            <div className="comparison-table-wrapper" id="banquet-table-scroll">
              <table className="comp-table">
                <thead>
                  <tr>
                    <th className="col-feature">Course Category</th>
                    {currentPackages.map((pkg) => (
                      <th key={pkg.id}>
                        <div className="comp-col-header">
                          <div className="comp-badge-no">{pkg.menuNo}</div>
                          <div className="comp-pkg-name">{pkg.name}</div>
                          <div className="comp-price-pill">{pkg.priceFormatted}</div>
                          {pkg.unlimitedMeal && (
                            <div style={{ marginTop: "6px" }}>
                              <span className="pkg-unlimited-pill">
                                <Sparkles size={11} /> Unlimited Meal
                              </span>
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Welcome Drink */}
                  <tr>
                    <td className="comp-cat-title">
                      <Coffee size={15} /> Welcome Drink
                    </td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.welcomeDrink}
                      </td>
                    ))}
                  </tr>

                  {/* Starters */}
                  <tr>
                    <td className="comp-cat-title">
                      <Flame size={15} /> Starters & Appetizers
                    </td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        <div style={{ fontWeight: 700, color: "#8C2633", marginBottom: 4 }}>
                          {pkg.startersCount}
                        </div>
                        <div style={{ fontSize: "0.85rem" }}>
                          {activeTab === "kitty"
                            ? "Spring Roll, Hara Bhara Kabab, Veg Pakoda, Crispy Corn, Honey Chilli Potato (Any 2)"
                            : pkg.starters.join(" • ")}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Main Course */}
                  <tr>
                    <td className="comp-cat-title">
                      <Utensils size={15} /> Main Course
                    </td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.mainCourse.map((dish, i) => (
                          <div key={i} style={{ marginBottom: 3 }}>
                            • {dish}
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                  {/* Salad */}
                  <tr>
                    <td className="comp-cat-title">Salad Preparation</td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.salad !== "-" ? pkg.salad : <span className="comp-dash">-</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Curd */}
                  <tr>
                    <td className="comp-cat-title">Curd / Raita</td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.curd !== "-" ? pkg.curd : <span className="comp-dash">-</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Rice */}
                  <tr>
                    <td className="comp-cat-title">Rice Preparation</td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.rice !== "-" ? pkg.rice : <span className="comp-dash">-</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Indian Bread */}
                  <tr>
                    <td className="comp-cat-title">Indian Breads</td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.breads !== "-" ? pkg.breads : <span className="comp-dash">-</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Accompaniments */}
                  <tr>
                    <td className="comp-cat-title">Accompaniments</td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.accompaniments !== "-" ? pkg.accompaniments : <span className="comp-dash">-</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Hot Dessert */}
                  <tr>
                    <td className="comp-cat-title">Dessert (Sweets)</td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.dessert !== "-" ? pkg.dessert : <span className="comp-dash">-</span>}
                      </td>
                    ))}
                  </tr>

                  {/* Ice Cream */}
                  <tr>
                    <td className="comp-cat-title">Ice Cream</td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.iceCream && pkg.iceCream !== "-" ? (
                          pkg.iceCream
                        ) : (
                          <span className="comp-dash">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Premium Sweets */}
                  <tr>
                    <td className="comp-cat-title">Premium Sweets</td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.premiumDessert && pkg.premiumDessert !== "-" ? (
                          <span style={{ color: "#8C2633", fontWeight: 700 }}>
                            {pkg.premiumDessert}
                          </span>
                        ) : (
                          <span className="comp-dash">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Mouth Freshener */}
                  <tr>
                    <td className="comp-cat-title">Mouth Freshener</td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} className="comp-cell-content">
                        {pkg.mouthFreshener && pkg.mouthFreshener !== "-" ? (
                          pkg.mouthFreshener
                        ) : (
                          <span className="comp-dash">-</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Table Footer CTA */}
                  <tr>
                    <td></td>
                    {currentPackages.map((pkg) => (
                      <td key={pkg.id} style={{ textAlign: "center", padding: "16px 10px" }}>
                        <button
                          className="btn-book-pkg"
                          style={{ padding: "10px 14px", fontSize: "0.85rem" }}
                          onClick={() => {
                            if (onBookNow) {
                              onBookNow("Banquet");
                            } else {
                              window.open(getWhatsAppUrl(pkg), "_blank");
                            }
                          }}
                        >
                          Book {pkg.menuNo}
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === "table" && (
          <div className="extra-charge-notice">
            <HeartHandshake size={15} color="#C51D24" />
            <span>
              <strong>Note:</strong> Additional items charged extra. Customized menus and Jain / No Onion-Garlic preparations are readily available on request.
            </span>
          </div>
        )}

        {/* ── BANQUET HALL AMENITIES & CONCIERGE STRIP ── */}
        <div className="banquet-bottom-strip">
          <div className="bottom-strip-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#FFD78C", marginBottom: "8px" }}>
                <Crown size={18} />
                <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>
                  Royal Venue Amenities Included
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-2, serif)", fontSize: "1.9rem", margin: "0 0 16px 0", color: "#FFF" }}>
                Everything You Need For A Flawless Event
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: "24px" }}>
                Host between 50 to 80 guests in a lavish, climate-controlled setting tailored with bespoke decor, professional sound, and personal banquet concierges.
              </p>

              <div className="amenities-list">
                <div className="amenity-chip">
                  <div className="amenity-icon-box">
                    <Wind size={18} />
                  </div>
                  <div>
                    <h5>Central Air Conditioning</h5>
                    <p>Luxurious climate control for year-round celebrations</p>
                  </div>
                </div>

                <div className="amenity-chip">
                  <div className="amenity-icon-box">
                    <Volume2 size={18} />
                  </div>
                  <div>
                    <h5>DJ & Audio System</h5>
                    <p>High-definition party sound & dynamic lighting support</p>
                  </div>
                </div>

                <div className="amenity-chip">
                  <div className="amenity-icon-box">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h5>Royal Decor & Themes</h5>
                    <p>Tailored stage setups, photo backdrops & floral accents</p>
                  </div>
                </div>

                <div className="amenity-chip">
                  <div className="amenity-icon-box">
                    <Utensils size={18} />
                  </div>
                  <div>
                    <h5>Fresh Kitchen Preparation</h5>
                    <p>Pure Desi Ghee recipes served piping hot to your guests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Coordinator Contact Card */}
            <div className="coordinator-card">
              <div className="coordinator-title">Banquet & Kitty Concierge</div>
              <div className="coordinator-name">Mr. {BANQUET_CONTACT.coordinator}</div>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.85rem", marginBottom: "18px", lineHeight: 1.4 }}>
                Ready to plan your menu tasting or reserve your date? Speak directly with our dedicated event manager.
              </p>
              <div className="coord-btns">
                <a href={`tel:${BANQUET_CONTACT.phone}`} className="btn-coord-call">
                  <Phone size={14} /> Call {BANQUET_CONTACT.phone}
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-coord-wa"
                >
                  <MessageCircle size={14} /> WhatsApp Inquiry
                </a>
              </div>
              <div style={{ marginTop: "14px", fontSize: "0.78rem", color: "rgba(255, 255, 255, 0.55)" }}>
                Hotel Front Desk: <a href={`tel:${BANQUET_CONTACT.hotelPhone}`} style={{ color: "#FFD78C", textDecoration: "none" }}>{BANQUET_CONTACT.hotelPhone}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
