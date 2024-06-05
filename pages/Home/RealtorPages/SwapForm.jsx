import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import RNPickerSelect from "react-native-picker-select";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SwapForm({ data, openModal, color }) {
  const [SwapChoose, setSwapChoose] = useState("");
  const [estateChoose, setestateChoose] = useState("");
  {
    /*/ Konut  */
  }
  const [city, setcity] = useState("");
  const [county, setcounty] = useState("");
  const [houseType, sethouseType] = useState("");
  const [roomCount, setroomCount] = useState("");
  const [houseAge, sethouseAge] = useState("");
  const [useStatus, setuseStatus] = useState("");
  const [YourPrice, setYourPrice] = useState("");
  {
    /*/ Konut  */
  }
  {
    /*/ Arsa */
  }
  const [AreaCity, setAreaCity] = useState("");
  const [AreaCounty, setAreaCounty] = useState("");
  const [AreaNeigbour, setAreaNeigbour] = useState("");
  const [AreaPlaceInfo, setAreaPlaceInfo] = useState("");
  const [AreaStatu, setAreaStatu] = useState("");
  const [YourAreaPrice, setYourAreaPrice] = useState("");
  {
    /*/ Arsa */
  }

  {
    /*/ İş Yeri */
  }
  const [TradeInfo, setTradeInfo] = useState("");
  const [yourPriceShop, setyourPriceShop] = useState("");
  {
    /*/ İş Yeri */
  }

  {
    /*/ Araç */
  }
  const [CarYear, setCarYear] = useState("");
  const [carModal, setcarModal] = useState("");
  const [fuelType, setfuelType] = useState("");
  const [shiftType, setshiftType] = useState("");
  const [Price, setPrice] = useState("");
  {
    /*/ Araç */
  }
  {
    /*/ Barter */
  }
  const [Barter, setBarter] = useState("");
  {
    /*/ Barter */
  }
  {
    /*/ Other*/
  }
  const [OtherInfo, setOtherInfo] = useState("");
  {
    /*/ Other*/
  }
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [phoneNmber, setphoneNmber] = useState("");
  const [email, setemail] = useState("");

  const postData = async () => {
    try {
      var formData = new FormData();
      formData.append("ad", name);
      formData.append("soyad", surname);
      formData.append("telefon", phoneNmber);
      formData.append("email", email);
      formData.append("sehir", city);
      formData.append("ilce", county);
      formData.append("takas_tercihi", SwapChoose);
      formData.append("store_id", data?.housing?.user?.id);
      formData.append("emlak_tipi", estateChoose);
      formData.append("konut_tipi", houseType);
      formData.append("oda_sayisi", roomCount);
      formData.append("konut_yasi", houseAge);
      formData.append("kullanim_durumu", useStatus);
      formData.append("konut_satis_rakami", YourPrice);
      formData.append("arsa_il", AreaCity);
      formData.append("arsa_ilce", AreaCounty);
      formData.append("arsa_mahalle", AreaNeigbour);
      formData.append("ada_parsel", AreaPlaceInfo);
      formData.append("imar_durumu", AreaStatu);
      formData.append("satis_rakami", addDotEveryThreeDigits(YourAreaPrice));
      formData.append("ticari_bilgiler", TradeInfo);
      formData.append("isyeri_satis_rakami", yourPriceShop);
      formData.append("arac_model_yili", CarYear);
      formData.append("arac_markasi", carModal);
      formData.append("yakit_tipi", fuelType);
      formData.append("vites_tipi", shiftType);
      formData.append("arac_satis_rakami", Price);
      formData.append("barter_detay", Barter);
    
      const response = await axios.post(
        "https://test.emlaksepette.com/api/swap",
        formData
      );

      // İsteğin başarılı bir şekilde tamamlandığı durum
  

      openModal(JSON.stringify(response.data.message));
      color("#d4edda");
      setname("");
      setsurname("");
      setphoneNmber("");
      setemail("");
      setcity("");
      setcounty("");
      setSwapChoose("");
      setAreaCity("");
      setAreaCounty("");
      setAreaNeigbour("");
      setAreaPlaceInfo("");
      setAreaStatu("");
      setCarYear("");
      setNeigbour("");
      setcarModal("");
      setYourAreaPrice("");
      setYourPrice("");
      sethouseAge("");
      sethouseType("");
      setshiftType("");
      setyourPriceShop("");
      setfuelType("");
    } catch (error) {
      // Hata durumunda
      openModal("Tüm Alanları Doldurunuz");
      color("#F8D7DA");
      console.error("Hata:", error + "post isteği başarısız ");
    }
  };

  // Buton tetikleyicisi için bir fonksiyon
  const handleButtonPress = () => {
    postData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://test.emlaksepette.com/api/cities"
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
        `https://test.emlaksepette.com/api/counties/${value}`
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

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
  const [areaCounty, setareaCounty] = useState([]);
  const onChangeAreaCity = (value) => {
    setAreaCity(value);
    if (value) {
      fetchDataCounty(value)
        .then((county) => setareaCounty(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setareaCounty([]);
    }
  };
  const [Neigbour, setNeigbour] = useState([]);
  const fetchDataNeigbour = async (value) => {
    try {
      const response = await axios.get(
        `https://test.emlaksepette.com/api/neighborhoods/${value}`
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onChangeCounty = (value) => {
    setAreaCounty(value);
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

  const pickerData = [];
  for (let i = 0; i <= 100; i++) {
    pickerData.push({ label: i.toString(), value: i });
  }

  // 1990'dan 2024'e kadar olan yılları içeren bir dizi oluşturuyoruz
  const years = [];
  for (let year = 2024; year >= 1990; year--) {
    years.push({ label: year.toString(), value: year.toString() }); // Her yılı string olarak ekliyoruz
  }
  const roomCounts = [
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
  const carBrands = [
    { label: "Alfa Romeo", value: "Alfa Romeo" },
    { label: "Aston Martin", value: "Aston Martin" },
    { label: "Audi", value: "Audi" },
    { label: "Bentley", value: "Bentley" },
    { label: "BMW", value: "BMW" },
    { label: "Bugatti", value: "Bugatti" },
    { label: "Buick", value: "Buick" },
    { label: "Cadillac", value: "Cadillac" },
    { label: "Chery", value: "Chery" },
    { label: "Chevrolet", value: "Chevrolet" },
    { label: "Chrysler", value: "Chrysler" },
    { label: "Citroen", value: "Citroen" },
    { label: "Cupra", value: "Cupra" },
    { label: "Dacia", value: "Dacia" },
    { label: "DS Automobiles", value: "DS Automobiles" },
    { label: "Daewoo", value: "Daewoo" },
    { label: "Daihatsu", value: "Daihatsu" },
    { label: "Dodge", value: "Dodge" },
    { label: "Ferrari", value: "Ferrari" },
    { label: "Fiat", value: "Fiat" },
    { label: "Ford", value: "Ford" },
    { label: "Geely", value: "Geely" },
    { label: "Honda", value: "Honda" },
    { label: "Hyundai", value: "Hyundai" },
    { label: "Infiniti", value: "Infiniti" },
    { label: "Isuzu", value: "Isuzu" },
    { label: "Iveco", value: "Iveco" },
    { label: "Jaguar", value: "Jaguar" },
    { label: "Jeep", value: "Jeep" },
    { label: "Kia", value: "Kia" },
    { label: "Lada", value: "Lada" },
    { label: "Lamborghini", value: "Lamborghini" },
    { label: "Lancia", value: "Lancia" },
    { label: "Land-rover", value: "Land-rover" },
    { label: "Leapmotor", value: "Leapmotor" },
    { label: "Lexus", value: "Lexus" },
    { label: "Lincoln", value: "Lincoln" },
    { label: "Lotus", value: "Lotus" },
    { label: "Maserati", value: "Maserati" },
    { label: "Mazda", value: "Mazda" },
    { label: "McLaren", value: "McLaren" },
    { label: "Mercedes-Benz", value: "Mercedes-Benz" },
    { label: "MG", value: "MG" },
    { label: "Mini", value: "Mini" },
    { label: "Mitsubishi", value: "Mitsubishi" },
    { label: "Nissan", value: "Nissan" },
    { label: "Opel", value: "Opel" },
    { label: "Peugeot", value: "Peugeot" },
    { label: "Porsche", value: "Porsche" },
    { label: "Proton", value: "Proton" },
    { label: "Renault", value: "Renault" },
    { label: "Rolls Royce", value: "Rolls Royce" },
    { label: "Rover", value: "Rover" },
    { label: "Saab", value: "Saab" },
    { label: "Seat", value: "Seat" },
    { label: "Skoda", value: "Skoda" },
    { label: "Smart", value: "Smart" },
    { label: "Ssangyong", value: "Ssangyong" },
    { label: "Subaru", value: "Subaru" },
    { label: "Suzuki", value: "Suzuki" },
    { label: "Tata", value: "Tata" },
    { label: "Tesla", value: "Tesla" },
    { label: "Tofaş", value: "Tofaş" },
    { label: "Toyota", value: "Toyota" },
    { label: "Volkswagen", value: "Volkswagen" },
    { label: "Volvo", value: "Volvo" },
    { label: "Voyah", value: "Voyah" },
    { label: "Yudo", value: "Yudo" },
  ];
  return (
    <KeyboardAwareScrollView
      style={{ padding: 10, gap: 10 }}
      contentContainerStyle={{ gap: 10 }}
    >
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          Ad:
        </Text>
        <TextInput
          style={styles.Input}
          value={name}
          onChangeText={(value) => setname(value)}
        />
      </View>

      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          Soyad
        </Text>
        <TextInput
          style={styles.Input}
          value={surname}
          onChangeText={(value) => setsurname(value)}
        />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          Telefon Numaranız
        </Text>
        <TextInput
          style={styles.Input}
          value={phoneNmber}
          onChangeText={(value) => setphoneNmber(value)}
        />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          E-mail
        </Text>
        <TextInput
          style={styles.Input}
          value={email}
          onChangeText={(value) => setemail(value)}
        />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          Şehir
        </Text>
        <RNPickerSelect
          placeholder={{
            label: "Şehir Seçiniz...",
            value: null,
          }}
          style={pickerSelectStyles}
          value={city}
          onValueChange={(value) => {
            onChangeCity(value);
          }}
          items={citites}
        />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          İlçe
        </Text>
        <RNPickerSelect
          placeholder={{
            label: "İlçe Seçiniz...",
            value: null,
          }}
          value={county}
          style={pickerSelectStyles}
          onValueChange={(value) => setcounty(value)}
          items={counties}
        />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          Takas Tercihiniz
        </Text>
        <RNPickerSelect
          placeholder={{
            label: "Seçiniz...",
            value: null,
          }}
          value={SwapChoose}
          style={pickerSelectStyles}
          onValueChange={(value) => setSwapChoose(value)}
          items={[
            { label: "Emlak", value: "emlak" },
            { label: "Araç", value: "araç" },
            { label: "Barter", value: "barter" },
            { label: "Diğer", value: "Diğer" },
          ]}
        />
      </View>
      <View
        style={{ gap: 6, display: SwapChoose == "emlak" ? "flex" : "none" }}
      >
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          Emlak Tipi
        </Text>
        <RNPickerSelect
          placeholder={{
            label: "Seçiniz...",
            value: null,
          }}
          style={pickerSelectStyles}
          onValueChange={(value) => setestateChoose(value)}
          items={[
            { label: "Konut", value: "konut" },
            { label: "Arsa", value: "arsa" },
            { label: "İş Yeri", value: "işyeri" },
          ]}
        />
      </View>
      {estateChoose == "konut" && SwapChoose == "emlak" ? (
        <>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Konut Tipi
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => sethouseType(value)}
              items={[
                { label: "Daire", value: "daire" },
                { label: "Villa", value: "villa" },
                { label: "Residance", value: "residance" },
                { label: "Prefabrik Ev", value: "prefabrik_ev" },
                { label: "Çiftlik Evi", value: "çiftlik_evi" },
              ]}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Oda Sayısı
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setroomCount(value)}
              items={roomCounts}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Konut Yaşı
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => sethouseAge(value)}
              items={pickerData}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Kullanım Durumu
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setuseStatus(value)}
              items={[
                { label: "Kiracılı", value: "kiracılı" },
                { label: "Boş", value: "boş" },
                { label: "Mülk Sahibi", value: "mülk sahibi" },
              ]}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Düşündüğünüz Satış Rakamı
            </Text>
            <TextInput
              style={styles.Input}
              value={YourPrice}
              onChangeText={(value) => setYourPrice(value)}
            />
          </View>
          {/* <Text>{addDotEveryThreeDigits(YourPrice) }</Text> */}
          <View style={{ gap: 10 }}>
            <Text style={{ color: "grey", fontSize: 15 }}>
              Tapu Belgesi Yükleyiniz
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#e54242",
                padding: 10,
                width: "50%",
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Yükle</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}

      {estateChoose == "arsa" && SwapChoose == "emlak" ? (
        <>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Arsa İli
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              value={AreaCity}
              style={pickerSelectStyles}
              onValueChange={(value) => {
                onChangeAreaCity(value);
              }}
              items={citites}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Arsa İlçe
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              value={AreaCounty}
              style={pickerSelectStyles}
              onValueChange={(value) => {
                onChangeCounty(value);
              }}
              items={areaCounty}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Arsa Mahalle
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setAreaNeigbour(value)}
              items={Neigbour}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Ada Parsel Bilgisi
            </Text>
            <TextInput
              style={styles.Input}
              value={AreaPlaceInfo}
              onChangeText={(value) => setAreaPlaceInfo(value)}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Arsa İmar Durumu
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setAreaStatu(value)}
              items={[
                { label: "Diğer", value: "Diğer" },
                { label: "Villa", value: "Villa" },
                { label: "Konut", value: "Konut" },
                { label: "Turizm", value: "Turizm" },
                { label: "Tarla", value: "Tarla" },
                { label: "Sanayi", value: "Sanayi" },
                { label: "Ticari", value: "Ticari" },
                { label: "Bağ Bahçe", value: "Bağ Bahçe" },
              ]}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Düşündüğünüz Satış Rakamı
            </Text>
            <TextInput
              style={styles.Input}
              value={YourAreaPrice}
              onChangeText={(value) => setYourAreaPrice(value)}
            />
            <Text>{}</Text>
          </View>
        </>
      ) : (
        <></>
      )}
      {SwapChoose == "araç" ? (
        <>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Araç Model Yılı
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setCarYear(value)}
              items={years}
            />
          </View>

          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Araba Markası
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              value={carModal}
              style={pickerSelectStyles}
              onValueChange={(value) => setcarModal(value)}
              items={carBrands}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Yakıt Tipi
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setfuelType(value)}
              items={[
                { label: "Benzin", value: "benzin" },
                { label: "Dizel", value: "dizel" },
                { label: "LPG", value: "LPG" },
                { label: "Elektrik", value: "elektrik" },
              ]}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Vites Tipi
            </Text>
            <RNPickerSelect
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => setshiftType(value)}
              items={[
                { label: "Manuel", value: "manuel" },
                { label: "Otomatik", value: "otomatik" },
              ]}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Satış Rakamı
            </Text>
            <TextInput
              style={styles.Input}
              value={Price}
              onChangeText={(value) => setPrice(value)}
            />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={{ color: "grey", fontSize: 15 }}>
              Ruhsat Belgesi Yükleyiniz
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#e54242",
                padding: 10,
                width: "50%",
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Yükle</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}
      {estateChoose == "işyeri" && SwapChoose == "emlak" ? (
        <>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Ticari ile ilgili Bilgileri Giriniz
            </Text>
            <TextInput
              style={styles.Input}
              value={TradeInfo}
              onChangeText={(value) => setTradeInfo(value)}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Düşündüğünüz Satış Rakamı
            </Text>
            <TextInput
              style={styles.Input}
              value={yourPriceShop}
              onChangeText={(value) => setyourPriceShop(value)}
            />
          </View>
        </>
      ) : (
        <></>
      )}
      {SwapChoose == "barter" ? (
        <>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Lütfen barter durumunuz ile ilgili detaylı bilgileri giriniz
            </Text>
            <TextInput
              style={styles.Input}
              value={Barter}
              onChangeText={(value) => setBarter(value)}
            />
          </View>
        </>
      ) : (
        <></>
      )}
      {SwapChoose == "Diğer" ? (
        <>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Takas ile ilgili ürün/hizmet detayı:
            </Text>
            <TextInput
              style={styles.Input}
              value={OtherInfo}
              onChangeText={(value) => setOtherInfo(value)}
            />
          </View>
        </>
      ) : (
        <></>
      )}
      <View>
        <TouchableOpacity
          onPress={handleButtonPress}
          style={{
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Başvuruyu Tamamla
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#bdc6cf",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderColor: "#bdc6cf",
    borderRadius: 5,
    padding: 8,
    fontSize: 14,
  },
});
