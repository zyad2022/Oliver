import { products, Product } from '../data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async (): Promise<Product[]> => {
  await delay(500); // Simulate network latency
  return products;
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  await delay(300);
  return products.find(p => p.id === id);
};
