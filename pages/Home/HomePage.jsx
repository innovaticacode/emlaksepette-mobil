import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";
import axios from "axios";

import { useState, useEffect, useRef } from "react";

import SliderBar from "../../components/SliderBar";
import Header from "../../components/Header";
import ProjectPost from "../../components/ProjectPost";

import { useNavigation } from "@react-navigation/native";

import PagerView from "react-native-pager-view";
import Categories from "../../components/Categories";
import userData, { getValueFor } from "../../components/methods/user";

import { ActivityIndicator } from "react-native-paper";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function HomePage({ index }) {
  const navigation = useNavigation();

  const apiUrl = "https://mobil.emlaksepette.com/";

  const [loadingPrjoects, setloadingPrjoects] = useState(false);

  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get(
        "https://mobil.emlaksepette.com/api/featured-projects"
      );
      setFeaturedProjects(response.data.data);
      setloadingPrjoects(true);
    } catch (error) {
      console.log(error);
    } finally {
      setloadingPrjoects(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, [index]);

  const [featuredSliders, setFeaturedSliders] = useState([]);

  const fetchFeaturedSliders = async () => {
    try {
      const response = await axios.get(
        "https://mobil.emlaksepette.com/api/featured-sliders"
      );
      setFeaturedSliders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pagerViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pagerViewRef.current) {
        let nextPage = currentPage + 1;
        if (nextPage >= featuredSliders.length) {
          nextPage = 0; // Loop back to first page
        }
        pagerViewRef.current.setPage(nextPage);
        setCurrentPage(nextPage);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentPage]);

  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const { width: screenWidth } = Dimensions.get("window");

  return (
    
    <AlertNotificationRoot>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView
          style={{ flex: 1, paddingTop: 25, backgroundColor: "white" }}
        >
          <ScrollView
            stickyHeaderIndices={[2]}
            contentContainerStyle={{ gap: 8 }}
            scrollEventThrottle={16}
          >
            <View style={{ height: 100, padding: 8, borderRadius: 10 }}>
              <PagerView
                style={{ height: "100%" }}
                ref={pagerViewRef}
                initialPage={currentPage}
                onPageSelected={(event) =>
                  setCurrentPage(event.nativeEvent.position)
                }
              >


                {featuredSliders.map((item, index) => (
                  <View
                    style={{
                      borderRadius: 15,
                      width: "100%",
                      height: "100%",
                    }}
                    key={index}
                  >
                    <ImageBackground
                      source={{
                        uri: `${apiUrl}/storage/sliders/${item.image}`,
                      }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                      borderRadius={10}
                    />
                  </View>
                ))}
              </PagerView>

            </View>

            <View
                style={{
                  paddingBottom: 3,
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: 700,marginBottom: 7 }}>
                POPÜLER İNŞAAT MARKALARI

                </Text>

              <SliderBar loading={loadingPrjoects} />
            </View>

            <View
              style={
                {
                  // display: isHidden ? "none" : "flex",
                }
              }
            >
              <View
                style={{
                  paddingBottom: 3,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  
                  paddingRight: 10,
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: 700 }}>
                  ÖNE ÇIKAN PROJELER
                </Text>

                <TouchableOpacity
                  style={styles.allBtn}
                  onPress={() =>
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
                    })
                  }
                >
                  <Text style={{ color: "white", fontSize: 11 }}>
                    Tüm Projeleri Gör
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.slide1}>
              <View style={{ gap: 0, paddingTop: 0 }}>
                {loadingPrjoects == true ? (
                  <View style={{ padding: 10 }}>
                    <ActivityIndicator />
                  </View>
                ) : (
                  <>
                    <FlatList
                      data={featuredProjects}
                      renderItem={({ item, index }) => (
                        <View
                          style={{
                            marginTop: 7,
                            paddingLeft: 10,
                            paddingRight: 10,
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
                            loading={loadingPrjoects}
                          />
                        </View>
                      )}
                      scrollEnabled={false}
                    />
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
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
  page: {
    width: "100%",
    height: "100%", // Sayfa yüksekliği
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 5,
  },
  slide1: {
    flex: 1,

    paddingBottom: 30,
  },
  slide2: {
    flex: 1,
  },
  slide3: {
    flex: 1,
  },
  slide4: {
    flex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  filterBtn: {
    backgroundColor: "#ebebeb",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#c7c7ca",
  },
  btn: {
    backgroundColor: "#ebebeb",
    width: "45%",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#c7c7ca",
  },
  allBtn: {
    backgroundColor: "#EA2C2E",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5,
    borderRadius: 4,
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
