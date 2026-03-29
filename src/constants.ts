export const MENU_CATEGORIES = ["Classics", "Specialities", "Sides", "Deals"];

export const MENU_ITEMS = [
  {
    id: 1,
    name: "Margherita",
    description: "Taze mozzarella, fesleğen ve özel domates sosu.",
    price: "180 TL",
    category: "Classics",
    popular: true,
    image: "https://picsum.photos/seed/margherita/400/300"
  },
  {
    id: 2,
    name: "Pepperoni",
    description: "Bol pepperoni, mozzarella ve baharatlı sos.",
    price: "220 TL",
    category: "Classics",
    popular: true,
    image: "https://picsum.photos/seed/pepperoni/400/300"
  },
  {
    id: 3,
    name: "Istanbul Special",
    description: "Sucuk, pastırma, yeşil biber ve mısır.",
    price: "250 TL",
    category: "Specialities",
    popular: true,
    image: "https://picsum.photos/seed/special/400/300"
  },
  {
    id: 4,
    name: "Quattro Formaggi",
    description: "Dört çeşit peynirin eşsiz uyumu.",
    price: "240 TL",
    category: "Specialities",
    popular: false,
    image: "https://picsum.photos/seed/cheese/400/300"
  },
  {
    id: 5,
    name: "Garlic Bread",
    description: "Sarımsaklı ve peynirli çıtır ekmekler.",
    price: "80 TL",
    category: "Sides",
    popular: false,
    image: "https://picsum.photos/seed/garlic/400/300"
  },
  {
    id: 6,
    name: "Family Deal",
    description: "2 Orta Boy Pizza + 1 Litre İçecek + Patates.",
    price: "450 TL",
    category: "Deals",
    popular: true,
    image: "https://picsum.photos/seed/deal/400/300"
  }
];

export const REVIEWS = [
  {
    id: 1,
    author: "Ahmet Y.",
    rating: 5,
    text: "Hayatımda yediğim en ince ve lezzetli hamur! Kesinlikle tavsiye ederim."
  },
  {
    id: 2,
    author: "Selin K.",
    rating: 4,
    text: "Malzemeler çok taze ve servis çok hızlıydı. Favori pizzacım oldu."
  },
  {
    id: 3,
    author: "Can M.",
    rating: 5,
    text: "Fiyat performans harika. Özellikle Istanbul Special efsane."
  }
];

export const CONTACT_INFO = {
  phone: "0212 562 17 55",
  whatsapp: "905000000000", // Placeholder for WhatsApp
  address: "Istanbul, Turkey"
};
