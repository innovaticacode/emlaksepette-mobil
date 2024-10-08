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
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CommentItem from "../RealtorPages/CommentItem";
import RealtorPost from "../../../components/RealtorPost";
import ProjectPost from "../../../components/ProjectPost";
import { Platform } from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import { getValueFor } from "../../../components/methods/user";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

export default function ShopVitrin({ data, housingdata, settab }) {
  const navigation = useNavigation();
  const ApiUrl = "https://private.emlaksepette.com/storage/store_banners/";
  const ApiUrls = "https://private.emlaksepette.com";

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
          "https://private.emlaksepette.com/api/institutional/add_to_cart",
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

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeaturedEstates();
  };
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingEstates, setloadingEstates] = useState(false);
  const [featuredEstates, setFeaturedEstates] = useState({});

  const fetchFeaturedEstates = async () => {
    try {
      // setFeaturedEstates(housingdata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* {banners.length > 0 && (
        <View style={{ height: 245 }}>
          <Swiper autoplay>
            {banners.map((banner, index) => (
              <View
                key={index}
                style={{ width: "100%", height: 200, paddingHorizontal: 4 }}
              >
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
      )} */}
      {/*
      <View style={{ marginTop: 10 }}>
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
                  style={styles.allBtn}
                  onPress={() => settab(3)}
                >
                  <Text style={{ color: "white", fontSize: 11 }}>
                    Tüm İlanları Gör
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                contentContainerStyle={{}}
                data={housingdata.slice(0, 1)}
                renderItem={({ item }) => (
                  <RealtorPost
                    GetId={GetIdForCart}
                    HouseId={item.id}
                    price={`${JSON.parse(item.housing_type_data)["price"]} `}
                    housing={item}
                    openSharing={
                      JSON.parse(item.housing_type_data)["open_sharing1"]
                    }
                    title={item.title}
                    loading={loadingEstates}
                    location={item.city["title"] + " / " + item.county["title"]}
                    image={`${ApiUrls}/housing_images/${
                      JSON.parse(item.housing_type_data).image
                    }`}
                    column1_name={`${
                      JSON.parse(item.housing_type_data)["m2gross"]
                    } `}
                    column1_additional={item.column1_additional}
                    column2_name={`${
                      JSON.parse(item.housing_type_data)["room_count"]
                    } `}
                    column2_additional={item.column2_additional}
                    column3_name={`${
                      JSON.parse(item.housing_type_data)["floorlocation"]
                    } `}
                    column3_additional={item.column3_additional}
                    column4_name={`${
                      JSON.parse(item.housing_type_data)[item.column4_name]
                    } `}
                    column4_additional={item.column4_additional}
                    bookmarkStatus={true}
                    dailyRent={false}
                  />
                )}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                }
                onEndReached={() => fetchFeaturedEstates()}
                onEndReachedThreshold={0}
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListFooterComponent={
                  loading && !refreshing ? (
                    <ActivityIndicator
                      style={{ margin: 20 }}
                      size="small"
                      color="#333"
                    />
                  ) : null
                }
              />
            </View>
          ))} 
      </View>
      */}

      {/* {data?.data?.corporate_type !== "Emlak Ofisi" &&
        featuredProjects.length > 0 && (
          <View>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 50,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>Proje İlanları</Text>
              <TouchableOpacity style={styles.allBtn} onPress={() => settab(2)}>
                <Text style={{ color: "white", fontSize: 11 }}>
                  Tüm Projeleri Gör
                </Text>
              </TouchableOpacity>
            </View>
            {featuredProjects.slice(0, 1).map((item, i) => (
              <ProjectPost
                key={i}
                project={item}
                caption={item.project_title}
                ımage={`${ApiUrls}/${item.image.replace(
                  "public/",
                  "storage/"
                )}`}
                location={item?.city?.title}
                city={item?.county?.ilce_title}
                ProjectNo={item.id}
                user={data.data}
                ProfilImage={`${ApiUrls}/storage/profile_images/${data.data.profile_image}`}
                loading={loadingPrjoects}
              />
            ))}
          </View>
        )} */}

      {/* <Modal
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
      </Modal> */}
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
  allBtn: {
    backgroundColor: "#EA2C2E",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5,
    borderRadius: 4,
  },
});
