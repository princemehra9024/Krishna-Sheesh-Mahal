export interface BanquetMenuItem {
  category: string;
  value: string | string[];
  note?: string;
}

export interface BanquetPackage {
  id: string;
  menuNo: string;
  name: string;
  tagline: string;
  price: number;
  priceFormatted: string;
  badge?: string;
  isPopular?: boolean;
  unlimitedMeal?: boolean;
  idealFor: string;
  welcomeDrink: string;
  starters: string[];
  startersCount: string;
  startersNote?: string;
  mainCourse: string[];
  salad: string;
  curd: string;
  rice: string;
  breads: string;
  accompaniments: string;
  dessert: string;
  iceCream?: string;
  premiumDessert?: string;
  mouthFreshener?: string;
  features: string[];
}

export const KITTY_PARTY_PACKAGES: BanquetPackage[] = [
  {
    id: "kitty-01",
    menuNo: "Menu 01",
    name: "Rajasthani Heritage Spread",
    tagline: "Authentic royal Dal Bati Churma cooked in pure Desi Ghee with traditional sides",
    price: 299,
    priceFormatted: "₹ 299/-",
    badge: "Heritage Classic",
    idealFor: "Traditional get-togethers & heritage lovers",
    welcomeDrink: "Tea / Coffee / Fresh Soup",
    starters: [
      "Spring Roll (2 Pcs)",
      "Hara Bhara Kabab (2 Pcs)",
      "Crispy Veg Pakoda",
      "Golden Crispy Corn",
      "Honey Chilli Potato",
    ],
    startersCount: "Any 2 Starters",
    startersNote: "Choose any 2 starters from the chef's special selection",
    mainCourse: [
      "Mix Dal & Traditional Kadhi",
      "2 Pcs Crisp Golden Bati",
      "Rich Desi Ghee Churma",
      "Aromatic Pulao",
      "Spicy Lehsun Ki Chutney",
    ],
    salad: "Fresh Onion Salad",
    curd: "Chilled Masala Chhachh (Buttermilk)",
    rice: "Special Pulao",
    breads: "Traditional Bati (Included in Main Course)",
    accompaniments: "Traditional Lehsun Chutney & Sides",
    dessert: "Pure Desi Ghee Churma",
    iceCream: "-",
    premiumDessert: "-",
    mouthFreshener: "-",
    features: [
      "Choice of 2 Starters",
      "Authentic Dal Bati Kadhi",
      "Pure Desi Ghee Churma",
      "Spiced Chhachh & Lehsun Chutney",
    ],
  },
  {
    id: "kitty-02",
    menuNo: "Menu 02",
    name: "Street Food & Chaat Fiesta",
    tagline: "Crowd-favorite street food delights with hot Gulab Jamun & signature Pan Shot",
    price: 330,
    priceFormatted: "₹ 330/-",
    badge: "Most Popular",
    isPopular: true,
    idealFor: "Lively kitty parties & modern festive afternoons",
    welcomeDrink: "Tea / Coffee / Fresh Soup",
    starters: [
      "Spring Roll (2 Pcs)",
      "Hara Bhara Kabab (2 Pcs)",
      "Crispy Veg Pakoda",
      "Golden Crispy Corn",
      "Honey Chilli Potato",
    ],
    startersCount: "Any 2 Starters",
    startersNote: "Choose any 2 starters from the chef's special selection",
    mainCourse: [
      "Delhi Special Chola Bhatura",
      "Rich Butter Pav Bhaji",
      "Crispy South Indian Masala Dosa",
    ],
    salad: "Fresh Onion Salad",
    curd: "-",
    rice: "-",
    breads: "Fluffy Bhature & Butter-toasted Pav",
    accompaniments: "Coconut Chutney, Sambar & Pickled Onions",
    dessert: "Hot Gulab Jamun",
    iceCream: "-",
    premiumDessert: "-",
    mouthFreshener: "Signature Royal Pan Shot (One Time)",
    features: [
      "Choice of 2 Starters",
      "Triple Street Food Combo (Chole Bhature + Pav Bhaji + Dosa)",
      "Hot Gulab Jamun",
      "Royal Pan Shot included",
    ],
  },
  {
    id: "kitty-03",
    menuNo: "Menu 03",
    name: "Royal North Indian Feast",
    tagline: "An opulent North Indian spread featuring Paneer delicacy, Butter Roti & Boondi Raita",
    price: 350,
    priceFormatted: "₹ 350/-",
    badge: "Chef's Recommendation",
    idealFor: "Elegant kitty gatherings & celebratory lunches",
    welcomeDrink: "Tea / Coffee / Fresh Soup",
    starters: [
      "Spring Roll (2 Pcs)",
      "Hara Bhara Kabab (2 Pcs)",
      "Crispy Veg Pakoda",
      "Golden Crispy Corn",
      "Honey Chilli Potato",
    ],
    startersCount: "Any 2 Starters",
    startersNote: "Choose any 2 starters from the chef's special selection",
    mainCourse: [
      "Royal Paneer Veg Specialty",
      "Fresh Seasonal Mix Veg",
      "Homestyle Dal Tadka",
    ],
    salad: "Garden Fresh Green Salad",
    curd: "Chilled Boondi Raita",
    rice: "Aromatic Veg Pulao",
    breads: "Butter Roti / Crispy Lachha Paratha",
    accompaniments: "Achar, Roasted Papad, Mint Chutney",
    dessert: "Royal Gulab Jamun",
    iceCream: "-",
    premiumDessert: "-",
    mouthFreshener: "Signature Royal Pan Shot (One Time)",
    features: [
      "Choice of 2 Starters",
      "Rich Paneer Veg + Mix Veg + Dal Tadka",
      "Butter Roti & Lachha Paratha",
      "Boondi Raita, Gulab Jamun & Pan Shot",
    ],
  },
];

export const PARTY_BANQUET_PACKAGES: BanquetPackage[] = [
  {
    id: "party-01",
    menuNo: "Menu 01",
    name: "Classic Celebration Banquet",
    tagline: "Unlimited royal dining featuring gourmet Paneer delicacy, Jeera Rice & Desi Ghee Gulab Jamun",
    price: 350,
    priceFormatted: "₹ 350/-",
    badge: "Unlimited Meal",
    unlimitedMeal: true,
    idealFor: "Family get-togethers, small reunions & milestone dinners",
    welcomeDrink: "Tea / Coffee / Fresh Soup",
    starters: ["1 Chef Special Veg Starter"],
    startersCount: "1 Starter (Veg)",
    startersNote: "Crisp hot vegetable starter served fresh",
    mainCourse: [
      "Royal Paneer Veg Specialty",
      "Homestyle Seasonal Mix Veg",
      "Slow-simmered Dal Tadka",
    ],
    salad: "Garden Fresh Green Salad",
    curd: "Boondi Raita / Fresh Veg Raita",
    rice: "Fragrant Jeera Rice",
    breads: "Butter Roti / Crispy Lachha Paratha",
    accompaniments: "Papad, Royal Achar & Green Salad",
    dessert: "Warm Gulab Jamun (Prepared in Pure Desi Ghee)",
    iceCream: "-",
    premiumDessert: "-",
    mouthFreshener: "Royal Mint Freshener",
    features: [
      "Unlimited Meal Guarantee",
      "1 Veg Starter + Royal Paneer Dish",
      "Butter Roti & Lachha Paratha",
      "Pure Desi Ghee Gulab Jamun",
    ],
  },
  {
    id: "party-02",
    menuNo: "Menu 02",
    name: "Signature Grand Celebration",
    tagline: "Our most requested banquet spread with 2 Starters, choice of Malai Kofta, and Gourmet Ice Cream",
    price: 450,
    priceFormatted: "₹ 450/-",
    badge: "Most Popular • Unlimited",
    isPopular: true,
    unlimitedMeal: true,
    idealFor: "Birthday bashes, anniversary galas & engagement ceremonies",
    welcomeDrink: "Tea / Coffee / Fresh Soup",
    starters: ["2 Handcrafted Veg Starters"],
    startersCount: "2 Starters (Veg)",
    startersNote: "Two handcrafted hot veg appetizers",
    mainCourse: [
      "Royal Paneer Veg Specialty",
      "Choice: Mix Veg / Malai Kofta / Chana Masala",
      "Slow-simmered Dal Tadka",
    ],
    salad: "Crisp Green Salad",
    curd: "Choice: Boondi / Veg / Refreshing Fruit Raita",
    rice: "Veg Pulao / Fragrant Jeera Rice",
    breads: "Butter Roti, Lachha Paratha / Fresh Tandoori Naan",
    accompaniments: "Crispy Papad, Royal Achar & Salad",
    dessert: "Warm Gulab Jamun (Pure Desi Ghee)",
    iceCream: "Choice: Vanilla / Chocolate / Strawberry / Butterscotch",
    premiumDessert: "-",
    mouthFreshener: "Royal Mint Freshener",
    features: [
      "Unlimited Meal Spread",
      "2 Veg Starters + Butter Naan & Lachha",
      "Choice of Malai Kofta or Chana Masala",
      "Fruit Raita & Choice of Gourmet Ice Cream",
    ],
  },
  {
    id: "party-03",
    menuNo: "Menu 03",
    name: "Maharaja Sheesh Mahal Imperial Feast",
    tagline: "The pinnacle of royal indulgence: Welcome Mocktail, Paneer Starter, Kaju Delicacy, Dal Makhani & 2 Sweets",
    price: 600,
    priceFormatted: "₹ 600/-",
    badge: "Chef's Crown • Royal Luxury",
    isPopular: true,
    unlimitedMeal: true,
    idealFor: "Weddings, grand receptions, VIP corporate banquets & lavish soirées",
    welcomeDrink: "Tea / Coffee / Soup + 1 Welcome Signature Mocktail",
    starters: [
      "3 Starters Total",
      "1 Gourmet Paneer Starter",
      "2 Chef Special Veg Starters",
    ],
    startersCount: "3 Starters (1 Paneer + 2 Veg)",
    startersNote: "Includes 1 premium Paneer starter and 2 handcrafted veg starters",
    mainCourse: [
      "Royal Paneer Veg Specialty",
      "Choice: Mix Veg / Malai Kofta / Chana Masala",
      "Royal Delicacy: Kaju Masala / Rich Kaju Curry",
      "Dal Tadka / Rich Dal Makhani (Slow-cooked overnight)",
    ],
    salad: "Triple Salad Trio (Green Salad / Onion Salad / Sirka Pickled Onion)",
    curd: "Choice: Boondi / Veg / Royal Fruit Raita",
    rice: "Fragrant Veg Pulao / Royal Veg Dum Biryani",
    breads: "Butter Roti, Crispy Lachha Paratha & Butter Naan",
    accompaniments: "Roasted Papad, Royal Achar, Salad & Dips",
    dessert: "Hot Gulab Jamun (Pure Desi Ghee)",
    iceCream: "Choice: Vanilla / Rich Chocolate / Butterscotch",
    premiumDessert: "Choice of Any Two: Moong Dal Halwa (Desi Ghee) / Malai Barfi / Royal Gulab Jamun",
    mouthFreshener: "Signature Royal Pan Shot & Refreshing Mukhwas",
    features: [
      "Unlimited Grand Feast + Welcome Mocktail",
      "3 Starters with 1 Gourmet Paneer Starter",
      "Kaju Masala / Kaju Curry & Rich Dal Makhani",
      "2 Premium Sweets (Moong Dal Halwa / Malai Barfi) + Ice Cream",
    ],
  },
];

export const BANQUET_CONTACT = {
  coordinator: "Ronak",
  phone: "+91 9799788514",
  cleanPhone: "919799788514",
  hotelPhone: "+91 8302903734",
  hotelCleanPhone: "918302903734",
  capacity: "50 to 80 Guests",
  kittyMenuPdf: "/menus/kitty-party-menu.pdf",
  partyMenuPdf: "/menus/party-menu.pdf",
  facilities: [
    { title: "Central Air Conditioning", desc: "Comfortable ambient climate control throughout your event" },
    { title: "Pro DJ & Sound Setup", desc: "High-definition sound system and dynamic party lighting available" },
    { title: "Bespoke Royal Decor", desc: "Customized floral arches, photo booths & festive stage arrangements" },
    { title: "Pure Desi Ghee Kitchen", desc: "Hygienic master kitchen crafting fresh, flavorful royal recipes" },
  ],
};
