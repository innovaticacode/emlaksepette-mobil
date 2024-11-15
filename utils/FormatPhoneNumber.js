export const formatPhoneNumber = (value) => {
    // Sadece rakamları al
    const cleaned = ("" + value).replace(/\D/g, "");

    // Numaranın uzunluğunu kontrol et
    if (cleaned.length > 10) {
      // Burada uygun bir hata mesajı gösterebilirsiniz
      return "Geçersiz numara";
    }

    // 0 ile başlıyorsa, ilk karakteri çıkar
    const cleanedWithoutLeadingZero = cleaned.startsWith("0")
      ? cleaned.substring(1)
      : cleaned;

    // Formatlı numarayı oluştur
    let formattedNumber = "";

    // Numaranın uzunluğuna göre formatı uygula
    for (let i = 0; i < cleanedWithoutLeadingZero.length; i++) {
      if (i === 3) formattedNumber += " ";
      if (i === 5) formattedNumber += " ";
      formattedNumber += cleanedWithoutLeadingZero[i];
    }

    // Formatlı numarayı döndür
    return formattedNumber;
  };

  export  const formatPhoneNumberNew = (value) => {
    // Sadece rakamları al
    const cleaned = ("" + value).replace(/\D/g, "");

    // 0 ile başlıyorsa, ilk karakteri çıkar
    const cleanedWithoutLeadingZero = cleaned.startsWith("0")
      ? cleaned.substring(1)
      : cleaned;

    let formattedNumber = "";

    for (let i = 0; i < cleanedWithoutLeadingZero.length; i++) {
      if (i === 0) formattedNumber += "(";
      if (i === 3) formattedNumber += ") ";
      if (i === 6 || i === 8) formattedNumber += " ";
      formattedNumber += cleanedWithoutLeadingZero[i];
    }

    return formattedNumber;
  };