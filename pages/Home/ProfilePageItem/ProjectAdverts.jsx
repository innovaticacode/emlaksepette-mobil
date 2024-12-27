import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import ProjectPost from "../../../components/ProjectPost";
import ProjectBottomSheetFilter from "../../../components/ProjectBottomSheetFilter";
import axios from "axios";
import {
  apiUrl,
  frontEndUriBase,
} from "../../../components/methods/apiRequest";
import NoDataScreen from "../../../components/NoDataScreen";

export default function ProjectAdverts({ isVisible, setIsVisible, id }) {
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCounts, setTotalCounts] = useState(0);

  const fetchFeaturedProjects = async (page = 0) => {
    const uri = `${apiUrl}get_institutional_projects_by_housing_type/${id}`;
    const params = {
      housing_type: null,
      skip: page * 10,
      take: 10,
    };

    try {
      setLoadingProjects(true);
      const response = await axios.get(uri, { params });

      setTotalCounts(response.data.total_count); // Toplam kayıt sayısını güncelleyin

      if (response.data && Array.isArray(response.data.projects)) {
        setFeaturedProjects((prev) => [...prev, ...response.data.projects]);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching featured projects:", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects(currentPage);
  }, [currentPage]);

  const onFilterChange = async (filter) => {
    setLoadingProjects(true);
    setCurrentPage(0);
    setFeaturedProjects([]);

    const uri = `${apiUrl}get_institutional_projects_by_housing_type/${id}`;
    const params = {
      housing_type: filter,
      skip: 0,
      take: 10,
    };

    try {
      const response = await axios.get(uri, { params });
      setFeaturedProjects(response.data.projects);
      setTotalCounts(response.data.total_count);
    } catch (error) {
      console.error(
        "Error fetching data onfilter:",
        error.response || error.message
      );
    } finally {
      setLoadingProjects(false);
      setIsVisible(false);
    }
  };

  const loadMore = () => {
    if (!loadingProjects && featuredProjects.length < totalCounts) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const renderFooter = () => {
    return loadingProjects ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <ProjectBottomSheetFilter
        onFilterChange={onFilterChange}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      {loadingProjects ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={featuredProjects}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: featuredProjects.length === 0 ? "center" : null,
          }}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProjectPost
              key={item.id}
              project={item}
              caption={item?.project_title}
              ımage={`${frontEndUriBase}${item?.image.replace(
                "public/",
                "storage/"
              )}`}
              location={item?.city?.title}
              city={item?.county?.ilce_title}
              ProjectNo={item?.id}
              user={item?.data}
              ProfilImage={`${frontEndUriBase}storage/profile_images/${item?.profile_image}`}
              loading={loadingProjects}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={() => (
            <NoDataScreen
              iconName={"home"}
              isShowButton={true}
              message={"Henüz ilan yayınlanmadı."}
              navigateTo={"Home"}
              buttonText={"Anasayfaya Git"}
            />
          )}
        />
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
