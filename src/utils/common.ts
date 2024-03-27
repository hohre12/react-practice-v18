export const shuffle = (list: any[]) => {
  const result = list.sort(() => Math.random() - 0.5);
  return result;
};
