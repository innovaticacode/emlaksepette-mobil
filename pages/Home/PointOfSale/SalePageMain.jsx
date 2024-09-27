import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { getValueFor } from "../../../components/methods/user";
import AwesomeAlert from "react-native-awesome-alerts";

export default function SalePageMain() {
  const [isUserHaveToken, setIsUserHaveToken] = useState(false);
  const [isCorporateTypeRight, setIsCorporateTypeRight] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
    console.log(user);
  }, []);
  console.log("User: ", user); // Check if user is defined
  console.log("Access Token: ", user?.access_token);
  console.log("corporate type: ", user?.corporate_type);

  const navigation = useNavigation();
  const handleSubmit = () => {
    if (!user?.access_token) {
      setIsUserHaveToken(true);
    } else if (user?.access_token && user.corporate_type !== "Emlak Ofisi") {
      setIsCorporateTypeRight(true);
    } else if (user?.access_token && user.corporate_type === "Emlak Ofisi") {
      navigation.navigate("SalePage");
    }
  };
  const navigateToLogin = () => {
    navigation.navigate("Register");
    setIsCorporateTypeRight(false); // Close the modal
    setIsUserHaveToken(false);
  };
  const closeModal = () => {
    setIsCorporateTypeRight(false); // Close the modal
    setIsUserHaveToken(false);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollViewContent}
      scrollEventThrottle={16}
      style={styles.container}
    >
      <AwesomeAlert
        show={isUserHaveToken}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        messageStyle={{ textAlign: "center" }}
        message={`Başvuru yapabilmek için üye olmalısınız!`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Kapat"
        confirmText="Üye Ol"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={closeModal}
        onConfirmPressed={navigateToLogin}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <AwesomeAlert
        show={isCorporateTypeRight}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        messageStyle={{ textAlign: "center" }}
        message={`Başvuru yapabilmek için emlak ofisi olmalısınız!`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Kapat"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={closeModal}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <View style={{ justifyContent: "center" }}>
        <View style={styles.salePageImageContainer}>
          <Image
            style={styles.salePageImage}
            source={require("../../../images/satisOfisi.png")}
          ></Image>
        </View>
        <View style={styles.firstParStyle}>
          <Text style={styles.bigTitle}>
            İnşaat Projelerinin Satış Noktası Ol!
          </Text>
          <Text style={styles.paragraph}>
            EmlaksepetteSatış Noktası, EmlakSepette.com platformunda inşaat
            firmalarının projelerini tanıtarak satan ve bu sayede firmalar için
            önemli bir iş ortağı olmanızı sağlayan bir sistemdir.
            EmlaksepetteSatış Noktası olarak faaliyet gösteren firmalar,
            platform üzerinden birçok inşaat projesine kolayca erişebilir ve bu
            projeleri potansiyel müşterilere sunabilir. Böylece, portföy arama
            veya stok yönetimi gibi zorluklarla uğraşmak zorunda kalmazlar. Aynı
            zamanda, platformun sunduğu stok kontrol sistemi ile projelerin
            güncel durumu hakkında doğru bilgi sağlayabilir, müşterilere en
            uygun seçenekleri hızla sunarak satış süreçlerini daha verimli hale
            getirebilirler. EmlaksepetteSatış Noktası iş ortakları, kendi
            referans kodları ile yaptıkları satışlardan komisyon kazanabilir,
            EmlakSepette.com'un sağladığı özel indirimler ve fırsatlar sayesinde
            de müşterilerine cazip teklifler sunarak gelirlerini artırabilirler.
            Platform ayrıca, potansiyel müşterileri doğrudan satış noktalarına
            yönlendirerek aktif bir müşteri havuzu oluşturur ve satış
            süreçlerini hızlandırır.
          </Text>
        </View>
        <View style={styles.paragraphContainer}>
          <Text style={styles.bigTitle2}>
            EmlakSepette.com Satış Noktası Olmanın Avantajları
          </Text>
          <Text style={styles.title}>
            Tek Tıkla Proje Satış Noktası Olursunuz:
            <Text style={styles.text}>
              {" "}
              EmlakSepette.com ile birçok inşaat firmasının satış noktası
              olarak, geniş bir proje portföyüne sahip olursunuz. Bu sayede
              farklı müşteri taleplerine uygun projeleri kolayca sunabilir, stok
              arama derdi yaşamazsınız.
            </Text>
          </Text>
          <Text style={styles.title}>
            Stok Kontrolü Kolaylığı:
            <Text style={styles.text}>
              {" "}
              Stok kontrol yöntemi sayesinde projelerin güncel durumunu takip
              etme ve doğru bilgilendirme yapma avantajına sahip olursunuz.
              Satışlarınızı yönetmek ve potansiyel müşterilere en uygun
              seçenekleri sunmak daha kolay hale gelir.
            </Text>
          </Text>
          <Text style={styles.title}>
            Referans Kodu:
            <Text style={styles.text}>
              {" "}
              Kendi referans kodunuzla yaptığınız satışlardan gelir elde
              edersiniz. Bu sistem, size satış performansınızı artırma ve daha
              fazla kazanma imkanı sunar.
            </Text>
          </Text>
          <Text style={styles.title}>
            Özel İndirimler ve Fırsatlar:
            <Text style={styles.text}>
              {" "}
              Satış noktası olarak EmlakSepette.com'un sizlere sunduğu özel
              indirimler sayesinde müşterilerinize cazip fiyat avantajları
              sağlayabilir ve bu sayede daha fazla müşteri çekebilirsiniz.
            </Text>
          </Text>
          <Text style={styles.title}>
            Müşteri Yönlendirme Avantajı:
            <Text style={styles.text}>
              {" "}
              Platform üzerinden müşteriler doğrudan size yönlendirilir, böylece
              aktif bir müşteri havuzuna sahip olur ve potansiyel alıcılarla
              hızlıca iletişim kurabilirsiniz.
            </Text>
          </Text>
          <Text style={styles.title}>
            Hızlı Satış İmkanı:
            <Text style={styles.text}>
              {" "}
              Portföy aramak zorunda kalmadan hızlı satışlar yapmanın keyfini
              çıkarırsınız. EmlakSepette.com'un sağladığı altyapı, satış
              sürecinizi hızlandırır ve verimliliğinizi artırır.
            </Text>
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "90%",
              backgroundColor: "#EA2B2E",
              padding: 10,
              margin: 5,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 50,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Başvuru Yap
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    showsVerticalScrollIndicator: false,
  },
  bigTitle: {
    fontSize: 20,
    padding: 14,
    paddingTop: 30,
    color: "#EA2B2E",
    fontWeight: "600",
    fontFamily: "Inter",
    flex: "start",
    paddingHorizontal: 20,
  },
  bigTitle2: {
    fontSize: 20,
    padding: 14,
    color: "#EA2B2E",
    fontWeight: "600",
    fontFamily: "Inter",
    flex: "start",
    paddingHorizontal: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
  },

  centeredView: {
    margin: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // modal dışı koyu arkaplan
  },
  salePageImage: {
    width: 354,
    height: 80,
  },
  salePageImageContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    fontWeight: 400,
    fontFamily: "Montserrat",
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 15,
    paddingHorizontal: 20,
  },
  paragraphContainer: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
    marginVertical: 6,
    lineHeight: 15,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 12,
    color: "#333333",
    marginBottom: 12,
    fontWeight: 400,
    lineHeight: 15,
    paddingHorizontal: 20,
  },
  button: {
    width: "50%",
    backgroundColor: "#EA2B2E",
    padding: 10,
    marginTop: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  buttons: { flexDirection: "row", padding: 5 },
});
