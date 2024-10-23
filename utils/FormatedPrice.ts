export const formatCurrency = (amount: unknown | any) => {
  return parseInt(amount).toLocaleString("tr-TR") + " ₺";
};
