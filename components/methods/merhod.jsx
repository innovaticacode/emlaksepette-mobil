export const addDotEveryThreeDigits = (number) => {
  // Sayıyı string'e çevirerek işlem yapalım
  const numberString = String(number);

  // Eğer sayı negatif ise işareti ayrı bir değişkende saklayalım
  const sign = numberString[0] === "-" ? "-" : "";

  // Sayının işareti varsa sadece rakamlarını alalım
  const digits = sign ? numberString.slice(1) : numberString;

  // Nokta eklenmiş sayıyı tutacak bir değişken
  let formattedNumber = "";

  // Her üç rakamda bir nokta ekleyelim
  for (let i = digits.length - 1, j = 1; i >= 0; i--, j++) {
    formattedNumber = digits[i] + formattedNumber;
    if (j % 3 === 0 && i !== 0) {
      formattedNumber = "." + formattedNumber;
    }
  }

  // Eğer sayının işareti varsa önüne ekleyelim
  return sign + formattedNumber;
};
