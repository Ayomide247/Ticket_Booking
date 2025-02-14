export const getItemFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(localStorage.getItem(key)) : null;
};

export const setItemInLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemFromLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};
