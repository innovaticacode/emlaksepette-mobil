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
import Modal from "react-native-modal";
import EyeIcon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "@rneui/themed";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import IconSocialMedia from "react-native-vector-icons/AntDesign";
import MailCheck from "react-native-vector-icons/MaterialCommunityIcons";
import HTML from 'react-native-render-html';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native";
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
  const [accounttype, setaccounttype] = useState(null);
  const [focusArea, setfocusArea] = useState(null);
  const [city, setcity] = useState(null);
  const [county, setcounty] = useState(null);
  const [neigbourhod, setneigbourhod] = useState(null);
  const [TaxPlaceCity, setTaxPlaceCity] = useState(null);
  const [TaxPlace, setTaxPlace] = useState(null)
const [taxNumber, settaxNumber] = useState("")
const [IdCardNo, setIdCardNo] = useState("")
const [ShoppingName, setShoppingName] = useState("")
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
  const [showMailSendAlert, setshowMailSendAlert] = useState(false);
  const [succesRegister, setsuccesRegister] = useState(false)
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

        const postData = async () => {
   
          try {
          var formData=new FormData()
          formData.append('type',2)
            formData.append('username',bossName)
            formData.append('email',eposta)
            formData.append('mobile_phone',phoneNumber)
            formData.append('password',password)
            formData.append('store_name',companyName)
            formData.append('name',ShoppingName)
            formData.append('phone',companyPhone)
            formData.append('corporate-account-type',focusArea)
            formData.append('city_id',city)
            formData.append('county_id',county)
            formData.append('neighborhood_id',neigbourhod)
            formData.append('taxOfficeCity',TaxPlaceCity)
            formData.append('taxOffice',TaxPlace)
            formData.append('taxNumber',taxNumber)
            formData.append('idNumber',IdCardNo)
            formData.append('check-d',checked)
            formData.append('check-b',checked1)
            formData.append('check-c',checked2)
            formData.append('activity','İnşaat')
            formData.append('iban',35435435345435)
            const response = await axios.post('https://emlaksepette.com/api/register', formData);
            
            // İsteğin başarılı bir şekilde tamamlandığı durum
            console.log('İstek başarıyla tamamlandı:', response.data);
            // setmessage(response.data.message)
        
          } catch (error) {
            // Hata durumunda
           
            console.error('Hata:', error +'post isteği başarısız ');
          }
        };



        const register=()=>{    
          if (eposta && phoneNumber && password && bossName && companyName && focusArea && city && county && neigbourhod && TaxPlaceCity && TaxPlace && taxNumber && ShoppingName ) {
              if (password.length>=6) {
                postData()
                setsuccesRegister(true)
                seteposta("")
                setphoneNumber("")
                setpassword("")
                setbossName("")
                setcompanyName("")
                setcompanyPhone("")
                setShoppingName('')
            
                setfocusArea(null)
                setcity(null)
                setcounty(null)
                setneigbourhod(null)
                setTaxPlaceCity(null)
                setTaxPlace(null)
                settaxNumber("")
                setIdCardNo("")
                setChecked(false)
                setChecked1(false)
                setChecked2(false)
                setChecked3(false)
                
              }else{
                alert('Şifreniz 6 Karakterden Uzun Olmalıdır')
              }
           
            
          }else{
            setshowMailSendAlert(true)
          }
         
        }
        const fetchTaxOfficeCity = async () => {
          try {
            const response = await axios.get('https://emlaksepette.com/api/get-tax-offices');
            return response.data;
          } catch (error) {
            console.error('Hata:', error);
            throw error;
          }
        };
        
         
       const [TaxOfficesCity, setTaxOfficesCity] = useState([])
        useEffect(() => {
          fetchTaxOfficeCity()
            .then(TaxOffice => setTaxOfficesCity(TaxOffice))
            .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
        }, []);
        const Cityies = Array.from(new Set(TaxOfficesCity.map(item => item.il)));
        const onChangeTaxOfficesSity=(value)=>{
          setTaxPlaceCity(value)
          if (value) {
            fetchTaxOffice(value)
            .then(TaxOffice => setTaxOffices(TaxOffice))
            .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
                          
          }else{
       
          }
        }
        const fetchTaxOffice = async (value) => {
          try {
            const response = await axios.get(`https://emlaksepette.com/api/get-tax-office/${value}`);
            return response.data;
          } catch (error) {
            console.error('Hata:', error);
            throw error;
          }
        };
        
      
       const [TaxOffices, setTaxOffices] = useState([])
       
        const TaxOfficePlace = Array.from(new Set(TaxOffices.map(item => item.daire)));

        const [modalVisible, setModalVisible] = useState(false)
        const [modalVisible2, setModalVisible2] = useState(false)
        const [modalVisible3, setModalVisible3] = useState(false)
        const [Deals, setDeals] = useState('')
  
        const GetDeal=(deal)=>{
           
            fetchDataDeal(deal)
        }
        const fetchFromURL = async (url) => {
          try {
            const response = await axios.get(url);
            return response.data;
          } catch (error) {
            throw error;
          }
        };
        
        // Örnek kullanım
       
        const fetchDataDeal = async (deal) => {
          const url = `https://emlaksepette.com/api/sayfa/${deal}`;
          try {
            const data = await fetchFromURL(url);
              setDeals(data.content)
            // Burada isteğin başarılı olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
          } catch (error) {
            console.error('İstek hatası:', error);
            // Burada isteğin başarısız olduğunda yapılacak işlemleri gerçekleştirebilirsiniz.
          }
        };
        
    
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ padding: 15, gap: 20 }}>
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
                  E-Posta
                </Text>
              </View>
              <TextInput style={styles.Input} value={eposta} onChangeText={(value)=>seteposta(value)} placeholder="example@gmail.com" />

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
                  Ticaret Ünvanı
                </Text>
              </View>
              <TextInput style={styles.Input} value={companyName} onChangeText={(value)=>setcompanyName(value)} placeholder="" />
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                 Mağaza Adı
                </Text>
              </View>
              <TextInput style={styles.Input} value={ShoppingName} onChangeText={(value)=>setShoppingName(value)} placeholder="" />
            </View>
            <View style={{ gap: 5 }}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
                  Sabit Telefon (Opsiyonel)
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
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Faaliyet Alanınız
            </Text>
            <RNPickerSelect
            value={focusArea}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => setfocusArea(value)}
              items={[
                { label: "Emlak Ofisi", value: "Emlak Ofisi" },
                { label: "İnşaat Ofisi", value: "İnşaat Ofisi" },
                { label: "Prefabrik Yapı", value: "Prefabrik Yapı" },
                { label: "Banka", value: "Banka" },
                { label: "Turizm", value: "Turizm" },
                { label: "Ustalar & Hizmetler", value: "Ustalar & Hizmetler" }
                
              ]}
            />
         
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              İl
            </Text>
            <RNPickerSelect
           value={city}
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
           value={county}
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
           value={TaxPlaceCity}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => {onChangeTaxOfficesSity(value)}}
               items={Cityies.map(il => ({ label: il, value: il }))}
            
            />
         
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
             Vergi Dairesi
            </Text>
            <RNPickerSelect
           value={TaxPlace}
              placeholder={{
                label: "Seçiniz...",
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => setTaxPlace(value)}
               items={TaxOfficePlace.map(daire => ({ label: daire, value: daire }))}
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
                onPress={()=>{
                  GetDeal('kurumsal-uyelik-sozlesmesi')
            
                  checked? setModalVisible(false) : setModalVisible(true)
                    setChecked(false)
               }}
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
                        Kurumsal üyelik sözleşmesini
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
                onPress={()=>{
                  GetDeal('kvkk-politikasi')
            
                  checked1? setModalVisible2(false) : setModalVisible2(true)
                    setChecked1(false)
               }}
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
                onPress={()=>{
                  GetDeal('gizlilik-sozlesmesi-ve-aydinlatma-metni')
            
                  checked2? setModalVisible3(false) : setModalVisible3(true)
                    setChecked2(false)
               }}
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
        <Modal isVisible={showMailSendAlert}
        animationIn={'fadeInRightBig'}
        animationOut={'fadeOutLeftBig'}
        style={styles.modal}>
          <View style={styles.modalContent}>
           

            <View style={{ gap: 10 }}>
              <View style={{ alignItems: "center" }}>
                <View style={{backgroundColor:"#E54242",borderRadius:40,padding:6}}>
                <MailCheck name="close" size={40} color={'#fff'} />
                </View>
              
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#333",
                    letterSpacing: 0.5,
                  }}
                >
                    Lütfen Tüm Alanları Doldurunuz!
                </Text>
          
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#E54242",
                  padding: 10,
                  width:'100%',
                  borderRadius: 5,
                }}
                onPress={() => setshowMailSendAlert(false)}
              >
               <Text style={{textAlign:'center',color:'#ffff',fontWeight:500}}>Tamam</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </Modal>
        <Modal isVisible={succesRegister}
        animationIn={'fadeInRightBig'}
        animationOut={'fadeOutLeftBig'}
        style={styles.modal}>
          <View style={styles.modalContent}>
           

            <View style={{ gap: 10 }}>
              <View style={{ alignItems: "center" }}>
                <View style={{backgroundColor:"#D4EDDA",borderRadius:40,padding:10}}>
                <MailCheck name="email-send" size={40} color={'#316D40'} />
                </View>
              
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "#333",
                    letterSpacing: 0.5,
                  }}
                >
                   Hesabınız Oluşturuldu 
                </Text>
          
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#316D40",
                  padding: 10,
                  width:'100%',
                  borderRadius: 5,
                }}
                onPress={() => setsuccesRegister(false)}
              >
               <Text style={{textAlign:'center',color:'#D4EDDA',fontWeight:500}}>Tamam</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </Modal>
       
         <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropColor="transparent"
        style={styles.modal2}
      >
        <View style={styles.modalContent2}>
      
           <ScrollView>
           <HTML source={{ html: Deals }}  contentWidth={100}/>
           
         
           <View style={{alignItems:'center'}}>
           <TouchableOpacity style={styles.Acceptbtn}
             onPress={()=>{setChecked(!checked)
             setModalVisible(false)
             }}
           >
             <Text style={{color:'white',fontWeight:'bold'}}>Okudum Kabul ediyorum</Text>
           </TouchableOpacity>
           </View>
           </ScrollView>
            
        
          
                       
          
        </View>
      </Modal>
      <Modal
        isVisible={modalVisible2}
        onBackdropPress={() => setModalVisible2(false)}
        backdropColor="transparent"
        style={styles.modal2}
      >
        <SafeAreaView style={styles.modalContent2}>
        
      <ScrollView style={{padding:10}}>
      <HTML source={{ html: Deals }}  contentWidth={100}/>
           
           
          
           <View style={{alignItems:'center',paddingBottom:20}}>
           <TouchableOpacity style={styles.Acceptbtn}
               onPress={()=>{
                 setChecked1(true)
                 setModalVisible2(false)
               }}
           >
               <Text style={{color:'white',fontWeight:'bold'}}>Okudum Kabul ediyorum</Text>
           </TouchableOpacity>
           </View>    
      </ScrollView>
          
          
        </SafeAreaView>
      </Modal>
      <Modal
        isVisible={modalVisible3}
        onBackdropPress={() => setModalVisible3(false)}
        backdropColor="transparent"
        style={styles.modal2}
      >
        <SafeAreaView style={styles.modalContent2}>
       <ScrollView style={{padding:10}}>
       <HTML source={{ html: Deals }}  contentWidth={100}/>
           
       
           <View style={{alignItems:'center',paddingBottom:20}}>
           <TouchableOpacity style={styles.Acceptbtn}
               onPress={()=>{
                 setChecked2(true)
                 setModalVisible3(false)
               }}
           >
             <Text style={{color:'white',fontWeight:'bold'}}>Okudum Kabul ediyorum</Text>
           </TouchableOpacity>
           </View>
       </ScrollView>
         
           
                       
          
        </SafeAreaView>
      </Modal>

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
    justifyContent: 'center',
    margin: 0,
    padding:30
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
  
borderRadius:10
    
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
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  Acceptbtn:{
    backgroundColor:'#2aaa46',
    padding:10,
    borderRadius:5
}
});
