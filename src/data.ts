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
   {
    id: "8",
    name: "Gold North Star (small size)",
    price: 120,
    listingImage: "https://i.ibb.co/h3MS1MN/677762474-1846938465979583-1906584830548281926-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/kVtzXhtG/677762474-1846938465979583-1906584830548281926-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/kVtzXhtG/677762474-1846938465979583-1906584830548281926-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/kVtzXhtG/677762474-1846938465979583-1906584830548281926-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/kVtzXhtG/677762474-1846938465979583-1906584830548281926-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-04-28",
    description: "قلادة نجمة الشمال بتصميم فخم يجمع بين الذهب المرصع بفصوص الزركون وتفاصيل السلسلة الفريدة"
  },
   {
    id: "9",
    name: "Gold North Star (Medium size)",
    price: 120,
    listingImage: "https://i.ibb.co/C5QQLG06/679627907-4586172888336051-2311157449215246784-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/TM39B6VM/679627907-4586172888336051-2311157449215246784-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/TM39B6VM/679627907-4586172888336051-2311157449215246784-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/TM39B6VM/679627907-4586172888336051-2311157449215246784-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/TM39B6VM/679627907-4586172888336051-2311157449215246784-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-04-29",
    description: "قلادة نجمة الشمال الذهبية بحجم متوسط وتصميم نجمة بارز يجمع بين الفخامة والبريق لتكون القطعة الأجمل في مجموعتك"
  },
   {
    id: "10",
    name: "Gold North Star (Large size)",
    price: 120,
    listingImage: "https://i.ibb.co/gLKWT9Tn/679705912-1280731207497067-3453457073751169632-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/q3y2960v/679705912-1280731207497067-3453457073751169632-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/q3y2960v/679705912-1280731207497067-3453457073751169632-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/q3y2960v/679705912-1280731207497067-3453457073751169632-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/q3y2960v/679705912-1280731207497067-3453457073751169632-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-04-30",
    description: "قلادة نجمة الشمال الذهبية الملكية بحجم لافت وتصميم نجمة متوهجة قطعة استثنائية تمنحكِ حضوراً طاغياً وفخامة لا تُنسى"
  },
   {
    id: "11",
    name: "Silver North Star (Large size)",
    price: 120,
    listingImage: "https://i.ibb.co/dszdkXCb/677795446-1517056107097261-4897403476822941281-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/jv2gkRb4/677795446-1517056107097261-4897403476822941281-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/jv2gkRb4/677795446-1517056107097261-4897403476822941281-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/jv2gkRb4/677795446-1517056107097261-4897403476822941281-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/jv2gkRb4/677795446-1517056107097261-4897403476822941281-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-05-01",
    description: "قلادة نجمة الشمال من الفضة الخالصة بحجم بارز وتصميم نجمة متوهجة قطعة كلاسيكية تمنحكِ حضوراً لافتاً وأناقة لا تنتهي"
  },
   {
    id: "12",
    name: "Gold & Silver North Star (Medium size)",
    price: 120,
    listingImage: "https://i.ibb.co/TMRc4MrW/677755509-1352480736690317-4955107282099352070-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/Kcswv8g6/677755509-1352480736690317-4955107282099352070-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/Kcswv8g6/677755509-1352480736690317-4955107282099352070-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/Kcswv8g6/677755509-1352480736690317-4955107282099352070-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/Kcswv8g6/677755509-1352480736690317-4955107282099352070-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-05-02",
    description: "قلادة نجمة الشمال العصرية بحجم متوسط تتألق بمزيج ساحر من الذهب والفضة لتعطيكِ إطلالة متجددة تليق بكل أوقاتكِ"
  },
   {
    id: "13",
    name: "Gold & Silver North Star (Large size)",
    price: 120,
    listingImage: "https://i.ibb.co/WRmjrch/680375103-1466845035174408-393904534670594113-n-1.png",
    gallery: [
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/PGW9TY5C/680375103-1466845035174408-393904534670594113-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/PGW9TY5C/680375103-1466845035174408-393904534670594113-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/PGW9TY5C/680375103-1466845035174408-393904534670594113-n-1.png" },
      { thumb: "https://i.ibb.co/yFYVpnYc/674582170-828702483047185-2404788357332388730-n-1.png", full: "https://i.ibb.co/PGW9TY5C/680375103-1466845035174408-393904534670594113-n-1.png" }
    ],
    category: "Necklaces",
    dateAdded: "2026-05-03",
    description: "قلادة نجمة الشمال الملكية بحجم لافت يمزج بين بريق الذهب ونقاء الفضة قطعة استثنائية تعكس التميز والفخامة في آنٍ واحد"
  },
];
