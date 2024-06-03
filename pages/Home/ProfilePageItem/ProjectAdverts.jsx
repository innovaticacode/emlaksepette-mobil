import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Posts from "../../../components/Posts";
import ProjectPost from "../../../components/ProjectPost";
import axios from "axios";

export default function ProjectAdverts({ data }) {
  const [loadingPrjoects, setloadingPrjoects] = useState(false);

  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchFeaturedProjects = async () => {
    try {
      setFeaturedProjects(data.data.projects);
      setloadingPrjoects(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const { width, height } = Dimensions.get("window");
  const ApiUrl = "https://test.emlaksepette.com";
  return (
    <ScrollView>
      <FlatList
        data={featuredProjects}
        renderItem={({ item, index }) => (
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              width: "100%",
            }}
          >
            <ProjectPost
              key={index}
              project={item}
              caption={item.project_title}
              ımage={`${ApiUrl}/${item.image.replace("public/", "storage/")}`}
              location={item?.city?.title}
              city={item?.county?.ilce_title}
              ProjectNo={item.id}
              user={data.data}
              // acıklama={item.description
              //   .replace(/<\/?[^>]+(>|$)/g, "")
              //   .replace(/&nbsp;/g, " ")}

              ProfilImage={`${ApiUrl}/storage/profile_images/${data.data.profile_image}`}
              loading={loadingPrjoects}
            />
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
