export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  listingImage: string;
  gallery?: { thumb: string; full: string; }[];
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
    listingImage: "https://i.ibb.co/fVcWYJH9/details-H-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-01-02",
    description: "قلادة كلاسيكية بتصميم يعبر عن الحب، مطلية بالذهب ومناسبة لجميع المناسبات السعيدة."
  },
  {
    id: "2",
    name: "Like a Swan",
    price: 120,
    oldPrice: 170,
    listingImage: "https://i.ibb.co/v6Xy7CcQ/672588038-2001103607154376-2871997865707591592-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/nv6k211/672588038-2001103607154376-2871997865707591592-n-1.png", full: "https://i.ibb.co/nv6k211/672588038-2001103607154376-2871997865707591592-n-1.png" },
      { thumb: "https://i.ibb.co/nv6k211/672588038-2001103607154376-2871997865707591592-n-1.png", full: "https://i.ibb.co/nv6k211/672588038-2001103607154376-2871997865707591592-n-1.png" },
      { thumb: "https://i.ibb.co/nv6k211/672588038-2001103607154376-2871997865707591592-n-1.png", full: "https://i.ibb.co/nv6k211/672588038-2001103607154376-2871997865707591592-n-1.png" },
      { thumb: "https://i.ibb.co/nv6k211/672588038-2001103607154376-2871997865707591592-n-1.png", full: "https://i.ibb.co/nv6k211/672588038-2001103607154376-2871997865707591592-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-01-03",
    description: "قلادة بشكل البجعة الأنيقة، مرصعة بالكريستال الفاخر لتعكس جمالك الداخلي في كل زاوية."
  },
  {
    id: "3",
    name: "Free Size Ring",
    price: 35,
    listingImage: "https://i.ibb.co/LzLNmd1Y/677876020-2420418575126897-6043031926358544604-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/jPkvcrX8/677876020-2420418575126897-6043031926358544604-n-1.png", full: "https://i.ibb.co/jPkvcrX8/677876020-2420418575126897-6043031926358544604-n-1.png" },
      { thumb: "https://i.ibb.co/jPkvcrX8/677876020-2420418575126897-6043031926358544604-n-1.png", full: "https://i.ibb.co/jPkvcrX8/677876020-2420418575126897-6043031926358544604-n-1.png" },
      { thumb: "https://i.ibb.co/jPkvcrX8/677876020-2420418575126897-6043031926358544604-n-1.png", full: "https://i.ibb.co/jPkvcrX8/677876020-2420418575126897-6043031926358544604-n-1.png" },
      { thumb: "https://i.ibb.co/jPkvcrX8/677876020-2420418575126897-6043031926358544604-n-1.png", full: "https://i.ibb.co/jPkvcrX8/677876020-2420418575126897-6043031926358544604-n-1.png" }
    ],
    category: "Rings",
    dateAdded: "2026-01-01",
    description: "خاتم حر المقاس يمكن تعديله بسهولة ليتناسب مع أي إصبع، يتميز بتصميم عصري وبسيط."
  },
  {
    id: "4",
    name: "New Swan (Gold plated)",
    price: 120,
    oldPrice: 200,
    listingImage: "https://i.ibb.co/7Hc2rnq/673417208-1618558772732546-2444480640670586524-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/F4RVpcSN/673417208-1618558772732546-2444480640670586524-n-1.png", full: "https://i.ibb.co/F4RVpcSN/673417208-1618558772732546-2444480640670586524-n-1.png" },
      { thumb: "https://i.ibb.co/F4RVpcSN/673417208-1618558772732546-2444480640670586524-n-1.png", full: "https://i.ibb.co/F4RVpcSN/673417208-1618558772732546-2444480640670586524-n-1.png" },
      { thumb: "https://i.ibb.co/F4RVpcSN/673417208-1618558772732546-2444480640670586524-n-1.png", full: "https://i.ibb.co/F4RVpcSN/673417208-1618558772732546-2444480640670586524-n-1.png" },
      { thumb: "https://i.ibb.co/F4RVpcSN/673417208-1618558772732546-2444480640670586524-n-1.png", full: "https://i.ibb.co/F4RVpcSN/673417208-1618558772732546-2444480640670586524-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-01-06",
    description: "نسخة جديدة من قلادة البجعة الكلاسيكية، مطلية بالذهب عيار 18 لمنحها بريقاً لا يقاوم."
  },
  {
    id: "5",
    name: "Flying Butterflies",
    price: 100,
    listingImage: "https://i.ibb.co/F49PZdVQ/672697037-2463838294057377-3321035897148113262-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/TxTt6NJN/672697037-2463838294057377-3321035897148113262-n-1.png", full: "https://i.ibb.co/TxTt6NJN/672697037-2463838294057377-3321035897148113262-n-1.png" },
      { thumb: "https://i.ibb.co/TxTt6NJN/672697037-2463838294057377-3321035897148113262-n-1.png", full: "https://i.ibb.co/TxTt6NJN/672697037-2463838294057377-3321035897148113262-n-1.png" },
      { thumb: "https://i.ibb.co/TxTt6NJN/672697037-2463838294057377-3321035897148113262-n-1.png", full: "https://i.ibb.co/TxTt6NJN/672697037-2463838294057377-3321035897148113262-n-1.png" },
      { thumb: "https://i.ibb.co/TxTt6NJN/672697037-2463838294057377-3321035897148113262-n-1.png", full: "https://i.ibb.co/TxTt6NJN/672697037-2463838294057377-3321035897148113262-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-01-04",
    description: "سلسلة ناعمة تحمل فراشات ذهبية متطايرة، تعبر عن الحرية والأنوثة الرقيقة."
  },
   {
    id: "6",
    name: "Green Stone Jewel",
    price: 100,
    listingImage: "https://i.ibb.co/fYgT1YYn/details-H-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/b5TJ3VYb/674026961-998234786105363-5904082933620735298-n-1.png", full: "https://i.ibb.co/b5TJ3VYb/674026961-998234786105363-5904082933620735298-n-1.png" },
      { thumb: "https://i.ibb.co/b5TJ3VYb/674026961-998234786105363-5904082933620735298-n-1.png", full: "https://i.ibb.co/b5TJ3VYb/674026961-998234786105363-5904082933620735298-n-1.png" },
      { thumb: "https://i.ibb.co/b5TJ3VYb/674026961-998234786105363-5904082933620735298-n-1.png", full: "https://i.ibb.co/b5TJ3VYb/674026961-998234786105363-5904082933620735298-n-1.png" },
      { thumb: "https://i.ibb.co/b5TJ3VYb/674026961-998234786105363-5904082933620735298-n-1.png", full: "https://i.ibb.co/b5TJ3VYb/674026961-998234786105363-5904082933620735298-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-01-05",
    description: "قطعة مميزة بحجر أخضر كريم يعكس سحر الطبيعة، مصممة خصيصاً لعاشقات التميز."
  },
   {
    id: "7",
    name: "Red Tulips",
    price: 120,
    listingImage: "https://i.ibb.co/1YQk1t9H/680422727-905462842509702-1493722085757743725-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/fYgY3VvW/680422727-905462842509702-1493722085757743725-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/fYgY3VvW/680422727-905462842509702-1493722085757743725-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/fYgY3VvW/680422727-905462842509702-1493722085757743725-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/fYgY3VvW/680422727-905462842509702-1493722085757743725-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-04-27",
    description: "فرع من الأناقة الملكية مرصع بفصوص حمراء متوهجة يمنح معصمكِ سحراً لا يُقاوم"
  },
];
