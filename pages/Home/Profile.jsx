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
import {
  apiRequestGet,
  apiUrl,
  frontEndUriBase,
} from "../../components/methods/apiRequest";
import Modal from "react-native-modal";
import { CheckBox } from "@rneui/themed";
import { Platform } from "react-native";
import axios from "axios";
import { getValueFor } from "../../components/methods/user";
// import CollectionsOfBrand from "./ProfilePageItem/CollectionsOfBrand";
import CommentsOfBrands from "./ProfilePageItem/CommentsOfBrands";
import SellPlacesForBrands from "./ProfilePageItem/SellPlaceForBrand";
import { ActivityIndicator } from "react-native-paper";
import Introduction from "./ProfilePageItem/Introduction/Introduction";
import Filter from "../../assets/filter.png";

import BecomeConsultant from "./ProfilePageItem/BecomeConsultant/BecomeConsultant";
import FranchiseForm from "../../components/BottomModals/FranchiseForm/FranchiseForm";
import { BecomingFranchise } from "./ProfilePageItem/BecomingFranchise/BecomingFranchise";
import {
  BuilderOffice,
  FranchiseTab,
  RealEstateOfficeTab,
  TourismAcent,
  Uretici,
} from "../helper";

export default function Profile() {
  const route = useRoute();
  const { id } = route.params;
  const [tab, settab] = useState(0);
  const { width } = Dimensions.get("window");
  const translateY = useRef(new Animated.Value(400)).current;
  const navigation = useNavigation();
  const [nameId, setNameId] = useState("");
  const [phoneId, setPhoneId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [errorStatu, seterrorStatu] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");
  const [user, setUser] = useState({});
  const [teamm, setTeamm] = useState([]);
  const [openProjectFilter, setOpenProjectFilter] = useState(false);
  const [openEstateFilter, setOpenEstateFilter] = useState(false);
  const [loading, setloading] = useState(false);
  const [storeData, setstoreData] = useState([]);
  const [loadingShopping, setloadingShopping] = useState(false);
  const [formVisible, setFormVisible] = useState("false");
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const scrollViewRef = useRef(null); // ScrollView için ref
  const [tabWidth, setTabWidth] = useState(0);
  const [checkImage, setCheckImage] = useState(null);
  const [color, setColor] = useState("#000000");
  const [corporateType, setCorporateType] = useState(null);

  const userID = user?.id;
  const storeID = storeData?.data?.id;

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
        apiUrl + "institutional/give_offer",
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
    const fetchData = async () => {
      try {
        setloadingShopping(true);
        const res = await apiRequestGet("brand/" + id);

        setstoreData(res.data);
        setTeamm(res.data.data.child);
        setCorporateType(res.data.data.corporate_type);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setloadingShopping(false);
      }
    };

    fetchData();
  }, [id]);

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
        message: frontEndUriBase,
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

  const controlColor = () => {
    const dataColor = storeData?.data?.banner_hex_code;
    if (!dataColor) return;
    const isBlackOrShadesOfBlack = (color) => {
      if (color === "#000000") return true;
      const hexColor = parseInt(color.replace("#", ""), 16);
      return hexColor >= 0x000000 && hexColor <= 0x111111; // Bu aralıkta ise beyaz yap
    };

    if (isBlackOrShadesOfBlack(dataColor)) {
      setColor("#fff");
    }
  };

  useEffect(() => {
    controlColor();
  }, [storeData]);

  useEffect(() => {
    if (storeData) {
      if (
        storeData?.data?.profile_image === "indir.jpeg" ||
        storeData?.data?.profile_image === "indir.jpg"
      ) {
        const fullName = storeData?.data?.name.split(" ");
        let checkImage = "";

        if (fullName.length > 1) {
          // İsim ve soyisim varsa, her iki kelimenin ilk harfini al
          const name = fullName[0].charAt(0).toUpperCase();
          const surname = fullName[1].charAt(0).toUpperCase();
          checkImage = name + surname;
        } else {
          // Sadece tek isim varsa ilk iki harfi al
          checkImage = fullName[0].slice(0, 2).toUpperCase();
        }

        setCheckImage(checkImage);
      } else {
        setCheckImage(null);
      }
    }
  }, [storeData]);

  const renderFranchiseTab = () => {
    return (
      <ScrollView
        ref={scrollViewRef} // Ref ekleniyor
        onLayout={() => {
          // Calculate the width of each tab dynamically
          if (FranchiseTab.length > 0) {
            const tabWidth = width / FranchiseTab.length;
            setTabWidth(tabWidth);
          }
        }}
        horizontal
        style={{
          paddingTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 5,
        }}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ gap: 5 }}
      >
        {FranchiseTab.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.TabBarBtn,
              {
                borderBottomWidth: tab === index ? 3 : 0,
                borderBottomColor: tab === index ? "#EA2C2E" : "transparent",
                top: 2,
              },
            ]}
            onPress={() => settab(index)}
          >
            <Text
              style={{
                color: tab === index ? "#EA2C2E" : "grey",
                fontWeight: tab === index ? "500" : "normal",
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const renderRealEstateOfficeTab = () => {
    return (
      <ScrollView
        ref={scrollViewRef} // Ref ekleniyor
        onLayout={() => {
          // Calculate the width of each tab dynamically
          if (RealEstateOfficeTab.length > 0) {
            const tabWidth = width / RealEstateOfficeTab.length;
            setTabWidth(tabWidth);
          }
        }}
        horizontal
        style={{
          paddingTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 5,
        }}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ gap: 5 }}
      >
        {RealEstateOfficeTab.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.TabBarBtn,
              {
                borderBottomWidth: tab === index ? 3 : 0,
                borderBottomColor: tab === index ? "#EA2C2E" : "transparent",
                top: 2,
              },
            ]}
            onPress={() => settab(index)}
          >
            <Text
              style={{
                color: tab === index ? "#EA2C2E" : "grey",
                fontWeight: tab === index ? "500" : "normal",
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const renderBuilderOfficeTab = () => {
    return (
      <ScrollView
        ref={scrollViewRef} // Ref ekleniyor
        onLayout={() => {
          // Calculate the width of each tab dynamically
          if (BuilderOffice.length > 0) {
            const tabWidth = width / BuilderOffice.length;
            setTabWidth(tabWidth);
          }
        }}
        horizontal
        style={{
          paddingTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 5,
        }}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ gap: 5 }}
      >
        {BuilderOffice.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.TabBarBtn,
              {
                borderBottomWidth: tab === index ? 3 : 0,
                borderBottomColor: tab === index ? "#EA2C2E" : "transparent",
                top: 2,
              },
            ]}
            onPress={() => settab(index)}
          >
            <Text
              style={{
                color: tab === index ? "#EA2C2E" : "grey",
                fontWeight: tab === index ? "500" : "normal",
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const renderUretici = () => {
    return (
      <ScrollView
        ref={scrollViewRef} // Ref ekleniyor
        onLayout={() => {
          // Calculate the width of each tab dynamically
          if (Uretici.length > 0) {
            const tabWidth = width / Uretici.length;
            setTabWidth(tabWidth);
          }
        }}
        horizontal
        style={{
          paddingTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 5,
        }}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ gap: 5 }}
      >
        {Uretici.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.TabBarBtn,
              {
                borderBottomWidth: tab === index ? 3 : 0,
                borderBottomColor: tab === index ? "#EA2C2E" : "transparent",
                top: 2,
              },
            ]}
            onPress={() => settab(index)}
          >
            <Text
              style={{
                color: tab === index ? "#EA2C2E" : "grey",
                fontWeight: tab === index ? "500" : "normal",
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const renderTourismOfficeTab = () => {
    return (
      <ScrollView
        ref={scrollViewRef} // Ref ekleniyor
        onLayout={() => {
          // Calculate the width of each tab dynamically
          if (TourismAcent.length > 0) {
            const tabWidth = width / TourismAcent.length;
            setTabWidth(tabWidth);
          }
        }}
        horizontal
        style={{
          paddingTop: 5,
          marginBottom: 5,
          marginLeft: 5,
          marginRight: 5,
        }}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ gap: 5 }}
      >
        {TourismAcent.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.TabBarBtn,
              {
                borderBottomWidth: tab === index ? 3 : 0,
                borderBottomColor: tab === index ? "#EA2C2E" : "transparent",
                top: 2,
              },
            ]}
            onPress={() => settab(index)}
          >
            <Text
              style={{
                color: tab === index ? "#EA2C2E" : "grey",
                fontWeight: tab === index ? "500" : "normal",
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  const renderFranchiseTabPages = () => {
    return (
      <>
        {tab === 0 && <Introduction id={id} setTab={settab} />}
        {tab === 1 && (
          <RealtorAdverts
            storeID={storeID}
            openEstateFilter={openEstateFilter}
            setOpenEstateFilter={setOpenEstateFilter}
          />
        )}
        {tab === 2 && <Text>Ofislermizi</Text>}
        {tab === 3 && <Team team={teamm} type={corporateType} />}
        {tab === 4 && <Team team={teamm} type={corporateType} />}
        {tab === 5 && <Text>Birincilikler</Text>}
      </>
    );
  };
  const renderRealtorTabPages = () => {
    return (
      <>
        {tab === 0 && (
          <RealtorAdverts
            storeID={storeID}
            openEstateFilter={openEstateFilter}
            setOpenEstateFilter={setOpenEstateFilter}
          />
        )}
        {tab === 1 && <Introduction id={id} setTab={settab} />}

        {tab === 2 && <ShopInfo data={storeData} loading={loading} />}
        {tab === 3 && <CommentsOfBrands id={id} />}
        {tab === 4 && <Team team={teamm} type={corporateType} />}
      </>
    );
  };
  const renderTourismTabPages = () => {
    return (
      <>
        {tab === 0 && (
          <RealtorAdverts
            storeID={storeID}
            openEstateFilter={openEstateFilter}
            setOpenEstateFilter={setOpenEstateFilter}
          />
        )}
        {tab === 1 && <Introduction id={id} setTab={settab} />}

        {tab === 2 && <ShopInfo data={storeData} loading={loading} />}
        {tab === 3 && <CommentsOfBrands id={id} />}
        {tab === 4 && <Team team={teamm} type={corporateType} />}
      </>
    );
  };
  const renderBuilderPages = () => {
    return (
      <>
        {tab === 0 && (
          <ProjectAdverts
            // data={projectData}
            isVisible={openProjectFilter}
            setIsVisible={setOpenProjectFilter}
            id={id}
          />
        )}
        {tab === 1 && (
          <RealtorAdverts
            storeID={storeID}
            openEstateFilter={openEstateFilter}
            setOpenEstateFilter={setOpenEstateFilter}
          />
        )}
        {tab === 2 && <Introduction id={id} setTab={settab} />}
        {tab === 3 && <SellPlacesForBrands data={storeData} />}
        {tab === 4 && <ShopInfo data={storeData} loading={loading} />}

        {tab === 5 && <CommentsOfBrands id={id} />}
        {tab === 6 && <Team team={teamm} type={corporateType} />}
      </>
    );
  };
  const renderUreticiPages = () => {
    return (
      <>
        {tab === 0 && (
          <RealtorAdverts
            storeID={storeID}
            openEstateFilter={openEstateFilter}
            setOpenEstateFilter={setOpenEstateFilter}
          />
        )}
        {tab === 1 && <Introduction id={id} setTab={settab} />}

        {tab === 2 && <ShopInfo data={storeData} loading={loading} />}

        {tab === 3 && <CommentsOfBrands id={id} />}
        {tab === 4 && <Team team={teamm} type={corporateType} />}
      </>
    );
  };
  const rendertab = () => {
    switch (true) {
      case corporateType === "Emlak Ofisi" && storeData?.data?.is_brand == 1:
        return renderFranchiseTab();

      case corporateType === "Emlak Ofisi" && storeData?.data?.is_brand !== 1:
        return renderRealEstateOfficeTab();
      case corporateType === "İnşaat Ofisi":
        return renderBuilderOfficeTab();
      case corporateType === "Üretici":
        return renderUretici();
      case corporateType === "Turizm Amaçlı Kiralama":
        return renderTourismOfficeTab();
      default:
        break;
    }
  };
  const renderPages = () => {
    switch (true) {
      case corporateType === "Emlak Ofisi" && storeData?.data?.is_brand == 1:
        return renderFranchiseTabPages();

      case corporateType === "Emlak Ofisi" && storeData?.data?.is_brand !== 1:
        return renderRealtorTabPages();
      case corporateType === "İnşaat Ofisi":
        return renderBuilderPages();
      case corporateType === "Üretici":
        return renderUreticiPages();
      case corporateType === "Turizm Amaçlı Kiralama":
        return renderTourismTabPages();
      default:
        break;
    }
  };

  /**
   * Dynamically handles filter actions based on the current `corporateType` and `tab`.
   *
   * The function maps combinations of `corporateType` and `tab` to specific actions
   * (e.g., opening a project filter or estate filter) and executes the corresponding action.
   * Logs a warning if no action is defined for the given combination.
   *
   * @constant {Object} filterActions - Maps `corporateType-tab` combinations to filter actions.
   * @function handlerFilterAction
   *
   * @example
   * handlerFilterAction(); // Executes the appropriate filter action or logs a warning.
   */
  const filterActions = {
    "İnşaat Ofisi-0": () => setOpenProjectFilter(true), // Tab 0 - ProjectAdverts
    "İnşaat Ofisi-1": () => setOpenEstateFilter(true), // Tab 1 - RealtorAdverts
    "Emlak Ofisi-0": () => setOpenEstateFilter(true), // Emlak Ofisi için
    "Üretici-0": () => setOpenEstateFilter(true), // Üretici için
    "Turizm Amaçlı Kiralama-0": () => setOpenEstateFilter(true), // Turizm Amaçlı Kiral
  };

  const handlerFilterAction = () => {
    const actionKey = `${corporateType}-${tab}`;
    if (filterActions[actionKey]) {
      filterActions[actionKey]();
    } else {
      console.warn(`"${actionKey}" için bir filtre işlemi tanımlı değil.`);
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
            <View
              style={[
                {
                  backgroundColor: storeData?.data?.banner_hex_code,
                  ...(Platform.OS == "ios" && { paddingTop: 50 }),
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
                      width: 64,
                      height: 64,
                    }}
                  >
                    {checkImage ? (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                          borderRadius: 50,
                          backgroundColor: "#C9C9C9",
                          opacity: 0.7,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 24,
                            color: "#FFF",
                            fontWeight: "900",
                            textAlign: "center",
                            textAlignVertical: "center",
                            justifyContent: "center",
                          }}
                        >
                          {checkImage}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          borderRadius: 50,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{
                            uri: `${frontEndUriBase}storage/profile_images/${storeData?.data?.profile_image}`,
                          }}
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 50,
                          }}
                        />
                      </View>
                    )}
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
                            color: color ? color : "#000000",
                            fontWeight: "700",
                          }}
                        >
                          {storeData?.data?.name}
                        </Text>
                        <Star name="verified" size={19} color={"#0275FF"} />
                      </View>

                      <Text
                        style={{
                          fontSize: 12,
                          color: color ? color : "#000000",
                        }}
                      >
                        {storeData?.data?.corporate_type}{" "}
                        {storeData?.data?.is_brand == 1 &&
                          storeData?.data?.brand_id && (
                            <Text>- Franchise Markası</Text>
                          )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>{rendertab()}</View>

            <View
              style={{ flex: 1, paddingBottom: userID != storeID ? 20 : 0 }}
            >
              {renderPages()}
            </View>
          </View>

          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent:
                  userID !== storeID ? "space-around" : "flex-start",
                padding: 10,
                position: "absolute",
                bottom: 0,
                paddingBottom: Platform.OS === "ios" ? 40 : 12,
                width: "100%",
                height: "auto",
              }}
            >
              {((corporateType == "İnşaat Ofisi" && (tab == 0 || tab == 1)) ||
                (corporateType == "Emlak Ofisi" && tab == 0) ||
                (corporateType == "Turizm Amaçlı Kiralama" && tab == 0) ||
                (corporateType == "Üretici" && tab == 0)) && (
                <TouchableOpacity
                  onPress={handlerFilterAction}
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
              {corporateType == "Emlak Ofisi" &&
              storeData?.data?.is_brand == 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    settab(8);
                  }}
                  style={{
                    backgroundColor: "#ffffff",
                    width: "45%",
                    padding: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#EB2B2E",
                    backgroundColor: "#EA2B2E",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#FFF",
                      fontWeight: "700",
                    }}
                  >
                    Danışman Ol
                  </Text>
                </TouchableOpacity>
              ) : userID !== storeID ? (
                // Eğer userID ve storeID eşit değilse "Ara" butonu gösterilecek
                <TouchableOpacity
                  onPress={() => handleOpenPhone()}
                  style={{
                    backgroundColor: "#ffffff",
                    width: "45%",
                    padding: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#EB2B2E",
                    backgroundColor: "#EA2B2E",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#FFF",
                      fontWeight: "700",
                    }}
                  >
                    Ara
                  </Text>
                </TouchableOpacity>
              ) : null}
              {corporateType == "Emlak Ofisi" &&
              storeData?.data?.is_brand == 1 ? (
                <TouchableOpacity
                  style={{
                    width: "45%",
                    backgroundColor: "#EA2C2E",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    settab(7);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "700",

                      textAlign: "center",
                    }}
                  >
                    Franchise Ol
                  </Text>
                </TouchableOpacity>
              ) : userID !== storeID ? (
                <TouchableOpacity
                  style={{
                    width: "45%",
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
                      color: "white",
                      fontWeight: "700",

                      textAlign: "center",
                    }}
                  >
                    Hemen Başvur
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </>
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
    height: width > 350 ? 170 : 120,
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
