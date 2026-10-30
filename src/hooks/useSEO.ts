import { useEffect } from "react";
import { SITE_URL, HOTEL_NAME } from "../utils/seoSchemas";

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article" | "hotel" | "restaurant";
  noindex?: boolean;
  schema?: object | object[];
}

const DEFAULT_KEYWORDS =
  "Krishna Sheesh Mahal Kota, Hotel in Kota Rajasthan, Best hotel in Kota, Hotel in Shrinath Puram Kota, Rooms in Kota Rajasthan, Family hotel in Kota, Comfortable hotel in Kota, Hotel near Kota attractions, Hotel accommodation in Kota, Hotel booking in Kota, Banquet hall in Kota, Rooftop cafe Kota";

const DEFAULT_IMAGE = `${SITE_URL}/images/hotel-exterior.png`;
const DEFAULT_IMAGE_ALT = "Krishna Sheesh Mahal - Luxury Hotel in Kota Rajasthan";

function setOrCreateMeta(
  selector: string,
  attributeName: "name" | "property",
  attributeValue: string,
  content: string
) {
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setOrCreateLink(rel: string, href: string) {
  let element = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export function useSEO(
  optionsOrTitle: string | SEOProps,
  legacyDescription?: string,
  legacyCanonicalPath?: string
) {
  const options: SEOProps =
    typeof optionsOrTitle === "string"
      ? {
          title: optionsOrTitle,
          description: legacyDescription || "",
          canonicalPath: legacyCanonicalPath || "",
        }
      : optionsOrTitle;

  const {
    title,
    description,
    canonicalPath = "",
    keywords = DEFAULT_KEYWORDS,
    ogImage = DEFAULT_IMAGE,
    ogImageAlt = DEFAULT_IMAGE_ALT,
    ogType = "website",
    noindex = false,
    schema,
  } = options;

  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta description
    setOrCreateMeta('meta[name="description"]', "name", "description", description);

    // 3. Meta keywords
    setOrCreateMeta('meta[name="keywords"]', "name", "keywords", keywords);

    // 4. Meta robots
    const robotsContent = noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    setOrCreateMeta('meta[name="robots"]', "name", "robots", robotsContent);

    // 5. Canonical URL
    const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
    setOrCreateLink("canonical", canonicalUrl.endsWith("/") && canonicalUrl !== `${SITE_URL}/` ? canonicalUrl.slice(0, -1) : canonicalUrl || `${SITE_URL}/`);

    // 6. Open Graph
    const absoluteOgImage = ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

    setOrCreateMeta('meta[property="og:title"]', "property", "og:title", title);
    setOrCreateMeta('meta[property="og:description"]', "property", "og:description", description);
    setOrCreateMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl || SITE_URL);
    setOrCreateMeta('meta[property="og:type"]', "property", "og:type", ogType);
    setOrCreateMeta('meta[property="og:image"]', "property", "og:image", absoluteOgImage);
    setOrCreateMeta('meta[property="og:image:secure_url"]', "property", "og:image:secure_url", absoluteOgImage);
    setOrCreateMeta('meta[property="og:image:alt"]', "property", "og:image:alt", ogImageAlt);
    setOrCreateMeta('meta[property="og:site_name"]', "property", "og:site_name", HOTEL_NAME);
    setOrCreateMeta('meta[property="og:locale"]', "property", "og:locale", "en_IN");

    // 7. Twitter / X Card
    setOrCreateMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setOrCreateMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setOrCreateMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setOrCreateMeta('meta[name="twitter:image"]', "name", "twitter:image", absoluteOgImage);
    setOrCreateMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", ogImageAlt);

    // 8. Dynamic JSON-LD structured data injection
    const scriptId = "page-dynamic-jsonld";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Clean up page-specific schema on unmount
      const tag = document.getElementById(scriptId);
      if (tag) tag.remove();
    };
  }, [
    title,
    description,
    canonicalPath,
    keywords,
    ogImage,
    ogImageAlt,
    ogType,
    noindex,
    schema,
  ]);
}
