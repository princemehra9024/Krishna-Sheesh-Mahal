import { useMemo } from "react";
import { LOGOS } from "../data";

/**
 * Each logo has its own keyframe: it slides left by N item-widths, then jumps to the
 * far right and continues — an infinite conveyor. animation-delay is tied to the
 * scroll position (--scrolled) so the belt speeds up as you scroll, like the original.
 */
export default function ScrollingLogos() {
  // Duplicate logos for a denser, seamless conveyor belt
  const ALL_LOGOS = [...LOGOS, ...LOGOS];
  const count = ALL_LOGOS.length;
  const duration = count * 6; // slightly faster since there are more items

  const css = useMemo(() => {
    let out = "";
    for (let i = 1; i <= count; i++) {
      const pct = (i / count) * 100;
      out += `@keyframes scrolling-${count}-${i}{0%{transform:translateX(0)}${pct}%{transform:translateX(calc(-100% * ${i}))}${pct + 0.001}%{transform:translateX(calc(100% * (${count} - ${i})))}100%{transform:translateX(0)}}`;
      out += `.scrolling-${count}-${i}{animation:scrolling-${count}-${i} linear ${duration}s infinite;animation-delay:calc(var(--scrolled, 0) * -.0075s);}`;
    }
    return out;
  }, [count, duration]);

  return (
    <section id="section-2-1" className="section-scrolling-logos pv-large section-colorway-gray">
      <style>{css}</style>
      <div className="scrolling-logos">
        <h2 className="scrolling-logos__subtitle subtitle">
          <span>Collaborators &amp; Clients</span>
        </h2>
        <div className={`scrolling-logos__items scrolling-logos__items--${count} scrolling-logos__items--recolor`} data-scrolled>
          {ALL_LOGOS.map((logo, i) => (
            <div className={`scrolling-logos__item scrolling-${count}-${i + 1}`} key={`${logo.alt}-${i}`}>
              <span className="scrolling-logos__item-inner">
                <img loading="eager" className="img-full" src={logo.src} alt={logo.alt} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
