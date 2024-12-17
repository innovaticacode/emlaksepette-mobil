export const sanitizeEmail = (email) => {

  return email.replace(/[ğüşöçİĞÜŞÖÇ]/g, "");
};