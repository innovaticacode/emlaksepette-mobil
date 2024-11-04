import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";
import SellAndRentAdvantageText from "../../components/SellAndRentAdvantageText";
import { TouchableOpacity } from "react-native";

const RentData = [
  {
    boldText: "Ücretsiz İlan Yayını",
    thinText:
      "İlanınızı ücret ödemeden yayınlayarak geniş bir kitleye ulaşabilirsiniz.",
  },
  {
    boldText: "Kurumsal Emlak Desteği",
    thinText:
      "Her ilanınıza atanmış kurumsal bir emlak ofisi, süreci profesyonelce yönetir.",
  },
  {
    boldText: "Geniş Pazarlama Ağı",
    thinText:
      "İlanınız, tüm emlak ofisleri tarafından pazarlanır ve süreçler atanmış emlak ofisi tarafından raporlanır.",
  },
  {
    boldText: "Paylaşımlı Satış Sistemi",
    thinText:
      " İlanınızın satışı veya kiralanması için çalışan emlak ofisi, ilk başarıyı sağladığında hizmet bedelini alır.",
  },
  {
    boldText: "Başarılı Satışta Hizmet Bedeli",
    thinText:
      "Satış durumunda, toplam bedelin %2’si kapora olarak emlaksepet.com’da kalır ve ilgili emlak ofisleri arasında paylaşılır.",
  },
  {
    boldText: "Reklam ve Tanıtım Desteği",
    thinText:
      "İlanınızın tanıtımı ücretsizdir; afiş ve branda gibi materyaller atanmış emlak ofisi tarafından hazırlanır.",
  },
  {
    boldText: "Profesyonel Müşteri Yönetimi",
    thinText:
      " Müşteri süreçleri kurumsal bir şekilde yönetilir, böylece müşteri memnuniyeti sağlanır.",
  },
  {
    boldText: "Binlerce Emlak Ofisiyle İşbirliği",
    thinText:
      " Binlerce emlak ofisi, ilanınızı hızlıca satmak veya kiralamak için çalışır.",
  },
  {
    boldText: "İlan İncelemesi ve Fotoğraf Desteği",
    thinText:
      " İlanınız incelenir, gerekirse profesyonel fotoğraflarla yenilenir ve daha cazip hale getirilir.",
  },
];

const IndividualRent = [
  {
    boldText: "İlan Ücreti",
    thinText: "İlanınızı yayınlamak için belirli bir ücret ödemeniz gerekir.",
  },
  {
    boldText: "Zaman ve Yönetim Zorluğu",
    thinText:
      "Satış sürecini tek başınıza yürütmekzorundasınız; bu hem zaman alıcı hem de yorucu olabilir.",
  },
  {
    boldText: "İletişim Sorunları",
    thinText:
      "Yoğun iş temposu nedeniyle müşteriaramalarına zamanında yanıt veremeyebilir ve potansiyel müşterikaybı yaşayabilirsiniz",
  },
  {
    boldText: "Profesyonel Destek Eksikliği",
    thinText:
      "Profesyonel yardım almadan satışişlemlerini yönetmek, sürecin etkili bir şekilde ilerlemesinizorlaştırabilir.",
  },
  {
    boldText: "Müşteri Yönetimi",
    thinText:
      "Müşteri ilişkilerini bireysel olarak yürütmek, esneklik ve profesyonellik eksikliği nedeniyle sürecin aksamasına yol açabilir.",
  },
  {
    boldText: "Tanıtım Masrafları",
    thinText:
      "Resim çekimi, afiş ve branda gibi tanıtım materyalleri için ekstra masraflar yapmanız gerekir; bu süreçleri doğru yönetmek zor olabilir.",
  },
  {
    boldText: "Reklam ve Tanıtım Giderleri",
    thinText:
      "İlanınızın reklam ve tanıtım masraflarını kendiniz karşılamanız gerekir, bu da bütçenize ek yük getirebilir.",
  },
];

const SellAndRentAdvantage = (props) => {
  const { navigation, route } = props;
  const index = route.params.index;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <View style={styles.titleArea}>
            <Icon name="arrow-down" size={16} color={"#EA2B2E"} />
            <Text style={styles.title}>
              {index === 0
                ? "Hızlı Sat Kirala Avantajları"
                : "Bireysel Sat Kirala Dezavantajları"}
            </Text>
          </View>
          <View style={styles.data}>
            {index === 0
              ? RentData.map((item, index) => (
                  <SellAndRentAdvantageText
                    key={index}
                    boldText={item.boldText}
                    thinText={item.thinText}
                  />
                ))
              : IndividualRent.map((item, index) => (
                  <SellAndRentAdvantageText
                    key={index}
                    boldText={item.boldText}
                    thinText={item.thinText}
                  />
                ))}
            {index === 0 && (
              <Text style={styles.info}>
                Bu avantajlarla, ilanlarınızı hızlı ve güvenli bir şekilde
                satabilir veya kiralayabilirsiniz.
              </Text>
            )}
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={styles.redButton}
          >
            <Text style={styles.redButtonText}>
              {index === 0 ? "Hızlı Sat Kirala" : "Bireysel Sat Kirala"}
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default SellAndRentAdvantage;

const styles = StyleSheet.create({
  info: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
  },
  redButton: {
    backgroundColor: "#EA2B2E",
    width: "85%",
    height: 58,
    borderRadius: 24,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 20,
  },
  redButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  titleArea: {
    backgroundColor: "#FEF3F3",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  title: {
    color: "#EA2B2E",
    fontWeight: "500",
    lineHeight: 17,
  },
  data: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
});
