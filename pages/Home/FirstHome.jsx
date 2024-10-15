import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ImageBackground,
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
import SliderItem from "../../components/SliderItem";
import WhatIsEmlakSepette from "../../components/WhatIsEmlakSepette";
import SliderEstateBar from "../../components/SliderEstateBar";
import SliderTourismRent from "./SliderTourismRent";
import RealtorPost from "../../components/RealtorPost";

const apiUrl = "https://private.emlaksepette.com";

const FirstHome = (props) => {
  const { index } = props;
  const navigation = useNavigation();

  // Fetch featured sliders
  const fetchFeaturedSliders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/featured-sliders`);
      setFeaturedSliders(response.data);
      setLoadingSliders(false);
    } catch (error) {
      console.log("Error fetching featured sliders:", error);
      setLoadingSliders(false);
    }
  };

  // State for featured projects
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  // Fetch featured projects
  const fetchFeaturedProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await axios.get(`${apiUrl}/api/featured-projects`);
      const projects = response.data.data.slice(0, 6); // Get first 5 projects
      setFeaturedProjects(projects);
    } catch (error) {
      console.log("Error fetching featured projects:", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  const [franchise, setFranchise] = useState([]);

  const fetchFranchiseBrands = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/franchise-markalari`);
      setFranchise(response.data.data);
    } catch (error) {
      console.log("Error fetching franchise brands:", error);
    }
  };

  const [popularConstructionBrands, setPopularConstructionBrands] = useState(
    []
  );
  const fetchPopularConstructionBrands = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/popular-construction-brands`
      );
      // console.log("Popular Construction Brands: ", response.data);
      if (response.data.length > 0) {
        setPopularConstructionBrands(response.data);
      }
    } catch (error) {
      console.log("Error fetching popular construction brands:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
    fetchFranchiseBrands();
    fetchPopularConstructionBrands();
  }, [index]);

  // State for featured sliders
  const [featuredSliders, setFeaturedSliders] = useState([]);
  const [loadingSliders, setLoadingSliders] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerViewRef = useRef(null);

  useEffect(() => {
    fetchFeaturedSliders();
    const interval = setInterval(() => {
      pagerViewRef.current?.setPage(
        currentPage === featuredSliders.length - 1 ? 0 : currentPage + 1
      );
      setCurrentPage(
        currentPage === featuredSliders.length - 1 ? 0 : currentPage + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // State for user
  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  // Navigate to all projects screen
  const navigateToAllProjects = () => {
    navigation.navigate("AllProject", {
      name: "Tüm Projeler",
      slug: "tum-projeler",
      data: featuredProjects,
      count: featuredProjects.length,
      type: null,
      optional: "satilik",
      title: "konut",
      check: "villa",
      city: null,
      county: null,
      hood: null,
    });
  };

  const navigateToVillaProjects = () => {
    navigation.navigate("AllProject", {
      name: "Tüm Projeler",
      slug: "tum-projeler",
      data: featuredProjects,
      count: featuredProjects.length,
      type: null,
      optional: "satilik",
      title: "konut",
      check: "villa",
      city: null,
      county: null,
      hood: null,
    });
  };
  const navigateToHousingProjects = () => {
    navigation.navigate("AllProject", {
      name: "Tüm Projeler",
      slug: "tum-projeler",
      data: featuredProjects,
      count: featuredProjects.length,
      type: null,
      optional: "satilik",
      title: "konut",
      check: null,
      city: null,
      county: null,
      hood: null,
    });
  };
  const [sellAdvert, setSellAdvert] = useState([]);
  const [dailyRental, setDailyRental] = useState([]);

  const advertsForSale = async () => {
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/real-estates`
      );

      const advertSellFilter = response.data.filter(
        (item) => item.step2_slug === "satilik"
      );
      const advertDailyRentalFilter = response.data.filter(
        (item) => item.step2_slug === "gunluk-kiralik"
      );
      setDailyRental(advertDailyRentalFilter.slice(0, 6));
      setSellAdvert(advertSellFilter.slice(0, 6));
    } catch (error) {
      console.error("Error fetching real estate data:", error);
    }
  };

  useEffect(() => {
    advertsForSale();
  }, []);
  return (
    <AlertNotificationRoot>
      {loadingProjects && loadingSliders ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollViewContent}
            scrollEventThrottle={16}
          >
            {/* Featured Sliders */}
            <View style={styles.sliderContainer}>
              {loadingSliders ? (
                <ActivityIndicator
                  style={styles.loadingIndicator}
                  size={"small"}
                  color="#333"
                />
              ) : (
                <PagerView
                  style={styles.pagerView}
                  ref={pagerViewRef}
                  initialPage={0}
                  onPageSelected={(event) =>
                    setCurrentPage(event.nativeEvent.position)
                  }
                >
                  {featuredSliders.map((item, index) => (
                    <View style={styles.sliderItem} key={index}>
                      <ImageBackground
                        source={{
                          uri: `${apiUrl}/storage/sliders/${item.mobile_image}`,
                        }}
                        style={styles.imageBackground}
                        resizeMode="cover"
                      >
                        {/* Dots */}
                        <View style={styles.dotsContainer}>
                          {featuredSliders.map((_, dotIndex) => (
                            <View
                              key={dotIndex}
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
              )}
            </View>

            {/* Popular Construction Brands */}
            <View style={styles.sliderBarContainer}>
              <Text style={styles.sliderBarTitle}>
                ÖNE ÇIKAN İNŞAAT MARKALARI
              </Text>
              <SliderBar loading={loadingProjects} />
            </View>

            {/* Featured Projects */}
            <View style={styles.featuredProjectsContainer}>
              <View style={styles.slide1}>
                <View style={{ gap: 0, paddingTop: 0 }}>
                  {loadingProjects == true ? (
                    <View>
                      <ActivityIndicator size="small" color="#333" />
                    </View>
                  ) : (
                    <>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <ProjectButton
                            color="#0E49B5"
                            text="Yatırım Projeleri"
                          />

                          <ProjectButton
                            color="#A2DAE0"
                            text="Villa Projeleri"
                            onPress={navigateToVillaProjects}
                          />
                        </View>
                        <View>
                          <ProjectButton
                            color="#A70107"
                            text="Lansman Projeleri"
                            onPress={navigateToHousingProjects}
                          />
                          <ProjectButton
                            color="#06065d"
                            text="Ticari Projeler"
                          />
                        </View>
                      </View>

                      <FlatList
                        data={featuredProjects}
                        renderItem={({ item, index }) => (
                          <View
                            style={{
                              marginTop: 7,
                              width: "100%",
                            }}
                          >
                            <ProjectPost
                              key={index}
                              project={item}
                              caption={item.project_title}
                              ımage={`${apiUrl}/${item.image.replace(
                                "public/",
                                "storage/"
                              )}`}
                              user={item.user}
                              location={item.city.title}
                              city={item.county.ilce_title}
                              ProjectNo={item.id}
                              // acıklama={item.description
                              //   .replace(/<\/?[^>]+(>|$)/g, "")
                              //   .replace(/&nbsp;/g, " ")}
                              ProfilImage={`${apiUrl}/storage/profile_images/${item.user.profile_image}`}
                              loading={loadingProjects}
                            />
                          </View>
                        )}
                        ListHeaderComponent={
                          <View style={styles.featuredProjectsHeader}>
                            <Text style={styles.featuredProjectsTitle}>
                              ÖNE ÇIKAN PROJELER
                            </Text>
                            <TouchableOpacity
                              style={styles.allProjectsButton}
                              onPress={navigateToAllProjects}
                            >
                              <Text style={styles.allProjectsButtonText}>
                                Tüm Projeleri Gör
                              </Text>
                            </TouchableOpacity>
                          </View>
                        }
                        scrollEnabled={false}
                      />
                    </>
                  )}
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: "auto",
              }}
            >
              <View style={styles.featuredProjectsHeader}>
                <Text style={styles.featuredProjectsTitle}>
                  FRANCHİSE MARKALARI
                </Text>
                <TouchableOpacity
                  style={styles.allProjectsButton}
                  onPress={() => navigation.navigate("AllFranchiseBrands")}
                >
                  <Text style={styles.allProjectsButtonText}>Tümünü Gör</Text>
                </TouchableOpacity>
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
                      image={`${apiUrl}/logos/${item.logo}`}
                      text={item.title}
                    />
                  )}
                />
              </View>
            </View>
            {/* bottom area */}
            <View>
              <View style={styles.featuredProjectsHeader}>
                <Text style={styles.featuredProjectsTitle}>
                  ÖNE ÇIKAN GAYRİMENKUL OFİSLERİ
                </Text>
                <TouchableOpacity
                  style={styles.allProjectsButton}
                  onPress={() => navigation.navigate("AllFeaturedRealEstate")}
                >
                  <Text style={styles.allProjectsButtonText}>Tümünü Gör</Text>
                </TouchableOpacity>
              </View>

              <View>
                <SliderEstateBar />
              </View>

              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    marginTop: 20,
                  }}
                >
                  <View>
                    <ProjectButton color="#0E49B5" text="Paylaşımlı İlanlar" />
                    <ProjectButton color="#A2DAE0" text="Sahibinden" />
                  </View>
                  <View>
                    <ProjectButton color="#A70107" text="Kiralık Konutlar" />
                    <ProjectButton color="#06065d" text="Emlak Ofisinden" />
                  </View>
                </View>
              </>

              <React.Fragment>
                <View style={styles.seperator} />
                <FlatList
                  data={sellAdvert}
                  renderItem={({ item, index }) => (
                    <RealtorPost
                      housing={item}
                      title={item.housing_title}
                      HouseId={item.id}
                      price={
                        item.step2_slug == "gunluk-kiralik"
                          ? JSON.parse(item.housing_type_data)["daily_rent"]
                          : JSON.parse(item.housing_type_data)["price"]
                      }
                      location={`${item.city_title} / ${item.county_title}`} // Combine location
                      image={`${apiUrl}/housing_images/${
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
                    />
                  )}
                  ListHeaderComponent={
                    <View style={styles.featuredProjectsHeader}>
                      <Text style={styles.featuredProjectsTitle}>
                        SATILIK İLANLAR
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
                    </View>
                  }
                />
              </React.Fragment>
            </View>
            <View>
              <View style={styles.featuredProjectsHeader}>
                <Text style={styles.featuredProjectsTitle}>
                  ÖNE ÇIKAN TURİZM AMAÇLI KİRALAMA MARKALARI
                </Text>
                <TouchableOpacity
                  style={styles.allProjectsButton}
                  onPress={() => navigation.navigate("")}
                >
                  <Text style={styles.allProjectsButtonText}>Tümünü Gör</Text>
                </TouchableOpacity>
              </View>
              <View>
                <SliderTourismRent />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              <View>
                <ProjectButton color="#0E49B5" text="Kiralık Oteller" />
                <ProjectButton color="#A70107" text="Kiralık Bungalov" />
              </View>
              <View>
                <ProjectButton color="#A2DAE0" text="Kiralık Tiny House" />
                <ProjectButton color="#06065d" text="Kiralık Müstakil Ev" />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#ddd",
                marginVertical: 6,
              }}
            />
            <View>
              <React.Fragment>
                <View style={styles.featuredProjectsHeader}>
                  <Text style={styles.featuredProjectsTitle}>
                    GÜNLÜK KİRALIK İLANLAR
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
                    <Text style={styles.allProjectsButtonText}>Tümünü Gör</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={dailyRental}
                  renderItem={({ item, index }) => (
                    <RealtorPost
                      openSharing={
                        JSON.parse(item.housing_type_data)["open_sharing1"]
                      }
                      HouseId={item.id}
                      price={
                        item.step2_slug == "gunluk-kiralik"
                          ? JSON.parse(item.housing_type_data)["daily_rent"]
                          : JSON.parse(item.housing_type_data)["price"]
                      }
                      housing={item}
                      title={item.housing_title}
                      location={item.city_title + " / " + item.county_title}
                      image={`${apiUrl}/housing_images/${
                        JSON.parse(item.housing_type_data).image
                      }`}
                      column1_additional={item.column1_additional}
                      column1_name={
                        JSON.parse(item.housing_type_data)[item.column1_name]
                          ? JSON.parse(item.housing_type_data)[
                              item.column1_name
                            ]
                          : ""
                      }
                      column2_name={
                        JSON.parse(item.housing_type_data)[item.column2_name]
                          ? JSON.parse(item.housing_type_data)[
                              item.column2_name
                            ]
                          : ""
                      }
                      column2_additional={item.column2_additional}
                      column3_name={
                        JSON.parse(item.housing_type_data)[item.column3_name]
                          ? JSON.parse(item.housing_type_data)[
                              item.column3_name
                            ]
                          : ""
                      }
                      column3_additional={item.column3_additional}
                      column4_name={
                        JSON.parse(item.housing_type_data)[item.column4_name]
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
              <View
                style={{
                  width: "100%",
                  height: "auto",
                  paddingBottom: 20,
                }}
              >
                <WhatIsEmlakSepette />
              </View>
            </View>
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
  },
  sliderContainer: {
    height: 200,
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
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 7,
  },
  featuredProjectsContainer: {
    paddingBottom: 3,
    backgroundColor: "white",
    marginTop: 7,
  },
  featuredProjectsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  featuredProjectsTitle: {
    fontSize: 14,
    fontWeight: "700",
    flexWrap: "wrap",
    width: "70%",
  },
  allProjectsButton: {
    backgroundColor: "#EA2C2E",
    paddingVertical: 5,
    borderRadius: 4,
  },
  allProjectsButtonText: {
    color: "white",
    fontSize: 12,
    paddingHorizontal: 12,
    fontWeight: "bold",
    padding: 3,
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
