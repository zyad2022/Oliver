
import { Product, CartItem } from '../../data';

export const cartService = {
  getCart: (): CartItem[] => {
    const saved = sessionStorage.getItem('oliver_cart');
    return saved ? JSON.parse(saved) : [];
  },
  
  saveCart: (items: CartItem[]) => {
    sessionStorage.setItem('oliver_cart', JSON.stringify(items));
  }
};
