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
} from "react-native";
import axios from "axios";
import ProjectPost from "../../components/ProjectPost";
import { getValueFor } from "../../components/methods/user";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { ActivityIndicator } from "react-native-paper";
import Banner from "../../assets/project-banner.png";

const apiUrl = "https://private.emlaksepette.com";

const HomePage = (props) => {
  const { index } = props;
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
  }, [currentPage, featuredSliders.length]);

  // State for user
  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  return (
    <AlertNotificationRoot>
      {loadingProjects && loadingSliders ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <View>
                <Image
                  source={Banner}
                  alt="project"
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
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
                          ımage={`${apiUrl}/${item.image.replace(
                            "public/",
                            "storage/"
                          )}`}
                          user={item.user}
                          location={item.city.title}
                          city={item.county.ilce_title}
                          ProjectNo={item.id}
                          ProfilImage={`${apiUrl}/storage/profile_images/${item.user.profile_image}`}
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
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  bannerImage: {
    width: "100%",
    height: 120,
  },
  featuredProjectsContainer: {
    paddingBottom: 3,
    backgroundColor: "white",
    marginTop: 7,
  },
  projectPostContainer: {
    marginTop: 7,
    width: "100%",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default HomePage;
