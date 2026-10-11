import { useEffect, useRef, useState, useCallback } from "react";
import { PageFlip } from "page-flip";
import {
  BOOK_NAV_TABS,
  BOOK_PAGES,
} from "../../data/bookMenuData";
import "./BookFlipMenu.css";

export default function BookFlipMenu() {
  const mountRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() => 
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(16);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(() => 
    typeof window !== "undefined" && window.innerWidth <= 768 ? "portrait" : "landscape"
  );
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      const mob = window.innerWidth <= 768;
      setIsMobile(mob);
      if (mob) {
        setOrientation("portrait");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    const el = document.querySelector(".book-flip-viewport") as HTMLElement;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Listen for fullscreen change
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Jump to specific page
  const flipTo = useCallback((pageIndex: number) => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flip(pageIndex, "top");
    }
  }, []);

  const flipNext = useCallback(() => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipNext("top");
    }
  }, []);

  const flipPrev = useCallback(() => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev("top");
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") {
        flipNext();
      } else if (e.key === "ArrowLeft") {
        flipPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipNext, flipPrev]);

  // Initialize PageFlip instance
  useEffect(() => {
    const container = mountRef.current;
    const template = templateRef.current;
    if (!container || !template) return;

    container.innerHTML = "";

    const bookDiv = document.createElement("div");
    bookDiv.className = "book-flip-host";
    container.appendChild(bookDiv);

    // Clone pages from template
    const rawPages = Array.from(template.children);
    const pagesToLoad = rawPages.map((child) => child.cloneNode(true) as HTMLElement);

    const isMob = window.innerWidth <= 768;
    const baseW = isMob ? Math.min(window.innerWidth - 24, 380) : 490;
    const baseH = isMob ? Math.min(Math.round(baseW * 1.46), 570) : 690;

    // Create PageFlip with responsive parameters
    const pf = new PageFlip(bookDiv, {
      width: baseW,
      height: baseH,
      size: "stretch",
      minWidth: isMob ? 280 : 340,
      maxWidth: isMob ? 420 : 560,
      minHeight: isMob ? 480 : 540,
      maxHeight: isMob ? 620 : 760,
      drawShadow: true,
      flippingTime: 700,
      usePortrait: true,
      startZIndex: 10,
      autoSize: true,
      maxShadowOpacity: 0.6,
      showCover: true,
      mobileScrollSupport: true,
      clickEventForward: true,
      useMouseEvents: true,
      showPageCorners: true,
      disableFlipByClick: false,
      swipeDistance: 25,
    });

    pf.on("flip", (e: { data: number }) => {
      setCurrentPage(e.data);
    });

    pf.on("changeOrientation", (e: { data: "portrait" | "landscape" }) => {
      setOrientation(e.data);
    });

    pf.on("init", (e: { data: { mode: "portrait" | "landscape" } }) => {
      if (e?.data?.mode) {
        setOrientation(e.data.mode);
      }
    });

    pf.loadFromHTML(pagesToLoad);
    pageFlipRef.current = pf;
    setTotalPages(pf.getPageCount());

    try {
      const initialMode = pf.getOrientation();
      if (initialMode) {
        setOrientation(initialMode);
      } else if (isMob) {
        setOrientation("portrait");
      }
    } catch {}

    // Delegated click handler on bookDiv for interactive elements
    const handleBookClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for TOC jump row
      const jumpRow = target.closest<HTMLElement>("[data-action='jump-page']");
      if (jumpRow) {
        e.stopPropagation();
        const targetPage = jumpRow.getAttribute("data-target-page");
        if (targetPage !== null) {
          const pageNum = parseInt(targetPage, 10);
          if (!isNaN(pageNum)) {
            pf.flip(pageNum, "top");
          }
        }
        return;
      }

      // Check for Front Cover "Open Compendium" button
      const openBtn = target.closest<HTMLElement>("[data-action='open-book']");
      if (openBtn) {
        e.stopPropagation();
        pf.flipNext("top");
        return;
      }
    };

    bookDiv.addEventListener("click", handleBookClick);

    return () => {
      bookDiv.removeEventListener("click", handleBookClick);
      try {
        pf.destroy();
      } catch {
        // Ignored
      }
      pageFlipRef.current = null;
    };
  }, []);

  // Determine active category for top tab bar
  const getActiveTab = () => {
    if (currentPage === 0) return 0;
    if (currentPage >= 1 && currentPage <= 2) return 1;
    for (let i = BOOK_NAV_TABS.length - 1; i >= 0; i--) {
      if (currentPage >= BOOK_NAV_TABS[i].pageIndex) {
        return BOOK_NAV_TABS[i].pageIndex;
      }
    }
    return 0;
  };
  const activeTabPageIndex = getActiveTab();

  // Dynamic transform to center the cover in a SINGLE FRAME when closed ONLY on desktop landscape dual-page spread
  const frameShiftStyle = (!isMobile && orientation === "landscape")
    ? currentPage === 0
      ? { transform: "translateX(-25%)" }
      : currentPage === totalPages - 1
      ? { transform: "translateX(25%)" }
      : { transform: "translateX(0)" }
    : { transform: "none" };

  return (
    <section id="restaurant-menu" className="book-flip-viewport" aria-label="3D Interactive Restaurant Menu">
      {/* ── LIGHTING EFFECTS: Overhead Spotlight & Ambient Candle Warmth ── */}
      <div className="book-overhead-spotlight" aria-hidden="true"></div>
      <div className="book-ambient-warmth" aria-hidden="true"></div>

      {/* ── CLEAN, AESTHETIC SECTION HEADER ── */}
      <div className="book-menu-hero-header">
        <p className="book-menu-hero-eyebrow">ROYAL FINE DINING</p>
        <h2 className="book-menu-hero-title">Culinary Compendium</h2>
        <p className="book-menu-hero-subtitle">Krishna Sheesh Mahal · Kota</p>
      </div>

      {/* ── TOP CATEGORY NAVIGATION TABS ── */}
      <div className="book-nav-tabs-wrapper">
        <div className="book-nav-tabs-scroll" role="tablist">
          {BOOK_NAV_TABS.map((tab) => {
            const isActive = tab.pageIndex === activeTabPageIndex;
            return (
              <button
                key={tab.pageIndex}
                role="tab"
                aria-selected={isActive}
                type="button"
                className={`book-nav-tab-btn ${isActive ? "is-active" : ""}`}
                onClick={() => flipTo(tab.pageIndex)}
              >
                <span className="book-tab-icon-wrap">{renderTabIcon(tab.iconId)}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STAGE CONTAINER ── */}
      <div className="book-stage-container">
        {/* Discrete Spine Bookmark Tag (Sitting strictly above spine, never overlapping text) */}
        {currentPage > 0 && currentPage < totalPages - 1 && (
          <div
            className="book-spine-marker-tab"
            onClick={() => flipTo(1)}
            title="Jump to Table of Contents"
            role="button"
            tabIndex={0}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              {renderTabIcon("contents")}
              Contents
            </span>
          </div>
        )}

        {/* Master Book Frame with Table Drop Shadow & Smooth Single-Frame Centering */}
        <div className="book-master-frame" style={frameShiftStyle}>
          <div className="book-table-shadow"></div>

          {/* Central Spine Shadow overlay strictly in desktop landscape dual-page mode */}
          {!isMobile && orientation === "landscape" && currentPage > 0 && currentPage < totalPages - 1 && (
            <div className="book-central-spine is-landscape"></div>
          )}

          {/* Mount point for PageFlip */}
          <div ref={mountRef} style={{ width: "100%", display: "flex", justifyContent: "center" }} />
        </div>
      </div>

      {/* ── MINIMALIST AESTHETIC BOTTOM CONTROLS ── */}
      <div className="book-control-dock">
        {/* Navigation Arrows & Folio Indicator */}
        <div className="book-dock-nav-group">
          <button
            type="button"
            className="book-dock-arrow-btn"
            onClick={flipPrev}
            disabled={currentPage <= 0}
            title="Previous Page (←)"
            aria-label="Previous Page"
          >
            {renderChevronLeftSVG()}
          </button>

          <span className="book-dock-page-indicator">
            {currentPage === 0
              ? "Cover"
              : currentPage === totalPages - 1
              ? "Back Cover"
              : orientation === "landscape"
              ? `Pages ${currentPage}–${currentPage + 1} of ${totalPages}`
              : `Page ${currentPage} of ${totalPages}`}
          </span>

          <button
            type="button"
            className="book-dock-arrow-btn"
            onClick={flipNext}
            disabled={currentPage >= totalPages - 1}
            title="Next Page (→)"
            aria-label="Next Page"
          >
            {renderChevronRightSVG()}
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          className={`book-dock-action-btn ${isFullscreen ? "is-active" : ""}`}
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
        >
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {isFullscreen ? renderFullscreenExitSVG() : renderFullscreenEnterSVG()}
          </span>
          <span>{isFullscreen ? "Exit Full" : "Fullscreen"}</span>
        </button>
      </div>

      {/* =========================================================================
          HIDDEN HTML TEMPLATES (Cloned by PageFlip into canvas/DOM)
          ========================================================================= */}
      <div ref={templateRef} style={{ display: "none" }}>
        {/* ── PAGE 0: FRONT COVER (HARDCOVER - SINGLE FRAME) ── */}
        <div className="book-page-unit" data-density="hard">
          <div className="book-hardcover">
            <div className="brass-corner brass-corner-tl">{renderBrassCornerSVG()}</div>
            <div className="brass-corner brass-corner-tr">{renderBrassCornerSVG()}</div>
            <div className="brass-corner brass-corner-bl">{renderBrassCornerSVG()}</div>
            <div className="brass-corner brass-corner-br">{renderBrassCornerSVG()}</div>

            <div className="book-cover-stitch-border"></div>
            <div className="book-cover-inner-frame"></div>

            {/* Crest & Title */}
            <div className="book-cover-crest-container">
              <div className="book-cover-royal-crest">{renderRoyalCrestSVG()}</div>
              <h1 className="book-cover-hotel-title">
                Krishna<br />Sheeshmahal
              </h1>
              <p className="book-cover-hotel-sub">Hotel & Restaurant · Kota</p>
              <svg className="book-cover-divider-flourish" viewBox="0 0 100 10" fill="none">
                <path d="M0 5 Q25 0 50 5 Q75 10 100 5" stroke="#C59D3A" strokeWidth="1.2" />
                <circle cx="50" cy="5" r="2.5" fill="#C59D3A" />
              </svg>
            </div>

            {/* Center Foil Stamped Badge */}
            <div className="book-cover-center-badge">
              <span className="book-cover-pill-text">AUTHENTIC CULINARY HERITAGE</span>
              <div className="book-cover-compendium-title">THE GRAND MENU</div>
              <p style={{ fontSize: "0.78rem", color: "#E9D29F", marginTop: "4px", letterSpacing: "0.1em" }}>
                ESTABLISHED 2012 · RAJASTHAN
              </p>
            </div>

            {/* Footer Prompt */}
            <div className="book-cover-footer-note">
              <button type="button" className="book-cover-cta-open" data-action="open-book">
                <span>OPEN COMPENDIUM</span>
                <span style={{ display: "inline-flex", alignItems: "center" }}>{renderChevronRightSVG()}</span>
              </button>
              <div className="book-cover-corner-hint">Click corner or drag to open</div>
            </div>
          </div>
        </div>

        {/* ── PAGE 1: TABLE OF CONTENTS (PART 1) ── */}
        <div className="book-page-unit" data-density="soft">
          <div className="book-parchment-page page-left">
            <div className="book-page-ornament-border"></div>
            <div className="page-corner-flourish pcf-tl">{renderCornerFlourishSVG()}</div>
            <div className="page-corner-flourish pcf-tr">{renderCornerFlourishSVG()}</div>
            <div className="page-corner-flourish pcf-bl">{renderCornerFlourishSVG()}</div>
            <div className="page-corner-flourish pcf-br">{renderCornerFlourishSVG()}</div>

            <div className="book-toc-header">
              <div style={{ width: "32px", height: "32px", margin: "0 auto 6px" }}>{renderMiniCrestSVG()}</div>
              <h2 className="book-toc-title">Table of Contents</h2>
              <p className="book-toc-subtitle">A curated journey through royal flavors</p>
              <svg className="book-header-line-flourish" viewBox="0 0 100 6" fill="none">
                <path d="M0 3 L40 3 M60 3 L100 3" stroke="#C59D3A" strokeWidth="1" />
                <circle cx="50" cy="3" r="2" fill="#8C2633" />
              </svg>
            </div>

            <div className="book-toc-list">
              <div className="book-toc-row" data-action="jump-page" data-target-page="3">
                <div className="book-toc-left">
                  <span className="book-toc-roman">I.</span>
                  <span>Soups & Signature Mocktails</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page I</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="4">
                <div className="book-toc-left">
                  <span className="book-toc-roman">II.</span>
                  <span>Beverages & Tandoori Starters</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page II</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="5">
                <div className="book-toc-left">
                  <span className="book-toc-roman">III.</span>
                  <span>Indo-Chinese & Asian Wok</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page III</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="6">
                <div className="book-toc-left">
                  <span className="book-toc-roman">IV.</span>
                  <span>Raitas, Fresh Salads & Papad</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page IV</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="7">
                <div className="book-toc-left">
                  <span className="book-toc-roman">V.</span>
                  <span>Royal Paneer Specialties (Chef's Special)</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page V</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="8">
                <div className="book-toc-left">
                  <span className="book-toc-roman">VI.</span>
                  <span>Desi Tadka & Heritage Curries</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page VI</span>
              </div>
            </div>

            <div className="book-chef-note-card">
              <div className="book-chef-note-title">100% PURE VEGETARIAN</div>
              <p className="book-chef-note-p">
                Prepared with highest standards of culinary hygiene, premium Amul dairy & pure Desi Ghee.
              </p>
            </div>

            <div className="book-page-footer">
              <span className="book-page-folio-number">· COMPENDIUM I ·</span>
              <span className="book-page-folio-label">KRISHNA SHEESH MAHAL</span>
            </div>
          </div>
        </div>

        {/* ── PAGE 2: TABLE OF CONTENTS (PART 2) & CHEF'S NOTE ── */}
        <div className="book-page-unit" data-density="soft">
          <div className="book-parchment-page page-right">
            <div className="book-page-ornament-border"></div>
            <div className="page-corner-flourish pcf-tl">{renderCornerFlourishSVG()}</div>
            <div className="page-corner-flourish pcf-tr">{renderCornerFlourishSVG()}</div>
            <div className="page-corner-flourish pcf-bl">{renderCornerFlourishSVG()}</div>
            <div className="page-corner-flourish pcf-br">{renderCornerFlourishSVG()}</div>

            <div className="book-toc-header">
              <h2 className="book-toc-title">Table of Contents</h2>
              <p className="book-toc-subtitle">Breads, feasts & sweet endings</p>
              <svg className="book-header-line-flourish" viewBox="0 0 100 6" fill="none">
                <path d="M0 3 L40 3 M60 3 L100 3" stroke="#C59D3A" strokeWidth="1" />
                <circle cx="50" cy="3" r="2" fill="#8C2633" />
              </svg>
            </div>

            <div className="book-toc-list">
              <div className="book-toc-row" data-action="jump-page" data-target-page="9">
                <div className="book-toc-left">
                  <span className="book-toc-roman">VII.</span>
                  <span>Royal Kaju, Kofta & Slow Dal</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page VII</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="10">
                <div className="book-toc-left">
                  <span className="book-toc-roman">VIII.</span>
                  <span>Basmati Rice & Indian Breads</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page VIII</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="11">
                <div className="book-toc-left">
                  <span className="book-toc-roman">IX.</span>
                  <span>Pastas, Burgers & Pizzeria</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page IX</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="12">
                <div className="book-toc-left">
                  <span className="book-toc-roman">X.</span>
                  <span>South Indian & Mini Meals</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page X</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="13">
                <div className="book-toc-left">
                  <span className="book-toc-roman">XI.</span>
                  <span>Royal Thalis & Winter Specials</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page XI</span>
              </div>

              <div className="book-toc-row" data-action="jump-page" data-target-page="14">
                <div className="book-toc-left">
                  <span className="book-toc-roman">XII.</span>
                  <span>Royal Desserts & Ice Cream Cakes</span>
                </div>
                <div className="book-toc-dots"></div>
                <span className="book-toc-page-num">Page XII</span>
              </div>
            </div>

            <div className="book-chef-note-card">
              <div className="book-chef-note-title">CULINARY PHILOSOPHY</div>
              <p className="book-chef-note-p">
                "Our kitchens honor the rich royal gastronomy of Rajasthan. Each recipe is slow-tempered, infused with heritage spices, and served with royal hospitality."
              </p>
              <div className="book-chef-sign">Executive Chef & Kitchen Team</div>
            </div>

            <div className="book-page-footer">
              <span className="book-page-folio-number">· COMPENDIUM II ·</span>
              <span className="book-page-folio-label">HOTEL & RESTAURANT</span>
            </div>
          </div>
        </div>

        {/* ── PAGES 3 TO 14: MENU SPREADS ── */}
        {BOOK_PAGES.map((page, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={page.pageNumber} className="book-page-unit" data-density="soft">
              <div className={`book-parchment-page ${isLeft ? "page-left" : "page-right"}`}>
                <div className="book-page-ornament-border"></div>
                <div className="page-corner-flourish pcf-tl">{renderCornerFlourishSVG()}</div>
                <div className="page-corner-flourish pcf-tr">{renderCornerFlourishSVG()}</div>
                <div className="page-corner-flourish pcf-bl">{renderCornerFlourishSVG()}</div>
                <div className="page-corner-flourish pcf-br">{renderCornerFlourishSVG()}</div>

                <div className="book-page-header">
                  <div className="book-page-category-banner">{page.title}</div>
                  {page.subTitle && <p className="book-page-category-sub">{page.subTitle}</p>}
                  <svg className="book-header-line-flourish" viewBox="0 0 100 6" fill="none">
                    <path d="M0 3 L40 3 M60 3 L100 3" stroke="#C59D3A" strokeWidth="1" />
                    <circle cx="50" cy="3" r="2" fill="#8C2633" />
                  </svg>
                </div>

                <div className="book-page-content">
                  {page.sections.map((section, sIdx) => (
                    <div key={sIdx} className="book-menu-subsection">
                      {section.subTitle && (
                        <div className="book-subsection-title">
                          <span>{section.subTitle}</span>
                        </div>
                      )}
                      {section.items.map((item) => (
                        <div key={item.id} className="book-menu-item-row">
                          <div className="book-menu-item-header">
                            <div className="book-item-left">
                              <span className="veg-dietary-badge" title="Pure Vegetarian"></span>
                              <span className="book-item-name">{item.name}</span>
                              {item.tag && (
                                <span className={`book-item-tag tag-${item.tag.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <div className="book-item-dots"></div>
                            <div className="book-item-right">
                              <span className="book-item-price">{item.price}</span>
                            </div>
                          </div>
                          {item.description && (
                            <p className="book-item-description">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="book-page-footer">
                  <span className="book-page-folio-number">· {page.folio} ·</span>
                  <span className="book-page-folio-label">KRISHNA SHEESH MAHAL</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* ── PAGE 15: BACK COVER (HARDCOVER - SINGLE FRAME) ── */}
        <div className="book-page-unit" data-density="hard">
          <div className="book-hardcover">
            <div className="brass-corner brass-corner-tl">{renderBrassCornerSVG()}</div>
            <div className="brass-corner brass-corner-tr">{renderBrassCornerSVG()}</div>
            <div className="brass-corner brass-corner-bl">{renderBrassCornerSVG()}</div>
            <div className="brass-corner brass-corner-br">{renderBrassCornerSVG()}</div>

            <div className="book-cover-stitch-border"></div>
            <div className="book-cover-inner-frame"></div>

            <div className="book-backcover-content">
              <div className="book-backcover-header">
                <div style={{ width: "60px", height: "60px", margin: "0 auto 10px" }}>
                  {renderRoyalCrestSVG()}
                </div>
                <h3>Krishna Sheesh Mahal</h3>
                <p>Hotel & Fine Dining Restaurant</p>
              </div>

              <div className="book-backcover-info-card">
                <div className="book-backcover-info-row">
                  <span className="book-backcover-info-icon">{renderMapPinSVG()}</span>
                  <div>
                    <strong>Location:</strong> Near RK Puram Circle, Kota, Rajasthan - 324005
                  </div>
                </div>

                <div className="book-backcover-info-row">
                  <span className="book-backcover-info-icon">{renderClockSVG()}</span>
                  <div>
                    <strong>Dining Hours:</strong> 11:00 AM – 11:30 PM (Daily)
                  </div>
                </div>

                <div className="book-backcover-info-row">
                  <span className="book-backcover-info-icon">{renderDeliveryScooterSVG()}</span>
                  <div>
                    <strong>Free Home Delivery:</strong> Within 1.5 km (Min order Rs. 300/-)
                  </div>
                </div>

                <div className="book-backcover-info-row">
                  <span className="book-backcover-info-icon">{renderPhoneCallSVG()}</span>
                  <div>
                    <strong>Reservations & Orders:</strong> +91 91161 39777 / 0744-2470777
                  </div>
                </div>
              </div>

              <div>
                <a href="#restaurant-hero" className="book-backcover-cta-btn">
                  <span>RESERVE YOUR TABLE</span>
                  <span style={{ display: "inline-flex", alignItems: "center" }}>{renderChevronRightSVG()}</span>
                </a>

                <div className="book-backcover-guidelines">
                  <p>• Outside food, alcohol & smoking prohibited.</p>
                  <p>• Banquet halls & private parties welcome.</p>
                  <p style={{ marginTop: "4px", color: "#E9D29F" }}>
                    Thank you for letting us serve you with royal hospitality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SVG ASSETS ──
function renderBrassCornerSVG() {
  return (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brassGrad" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7E2A9" />
          <stop offset="0.4" stopColor="#C59D3A" />
          <stop offset="0.8" stopColor="#9E7922" />
          <stop offset="1" stopColor="#5E430D" />
        </linearGradient>
      </defs>
      <path
        d="M2 2 L48 2 L48 14 C35 14 30 20 28 32 C26 40 20 48 2 48 Z"
        fill="url(#brassGrad)"
        stroke="#5E430D"
        strokeWidth="1"
      />
      <circle cx="8" cy="8" r="2.5" fill="#5E430D" />
      <circle cx="8" cy="8" r="1.5" fill="#F7E2A9" />
      <circle cx="38" cy="8" r="2" fill="#5E430D" />
      <circle cx="8" cy="38" r="2" fill="#5E430D" />
      <path d="M12 12 Q24 16 16 28" stroke="#F7E2A9" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function renderRoyalCrestSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldCrestGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.3" stopColor="#F7E2A9" />
          <stop offset="0.7" stopColor="#C59D3A" />
          <stop offset="1" stopColor="#8C6615" />
        </linearGradient>
      </defs>
      <path
        d="M25 35 L32 20 L50 30 L68 20 L75 35 Z"
        fill="url(#goldCrestGrad)"
        stroke="#8C6615"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="18" r="2" fill="#FFF" />
      <circle cx="50" cy="27" r="2.5" fill="#FFF" />
      <circle cx="68" cy="18" r="2" fill="#FFF" />
      <path
        d="M22 38 C22 68 50 85 50 85 C50 85 78 68 78 38 Z"
        fill="url(#goldCrestGrad)"
        stroke="#8C6615"
        strokeWidth="1.5"
      />
      <polygon points="50,44 65,58 50,72 35,58" fill="#5E202D" stroke="#FFF" strokeWidth="1" />
      <circle cx="50" cy="58" r="4" fill="#F7E2A9" />
    </svg>
  );
}

function renderMiniCrestSVG() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#C59D3A" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="15" stroke="#8C2633" strokeWidth="0.8" strokeDasharray="2 2" />
      <polygon points="20,10 28,24 12,24" fill="#8C2633" />
      <polygon points="20,30 12,16 28,16" fill="#C59D3A" opacity="0.6" />
    </svg>
  );
}

function renderCornerFlourishSVG() {
  return (
    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 28 C2 12 12 2 28 2 M2 20 C2 8 8 2 20 2 M2 12 C2 5 5 2 12 2"
        stroke="#C59D3A"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="4" cy="4" r="1.5" fill="#8C2633" />
    </svg>
  );
}

function renderTabIcon(iconId: string) {
  const props = {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.9",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "book-tab-svg-icon",
  };

  switch (iconId) {
    case "cover":
      return (
        <svg {...props}>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10" />
          <path d="M6 10h8" />
        </svg>
      );
    case "contents":
      return (
        <svg {...props}>
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      );
    case "soups":
      return (
        <svg {...props}>
          <path d="M12 2v3M8 3v2M16 3v2" />
          <path d="M4 10h16a8 8 0 0 1-16 0z" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      );
    case "starters":
      return (
        <svg {...props}>
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
      );
    case "chinese":
      return (
        <svg {...props}>
          <path d="m18 2-7 14M22 2l-7 14" />
          <path d="M3 13a7 7 0 0 0 14 0H3z" />
        </svg>
      );
    case "raita":
      return (
        <svg {...props}>
          <path d="M11 20A7 7 0 0 1 4 13h14a7 7 0 0 1-7 7Z" />
          <path d="M12 4c2.5 0 4.5 2 4.5 4.5 0 2.5-3 5-4.5 5S7.5 11 7.5 8.5C7.5 6 9.5 4 12 4Z" />
        </svg>
      );
    case "paneer":
      return (
        <svg {...props}>
          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5z" />
        </svg>
      );
    case "tadka":
      return (
        <svg {...props}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case "kaju":
      return (
        <svg {...props}>
          <path d="M2 12h20M20 12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-6" />
          <path d="M7 8a5 5 0 0 1 10 0" />
        </svg>
      );
    case "rice":
      return (
        <svg {...props}>
          <path d="M2 12h20a8 8 0 0 1-16 0" />
          <path d="M12 2a4 4 0 0 1 4 4v2H8V6a4 4 0 0 1 4-4z" />
        </svg>
      );
    case "continental":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 10 10H12V2Z" />
          <circle cx="15" cy="7" r="1" fill="currentColor" />
        </svg>
      );
    case "south":
      return (
        <svg {...props}>
          <path d="M18 17H6a6 6 0 0 1 12 0Z" />
          <path d="M12 7v4" />
          <line x1="4" y1="21" x2="20" y2="21" />
          <circle cx="12" cy="5" r="2" />
        </svg>
      );
    case "thali":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="8" cy="9" r="1.5" />
          <circle cx="16" cy="9" r="1.5" />
          <circle cx="12" cy="17" r="1.5" />
        </svg>
      );
    case "desserts":
      return (
        <svg {...props}>
          <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
          <path d="M4 16s2-1 4-1 4 1 4 1 2-1 4-1 4 1 4 1" />
          <path d="M2 21h20" />
          <path d="M7 8v3M12 8v3M17 8v3" />
        </svg>
      );
    case "back":
    default:
      return (
        <svg {...props}>
          <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
      );
  }
}

function renderChevronLeftSVG() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function renderChevronRightSVG() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function renderFullscreenEnterSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <polyline points="21 15 21 21 15 21" />
      <polyline points="3 9 3 3 9 3" />
    </svg>
  );
}

function renderFullscreenExitSVG() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 14 10 14 10 20" />
      <polyline points="20 10 14 10 14 4" />
      <polyline points="14 20 14 14 20 14" />
      <polyline points="10 4 10 10 4 10" />
    </svg>
  );
}

function renderMapPinSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C59D3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function renderClockSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C59D3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function renderDeliveryScooterSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C59D3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18.5" cy="17.5" r="3.5" />
      <circle cx="5.5" cy="17.5" r="3.5" />
      <path d="M15 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </svg>
  );
}

function renderPhoneCallSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C59D3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
