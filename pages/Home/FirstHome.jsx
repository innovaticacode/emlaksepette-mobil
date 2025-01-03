import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Alert,
} from "react-native";
import axios from "axios";
import PagerView from "react-native-pager-view";
import ProjectPost from "../../components/ProjectPost";
import SliderBar from "../../components/SliderBar";
import { getValueFor } from "../../components/methods/user";
import { useNavigation } from "@react-navigation/native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";
import ProjectButton from "../../components/ProjectButton";
import FranchiseBanner from "../../components/FranchiseBanner";

import SliderTourismRent from "./SliderTourismRent";
import {
  apiRequestPostWithBearer,
  apiUrl,
  frontEndUriBase,
} from "../../components/methods/apiRequest";
import Arrow from "react-native-vector-icons/SimpleLineIcons";
import SliderBarForFeature from "../../components/SliderBarForFeature";
import RealtorCardHome from "../../components/Card/RealtorCardHomePage/RealtorCardHome";

import { UsePaginatedData } from "../../hooks";
import { setBasketItem } from "../../store/slices/Basket/BasketSlice";
import { useDispatch } from "react-redux";
import { registerForPushNotificationsAsync } from "../../services/registerForPushNotificationsAsync";

const FirstHome = (props) => {
  const { index } = props;
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingBrands, setloadingBrands] = useState(false);
  const [franchise, setFranchise] = useState([]);
  const [featuredSliders, setFeaturedSliders] = useState([]);
  const [loadingSliders, setLoadingSliders] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerViewRef = useRef(null);
  const [sellAdvert, setSellAdvert] = useState([]);
  const [dailyRental, setDailyRental] = useState([]);
  const [rentAdvert, setrentAdvert] = useState([]);
  const [sellDevren, setsellDevren] = useState([]);
  const [popularConstructionBrands, setPopularConstructionBrands] = useState(
    []
  );
  const [creatorBrands, setcreatorBrands] = useState([]);
  const [Bungalov, setBungalov] = useState([]);
  const [token, setToken] = useState("");
  const [verifyAlert, setVerifyAlert] = useState(false);

  useEffect(() => {
    if (user?.approve_website_approve == 1) {
      return;
    }
    setTimeout(() => {
      if (
        user?.access_token &&
        user?.type == 2 &&
        user?.corporate_account_status === 0
      ) {
        return setVerifyAlert(true);
      }
    }, 1000);
  }, [user]);

  useEffect(() => {
    async function setupNotifications() {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          setToken(token);
          console.log("Expo Push Token:", token);

          // Kullanıcının push_token'ı yoksa API'ye gönder
          if (!user?.push_token) {
            await apiRequestPostWithBearer("set_token", { token });
          } else {
            console.log(user?.push_token, "Token zaten var.");
          }
        } else {
          console.log("Token alınamadı veya izin verilmedi.");
        }
      } catch (error) {
        console.error("Bildirim ayarlanırken hata oluştu:", error);
      }
    }

    setupNotifications(); // Fonksiyonu çağır
  }, []);

  // Fetch featured sliders
  const fetchFeaturedSliders = async () => {
    setLoadingSliders(true);
    try {
      const response = await axios.get(`${apiUrl}featured-sliders`);
      setFeaturedSliders(response.data);
    } catch (error) {
    } finally {
      return setLoadingSliders(false);
    }
  };

  // Fetch featured projects
  const fetchFeaturedProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await axios.get(`${apiUrl}featured-projects`, {
        params: { take: 6, skip: 0 },
      });
      return setFeaturedProjects(response.data);
    } catch (error) {
      console.log("Error fetching featured projects:", error);
    } finally {
      return setLoadingProjects(false);
    }
  };

  const fetchFranchiseBrands = async () => {
    setloadingBrands(true);
    try {
      const response = await axios.get(`${apiUrl}franchise-markalari`);
      setFranchise(response.data.data);
    } catch (error) {
      console.log("Error fetching franchise brands:", error);
    } finally {
      setloadingBrands(false);
    }
  };

  const fetchPopularConstructionBrands = async () => {
    try {
      const response = await axios.get(`${apiUrl}popular-construction-brands`);
      // console.log("Popular Construction Brands: ", response.data);
      if (response.data.length > 0) {
        setPopularConstructionBrands(response.data);
      }
    } catch (error) {
      console.log("Error fetching popular construction brands:", error);
    }
  };
  const fetchPopularCreatorBrands = async () => {
    try {
      const response = await axios.get(`${apiUrl}markalar/uretici`);
      // console.log("Popular Construction Brands: ", response.data);
      if (response?.data?.data?.markalar.length > 0) {
        setcreatorBrands(response?.data?.data?.markalar);
      }
    } catch (error) {
      console.log("Error fetching uretici:", error);
    }
  };
  useEffect(() => {
    if (index == 0) {
      fetchFeaturedProjects();
      fetchFranchiseBrands();
      fetchPopularConstructionBrands();
      fetchPopularCreatorBrands();
    }
  }, [index]);

  useEffect(() => {
    fetchFeaturedSliders();
  }, []);

  const dispatch = useDispatch();

  const fetchBasket = async () => {
    try {
      const response = await axios.get(`${apiUrl}institutional/my-cart`, {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });

      dispatch(
        setBasketItem({
          basketItem: response?.data?.cart?.item,
        })
      );
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      fetchBasket();
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      pagerViewRef.current?.setPage(
        currentPage === featuredSliders.length - 1 ? 0 : currentPage + 1
      );
      setCurrentPage((prevPage) =>
        prevPage === featuredSliders.length - 1 ? 0 : prevPage + 1
      );
    }, 10000);

    return () => clearInterval(interval); // Clean up the interval when unmounted
  }, [currentPage, featuredSliders.length]);

  // State for user

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const navigateToProjects = (title, optional, type) => {
    navigation.navigate("AllProject", {
      name: "Tüm Projeler",
      slug: "tum-projeler",
      data: featuredProjects,
      count: featuredProjects.length,
      title: title,
      optional: optional,
      type: type,
      check: null,
      city: null,
      county: null,
      hood: null,
    });
  };
  const navigateToAllProjects = () => navigateToProjects(null, null, null);
  const navigateToVillaProjects = () =>
    navigateToProjects("konut", "satilik", "villa");
  const navigateToHousingProjects = () => navigateToProjects(null);
  const navigateToShopProject = () =>
    navigateToProjects("is-yeri", "satilik", null);
  const navigateToRealtorAdverts = (checkValue, name, slug, optional, type) => {
    navigation.navigate("AllRealtorAdverts", {
      name: name || "Emlak İlanları",
      slug: slug || "emlak-ilanlari",
      data: sellAdvert,
      count: sellAdvert.length,
      type: type || "konut",
      optional: optional || null,
      title: null,
      check: checkValue || null,
      city: null,
      county: null,
      hood: null,
    });
  };

  const advertsForSale = async () => {
    try {
      const response = await axios.get(`${apiUrl}real-estates`, {
        params: {
          housing_type_title: "Bungalov",
          take: 6,
          skip: 0,
        },
      });
      setBungalov(response?.data?.data?.housings);
    } catch (error) {
      console.error("Error fetching real estate data:", error);
    }
  };

  const apiSellData = [{ key: "step2_slug", value: "satilik" }];
  const apiRentalData = [{ key: "step2_slug", value: "kiralik" }];
  const apiDailyData = [{ key: "step2_slug", value: "gunluk-kiralik" }];
  const apiOverturnData = [{ key: "step2_slug", value: "devren-satilik" }];

  const { data: sellData } = UsePaginatedData("real-estates", 6, apiSellData);
  const { data: rentalData } = UsePaginatedData(
    "real-estates",
    6,
    apiRentalData
  );
  const { data: dailyData } = UsePaginatedData("real-estates", 6, apiDailyData);
  const { data: overturnData } = UsePaginatedData(
    "real-estates",
    6,
    apiOverturnData
  );

  useEffect(() => {
    advertsForSale();
    if (sellData) setSellAdvert(sellData);
    if (rentalData) setrentAdvert(rentalData);
    if (dailyData) setDailyRental(dailyData);
    if (overturnData) setsellDevren(overturnData);
  }, [sellData, rentalData, dailyData, overturnData]);

  const [tourismRent, setTourismRent] = useState([]);
  const [featuredStores, setFeaturedStores] = useState([]);
  const fetchFeaturedStores = async () => {
    try {
      const response = await axios.get(apiUrl + "get_featured_acente_brands");
      if (response?.data?.length > 0) {
        setTourismRent(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const fetchFeaturedStoresEstate = async () => {
    try {
      const response = await axios.get(`${apiUrl}popular-estate-brands`);
      if (response.data.length > 0) {
        setFeaturedStores(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFeaturedStores();
    fetchFeaturedStoresEstate();
  }, []);

  const createMemoizedDataSets = (dataSets) => {
    return Object.fromEntries(
      Object.entries(dataSets).map(([key, value]) => [
        key,
        useMemo(() => (value && value.length > 0 ? value : null), [value]),
      ])
    );
  };
  const dataSets = {
    renderFranchiseSection: franchise,
    renderFeaturedProjects: featuredProjects,
    checkFeaturedStores: featuredStores,
    checkSellAdvertData: sellAdvert,
    checkRentAdvert: rentAdvert,
    checkSellDevren: sellDevren,
    checkTourismRent: tourismRent,
    checkDailyRental: dailyRental,
    checkCreatorBrands: creatorBrands,
    checkBungalov: Bungalov,
  };
  const memoizedData = createMemoizedDataSets(dataSets);
  const {
    renderFranchiseSection,
    renderFeaturedProjects,
    checkFeaturedStores,
    checkSellAdvertData,
    checkRentAdvert,
    checkSellDevren,
    checkTourismRent,
    checkDailyRental,
    checkCreatorBrands,
    checkBungalov,
  } = memoizedData;

  useEffect(() => {
    if (verifyAlert) {
      Alert.alert(
        "Belge Onayı Gerekli",
        "Değerli Kullanıcımız, belgelerinizin henüz onay sürecine gönderilmediğini tespit ettik. İşlemlerinize devam edebilmeniz için lütfen gerekli belgelerinizi onay sürecine iletiniz. Anlayışınız için teşekkür ederiz.",
        [
          {
            text: "Daha Sonra",
            onPress: () => {
              setVerifyAlert(false);
            },
            style: "cancel",
          },
          {
            text: "Hemen Gönder",
            onPress: () => {
              setVerifyAlert(false);
              navigation.navigate("VerifyScreen");
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [verifyAlert]);

  return (
    <AlertNotificationRoot>
      {loadingBrands || loadingProjects || loadingSliders ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#333" size={"large"} />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollViewContent}
            scrollEventThrottle={16}
          >
            {/* Featured Sliders */}
            <View style={styles.sliderContainer}>
              <PagerView
                style={styles.pagerView}
                ref={pagerViewRef}
                initialPage={0}
                onPageSelected={(event) =>
                  setCurrentPage(event.nativeEvent.position)
                }
              >
                {featuredSliders.map((item, index) => (
                  <View
                    style={styles.sliderItem}
                    key={`slider-${item.id}-${index}`}
                  >
                    <ImageBackground
                      source={{
                        uri: `${frontEndUriBase}/storage/sliders/${item.mobile_image}`,
                      }}
                      style={styles.imageBackground}
                      resizeMode="cover"
                    >
                      {/* Dots */}
                      <View style={styles.dotsContainer}>
                        {featuredSliders.map((_, dotIndex) => (
                          <View
                            key={`dot-${dotIndex}-${index}`} // İçteki key farklı ve benzersiz
                            style={[
                              styles.dot,
                              dotIndex === currentPage
                                ? styles.activeDot
                                : styles.inactiveDot,
                            ]}
                          />
                        ))}
                      </View>
                    </ImageBackground>
                  </View>
                ))}
              </PagerView>
            </View>

            {/* Popular Construction Brands */}

            <View style={styles.sliderBarContainer}>
              <Text style={styles.sliderBarTitle}>
                Emlak Sepette Ayrıcalıkları
              </Text>
              <SliderBarForFeature loading={loadingProjects} />
            </View>

            {/* Featured Projects */}
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ gap: 10 }}
              showsHorizontalScrollIndicator={false}
            >
              <ProjectButton
                color="#DADAE7"
                text="Fırsat Projeleri"
                onPress={navigateToProjects}
                textColor="#06065C"
              />
              <ProjectButton
                color="#D7E1F3"
                text="Yatırım Projeleri"
                onPress={navigateToProjects}
                textColor={"#456195"}
              />
              <ProjectButton
                color="#DCF1F2"
                text="Lansman Projeleri"
                onPress={navigateToProjects}
                textColor={"#3E8F97"}
              />
              <ProjectButton
                color="#FCCCCC"
                text="Villa Projeleri"
                onPress={navigateToVillaProjects}
                textColor={"#9E0101"}
              />

              <ProjectButton
                color="#FBC3C6"
                text="Ticari Projeler"
                onPress={navigateToShopProject}
                textColor={"#CF2C2F"}
              />
            </ScrollView>
            <>
              {renderFeaturedProjects && (
                <>
                  <View style={styles.sliderBarContainer}>
                    <Text style={styles.sliderBarTitle}>
                      Öne Çıkan İnşaat Markaları
                    </Text>
                    <SliderBar loading={loadingProjects} />
                  </View>
                  <View style={styles.featuredProjectsContainer}>
                    <View style={styles.slide1}>
                      <View style={{ gap: 0, paddingTop: 0 }}>
                        <FlatList
                          data={featuredProjects}
                          renderItem={({ item, index }) => (
                            <View
                              style={{
                                width: "100%",
                              }}
                            >
                              <ProjectPost
                                key={index}
                                project={item}
                                caption={item.project_title}
                                ımage={`${frontEndUriBase}/${item.image.replace(
                                  "public/",
                                  "storage/"
                                )}`}
                                user={item.user}
                                location={item.city.title}
                                city={item.county.ilce_title}
                                ProjectNo={item.id}
                                ProfilImage={`${frontEndUriBase}/storage/profile_images/${item.user.profile_image}`}
                                loading={loadingProjects}
                              />
                            </View>
                          )}
                          ListHeaderComponent={
                            <View style={{ gap: 9 }}>
                              <View style={styles.featuredProjectsHeader}>
                                <Text style={styles.featuredProjectsTitle}>
                                  Öne Çıkan Projeler
                                </Text>
                                <TouchableOpacity
                                  style={styles.allProjectsButton}
                                  onPress={navigateToAllProjects}
                                >
                                  <Text style={styles.allProjectsButtonText}>
                                    Tümünü Gör
                                  </Text>
                                  <Arrow name="arrow-right" color={"#EA2C2E"} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          }
                          scrollEnabled={false}
                        />
                      </View>
                    </View>
                  </View>
                </>
              )}
            </>

            <>
              {renderFranchiseSection && (
                <>
                  <View
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  >
                    <View style={styles.featuredProjectsHeader}>
                      <Text style={styles.featuredProjectsTitle}>
                        Franchise Markaları
                      </Text>
                      <TouchableOpacity
                        style={styles.allProjectsButton}
                        onPress={() =>
                          navigation.navigate("AllFranchiseBrands")
                        }
                      >
                        <Text style={styles.allProjectsButtonText}>
                          Tümünü Gör
                        </Text>
                      </TouchableOpacity>
                      <Arrow name="arrow-right" color={"#EA2C2E"} />
                    </View>
                    <View>
                      <FlatList
                        data={franchise}
                        horizontal={true}
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                          <FranchiseBanner
                            key={index}
                            image={`${frontEndUriBase}/logos/${item.logo}`}
                            text={item.title}
                            onPress={() =>
                              navigation.navigate("Profile", {
                                id: item?.user_id,
                              })
                            }
                          />
                        )}
                      />
                    </View>
                  </View>
                </>
              )}
            </>
            {/* bottom area */}
            {checkFeaturedStores && (
              <View>
                <View style={styles.featuredProjectsHeader}>
                  <Text style={styles.featuredProjectsTitle}>
                    Öne Çıkan Gayrimenkul Ofisleri
                  </Text>
                  <TouchableOpacity
                    style={styles.allProjectsButton}
                    onPress={() =>
                      navigation.navigate("AllTourismRent", {
                        brandName: "emlak-ofisi",
                      })
                    }
                  >
                    <Text style={styles.allProjectsButtonText}>Tümünü Gör</Text>
                  </TouchableOpacity>
                  <Arrow name="arrow-right" color={"#EA2C2E"} />
                </View>

                <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                  <SliderTourismRent data={featuredStores} />
                </View>
              </View>
            )}

            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                gap: 10,
                paddingTop: 5,
                paddingBottom: 5,
              }}
              showsHorizontalScrollIndicator={false}
            >
              <ProjectButton
                color="#EA2C2E"
                text="Acil Satılık"
                onPress={() =>
                  navigateToRealtorAdverts(
                    null,
                    null,
                    "al-sat-acil",
                    null,
                    null
                  )
                }
              />
              <ProjectButton
                color="#0E49B5"
                text="Paylaşımlı İlanlar"
                onPress={() =>
                  navigateToRealtorAdverts(
                    null,
                    null,
                    "paylasimli-ilanlar",
                    null,
                    null
                  )
                }
              />
              <ProjectButton
                color="#A2DAE0"
                text="Sahibinden"
                onPress={() =>
                  navigateToRealtorAdverts(
                    null,
                    null,
                    "emlak-ilanlari",
                    null,
                    null
                  )
                }
              />
              <ProjectButton
                color="#A70107"
                text="Kiralık Konutlar"
                onPress={() =>
                  navigateToRealtorAdverts(
                    null,
                    null,
                    "konut  ",
                    null,
                    "kiralik"
                  )
                }
              />
              <ProjectButton
                color="#06065d"
                text="Emlak Ofisinden"
                onPress={() =>
                  navigateToRealtorAdverts(
                    null,
                    null,
                    "emlak-ilanlari",
                    null,
                    null
                  )
                }
              />
            </ScrollView>

            <View style={styles.seperator} />

            <React.Fragment>
              {checkSellAdvertData && (
                <View>
                  <View style={styles.featuredProjectsHeader}>
                    <Text style={styles.featuredProjectsTitle}>
                      Satılık İlanlar
                    </Text>
                    <TouchableOpacity
                      style={styles.allProjectsButton}
                      onPress={() =>
                        navigation.navigate("AllRealtorAdverts", {
                          name: "Emlak İlanları",
                          slug: "emlak-ilanlari",
                          data: sellAdvert,
                          count: sellAdvert.length,
                          type: "konut",
                          optional: null,
                          title: null,
                          check: null,
                          city: null,
                          county: null,
                          hood: null,
                        })
                      }
                    >
                      <Text style={styles.allProjectsButtonText}>
                        Tümünü Gör
                      </Text>
                    </TouchableOpacity>
                    <Arrow name="arrow-right" color={"#EA2C2E"} />
                  </View>
                  <FlatList
                    data={sellAdvert}
                    contentContainerStyle={{ gap: 5, padding: 5 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <RealtorCardHome
                        housing={item}
                        title={item.housing_title}
                        HouseId={item.id}
                        price={
                          item.step2_slug == "gunluk-kiralik"
                            ? JSON.parse(item.housing_type_data)["daily_rent"]
                            : JSON.parse(item.housing_type_data)["price"]
                        }
                        location={`${item.city_title} / ${item.county_title}`} // Combine location
                        image={`${frontEndUriBase}/housing_images/${
                          JSON.parse(item.housing_type_data)?.image ?? ""
                        }`} // Safely access image
                        column1_name={`${
                          JSON.parse(item.housing_type_data)?.[
                            item.column1_name
                          ] ?? ""
                        }`} // Safely access column1_name
                        column1_additional={item.column1_additional}
                        column2_name={`${
                          JSON.parse(item.housing_type_data)?.[
                            item.column2_name
                          ] ?? ""
                        }`} // Safely access column2_name
                        column2_additional={item.column2_additional}
                        openSharing={
                          JSON.parse(item.housing_type_data)["open_sharing1"]
                        }
                        column3_name={`${
                          JSON.parse(item.housing_type_data)?.[
                            item.column3_name
                          ] ?? ""
                        }`} // Safely access column3_name
                        column3_additional={item.column3_additional}
                        column4_name={`${
                          JSON.parse(item.housing_type_data)?.[
                            item.column4_name
                          ] ?? ""
                        }`} // Safely access column4_name
                        column4_additional={item.column4_additional}
                        dailyRent={false}
                        sold={item.sold}
                      />
                    )}
                  />
                </View>
              )}
            </React.Fragment>

            <React.Fragment>
              {checkRentAdvert && (
                <>
                  <View style={styles.seperator} />
                  <View>
                    <View style={styles.featuredProjectsHeader}>
                      <Text style={styles.featuredProjectsTitle}>
                        Kiralık İlanlar
                      </Text>
                      <TouchableOpacity
                        style={styles.allProjectsButton}
                        onPress={() =>
                          navigation.navigate("AllRealtorAdverts", {
                            name: "Emlak İlanları",
                            slug: "emlak-ilanlari",
                            data: sellAdvert,
                            count: sellAdvert.length,
                            type: "konut",
                            optional: null,
                            title: null,
                            check: null,
                            city: null,
                            county: null,
                            hood: null,
                          })
                        }
                      >
                        <Text style={styles.allProjectsButtonText}>
                          Tümünü Gör
                        </Text>
                      </TouchableOpacity>
                      <Arrow name="arrow-right" color={"#EA2C2E"} />
                    </View>
                    <FlatList
                      data={rentAdvert}
                      contentContainerStyle={{ gap: 5, padding: 5 }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <RealtorCardHome
                          housing={item}
                          title={item.housing_title}
                          HouseId={item.id}
                          price={
                            item.step2_slug == "gunluk-kiralik"
                              ? JSON.parse(item.housing_type_data)["daily_rent"]
                              : JSON.parse(item.housing_type_data)["price"]
                          }
                          location={`${item.city_title} / ${item.county_title}`} // Combine location
                          image={`${frontEndUriBase}/housing_images/${
                            JSON.parse(item.housing_type_data)?.image ?? ""
                          }`} // Safely access image
                          column1_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column1_name
                            ] ?? ""
                          }`} // Safely access column1_name
                          column1_additional={item.column1_additional}
                          column2_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column2_name
                            ] ?? ""
                          }`} // Safely access column2_name
                          column2_additional={item.column2_additional}
                          openSharing={
                            JSON.parse(item.housing_type_data)["open_sharing1"]
                          }
                          column3_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column3_name
                            ] ?? ""
                          }`} // Safely access column3_name
                          column3_additional={item.column3_additional}
                          column4_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column4_name
                            ] ?? ""
                          }`} // Safely access column4_name
                          column4_additional={item.column4_additional}
                          dailyRent={false}
                          bookmarkStatus={true}
                          sold={item.sold}
                        />
                      )}
                    />
                  </View>
                </>
              )}
            </React.Fragment>

            <React.Fragment>
              {checkSellDevren && (
                <>
                  <View style={styles.seperator} />
                  <View>
                    <View style={styles.featuredProjectsHeader}>
                      <Text style={styles.featuredProjectsTitle}>
                        Devren Satılık İlanlar
                      </Text>
                      <TouchableOpacity
                        style={styles.allProjectsButton}
                        onPress={() =>
                          navigation.navigate("AllRealtorAdverts", {
                            name: "Emlak İlanları",
                            slug: "emlak-ilanlari",
                            data: sellAdvert,
                            count: sellAdvert.length,
                            type: "konut",
                            optional: null,
                            title: null,
                            check: null,
                            city: null,
                            county: null,
                            hood: null,
                          })
                        }
                      >
                        <Text style={styles.allProjectsButtonText}>
                          Tümünü Gör
                        </Text>
                      </TouchableOpacity>
                      <Arrow name="arrow-right" color={"#EA2C2E"} />
                    </View>
                    <FlatList
                      data={sellDevren}
                      contentContainerStyle={{ gap: 5, padding: 5 }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <RealtorCardHome
                          housing={item}
                          title={item.housing_title}
                          HouseId={item.id}
                          price={
                            item.step2_slug == "gunluk-kiralik"
                              ? JSON.parse(item.housing_type_data)["daily_rent"]
                              : JSON.parse(item.housing_type_data)["price"]
                          }
                          location={`${item.city_title} / ${item.county_title}`} // Combine location
                          image={`${frontEndUriBase}/housing_images/${
                            JSON.parse(item.housing_type_data)?.image ?? ""
                          }`} // Safely access image
                          column1_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column1_name
                            ] ?? ""
                          }`} // Safely access column1_name
                          column1_additional={item.column1_additional}
                          column2_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column2_name
                            ] ?? ""
                          }`} // Safely access column2_name
                          column2_additional={item.column2_additional}
                          openSharing={
                            JSON.parse(item.housing_type_data)["open_sharing1"]
                          }
                          column3_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column3_name
                            ] ?? ""
                          }`} // Safely access column3_name
                          column3_additional={item.column3_additional}
                          column4_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column4_name
                            ] ?? ""
                          }`} // Safely access column4_name
                          column4_additional={item.column4_additional}
                          dailyRent={false}
                          sold={item.sold}
                        />
                      )}
                    />
                  </View>
                </>
              )}
            </React.Fragment>

            <React.Fragment>
              {checkTourismRent && (
                <>
                  <View style={styles.featuredProjectsHeader}>
                    <Text style={styles.featuredProjectsTitle}>
                      Turizm Amaçlı Kiralama Markaları
                    </Text>
                    <TouchableOpacity
                      style={styles.allProjectsButton}
                      onPress={() =>
                        navigation.navigate("AllTourismRent", {
                          brandName: "turizm-amacli-kiralama",
                        })
                      }
                    >
                      <Text style={styles.allProjectsButtonText}>
                        Tümünü Gör
                      </Text>
                    </TouchableOpacity>
                    <Arrow name="arrow-right" color={"#EA2C2E"} />
                  </View>
                  <>
                    <SliderTourismRent data={tourismRent} />
                  </>
                </>
              )}
            </React.Fragment>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{ gap: 10 }}
              showsHorizontalScrollIndicator={false}
            >
              <ProjectButton
                color="#0E49B5"
                text="Kiralık Oteller"
                onPress={() => {
                  navigateToRealtorAdverts(
                    null,
                    null,
                    "mustakil-tatil",
                    "otel",
                    "gunluk-kiralik"
                  );
                }}
              />

              <ProjectButton
                color="#A70107"
                text="Kiralık Bungalov"
                onPress={() => {
                  navigateToRealtorAdverts(
                    null,
                    null,
                    "mustakil-tatil",
                    "bungalov",
                    "gunluk-kiralik"
                  );
                }}
              />

              <ProjectButton
                color="#A2DAE0"
                text="Kiralık Tiny House"
                onPress={() => {
                  navigateToRealtorAdverts(
                    null,
                    null,
                    "mustakil-tatil",
                    "tiny-house",
                    "gunluk-kiralik"
                  );
                }}
              />

              <ProjectButton
                color="#06065d"
                text="Kiralık Müstakil Ev"
                onPress={() => {
                  navigateToRealtorAdverts(
                    null,
                    null,
                    "mustakil-tatil",
                    "mustakil-ev",
                    "gunluk-kiralik"
                  );
                }}
              />
            </ScrollView>

            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#ddd",
                marginVertical: 6,
              }}
            />

            <React.Fragment>
              {checkDailyRental && (
                <>
                  <View style={styles.featuredProjectsHeader}>
                    <Text style={styles.featuredProjectsTitle}>
                      Günlük Kiralık İlanlar
                    </Text>
                    <TouchableOpacity
                      style={styles.allProjectsButton}
                      onPress={() =>
                        navigation.navigate("AllRealtorAdverts", {
                          name: "Emlak İlanları",
                          slug: "emlak-ilanlari",
                          data: dailyRental,
                          count: dailyRental.length,
                          type: "mustakil-tatil",
                          optional: null,
                          title: null,
                          check: null,
                          city: null,
                          county: null,
                          hood: null,
                        })
                      }
                    >
                      <Text style={styles.allProjectsButtonText}>
                        Tümünü Gör
                      </Text>
                    </TouchableOpacity>
                    <Arrow name="arrow-right" color={"#EA2C2E"} />
                  </View>
                  <View>
                    <React.Fragment>
                      <FlatList
                        data={dailyRental}
                        contentContainerStyle={{ gap: 5, padding: 5 }}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                          <RealtorCardHome
                            openSharing={
                              JSON.parse(item.housing_type_data)[
                                "open_sharing1"
                              ]
                            }
                            HouseId={item.id}
                            price={
                              item.step2_slug == "gunluk-kiralik"
                                ? JSON.parse(item.housing_type_data)[
                                    "daily_rent"
                                  ]
                                : JSON.parse(item.housing_type_data)["price"]
                            }
                            housing={item}
                            title={item.housing_title}
                            location={
                              item.city_title + " / " + item.county_title
                            }
                            image={`${frontEndUriBase}/housing_images/${
                              JSON.parse(item.housing_type_data).image
                            }`}
                            column1_additional={item.column1_additional}
                            column1_name={
                              JSON.parse(item.housing_type_data)[
                                item.column1_name
                              ]
                                ? JSON.parse(item.housing_type_data)[
                                    item.column1_name
                                  ]
                                : ""
                            }
                            column2_name={
                              JSON.parse(item.housing_type_data)[
                                item.column2_name
                              ]
                                ? JSON.parse(item.housing_type_data)[
                                    item.column2_name
                                  ]
                                : ""
                            }
                            column2_additional={item.column2_additional}
                            column3_name={
                              JSON.parse(item.housing_type_data)[
                                item.column3_name
                              ]
                                ? JSON.parse(item.housing_type_data)[
                                    item.column3_name
                                  ]
                                : ""
                            }
                            column3_additional={item.column3_additional}
                            column4_name={
                              JSON.parse(item.housing_type_data)[
                                item.column4_name
                              ]
                                ? JSON.parse(item.housing_type_data)[
                                    item.column4_name
                                  ]
                                : ""
                            }
                            column4_additional={item.column4_additional}
                            bookmarkStatus={true}
                            dailyRent={false}
                            isFavorite={item.is_favorite}
                          />
                        )}
                      />

                      <View style={styles.seperator} />
                    </React.Fragment>
                  </View>
                </>
              )}
            </React.Fragment>

            <View>
              <View style={{ width: "100%", height: 90 }}>
                <ImageBackground
                  source={{ uri: frontEndUriBase + "bungalowhp.png" }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
            </View>

            <React.Fragment>
              {checkCreatorBrands && (
                <>
                  <View
                    style={[styles.featuredProjectsHeader, { paddingTop: 9 }]}
                  >
                    <Text style={styles.featuredProjectsTitle}>
                      Öne Çıkan Üretici Markaları
                    </Text>
                    <TouchableOpacity
                      style={styles.allProjectsButton}
                      onPress={() =>
                        navigation.navigate("AllFeaturedRealEstate")
                      }
                    >
                      <Text style={styles.allProjectsButtonText}>
                        Tümünü Gör
                      </Text>
                    </TouchableOpacity>
                    <Arrow name="arrow-right" color={"#EA2C2E"} />
                  </View>

                  <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                    <SliderTourismRent data={creatorBrands} />
                  </View>
                </>
              )}
            </React.Fragment>

            <React.Fragment>
              {checkBungalov && (
                <>
                  <View>
                    <View style={styles.featuredProjectsHeader}>
                      <Text style={styles.featuredProjectsTitle}>
                        Bungalov İlanları
                      </Text>
                      <TouchableOpacity
                        style={styles.allProjectsButton}
                        onPress={() =>
                          navigation.navigate("AllRealtorAdverts", {
                            name: "Emlak İlanları",
                            slug: "emlak-ilanlari",
                            data: sellAdvert,
                            count: sellAdvert.length,
                            type: "konut",
                            optional: null,
                            title: null,
                            check: null,
                            city: null,
                            county: null,
                            hood: null,
                          })
                        }
                      >
                        <Text style={styles.allProjectsButtonText}>
                          Tümünü Gör
                        </Text>
                      </TouchableOpacity>
                      <Arrow name="arrow-right" color={"#EA2C2E"} />
                    </View>
                    <FlatList
                      data={Bungalov}
                      contentContainerStyle={{ gap: 5, padding: 5 }}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <RealtorCardHome
                          housing={item}
                          title={item.housing_title}
                          HouseId={item.id}
                          price={
                            item.step2_slug == "gunluk-kiralik"
                              ? JSON.parse(item.housing_type_data)["daily_rent"]
                              : JSON.parse(item.housing_type_data)["price"]
                          }
                          location={`${item.city_title} / ${item.county_title}`} // Combine location
                          image={`${frontEndUriBase}/housing_images/${
                            JSON.parse(item.housing_type_data)?.image ?? ""
                          }`} // Safely access image
                          column1_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column1_name
                            ] ?? ""
                          }`} // Safely access column1_name
                          column1_additional={item.column1_additional}
                          column2_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column2_name
                            ] ?? ""
                          }`} // Safely access column2_name
                          column2_additional={item.column2_additional}
                          openSharing={
                            JSON.parse(item.housing_type_data)["open_sharing1"]
                          }
                          column3_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column3_name
                            ] ?? ""
                          }`} // Safely access column3_name
                          column3_additional={item.column3_additional}
                          column4_name={`${
                            JSON.parse(item.housing_type_data)?.[
                              item.column4_name
                            ] ?? ""
                          }`} // Safely access column4_name
                          column4_additional={item.column4_additional}
                          dailyRent={false}
                          sold={item.sold}
                        />
                      )}
                    />
                  </View>
                </>
              )}
            </React.Fragment>
          </ScrollView>
        </SafeAreaView>
      )}
    </AlertNotificationRoot>
  );
};
export default FirstHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexGrow: 1,
    gap: 6,
  },
  sliderContainer: {
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    marginBottom: 5,
  },
  pagerView: {
    flex: 1,
  },
  sliderItem: {
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    marginTop: "50%",
  },
  sliderBarContainer: {
    paddingBottom: 3,
    paddingTop: 5,
    backgroundColor: "white",
  },
  sliderBarTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 7,
  },
  featuredProjectsContainer: {
    backgroundColor: "white",
    marginTop: 7,
  },
  featuredProjectsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  featuredProjectsTitle: {
    fontSize: 14,
    fontWeight: "700",
    flexWrap: "wrap",
    width: "70%",
  },
  allProjectsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  allProjectsButtonText: {
    color: "#EA2C2E",
    fontSize: 13,

    fontWeight: "bold",
  },
  projectPostContainer: {
    marginTop: 7,
    width: "100%",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 10, // Sliderın altına mesafe
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "gray",
  },
  activeDot: {
    backgroundColor: "red", // Aktif nokta rengi
  },
  inactiveDot: {
    backgroundColor: "#ccc", // Pasif nokta rengi
  },
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 6,
  },
});
