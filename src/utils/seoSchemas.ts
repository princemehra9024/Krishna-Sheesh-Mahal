/**
 * SEO Structured Data (JSON-LD) Generators for Krishna Sheesh Mahal
 * Validated according to schema.org & Google Search Central guidelines.
 */

export const SITE_URL = "https://krishna-sheesh-mahal.vercel.app";
export const HOTEL_NAME = "Krishna Sheesh Mahal";
export const HOTEL_LEGAL_NAME = "Hotel Krishna Sheesh Mahal";
export const HOTEL_LOGO = `${SITE_URL}/Krishna%20Sheesh%20Mahal%20Emblem.png`;
export const HOTEL_IMAGE = `${SITE_URL}/images/hotel-exterior.png`;

export const HOTEL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "33-D, Sector - B, Shrinath Puram",
  addressLocality: "Kota",
  addressRegion: "Rajasthan",
  postalCode: "324010",
  addressCountry: "IN",
};

export const HOTEL_GEO = {
  "@type": "GeoCoordinates",
  latitude: 25.1235338,
  longitude: 75.8309489,
};

export const HOTEL_PHONES = ["+91 83029 03734", "+91 86903 93739"];
export const HOTEL_EMAIL = "krishnasheeshmahal73@gmail.com";
export const HOTEL_MAP_URL = "https://maps.google.com/?q=Krishna+Sheesh+Mahal+Kota";

/**
 * 1. Base Hotel & LodgingBusiness Schema
 */
export function getHotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "LodgingBusiness"],
    "@id": `${SITE_URL}/#hotel`,
    name: HOTEL_NAME,
    legalName: HOTEL_LEGAL_NAME,
    alternateName: [
      "Krishna Sheesh Mahal Kota",
      "Hotel Krishna Sheesh Mahal",
      "Krishna Sheesh Mahal Shrinath Puram",
    ],
    description:
      "Krishna Sheesh Mahal is a premier luxury hotel in Shrinath Puram, Kota, Rajasthan offering royal accommodations, multi-cuisine dining, Rama's Sky Lounge rooftop cafe, and grand banquet wedding halls.",
    url: SITE_URL,
    telephone: HOTEL_PHONES[0],
    email: HOTEL_EMAIL,
    logo: HOTEL_LOGO,
    image: [
      `${SITE_URL}/images/hotel-exterior.png`,
      `${SITE_URL}/images/hotel-reception-lobby.png`,
      `${SITE_URL}/images/rooms/deluxe-room.png`,
      `${SITE_URL}/images/rooms/super-deluxe-room.png`,
      `${SITE_URL}/images/rooms/premium-room.png`,
      `${SITE_URL}/images/rooms/Suite.png`,
      `${SITE_URL}/images/restaurant-dining-2.png`,
      `${SITE_URL}/images/banquet/wedding-canopy.png`,
    ],
    address: HOTEL_ADDRESS,
    geo: HOTEL_GEO,
    hasMap: HOTEL_MAP_URL,
    priceRange: "₹₹ (₹1,200 - ₹3,799)",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Net Banking",
    checkinTime: "11:00",
    checkoutTime: "11:00",
    starRating: {
      "@type": "Rating",
      ratingValue: "4.0",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "High-Speed Wi-Fi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Complimentary Parking",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "In-House Multi-Cuisine Restaurant",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Rama's Sky Lounge Rooftop Cafe",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Grand Banquet Hall & Wedding Lawn",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "24/7 Room Service & Concierge",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Air Conditioning",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Smart TV & In-Room Kettle",
        value: true,
      },
    ],
    sameAs: [
      "https://www.instagram.com/krishnasheeshmahal/",
      "https://share.google/SjYib0PPddAqTZfFZ",
    ],
    containsPlace: [
      {
        "@type": "Restaurant",
        "@id": `${SITE_URL}/restaurant#restaurant`,
        name: "Krishna Sheesh Mahal Fine Dining Restaurant",
        servesCuisine: [
          "North Indian",
          "Rajasthani",
          "Chinese",
          "Tandoori",
          "Multi-Cuisine",
        ],
        telephone: "+91 86903 93739",
        address: HOTEL_ADDRESS,
      },
      {
        "@type": "CafeOrCoffeeShop",
        "@id": `${SITE_URL}/cafe#cafe`,
        name: "Rama's Sky Lounge",
        description: "Rooftop lounge & cafe at Krishna Sheesh Mahal Kota",
        servesCuisine: ["Artisan Coffee", "Mocktails", "Continental", "Snacks"],
        openingHours: "Mo-Su 14:00-23:00",
        telephone: "+91 86903 93739",
        address: HOTEL_ADDRESS,
      },
    ],
  };
}

/**
 * 2. Organization Schema
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: HOTEL_NAME,
    legalName: HOTEL_LEGAL_NAME,
    url: SITE_URL,
    logo: HOTEL_LOGO,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 83029 03734",
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91 86903 93739",
        contactType: "events and dining",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    address: HOTEL_ADDRESS,
    sameAs: [
      "https://www.instagram.com/krishnasheeshmahal/",
      "https://share.google/SjYib0PPddAqTZfFZ",
    ],
  };
}

/**
 * 3. WebSite Schema
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: HOTEL_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/**
 * 4. BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * 5. Rooms Page Schema (HotelRooms List)
 */
export function getRoomsPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rooms & Suites at Krishna Sheesh Mahal Kota",
    description:
      "Explore luxury accommodations at Krishna Sheesh Mahal Kota including Deluxe, Super Deluxe, Premium Rooms and Suites with meal options.",
    itemListElement: [
      {
        "@type": "HotelRoom",
        position: 1,
        name: "Deluxe Room",
        description:
          "Perfect for comfortable stays with modern amenities, king bed, Smart TV, AC, and high-speed Wi-Fi.",
        floorSize: {
          "@type": "QuantitativeValue",
          value: 19,
          unitCode: "MTK",
        },
        bed: {
          "@type": "BedDetails",
          numberOfBeds: 1,
          typeOfBed: "King",
        },
        occupancy: {
          "@type": "QuantitativeValue",
          value: 2,
        },
        image: `${SITE_URL}/images/rooms/deluxe-room.png`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: 1200,
          highPrice: 1800,
          offerCount: 3,
        },
      },
      {
        "@type": "HotelRoom",
        position: 2,
        name: "Super Deluxe Room",
        description:
          "Provides ample space and premium comfort for relaxing evenings with elevated royal decor.",
        floorSize: {
          "@type": "QuantitativeValue",
          value: 20,
          unitCode: "MTK",
        },
        bed: {
          "@type": "BedDetails",
          numberOfBeds: 1,
          typeOfBed: "King",
        },
        occupancy: {
          "@type": "QuantitativeValue",
          value: 2,
        },
        image: `${SITE_URL}/images/rooms/super-deluxe-room.png`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: 1500,
          highPrice: 2100,
          offerCount: 3,
        },
      },
      {
        "@type": "HotelRoom",
        position: 3,
        name: "Premium Room",
        description:
          "Elevate your experience with upgraded amenities, additional living space, and royal aesthetics.",
        floorSize: {
          "@type": "QuantitativeValue",
          value: 22,
          unitCode: "MTK",
        },
        bed: {
          "@type": "BedDetails",
          numberOfBeds: 1,
          typeOfBed: "King",
        },
        occupancy: {
          "@type": "QuantitativeValue",
          value: 2,
        },
        image: `${SITE_URL}/images/rooms/premium-room.png`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: 1800,
          highPrice: 2400,
          offerCount: 3,
        },
      },
      {
        "@type": "HotelRoom",
        position: 4,
        name: "Royal Suite",
        description:
          "Experience the pinnacle of luxury with a spacious layout, regal furnishings, and premier service.",
        floorSize: {
          "@type": "QuantitativeValue",
          value: 25,
          unitCode: "MTK",
        },
        bed: {
          "@type": "BedDetails",
          numberOfBeds: 1,
          typeOfBed: "King",
        },
        occupancy: {
          "@type": "QuantitativeValue",
          value: 3,
        },
        image: `${SITE_URL}/images/rooms/Suite.png`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: 3199,
          highPrice: 3799,
          offerCount: 3,
        },
      },
    ],
  };
}

/**
 * 6. Restaurant Schema
 */
export function getRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/restaurant#restaurant`,
    name: "Krishna Sheesh Mahal Fine Dining Restaurant",
    description:
      "Flagship multi-cuisine fine dining restaurant at Krishna Sheesh Mahal in Kota, Rajasthan. Serving authentic Rajasthani thalis, tandoori specialties, and gourmet dishes.",
    image: `${SITE_URL}/images/restaurant-dining-2.png`,
    url: `${SITE_URL}/restaurant`,
    telephone: "+91 86903 93739",
    servesCuisine: [
      "North Indian",
      "Rajasthani",
      "Chinese",
      "Tandoori",
      "Multi-Cuisine",
    ],
    priceRange: "₹₹",
    acceptsReservations: "True",
    address: HOTEL_ADDRESS,
    geo: HOTEL_GEO,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "23:00",
      },
    ],
  };
}

/**
 * 7. Cafe Schema (Rama's Sky Lounge)
 */
export function getCafeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${SITE_URL}/cafe#cafe`,
    name: "Rama's Sky Lounge",
    description:
      "Rooftop cafe and lounge at Krishna Sheesh Mahal Kota. Enjoy artisan coffee, specialty mocktails, delicious appetizers, and stunning open-air sunset views.",
    image: `${SITE_URL}/images/cafe/neon-lit-cafe-lounge-interior.png`,
    url: `${SITE_URL}/cafe`,
    telephone: "+91 86903 93739",
    servesCuisine: ["Artisan Coffee", "Mocktails", "Fast Food", "Continental", "Snacks"],
    priceRange: "₹₹",
    acceptsReservations: "True",
    address: HOTEL_ADDRESS,
    geo: HOTEL_GEO,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "14:00",
        closes: "23:00",
      },
    ],
  };
}

/**
 * 8. Banquet & Event Venue Schema
 */
export function getBanquetSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${SITE_URL}/banquet#venue`,
    name: "Krishna Sheesh Mahal Banquet & Wedding Venue",
    description:
      "Premier wedding venue and banquet hall in Kota, Rajasthan. Ideal for weddings, receptions, conferences, kitty parties, and corporate events.",
    image: `${SITE_URL}/images/banquet/wedding-canopy.png`,
    url: `${SITE_URL}/banquet`,
    telephone: "+91 86903 93739",
    address: HOTEL_ADDRESS,
    geo: HOTEL_GEO,
    maximumAttendeeCapacity: 150,
  };
}

/**
 * 9. FAQ Schema
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * 10. Default Home Page Composite Schema (@graph)
 */
export function getHomeCompositeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getHotelSchema(),
      getOrganizationSchema(),
      getWebSiteSchema(),
    ],
  };
}

