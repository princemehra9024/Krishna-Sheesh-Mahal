export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  tag?: "Bestseller" | "Chef's Special" | "Royal Heritage" | "Popular" | "Must Try" | "House Special";
  isSub?: boolean;
}

export interface MenuSubSection {
  subTitle?: string;
  items: MenuItem[];
}

export interface BookMenuPageData {
  pageNumber: number;
  folio: string;
  title: string;
  subTitle?: string;
  quote?: string;
  sections: MenuSubSection[];
}

export const BOOK_NAV_TABS = [
  { label: "Cover", pageIndex: 0, iconId: "cover" },
  { label: "Contents", pageIndex: 1, iconId: "contents" },
  { label: "Soups & Shakes", pageIndex: 3, iconId: "soups" },
  { label: "Starters & Chai", pageIndex: 4, iconId: "starters" },
  { label: "Chinese & Asian", pageIndex: 5, iconId: "chinese" },
  { label: "Raita & Salads", pageIndex: 6, iconId: "raita" },
  { label: "Royal Paneer", pageIndex: 7, iconId: "paneer" },
  { label: "Desi Tadka", pageIndex: 8, iconId: "tadka" },
  { label: "Kaju & Dal", pageIndex: 9, iconId: "kaju" },
  { label: "Rice & Breads", pageIndex: 10, iconId: "rice" },
  { label: "Pizza & Continental", pageIndex: 11, iconId: "continental" },
  { label: "South & Combos", pageIndex: 12, iconId: "south" },
  { label: "Royal Thalis", pageIndex: 13, iconId: "thali" },
  { label: "Sweet Desserts", pageIndex: 14, iconId: "desserts" },
  { label: "Back Cover", pageIndex: 15, iconId: "back" },
];

export const BOOK_PAGES: BookMenuPageData[] = [
  // Page 3: Soups & Shakes & Mocktails
  {
    pageNumber: 3,
    folio: "Page I",
    title: "Soups & Signature Mocktails",
    subTitle: "Artisanal broths & chilled concoctions to awaken your senses",
    sections: [
      {
        subTitle: "ARTISANAL SOUPS",
        items: [
          { id: "s-1", name: "Cream of Tomato", price: "130/-", description: "Velvety sun-ripened tomatoes finished with fresh clotted cream and crisp herbed croutons.", tag: "Popular" },
          { id: "s-2", name: "Hot n Sour Soup", price: "130/-", description: "Fiery wok-tossed vegetable broth infused with red chillies, dark soy, and vinegar." },
          { id: "s-3", name: "Sweet Corn Soup", price: "130/-", description: "Golden tender sweet corn pearls steeped in a silky, comforting clear broth." },
          { id: "s-4", name: "Veg Manchow", price: "130/-", description: "Spicy garlic and ginger infused broth garnished with crispy fried golden noodles.", tag: "Bestseller" },
          { id: "s-5", name: "Cream of Mushroom", price: "130/-", description: "Earthy button mushrooms slow-simmered with aromatic thyme and velvety white roux." },
          { id: "s-6", name: "Thai Soup", price: "160/-", description: "Fragrant lemongrass, galangal, kaffir lime and creamy coconut milk infusion.", tag: "Chef's Special" },
        ],
      },
      {
        subTitle: "SIGNATURE SHAKES & MOCKTAILS",
        items: [
          { id: "m-1", name: "Pan Shake (Sheeshmahal Special)", price: "180/-", description: "Our royal betel leaf blend with fragrant gulkand, cardamom, and chilled cream.", tag: "Royal Heritage" },
          { id: "m-2", name: "Nutella Banana Shake", price: "240/-", description: "Rich hazelnut chocolate swirl blended with fresh ripe bananas and thick milk.", tag: "Bestseller" },
          { id: "m-3", name: "Oreo Shake", price: "200/-", description: "Crunchy chocolate sandwich cookies blended with vanilla gelato and whipped cream." },
          { id: "m-4", name: "Chocolate Shake", price: "190/-", description: "Decadent Dutch cocoa reduction blended with chilled milk and chocolate drizzle." },
          { id: "m-5", name: "Peanut Butter Shake", price: "200/-", description: "Roasted artisanal peanut butter, caramel undertones, and velvety milk." },
          { id: "m-6", name: "Kesar Pista Shake", price: "210/-", description: "Royal Kashmiri saffron strands with crushed Iranian pistachios.", tag: "Royal Heritage" },
          { id: "m-7", name: "Mint Mojito", price: "180/-", description: "Muddled garden mint leaves, freshly pressed key limes, and sparkling fizz." },
          { id: "m-8", name: "Green Apple Mint", price: "180/-", description: "Crisp green apple purée shaken with fresh mint and citrus bubbles." },
          { id: "m-9", name: "Red Bull Mojito", price: "240/-", description: "Energy boost of Red Bull paired with crushed mint, lime, and chilled soda." },
          { id: "m-10", name: "Kala Khatta", price: "210/-", description: "Nostalgic tangy jamun berry reduction with black salt and lemon splash." },
          { id: "m-11", name: "Blue Lagoon", price: "190/-", description: "Vibrant curacao citrus syrup topped with sparkling lemonade and crushed ice." },
          { id: "m-12", name: "Fresh Lime Soda", price: "110/-", description: "Sweet, salted, or mixed freshly squeezed lime with chilled sparkling soda." },
        ],
      },
    ],
  },

  // Page 4: Hot & Cold Beverages, Chai & Tandoori Starters
  {
    pageNumber: 4,
    folio: "Page II",
    title: "Beverages & Tandoori Starters",
    subTitle: "Traditional clay-oven roasted delicacies & fresh brews",
    sections: [
      {
        subTitle: "HOT & COLD BEVERAGES",
        items: [
          { id: "b-1", name: "Masala Tea", price: "50/-", description: "Slow-brewed Assam tea leaves with crushed cardamom, ginger, cloves, and whole milk.", tag: "Bestseller" },
          { id: "b-2", name: "Traditional Tea", price: "40/-", description: "Steaming classic aromatic milk tea." },
          { id: "b-3", name: "Hot Coffee", price: "60/-", description: "Frothy freshly frothed espresso milk blend." },
          { id: "b-4", name: "Cold Coffee", price: "170/-", description: "Rich brewed espresso blended with chilled milk and crushed ice." },
          { id: "b-5", name: "Cold Coffee With Ice Cream", price: "190/-", description: "Topped with a generous scoop of artisanal vanilla gelato.", tag: "Must Try" },
          { id: "b-6", name: "Milkshake with Ice Cream", price: "150/-", description: "Choice of sweet Mango, Banana, Strawberry, or Vanilla gelato." },
        ],
      },
      {
        subTitle: "CLAY OVEN TANDOORI STARTERS",
        items: [
          { id: "st-1", name: "Paneer Tikka Roasted", price: "300/-", description: "Char-grilled fresh cottage cheese marinated in mustard oil, yogurt, and degi mirch.", tag: "Bestseller" },
          { id: "st-2", name: "Achari Paneer Tikka Roasted", price: "310/-", description: "Infused with tangy pickling spices and fennel, roasted over live charcoal coals.", tag: "Chef's Special" },
          { id: "st-3", name: "Malai Paneer Tikka", price: "300/-", description: "Melt-in-mouth cottage cheese soaked in rich cream, cashew paste, and green cardamom." },
          { id: "st-4", name: "Soya Chaap Tikka", price: "260/-", description: "Succulent soya chaap rolls infused in robust tandoori marinade and spices." },
          { id: "st-5", name: "Soya Malai Chaap Tikka", price: "270/-", description: "Velvety soya chaap bathed in malai cream, cheese, and crushed peppercorns.", tag: "Popular" },
          { id: "st-6", name: "Tandoori Mushroom Tikka", price: "280/-", description: "Plump button mushrooms marinated in aromatic herbs and smoked in the bhatti." },
          { id: "st-7", name: "Hara Bhara Kabab", price: "190/-", description: "Crisp patties of blanched spinach, garden green peas, and fragrant herbs." },
          { id: "st-8", name: "Paneer Pakoda (8 Pcs)", price: "230/-", description: "Spiced paneer stuffed with mint chutney, coated in golden gram flour batter." },
          { id: "st-9", name: "Veg Pakoda (8 Pcs)", price: "180/-", description: "Assorted seasonal garden vegetable fritters fried to crisp golden perfection." },
        ],
      },
    ],
  },

  // Page 5: Chinese & Asian Wok
  {
    pageNumber: 5,
    folio: "Page III",
    title: "Indo-Chinese & Asian Wok",
    subTitle: "High-flame wok tossed delicacies with oriental aromatics",
    sections: [
      {
        subTitle: "DIMSUMS & APPETIZERS",
        items: [
          { id: "ch-1", name: "Spring Roll", price: "190/-", description: "Crispy fried wafer wrappers packed with julienned vegetables and ginger garlic.", tag: "Popular" },
          { id: "ch-2", name: "Steam Momos (8 Pcs)", price: "170/-", description: "Delicate dumplings packed with spiced minced veggies, served with spicy red chutney." },
          { id: "ch-3", name: "Fried Momos (8 Pcs)", price: "180/-", description: "Golden crisp fried dumplings served with tangy schezwan dip.", tag: "Bestseller" },
          { id: "ch-4", name: "Chilly Paneer Dry / Gravy", price: "280/-", description: "Crisp cottage cheese tossed with bell peppers, spring onions, and spicy soya sauce.", tag: "Chef's Special" },
          { id: "ch-5", name: "Honey Chilli Potato", price: "210/-", description: "Crisp finger potato wedges glazed in sticky honey, crushed chillies, and toasted sesame." },
          { id: "ch-6", name: "Chilli Potato", price: "200/-", description: "Crispy fried potatoes tossed in tangy chilli garlic sauce with crunchy capsicum." },
          { id: "ch-7", name: "Crispy Corn Fritters", price: "210/-", description: "Crunchy sweet corn kernels tossed with fresh scallions and ground white pepper." },
          { id: "ch-8", name: "Cheese Corn Ball", price: "280/-", description: "Gooey melted mozzarella and sweet corn bites wrapped in a crisp golden shell." },
        ],
      },
      {
        subTitle: "WOK NOODLES, RICE & SIZZLERS",
        items: [
          { id: "ch-9", name: "Hakka Noodles", price: "150/-", description: "Classic wok-tossed thin wheat noodles with crisp julienned vegetables and light soy." },
          { id: "ch-10", name: "Chilli Garlic Noodles", price: "170/-", description: "Spicy noodles tossed with burnt garlic flakes and fiery red chilli oil.", tag: "Must Try" },
          { id: "ch-11", name: "Paneer Chowmein", price: "180/-", description: "Street-style chowmein noodles loaded with tender paneer cubes and veggies." },
          { id: "ch-12", name: "Fried Rice", price: "190/-", description: "Fluffy basmati rice tossed with diced carrots, beans, and aromatic Asian sesame." },
          { id: "ch-13", name: "Schezwan Fried Rice", price: "200/-", description: "Fiery wok-tossed rice tossed with homemade schezwan pepper sauce." },
          { id: "ch-14", name: "Veg Manchurian Dry / Gravy", price: "190/-", description: "Savory vegetable dumplings simmered in a dark, luscious garlic coriander glaze." },
          { id: "ch-15", name: "Chinese Sizzler", price: "380/-", description: "Sizzling platter with fried rice, noodles, chilli paneer, manchurian, and french fries.", tag: "House Special" },
          { id: "ch-16", name: "Veg Sizzler", price: "380/-", description: "Smoking cast-iron plate loaded with grilled cutlets, buttered vegetables, and fries." },
        ],
      },
    ],
  },

  // Page 6: Accompaniments: Raita, Salads & Papad
  {
    pageNumber: 6,
    folio: "Page IV",
    title: "Raitas, Salads & Papad",
    subTitle: "Cooling curds, garden crispness & savory papad crisps",
    sections: [
      {
        subTitle: "ROYAL RAITAS & CHHACH",
        items: [
          { id: "r-1", name: "Dahi Tadke Wala", price: "120/-", description: "Fresh churned curd tempered with cumin seeds, roasted mustard, and curry leaves.", tag: "Chef's Special" },
          { id: "r-2", name: "Boondi Raita", price: "150/-", description: "Whisked spiced curd loaded with crispy salted gram-flour boondi pearls." },
          { id: "r-3", name: "Veg Raita", price: "160/-", description: "Finely diced cucumber, tomatoes, and onions folded into creamy spiced curd." },
          { id: "r-4", name: "Fruit Raita", price: "200/-", description: "Sweetened creamy curd loaded with fresh seasonal fruits and roasted pomegranate." },
          { id: "r-5", name: "Masala Chhach", price: "50/-", description: "Spiced Rajasthani buttermilk churned with mint, roasted cumin, and black salt.", tag: "Bestseller" },
          { id: "r-6", name: "Kesriya Lassi", price: "60/-", description: "Thick sweet yogurt beverage perfumed with Kashmiri saffron strands." },
        ],
      },
      {
        subTitle: "FRESH SALADS & CHATS",
        items: [
          { id: "sl-1", name: "Kachumber Salad", price: "110/-", description: "Finely diced cucumbers, red onions, and tomatoes tossed with lemon and chaat masala." },
          { id: "sl-2", name: "Peanut Chat", price: "110/-", description: "Crunchy roasted peanuts tossed with onions, green chillies, coriander, and lime juice.", tag: "Popular" },
          { id: "sl-3", name: "Green Salad", price: "90/-", description: "Sliced fresh cucumbers, tomatoes, carrots, and onions with lemon wedges." },
          { id: "sl-4", name: "Sirka Onion", price: "90/-", description: "Button onions pickled in sweet beet-infused vinegar." },
          { id: "sl-5", name: "Fry Green Chilly", price: "80/-", description: "Salted and lightly fried fresh green chillies." },
        ],
      },
      {
        subTitle: "ROASTED & FRIED PAPAD",
        items: [
          { id: "p-1", name: "Papad Churi", price: "110/-", description: "Crushed roasted papad tossed with desi ghee, onions, spices, and fresh coriander.", tag: "Royal Heritage" },
          { id: "p-2", name: "Roasted Masala Papad", price: "40/-", description: "Crisp tandoor roasted papad topped with spicy diced onion-tomato salsa." },
          { id: "p-3", name: "Fry Masala Papad", price: "45/-", description: "Golden fried papad loaded with zesty tangy kachumber topping." },
          { id: "p-4", name: "Roasted Papad / Fry Papad", price: "35/- / 40/-", description: "Classic spiced lentil wafer, either charcoal-roasted or crispy golden fried." },
        ],
      },
    ],
  },

  // Page 7: Royal Paneer Creations (Chef's Special)
  {
    pageNumber: 7,
    folio: "Page V",
    title: "Royal Paneer Specialties",
    subTitle: "Rich gravies prepared with fresh Malwa malai paneer & royal spices",
    sections: [
      {
        subTitle: "CHEF'S SIGNATURE PANEER",
        items: [
          { id: "pnr-1", name: "Paneer Patiyala", price: "330/-", description: "Stuffed paneer rolls smothered in a luscious double-layered rich cashew and tomato gravy.", tag: "Bestseller" },
          { id: "pnr-2", name: "Paneer Kurchan", price: "295/-", description: "Shredded paneer tossed with capsicum, tomatoes, and hand-ground kadai spices on a tawa.", tag: "Chef's Special" },
          { id: "pnr-3", name: "Paneer Chingari", price: "310/-", description: "Spicy aromatic preparation with fried paneer chunks in a fiery red gravy.", tag: "Must Try" },
          { id: "pnr-4", name: "Paneer Angara", price: "300/-", description: "Charcoal-smoked gravy offering deep earthen tandoori aroma and spicy zest.", tag: "Royal Heritage" },
          { id: "pnr-5", name: "Paneer Tikka Masala", price: "295/-", description: "Clay-oven charred paneer tikka bathed in an unctuous makhani tomato reduction.", tag: "Popular" },
          { id: "pnr-6", name: "Paneer Changeji", price: "295/-", description: "Old Delhi style rich roasted masala sauce with tender paneer cubes." },
          { id: "pnr-7", name: "Paneer Lahori", price: "295/-", description: "Pungent, aromatic gravy infused with black pepper, coriander seeds, and dry fenugreek." },
          { id: "pnr-8", name: "Handi Paneer", price: "280/-", description: "Slow-cooked in an earthen clay handi with whole spices, onion paste, and fresh cream." },
          { id: "pnr-9", name: "Shahi Paneer", price: "290/-", description: "Royal Mughal gravy of sweet cream, white butter, cashews, and saffron essence." },
          { id: "pnr-10", name: "Butter Paneer Masala", price: "290/-", description: "Classic silky tomato gravy simmered with Amul butter and fragrant kasuri methi.", tag: "Bestseller" },
          { id: "pnr-11", name: "Kadai Paneer", price: "290/-", description: "Paneer tossed with crunchy bell peppers, onions, and freshly pounded coriander seeds." },
          { id: "pnr-12", name: "Paneer Bhurji", price: "280/-", description: "Scrambled cottage cheese sautéed with onions, green chillies, tomatoes, and desi ghee." },
          { id: "pnr-13", name: "Naughty Paneer", price: "300/-", description: "House mystery fusion recipe with tangy, sweet, and spicy culinary notes.", tag: "House Special" },
        ],
      },
    ],
  },

  // Page 8: Desi Tadka: Traditional Rajasthani & North Indian
  {
    pageNumber: 8,
    folio: "Page VI",
    title: "Desi Tadka & Heritage Curries",
    subTitle: "Time-honored recipes simmered in pure desi ghee and hand-ground spices",
    sections: [
      {
        subTitle: "RAJASTHANI & DESI HERITAGE",
        items: [
          { id: "dt-1", name: "Gatta Masala", price: "200/-", description: "Traditional steamed gram flour dumplings cooked in a fragrant spiced curd gravy.", tag: "Royal Heritage" },
          { id: "dt-2", name: "Sev Tamatar", price: "210/-", description: "Tangy sweet-and-sour tomato curry topped with crisp Ratlami sev crisps.", tag: "Bestseller" },
          { id: "dt-3", name: "Punjabi Chole", price: "240/-", description: "Dark rustic chickpea curry slow-cooked with dried pomegranate seeds and tea leaf decoction.", tag: "Popular" },
          { id: "dt-4", name: "Dum Aloo Stuffed", price: "240/-", description: "Crisp potato barrels stuffed with seasoned paneer, simmered in rich gravy.", tag: "Chef's Special" },
          { id: "dt-5", name: "Methi Matar Malai", price: "280/-", description: "Sweet green peas and fresh fenugreek leaves bathed in rich cashew cream sauce." },
          { id: "dt-6", name: "Nav Ratan Korma", price: "290/-", description: "Nine jewels of vegetables, dried fruits, and nuts in an ultra-creamy white gravy." },
          { id: "dt-7", name: "Mix Veg", price: "250/-", description: "Medley of seasonal fresh vegetables tossed in a semi-dry onion tomato masala." },
          { id: "dt-8", name: "Kadi Pakoda", price: "210/-", description: "Rajasthani spiced buttermilk kadhi with fluffy gram flour pakodas." },
          { id: "dt-9", name: "Bhindi Masala", price: "200/-", description: "Tender crisp okra sautéed with caramelized onions and dry mango powder." },
          { id: "dt-10", name: "Sev Bhaji", price: "220/-", description: "Spicy dhaba style curry enriched with crunchy savory sev and fresh coriander." },
          { id: "dt-11", name: "Jeera Aloo", price: "180/-", description: "Diced baby potatoes tempered with roasted cumin seeds and turmeric." },
        ],
      },
    ],
  },

  // Page 9: Royal Kaju, Kofta & Slow-Cooked Dal
  {
    pageNumber: 9,
    folio: "Page VII",
    title: "Royal Kaju, Kofta & Dal",
    subTitle: "Cashew delicacies, handmade kofta dumplings & slow-cooked lentils",
    sections: [
      {
        subTitle: "KAJU & KOFTA SPECIALTIES",
        items: [
          { id: "kj-1", name: "Kaju Curry", price: "310/-", description: "Whole roasted cashew nuts simmered in a rich velvety tomato and cream gravy.", tag: "Royal Heritage" },
          { id: "kj-2", name: "Kaju Paneer", price: "350/-", description: "Luxurious royal combination of fresh paneer cubes and golden cashews in spiced gravy.", tag: "Chef's Special" },
          { id: "kj-3", name: "Sheesh Mahal Special Kofta", price: "290/-", description: "Chef's secret dry fruit stuffed paneer koftas in an opulent saffron gravy.", tag: "House Special" },
          { id: "kj-4", name: "Malai Kofta", price: "270/-", description: "Velvety cottage cheese and mawa dumplings served in sweet silky cashew gravy.", tag: "Bestseller" },
          { id: "kj-5", name: "Mushroom Masala", price: "280/-", description: "Fresh button mushrooms tossed with diced capsicum in a hearty masala." },
          { id: "kj-6", name: "Mushroom Paneer Masala", price: "330/-", description: "Duet of tender mushrooms and fresh paneer in aromatic tawa gravy." },
        ],
      },
      {
        subTitle: "SLOW-COOKED LENTILS (DAL)",
        items: [
          { id: "dl-1", name: "Dal Makhani", price: "260/-", description: "Whole black urad lentils slow-cooked overnight with churned butter and sweet cream.", tag: "Bestseller" },
          { id: "dl-2", name: "Dal Tadka", price: "240/-", description: "Yellow arhar dal tempered with garlic, roasted cumin, and dry red chillies in desi ghee.", tag: "Popular" },
          { id: "dl-3", name: "Dal Fry", price: "230/-", description: "Comforting yellow lentils sautéed with onions, fresh tomatoes, and green chillies." },
          { id: "dl-4", name: "Sheeshmahal Special Mix Dal", price: "250/-", description: "Panchmel five-lentil royal blend tempered with heeng, cloves, and desi ghee.", tag: "Royal Heritage" },
          { id: "dl-5", name: "Dhaba Dal", price: "230/-", description: "Rustic spiced highway-style lentils cooked with smoky charred garlic." },
        ],
      },
    ],
  },

  // Page 10: Basmati Ki Sugandh & Artisan Tandoori Breads
  {
    pageNumber: 10,
    folio: "Page VIII",
    title: "Basmati Rice & Indian Breads",
    subTitle: "Aromatic long-grain basmati & tandoor-baked flatbreads",
    sections: [
      {
        subTitle: "BASMATI KI SUGANDH",
        items: [
          { id: "rc-1", name: "Hyderabadi Biryani (With Curd)", price: "240/-", description: "Layers of fragrant long-grain basmati rice and marinated vegetables cooked on dum.", tag: "Bestseller" },
          { id: "rc-2", name: "Veg Biryani", price: "210/-", description: "Aromatic spiced rice tossed with seasonal garden vegetables and saffron milk." },
          { id: "rc-3", name: "Veg Pulao", price: "180/-", description: "Mildly spiced basmati rice tossed with garden peas, carrots, and whole spices." },
          { id: "rc-4", name: "Jeera Rice", price: "160/-", description: "Steamed fluffy basmati rice tempered with golden roasted cumin seeds in ghee." },
          { id: "rc-5", name: "Steamed Plain Rice", price: "110/-", description: "Pure fragrant long-grain steamed white basmati rice." },
        ],
      },
      {
        subTitle: "ARTISAN TANDOORI BREADS",
        items: [
          { id: "br-1", name: "Butter Naan", price: "60/-", description: "Soft clay-oven baked refined flour bread generously brushed with melted butter.", tag: "Bestseller" },
          { id: "br-2", name: "Garlic Naan", price: "90/-", description: "Topped with minced garlic flakes and fresh chopped coriander.", tag: "Popular" },
          { id: "br-3", name: "Chur Chur Naan", price: "90/-", description: "Crisp flaky tandoori naan crushed with butter and aromatic spices.", tag: "Chef's Special" },
          { id: "br-4", name: "Cheese Paneer Naan", price: "140/-", description: "Stuffed with seasoned mozzarella cheese and grated cottage cheese.", tag: "Must Try" },
          { id: "br-5", name: "Laccha Paratha", price: "50/-", description: "Multi-layered flaky whole wheat paratha baked crisp in the tandoor." },
          { id: "br-6", name: "Missi Roti / Makka", price: "50/-", description: "Gram flour and fenugreek flatbread spiced with ajwain and onions." },
          { id: "br-7", name: "Tandoori / Tawa Roti (Butter)", price: "25/-", description: "Fresh whole wheat flatbread brushed with butter." },
          { id: "br-8", name: "Tandoori / Tawa Roti (Plain)", price: "20/-", description: "Classic wholesome whole wheat flatbread." },
          { id: "br-9", name: "Kashmiri Naan", price: "90/-", description: "Mildly sweet naan stuffed with tutti-frutti, dry fruits, and cherries." },
        ],
      },
    ],
  },

  // Page 11: Continental Pastas, Burgers & Handcrafted Pizzas
  {
    pageNumber: 11,
    folio: "Page IX",
    title: "Pastas, Burgers & Pizzeria",
    subTitle: "Artisan stone-baked pizzas, al dente pastas & gourmet sandwiches",
    sections: [
      {
        subTitle: "CONTINENTAL PASTAS & BITES",
        items: [
          { id: "ct-1", name: "Penne Pasta In Alfredo Sauce (White)", price: "210/-", description: "Penne pasta tossed in rich parmesan cream sauce, garlic, and fresh herbs.", tag: "Bestseller" },
          { id: "ct-2", name: "Red Sauce Pasta (Arrabbiata)", price: "230/-", description: "Spicy roasted tomato sauce with basil, oregano, bell peppers, and olives." },
          { id: "ct-3", name: "Creamy Mushroom Pasta", price: "230/-", description: "Sautéed button mushrooms in a velvety white sauce reduction with herbs." },
          { id: "ct-4", name: "Veg Cheese Grilled Sandwich", price: "140/-", description: "Tripled-decker toasted sandwich packed with spiced veggies and molten cheese.", tag: "Popular" },
          { id: "ct-5", name: "Cheese Paneer Burger", price: "120/-", description: "Grilled marinated paneer steak layered with cheese slice and crunchy lettuce." },
          { id: "ct-6", name: "Aloo Tikki Burger", price: "80/-", description: "Crisp spiced potato patty with house coleslaw in a toasted sesame bun." },
        ],
      },
      {
        subTitle: "HANDCRAFTED STONE-BAKED PIZZAS",
        items: [
          { id: "pz-1", name: "Margherita Pizza", price: "240/-", description: "Classic Italian marinara sauce topped with mozzarella cheese and fresh basil.", tag: "Popular" },
          { id: "pz-2", name: "Paneer Tikka Pizza", price: "250/-", description: "Smoky tandoori paneer, red paprika, capsicum, and stringy mozzarella.", tag: "Bestseller" },
          { id: "pz-3", name: "Cheese Burst Pizza", price: "290/-", description: "Gooey molten liquid cheddar center crust topped with golden mozzarella.", tag: "Must Try" },
          { id: "pz-4", name: "Mexican Delight Pizza", price: "280/-", description: "Spicy jalapenos, sweet golden corn, red onions, and Mexican seasoning." },
          { id: "pz-5", name: "Cheese Garlic Bread", price: "140/-", description: "Baguette slices brushed with garlic herb butter and melted mozzarella." },
        ],
      },
    ],
  },

  // Page 12: South Indian Specialties & Mini Meal Combos
  {
    pageNumber: 12,
    folio: "Page X",
    title: "South Indian & Mini Meals",
    subTitle: "Golden fermented crepes, fluffy idlis & quick satisfying meal platters",
    sections: [
      {
        subTitle: "AUTHENTIC SOUTH INDIAN",
        items: [
          { id: "si-1", name: "Masala Dosa", price: "140/-", description: "Golden crisp rice crepe stuffed with spiced mustard tempered potato mash.", tag: "Bestseller" },
          { id: "si-2", name: "Mysore Masala Dosa", price: "170/-", description: "Spiced with fiery red garlic chutney inside and topped with potato masala.", tag: "Chef's Special" },
          { id: "si-3", name: "Idli Sambhar", price: "100/-", description: "Steamed fluffy rice-lentil cakes served with drumstick sambhar and coconut chutney." },
          { id: "si-4", name: "Family Masala Dosa", price: "250/-", description: "Grand oversized jumbo dosa perfect for the whole family to share together.", tag: "Popular" },
          { id: "si-5", name: "Onion & Chilli Uttapam", price: "180/-", description: "Thick savory pancake studded with roasted onions, green chillies, and coriander." },
          { id: "si-6", name: "Rawa Masala Dosa", price: "170/-", description: "Semolina crepe laced with peppercorns, cashews, and golden crisp edges." },
        ],
      },
      {
        subTitle: "MINI MEALS COMBOS",
        items: [
          { id: "cm-1", name: "Dal Bati Churma Combo", price: "200/-", description: "Panchmel dal, 2 baati in desi ghee, pulao, sweet churma, lahsun chutney, and masala chach.", tag: "Royal Heritage" },
          { id: "cm-2", name: "Chola Bhatura", price: "140/-", description: "Two fluffy puffed bhaturas served with spicy Punjabi chole, pickle, and onion salad.", tag: "Bestseller" },
          { id: "cm-3", name: "Butter Paneer Masala + 2 Laccha", price: "245/-", description: "Creamy butter paneer with two flaky laccha parathas, onion salad, and pickle." },
          { id: "cm-4", name: "Chana Masala + 2 Stuffed Kulcha", price: "230/-", description: "Spiced chana curry paired with two soft tandoor baked stuffed kulchas and raita." },
          { id: "cm-5", name: "Butter Pavbhaji", price: "140/-", description: "Mashed spiced vegetable curry smothered in butter with two toasted pav rolls." },
          { id: "cm-6", name: "Sheeshmahal Special Aloo Puri", price: "120/-", description: "8 crisp pooris served with spicy aloo rasseywali sabzi, raita, and achar." },
        ],
      },
    ],
  },

  // Page 13: Royal Thalis & Winter Heritage Specialties
  {
    pageNumber: 13,
    folio: "Page XI",
    title: "Royal Thalis & Winter Specials",
    subTitle: "The ultimate Rajasthani royal dining feast on a grand brass platter",
    sections: [
      {
        subTitle: "GRAND ROYAL THALIS",
        items: [
          {
            id: "th-1",
            name: "Super Thali",
            price: "299/-",
            description: "Butter Paneer Masala, Chola Curry, Dal Fry, Jeera Pulao, Boondi Raita, Pickle, Salad, Roasted Papad, Namkeen, 1 Pc Gulab Jamun, with 2 Laccha Parathas or 4 Butter Rotis.",
            tag: "Bestseller"
          },
          {
            id: "th-2",
            name: "Deluxe Thali",
            price: "330/-",
            description: "Butter Paneer Masala, Mix Vegetable, Dal Makhani, Jeera Pulao, Rich Fruit Raita, Pickle, Salad, 1 Pc Gulab Jamun, Papad, Namkeen, with 2 Stuffed Parathas or 4 Butter Rotis.",
            tag: "Royal Heritage"
          },
        ],
      },
      {
        subTitle: "WINTER HERITAGE DELICACIES",
        items: [
          {
            id: "w-1",
            name: "Sarso ka Saag & Makke ki Roti",
            price: "180/-",
            description: "Traditional slow-simmered mustard greens with white butter, served with corn flatbreads and jaggery.",
            tag: "Chef's Special"
          },
          {
            id: "w-2",
            name: "Rajasthani Lehsun Chutney",
            price: "120/-",
            description: "Pounded garlic cloves sautéed in pure desi ghee with spicy red chillies.",
            tag: "Popular"
          },
        ],
      },
    ],
  },

  // Page 14: Sweet Confections, Desserts & Ice Cream Cakes
  {
    pageNumber: 14,
    folio: "Page XII",
    title: "Royal Desserts & Confections",
    subTitle: "Artisanal Rajasthani sweets, hot brownies & ice-cream cakes",
    sections: [
      {
        subTitle: "TRADITIONAL & ARTISAN SWEETS",
        items: [
          { id: "ds-1", name: "Gulab Jamun (2 Pcs) Desi Ghee", price: "80/-", description: "Soft mawa dumplings fried in pure desi ghee, soaked in warm cardamom sugar syrup.", tag: "Bestseller" },
          { id: "ds-2", name: "Rasmalai (2 Pcs)", price: "100/-", description: "Spongy cottage cheese patties immersed in saffron rabdi with crushed pistachios.", tag: "Royal Heritage" },
          { id: "ds-3", name: "Desi Ghee Gajar Halwa (Seasonal)", price: "70/-", description: "Slow-roasted red carrots cooked with khoya, desi ghee, and dry fruits.", tag: "Popular" },
          { id: "ds-4", name: "Sizzling Brownie With Chocolate", price: "160/-", description: "Warm fudge brownie on a sizzling hot plate with vanilla ice cream & hot molten fudge.", tag: "Chef's Special" },
          { id: "ds-5", name: "Hot Brownie With Ice Cream", price: "170/-", description: "Gooey chocolate brownie topped with chilled vanilla bean ice cream." },
          { id: "ds-6", name: "Gulab Jamun With Ice Cream", price: "100/-", description: "Heavenly combination of warm desi ghee gulab jamun with cold vanilla ice cream.", tag: "Must Try" },
          { id: "ds-7", name: "Ice-cream Sundae", price: "160/-", description: "Trio of scoops layered with chocolate syrup, nuts, cherries, and wafer rolls." },
          { id: "ds-8", name: "Kesar Pista Ice Cream (2 Scoops)", price: "90/-", description: "Rich saffron and roasted pistachio milk gelato." },
        ],
      },
      {
        subTitle: "CELEBRATION ICE-CREAM CAKES",
        items: [
          { id: "ck-1", name: "Black Forest Ice-Cream Cake", price: "300/-", description: "Layers of chocolate sponge, dark cherries, and rich vanilla ice cream.", tag: "Popular" },
          { id: "ck-2", name: "Cassata Sicilian Cake", price: "340/-", description: "Traditional layered cake with candied fruits, pistachios, and rich gelato.", tag: "Royal Heritage" },
          { id: "ck-3", name: "Red Velvet Ice-Cream Cake", price: "280/-", description: "Velvet sponge layered with sweet cream and berry cream." },
          { id: "ck-4", name: "Dark Chocolate Cake", price: "350/-", description: "Intense Belgian cocoa ice-cream cake with rich chocolate ganache." },
        ],
      },
    ],
  },
];
