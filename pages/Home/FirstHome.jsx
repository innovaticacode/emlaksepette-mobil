import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
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
      const projects = response.data.data.slice(0, 5); // Get first 5 projects
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

  return (
    <AlertNotificationRoot>
      {loadingProjects && loadingSliders ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.container}>
            <ScrollView
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
                        />
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
                              color="#A70107"
                              text="Konut Projeleri"
                            />
                          </View>
                          <View>
                            <ProjectButton
                              color="#A2DAE0"
                              text="Villa Projeleri"
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
                    Öne Çıkan Gayrimenkul Markaları
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <ProjectButton color="#0E49B5" text="Paylaşımlı İlanlar" />
                    <ProjectButton color="#A70107" text="Kiralık Konutlar" />
                  </View>
                  <View>
                    <ProjectButton color="#A2DAE0" text="Sahibinden" />
                    <ProjectButton color="#06065d" text="Emlak Ofisinden" />
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
                <View
                  style={{
                    width: "100%",
                    height: "auto",
                    paddingBottom: 10,
                  }}
                >
                  <WhatIsEmlakSepette />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
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
    fontSize: 12,
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
    paddingVertical: 12,
  },
  featuredProjectsTitle: {
    fontSize: 12,
    fontWeight: "700",
  },
  allProjectsButton: {
    backgroundColor: "#EA2C2E",
    paddingVertical: 5,
    borderRadius: 4,
  },
  allProjectsButtonText: {
    color: "white",
    fontSize: 11,
    paddingHorizontal: 10,
  },
  projectPostContainer: {
    marginTop: 7,
    width: "100%",
  },
});
