import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import HTML from "react-native-render-html";
import { Platform } from "react-native";
export default function RealtorCaption({ data }) {
  const caption = data?.housing?.description;
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const fullText =
    "Gayrimenkul Alırken/Kiralarken Dikkat Edilmesi Gerekenler! Emlaksepette.com olarak, kullanıcılarımızın güvenliğini en üst düzeyde tutmak önceliğimizdir. Bu nedenle, satın almak veya kiralamak istediğiniz emlak ile ilgili işlemleri yaparken dikkatli olmanız büyük önem taşımaktadır. İşte dikkat etmeniz gereken bazı önemli noktalar: Ödeme Yapmadan Önce: Satın alma veya kiralama işlemlerinde kesin karar vermeden önce hiçbir şekilde ön ödeme yapmayınız. Kapora veya avans ödemeleri konusunda dikkatli olunuz ve dolandırıcılık riski taşıyan durumlara karşı tedbirli davranınız. İlan Bilgilerini Doğrulama: İlan sahiplerinin verdikleri bilgileri dikkatlice kontrol ediniz. İlanlarda belirtilen bilgilerin ve görsellerin doğruluğunu teyit etmek için mümkünse yerinde inceleme yapınız veya güvenilir kaynaklardan doğrulama isteyiniz. İletişim ve Profil Bilgileri: İlan sahiplerinin hesap profillerindeki bilgilerin doğruluğunu kontrol ediniz. Şüpheli veya eksik bilgiye sahip ilan sahipleri ile iletişimde temkinli olunuz. Güvenliğiniz için, kimlik doğrulaması yapmış kullanıcılar ile iletişim kurmayı tercih ediniz. Sözleşme ve Hukuki Belgeler: Satın alma veya kiralama işlemlerinde sözleşme yapmadan önce hukuki belgeleri dikkatlice inceleyiniz ve gerektiğinde bir uzmana danışınız. Tüm koşulların net bir şekilde belirtildiği ve taraflarca kabul edildiği belgeler üzerinden işlem yapınız. Geri Bildirim ve Şikayetler: Emlaksepette.com olarak, kullanıcı deneyimini ve güvenliğini sürekli olarak iyileştirmek için geri bildirimlerinizi önemsiyoruz. Eğer ilanlarda belirtilen bilgi veya görsellerin gerçeği yansıtmadığını düşünüyorsanız veya ilan sahiplerinin hesap profillerindeki bilgilerin doğru olmadığını fark ederseniz, lütfen bize hemen bildirin. Güvenli bir emlak deneyimi için bu önemli noktalara dikkat ederek, dolandırıcılık ve benzeri olumsuz durumlardan korunabilirsiniz.";

  const previewText = fullText.substring(0, 57) + "...";
  return (
    <View style={styles.card}>
      <View style={{ padding: 10 }}>
        <HTML source={{ html: caption }} contentWidth={100} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    width: "100%",

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  Info: {
    width: "100%",
  },
  text: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
    fontWeight: "600",
  },
  toggleButtonContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "red",
    borderBottomStyle: "solid",
    marginTop: 10,
    paddingVertical: 5,
  },
  toggleButtonText: {
    color: "#d9534f", // Uyarı rengi
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
});
