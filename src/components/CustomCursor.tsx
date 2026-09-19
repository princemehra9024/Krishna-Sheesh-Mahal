import { useEffect, useRef } from "react";

/**
 * 96px frosted circle that follows the pointer over any [data-cursor-txt] element,
 * showing that element's label ("View"). Eases toward the pointer with a small lag.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    let target = { x: -200, y: -200 };
    let current = { x: -200, y: -200 };
    let active = false;
    let raf = 0;

    const loop = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.left = `${current.x - 48}px`;
      el.style.top = `${current.y - 48}px`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const findHost = (t: EventTarget | null) => (t instanceof Element ? t.closest<HTMLElement>("[data-cursor-txt]") : null);

    const onMove = (e: MouseEvent) => {
      const host = findHost(e.target);
      target = { x: e.clientX, y: e.clientY };
      if (host) {
        if (!active) {
          current = { x: e.clientX, y: e.clientY };
          active = true;
        }
        el.setAttribute("data-cursor", host.dataset.cursorTxt || "");
        el.classList.add("active");
      } else if (active) {
        active = false;
        el.classList.remove("active", "pressed");
      }
    };
    const onDown = (e: MouseEvent) => findHost(e.target) && el.classList.add("pressed");
    const onUp = () => el.classList.remove("pressed");
    const onLeave = () => {
      active = false;
      el.classList.remove("active", "pressed");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="custom-cursor" data-cursor="" aria-hidden="true" />;
}
