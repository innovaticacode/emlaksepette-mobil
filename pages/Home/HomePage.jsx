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
  Dimensions,
  ImageBackground,
} from "react-native";
import axios from "axios";
import PagerView from "react-native-pager-view";
import ProjectPost from "../../components/ProjectPost";
import SliderBar from "../../components/SliderBar";
import Header from "../../components/Header";
import userData, { getValueFor } from "../../components/methods/user";
import { useNavigation } from "@react-navigation/native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";

const apiUrl = "https://private.emlaksepette.com";

const HomePage = ({ index }) => {
  const navigation = useNavigation();
  const { width: screenWidth } = Dimensions.get("window");

  // State for featured projects
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  // Fetch featured projects
  const fetchFeaturedProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await axios.get(`${apiUrl}/api/featured-projects`);
      setFeaturedProjects(response.data.data);
    } catch (error) {
      console.log("Error fetching featured projects:", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, [index]);

  // State for featured sliders
  const [featuredSliders, setFeaturedSliders] = useState([]);
  const [loadingSliders, setLoadingSliders] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerViewRef = useRef(null);

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
      {
        loadingProjects && loadingSliders ?
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
          <ActivityIndicator/>
        </View>
        :
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent} scrollEventThrottle={16}>
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
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      }
    
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 25,
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

export default HomePage;
