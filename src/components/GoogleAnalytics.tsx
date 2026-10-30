import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GoogleAnalytics & Search Integration Component
 * Automatically initializes GA4 if VITE_GA_MEASUREMENT_ID is provided in the environment.
 * Listens for client-side route changes in React Router to send virtual pageviews.
 * Also checks for GSC & Bing verification tokens from env variables.
 */
export default function GoogleAnalytics() {
  const location = useLocation();
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  const gscToken = import.meta.env.VITE_GSC_VERIFICATION_TOKEN as string | undefined;
  const bingToken = import.meta.env.VITE_BING_VERIFICATION_TOKEN as string | undefined;

  // Initialize Search Console / Bing tokens if supplied in env
  useEffect(() => {
    if (gscToken) {
      let gscMeta = document.querySelector('meta[name="google-site-verification"]');
      if (!gscMeta) {
        gscMeta = document.createElement("meta");
        gscMeta.setAttribute("name", "google-site-verification");
        document.head.appendChild(gscMeta);
      }
      gscMeta.setAttribute("content", gscToken);
    }

    if (bingToken) {
      let bingMeta = document.querySelector('meta[name="msvalidate.01"]');
      if (!bingMeta) {
        bingMeta = document.createElement("meta");
        bingMeta.setAttribute("name", "msvalidate.01");
        document.head.appendChild(bingMeta);
      }
      bingMeta.setAttribute("content", bingToken);
    }
  }, [gscToken, bingToken]);

  // Initialize GA4 script once if ID exists
  useEffect(() => {
    if (!gaId || typeof window === "undefined") return;

    const existingScript = document.getElementById("ga4-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "ga4-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments);
      };

      window.gtag("js", new Date());
      window.gtag("config", gaId, {
        send_page_view: false, // Track manually on route change below
      });
    }
  }, [gaId]);

  // Track page views on route changes
  useEffect(() => {
    if (!gaId || typeof window === "undefined" || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname + location.search,
    });
  }, [location, gaId]);

  return null;
}

