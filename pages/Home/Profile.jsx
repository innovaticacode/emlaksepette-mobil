import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
  Animated,
  Linking,
  Share,
} from "react-native";
import { React, useState, useRef, useEffect } from "react";
import ShopInfo from "./ProfilePageItem/ShopInfo";
import ProjectAdverts from "./ProfilePageItem/ProjectAdverts";
import RealtorAdverts from "./ProfilePageItem/RealtorAdverts";
import LinkIcon3 from "react-native-vector-icons/Feather";
import LinkIcon from "react-native-vector-icons/SimpleLineIcons";
import Star from "react-native-vector-icons/MaterialIcons";
import Team from "./ProfilePageItem/Team";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiRequestGet } from "../../components/methods/apiRequest";
import Modal from "react-native-modal";
import { CheckBox } from "@rneui/themed";
import { Platform } from "react-native";
import axios from "axios";
import { getValueFor } from "../../components/methods/user";
import CollectionsOfBrand from "./ProfilePageItem/CollectionsOfBrand";
import CommentsOfBrands from "./ProfilePageItem/CommentsOfBrands";
import SellPlacesForBrands from "./ProfilePageItem/SellPlaceForBrand";
import { ActivityIndicator } from "react-native-paper";
import Introduction from "./ProfilePageItem/Introduction/Introduction";
import Filter from "../../assets/filter.png";
import ProjectBottomSheetFilter from "../../components/ProjectBottomSheetFilter";
import EstateBottomSheetFilter from "../../components/EstateBottomSheetFilter";

const ApiUrl = "https://private.emlaksepette.com/";
export default function Profile() {
  const route = useRoute();
  const [Housings, setHousings] = useState([]);
  const { name, id } = route.params;
  const [tab, settab] = useState(0);
  const { width, height, fontScale } = Dimensions.get("window");
  const translateY = useRef(new Animated.Value(400)).current;
  const navigation = useNavigation();
  const [nameId, setNameId] = useState("");
  const [phoneId, setPhoneId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [errorStatu, seterrorStatu] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");
  const [user, setUser] = useState({});
  const [teamm, setTeamm] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [housingRecords, sethousingRecords] = useState([]);
  const [openProjectFilter, setOpenProjectFilter] = useState(false);
  const [openEstateFilter, setOpenEstateFilter] = useState(false);
  const [newCollectionNameCreate, setnewCollectionNameCreate] = useState("");
  const [loading, setloading] = useState(false);
  const [storeData, setstoreData] = useState([]);
  const [loadingShopping, setloadingShopping] = useState(false);
  const [formVisible, setFormVisible] = useState("false");
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const scrollViewRef = useRef(null); // ScrollView için ref
  const [tabWidth, setTabWidth] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [items, setItems] = useState([
    {
      text: "Tanıtım",
      isShow: "All",
    },
    {
      text: "Emlak İlanları",
      isShow: "All",
    },
    {
      text: "Proje İlanları",
      isShow: "All",
    },
    {
      text: "Satış Noktalarımız",
      isShow: "All",
    },
    {
      text: "Mağaza Profili",
      isShow: "All",
    },
    {
      text: "Değerlendirmeler",
      isShow: "All",
    },
    {
      text: "Ekip",
    },
  ]);

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

  useEffect(() => {
    // Örnek API isteği
    setloadingShopping(true);
    apiRequestGet("brand/" + id)
      .then((res) => {
        const housingsWithPrefixedID = res.data.data.housings.map(
          (housing) => ({
            ...housing,
            prefixedID: `20000${housing.id}`,
          })
        );
        setstoreData(res.data);
        setProjectData(res.data.data.projects);
        setHousings(housingsWithPrefixedID);
        setTeamm(res.data.data.child);
        sethousingRecords(housingsWithPrefixedID); // Housings dizisini başlangıçta kopyala
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setloadingShopping(false);
      });
  }, [id]);

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
  const handleOpenPhone = () => {
    Linking.openURL(`tel:${storeData.data.phone}`);
  };

  const fetchFeaturedProjects = async () => {
    try {
      setFeaturedProjects(data.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

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

  // Scroll width değerini al

  useEffect(() => {
    if (scrollViewRef.current && tabWidth > 0) {
      const tabCount = items.length;
      const viewWidth = width;
      const tabOffset = tab * tabWidth;
      const contentWidth = tabWidth * tabCount;
      const centeredOffset = Math.max(
        0,
        Math.min(
          tabOffset - (viewWidth / 2 - tabWidth / 2),
          contentWidth - viewWidth
        )
      );

      scrollViewRef.current.scrollTo({
        x: centeredOffset,
        animated: true,
      });
    }
  }, [tab, items, tabWidth]);

  // Calculate the width of each tab after layout
  const onTabLayout = (event) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    setTabWidth(measuredWidth);
  };

  const onFilterChange = async (filter) => {
    const uri = `${ApiUrl}api/get_institutional_projects_by_housing_type/${id}`;

    const params = {
      housing_type: filter,
      skip: 0,
      take: 10,
    };
    try {
      setloading(true);
      const response = await axios.get(uri, {
        headers: { Authorization: `Bearer ${user.access_token}` },
        params: params,
      });
      setProjectData(response.data);
      console.debug(
        "Filtreleme başarılı: aloooooooooooo>>>>>>>>>>>>>>>>>>>>>>>>> ",
        projectData
      );
      console.debug("Filtreleme başarılı: ", response.data);
      return setloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      return setloading(false);
    }
  };

  return (
    <>
      {loadingShopping ? (
        <View style={styles.loadCont}>
          <ActivityIndicator color={"#333"} size={"large"} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <>
              <ProjectBottomSheetFilter
                isVisible={openProjectFilter}
                setIsVisible={setOpenProjectFilter}
                onFilterChange={onFilterChange}
              />
              <EstateBottomSheetFilter
                isVisible={openEstateFilter}
                setIsVisible={setOpenEstateFilter}
              />
            </>
            <View
              style={[
                {
                  backgroundColor: storeData?.data?.banner_hex_code,
                },
                styles.headerBg,
              ]}
            >
              <View style={styles.headBtn}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                  }}
                >
                  <LinkIcon name="arrow-left" size={20} color={"#000000"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onShare}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                  }}
                >
                  <LinkIcon3 name="share-2" size={20} color={"#000000"} />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", paddingTop: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    width: "80%",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 50,
                    }}
                  >
                    <Image
                      source={{
                        uri: `https://private.emlaksepette.com/storage/profile_images/${storeData?.data?.profile_image}`,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}
                    />
                  </View>
                  <View>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#000000",
                            fontWeight: "700",
                          }}
                        >
                          {storeData?.data?.name}
                        </Text>
                        <Star name="verified" size={19} color={"#0275FF"} />
                      </View>

                      <Text style={{ fontSize: 12, color: "#000000" }}>
                        {storeData?.data?.corporate_type}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <ScrollView
                ref={scrollViewRef} // Ref ekleniyor
                onLayout={() => {
                  // Calculate the width of each tab dynamically
                  if (items.length > 0) {
                    const tabWidth = width / items.length;
                    setTabWidth(tabWidth);
                  }
                }}
                horizontal
                style={{ paddingTop: 10, marginBottom: 10 }}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D7D7D7",
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                >
                  {items.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.TabBarBtn,
                        {
                          borderBottomWidth: tab === index ? 3 : 0,
                          borderBottomColor:
                            tab === index ? "#EA2C2E" : "transparent",
                          top: 2,
                        },
                      ]}
                      onPress={() => settab(index)}
                      onLayout={onTabLayout}
                    >
                      <Text
                        style={{
                          color: tab === index ? "#EA2C2E" : "grey",
                          fontWeight: tab === index ? "500" : "normal",
                        }}
                      >
                        {item.text == "Satış Noktalarımız" &&
                        (storeData?.data?.corporate_type == "Emlak Ofisi" ||
                          storeData?.data?.type == 1)
                          ? "Koleksiyonlar"
                          : item.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={{ flex: 1, paddingBottom: height * 0.1 }}>
              {tab === 0 && <Introduction id={id} setTab={settab} />}
              {tab === 1 && <RealtorAdverts housingdata={housingRecords} />}
              {tab === 2 && <ProjectAdverts data={projectData} />}
              {tab === 3 && <ShopInfo data={storeData} loading={loading} />}
              {tab === 4 &&
                (storeData?.data?.corporate_type !== "Emlak Ofisi" &&
                storeData.data.type === 2 ? (
                  <SellPlacesForBrands data={storeData} />
                ) : (
                  <CollectionsOfBrand data={storeData} />
                ))}
              {tab === 5 && <CommentsOfBrands data={storeData} />}
              {tab === 6 && <Team teamm={teamm} />}
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                padding: 10,
                position: "absolute",
                bottom: 0,
                width: "100%",
              }}
            >
              {(tab == 1 || tab == 2) && (
                <TouchableOpacity
                  onPress={() =>
                    tab == 2
                      ? setOpenProjectFilter(true)
                      : setOpenEstateFilter(true)
                  }
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#EA2B2E",
                    backgroundColor: "#ffffff",
                    padding: 10,
                    borderRadius: 4,
                  }}
                >
                  <Image source={Filter} style={{ width: 16, height: 16 }} />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => handleOpenPhone()}
                style={{
                  backgroundColor: "#ffffff",
                  width: "45%",
                  padding: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#EB2B2E",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#EB2B2E",
                    fontWeight: "700",
                  }}
                >
                  Ara
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "40%",
                  backgroundColor: "#EA2C2E",
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
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  Hemen Başvur
                </Text>
              </TouchableOpacity>
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
            <View style={[styless.centeredView, { width: "100%" }]}>
              <View
                style={[
                  styless.modalView,
                  {
                    height: width > 400 ? "60%" : "80%",
                  },
                ]}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                  }}
                >
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
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: 12,
                    }}
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
                        <View
                          style={{
                            width: "90%",
                            height: "100%",
                          }}
                        >
                          <Text>
                            “Gönder” butonuna tıkladığınızda ad, soyad, e-posta
                            ve mobil telefon numarası bilgileriniz onayınızın
                            ardından tarafınızla iletişim kurulması amacıyla
                            müteahhit firmaya iletilecektir. Veri sorumlusu
                            sıfatıyla tüm yükümlülük ve sorumluluk müteahhit
                            firmaya ait olacaktır. Kişisel verilerinizin
                            korunması hakkında detaylı bilgi için buraya
                            Tıklayabilirsiniz.
                          </Text>
                        </View>
                      }
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadCont: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerBg: {
    width: "100%",
    height: width > 400 ? 220 : 170,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerProfile: {
    width: "100%",
    height: width > 400 ? 220 : 170,

    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headBtn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 36 : 0,
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
  loadConta: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
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
