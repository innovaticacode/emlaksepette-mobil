import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  ActivityIndicator,
  Linking,
  Share,
} from "react-native";
import { React, useState, useRef, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import ShopInfo from "./ProfilePageItem/ShopInfo";
import ProjectAdverts from "./ProfilePageItem/ProjectAdverts";
import RealtorAdverts from "./ProfilePageItem/RealtorAdverts";
import LinkIcon3 from "react-native-vector-icons/Feather";
import LinkIcon4 from "react-native-vector-icons/Fontisto";
import LinkIcon2 from "react-native-vector-icons/FontAwesome";
import LinkIcon from "react-native-vector-icons/Entypo";
import Arrow from "react-native-vector-icons/MaterialIcons";
import { Skeleton } from "@rneui/themed";
import Team from "./ProfilePageItem/Team";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiRequestGet } from "../../components/methods/apiRequest";
import SliderItemSkeleton from "../../components/SkeletonComponents/SliderItemSkeleton";
import ShopVitrin from "./ProfilePageItem/ShopVitrin";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
import { CheckBox } from "@rneui/themed";
import { Platform } from "react-native";
import axios from "axios";
import { getValueFor } from "../../components/methods/user";
import CollectionsOfBrand from "./ProfilePageItem/CollectionsOfBrand";
import CommentsOfBrands from "./ProfilePageItem/CommentsOfBrands";

export default function Profile() {
  const route = useRoute();
  const [Housings, setHousings] = useState([]);
  const { name, id } = route.params;
  const [tab, settab] = useState(0);
  const { width, height, fontScale } = Dimensions.get("window");
  const translateY = useRef(new Animated.Value(400)).current;
  const navigation = useNavigation();
  const openSheet = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const [nameId, setNameId] = useState("");
  const [phoneId, setPhoneId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [errorStatu, seterrorStatu] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");
  const [user, setUser] = useState({});
  const [teamm, setTeamm] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [housingRecords, sethousingRecords] = useState([]);

  const [newCollectionNameCreate, setnewCollectionNameCreate] = useState("");
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const postData = async () => {
    try {
      var formData = new FormData();

      formData.append("name", nameId);
      formData.append("phone", phoneId);
      formData.append("email", emailId);

      const response = await axios.post(
        "https://private.emlaksepette.com/api/institutional/give_offer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "multipart/form-data", // İçerik tipini belirtmek
          },
        }
      );
      setFormVisible(false);
      setTimeout(() => {
        setTrueModal(true);
      }, 3000);

      console.log("İstek başarıyla tamamlandı:", response.data);

      // color("#d4edda");
      setNameId("");
      setPhoneId("");
      setEmailId("");
    } catch (error) {
      if (error.response) {
        // Sunucudan gelen hata yanıtı
        console.error("Sunucu Hatası:", error.response.data);
        console.error("Hata Kodu:", error.response.status);
      } else if (error.request) {
        // İstek yapıldı, ancak cevap alınamadı
        console.error("Sunucudan cevap alınamadı:", error.request);
      } else {
        // İstek ayarları sırasında bir hata oluştu
        console.error("İstek Ayar Hatası:", error.message);
      }
      console.error("Post isteği başarısız:", error);
    }
  };

  const GiveOffer = () => {
    switch (true) {
      case !nameId:
        seterrorStatu(1);
        seterrorMessage("İsim Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !phoneId:
        seterrorStatu(2);
        seterrorMessage("Telefon Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;

      case !emailId:
        seterrorStatu(6);
        seterrorMessage("Mail Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;

      default:
        postData();
    }
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const [loading, setloading] = useState(false);
  const [storeData, setstoreData] = useState([]);
  useEffect(() => {
    // Örnek API isteği
    apiRequestGet("brand/" + id)
      .then((res) => {
        setloading(true);
        const housingsWithPrefixedID = res.data.data.housings.map(
          (housing) => ({
            ...housing,
            prefixedID: `20000${housing.id}`,
          })
        );
        setstoreData(res.data);
        setHousings(housingsWithPrefixedID);
        setTeamm(res.data.data.child);
        sethousingRecords(housingsWithPrefixedID); // Housings dizisini başlangıçta kopyala
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    ("");
    const filteredData = text
      ? Housings.filter(
          (item) =>
            item.title.toLowerCase().includes(text.toLowerCase()) ||
            item.prefixedID.includes(text) || // prefixedID'yi kontrol et
            item.id.toString().includes(text) // id'yi kontrol et
        )
      : Housings;

    sethousingRecords(filteredData);
  };
  const ApiUrl = "https://private.emlaksepette.com/";
  const handleOpenPhone = () => {
    // Telefon uygulamasını açmak için
    Linking.openURL(`tel:+${storeData.data.phone}`);
  };
  const [formVisible, setFormVisible] = useState("false");

  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchFeaturedProjects = async () => {
    try {
      setFeaturedProjects(data.data.projects);
      setloadingPrjoects(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);

  const SkeletonBox = () => (
    <Animated.View
      style={{
        width: "40%",
        height: 40,
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        margin: 5,
        opacity: 0.5, // Skeleton efektini verecek opaklık değeri
      }}
    />
  );
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://private.emlaksepette.com/`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Link belirli bir aktivitede paylaşıldı");
        } else {
          console.log("Link paylaşıldı");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Paylaşım iptal edildi");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={styles.container}
        onTouchStart={() => {
          Keyboard.dismiss();
          closeSheet();
        }}
      >
        {loading ? (
          <>
            <View
              style={{
                width: "100%",
                height:
                  storeData?.data?.name?.length > 30
                    ? width < 400
                      ? 220
                      : 240
                    : width < 400
                    ? 200
                    : 220,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  backgroundColor: storeData?.data?.banner_hex_code + 94,
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              >
                <View style={styles.InfoContainer}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#ebebeb94",
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderRadius: 5,
                      justifyContent: "center",
                      width: 45,
                      height: 30,
                      alignItems: "center",
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <Arrow
                      name="arrow-back-ios"
                      size={20}
                      style={{ left: 3 }}
                      color={"white"}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.shareIcons} onPress={onShare}>
                    <Icon name="sharealt" size={18} />
                  </TouchableOpacity>
                </View>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                  <View style={{ paddingTop: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",

                        gap: 10,
                      }}
                    >
                      <View style={{ width: 40, height: 40, borderRadius: 20 }}>
                        <Image
                          source={{
                            uri: `${ApiUrl}storage/profile_images/${storeData?.data?.profile_image}`,
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      <View style={{ width: "90%" }}>
                        <Text style={{ fontSize: 17, color: "white" }}>
                          {storeData?.data?.name}
                        </Text>
                        <Text style={{ color: "white", fontSize: 11 }}>
                          {storeData?.data?.activity} Şirketi
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ width: "60%", paddingTop: 10 }}>
                    <TextInput
                      style={{
                        padding: 9,
                        backgroundColor: "#f5f5f53d",
                        borderWidth: 0,
                        borderColor: "#ebebeb",
                        borderRadius: 5,
                      }}
                      value={searchText}
                      onChangeText={handleSearch}
                      placeholder="Ara..."
                      placeholderTextColor={"#333"}
                    />
                  </View>
                </View>
              </View>

              <ImageBackground
                source={require("./profilePhoto.jpg")}
                style={{ width: "100%", height: "100%" }}
                imageStyle={{
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              />
            </View>
          </>
        ) : (
          <>
            <View style={{ width: "100%", height: 220 }}>
              <View
                style={{
                  position: "absolute",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#e7ebee",
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              >
                <View style={styles.InfoContainer}>
                  <Skeleton
                    width={45}
                    height={30}
                    style={{ borderRadius: 5 }}
                    skeletonStyle={{
                      backgroundColor: "#ced4da",
                      borderRadius: 5,
                    }}
                    children={
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#ebebeb94",
                          paddingLeft: 10,
                          paddingRight: 10,
                          borderRadius: 5,
                          justifyContent: "center",
                          width: 45,
                          height: 30,
                          alignItems: "center",
                        }}
                        onPress={() => navigation.goBack()}
                      >
                        <Arrow
                          name="arrow-back-ios"
                          size={20}
                          style={{ left: 3 }}
                          color={"white"}
                        />
                      </TouchableOpacity>
                    }
                  />

                  <Skeleton
                    style={styles.shareIcons}
                    skeletonStyle={{ backgroundColor: "#ced4da" }}
                  />
                  {/* <TouchableOpacity style={styles.shareIcons} onPress={openSheet}>
                <Icon name="sharealt" size={18} />
              </TouchableOpacity> */}
                </View>

                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                  <View style={{ paddingTop: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",

                        gap: 10,
                      }}
                    >
                      <Skeleton
                        width={40}
                        height={40}
                        circle={true}
                        skeletonStyle={{ backgroundColor: "#ced4da" }}
                      />
                      <View>
                        <Skeleton
                          width={100}
                          skeletonStyle={{ backgroundColor: "#ced4da" }}
                          children={
                            <Text
                              style={{ fontSize: 19, color: "white" }}
                              numberOfLines={1}
                            >
                              {storeData?.data?.name}
                            </Text>
                          }
                        />
                        <Skeleton
                          width={45}
                          style={{ top: 5 }}
                          skeletonStyle={{ backgroundColor: "#ced4da" }}
                          children={
                            <Text style={{ color: "white", fontSize: 11 }}>
                              {storeData?.data?.activity} Şirketi
                            </Text>
                          }
                        />
                      </View>
                      <Skeleton
                        width={22}
                        height={22}
                        style={{ bottom: 7 }}
                        circle
                        skeletonStyle={{ backgroundColor: "#ced4da" }}
                      />
                    </View>
                  </View>
                  <Skeleton
                    width={"60%"}
                    height={30}
                    style={{ top: 20 }}
                    skeletonStyle={{ backgroundColor: "#ced4da" }}
                  />
                  {/* <View style={{ width: "60%", paddingTop: 10 }}>
                <TextInput
                  style={{
                    padding: 9,
                    backgroundColor: "#f5f5f53d",
                    borderWidth: 0,
                    borderColor:'#ebebeb',
                    borderRadius: 5,
                  }}
                  placeholder="Ara..."
                  placeholderTextColor={"#333"}
                />
              </View> */}
                </View>
              </View>
            </View>
          </>
        )}

        <View>
          <ScrollView
            horizontal
            style={{ padding: 10 }}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {loading ? (
              <>
                <View style={styles.tabBar}>
                  <TouchableOpacity
                    style={[
                      styles.TabBarBtn,
                      {
                        borderBottomWidth: tab === 0 ? 3 : 0,
                        borderBottomColor:
                          tab === 0 ? "#264ABB" : "transparent",
                        top: 2,
                      },
                    ]}
                    onPress={() => settab(0)}
                  >
                  
                    <Text
                      style={{
                        color: tab === 0 ? "black" : "grey",
                        fontWeight: tab === 0 ? "500" : "normal",
                      }}
                    >
                      Ana Sayfa
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.TabBarBtn,
                      {
                        borderBottomWidth: tab === 4 ? 3 : 0,
                        borderBottomColor:
                          tab === 4 ? "#264ABB" : "transparent",
                        top: 2,
                      },
                    ]}
                    onPress={() => settab(4)}
                  >
                    <Text
                      style={{
                        color: tab === 4 ? "black" : "grey",
                        fontWeight: tab === 4 ? "500" : "normal",
                      }}
                    >
                      Mağaza Profili
                    </Text>
                  </TouchableOpacity>
                  {storeData?.data?.corporate_type !== "Emlak Ofisi" && (
                    <TouchableOpacity
                      style={[
                        styles.TabBarBtn,
                        {
                          borderBottomWidth: tab === 1 ? 3 : 0,
                          borderBottomColor:
                            tab === 1 ? "#264ABB" : "transparent",
                          top: 2,
                        },
                      ]}
                      onPress={() => settab(1)}
                    >
                      <Text
                        style={{
                          color: tab === 1 ? "black" : "grey",
                          fontWeight: tab === 1 ? "500" : "normal",
                          bottom: width > 400 ? 0 : 1,
                        }}
                      >
                        Proje İlanları({storeData?.data?.projects?.length})
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={[
                      styles.TabBarBtn,
                      {
                        borderBottomWidth: tab === 2 ? 3 : 0,
                        borderBottomColor:
                          tab === 2 ? "#264ABB" : "transparent",
                        top: 2,
                      },
                    ]}
                    onPress={() => settab(2)}
                  >
                    <Text
                      style={{
                        color: tab === 2 ? "black" : "grey",
                        fontWeight: tab === 2 ? "500" : "normal",
                      }}
                    >
                      Emlak İlanları({storeData?.data?.housings?.length})
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.TabBarBtn,
                      {
                        borderBottomWidth: tab === 3 ? 3 : 0,
                        borderBottomColor:
                          tab === 3 ? "#264ABB" : "transparent",
                        top: 2,
                      },
                    ]}
                    onPress={() => settab(3)}
                  >
                    
                    <Text
                      style={{
                        color: tab === 3 ? "black" : "grey",
                        fontWeight: tab === 3 ? "500" : "normal",
                      }}
                    >
                      Ekip
                    </Text>
                  </TouchableOpacity>
                
                  <TouchableOpacity
                    style={[
                      styles.TabBarBtn,
                      {
                        borderBottomWidth: tab === 5 ? 3 : 0,
                        borderBottomColor:
                          tab === 5 ? "#264ABB" : "transparent",
                        top: 2,
                      },
                    ]}
                    onPress={() => settab(5)}
                  >
                    <Text
                      style={{
                        color: tab === 5 ? "black" : "grey",
                        fontWeight: tab === 5 ? "500" : "normal",
                      }}
                    >
                     Koleksiyonlar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.TabBarBtn,
                      {
                        borderBottomWidth: tab === 6 ? 3 : 0,
                        borderBottomColor:
                          tab === 6 ? "#264ABB" : "transparent",
                        top: 2,
                      },
                    ]}
                    onPress={() => settab(6)}
                  >
                    <Text
                      style={{
                        color: tab === 6 ? "black" : "grey",
                        fontWeight: tab === 6 ? "500" : "normal",
                      }}
                    >
                     Değerlendirmeler
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.tabBar}>
                  <Skeleton
                    width={150}
                    height={14}
                    skeletonStyle={{ backgroundColor: "#ced4da" }}
                  />
                  <Skeleton
                    width={150}
                    height={14}
                    skeletonStyle={{ backgroundColor: "#ced4da" }}
                  />
                  <Skeleton
                    width={150}
                    height={14}
                    skeletonStyle={{ backgroundColor: "#ced4da" }}
                  />
                  <Skeleton
                    width={150}
                    height={14}
                    skeletonStyle={{ backgroundColor: "#ced4da" }}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </View>
        {tab === 0 && (
          <ShopVitrin
            housingdata={Housings}
            data={storeData}
            loading={loading}
            settab={settab}
          />
        )}
        {tab === 1 && <ProjectAdverts data={storeData} />}
        {tab === 2 && <RealtorAdverts housingdata={housingRecords} />}
        {tab === 3 && <Team teamm={teamm} />}
        {tab === 4 && <ShopInfo data={storeData} loading={loading} />}
        {tab === 5 && <CollectionsOfBrand/>}
        {tab === 6 && <CommentsOfBrands data={storeData}/>}
      </View>

      <View>
        <View
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",

            zIndex: 1,
          }}
        >
          {loading ? (
            <>
              <TouchableOpacity
                style={{
                  width: "40%",
                  backgroundColor: "red",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setloading(true);
                  handleOpenPhone();
                }} // Burada yükleme durumunu göstermek için geçici bir işlem
              >
                <Text
                  style={{
                    padding: 10,
                    color: "white",
                    fontWeight: "500",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Ara
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "40%",
                  backgroundColor: "red",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setloading(true);
                  setFormVisible(true); // veya hangi işlevi çağırmak istiyorsanız
                }} // Burada yükleme durumunu göstermek için geçici bir işlem
              >
                <Text
                  style={{
                    padding: 10,
                    color: "white",
                    fontWeight: "500",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Form Doldur
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <SkeletonBox />
              <SkeletonBox />
            </>
          )}
        </View>
      </View>
      <Modal
        animationType="fade"
        onBackdropPress={() => setFormVisible(false)}
        visible={formVisible}
        onRequestClose={() => {
          setFormVisible(false);
        }}
      >
        <View style={[styless.centeredView, { padding: 0 }]}>
          <View style={[styless.modalView, { height: "90%" }]}>
            <Text style={{ textAlign: "center" }}>
              Bilgilerinizi doldurun, sizi arayalım!
            </Text>
            <View style={{ gap: 7 }}>
              <Text style={styless.label}>Ad Soyad</Text>
              <TextInput
                style={styless.Input}
                value={nameId}
                onChangeText={(value) => setNameId(value)}
              />
              {errorStatu == 1 && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {errorMessage}
                </Text>
              )}
            </View>
            <View style={{ gap: 7 }}>
              <Text style={styless.label}>Telefon Numarası</Text>
              <TextInput
                style={styless.Input}
                value={phoneId}
                onChangeText={(value) => setPhoneId(value)}
              />
              {errorStatu == 2 && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {errorMessage}
                </Text>
              )}
            </View>
            <View style={{ gap: 7 }}>
              <Text style={styless.label}>E-Posta</Text>
              <TextInput
                style={styless.Input}
                value={emailId}
                onChangeText={(value) => setEmailId(value)}
              />
              {errorStatu == 6 && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {errorMessage}
                </Text>
              )}
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#28A745",
                  width: "40%",
                  padding: 15,
                  borderRadius: 5,
                  backgroundColor: checked ? "#28A745" : "#D3D3D3",
                }}
                disabled={!checked}
                onPress={GiveOffer}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Gönder
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#DC3545",
                  width: "40%",
                  padding: 15,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setFormVisible(false);
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Kapat
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <CheckBox
                checked={checked}
                onPress={toggleCheckbox}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="red"
                containerStyle={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
                title={
                  <Text>
                    “Gönder” butonuna tıkladığınızda ad, soyad, e-posta ve mobil
                    telefon numarası bilgileriniz onayınızın ardından
                    tarafınızla iletişim kurulması amacıyla müteahhit firmaya
                    iletilecektir. Veri sorumlusu sıfatıyla tüm yükümlülük ve
                    sorumluluk müteahhit firmaya ait olacaktır. Kişisel
                    verilerinizin korunması hakkında detaylı bilgi için buraya
                    Tıklayabilirsiniz.
                  </Text>
                }
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerProfile: {
    width: "100%",
    height: width > 400 ? 220 : 170,

    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  tabBar: {
    padding: 3,
    // height:width>400? '90%':'60%',
    // height:height>300?'90%':'70%',

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 30,
    borderBottomWidth: 1,
    borderColor: "#ebebeb",
    top: 5,

    paddingRight: 25,
  },

  TabBarBtn: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,

    padding: 4,
  },
  ProfileImageAndIcon: {
    gap: 10,
    right: 40,
  },
  shareIcons: {
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    width: 40,
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    bottom: 2,
  },
  InfoContainer: {
    paddingTop: width < 400 ? 30 : 50,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const styless = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: 25,
      },
    }),
  },
  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
  pagination: {
    position: "absolute",
    zIndex: 1,
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    bottom: 0,
    alignItems: "center",

    width: "100%",
  },
  ıconContainer: {
    width: 50,
    height: 150,
    backgroundColor: "transparent",
    position: "absolute",
    right: 7,
    top: 42,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
    zIndex: 1,
  },
  ıcon: {
    backgroundColor: "#FFFFFFAD",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  centeredView: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // modal dışı koyu arkaplan
  },
  modalView: {
    width: "100%",

    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#1414148c",
  },
  modalContent2: {
    backgroundColor: "#fefefe",

    height: "52%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal3: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#1414148c",
  },
  modalContent3: {
    backgroundColor: "#fefefe",

    height: "100%",
  },
  Input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ebebeb",
  },
  label: {
    color: "grey",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalImage: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContentImage: {
    backgroundColor: "black",
    justifyContent: "center",

    flex: 1,
  },
  Input: {
    backgroundColor: "#E6E6E6",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    fontSize: 14,
  },
  modal4: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 5,
  },
});
