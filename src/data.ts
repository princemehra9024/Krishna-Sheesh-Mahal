const U = "https://thepopuphotel.com/wp-content/uploads";

export const HERO_VIDEO = `${U}/2026/07/HERO-8.mp4`;
export const HERO_POSTER = `${U}/2026/03/img-4-1600x900.webp`;

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
    { title: "Restaurant", href: "/restaurant", src: `${U}/2026/03/Monza13-2560x1440.webp`, alt: "Restaurant" },
  ],
  [
    { title: "Super Deluxe", href: "#rooms", src: `${U}/2026/03/img-5-1600x900.webp`, alt: "Super Deluxe" },
    { title: "Suite", href: "#rooms", src: `${U}/2026/03/The-Pop-Up-Hotel-Silverstone-1600x900.webp`, alt: "Suite" },
  ],
  [
    { title: "Deluxe", href: "#rooms", src: `${U}/2026/03/shutterstock_2443373073-1600x900.webp`, alt: "Deluxe" },
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
  secondary: `${U}/2026/03/img-1-385x506.webp`,
  secondary2x: `${U}/2026/03/img-1-770x1012.webp`,
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
  { img: `${U}/2026/03/img-3-790x790.webp`, logo: `${U}/2026/03/logo-the-times.svg`, logoW: 100, logoH: 48, text: "“Exceptionally good hotel with reasonable amenities.”", source: "A K. India" },
  { img: `${U}/2023/10/Web-re-design-G24-Sept-23-7-790x790.jpg`, logo: `${U}/2026/03/ABC_News_logo_2021.svg`, logoW: 527, logoH: 183, text: "\"Value for money 9.0 out of 10. Cleanliness 8.8. Facilities 8.6.\"", source: "Agoda Reviews" },
  { img: `${U}/2023/11/tpuh-restaurant-790x790.jpg`, logo: `${U}/2026/03/VOGUE_LOGO.svg`, logoW: 1543, logoH: 409, text: "\"Location rating score: 9.1 Exceptional location.\"", source: "Guest Review" },
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

export const FOOTER_AVATAR = `${U}/2026/03/img-1-150x150.webp`;
export const POPUP_IMAGE = `${U}/2026/03/img-1-520x684.webp`;

export const FOOTER_MENUS: { title: string; items: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Rooms",
    items: [
      { label: "Premium", href: "/rooms#premium" },
      { label: "Super Deluxe", href: "/rooms#super-deluxe" },
      { label: "Suite", href: "/rooms#suite" },
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
    title: "Southwest Bean & Quinoa Salad",
    bowlImage: "/images/dishes/ChatGPT_Image_Sep_19__2026__11_43_07_PM-removebg-preview.png",
    cards: [
      { label: "Asparagus", icon: "" },
      { label: "Chicken", icon: "" },
      { label: "Veggies", icon: "" },
      { label: "Herbs", icon: "" },
      { label: "CousCous", icon: "" },
      { label: "Olives", icon: "" },
    ],
  },
];
