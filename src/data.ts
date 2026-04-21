export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  dateAdded: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Lumina Pearl Drop Earrings",
    price: 2500,
    image: "https://i.postimg.cc/21kM1MXg/image-jpg.jpg",
    category: "Earrings",
    isNew: true,
    dateAdded: "2026-04-15T10:00:00Z"
  },
  {
    id: "2",
    name: "Classic Gold Cuban Chain",
    price: 420,
    oldPrice: 550,
    image: "https://images.unsplash.com/photo-1599643478524-fb66f70000cb?auto=format&fit=crop&q=80&w=800",
    category: "Necklaces",
    dateAdded: "2026-04-20T10:00:00Z"
  },
  {
    id: "3",
    name: "Aura Minimalist Ring",
    price: 195,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&q=80&w=800",
    category: "Rings",
    dateAdded: "2026-04-10T10:00:00Z"
  },
  {
    id: "4",
    name: "Stella Crystal Bracelet",
    price: 310,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    category: "Bracelets",
    isNew: true,
    dateAdded: "2026-04-18T10:00:00Z"
  },
  {
    id: "5",
    name: "Eternity Diamond Band",
    price: 550,
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800",
    category: "Rings",
    dateAdded: "2026-04-05T10:00:00Z"
  },
  {
    id: "6",
    name: "Rose Quartz Pendant",
    price: 380,
    image: "https://images.unsplash.com/photo-1588444650733-d0767b0dc22e?auto=format&fit=crop&q=80&w=800",
    category: "Necklaces",
    dateAdded: "2026-04-28T10:00:00Z"
  },
  {
    id: "7",
    name: "Classic Leather Tote Bag",
    price: 850,
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800",
    category: "Bags",
    isNew: true,
    dateAdded: "2026-04-19T10:00:00Z"
  },
  {
    id: "8",
    name: "Vintage Cat-Eye Sunglasses",
    price: 350,
    oldPrice: 450,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
    category: "Sunglasses",
    dateAdded: "2026-04-01T10:00:00Z"
  }
];
