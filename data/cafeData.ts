export const cafeInfo = {
  name: "Діоніс",
  tagline: "Затишне кафе в серці Коломиї",
  description:
    "Українська та європейська кухня, страви з мангалу, банкетний зал біля вокзалу",
  address: "вул. Січових Стрільців, 58, Коломия",
  phone: "+38 (097) 835-56-35",
  phoneMobile: "+38 (097) 835-56-35",
  email: "dionys.kolomyia@gmail.com",
  workingHours: {
    weekdays: "Щодня: 11:00 – 22:00",
    weekends: "Щодня: 11:00 – 22:00",
  },
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=вул.+Січових+Стрільців+58+Коломия",
  heroImage: "/images/fruit-platter.jpg",
  about: [
    "Кафе «Діоніс» — це місце, де кожен гість почувається як вдома. Тут панує тепла атмосфера, звучить жива музика, а аромати кухні нагадують домашню їжу.",
    "Ми розташовані зручно — поряд із залізничним вокзалом. У нас є просторий банкетний зал на 50 осіб для весіль, ювілеїв та корпоративів.",
    "Наші кухарі щодня готують традиційні українські страви та кращі рецепти з Європи. Особлива гордість — вареники, деруни, пельмені та домашні десерти.",
  ],
};

export type MenuCategory =
  | "all"
  | "mangal"
  | "ukrainian"
  | "european"
  | "vegan"
  | "bar";

export interface CartEntry {
  item: MenuItem;
  qty: number;
}

export interface MenuItem {
  id: number;
  name: string;
  category: MenuCategory[];
  weight: string;
  ingredients: string;
  price: number;
  popular?: boolean;
  vegan?: boolean;
  image?: string;
}

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "mangal", label: "Мангал" },
  { id: "ukrainian", label: "Українська кухня" },
  { id: "european", label: "Європейська кухня" },
  { id: "vegan", label: "Веган / Вегетаріанське" },
  { id: "bar", label: "Бар" },
];

export const menuItems: MenuItem[] = [
  // ── Позиції з реальними фото ────────────────────────────────────
  {
    id: 1,
    name: "Пельмені зі сметаною",
    category: ["ukrainian"],
    weight: "250 г",
    ingredients: "Пшеничне тісто, м'ясний фарш, цибуля, сметана",
    price: 90,
    popular: true,
    image: "/images/pelmeni.jpg",
  },
  {
    id: 2,
    name: "Сирне асорті",
    category: ["european"],
    weight: "280 г",
    ingredients: "Брі, блакитний сир, твердий сир, мед, курага, волоський горіх, м'ята",
    price: 185,
    popular: true,
    image: "/images/cheese.jpg",
  },
  {
    id: 3,
    name: "Грінки з часниковим соусом",
    category: ["ukrainian"],
    weight: "200/50 г",
    ingredients: "Житній хліб на грилі, часниковий соус, зелена цибуля, зелень",
    price: 85,
    image: "/images/croutons.jpg",
  },
  {
    id: 4,
    name: "М'ясна нарізка",
    category: ["ukrainian"],
    weight: "350 г",
    ingredients: "Шинка, рулет з сала, мариновані огірки, гірчиця, цибуля, зелень",
    price: 175,
    popular: true,
    image: "/images/meat-cutting.jpg",
  },
  {
    id: 5,
    name: "Фруктова тарілка",
    category: ["vegan", "european"],
    weight: "400 г",
    ingredients: "Полуниця, грейпфрут, яблуко, банан, нектарин, м'ята",
    price: 145,
    vegan: true,
    image: "/images/fruit-platter.jpg",
  },

  // ── Вареники (реальне меню) ──────────────────────────────────────
  {
    id: 6,
    name: "Вареники з картоплею та сметаною",
    category: ["ukrainian"],
    weight: "250/50 г",
    ingredients: "Борошно, картопля, цибуля, олія, сметана",
    price: 85,
    popular: true,
  },
  {
    id: 7,
    name: "Вареники з картоплею та бринзою",
    category: ["ukrainian"],
    weight: "250/50 г",
    ingredients: "Борошно, картопля, бринза, сметана",
    price: 90,
  },
  {
    id: 8,
    name: "Вареники з творогом та сметаною",
    category: ["ukrainian"],
    weight: "250 г",
    ingredients: "Борошно, сир, яйця, сметана",
    price: 85,
  },
  {
    id: 9,
    name: "Вареники з лівером",
    category: ["ukrainian"],
    weight: "250 г",
    ingredients: "Борошно, печінковий фарш, цибуля, сметана",
    price: 90,
  },

  // ── Деруни (реальне меню) ────────────────────────────────────────
  {
    id: 10,
    name: "Деруни зі сметаною",
    category: ["ukrainian"],
    weight: "200/50 г",
    ingredients: "Картопля, цибуля, яйця, борошно, сметана",
    price: 90,
  },
  {
    id: 11,
    name: "Деруни з м'ясом та грибним соусом",
    category: ["ukrainian"],
    weight: "200/50 г",
    ingredients: "Картопля, яловичина, гриби, грибний соус",
    price: 105,
    popular: true,
  },
  {
    id: 12,
    name: "Деруни по-гуцульськи з бринзою",
    category: ["ukrainian"],
    weight: "230/50 г",
    ingredients: "Картопля, бринза, сметана, зелень",
    price: 98,
  },
  {
    id: 13,
    name: "Деруни по-королівськи",
    category: ["ukrainian"],
    weight: "400 г",
    ingredients: "Картопля, м'ясо, гриби, сир, вершковий соус",
    price: 145,
  },

  // ── Пасти (реальне меню) ─────────────────────────────────────────
  {
    id: 14,
    name: "Паста Карбонара",
    category: ["european"],
    weight: "300 г",
    ingredients: "Спагеті, бекон, яєчний жовток, пармезан, чорний перець",
    price: 165,
    popular: true,
  },
  {
    id: 15,
    name: "Паста з куркою під вершками",
    category: ["european"],
    weight: "300 г",
    ingredients: "Паста, куряче філе, вершки, часник, зелень",
    price: 155,
  },
  {
    id: 16,
    name: "Паста з креветками",
    category: ["european"],
    weight: "300 г",
    ingredients: "Паста, тигрові креветки, часниково-вершковий соус, зелень",
    price: 185,
  },
  {
    id: 17,
    name: "Паста з тунцем",
    category: ["european"],
    weight: "300 г",
    ingredients: "Паста, тунець, томатний соус, каперси, зелений лук",
    price: 165,
  },

  // ── Мангал ───────────────────────────────────────────────────────
  {
    id: 18,
    name: "Шашлик зі свинини",
    category: ["mangal"],
    weight: "300 г",
    ingredients: "Свинина, цибуля, спеції, маринад",
    price: 185,
    popular: true,
  },
  {
    id: 19,
    name: "Курячі крильця гриль",
    category: ["mangal"],
    weight: "400 г",
    ingredients: "Курячі крила, часниковий соус, зелень",
    price: 155,
  },
  {
    id: 20,
    name: "Овочі гриль",
    category: ["mangal", "vegan"],
    weight: "350 г",
    ingredients: "Перець, цукіні, баклажан, помідор, оливкова олія",
    price: 125,
    vegan: true,
  },

  // ── Десерти (реальне меню) ───────────────────────────────────────
  {
    id: 21,
    name: "Сирники зі сметаною",
    category: ["ukrainian"],
    weight: "200/50 г",
    ingredients: "Сир, яйця, борошно, ваніль, сметана",
    price: 89,
  },
  {
    id: 22,
    name: "Млинці з творогом та сметаною",
    category: ["ukrainian"],
    weight: "200/50 г",
    ingredients: "Борошно, яйця, молоко, сир, сметана",
    price: 89,
  },
  {
    id: 23,
    name: "Морозиво з медом та горіхами",
    category: ["european"],
    weight: "150 г",
    ingredients: "Пломбір, натуральний мед, волоський горіх",
    price: 69,
  },

  // ── Бар ──────────────────────────────────────────────────────────
  {
    id: 24,
    name: "Лимонад домашній",
    category: ["bar"],
    weight: "500 мл",
    ingredients: "Лимон, м'ята, цукор, газована вода",
    price: 75,
    popular: true,
  },
  {
    id: 25,
    name: "Узвар",
    category: ["bar"],
    weight: "400 мл",
    ingredients: "Сухофрукти, мед, кориця",
    price: 55,
  },
  {
    id: 26,
    name: "Кава капучіно",
    category: ["bar"],
    weight: "250 мл",
    ingredients: "Еспресо, молоко, молочна піна",
    price: 65,
  },
  {
    id: 27,
    name: "Чай з травами",
    category: ["bar", "vegan"],
    weight: "400 мл",
    ingredients: "М'ята, меліса, чебрець, мед",
    price: 45,
    vegan: true,
  },
];

export const banquetInfo = {
  capacity: 50,
  minGuests: 10,
  description:
    "Просторий банкетний зал до 50 гостей з живою музикою та індивідуальним підходом до кожного свята. Весілля, ювілеї, корпоративи — ми зробимо вашу подію незабутньою.",
  gallery: [
    { src: "/images/banquet-hall-1.jpg", alt: "Банкетний зал кафе Діоніс" },
    { src: "/images/banquet-hall-2.jpg", alt: "Банкетний стіл зі стравами" },
  ],
  features: [
    "Зал до 50 гостей",
    "Жива музика",
    "Власне меню або вибір із нашого",
    "Декорування залу",
    "Персональний менеджер",
    "Безкоштовне паркування",
  ],
  menuOptions: [
    {
      id: "standard",
      label: "Стандарт",
      pricePerPerson: 450,
      description: "Гаряче, салати, закуски, напої",
    },
    {
      id: "premium",
      label: "Преміум",
      pricePerPerson: 750,
      description: "Розширене меню, морепродукти, преміум напої",
    },
  ],
};

export const deliveryInfo = {
  minOrder: 200,
  deliveryPrice: 50,
  freeDeliveryFrom: 500,
  zones: ["Центр", "Вокзал", "Пасічна", "Мальованка"],
  workingHours: "11:00 – 22:00",
  selfPickupDiscount: 5,
  description:
    "Доставляємо свіжі страви через Glovo та Bolt Food. Замовляйте зручно у додатку!",
  deliveryApps: [
    { name: "Glovo", icon: "🛵" },
    { name: "Bolt Food", icon: "⚡" },
  ],
};

export const navLinks = [
  { label: "Меню", href: "#menu" },
  { label: "Банкети", href: "#banquet" },
  { label: "Про нас", href: "#about" },
  { label: "Контакти", href: "#contacts" },
];
