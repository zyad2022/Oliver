export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  dateAdded: string;
  description?: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Symbol Of Love & Elegance",
    price: 80,
    image: "https://i.postimg.cc/ZB2nHPz6/Gemini-Generated-Image-hu6n7ohu6n7ohu6n.png",
    category: "Necklaces",
    isNew: true,
    dateAdded: "2026-04-15T10:00:00Z",
    description: "قلادة كلاسيكية بتصميم يعبر عن الحب، مطلية بالذهب ومناسبة لجميع المناسبات السعيدة."
  },
  {
    id: "2",
    name: "Like a Swan",
    price: 120,
    oldPrice: 170,
    image: "https://i.postimg.cc/ZWdGvrVX/Gemini-Generated-Image-1mumg61mumg61mum.png",
    category: "Necklaces",
    dateAdded: "2026-04-20T10:00:00Z",
    description: "قلادة بشكل البجعة الأنيقة، مرصعة بالكريستال الفاخر لتعكس جمالك الداخلي في كل زاوية."
  },
  {
    id: "3",
    name: "Free Size Ring",
    price: 35,
    image: "https://i.postimg.cc/Cn8GsLtP/Gemini-Generated-Image-244z06244z06244z.png",
    category: "Rings",
    dateAdded: "2026-04-10T10:00:00Z",
    description: "خاتم حر المقاس يمكن تعديله بسهولة ليتناسب مع أي إصبع، يتميز بتصميم عصري وبسيط."
  },
  {
    id: "4",
    name: "New Swan (Gold plated)",
    price: 120,
    oldPrice: 200,
    image: "https://i.postimg.cc/fJwyKR6Y/Gemini-Generated-Image-ylexrkylexrkylex.png",
    category: "Necklaces",
    isNew: true,
    dateAdded: "2026-04-18T10:00:00Z",
    description: "نسخة جديدة من قلادة البجعة الكلاسيكية، مطلية بالذهب عيار 18 لمنحها بريقاً لا يقاوم."
  },
  {
    id: "5",
    name: "Flying Butterflies",
    price: 100,
    image: "https://i.postimg.cc/4m7Nf2Hv/Gemini-Generated-Image-is2f5kis2f5kis2f.png",
    category: "Necklaces",
    dateAdded: "2026-04-05T10:00:00Z",
    description: "سلسلة ناعمة تحمل فراشات ذهبية متطايرة، تعبر عن الحرية والأنوثة الرقيقة."
  },
  {
    id: "6",
    name: "Green Stone Jewel",
    price: 100,
    image: "https://i.postimg.cc/zLDsB3Pb/Gemini-Generated-Image-54t7ve54t7ve54t7.png",
    category: "Necklaces",
    dateAdded: "2026-04-28T10:00:00Z",
    description: "قطعة مميزة بحجر أخضر كريم يعكس سحر الطبيعة، مصممة خصيصاً لعاشقات التميز."
  },
];
