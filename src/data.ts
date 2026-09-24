const U = "https://thepopuphotel.com/wp-content/uploads";

export const HERO_VIDEO = "/videos/home-video.mp4";
export const HERO_POSTER = `${U}/2026/03/img-4-1600x900.webp`;

export const WHATSAPP_BOOKING_LINK = "https://api.whatsapp.com/send/?phone=919024546041&text=Hello!%20I%20would%20like%20to%20book%20a%20room%20at%20Hotel%20Krishna%20Sheesh%20Mahal.%0A%0A*Name:*%20%0A*Check-in%20Date:*%20%0A*Check-out%20Date:*%20%0A*Room%20Type:*%20%0A*Number%20of%20Guests:*%20%0A*Special%20Requests:*";

export function generateWhatsAppLink(details: {
  type: string;
  name: string;
  date: string;
  guests: string;
  requests: string;
}) {
  const phone = "919024546041";
  const intro = `Hello! I would like to make a ${details.type} booking at Hotel Krishna Sheesh Mahal.`;
  const message = `${intro}\n\n*Name:* ${details.name}\n*Date:* ${details.date}\n*Number of Guests:* ${details.guests}\n*Special Requests:* ${details.requests || 'None'}`;
  return `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}`;
}

export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export const MENU: MenuItem[] = [
  { label: "Home", href: "#top" },
  {
    label: "Rooms",
    href: "/rooms",
  },
  { label: "Restaurant", href: "/restaurant" },
  { label: "Cafe", href: "/cafe" },
  { label: "Banquet", href: "/banquet" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export interface ImageLink {
  title: string;
  href: string;
  src: string;
  alt: string;
}

export const IMAGE_LINK_ROWS: ImageLink[][] = [
  [
    { title: "Restaurant", href: "/restaurant", src: "/images/restaurant-img.jpeg", alt: "Restaurant" },
  ],
  [
    { title: "Super Deluxe", href: "#rooms", src: `${U}/2026/03/img-5-1600x900.webp`, alt: "Super Deluxe" },
    { title: "Cafe", href: "/cafe", src: `/images/cafe/cafe_hero.jpg`, alt: "Cafe" },
  ],
  [
    { title: "Banquet", href: "/banquet", src: "/banquet-hero.jpg", alt: "Banquet" },
  ],
];

export const LOGOS: { src: string; alt: string }[] = [
  { src: `${U}/2026/02/arcus-logo_cropped_mono.png`, alt: "Arcus" },
  { src: `${U}/2026/05/Miele.png`, alt: "Miele" },
  { src: `${U}/2026/04/Leve-for-website.png`, alt: "Leve" },
  { src: `${U}/2026/02/body-brilliant-1.png`, alt: "Body Brilliant" },
  { src: `${U}/2026/03/OOD-logo.png`, alt: "ÖÖD" },
  { src: `${U}/2026/02/360meLogo-black_for-web.png`, alt: "360me" },
  { src: `${U}/2026/02/Andy-Thornton-2.png`, alt: "Andy Thornton" },
  { src: `${U}/2026/02/RAD-2.png`, alt: "RAD" },
  { src: `${U}/2026/03/logo-lavazza.svg`, alt: "Lavazza" },
  { src: `${U}/2026/03/Coachbuilt-Fullt-Logo-Black.png`, alt: "Coachbuilt" },
  { src: `${U}/2026/03/Champagne_Bollinger_logo.svg-scaled.png`, alt: "Champagne Bollinger" },
  { src: `${U}/2026/03/Neft-Logo-scaled.png`, alt: "Neft" },
];

export const ABOUT_IMAGES = {
  primary: `${U}/2026/03/img-2-655x862.webp`,
  primary2x: `${U}/2026/03/img-2-770x1012.webp`,
  secondary: `/images/hotel_receptionist.jpg`,
  secondary2x: `/images/hotel_receptionist.jpg`,
};

export interface Quote {
  img: string;
  logo: string;
  logoW: number;
  logoH: number;
  text: string;
  source: string;
}

export const QUOTES: Quote[] = [
  { img: "/images/quote-fruit-sald.jpeg", logo: `${U}/2026/03/logo-the-times.svg`, logoW: 100, logoH: 48, text: "“Exceptionally good hotel with reasonable amenities.”", source: "A K. India" },
  { img: "/images/quote-cooking.jpg", logo: `${U}/2026/03/ABC_News_logo_2021.svg`, logoW: 527, logoH: 183, text: "\"Value for money 9.0 out of 10. Cleanliness 8.8. Facilities 8.6.\"", source: "Agoda Reviews" },
  { img: "/images/quote-sarfing.jpg", logo: `${U}/2026/03/VOGUE_LOGO.svg`, logoW: 1543, logoH: 409, text: "\"Location rating score: 9.1 Exceptional location.\"", source: "Guest Review" },
];

export interface Article {
  title: string;
  date: string;
  term: string;
  img: string;
  img2x?: string;
  href: string;
}

export const PRIMARY_ARTICLE: Article = {
  title: "Kota Bridge: A Landmark to Visit",
  date: "2.8 km away",
  term: "Landmarks",
  img: `${U}/2024/05/glastonbury-facts-1-520x296.jpg`,
  img2x: `${U}/2024/05/glastonbury-facts-1-1060x600.jpg`,
  href: "#news",
};

export const SECONDARY_ARTICLES: Article[] = [
  { title: "Chambal Gardens", date: "3.1 km away", term: "Landmarks", img: `${U}/2026/07/DSC00316-520x296.jpg`, img2x: `${U}/2026/07/DSC00316-1060x600.jpg`, href: "#news" },
  { title: "Kotah Garh (City Palace)", date: "4.6 km away", term: "Landmarks", img: `${U}/2026/07/Monza-IGP-520x296.webp`, img2x: `${U}/2026/07/Monza-IGP-1060x600.webp`, href: "#news" },
  { title: "Jagmandir Palace", date: "5.7 km away", term: "Landmarks", img: `${U}/2026/07/Miele-1-520x296.webp`, img2x: `${U}/2026/07/Miele-1-1060x600.webp`, href: "#news" },
  { title: "Kishor Sagar", date: "5.8 km away", term: "Landmarks", img: `${U}/2026/02/OodExterior2-520x296.jpg`, img2x: `${U}/2026/02/OodExterior2-1060x600.jpg`, href: "#news" },
];

export const FOOTER_AVATAR = `/images/hotel_receptionist.jpg`;
export const POPUP_IMAGE = `/images/hotel_receptionist.jpg`;

export const FOOTER_MENUS: { title: string; items: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Rooms",
    items: [
      { label: "Premium", href: "/rooms#premium" },
      { label: "Super Deluxe", href: "/rooms#super-deluxe" },
      { label: "Cafe", href: "/cafe" },
      { label: "Deluxe", href: "/rooms#deluxe" },
    ],
  },
  {
    title: "Information",
    items: [
      { label: "Amenities", href: "#about" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Landmarks", href: "#news" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Instagram", href: "https://www.instagram.com/krishnasheeshmahal/", external: true },
    ],
  },
];

export interface IngredientCard {
  label: string;
  icon: string;
}

export interface Dish {
  title: string;
  bowlImage: string;
  cards: IngredientCard[];
}

export const DISHES: Dish[] = [
  {
    title: "Lemon Herb Garlic Chicken W/ Organic Quinoa And Grilled Asparagus",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_19__2026__11_40_23_PM-removebg-preview.png",
    cards: [
      { label: "Veggies", icon: "" },
      { label: "Protein", icon: "" },
      { label: "Grains", icon: "" },
      { label: "Fruit", icon: "" },
      { label: "Herbs", icon: "" },
      { label: "Sauce", icon: "" },
    ],
  },
  {
    title: "Southwest Bean & Quinoa Salad With Avocado",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_19__2026__11_43_07_PM-removebg-preview.png",
    cards: [
      { label: "Avocado", icon: "" },
      { label: "Black Beans", icon: "" },
      { label: "Corn", icon: "" },
      { label: "Quinoa", icon: "" },
      { label: "Tomato", icon: "" },
      { label: "Cilantro", icon: "" },
    ],
  },
  {
    title: "Pan Seared Salmon With Roasted Root Vegetables",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_19__2026__11_46_40_PM-removebg-preview.png",
    cards: [
      { label: "Salmon", icon: "" },
      { label: "Lemon", icon: "" },
      { label: "Rosemary", icon: "" },
      { label: "Carrots", icon: "" },
      { label: "Potatoes", icon: "" },
      { label: "Butter", icon: "" },
    ],
  },
  {
    title: "Creamy Truffle Mushroom Risotto",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_19__2026__11_49_39_PM-removebg-preview.png",
    cards: [
      { label: "Mushrooms", icon: "" },
      { label: "Arborio Rice", icon: "" },
      { label: "Truffle Oil", icon: "" },
      { label: "Parmesan", icon: "" },
      { label: "Garlic", icon: "" },
      { label: "Thyme", icon: "" },
    ],
  },
  {
    title: "Spicy Tofu Stir-Fry With Soba Noodles",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_21__2026__12_20_48_AM-removebg-preview.png",
    cards: [
      { label: "Tofu", icon: "" },
      { label: "Soba", icon: "" },
      { label: "Bok Choy", icon: "" },
      { label: "Chili", icon: "" },
      { label: "Soy Sauce", icon: "" },
      { label: "Sesame", icon: "" },
    ],
  },
  {
    title: "Mediterranean Mezze Bowl",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_21__2026__12_22_47_AM-removebg-preview.png",
    cards: [
      { label: "Hummus", icon: "" },
      { label: "Falafel", icon: "" },
      { label: "Cucumber", icon: "" },
      { label: "Feta", icon: "" },
      { label: "Olives", icon: "" },
      { label: "Pita", icon: "" },
    ],
  },
  {
    title: "Ahi Tuna Poke Bowl With Mango Salsa",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_21__2026__12_24_29_AM-removebg-preview.png",
    cards: [
      { label: "Ahi Tuna", icon: "" },
      { label: "Mango", icon: "" },
      { label: "Edamame", icon: "" },
      { label: "Seaweed", icon: "" },
      { label: "Rice", icon: "" },
      { label: "Ponzu", icon: "" },
    ],
  },
  {
    title: "Braised Short Rib With Garlic Mash",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_21__2026__12_26_19_AM-removebg-preview.png",
    cards: [
      { label: "Short Rib", icon: "" },
      { label: "Potatoes", icon: "" },
      { label: "Red Wine", icon: "" },
      { label: "Carrots", icon: "" },
      { label: "Onion", icon: "" },
      { label: "Herbs", icon: "" },
    ],
  },
  {
    title: "Classic Spaghetti Carbonara",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_21__2026__12_30_08_AM-removebg-preview.png",
    cards: [
      { label: "Spaghetti", icon: "" },
      { label: "Pancetta", icon: "" },
      { label: "Egg Yolk", icon: "" },
      { label: "Pecorino", icon: "" },
      { label: "Black Pepper", icon: "" },
      { label: "Olive Oil", icon: "" },
    ],
  }
];
