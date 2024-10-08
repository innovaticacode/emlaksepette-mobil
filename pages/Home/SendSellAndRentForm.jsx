import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CheckBox } from "react-native-elements";
import Modal from "react-native-modal";
import CheckboxForm from "../../components/CheckboxForm";
import { FaLess } from "react-icons/fa";
import { Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

export default function SendSellAndRentForm() {
  const [selectedIndexRadio, setIndexRadio] = useState(0);
  const [selectedInfo, setselectedInfo] = useState(0);

  const [NameSurname, setNameSurname] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [ePosta, setePosta] = useState("");
  const [city, setcity] = useState("");
  const [county, setcounty] = useState("");
  const [neigbourhod, setneigbourhod] = useState("");
  const [addresExplain, setaddresExplain] = useState("");
  const [YourPrice, setYourPrice] = useState("");
  const [advertExplain, setadvertExplain] = useState("");
  const [buildType, setbuildType] = useState("");
  const [floorApartment, setfloorApartment] = useState(""); //bina katı
  const [roomCount, setroomCount] = useState(""); //bulunduğu kat
  const [metreKare, setmetreKare] = useState("");
  const [metreKareBrut, setmetreKareBrut] = useState("");
  const [YearOfBuild, setYearOfBuild] = useState(""); //Bina Yaşı
  const [Side, setSide] = useState("");
  const [view, setview] = useState("");
  const [bathAndToilet, setbathAndToilet] = useState("");
  const [warm, setwarm] = useState(""); //ısınma
  const [TotalRoomNumber, setTotalRoomNumber] = useState("");
  const [certificate, setcertificate] = useState("");
  const [checked, setChecked] = React.useState(false);
  const toggleCheckbox = () => setChecked(!checked);

  const [checked2, setChecked2] = React.useState(false);
  const toggleCheckbox2 = () => setChecked2(!checked2);

  const [checked3, setChecked3] = React.useState(false);
  const toggleCheckbox3 = () => setChecked3(!checked3);
  const [checked4, setChecked4] = React.useState(false);
  const toggleCheckbox4 = () => setChecked4(!checked4);

  const Settings = [
    "DSL",
    "ASANSÖR",
    "EŞYALI",
    "GARAJ",
    "BARBEKÜ",
    "BOYALI",
    "ÇAM. ODASI",
    "ÇELİK KAPI",
    "DUŞAKABİN",
    "İNTERCOM",
    "JAKUZİ",
    "M.S.D.",
    "JENERATÖR",
    "MUTFAK D.",
    "SAUNA",
    "SERAMİK Z.",
    "SU DEPOSU",
    "ŞÖMİNE",
    "TERAS",
    "GÜVENLİK",
    "GÖNME DOLAP",
    "KABLO TV",
    "MUTFAK L.",
    "OTOPARK",
    "GÖR. DİAFON",
    "KİLER",
    "OYUN PARKI",
    "HİDROFOR",
    "KLİMA",
    "PVC",
    "HİLTON BANYON",
    "KOMBİ",
    "PANJUR",
    "ISICAM",
    "LAMİNANT Z.",
    "PARKE",
    "YANGIN M.",
    "YÜZME H.",
    "Wi-Fi",
  ];
  const warmOptions = [
    { label: "Yok", value: "Yok" },
    { label: "Kombi (Doğalgaz)", value: "Kombi (Doğalgaz)" },
    { label: "Yerden Isıtma", value: "Yerden Isıtma" },
    { label: "Merkezi", value: "Merkezi" },
    { label: "Merkezi (Pay Ölçer)", value: "Merkezi (Pay Ölçer)" },
    { label: "Klima", value: "Klima" },
    { label: "Doğalgaz Sobası", value: "Doğalgaz Sobası" },
    { label: "Kat Kaloriferi", value: "Kat Kaloriferi" },
    { label: "Kombi (Elektrik)", value: "Kombi (Elektrik)" },
    { label: "Fancoil Ünitesi", value: "Fancoil Ünitesi" },
    { label: "Güneş Enerjisi", value: "Güneş Enerjisi" },
    { label: "Elektrikli Radyatör", value: "Elektrikli Radyatör" },
    { label: "Jeotermal", value: "Jeotermal" },
    { label: "Şömine", value: "Şömine" },
    { label: "VRV", value: "VRV" },
    { label: "Isı Pompası", value: "Isı Pompası" },
    { label: "Soba", value: "Soba" },
    { label: "Kalerifor", value: "Kalerifor" },
  ];
  const RoomCounts = [
    { label: "1+0", value: "1+0" },
    { label: "1.5+1", value: "1.5+1" },
    { label: "2+0", value: "2+0" },
    { label: "2+1", value: "2+1" },
    { label: "2.5+1", value: "2.5+1" },
    { label: "3+0", value: "3+0" },
    { label: "3+1", value: "3+1" },
    { label: "3.5+1", value: "3.5+1" },
    { label: "3+2", value: "3+2" },
    { label: "3+3", value: "3+3" },
    { label: "4+0", value: "4+0" },
    { label: "4+1", value: "4+1" },
    { label: "4.5+1", value: "4.5+1" },
    { label: "4+2", value: "4+2" },
    { label: "4+3", value: "4+3" },
    { label: "4+4", value: "4+4" },
    { label: "5+1", value: "5+1" },
    { label: "5.5+1", value: "5.5+1" },
    { label: "5+2", value: "5+2" },
    { label: "5+3", value: "5+3" },
    { label: "5+4", value: "5+4" },
    { label: "6+1", value: "6+1" },
    { label: "6+2", value: "6+2" },
    { label: "6.5+1", value: "6.5+1" },
    { label: "6+3", value: "6+3" },
    { label: "6+4", value: "6+4" },
    { label: "7+1", value: "7+1" },
    { label: "7+2", value: "7+2" },
    { label: "7+3", value: "7+3" },
    { label: "8+1", value: "8+1" },
    { label: "8+2", value: "8+2" },
    { label: "8+3", value: "8+3" },
    { label: "8+4", value: "8+4" },
    { label: "9+1", value: "9+1" },
    { label: "9+2", value: "9+2" },
    { label: "9+3", value: "9+3" },
    { label: "9+4", value: "9+4" },
    { label: "9+5", value: "9+5" },
    { label: "9+6", value: "9+6" },
    { label: "10+1", value: "10+1" },
    { label: "10+2", value: "10+2" },
    { label: "11+1", value: "11+1" },
    { label: "12 ve üzeri", value: "12 ve üzeri" },
  ];
  const certificateTypes = [
    { label: "Hisseli Tapu", value: "Hisseli Tapu" },
    { label: "Müstakil Tapulu", value: "Müstakil Tapulu" },
    { label: "Kat Mülkiyetli", value: "Kat Mülkiyetli" },
    { label: "Kat İrtifaklı", value: "Kat İrtifaklı" },
    { label: "Arsa Tapulu", value: "Arsa Tapulu" },
    { label: "Bilinmiyor", value: "Bilinmiyor" },
  ];
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (description) => {
    if (checkedItems.includes(description)) {
      // Eğer seçilen öğe zaten varsa, listeden kaldır
      setCheckedItems(checkedItems.filter((item) => item !== description));
    } else {
      // Değilse, listede ekleyin
      setCheckedItems([...checkedItems, description]);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://private.emlaksepette.com/api/cities"
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const [citites, setCities] = useState([]);
  useEffect(() => {
    fetchData()
      .then((citites) => setCities(citites.data))
      .catch((error) =>
        console.error("Veri alınırken bir hata oluştu:", error)
      );
  }, []);

  const [counties, setcounties] = useState([]);
  const fetchDataCounty = async (value) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/counties/${value}`
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };
  // useEffect(() => {
  //   fetchDataCounty()
  //     .then(county => setcounties(county.data))
  //     .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
  // },[city]);

  const onChangeCity = (value) => {
    setcity(value);
    if (value) {
      fetchDataCounty(value)
        .then((county) => setcounties(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setcounties([]);
    }
  };
  const [Neigbour, setNeigbour] = useState([]);
  const fetchDataNeigbour = async (value) => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/neighborhoods/${value}`
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onChangeCounty = (value) => {
    setcounty(value);
    if (value) {
      fetchDataNeigbour(value)
        .then((county) => setNeigbour(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setNeigbour([]);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ padding: 10, gap: 10 }}>
        <Text style={{ fontSize: 20, color: "#333", fontWeight: "500" }}>
          Formu Doldur
        </Text>
        <Text style={{ color: "grey" }}>
          Gayrimenkulunüzün detaylarını girin. Onay durumunda size dönüş
          sağlayacağz.
        </Text>
      </View>
      <View style={{ padding: 10, gap: 20 }}>
        <View style={{ gap: 6 }}>
          <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
            İsim Soyisim
          </Text>
          <TextInput style={styles.Input} />
        </View>
        <View style={{ gap: 6 }}>
          <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
            Telefon Numarası
          </Text>
          <TextInput style={styles.Input} />
        </View>
        <View style={{ gap: 6 }}>
          <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
            E-Posta Adresi
          </Text>
          <TextInput style={[styles.Input]} />
        </View>
      </View>
      <View style={{ padding: 10, paddingTop: 20, gap: 10 }}>
        <Text style={{ fontSize: 19 }}>İlan Bilgileri</Text>
        <View style={{ paddingTop: 10 }}>
          <CheckBox
            checked={selectedIndexRadio === 1}
            onPress={() => setIndexRadio(1)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#E54242"
            title={<Text style={{ fontSize: 14 }}>Konut</Text>}
            containerStyle={{
              padding: 0,
              backgroundColor: "transparent",
              borderWidth: 0,
              borderTopWidth: 0,
            }}
          />
          <CheckBox
            checked={selectedIndexRadio === 2}
            onPress={() => setIndexRadio(2)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#E54242"
            title={
              <View style={{}}>
                <Text style={{ fontSize: 14 }}>Ticari</Text>
              </View>
            }
            containerStyle={{
              padding: 0,
              backgroundColor: "transparent",
              borderWidth: 0,
              borderTopWidth: 0,
            }}
          />
        </View>
        <View style={{ borderColor: "#ebebeb", gap: 5, borderTopWidth: 1 }}>
          <CheckBox
            checked={selectedInfo === 3}
            onPress={() => setselectedInfo(3)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#E54242"
            title={<Text style={{ fontSize: 14 }}>Kiralık</Text>}
            containerStyle={{
              padding: 0,
              backgroundColor: "transparent",
              borderWidth: 0,
              borderTopWidth: 0,
            }}
          />
          <CheckBox
            checked={selectedInfo === 4}
            onPress={() => setselectedInfo(4)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#E54242"
            title={
              <View style={{}}>
                <Text style={{ fontSize: 14 }}>Satılık</Text>
              </View>
            }
            containerStyle={{
              padding: 0,
              backgroundColor: "transparent",
              borderWidth: 0,
              borderTopWidth: 0,
            }}
          />
          <CheckBox
            checked={selectedInfo === 5}
            onPress={() => setselectedInfo(5)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#E54242"
            title={
              <View style={{}}>
                <Text style={{ fontSize: 14 }}>Devren</Text>
              </View>
            }
            containerStyle={{
              padding: 0,
              backgroundColor: "transparent",
              borderWidth: 0,
              borderTopWidth: 0,
            }}
          />
        </View>
        <View style={{ gap: 15 }}>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              İl
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={city}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => {
                onChangeCity(value);
              }}
              items={citites}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              İlçe
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={county}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => {
                onChangeCounty(value);
              }}
              items={counties}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Mahalle
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={neigbourhod}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setneigbourhod(value)}
              items={Neigbour}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Adres Açıklaması
            </Text>
            <TextInput
              style={styles.Input}
              value={addresExplain}
              onChangeText={(value) => setaddresExplain(value)}
            />
          </View>

          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Gayrimenkulunuz için belirlediğiniz fiyat
            </Text>
            <TextInput
              style={styles.Input}
              value={YourPrice}
              onChangeText={(value) => setYourPrice(value)}
            />
          </View>
          <View style={{ gap: 6, height: 100 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              İlan Açıklaması
            </Text>
            <TextInput
              style={[styles.Input, { height: "100%" }]}
              multiline
              value={advertExplain}
              onChangeText={(value) => setadvertExplain(value)}
            />
          </View>

          <View style={{ gap: 6, paddingTop: 20 }}>
            <CheckBox
              checked={checked}
              onPress={toggleCheckbox}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="red"
              title={<Text style={{ left: 5 }}>Sözleşme</Text>}
              containerStyle={{ backgroundColor: "transparent" }}
            />
            <CheckBox
              checked={checked2}
              onPress={toggleCheckbox2}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="red"
              title={<Text style={{ left: 5 }}>Afiş</Text>}
              containerStyle={{ backgroundColor: "transparent" }}
            />
            <CheckBox
              checked={checked3}
              onPress={toggleCheckbox3}
              // Use ThemeProvider to make change for all checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="red"
              title={<Text style={{ left: 5 }}>Anahtar Yetkili</Text>}
              containerStyle={{ backgroundColor: "transparent" }}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Yapı Tipi
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={buildType}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setbuildType(value)}
              items={[
                { label: "Yok", value: "Yok" },
                { label: "Ahşap", value: "Ahşap" },
                { label: "Kütük", value: "Kütük" },
                { label: "Betonarme", value: "Betonarme" },
                { label: "Çelik", value: "Çelik" },
                { label: "Prefabrik", value: "Prefabrik" },
                { label: "Yarı Kagir", value: "Yarı Kagir" },
                { label: "Tam Kagir", value: "Tam Kagir" },
              ]}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Bina Kat
            </Text>
            <TextInput
              style={styles.Input}
              value={floorApartment}
              onChangeText={(value) => setfloorApartment(value)}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Bulunduğu Kat
            </Text>
            <TextInput
              style={styles.Input}
              value={roomCount}
              onChangeText={(value) => setroomCount(value)}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              M2 Net
            </Text>
            <TextInput
              style={styles.Input}
              value={metreKare}
              onChangeText={(value) => setmetreKare}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              M2 Brüt
            </Text>
            <TextInput
              style={styles.Input}
              value={metreKareBrut}
              onChangeText={(value) => setmetreKareBrut(value)}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Bina Yaşı
            </Text>
            <TextInput
              style={styles.Input}
              value={YearOfBuild}
              onChangeText={(value) => setYearOfBuild(value)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Cephe
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={Side}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setSide(value)}
              items={[
                { label: "Kuzey", value: "Kuzey" },
                { label: "Güney", value: "Güney" },
                { label: "Doğu", value: "Doğu" },
                { label: "Batı", value: "Batı" },
              ]}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Manzara
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={view}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setview(value)}
              items={[
                { label: "Doğa", value: "Doğa" },
                { label: "Deniz", value: "Deniz" },
                { label: "Orman", value: "Orman" },
              ]}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Banyo/Tuvalet
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={bathAndToilet}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setbathAndToilet(value)}
              items={[
                { label: "Yok", value: "0" },
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
                { label: "9", value: "9" },
                { label: "10 ve üzeri", value: "10 Ve üzeri" },
              ]}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Isınma
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={warm}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setwarm(value)}
              items={warmOptions}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Oda ve Salon
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={TotalRoomNumber}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setTotalRoomNumber(value)}
              items={RoomCounts}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Tapu
            </Text>
            <RNPickerSelect
              doneText="Tamam"
              value={certificate}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setcertificate(value)}
              items={certificateTypes}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {Settings.map((item, index) => (
              <CheckboxForm
                item={item}
                key={index}
                getCheckedItems={handleCheckboxChange}
              />
            ))}
          </View>
          <CheckBox
            checked={checked4}
            onPress={toggleCheckbox4}
            // Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="red"
            title={
              <View style={{ padding: 5, width: "100%", borderRadius: 10 }}>
                <Text style={{ color: "blue" }}>
                  Sat Kirala Formu sözleşmesini
                </Text>
                <Text>okudum onaylıyorum</Text>
              </View>
            }
            containerStyle={{
              backgroundColor: alert ? "#FFE0DB" : "transparent",
              borderWidth: 0,
            }}
          />

          <View style={{ alignItems: "center", paddingBottom: 50 }}>
            <TouchableOpacity style={styles.btnToForm}>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "500",
                }}
              >
                Başvuruyu Tamamla
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 8,
    fontSize: 14,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#F8F7F4",
    padding: 20,
    height: "40%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  btnToForm: {
    backgroundColor: "#5396DF",
    padding: 10,
    borderRadius: 4,
    width: "80%",
  },
});
