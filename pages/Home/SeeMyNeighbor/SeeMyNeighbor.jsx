import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

const SeeMyNeighbor = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.mainContainer2}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../../images/KomsumuGor2.png")}
          ></Image>
          <Text style={styles.bigTitle}>
            <Text style={styles.bigTitleRed}> "Komşunu Gör" </Text> ile Yeni
            Komşularınızla Tanışın, Güvenle Yatırım Yapın!
          </Text>
          <Text style={styles.mainContent}>
            EmlakSepette.com, inşaat projelerinden mülk satın alan kişilere,
            komşularıyla tanışma ve etkileşim kurma imkânı sunar. "Komşunu Gör"
            özelliği sayesinde, aynı projeden mülk alan diğer kişilerle
            iletişime geçebilir, onların deneyimlerinden faydalanarak daha
            bilinçli kararlar alabilirsiniz.
          </Text>
          <View style={styles.iconContainer}></View>
          <Text style={styles.title}>Projeye Kendinizi Ekleyin</Text>
          <Text style={styles.mainContent}>
            Bir inşaat projesinden mülk satın aldıysanız, emlaksepette.com'da o
            projeye kendinizi ekleyebilirsiniz. Bu sayede, aynı projede yer alan
            diğer mülk sahipleriyle bağlantı kurabilir ve onları
            tanıyabilirsiniz.
          </Text>
          <View style={styles.iconContainer}></View>
          <Text style={styles.title}>Mülk Almak İsteyenler</Text>
          <Text style={styles.mainContent}>
            Eğer bir projeden mülk satın almayı düşünüyorsanız,
            emlaksepette.com'a girerek ilgilendiğiniz projeyi seçebilir ve
            "Komşunu Gör" özelliğini kullanarak o projeden mülk almış kişilerle
            görüşebilirsiniz. Bu sayede, projeyle ilgili süreçler hakkında
            doğrudan bilgi alabilirsiniz.
          </Text>
          <View style={styles.iconContainer}></View>
          <Text style={styles.title}>Mülk Sahipliği</Text>
          <Text style={styles.mainContent}>
            Projeden bir mülk satın aldığınızda, EmlakSepette.com'da hangi
            dairenin sahibi olduğunuz kaydedilir ve bu bilgi platformda açıkça
            gösterilir. Böylece, diğer mülk sahipleriyle projede yer alabilir ve
            komşularınızı tanıyabilirsiniz.
          </Text>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../../images/KomsumuGor1.png")}
          ></Image>
          <Text style={styles.bigTitle}>Gizlilik ve Güvenlik </Text>
          <Text style={styles.mainContent}>
            EmlakSepette.com, "Komşunu Gör" özelliğini Kişisel Verilerin
            Korunması Kanunu (KVKK) çerçevesinde güvenli bir şekilde sunar.
            Komşularla iletişime geçmek isteyen kullanıcılar, belirli bir ücret
            karşılığında komşularının iletişim bilgilerine ulaşabilirler. Bu
            özellik sayesinde, sadece bir mülk değil, aynı zamanda bir
            topluluğun parçası olabilirsiniz. Komşularınızla tanışarak, mülk
            sahibi olma sürecinde daha güvenli ve bilinçli adımlar
            atabilirsiniz.
          </Text>
        </View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    showsVerticalScrollIndicator: false,
    alignContent: "center",
    alignSelf: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: width * 0.65, // ekran genişliğinin %80'i
    height: height * 0.28,
    margin: 20,
  },
  bigTitle: {
    fontWeight: "700",
    fontSize: 25,
    textAlign: "center",
    color: "black",
    marginHorizontal: 35,
    marginVertical: 20,
    fontFamily: "Inter",
  },
  bigTitleRed: {
    color: "#EA2B2E",
  },
  mainContent: {
    textAlign: "center",
    marginHorizontal: 55,
    marginVertical: 10,
    fontWeight: "400",
    padding: 5,
    fontSize: 18,
    margin: 20,
    lineHeight: 24,
  },
  iconContainer: {
    width: width * 0.4, // ekran genişliğinin %80'i
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    backgroundColor: "#EA2B2E",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
    color: "black",
    marginHorizontal: 35,
    marginVertical: 20,
    fontFamily: "Montserrat",
  },
});
export default SeeMyNeighbor;
