import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ProjectPost from "../../../components/ProjectPost";
import ProjectBottomSheetFilter from "../../../components/ProjectBottomSheetFilter";
import axios from "axios";

const ApiUrl = "https://private.emlaksepette.com";

export default function ProjectAdverts(props) {
  const { data, isVisible, setIsVisible, id } = props;
  const [loadingPrjoects, setloadingPrjoects] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const fetchFeaturedProjects = async () => {
    try {
      setFeaturedProjects(data);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
    } finally {
      setloadingPrjoects(false);
    }
  };

  useEffect(() => {
    setloadingPrjoects(true);
    fetchFeaturedProjects();
  }, [data]);

  const onFilterChange = async (filter) => {
    setloadingPrjoects(true);
    const uri = `${ApiUrl}/api/get_institutional_projects_by_housing_type/${id}`;
    const params = {
      housing_type: filter,
      skip: 0,
      take: 10,
    };
    try {
      const response = await axios.get(uri, {
        params: params,
      });
      console.debug("Response Data:", response.data); // Yanıt verisini kontrol et
      setloadingPrjoects(false);
      return setFeaturedProjects(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.response || error.message); // Hata mesajını kontrol et
      setloadingPrjoects(false);
    }
  };

  return (
    <View style={{ padding: 5 }}>
      <ProjectBottomSheetFilter
        onFilterChange={onFilterChange}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      {featuredProjects &&
      Array.isArray(featuredProjects) &&
      featuredProjects.length > 0 ? (
        <FlatList
          data={featuredProjects}
          renderItem={({ item, index }) => (
            <ProjectPost
              key={index}
              project={item}
              caption={item?.project_title}
              ımage={`${ApiUrl}/${item?.image.replace("public/", "storage/")}`}
              location={item?.city?.title}
              city={item?.county?.ilce_title}
              ProjectNo={item?.id}
              user={data?.data}
              ProfilImage={`${ApiUrl}/storage/profile_images/${data?.profile_image}`}
              loading={loadingPrjoects}
            />
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text>Proje bulunamadı.</Text>
        </View>
      )}
    </View>
  );
}
