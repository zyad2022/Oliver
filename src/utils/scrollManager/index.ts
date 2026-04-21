
export const saveScrollPosition = (key: string) => {
  sessionStorage.setItem(key, window.scrollY.toString());
};

export const restoreScrollPosition = (key: string, behavior: ScrollBehavior = 'instant') => {
  const saved = sessionStorage.getItem(key);
  if (saved) {
    window.scrollTo({ top: parseInt(saved), behavior });
  } else {
    window.scrollTo({ top: 0, behavior });
  }
};

export const clearScrollPosition = (key: string) => {
  sessionStorage.removeItem(key);
};
