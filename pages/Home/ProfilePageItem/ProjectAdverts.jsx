import { View, Text, Dimensions, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import ProjectPost from "../../../components/ProjectPost";

export default function ProjectAdverts({ data }) {
  const [loadingPrjoects, setloadingPrjoects] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchFeaturedProjects = async () => {
    setloadingPrjoects(false);
    try {
      setFeaturedProjects(data && data);
      return setloadingPrjoects(false);
    } catch (error) {
      return setloadingPrjoects(false);
    }
  };

  useEffect(() => {
    setloadingPrjoects(true);
    fetchFeaturedProjects();
    return setloadingPrjoects(false);
  }, [data]);

  const { width, height } = Dimensions.get("window");
  const ApiUrl = "https://private.emlaksepette.com";
  return (
    <View style={{ padding: 5 }}>
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
