import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Replicates the behaviour of the original site's scroll stack:
 *  - Lenis smooth scrolling
 *  - Locomotive-style [data-scroll] elements:
 *      data-scroll-speed        -> parallax translate3d
 *      data-scroll-css-progress -> --progress custom property (0 → 1)
 *  - body.scroll-active / scroll-inactive / scroll-up / scroll-down
 *  - --scrolled on the logo marquee (scroll-linked animation delay)
 */

interface ScrollEl {
  el: HTMLElement;
  speed: number | null;
  cssProgress: boolean;
  offsetStart: number;
  offsetEnd: number;
  inFold: boolean;
  translate: number;
  lastProgress: number | null;
}

const mapRange = (inMin: number, inMax: number, outMin: number, outMax: number, v: number) =>
  outMin + (((v - inMin) / (inMax - inMin)) * (outMax - outMin) || 0);
const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v));

export function useScrollEngine() {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const body = document.body;
    body.classList.toggle("no-touch", !isTouch);

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    document.documentElement.classList.add("lenis");

    let elements: ScrollEl[] = [];
    let winH = window.innerHeight;
    let previous = window.scrollY;

    const collect = () => {
      winH = window.innerHeight;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
      elements = nodes.map((el) => {
        const prev = elements.find((e) => e.el === el);
        const translate = prev?.translate ?? 0;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY - translate;
        const speedAttr = el.dataset.scrollSpeed;
        const offsetStart = top;
        const offsetEnd = top + rect.height;
        return {
          el,
          speed: speedAttr !== undefined ? parseFloat(speedAttr) : null,
          cssProgress: el.dataset.scrollCssProgress !== undefined,
          offsetStart,
          offsetEnd,
          inFold: offsetStart < winH,
          translate,
          lastProgress: prev?.lastProgress ?? null,
        };
      });
    };

    const marquees = () => Array.from(document.querySelectorAll<HTMLElement>("[data-scrolled]"));

    const render = (scroll: number) => {
      // body state classes
      if (scroll > 0) {
        body.classList.remove("scroll-inactive");
        body.classList.add("scroll-active");
      } else {
        body.classList.remove("scroll-active");
        body.classList.add("scroll-inactive");
      }
      if (previous >= scroll) {
        body.classList.remove("scroll-down");
        body.classList.add("scroll-up");
      } else {
        body.classList.remove("scroll-up");
        body.classList.add("scroll-down");
      }
      previous = scroll;

      for (const item of elements) {
        const start = item.inFold ? 0 : item.offsetStart - winH;
        const end = item.offsetEnd;
        const progress = clamp(0, 1, mapRange(start, end, 0, 1, scroll));

        if (item.cssProgress && progress !== item.lastProgress) {
          item.el.style.setProperty("--progress", progress.toFixed(4));
        }
        item.lastProgress = progress;

        if (item.speed !== null && !isNaN(item.speed) && !isTouch) {
          const t = item.inFold ? Math.max(0, progress) : mapRange(0, 1, -1, 1, progress);
          const translate = t * winH * item.speed * -1;
          if (translate !== item.translate) {
            item.translate = translate;
            item.el.style.transform = `translate3d(0, ${translate}px, 0)`;
          }
        }
      }

      for (const m of marquees()) m.style.setProperty("--scrolled", String(Math.round(scroll)));
    };

    lenis.on("scroll", (e: { scroll: number }) => render(e.scroll));

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    collect();
    render(window.scrollY);

    const onResize = () => {
      collect();
      render(lenis.scroll);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    const ro = new ResizeObserver(() => onResize());
    ro.observe(document.body);
    // images arriving late change layout metrics
    const imgs = Array.from(document.images);
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onResize, { once: true });
    });

    // expose for anchor links / menu
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      ro.disconnect();
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);
}

export function scrollToTarget(target: number | string | HTMLElement, offset = 0) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(target, { offset });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else if (typeof target === "string") document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  else target.scrollIntoView({ behavior: "smooth" });
}

export function lockScroll(lock: boolean) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (!lenis) return;
  if (lock) lenis.stop();
  else lenis.start();
}
