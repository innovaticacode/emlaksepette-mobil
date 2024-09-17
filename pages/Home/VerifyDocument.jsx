import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import Icon3 from "react-native-vector-icons/MaterialIcons";
import { Platform } from "react-native";
import Modal from "react-native-modal";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as DocumentPicker from "expo-document-picker";
import AwesomeAlert from "react-native-awesome-alerts";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { documentView } from "../helper";
import ImageViewing from "react-native-image-viewing";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
export default function VerifyDocument({ nextStep, prevStep }) {
  const [FormDatas, setFormDatas] = useState({
    sicil_belgesi: null,
    vergi_levhası: null,
    kimlik_belgesi: null,
    apporove_website: null,
    insaat_belgesi: null,

    // Diğer form alanları buraya eklenebilir
  });

  const setData = (key, value) => {
    setFormDatas((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const pickImage = async (key) => {
    // Kamera veya galeriden izin isteği
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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
      setData(key, result.assets[0]);
      setchoose(false);
    }
  };
  const takePhoto = async (key) => {
    // Kameraya erişim izni iste
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "İzin Gerekli",
        "Fotoğraf çekmek için kamera iznine ihtiyacımız var."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setData(key, result.assets[0]);
      setchoose(false);
    }
  };

  const [selectedPick, setselectedPick] = useState(null);
  const [choose, setchoose] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedUrl, setselectedUrl] = useState("");
  const [selectedDocument, setselectedDocument] = useState("");
  const openModalAndChooseDoc = (key, url, document) => {
    setselectedPick(key);
    setchoose(true);
  };
  const showDocument = (url, document) => {
    setselectedUrl(url);
    setselectedDocument(document);
    setIsVisible(true);
  };
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

          setData(key, pdfAsset);

          setchoose(false);
        }
      })
      .catch((error) => {
        alert("hata");
      });
  };
  console.log(FormDatas.pdfUrl);
  const [deleteModal, setdeleteModal] = useState(false);
  const deleteDocument = (key) => {
    setData(key, null);
    setdeleteModal(false);
  };
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
  const navigation = useNavigation();
  console.log(FormDatas.pdfUrl + "sfgdgdf");

  const [loading, setloading] = useState(false);
  const sendDocument = () => {
    setloading(true);
    const formData = new FormData();

    formData.append(
      `sicil_belgesi`,
      FormDatas.sicil_belgesi
        ? {
            uri:
              Platform.OS === "android"
                ? FormDatas.sicil_belgesi
                : FormDatas?.sicil_belgesi?.uri.replace("file://", ""), // Android ve iOS için uygun URI
            type: FormDatas?.sicil_belgesi?.mimeType,
            name:
              FormDatas.sicil_belgesi.name == null
                ? "İmage.jpeg"
                : FormDatas.sicil_belgesi?.name?.slice(-3) == "pdf"
                ? FormDatas.sicil_belgesi?.name
                : FormDatas.sicil_belgesi?.fileName, // Sunucuya gönderilecek dosya adı
          }
<<<<<<< HEAD
        : null
    );
    formData.append(
      `approve_website`,
      FormDatas.apporove_website
        ? {
            uri:
              Platform.OS === "android"
                ? FormDatas.apporove_website.uri
                : FormDatas?.apporove_website?.uri.replace("file://", ""), // Android ve iOS için uygun URI
            type: FormDatas?.apporove_website?.mimeType,
            name:
              FormDatas.apporove_website.name == null
                ? "İmage.jpeg"
                : FormDatas.apporove_website?.name?.slice(-3) == "pdf"
                ? FormDatas.apporove_website?.name
                : FormDatas.apporove_website?.fileName, // Sunucuya gönderilecek dosya adı
          }
        : null
    );
    formData.append(
      `vergi_levhasi`,
      FormDatas.vergi_levhası
        ? {
            uri:
              Platform.OS === "android"
                ? FormDatas.vergi_levhası.uri
                : FormDatas?.vergi_levhası?.uri.replace("file://", ""), // Android ve iOS için uygun URI
            type: FormDatas?.vergi_levhası?.mimeType,
            name:
              FormDatas.vergi_levhası.name == null
                ? "İmage.jpeg"
                : FormDatas.vergi_levhası?.name?.slice(-3) == "pdf"
                ? FormDatas.vergi_levhası?.name
                : FormDatas.vergi_levhası?.fileName, // Sunucuya gönderilecek dosya adı
          }
        : null
    );
    formData.append(
      `kimlik_belgesi`,
      FormDatas.kimlik_belgesi
        ? {
            uri:
              Platform.OS === "android"
                ? FormDatas.kimlik_belgesi.uri
                : FormDatas?.kimlik_belgesi?.uri.replace("file://", ""), // Android ve iOS için uygun URI
            type: FormDatas?.kimlik_belgesi?.mimeType,
            name:
              FormDatas.kimlik_belgesi.name == null
                ? "İmage.jpeg"
                : FormDatas.kimlik_belgesi?.name?.slice(-3) == "pdf"
                ? FormDatas.kimlik_belgesi?.name
                : FormDatas.kimlik_belgesi?.fileName, // Sunucuya gönderilecek dosya adı
          }
        : null
    );
    formData.append(
      `insaat_belgesi`,
      FormDatas.insaat_belgesi
        ? {
            uri:
              Platform.OS === "android"
                ? FormDatas.insaat_belgesi.uri
                : FormDatas?.insaat_belgesi?.uri.replace("file://", ""), // Android ve iOS için uygun URI
            type: FormDatas?.insaat_belgesi?.mimeType,
            name:
              FormDatas.insaat_belgesi.name == null
                ? "İmage.jpeg"
                : FormDatas.insaat_belgesi?.name?.slice(-3) == "pdf"
                ? FormDatas.insaat_belgesi?.name
                : FormDatas.insaat_belgesi?.fileName, // Sunucuya gönderilecek dosya adı
          }
        : null
    );
    axios
      .post("https://private.emlaksepette.com/api/verify-account", formData, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("başarılı");
        setFormDatas({
          sicil_belgesi: null,
          vergi_levhası: null,
          kimlik_belgesi: null,
          apporove_website: null,
          insaat_belgesi: null,
          // Diğer form alanları buraya eklenebilir
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Hata oluştu");
      })
      .finally(() => {
        setloading(false);
      });
  };
=======
        
          const navigation = useNavigation()
          console.log(FormDatas.pdfUrl + 'sfgdgdf')
          
            const [loading, setloading] = useState(false)
            const sendDocument=()=>{
              setloading(true)
              const formData = new FormData();
              
              formData.append(`sicil_belgesi`,FormDatas.sicil_belgesi? {
                uri: Platform.OS === "android" ? FormDatas.sicil_belgesi : FormDatas?.sicil_belgesi?.uri.replace("file://", ""), // Android ve iOS için uygun URI
                type: FormDatas?.sicil_belgesi?.mimeType, 
                name:FormDatas.sicil_belgesi.name==null?'İmage.jpeg': FormDatas.sicil_belgesi?.name?.slice(-3) =='pdf' ? FormDatas.sicil_belgesi?.name:FormDatas.sicil_belgesi?.fileName, // Sunucuya gönderilecek dosya adı
              }:null);
              formData.append(`approve_website`, FormDatas.apporove_website?{
                uri: Platform.OS === "android" ? FormDatas.apporove_website.uri : FormDatas?.apporove_website?.uri.replace("file://", ""), // Android ve iOS için uygun URI
                type: FormDatas?.apporove_website?.mimeType, 
                name:FormDatas.apporove_website.name==null ? 'İmage.jpeg': FormDatas.apporove_website?.name?.slice(-3) == 'pdf' ? FormDatas.apporove_website?.name:FormDatas.apporove_website?.fileName , // Sunucuya gönderilecek dosya adı
              }:null);
              formData.append(`vergi_levhasi`,FormDatas.vergi_levhası? {
                uri: Platform.OS === "android" ? FormDatas.vergi_levhası.uri : FormDatas?.vergi_levhası?.uri.replace("file://", ""), // Android ve iOS için uygun URI
                type: FormDatas?.vergi_levhası?.mimeType, 
                name:FormDatas.vergi_levhası.name==null ? 'İmage.jpeg': FormDatas.vergi_levhası?.name?.slice(-3) == 'pdf' ? FormDatas.vergi_levhası?.name:FormDatas.vergi_levhası?.fileName , // Sunucuya gönderilecek dosya adı
              }:null);
              formData.append(`kimlik_belgesi`,FormDatas.kimlik_belgesi ? {
                uri: Platform.OS === "android" ? FormDatas.kimlik_belgesi.uri : FormDatas?.kimlik_belgesi?.uri.replace("file://", ""), // Android ve iOS için uygun URI
                type: FormDatas?.kimlik_belgesi?.mimeType, 
                name:FormDatas.kimlik_belgesi.name==null ?'İmage.jpeg': FormDatas.kimlik_belgesi?.name?.slice(-3) == 'pdf' ? FormDatas.kimlik_belgesi?.name:FormDatas.kimlik_belgesi?.fileName  , // Sunucuya gönderilecek dosya adı
              }:null);
              formData.append(`insaat_belgesi`, FormDatas.insaat_belgesi? {
                uri: Platform.OS === "android" ? FormDatas.insaat_belgesi.uri : FormDatas?.insaat_belgesi?.uri.replace("file://", ""), // Android ve iOS için uygun URI
                type: FormDatas?.insaat_belgesi?.mimeType, 
                name:FormDatas.insaat_belgesi.name ==null ? 'İmage.jpeg':  FormDatas.insaat_belgesi?.name?.slice(-3) == 'pdf' ? FormDatas.insaat_belgesi?.name:FormDatas.insaat_belgesi?.fileName , // Sunucuya gönderilecek dosya adı
              }:null);
              axios
                .post("https://private.emlaksepette.com/api/verify-account", formData, {
                  headers: {
                    Authorization: `Bearer ${user?.access_token}`,
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((res) => {
                  alert('başarılı')
                  setFormDatas({
                    sicil_belgesi: null,
                    vergi_levhası: null,
                    kimlik_belgesi: null,
                    apporove_website: null,
                    insaat_belgesi: null,
                    // Diğer form alanları buraya eklenebilir
                  });
               
                })
                .catch((err) => {
                  console.error(err);
                  alert("Hata oluştu");
                }).finally(()=>{
                  setloading(false)
                })
            }
         
            const [verifyStatus, setverifyStatus] = useState(null)
            useEffect(() => {
              getValueFor('PhoneVerify',setverifyStatus)
            }, [])
>>>>>>> 2b675788f1cc1127218f4ac29b46bb0bab11314f

  const [verifyStatus, setverifyStatus] = useState(null);
  useEffect(() => {
    getValueFor("PhoneVerify", setverifyStatus);
  }, []);

  console.log(verifyStatus + "Document");

  console.log(FormDatas[selectedPick]?.name + "dosya tipi");
  console.log(selectedPick + " state");
  console.log(user.corporate_type + "sfsd");
  const [filteredDocuments, setfilteredDocuments] = useState([]);
  const isFocused = useIsFocused();

  console.log(FormDatas[selectedPick]?.name + "dosya ismi");

  const checkDocuments = () => {};
  // console.log(user)
  // console.log(user.corporate_account_status + 'dfs')
  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const [loadingForUserInfo, setloadingForUserInfo] = useState(false);
  const GetUserInfo = async () => {
    setloadingForUserInfo(true);
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(
          "https://private.emlaksepette.com/api/users/" + user?.id,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userData);
        setData("vergi_levhası", namFromGetUser.tax_document);
        setData("sicil_belgesi", namFromGetUser.record_document);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloadingForUserInfo(false);
    }
  };

  useEffect(() => {
    setfilteredDocuments(documentView);
    GetUserInfo();
  }, [user]);
  console.log(namFromGetUser);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 15 }}
      style={{
        flex: 1,
        backgroundColor: "#FCFCFC",
        margin: 10,
      }}
    >
      {filteredDocuments.map((item, _i) => (
        <TouchableOpacity
          style={{
            gap: 7,
            width: "100%",
            display:
              item.isShow == "All"
                ? "flex"
                : "none" && item.isShow == user.corporate_type
                ? "flex"
                : "none",
          }}
          onPress={() => {
            if (FormDatas[item.state]) {
              setselectedPick(item.state);
              setdeleteModal(true);
            } else {
              openModalAndChooseDoc(item.state);
            }
          }}
        >
          <View
            style={{
              paddingLeft: 10,
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#333", fontWeight: "600" }}>
              {item.text}
            </Text>
            {FormDatas[item.state] && namFromGetUser[item.approve] !== 1 && (
              <Text style={{ color: "#008001", fontSize: 12 }}>Seçildi</Text>
            )}
            {namFromGetUser[item.approve] == 1 && !FormDatas[item.state] && (
              <Text
                style={{ color: "#008001", fontSize: 12, fontWeight: "600" }}
              >
                Onaylandı
              </Text>
            )}
          </View>

          <View
            style={{
              width: "100%",
              height: 150,
              borderWidth: 1.5,
              borderStyle: "dashed",
              borderRadius: 20,
              borderColor: FormDatas[item.state] ? "#2080113d" : "#FDEAEA",
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: FormDatas[item.state]
                  ? "#2080113d"
                  : "#FDEAEA",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              {FormDatas[item.state] ? (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#E0F2E3",
                    borderRadius: 20,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      gap: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        showDocument(item.url, item.document);
                      }}
                      style={{
                        backgroundColor: "#0FA958",
                        padding: 9,
                        borderRadius: 9,
                        width: "60%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          color: "white",
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      >
                        Belgeyi Gör
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setselectedPick(item.state);
                        setdeleteModal(true);
                      }}
                      style={{
                        backgroundColor: "#EA2A29",
                        padding: 9,
                        borderRadius: 9,
                        width: "60%",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 13,
                          fontWeight: "700",
                          textAlign: "center",
                        }}
                      >
                        Belgeyi Sil
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <>
                  <Feather
                    name="cloud-upload-outline"
                    size={60}
                    color={"#EA2B2E"}
                  />
                  <Text style={{ color: "#EA2B2E", fontSize: 13 }}>
                    Dosyanızı buraya yükleyiniz
                  </Text>
                </>
              )}
              {/* {   
                         namFromGetUser[item.approve] == 1 && FormDatas[item.state]==null?
                        <View style={{width:'100%',height:'100%',backgroundColor:'#E0F2E3',borderRadius:20,justifyContent:'center'}}>
                            <View style={{gap:10,alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity
                            style={{
                              backgroundColor:'#0FA958',
                              padding:9,                            
                              borderRadius:9,
                              width:'60%'
                            }}
                            >
                                <Text style={{
                                  fontSize:13,color:'white',fontWeight:'700',
                                  textAlign:'center'
                                }}>
                                  Belgeyi Gör
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                              onPress={()=>{
                                setselectedPick(item.state)
                                setdeleteModal(true)
                              }}
                              style={{
                                backgroundColor:'#EA2A29',
                                padding:9,                            
                                borderRadius:9,
                                 width:'60%'
                              }}
                              >
                                <Text style={{color:'white',fontSize:13,fontWeight:'700',textAlign:'center'}}>
                                  Belgeyi Sil
                                </Text>
                              </TouchableOpacity>
                             
                              </View>

                        </View>:

                            FormDatas[item.state] ? 
                            FormDatas[item.state].uri?.slice(-3) == 'pdf'?
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
                                pdfUri: FormDatas[item.state].uri,
                              });
                            }
                          }}
                           >
                            <Text style={{fontSize:13,color:'white',fontWeight:'700'}}>Pdf Görüntüle</Text>
                           </TouchableOpacity>:
                            <Image source={{uri:FormDatas[item.state]?.uri}} style={{width:'100%',height:'100%',borderRadius:20}}/>
                            :
                            <>
                             <Feather name="cloud-upload-outline" size={60} color={'#EA2B2E'}/>
                             <Text style={{color:'#EA2B2E',fontSize:13}}>Dosyanızı buraya yükleyiniz</Text>
                            </>
                        } */}
            </View>
            <ImageViewing
              images={[
                {
                  uri: `https://private.emlaksepette.com/${selectedUrl}/${namFromGetUser[selectedDocument]}`,
                },
              ]}
              imageIndex={0}
              visible={isVisible}
              onRequestClose={() => setIsVisible(false)}
            />
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={{
          backgroundColor: "#EA2A29",
          padding: 8,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          sendDocument();
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "white",
              fontWeight: "600",
            }}
          >
            Onaya Gönder
          </Text>
        )}
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
        title={"Dosyayı Sil"}
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
          setdeleteModal(false);
        }}
        onConfirmPressed={() => {
          deleteDocument(selectedPick);
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
              onPress={() => pickImage(selectedPick)}
            >
              <Icon3 name="photo" size={23} color={"#333"} />
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "700" }}>
                Kütüphaneden Seç
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              onPress={() => takePhoto(selectedPick)}
            >
              <Icon3 name="add-a-photo" size={21} color={"#333"} />
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "700" }}>
                Fotoğraf Çek
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              onPress={() => {
                pickDocument(selectedPick);
              }}
            >
              <Icon3 name="file-open" size={21} color={"#333"} />
              <Text style={{ fontSize: 14, color: "#333", fontWeight: "700" }}>
                Pdf Yükle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  approveTrue: {
    backgroundColor: "green",
  },
});
