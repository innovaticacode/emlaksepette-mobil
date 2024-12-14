import * as FileSystem from "expo-file-system";

/**
 * Dosya boyutunu kontrol eden fonksiyon
 * @param {string} uri - Dosyanın URI'si
 * @returns {Promise<boolean>} - Boyut kontrol sonucu (true: geçerli, false: fazla büyük)
 */
export const checkFileSize = async (uri) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists) {
      const fileSizeInMB = fileInfo.size / (1024 * 1024); // Byte to MB
      return fileSizeInMB <= 5; // 5 MB kontrolü
    } else {
      console.warn("Dosya bulunamadı:", uri);
      return false;
    }
  } catch (error) {
    console.error("Dosya boyutunu kontrol ederken hata oluştu:", error);
    return false;
  }
};
