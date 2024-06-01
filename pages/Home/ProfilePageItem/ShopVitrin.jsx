import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native-elements";
import Swiper from "react-native-swiper";
import { ScrollView } from "react-native-gesture-handler";
import CommentItem from "../RealtorPages/CommentItem";
import RealtorPost from "../../../components/RealtorPost";
import ProjectPost from "../../../components/ProjectPost";
import { Platform } from "react-native";

export default function ShopVitrin({ data, housingdata }) {
  const ApiUrl = "https://emlaksepette.com/storage/store_banners/";
  const ApiUrls = "https://emlaksepette.com";
  const [banners, setBanners] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loadingPrjoects, setloadingPrjoects] = useState(false);

  useEffect(() => {
    if (data && data.data) {
      if (data.data.banners) {
        setBanners(data.data.banners);
      }
      if (data.data.owners) {
        setOwners(data.data.owners);
      }
    }
  }, [data]);

  const objectKeys = Object.keys(housingdata);

  const [featuredProjects, setFeaturedProjects] = useState([]);
  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setFeaturedProjects(data.data.projects);
        setloadingPrjoects(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeaturedProjects();
  }, [data]);

  return (
    <ScrollView
      style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {banners.length > 0 && (
        <View style={{ height: 245 }}>
          <Swiper autoplay>
            {banners.map((banner, index) => (
              <View key={index} style={{ width: "100%", height: 200 }}>
                <Image
                  source={{
                    uri: `${ApiUrl}${banner.image}`,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                />
              </View>
            ))}
          </Swiper>
        </View>
      )}

      {owners.length > 0 && (
        <View style={[{ top: 5 }, styles.shadow]}>
          <ScrollView
            horizontal
            contentContainerStyle={{ padding: 10, gap: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            {owners.map((itemComment, index) => (
              <CommentItem
                username=""
                key={index}
                comment={itemComment.comment}
                date={itemComment.created_at}
                rate={itemComment.rate}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <View style={{ marginTop: 50 }}>
        {objectKeys.length > 0 &&
          objectKeys.slice(0, 1).map((key, index) => (
            <View key={index}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>Emlak İlanları</Text>
                <TouchableOpacity
                  style={{ backgroundColor: "red", padding: 10 }}
                >
                  <Text style={{ color: "white" }}>Tümünü Gör</Text>
                </TouchableOpacity>
              </View>
              <RealtorPost
                title={`${housingdata[key].title}`}
                price={`${
                  JSON.parse(housingdata[key].housing_type_data)["price"]
                }`}
                m2={`${
                  JSON.parse(housingdata[key].housing_type_data)["squaremeters"]
                }`}
                roomCount={`${
                  JSON.parse(housingdata[key].housing_type_data)["room_count"]
                }`}
                floor={`${
                  JSON.parse(housingdata[key].housing_type_data)[
                    "floorlocation"
                  ]
                }`}
                image={`${ApiUrls}/housing_images/${
                  JSON.parse(housingdata[key].housing_type_data)["image"]
                }`}
                HouseId={`${housingdata[key].id}`}
              />
            </View>
          ))}
      </View>

      {featuredProjects.length > 0 && (
        <View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 18 }}>Proje İlanları</Text>
            <TouchableOpacity style={{ backgroundColor: "red", padding: 10 }}>
              <Text style={{ color: "white" }}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          {featuredProjects.slice(0, 1).map((item, i) => (
            <ProjectPost
              key={i}
              project={item}
              caption={item.project_title}
              ımage={`${ApiUrls}/${item.image.replace("public/", "storage/")}`}
              location={item?.city?.title}
              city={item?.county?.ilce_title}
              ProjectNo={item.id}
              user={data.data}
              ProfilImage={`${ApiUrls}/storage/profile_images/${data.data.profile_image}`}
              loading={loadingPrjoects}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: "100%",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  commentPoint: {
    width: "100%",
    backgroundColor: "#ececec",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    borderRadius: 5,
  },
  point: {
    flex: 0.8 / 2,
    display: "flex",
  },
  stars: {
    flex: 1.2 / 2,
    gap: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "blue",
  },
  progressText: {
    position: "absolute",
    alignSelf: "center",
    lineHeight: 30,
    color: "white",
  },
  star: {
    top: 3,
  },
});
