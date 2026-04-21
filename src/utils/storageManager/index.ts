
export const setItem = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getItem = <T,>(key: string): T | null => {
  const saved = sessionStorage.getItem(key);
  try {
    return saved ? JSON.parse(saved) : null;
  } catch {
    return (saved as unknown) as T;
  }
};

export const removeItem = (key: string) => {
  sessionStorage.removeItem(key);
};

export const clear = () => {
  sessionStorage.clear();
};
