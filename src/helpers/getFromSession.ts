export const getFromSession = (key: string) => {
  const item = window.sessionStorage.getItem(key);
  return item === 'null' ? null : item;
};
