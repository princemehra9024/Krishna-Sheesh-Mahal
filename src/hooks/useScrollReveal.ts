import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Wait a tick for the DOM to render the new route
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll(".reveal");
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [location.pathname]);
}
