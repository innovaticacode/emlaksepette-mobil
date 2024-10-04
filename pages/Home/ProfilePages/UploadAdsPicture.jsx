import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import UploadIcon from "react-native-vector-icons/AntDesign";
import AdsPictureItem from "./profileComponents/AdsPictureItem";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/AntDesign";
import {
  apiRequestGetWithBearer,
  apiRequestPostWithBearer,
} from "../../../components/methods/apiRequest";
import { ActivityIndicator } from "react-native-paper";
import Modal from "react-native-modal";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";
import { useIsFocused } from "@react-navigation/native";
import AdsPictureList from "./AdsPictureList";
export default function UploadAdsPicture() {
  const [choose, setchoose] = useState(false);
  const [ımage, setImage] = useState(null);
  const [deleteAlert, setdeleteAlert] = useState(false);
  const [StoreBanners, setStoreBanners] = useState([]);
  const pickImageFromGallery = async () => {
    // Galeri iznini kontrol et ve iste
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Galeriye erişmek İçin Ayarlardan izin vermeniz gerekmektedir"
      );
      return;
    }

    // Galeriden resim seçme işlemi
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      console.log(result.assets[0]); // Seçilen resmin URI'si
      setchoose(false);
    }
  };

  const takePhotoWithCamera = async () => {
    // Kamera iznini kontrol et ve iste
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Kameraya erişim izni reddedildi.");
      return;
    }

    // Kamera ile resim çekme işlemi
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      console.log(result.assets[0].uri); // Çekilen resmin URI'si
      setchoose(false);
    }
  };
  const [loading, setloading] = useState(false)
 
    const getStoreBanner = () => {
      setloading(true)
      apiRequestGetWithBearer("institutional/store_banner")
        .then((res) => {
          setStoreBanners(res.data);
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
              setloading(false)
        });
    };
  
    useEffect(() => {
      getStoreBanner();
    }, []);
    const [loadingUpdate, setloadingUpdate] = useState(false)
  const SendPictureToApı = () => {
   setloadingUpdate(true)
    var dad = new FormData();
    dad.append("image", {
      uri:
        Platform.OS === "android"
          ? ımage.uri
          : ımage?.uri.replace("file://", ""),

      type: ımage.mimeType,
      name: ımage.fileName==null ? 'Image.jpeg': ımage.fileName,
    });
    dad.append("order", StoreBanners.length + 1);
    apiRequestPostWithBearer("institutional/store_banner", dad)
      .then((res) => {
        setTimeout(() => {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Başarılı",
                textBody:'Mağaza Görseli Başarıyla Oluşturuldu' ,
                button: "Tamam",
              }); 
              setImage(null)
              getStoreBanner()
        }, 200);
      
      })
      .catch((err) => {
        alert(err);
      }).finally(()=>{
        setloadingUpdate(false)
      })
  };
  const UpdatePictureToApı = () => {
    setloadingUpdate(true)
     var dad = new FormData();
     dad.append("image", {
       uri:
         Platform.OS === "android"
           ? ımage.uri
           : ımage?.uri.replace("file://", ""),
 
       type: ımage.mimeType,
       name: ımage.fileName==null ? 'Image.jpeg': ımage.fileName,
     });
     dad.append("order", StoreBanners.length + 1);
     apiRequestPostWithBearer("institutional/store_banner", dad)
       .then((res) => {
         setTimeout(() => {
             Dialog.show({
                 type: ALERT_TYPE.SUCCESS,
                 title: "Başarılı",
                 textBody:'Mağaza Görseli Başarıyla Oluşturuldu' ,
                 button: "Tamam",
               }); 
               setImage(null)
               getStoreBanner()
         }, 200);
       
       })
       .catch((err) => {
         alert(err);
       }).finally(()=>{
         setloadingUpdate(false)
       })
   };
 
 
  return (
    <AlertNotificationRoot>
        {
            loading ?
                <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                    <ActivityIndicator color="#333" size={'large'}/>
                </View>:
                <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContainer}
              >

                {ımage && (
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      Seçili Görseli Silmek İçin Üzerine Tıklayın
                    </Text>
                  </View>
                )}
        
                <View>

                  <TouchableOpacity
                  disabled={StoreBanners.length == 4 ? true:false}
                    style={[
                      styles.AddPicture,
                      {
                        borderColor: ımage ? "green" : "#EA2C2E",
                        borderStyle: ımage ? "solid" : "dashed",
                      },
                    ]}
                    onPress={() => {
                      if (ımage) {
                        setdeleteAlert(true);
                      } else {
                        setchoose(true);
                      }
                    }}
                  >
                    {   StoreBanners.length!==4?
                    
                    ımage ? (
                      <ImageBackground
                        source={ımage}
                        style={{ width: "100%", height: "100%" }}
                        borderRadius={10}
                      />
                    ) : (
                      <View style={styles.NonImageContent}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                        >
                          <Icon name="plus" color={"#EA2C2E"} size={20} />
                          <Text
                            style={{ fontSize: 14, color: "#EA2C2E", fontWeight: "600" }}
                          >
                            Reklam Görseli Ekle
                          </Text>
                        </View>
                      </View>
                    )
                    :<View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                        <Text style={{color:'#EA2B2E',fontWeight:'600',fontSize:16}}>Maximum Mağaza Görseli Sayısına Ulaştınız</Text>

                    </View>
                }
                  </TouchableOpacity>
                 
                </View>
              
                <View style={styles.alert}>
                  <View style={styles.alertContent}>
                    <View>
                      <Icon name="questioncircleo" size={15} color={"#EA2C2E"} />
                    </View>
                    <View style={{ width: "100%" }}>
                      <Text style={styles.alertText}>
                        Bu alana eklenen görseller, her mağazanın kendi profilinde tanıtım
                        ve reklam amaçlı slider'da gösterilecek. Mağazalarınızı doğru bir
                        şekilde tanıtabilmek için bu adım çok önemlidir. Görsellerinizi
                        yüklemek için aşağıdaki alana tıklayarak dosyalarınızı sürükleyip
                        bırakabilir veya seçebilirsiniz. Görsellerinizi yükledikten sonra
                        "Kaydet" butonuna basarak işlemi tamamlayabilirsiniz.
                      </Text>
                    </View>
                  </View>
                </View>
          
                <View>
                  <TouchableOpacity
                    style={{ backgroundColor: "#EA2C2E", borderRadius: 8, padding: 8,opacity:StoreBanners.length==4 || !ımage?0.5:1 }}
                    onPress={SendPictureToApı}
                    disabled={StoreBanners.length==4  || !ımage ? true:false}
                  >
                    {
                        loadingUpdate ?
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                                <ActivityIndicator color="white"/>
                        </View>
                        :
                        <Text
                        style={{
                          textAlign: "center",
                          fontSize: 14,
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        Değişikleri Kaydet
                      </Text>
                    }
                  
                  </TouchableOpacity>
                </View>
                        <View>
                            <AdsPictureList StoreBanners={StoreBanners} getStoreBanner={getStoreBanner}/>
                        </View>

                <AwesomeAlert
                  show={deleteAlert}
                  showProgress={false}
                  titleStyle={{
                    color: "#333",
                    fontSize: 13,
                    fontWeight: "700",
                    textAlign: "center",
                    margin: 5,
                  }}
                  title={"Seçilen Görseli Kaldır"}
                  messageStyle={{ textAlign: "center" }}
                  message={`Seçili Görseli Silmek İstediğinize Emin misiniz?`}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={true}
                  showConfirmButton={true}
                  cancelText="Vazgeç"
                  confirmText="Sil"
                  cancelButtonColor="#ce4d63"
                  confirmButtonColor="#1d8027"
                  onCancelPressed={() => {
                    setdeleteAlert(false);
                  }}
                  onConfirmPressed={() => {
                    setImage(null);
                    setdeleteAlert(false);
                  }}
                  confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                  cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
                />
                <Modal
                  isVisible={choose}
                  style={styles.modal2}
                  animationIn={"slideInUp"}
                  animationOut={"slideOutDown"}
                  onBackdropPress={() => setchoose(false)}
                  swipeDirection={["down"]}
                  onSwipeComplete={() => setchoose(false)}
                >
                  <View style={[styles.modalContent2, { paddingBottom: 10 }]}>
                    <View style={{ paddingTop: 10, alignItems: "center" }}>
                      <TouchableOpacity
                        style={{
                          width: "15%",
                          backgroundColor: "#c2c4c6",
                          padding: 4,
                          borderRadius: 50,
                        }}
                      ></TouchableOpacity>
                    </View>
                    <View style={{ padding: 20, gap: 35, marginBottom: 10 }}>
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                        onPress={pickImageFromGallery}
                      >
                        <Icon3 name="photo" size={23} color={"#333"} />
                        <Text style={{ fontSize: 14, color: "#333", fontWeight: "700" }}>
                          Kütüphaneden Seç
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                        onPress={takePhotoWithCamera}
                      >
                        <Icon3 name="add-a-photo" size={21} color={"#333"} />
                        <Text style={{ fontSize: 14, color: "#333", fontWeight: "700" }}>
                          Fotoğraf Çek
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </ScrollView>
        }
     
    
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContainer: {
    paddingRight: 14,
    paddingLeft: 14,
    paddingTop: 7,
    gap: 10,
    paddingBottom: 40,
  },
  alert: {
    backgroundColor: "#FFEEEE",
    width: "100%",
  },
  alertText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
  },
  alertContent: {
    flexDirection: "row",
    gap: 6,
    padding: 9,
  },
  AddPicture: {
    width: "100%",
    borderWidth: 1.5,
    borderStyle: "dashed",
    height: 170,
    borderRadius: 10,
  },
  NonImageContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    gap: 10,
    paddingBottom: 20,
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
});
