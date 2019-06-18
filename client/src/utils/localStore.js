const prefix = 'fossil';

export const setStore = ({ key, value, json }) => {
  const storedValue = json ? JSON.stringify(value) : value;
  localStorage.setItem(`${prefix}_${key}`, storedValue);
};

export const getStore = ({ key, json }) => {
  const item = localStorage.getItem(`${prefix}_${key}`);
  return json ? JSON.parse(item) : item;
};

export const removeStore = ({ key }) => {
  localStorage.removeItem(`${prefix}_${key}`);
};
