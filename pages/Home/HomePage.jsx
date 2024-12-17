import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import ProjectPost from "../../components/ProjectPost";
import { getValueFor } from "../../components/methods/user";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import { apiUrl, frontEndUriBase } from "../../components/methods/apiRequest";
import { useSelector } from "react-redux";

const HomePage = (props) => {
  const { index } = props;
  const banners = useSelector((state) => state?.banners?.banners);
  const navigation = useNavigation();
  // Fetch featured sliders
  const fetchFeaturedSliders = async () => {
    if (loadingSliders) return; // Eğer yükleniyorsa, yeni istek atma

    setLoadingSliders(true); // Yükleniyor durumunu başlat
    try {
      const response = await axios.get(`${apiUrl}featured-sliders`);
      setFeaturedSliders(response.data);
    } catch (error) {
      console.log("Error fetching featured sliders:", error);
    } finally {
      setLoadingSliders(false); // Yükleniyor durumunu kapat
    }
  };
  useEffect(() => {
    fetchFeaturedSliders();
  }, [user]);

  // State for featured projects
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  // Fetch featured projects
  const fetchFeaturedProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await axios.get(`${apiUrl}featured-projects`);
      setFeaturedProjects(response.data);
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

  useEffect(() => {
    const interval = setInterval(() => {
      pagerViewRef.current?.setPage(
        currentPage === featuredSliders.length - 1 ? 0 : currentPage + 1
      );
      setCurrentPage(
        currentPage === featuredSliders.length - 1 ? 0 : currentPage + 1
      );
    }, 4000);

    return () => clearInterval(interval); // Temizlik
  }, [currentPage, featuredSliders.length]); // Burada featuredSliders.length kullanımı uygun

  // State for user
  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  return (
    <AlertNotificationRoot>
      {loadingProjects && loadingSliders ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#333" size={"large"} />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View>
                <Image
                  source={{ uri: banners?.tum_projeler }}
                  alt="project"
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.header}>
                <Text style={{ fontSize: 14, fontWeight: 700 }}>
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
                      optional: null,
                      title: null,
                      check: null,
                      city: null,
                      county: null,
                      hood: null,
                    })
                  }
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "bold",
                      padding: 3,
                    }}
                  >
                    Tüm İlanları Gör
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Featured Projects */}
              <View style={styles.featuredProjectsContainer}>
                {loadingProjects ? (
                  <ActivityIndicator size="small" color="#333" />
                ) : (
                  <FlatList
                    data={featuredProjects}
                    renderItem={({ item, index }) => (
                      <View style={styles.projectPostContainer}>
                        <ProjectPost
                          key={index}
                          project={item}
                          caption={item.project_title}
                          ımage={`${frontEndUriBase}${item.image.replace(
                            "public/",
                            "storage/"
                          )}`}
                          user={item.user}
                          location={item.city.title}
                          city={item.county.ilce_title}
                          ProjectNo={item.id}
                          ProfilImage={`${frontEndUriBase}storage/profile_images/${item.user.profile_image}`}
                          loading={loadingProjects}
                        />
                      </View>
                    )}
                    scrollEnabled={false}
                  />
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      )}
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {},
  bannerImage: {
    width: "100%",
    height: 120,
    marginBottom: 10,
    paddingHorizontal: 0,
  },
  featuredProjectsContainer: {
    paddingBottom: 3,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  projectPostContainer: {
    width: "100%",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  allBtn: {
    backgroundColor: "#EA2C2E",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 3,
    borderRadius: 4,
  },
  header: {
    paddingBottom: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 8,
  },
});

export default HomePage;
