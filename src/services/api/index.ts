
// Base API service for future integration with a real backend
export const api = {
  get: async <T,>(endpoint: string): Promise<T> => {
    // Implementation for real API calls
    console.log(`Getting from ${endpoint}`);
    return [] as unknown as T;
  },
  
  post: async <T,>(endpoint: string, data: any): Promise<T> => {
     console.log(`Posting to ${endpoint}`, data);
     return {} as unknown as T;
  }
};
