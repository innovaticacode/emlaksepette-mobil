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

const ApiUrl = "https://private.emlaksepette.com";

export default function ProjectAdverts(props) {
  const { data, isVisible, setIsVisible, id } = props;
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchFeaturedProjects = async (page = 0) => {
    const uri = `${ApiUrl}/api/get_institutional_projects_by_housing_type/${id}`;
    const params = {
      housing_type: null,
      skip: page * 10,
      take: 10,
    };

    try {
      setLoadingProjects(true);
      const response = await axios.get(uri, { params });

      console.log("Fetched projects data:", response.data);

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setFeaturedProjects((prev) => [...prev, ...response.data]);
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

    const uri = `${ApiUrl}/api/get_institutional_projects_by_housing_type/${id}`;
    const params = {
      housing_type: filter,
      skip: 0,
      take: 10,
    };

    try {
      const response = await axios.get(uri, { params });
      setFeaturedProjects(response.data);
      setHasMore(response.data.length === 2);
    } catch (error) {
      console.error("Error fetching data:", error.response || error.message);
    } finally {
      setLoadingProjects(false);
      setIsVisible(false);
    }
  };

  const loadMore = () => {
    if (!loadingProjects && hasMore) {
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
      {featuredProjects.length > 0 ? (
        <FlatList
          data={featuredProjects}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProjectPost
              key={item.id}
              project={item}
              caption={item?.project_title}
              ımage={`${ApiUrl}/${item?.image.replace("public/", "storage/")}`}
              location={item?.city?.title}
              city={item?.county?.ilce_title}
              ProjectNo={item?.id}
              user={data?.data}
              ProfilImage={`${ApiUrl}/storage/profile_images/${data?.profile_image}`}
              loading={loadingProjects}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      ) : loadingProjects ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <View style={styles.empty}>
          <Text>Proje bulunamadı.</Text>
        </View>
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
