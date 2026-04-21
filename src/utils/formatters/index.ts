
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('en-EG')} EGP`;
};

export const formatDate = (date: any): string => {
  const d = date?.toDate ? date.toDate() : new Date(date);
  return d.toLocaleDateString('ar-EG');
};
