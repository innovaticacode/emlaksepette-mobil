import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,

} from "react-native";
import React, { useState,useEffect } from "react";

import RNPickerSelect from "react-native-picker-select";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SwapForm({data,openModal,color,}) {
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
  const [name, setname] = useState('')
  const [surname, setsurname] = useState('')
  const [phoneNmber, setphoneNmber] = useState('')
  const [email, setemail] = useState('')

  const postData = async () => {
   
    try {
    var formData=new FormData()
      formData.append('ad',name)
      formData.append('soyad',surname)
       formData.append('telefon',phoneNmber)
        formData.append('email',email)
       formData.append('sehir',city)
       formData.append('ilce',county)
       formData.append('takas_tercihi',SwapChoose)
        formData.append('store_id',data?.housing?.user?.id)
        formData.append('emlak_tipi',estateChoose)
        formData.append('konut_tipi',houseType)
        formData.append('oda_sayisi',roomCount)
        formData.append('konut_yasi',houseAge)
        formData.append('kullanim_durumu',useStatus)
        formData.append('konut_satis_rakami',YourPrice)
        formData.append('arsa_il',AreaCity)
        formData.append('arsa_ilce',AreaCounty)
        formData.append('arsa_mahalle',AreaNeigbour)
        formData.append('ada_parsel',AreaPlaceInfo)
        formData.append('imar_durumu',AreaStatu) 
        formData.append('satis_rakami',addDotEveryThreeDigits(YourAreaPrice))
        formData.append('ticari_bilgiler',TradeInfo)
        formData.append('isyeri_satis_rakami',yourPriceShop)
        formData.append('arac_model_yili',CarYear)
        formData.append('arac_markasi',carModal)
        formData.append('yakit_tipi',fuelType)
        formData.append('vites_tipi',shiftType)
        formData.append('arac_satis_rakami',Price)
        formData.append('barter_detay',Barter)
      console.log(name)
      const response = await axios.post('https://emlaksepette.com/api/swap', formData);
      
      // İsteğin başarılı bir şekilde tamamlandığı durum
      console.log('İstek başarıyla tamamlandı:', response.data);

      openModal(JSON.stringify(response.data.message))
      color('#d4edda')
    setname('')
    setsurname('')
    setphoneNmber('')
    setemail('')
    setcity('')
    setcounty('')
    setSwapChoose('')
    } catch (error) {
      // Hata durumunda
       openModal('Tüm Alanları Doldurunuz')
      color('#F8D7DA')
      console.error('Hata:', error +'post isteği başarısız ');
    }
  };
  
  // Buton tetikleyicisi için bir fonksiyon
  const handleButtonPress = () => {
    postData();
  
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
      const [areaCounty, setareaCounty] = useState([])
      const onChangeAreaCity=(value)=>{
        setAreaCity(value)
         if (value) {
            fetchDataCounty(value)
                         .then(county => setareaCounty(county.data))
                         .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
         }else{
          setareaCounty([])
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
          setAreaCounty(value)
          if (value) {
             fetchDataNeigbour(value)
                          .then(county => setNeigbour(county.data))
                          .catch(error => console.error('Veri alınırken bir hata oluştu:', error));
          }else{
           setNeigbour([])
          }
        }

       
    
  return (
    <KeyboardAwareScrollView style={{ padding: 10, gap: 10 }} contentContainerStyle={{gap:10}}>
   
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          Ad:
        </Text>
        <TextInput style={styles.Input} value={name} onChangeText={(value)=>setname(value)} />
      </View>
      
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          Soyad
        </Text>
        <TextInput style={styles.Input} value={surname} onChangeText={(value)=>setsurname(value)} />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          Telefon Numaranız
        </Text>
        <TextInput style={styles.Input} value={phoneNmber} onChangeText={(value)=>setphoneNmber(value)} />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
          E-mail
        </Text>
        <TextInput style={styles.Input}value={email} onChangeText={(value)=>setemail(value)}/>
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
          onValueChange={(value)=>{
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
            { label: "Emlak", value: "Emlak" },
            { label: "Araç", value: "araç" },
            { label: "Barter", value: "barter" },
            { label: "Diğer", value: "Diğer" },
          ]}
        />
      </View>
      <View
        style={{ gap: 6, display: SwapChoose == "Emlak" ? "flex" : "none" }}
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
            { label: "İş Yeri", value: "iş yeri" },
          ]}
        />
      </View>
      {estateChoose == "konut" && SwapChoose == "Emlak" ? (
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
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
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
              items={[
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
              ]}
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
              items={[
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
              ]}
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
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
              ]}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Düşündüğünüz Satış Rakamı
            </Text>
            <TextInput style={styles.Input} value={YourPrice} onChangeText={(value)=>setYourPrice(value)} />
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
                borderRadius: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Yükle</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}

      {estateChoose == "arsa" && SwapChoose == "Emlak" ? (
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
               onValueChange={(value)=>{onChangeAreaCity(value)}}
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
               onValueChange={(value)=>{
                onChangeCounty(value)
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
            <TextInput style={styles.Input} value={AreaPlaceInfo} onChangeText={(value)=>setAreaPlaceInfo(value)} />
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
                { "label": "Diğer", "value": "Diğer" },
    { "label": "Villa", "value": "Villa" },
    { "label": "Konut", "value": "Konut" },
    { "label": "Turizm", "value": "Turizm" },
    { "label": "Tarla", "value": "Tarla" },
    { "label": "Sanayi", "value": "Sanayi" },
    { "label": "Ticari", "value": "Ticari" },
    { "label": "Bağ Bahçe", "value": "Bağ Bahçe" }
              ]}
            />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Düşündüğünüz Satış Rakamı
            </Text>
            <TextInput style={styles.Input} value={YourAreaPrice} onChangeText={(value)=>setYourAreaPrice(value)} />
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
              items={[
                { label: '324324', value: '32432'},
               
              ]}
            />
           
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Araç Markası
            </Text>
            <TextInput style={styles.Input} value={carModal} onChangeText={(value)=>setcarModal(value)}/>
       
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
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
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
                { label: "Konut", value: "konut" },
                { label: "Arsa", value: "arsa" },
                { label: "İş Yeri", value: "iş yeri" },
              ]}
            />
         
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Satış Rakamı
            </Text>
            <TextInput style={styles.Input} value={Price} onChangeText={(value)=>setPrice(value)}/>
        
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
                borderRadius: 10,
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>Yükle</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}
      {estateChoose == "iş yeri" && SwapChoose == "Emlak" ? (
        <>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Ticari ile ilgili Bilgileri Giriniz
            </Text>
            <TextInput style={styles.Input} value={TradeInfo} onChangeText={(value)=>setTradeInfo(value)} />
          </View>
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 14, color: "grey", fontWeight: 600 }}>
              Düşündüğünüz Satış Rakamı
            </Text>
            <TextInput style={styles.Input} value={yourPriceShop} onChangeText={(value)=>setyourPriceShop(value)}/>
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
            <TextInput style={styles.Input} value={Barter} onChangeText={(value)=>setBarter(value)}/>
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
            <TextInput style={styles.Input} value={OtherInfo} onChangeText={(value)=>setOtherInfo(value)}/>
          </View>
        </>
      ) : (
        <></>
      )}
      <View>
        <TouchableOpacity onPress={handleButtonPress} style={{
          backgroundColor:'red',
          padding:10,
          borderRadius:10
        }}>
          <Text style={{color:'white',textAlign:'center'}}>Başvuruyu Tamamla</Text>
        </TouchableOpacity> 
      </View>
     
    </KeyboardAwareScrollView>
  );
}
const pickerSelectStyles = StyleSheet.create({
  
  inputIOS: {
    
    borderWidth: 1,
    borderColor: "#bdc6cf",
    borderRadius: 6,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#bdc6cf",
    borderRadius: 6,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderColor: "#bdc6cf",
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
  },
});
