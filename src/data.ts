const U = "https://thepopuphotel.com/wp-content/uploads";

export const HERO_VIDEO = "/videos/home-video.mp4";
export const HERO_YOUTUBE_ID = "PohFY6vM8lk";
export const HERO_YOUTUBE_URL = "https://youtube.com/shorts/PohFY6vM8lk?si=LrvExaU0zAKhsPu9";
export const HERO_POSTER = "https://img.youtube.com/vi/PohFY6vM8lk/maxresdefault.jpg";

export const HOTEL_PHONE = "+91 83029 03734";
export const HOTEL_PHONE_RAW = "918302903734";

export const WHATSAPP_BOOKING_LINK = "https://api.whatsapp.com/send/?phone=918302903734&text=Hello!%20I%20would%20like%20to%20book%20a%20room%20at%20Hotel%20Krishna%20Sheesh%20Mahal.%0A%0A*Name:*%20%0A*Check-in%20Date:*%20%0A*Check-out%20Date:*%20%0A*Room%20Type:*%20%0A*Number%20of%20Guests:*%20%0A*Special%20Requests:*";

export function generateWhatsAppLink(details: {
  type: string;
  name: string;
  date: string;
  guests: string;
  requests: string;
}) {
  const phone = "918302903734";
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
  { label: "Home", href: "/" },
  {
    label: "Rooms",
    href: "/rooms",
  },
  { label: "Restaurant", href: "/restaurant" },
  { label: "Cafe", href: "/cafe" },
  { label: "Banquet", href: "/banquet" },
  { label: "Team", href: "/team" },
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
    { title: "Super Deluxe", href: "/rooms#super-deluxe", src: "/images/rooms/super-deluxe-room.png", alt: "Super Deluxe" },
    { title: "Cafe", href: "/cafe", src: `/images/cafe/neon-lit-cafe-lounge-interior.png`, alt: "Cafe" },
  ],
  [
    { title: "Banquet", href: "/banquet", src: "/images/banquet/wedding-canopy.png", alt: "Banquet" },
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
  primary: "/images/hotel-exterior.png",
  primary2x: "/images/hotel-exterior.png",
  secondary: "/images/hotel-reception-lobby.png",
  secondary2x: "/images/hotel-reception-lobby.png",
};

export interface Quote {
  img: string;
  logo: string;
  logoW: number;
  logoH: number;
  text: string;
  source: string;
  score?: string;
  rating?: number;
  tag?: string;
  badge?: string;
  imageCaption?: string;
}

export const QUOTES: Quote[] = [
  {
    img: "/images/quote-cooking.jpg",
    logo: `${U}/2026/03/ABC_News_logo_2021.svg`,
    logoW: 527,
    logoH: 183,
    text: "Value for money 9.0 out of 10. Cleanliness 8.8. Facilities 8.6. Exceptional culinary hospitality and royal warmth.",
    source: "Agoda Certified Reviews",
    score: "9.0 / 10 Superb",
    rating: 5,
    tag: "Culinary & Dining",
    badge: "Agoda Choice",
    imageCaption: "Live Wok Artistry & Fine Dining",
  },
  {
    img: "/images/quote-fruit-sald.jpeg",
    logo: `${U}/2026/03/logo-the-times.svg`,
    logoW: 100,
    logoH: 48,
    text: "Exceptionally good hotel with reasonable amenities, attentive staff, and timeless heritage elegance.",
    source: "A. K. • The Times Feature",
    score: "4.9 / 5.0",
    rating: 5,
    tag: "Heritage & Comfort",
    badge: "The Times Feature",
    imageCaption: "Garden Fresh Breakfast & Ambience",
  },
  {
    img: "/images/hotel-exterior.png",
    logo: `${U}/2026/03/VOGUE_LOGO.svg`,
    logoW: 1543,
    logoH: 409,
    text: "Experience the timeless charm of royal Rajasthan with modern luxury, exquisite comfort, and attentive hospitality at Krishna Sheesh Mahal.",
    source: "Verified Guest Review • Vogue Spotlight",
    score: "9.8 / 10 Royal Experience",
    rating: 5,
    tag: "Luxury Hotel & Stay",
    badge: "Vogue Spotlight",
    imageCaption: "Krishna Sheesh Mahal Landmark Facade",
  },
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
  title: "Hotel Krishna Sheesh Mahal: Royal Living in Kota",
  date: "Signature Landmark • RK Puram",
  term: "Hotel Living",
  img: "/images/hotel-exterior.png",
  img2x: "/images/hotel-exterior.png",
  href: "/rooms",
};

export const SECONDARY_ARTICLES: Article[] = [
  {
    title: "Luxury Rooms & Royal Deluxe Suites",
    date: "Modern Comfort • 24/7 Room Service",
    term: "Suites & Stay",
    img: "/images/rooms/room-hero-page-img.png",
    img2x: "/images/rooms/room-hero-page-img.png",
    href: "/rooms",
  },
  {
    title: "Grand Banquet & Wedding Canopy Lawn",
    date: "Celebrations & Meets • 50-80+ Guests",
    term: "Royal Banquets",
    img: "/images/banquet/wedding-canopy.png",
    img2x: "/images/banquet/wedding-canopy.png",
    href: "/banquet",
  },
  {
    title: "Flavors of Sheesh Mahal: Multi-Cuisine Dining",
    date: "Fine Dining • Artisanal Cafe & Lounge",
    term: "Dining & Cafe",
    img: "/images/restaurant-dining-2.png",
    img2x: "/images/restaurant-dining-2.png",
    href: "/restaurant",
  },
  {
    title: "Warm Royal Welcome & Concierge Lobby",
    date: "24-Hour Hospitality • Prime Location",
    term: "Palace Welcome",
    img: "/images/hotel-reception-lobby.png",
    img2x: "/images/hotel-reception-lobby.png",
    href: "/about",
  },
];

export const FOOTER_AVATAR = `/images/hotel-reception-lobby.png`;
export const POPUP_IMAGE = `/images/hotel-reception-lobby.png`;

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
      { label: "Amenities", href: "/#about" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Landmarks", href: "/#news" },
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

export type MealPlanCode = "EP" | "CP" | "AMP";

export interface MealPlanDetails {
  code: MealPlanCode;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  inclusions: string[];
  foodHighlights: string[];
  badge?: string;
}

export const MEAL_PLANS: Record<MealPlanCode, MealPlanDetails> = {
  EP: {
    code: "EP",
    name: "EP Plan",
    fullName: "European Plan (Room Only)",
    tagline: "Pure Luxury Living",
    description: "Royal stay with complete in-room comforts, high-speed Wi-Fi, Smart TV, and 24/7 attentive service.",
    badge: "Room Only",
    inclusions: [
      "Royal room accommodation with premium bedding",
      "High-speed complimentary Wi-Fi & Smart TV",
      "Air conditioning & electric tea/coffee kettle",
      "24-Hour room service & concierge support"
    ],
    foodHighlights: ["Room Only", "All in-room amenities"]
  },
  CP: {
    code: "CP",
    name: "CP Plan",
    fullName: "Continental Plan (Bed & Breakfast)",
    tagline: "Stay + Authentic Royal Breakfast",
    description: "Wake up to a freshly prepared traditional breakfast including stuffed Aloo Parathas, Kota Kadhi Kachori, and Tea/Coffee.",
    badge: "Breakfast Included",
    inclusions: [
      "All EP accommodation benefits & amenities",
      "Freshly prepared hot Aloo Paratha with curd & pickle",
      "Crispy & flavorful Kota Kadhi Kachori",
      "Freshly brewed Masala Tea & premium Coffee"
    ],
    foodHighlights: [
      "Aloo Paratha with fresh curd",
      "Famous Kota Kadhi Kachori",
      "Steaming Masala Tea & Coffee"
    ]
  },
  AMP: {
    code: "AMP",
    name: "AMP Plan",
    fullName: "Modified American Plan (Breakfast + Super Deluxe Thali)",
    tagline: "Stay + Breakfast + Royal Feast",
    description: "The complete royal vacation package: morning breakfast plus our signature multi-course Super Deluxe Thali for lunch or dinner.",
    badge: "Best Value Royal Feast",
    inclusions: [
      "All EP room amenities & royal comfort",
      "Complete Morning Breakfast (Aloo Paratha, Kadhi Kachori, Tea & Coffee)",
      "Royal Super Deluxe Thali for Lunch or Dinner",
      "Choice of fine paneer curry, dal tadka/makhani, seasonal sabzi, butter rotis/parathas, aromatic rice, raita, salad & traditional sweet dessert"
    ],
    foodHighlights: [
      "Breakfast: Aloo Paratha + Kadhi Kachori + Tea/Coffee",
      "Lunch / Dinner: Royal Super Deluxe Thali",
      "Rich Curries, Dal, Paneer, Rice, Rotis & Sweets"
    ]
  }
};

export interface RoomTariffInfo {
  id: string;
  name: string;
  nameEm: string;
  subtitle: string;
  size: string;
  desc: string;
  image: string;
  features: string[];
  prices: Record<MealPlanCode, number>;
}

export const ROOMS_TARIFF_DATA: RoomTariffInfo[] = [
  {
    id: "deluxe",
    name: "Deluxe",
    nameEm: "Room",
    subtitle: "COMFORT & STYLE",
    size: "19m²",
    desc: "Perfect for your stay, offering comfort and style with modern amenities.",
    image: "/images/rooms/deluxe-room.png",
    features: ["Free Wi-Fi", "Smart TV", "AC & Tea Kettle"],
    prices: {
      EP: 1200,
      CP: 1400,
      AMP: 1500
    }
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe",
    nameEm: "Room",
    subtitle: "SPACIOUS LUXURY",
    size: "20m²",
    desc: "Provides ample space and premium comfort for relaxing evenings.",
    image: "/images/rooms/super-deluxe-room.png",
    features: ["Free Wi-Fi", "Smart TV", "AC & Tea Kettle"],
    prices: {
      EP: 1500,
      CP: 1700,
      AMP: 2000
    }
  },
  {
    id: "premium",
    name: "Premium",
    nameEm: "Room",
    subtitle: "ELEVATED COMFORT",
    size: "22m²",
    desc: "Elevate your experience with upgraded amenities and additional space.",
    image: "/images/rooms/premium-room.png",
    features: ["Free Wi-Fi", "Smart TV", "AC & Tea Kettle"],
    prices: {
      EP: 1800,
      CP: 2000,
      AMP: 2500
    }
  },
  {
    id: "suite",
    name: "Suite",
    nameEm: "",
    subtitle: "ULTIMATE EXPERIENCE",
    size: "25m²",
    desc: "Experience the pinnacle of luxury with a spacious layout for an unforgettable stay.",
    image: "/images/rooms/Suite.png",
    features: ["Free Wi-Fi", "Smart TV", "AC & Tea Kettle"],
    prices: {
      EP: 2800,
      CP: 3300,
      AMP: 3500
    }
  }
];

