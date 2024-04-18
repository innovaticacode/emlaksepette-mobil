import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
 FlatList

  
} from "react-native";
import { React, useState,useEffect } from "react";

import EyeIcon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
export default function Company() {
  const [selectedIndexRadio, setIndexRadio] = useState(1);
  {
    /* Input States */
  }
  const [eposta, seteposta] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [password, setpassword] = useState("")
  const [bossName, setbossName] = useState("")
  const [companyName, setcompanyName] = useState("")
  const [companyPhone, setcompanyPhone] = useState("")
  const [Iban, setIban] = useState("")
  const [accounttype, setaccounttype] = useState("");
  const [focusArea, setfocusArea] = useState("");
  const [city, setcity] = useState("");
  const [county, setcounty] = useState("");
  const [neigbourhod, setneigbourhod] = useState("");
  const [TaxPlaceCity, setTaxPlaceCity] = useState("");
  const [TaxPlace, setTaxPlace] = useState('')
const [taxNumber, settaxNumber] = useState("")
const [IdCardNo, setIdCardNo] = useState("")
  {
    /* cheked documents */
  }
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const toggleCheked = () => setChecked(!checked);
  const toggleCheked1 = () => setChecked1(!checked1);
  const toggleCheked2 = () => setChecked2(!checked2);
  const toggleCheked3 = () => setChecked3(!checked3);

  {
    /* Functions */
  }
  const [Show, setShow] = useState(false);
  const show = () => {
    setShow(!Show);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://emlaksepette.com/api/cities');
      return response.data;
    } catch (error) {
      console.error('Hata:', error);
      throw error;
    }
  };
  
   
  const [citites,setCities] = useState([]);
  useEffect(() => {
    fetchData()
      .then(citites => setCities(citites.data))
      .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
  }, []);
 console.log(citites)
 const [counties, setcounties] = useState([])
const fetchDataCounty = async (value) => {
  try {
    const response = await axios.get(`https://emlaksepette.com/api/counties/${value}`);
    return response.data;
  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
};
// useEffect(() => {
//   fetchDataCounty()
//     .then(county => setcounties(county.data))
//     .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
// },[city]);
 
      const onChangeCity=(value)=>{
        setcity(value)
         if (value) {
            fetchDataCounty(value)
                         .then(county => setcounties(county.data))
                         .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
         }else{
          setcounties([])
         }
      }
      const [Neigbour, setNeigbour] = useState([])
      const fetchDataNeigbour = async (value) => {
        try {
          const response = await axios.get(`https://emlaksepette.com/api/neighborhoods/${value}`)
          return response.data;
        } catch (error) {
          console.error('Hata:', error);
          throw error;
        }
      };

        const onChangeCounty=(value)=>{
          setcounty(value)
          if (value) {
             fetchDataNeigbour(value)
                          .then(county => setNeigbour(county.data))
                          .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
          }else{
           setNeigbour([])
          }
        }
        const register=()=>{
          
          if (eposta , phoneNumber,password,bossName,companyName, companyPhone,Iban,accounttype,focusArea,city,county,neigbourhod,TaxPlaceCity,TaxPlace,taxNumber) {
            alert('Üyeliğiniz oluşturuldu')
            seteposta("")
          }else{
            alert('Lütfen Tüm alanları Doldurun')
          }
         
        }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ padding: 15, gap: 20 }}>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  E-Posta
                </Text>
              </View>
              <TextInput style={styles.Input} value={eposta} onChangeText={(value)=>seteposta(value)} placeholder="example@gmail.com" />

            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Cep Telefonu
                </Text>
              </View>
              <TextInput
              value={phoneNumber}
              onChangeText={(value)=>setphoneNumber(value)}
                style={styles.Input}
                placeholder=""
                keyboardType="number-pad"
              />
            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Şifre
                </Text>
              </View>
              <View>
                <TextInput
                value={password}
                onChangeText={(value)=>setpassword(value)}
                  style={styles.Input}
                  placeholder="*********"
                  secureTextEntry={Show ? false : true}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 10, bottom: 9 }}
                  onPress={show}
                >
                  <EyeIcon
                    name={Show ? "eye" : "eye-off-sharp"}
                    size={20}
                    color={"#333"}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Yetkili İsim Soyisim
                </Text>
              </View>
              <TextInput style={styles.Input} value={bossName} onChangeText={(value)=>setbossName(value)} placeholder="" />
            </View>

            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Firma Adı
                </Text>
              </View>
              <TextInput style={styles.Input} value={companyName} onChangeText={(value)=>setcompanyName(value)} placeholder="" />
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Sabit Telefon
                </Text>
              </View>
              <TextInput
              value={companyPhone}
              onChangeText={(value)=>setcompanyPhone(value)}
                style={styles.Input}
                placeholder=""
                keyboardType="number-pad"
              />
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Iban
                </Text>
              </View>
              <TextInput
              value={Iban}
              onChangeText={(value)=>setIban(Value)}
                style={styles.Input}
                placeholder=""
                keyboardType="number-pad"
              />
            </View>
            <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Kurumsal Hesap Türü
            </Text>
            <RNPickerSelect
           
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => setaccounttype(value)}
              items={[
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
              ]}
            />
         
          </View>
          
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Faaliyet Alanınız
            </Text>
            <RNPickerSelect
           
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => setfocusArea(value)}
              items={[
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
              ]}
            />
         
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              İl
            </Text>
            <RNPickerSelect
           
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => {
                onChangeCity(value)
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
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => {
                onChangeCounty(value)
               }}
              items={counties}
            />
         
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Mahalle
            </Text>
            <RNPickerSelect
           
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => setneigbourhod(value)}
              items={Neigbour}
            />
         
          </View>
            <View>
              <Text>İşletme Türü</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CheckBox
                  checked={selectedIndexRadio === 1}
                  onPress={() => setIndexRadio(1)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="#E54242"
                  title={<Text style={{ fontSize: 12 }}>Şahıs Şirketi</Text>}
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 1,
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
                      <Text style={{ fontSize: 12 }}>
                        Limited veya Anonim Şirketi{" "}
                      </Text>
                    </View>
                  }
                  containerStyle={{
                    padding: 0,
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    borderTopWidth: 1,
                  }}
                />
              </View>
            </View>
            <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
             Vergi Dairesi İli
            </Text>
            <RNPickerSelect
           
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => setTaxPlaceCity(value)}
              items={[
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
              ]}
            />
         
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
             Vergi Dairesi
            </Text>
            <RNPickerSelect
           
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => setTaxPlace(value)}
              items={[
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
              ]}
            />
         
          </View>
          <View style={{ gap: 5,}}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Vergi No
                </Text>
              </View>
              <TextInput
              value={taxNumber}
              onChangeText={(value)=>settaxNumber(value)}
                style={styles.Input}
                placeholder=""
                keyboardType="number-pad"
                maxLength={11}
              />
            </View>
            <View style={{ gap: 5, display:selectedIndexRadio==1? 'flex':'none'}}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Tc Kimlik No
                </Text>
              </View>
              <TextInput
              value={IdCardNo}
              onChangeText={(value)=>setIdCardNo(value)}
                style={styles.Input}
                placeholder=""
                keyboardType="number-pad"
                maxLength={11}
              />
            </View>
            {/* Contracts */}
            <View>
              <CheckBox
                checked={checked}
                onPress={toggleCheked}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 10 }}>
                    <Text>
                      <Text style={{ color: "#027BFF", fontSize: 13 }}>
                        {" "}
                        Bireysel üyelik sözleşmesini
                      </Text>
                      <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 0, width: "100%" }}
              />
              <CheckBox
                checked={checked1}
                onPress={toggleCheked1}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 10 }}>
                    <Text>
                      <Text style={{ color: "#027BFF", fontSize: 13 }}>
                        Kvkk metnini
                      </Text>
                      <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 1 }}
              />
              <CheckBox
                checked={checked2}
                onPress={toggleCheked2}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 10 }}>
                    <Text>
                      <Text style={{ color: "#027BFF", fontSize: 13 }}>
                        Gizlilik sözleşmesi ve aydınlatma metnini
                      </Text>
                      <Text style={{ fontSize: 13 }}> okudum onaylıyorum</Text>
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 1 }}
              />
              <CheckBox
                checked={checked3}
                onPress={toggleCheked3}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 10 }}>
                    <Text>
                      Tarafıma elektronik ileti gönderilmesini kabul ediyorum.
                    </Text>
                  </View>
                }
                textStyle={{ fontSize: 13, fontWeight: 400 }}
                size={22}
                containerStyle={{ padding: 1 }}
              />
            </View>
            {/* Contract Finish */}


                {/* Register Button */}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity style={styles.btnRegister} 
                onPress={register}
              >
                <Text style={styles.btnRegisterText}>Üye Ol</Text>
              </TouchableOpacity>
            </View>
              {/* Register Button */}

          </View>
        </View>
   
   
       
      

      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
const pickerSelectStyles = StyleSheet.create({
  
  inputIOS: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 6,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#bdc6cf",
    borderRadius: 6,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Input: {
    padding: 9,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
  },
  btnRegister:{
    backgroundColor: "#E54242",
    padding: 9,
    borderRadius: 10,
    width: "90%",
  },
  btnRegisterText:{
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    height:300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor:'transparent',
    borderBottomWidth:1,
    borderBottomColor:'#ebebeb',
    marginTop: 10,
    padding: 10,
  },
});
