
import { products, Product } from '../../data';

export const productService = {
  getAllProducts: (): Product[] => {
    return products;
  },
  
  getProductById: (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  },
  
  getNewArrivals: (days: number = 30): Product[] => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - days);
    
    return products
      .filter((p) => new Date(p.dateAdded) >= thirtyDaysAgo)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }
};
