mport { View, Text, TouchableOpacity,Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Feather from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import Icon3 from "react-native-vector-icons/MaterialIcons";
import { Platform } from 'react-native';
import Modal from "react-native-modal";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as DocumentPicker from "expo-document-picker";
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { documentView } from '../helper';
import { getValueFor } from '../../components/methods/user';
export default function VerifyDocument({nextStep,prevStep}) {
    const [FormDatas, setFormDatas] = useState({
      TaxDocument:null,
      Signature:null,
      authorizationCertificate:null,
      ConfirmDocumentWithSignature:null,
      documentForBuilder:null,
      documentForAcent:null,
      PdfName:null,
      pdfUrl:null
        // Diğer form alanları buraya eklenebilir
      });
    
      const setData = (key, value) => {
        setFormDatas((prevState) => ({
          ...prevState,
          [key]: value,
        }));
     
      };
      const pickImage = async (key) => {
        // Kamera veya galeriden izin isteği
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Resim seçmek için izin vermeniz gerekmektedir.");
          return;
        }
    
        // Resim seçimi
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          // Seçilen resmin uri'si ile ilgili form verisini güncelleme
          setData(key, result.assets[0].uri);
          setchoose(false)
        }
      };
      const takePhoto = async (key) => {
        // Kameraya erişim izni iste
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('İzin Gerekli', 'Fotoğraf çekmek için kamera iznine ihtiyacımız var.');
          return;
        }
      
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
            setData(key, result.assets[0].uri);
            setchoose(false)
        }
      };
        
      
        const [selectedPick, setselectedPick] = useState(null)
        const [choose, setchoose] = useState(false)

        const openModalAndChooseDoc=(key)=>{
            setselectedPick(key)
            setchoose(true)
        }
        const [selectedDocumentName, setSelectedDocumentName] = useState(null);

        const [pdfFile, setPdfFile] = useState(null);
        const [selectedPdfUrl, setselectedPdfUrl] = useState(null);
        const pickDocument = async (key) => {
            DocumentPicker.getDocumentAsync({ type: "application/pdf" })
              .then((result) => {
                console.log(
                  "Seçilen PDF Dosyasının İçeriği:",
                  JSON.stringify(result, null, 2)
                );
        
                if (!result.canceled && result.assets && result.assets.length > 0) {
                  const pdfAsset = result.assets[0];
                  setPdfFile(pdfAsset);
               
                  setData(key,pdfAsset.uri);
                
                  setchoose(false)
              
                
                }
              })
              .catch((error) => {
                alert("hata");
              });
          };
          console.log(FormDatas.pdfUrl)
          const [deleteModal, setdeleteModal] = useState(false)
          const deleteDocument=(key)=>{
            setData(key, null);
            setdeleteModal(false)
          }
          const openPdf = async (url) => {
            if (url) {
              try {
                const contentUri = await FileSystem.getContentUriAsync(url);
                IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
                  data: contentUri,
                  flags: 1,
                  type: "application/pdf",
                });
              } catch (error) {
                console.error("PDF açılırken hata oluştu:", error);
              }
            } else {
              Alert.alert("PDF dosyası bulunamadı");
            }
          };
          const navigation = useNavigation()
          console.log(FormDatas.pdfUrl + 'sfgdgdf')
            const checkDocument=()=>{
                if (!FormDatas.TaxDocument) {
                    Alert.alert('Uyarı', 'Vergi levhası yükle');
                    return;
                  }
              
                  if (!FormDatas.Signature) {
                    Alert.alert('Uyarı', 'İmza Sirküsü yükle');
                    return;
                  }
              
                  if (!FormDatas.authorizationCertificate) {
                    Alert.alert('Uyarı', 'Taşınmaz Yetki Belgesi yükle');
                    return;
                  }
              
                  if (!FormDatas.ConfirmDocumentWithSignature) {
                    Alert.alert('Uyarı', 'İmzalı Onay Belgesi yükle');
                    return;
                  }
              
                  // E ğer tüm alanlar dolu ise, başarılı mesajı göster
                  sendDocument()
                  
            }
            const sendDocument=()=>{
                alert('Başarılı')
            }
            const [verifyStatus, setverifyStatus] = useState(null)
            useEffect(() => {
              getValueFor('PhoneVerify',setverifyStatus)
            }, [])

            console.log(verifyStatus + 'Document')
            const [user, setuser] = useState({})
            useEffect(() => {
                getValueFor('user',setuser)
            }, [])
            console.log(user.corporate_type)
  return (

    <>
    {
      user.type==1?
      <View>
        <Text>Burası Kurumsal hesapların dosya doğrulama ekranı göremiyoruz diye üzülmeyin hesabım bölümünden istediğiniz zaman kurumsal hesap başvurusu yapabilirsiniz</Text>
      </View>
 :
<ScrollView
showsVerticalScrollIndicator={false}
    contentContainerStyle={{gap:15}}
style={{
    flex:1,
        backgroundColor: "#FCFCFC",
    margin:10
}}>
    
    {
        documentView.map((item,_i)=>(
            <TouchableOpacity key={_i} style={{gap:7,width:'100%',
                display:item.isShow=='All'?'flex':'none' && item.isShow==user.corporate_type? 'flex':'none'

            }} onPress={()=>{
                if (FormDatas[item.state]) {
                       setselectedPick(item.state)
                       setdeleteModal(true)
                }else{
                    openModalAndChooseDoc(item.state)
                }
             
                
            }}>
            <View style={{paddingLeft:10,flexDirection:'row',gap:5,alignItems:'center'}}>
                        <Text style={{fontSize:14,color:'#333',fontWeight:'600'}}>{item.text}</Text>
                        { FormDatas[item.state] &&  <Text style={{color:'#008001',fontSize:12}}>Seçildi</Text> }     
                    </View> 
                  
                    <View style={{width:'100%',height:150,borderWidth:1.5,borderStyle:'dashed',borderRadius:20,borderColor:FormDatas[item.state]?'#2080113d': '#FDEAEA'}}>
                    <View style={{alignItems:'center',backgroundColor:FormDatas[item.state]?'#2080113d': '#FDEAEA',width:'100%',height:'100%',justifyContent:'center',borderRadius:20}}>

                        {   

                            FormDatas[item.state] ? 
                            FormDatas[item.state]?.slice(-3) == 'pdf'?
                           <TouchableOpacity style={{
                            backgroundColor:'#208011',
                            padding:9,                            
                            borderRadius:9
                           }}
                           onPress={() => {
                            if (Platform.OS === "android") {
                              openPdf(FormDatas[item.state]);
                            } else if (Platform.OS === "ios") {
                              navigation.navigate("DecontPdf", {
                                name: 'pdf',
                                pdfUri: FormDatas[item.state],
                              });
                            }
                          }}
                           >
                            <Text style={{fontSize:13,color:'white',fontWeight:'700'}}>Pdf Görüntüle</Text>
                           </TouchableOpacity>:
                            <Image source={{uri:FormDatas[item.state]}} style={{width:'100%',height:'100%',borderRadius:20}}/>
                            :
                            <>
                             <Feather name="cloud-upload-outline" size={60} color={'#EA2B2E'}/>
                             <Text style={{color:'#EA2B2E',fontSize:13}}>Dosyanızı buraya yükleyiniz</Text>
                            </>
                        }
                    </View>
                    </View> 
            </TouchableOpacity>
        ))
    }
   
  
    <TouchableOpacity style={{backgroundColor:'#EA2A29',padding:8,borderRadius:8}} 
            onPress={()=>{
             checkDocument()
            }}
    >
        <Text style={{textAlign:'center',fontSize:13,color:'white',fontWeight:'600'}}>Onaya Gönder</Text>
    </TouchableOpacity>
    <AwesomeAlert
    show={deleteModal}
    showProgress={false}
    titleStyle={{
      color: "#333",
      fontSize: 13,
      fontWeight: "700",
      textAlign: "center",
      margin: 5,
    }}
    title={'Dosyayı Sil'}
    messageStyle={{ textAlign: "center" }}
    message={`Seçili Dosyayı Kaldırmak İstediğinize Emin misiniz?`}
    closeOnTouchOutside={false}
    closeOnHardwareBackPress={false}
    showCancelButton={true}
    showConfirmButton={true}
    cancelText="Vazgeç"
    confirmText="Sil"
    cancelButtonColor="#1d8027"
    confirmButtonColor="#ce4d63"
    onCancelPressed={() => {
        setdeleteModal(false)
    }}
    onConfirmPressed={() => {
        deleteDocument(selectedPick)
    }}
    confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
    cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
  />
    <Modal
          isVisible={choose}
          style={styles.modal2}
          animationIn={'slideInUp'}
          animationOut={"slideOutDown"}
          onBackdropPress={()=>setchoose(false)}
          swipeDirection={['down']}
          onSwipeComplete={()=>setchoose(false)}
        >
          <View style={[styles.modalContent2,{paddingBottom:10}]}>
            <View style={{paddingTop:10,alignItems:'center'}}>
              <TouchableOpacity style={{width:'15%',backgroundColor:'#c2c4c6',padding:4,borderRadius:50}}>

              </TouchableOpacity>
            </View>
            <View style={{padding:20,gap:35,marginBottom:10}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={()=>pickImage(selectedPick)}>
                      <Icon3 name="photo" size={23} color={'#333'}/>
                      <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Kütüphaneden Seç</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={()=>takePhoto(selectedPick)}>
                      <Icon3 name="add-a-photo" size={21} color={'#333'}/>
                      <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Fotoğraf Çek</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={()=>{
                pickDocument(selectedPick)
              }}>
                      <Icon3 name="file-open" size={21} color={'#333'}/>
                      <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Pdf Yükle</Text>
              </TouchableOpacity>
             
            </View>
            
          </View>
        </Modal>
</ScrollView> 
    }
  
    </>
  
  )
}

const styles=StyleSheet.create({
    modal2: {
        justifyContent: "flex-end",
        margin: 0,
      },
      modalContent2: {
        gap: 10,
        paddingBottom:20,
        backgroundColor: "#F8F7F4",
        padding: 10,
    
    
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        ...Platform.select({
          ios: {
            shadowColor: "white",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
          },
        }),
      },
})