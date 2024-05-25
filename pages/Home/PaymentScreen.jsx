import { View, Text,StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React,{useState} from 'react'
import IconIdCard from "react-native-vector-icons/FontAwesome"
import { CheckBox } from '@rneui/themed';
import CreditCardScreen from './CreditCardScreen';
import EftPay from './EftPay';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from "react-native";
export default function PaymentScreen() {
    const [checked, setChecked] = React.useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    const [checked2, setChecked2] = React.useState(false);
    const toggleCheckbox2 = () => setChecked2(!checked2);
    const [tabs, settabs] = useState(0)
    const completeCreditCardPay=()=>{
        if (IdNumber && NameAndSurnam && ePosta && phoneNumber && adress && notes && checked && checked2) {
            alert('ödeme alındı')
        }else{
            alert('tüm alanları doldur')
        }
       
    }
{/** State Of Inputs **/}
    const [IdNumber, setIdNumber] = useState("")
    const [NameAndSurnam, setNameAndSurnam] = useState("")
    const [ePosta, setePosta] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [adress, setadress] = useState("")
    const [notes, setnotes] = useState("")
    const [referanceCode, setreferanceCode] = useState("")
{/** State Of Inputs **/}
const [modalVisible, setModalVisible] = useState(false)
const [selectedDocumentName, setSelectedDocumentName] = useState(null);
const pickDocument = async () => {
    try {
      // Kullanıcıya belge seçmesine izin ver
      console.log('Belge seçme işlemi başladı.');
      // Kullanıcıya belge seçmesine izin ver
      const result = await DocumentPicker.getDocumentAsync();
      console.log('Belge seçme işlemi tamamlandı.');
      
      // Belge seçilirse, belge bilgilerini göster
      if (result && result === 'success') {
        console.log('Belge seçildi:', result.uri);
        const documentName = getFileNameFromUri(result.uri); // Belge adını al
        setSelectedDocumentName(documentName); 
      } else {
        console.log('Belge seçilmedi veya işlem iptal edildi.');
      }
    } catch (err) {
      console.log('Belge seçerken hata oluştu:', err);
    }
  
  }
  
  const getFileNameFromUri = (uri) => {
    const uriComponents = uri.split('/');
    return uriComponents[uriComponents.length - 1];
  }
  return (
    <KeyboardAwareScrollView style={styles.container}
        contentContainerStyle={{gap:20,paddingBottom:50}}
        showsVerticalScrollIndicator={false}
    >
        <View>
            <View style={[styles.AdvertDetail,{flexDirection:'row'}]}>
                <View style={styles.image}>

                </View>
                <View style={styles.Description}>
                    <View style={{gap:2}}>
                        <Text style={{fontSize:12}}>İlan No: 2000248</Text>
                        <View>
                        <Text style={{fontSize:13}} numberOfLines={3}>Master Realtor'den Bağçeşme'de 1+1 Eşyasız Kiralık Daire</Text>
                    </View>
                    </View>
                
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{backgroundColor:'#EA2B2E',borderRadius:5}}>
                            <Text style={{fontSize:12,color:'white',padding:5,fontWeight:'500'}}>Kiralık Daire</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:12}}>Kocaeli / İzmit</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        <View style={[styles.AdvertDetail,{borderRadius:3}]}>
                <View style={{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'grey',gap:10,paddingBottom:5,alignItems:'center'}}>
                    <IconIdCard name='id-card-o' size={15}/>
                    <Text>Satın alan Kişinin Bilgileri</Text>
                </View>
                <View style={{gap:15}}>
                <View style={{gap:5}}>
                    <Text style={styles.label}>TC</Text>
                    <TextInput value={IdNumber} onChangeText={(value)=>setIdNumber(value)} style={styles.Input}/>
                </View>
                <View style={{gap:5}}>
                    <Text style={styles.label}>Ad Soyad</Text>
                    <TextInput style={styles.Input} value={NameAndSurnam} onChangeText={(value)=>setNameAndSurnam(value)}/>
                </View>
                <View style={{gap:5}}>
                    <Text style={styles.label}>E-posta</Text>
                    <TextInput style={styles.Input} value={ePosta} onChangeText={(value)=>setePosta(value)}/>
                </View>
                <View style={{gap:5}}>
                    <Text style={styles.label}>Telefon</Text>
                    <TextInput style={styles.Input} value={phoneNumber} onChangeText={(value)=>setphoneNumber(value)}/>
                </View>
                <View style={{gap:5}}>
                    <Text style={styles.label}>Adres</Text>
                    <TextInput style={styles.Input} value={adress} onChangeText={(value)=>setadress(value)}/>
                </View>
                <View style={{gap:5}}>
                    <Text style={styles.label}>Notlar</Text>
                    <TextInput style={styles.Input} value={notes} onChangeText={(value)=>setnotes(value)}/>
                </View>
                <View style={{gap:5}}>
                    <Text style={styles.label}>Referans Kodu (Opsiyonel)</Text>
                    <TextInput style={styles.Input} value={referanceCode} onChangeText={(value)=>setreferanceCode(value)}/>
                </View>
                </View>
                <View style={{gap:5}}>
                <CheckBox
           checked={checked2}
           onPress={()=>{
            checked2? setModalVisible(false) : setModalVisible(true)
            setChecked2(false)
           }}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="red"
           size={21}
           containerStyle={{padding:0,margin:0,marginRight:0,marginLeft:0}}
           title={<View style={{padding:5}}>
         
                <Text style={{textDecorationLine:'underline',fontSize:12}}>
                Mesafeli kapora emanet sözleşmesini 
                </Text> 

                <Text style={{fontSize:12}}>
                    okudum kabul ediyorum
                </Text>
           
            </View>}
         />
                <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           containerStyle={{padding:0,margin:0,marginRight:0,marginLeft:0}}
           size={21}
           checkedColor="red"
           title={
            <View style={{alignItems:'center',justifyContent:'center',padding:5}}>
            <Text numberOfLines={2} style={{fontSize:13}}>
                Sözleşme aslını imzalamak için 7 iş günü içerisinde geleceğimi kabul ve beyan ediyorum
                </Text>
            </View>
           }
         />
                </View>
              
             
        </View>
        <View style={[styles.AdvertDetail,{borderRadius:3,}]}>
        <View style={{flexDirection:'row',borderBottomWidth:0.5,borderBottomColor:'grey',gap:10,paddingBottom:5,alignItems:'center'}}>
                    <IconIdCard name='star-o' size={15}/>
                    <Text>Sepet Özeti</Text>
                </View>
                <View style={{gap:20}}>
                <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>İlan Fiyatı:</Text>
                    <Text>13.0000 ₺</Text>
                </View>
                <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Toplam Fiyat:</Text>
                    <Text>13.0000 ₺</Text>
                </View>
                <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text>Bir Kira Kapora</Text>
                    <Text>13.0000 ₺</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{color:'green'}}>Ödenecek Tutar:</Text>
                    <Text style={{color:'green'}}>13.0000 ₺</Text>
                </View>
                </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',borderWidth:0.5,gap:10,borderColor:'#333',width:'100%',overflow:'hidden'}}>
            <TouchableOpacity 
                onPress={()=>{
                    settabs(0)
                }}
            style={{
                width:'50%',
                backgroundColor: tabs==0?'#E54242':'transparent',
                padding:10,
                }}>
                <Text style={{textAlign:'center',color:tabs==0?'white':'#333'}}>Kredi Kartı</Text>
            </TouchableOpacity>


            <TouchableOpacity 
               onPress={()=>{
                settabs(1)
            }}
            style={{width:'50%',
                padding:10,
                backgroundColor:tabs==1?'#E54242':'transparent'
        }}>
                <Text style={{textAlign:'center',color: tabs==1?'white':'#333'}}>EFT / Havale ile Ödeme</Text>
            </TouchableOpacity>
        </View>
        {selectedDocumentName && (
        <Text>Seçilen Belge: {selectedDocumentName}</Text>
      )}

            {tabs==0 && <CreditCardScreen CompeletePayment={completeCreditCardPay}/>}
            {tabs==1 && <EftPay onPress={pickDocument} selectedDocumentName={selectedDocumentName}/>}
            <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropColor="transparent"
        style={styles.modal2}
        animationIn={'fadeInRightBig'}
        animationOut={'fadeOutRightBig'}
      >
        <View style={styles.modalContent2}>
      <SafeAreaView>
      <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.Acceptbtn}
                onPress={()=>{
                  setChecked2(true)
                  setModalVisible(false)
                }}
            >
              <Text style={{color:'white',fontWeight:'bold'}}>Okudum Kabul ediyorum</Text>
            </TouchableOpacity>
            </View>
      </SafeAreaView>
           
                       
   
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f7f7f7',
        flex:1,
        padding:10,
      
    },
    AdvertDetail:{
        gap:10,
        backgroundColor: '#FFFFFF',  
        borderRadius: 6,  
        paddingVertical: 15,  
        paddingHorizontal: 15,  
        width: '100%',  
        
   
        borderWidth:0.7,
        borderColor:'#e6e6e6',
        ...Platform.select({
            ios: {
              shadowColor: ' #e6e6e6',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.0,
              shadowRadius: 1,
            },
            android: {
              elevation: 5,
            },
          }),
    },
    image:{
        backgroundColor:'red',
        width:70,
        height:70
    },
    Description:{
        width:'70%',
        gap:5
    },
    Input:{
        borderWidth:1,
        borderColor:'#ebebeb',
        padding:9,
        borderRadius:5
    },
    label:{
        fontSize: 14, 
        color: "grey",
        fontWeight: '600'
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
})