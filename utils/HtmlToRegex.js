export const removeHtmlTags = (desc) => {
  if (!desc) return ""; // Eğer desc undefined veya null ise boş string döner

  // HTML etiketlerini kaldır
  let cleanText = desc.replace(/<[^>]+>/g, "");

  // HTML özel karakterlerini dönüştür
  cleanText = cleanText
    .replace(/&ouml;/g, "ö")
    .replace(/&uuml;/g, "ü")
    .replace(/&ccedil;/g, "ç") // Ç karakteri
    .replace(/&Ccedil;/g, "Ç") // Ç karakteri büyük
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'") // &39; karakter referansını düzelt
    .replace(/&lt;/g, "<") // < karakter referansı
    .replace(/&gt;/g, ">") // > karakter referansı
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)); // # ile biten sayısal referansları dönüştür

  return cleanText;
};
