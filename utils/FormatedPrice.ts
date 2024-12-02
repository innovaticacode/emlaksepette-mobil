export const formatedPrice = (amount: any) => {
  return parseInt(amount).toLocaleString("tr-TR") + " ₺";
};
