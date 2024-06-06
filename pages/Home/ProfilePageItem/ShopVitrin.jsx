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
import Modal from "react-native-modal";
import axios from "axios";
import { getValueFor } from "../../../components/methods/user";
import { useNavigation } from "@react-navigation/native";

export default function ShopVitrin({ data, housingdata }) {
  const navigation=useNavigation()
  const ApiUrl = "https://mobil.emlaksepette.com/storage/store_banners/";
  const ApiUrls = "https://mobil.emlaksepette.com";
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
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const GetIdForCart = (id) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
    
  };
    
  const addToCard = async () => {
    const formData = new FormData();
    formData.append("id", selectedCartItem);
    formData.append("isShare", null);
    formData.append("numbershare", null);
    formData.append("qt", 1);
    formData.append("type", "housing");
    formData.append("project", null);
    formData.append("clear_cart", "no");

    try {
      if (user?.access_token) {
        const response = await axios.post(
          "https://mobil.emlaksepette.com/api/institutional/add_to_cart",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setModalForAddToCart(false);
        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
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
              GetId={GetIdForCart}
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
        <Modal
          isVisible={ModalForAddToCart}
          onBackdropPress={() => setModalForAddToCart(false)}
          animationType="fade" // veya "fade", "none" gibi
          transparent={true}
          style={styles.modal4}
        >
          <View style={styles.modalContent4}>
            <View style={{ padding: 10, gap: 10 }}>
              <Text style={{ textAlign: "center" }}>
                #1000{selectedCartItem} No'lu Konutu Sepete Eklemek İsteiğinize
                Eminmisiniz?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    addToCard();
                  }}
                >
                  <Text style={{ color: "white" }}>Sepete Ekle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#e44242",
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    setModalForAddToCart(false);
                  }}
                >
                  <Text style={{ color: "white" }}>Vazgeç</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
