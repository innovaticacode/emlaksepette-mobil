import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import PagerView from "react-native-pager-view";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { getValueFor } from "./methods/user";
import { useNavigation, useRoute } from "@react-navigation/native";

const ExtradionRequest = () => {
  const route = useRoute();
  const { OrderId } = route.params;
  console.log(OrderId);
  const pagerRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [adSoyad, setAdSoyad] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [banka, setBanka] = useState("");
  const [iban, setIban] = useState("TR");
  const [ekNotlar, setEkNotlar] = useState("");
  const [errors, setErrors] = useState({});
  const [terms, setTerms] = useState("");

  const navigation = useNavigation();

  const handleNextPage = (page) => {
    if (page === 1 && !checked) {
      return;
    }

    if (page === 2) {
      const validationErrors = validateInputs();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    pagerRef.current?.setPage(page);
  };

  const validateInputs = () => {
    const errors = {};
    if (!adSoyad) errors.adSoyad = "Bu alan zorunludur";
    if (!validatePhone(telefon))
      errors.telefon = "Geçerli bir telefon numarası giriniz";
    if (!validateEmail(email))
      errors.email = "Geçerli bir e-posta adresi giriniz";
    if (!banka) errors.banka = "Bu alan zorunludur";
    if (!validateIBAN(iban)) errors.iban = "Geçerli bir IBAN giriniz";
    return errors;
  };

  const toggleCheckbox = () => {
    setChecked(!checked);
    setTerms(1);
  };
  console.log(terms);

  const validateEmail = (email) => {
    // Basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePhone = (phone) => {
    // Turkish phone number validation with spaces
    const regex = /^(\d{3}) (\d{3}) (\d{2}) (\d{2})$/;
    return regex.test(phone);
  };
  const validateIBAN = (iban) => {
    // Turkish IBAN validation (TRXX #### #### #### #### ####)
    const regex = /^TR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
    return regex.test(iban);
  };

  const handlePhoneNumberChange = (value) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setTelefon(formattedPhoneNumber);
  };

  const formatPhoneNumber = (phoneNumber) => {
    // Telefon numarasını istediğiniz formata göre formatlayın
    if (!phoneNumber) return phoneNumber;

    // Örnek olarak, Türkiye telefon numarası formatı için
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);

    if (match) {
      return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }

    return phoneNumber;
  };
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const handleSendData = () => {
    const formData = new FormData();
    formData.append("name", adSoyad);
    formData.append("phone", telefon);
    formData.append("email", email);
    formData.append("return_bank", banka);
    formData.append("return_iban", iban);
    formData.append("content", ekNotlar);
    formData.append("cart_order_id", OrderId);
    formData.append("terms", terms ? "1" : "0");

    axios
      .post("https://test.emlaksepette.com/api/return", formData, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigation.navigate("OrderDetail", { OrderId: OrderId });
      })
      .catch((err) => {
        console.error(err);
        alert("Hata oluştu");
      });
  };

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      ref={pagerRef}
      scrollEnabled={false}
    >
      <ScrollView key="1" style={styles.pageContainer}>
        <View>
          <Text
            style={{ fontWeight: "900", textAlign: "center", marginBottom: 20 }}
          >
            ÜCRET İADESİ BİLGİ GÜVENLİĞİ POLİTİKASI
          </Text>
          <Text>
            Bilgi Güvenliği Politikasının amacı, EmlakSepette’de sunulan
            hizmetlerde bilgi güvenliğini sağlamak, iş sürekliliğini sağlamak,
            riskleri minimize etmek, güvenlik ihlal olaylarını önlemek ve olası
            etkilerini azaltarak hasar riskini en aza indirmektir. Güvenlik
            Politikamız aşağıdaki konuları garanti altına almaktadır. Kapora
            bedelinin yatırılmasından itibaren 14 günlük süre içerisinde satış
            veya kiralama gerçekleşmezse, iptal talebinin oluşturulduğu tarihten
            itibaren ÜYE tarafından ödenen kapora bedelinden %10 oranında hizmet
            bedeli kesintisi yapıldıktan sonra 30 işgünü içerisinde kalan tutar
            Üye’ye iade edilir. Üye, işbu hususu elektronik ortamda kabul, beyan
            ve taahhüt etmiştir. EMLAKSEPETTE her zaman kapora ücreti iade
            tarifesinde değişiklik yapabilir. EMLAKSEPETTE’nin internet, e-posta
            veya web sitesi yoluyla tarife yayınlaması, Üye’ye yapılmış tebligat
            yerine geçecektir. Varsa yasal olarak ödenmesi gereken KDV, stopaj
            gibi diğer her türlü ödeme ve vergiler söz konusu olursa, bunlar
            ücretin dışında olup, Üye tarafından ayrıca ödenir. Kapora bedelinin
            yatırılmasından itibaren 14 günlük süre geçtikten sonra satış veya
            kiralama gerçekleşsin ya da gerçekleşmesin üye tarafından yatırılan
            kaparo bedelinin tamamı hizmet bedeli olarak Emlak Sepette’de kalır.
            Bilgi varlıklarımız (satış ve kiralama verileri, sözleşmeler, vb.)
            herhangi bir yetkisiz erişime karşı korunacaktır. Bilgilerin
            gizliliği, bütünlüğü ve erişilebilirliği sağlanacaktır. Yasal ve
            Mevzuat gereksinimleri, üçüncü taraflar (satıcılar ve kiraya
            verenler) ile yapılan sözleşmelerde yer alan hükümler sürekli
            izlenecek ve karşılanacaktır. İş Sürekliliği ve kesintisiz hizmet
            sunumu için teknolojik altyapımız sürekli iyileştirilecektir. Bilgi
            Güvenliği Yönetim Sistemi’nin yaşatılması için gerekli kaynakları
            sağlayarak kontrollerini gerçekleştirmek.
          </Text>
          <CheckBox
            containerStyle={{
              backgroundColor: "transparent",
              padding: 0,
              margin: 0,
              marginLeft: 0,
              marginTop: 20,
              marginBottom: 20,
            }}
            checked={checked}
            onPress={toggleCheckbox}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="red"
            title="Aydınlatma metnini okudum kabul ediyorum."
          />
        </View>
        <TouchableOpacity
          style={[styles.button, !checked && { opacity: 0.5 }]}
          onPress={() => handleNextPage(1)}
          disabled={!checked}
        >
          <Text style={styles.buttonText}>İleri</Text>
        </TouchableOpacity>
      </ScrollView>
      <View key="2" style={styles.pageContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            placeholderTextColor="#999"
            value={adSoyad}
            onChangeText={setAdSoyad}
          />
          {errors.adSoyad && (
            <Text style={styles.errorText}>{errors.adSoyad}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefon Numarası</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefon Numarası"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={telefon}
            maxLength={15}
            onChangeText={(text) => {
              setTelefon(text);
              handlePhoneNumberChange(text);
            }}
          />
          {errors.telefon && (
            <Text style={styles.errorText}>{errors.telefon}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-posta</Text>
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>İade Yapılacak Banka</Text>
          <TextInput
            style={styles.input}
            placeholder="Banka"
            placeholderTextColor="#999"
            value={banka}
            onChangeText={setBanka}
          />
          {errors.banka && <Text style={styles.errorText}>{errors.banka}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>İade Yapılacak IBAN</Text>
          <TextInput
            style={styles.input}
            placeholder="IBAN"
            placeholderTextColor="#999"
            defaultValue="TR"
            keyboardType="numeric"
            value={iban}
            maxLength={24}
            onChangeText={setIban}
          />
          {errors.iban && <Text style={styles.errorText}>{errors.iban}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => handleNextPage(0)}
          >
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNextPage(2)}
          >
            <Text style={styles.buttonText}>İleri</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View key="3" style={styles.pageContainer}>
        <Text style={styles.label}>Ek Notlar</Text>
        <TextInput
          style={[styles.input, { height: 200, textAlignVertical: "top" }]}
          multiline
          numberOfLines={8}
          placeholder="Ek notlarınızı buraya ekleyin"
          placeholderTextColor="#999"
          textAlignVertical="top"
          value={ekNotlar}
          onChangeText={setEkNotlar}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => handleNextPage(1)}
          >
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSendData}>
            <Text style={styles.buttonText}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    gap: 25,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#E54242",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default ExtradionRequest;
