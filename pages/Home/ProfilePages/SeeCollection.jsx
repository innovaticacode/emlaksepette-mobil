import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Platform,
  TextInput,
  Share,
} from "react-native";
import Posts from "../../../components/Posts";
import LinkIcon3 from "react-native-vector-icons/Feather";
import LinkIcon4 from "react-native-vector-icons/Fontisto";
import LinkIcon2 from "react-native-vector-icons/FontAwesome";
import LinkIcon from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackIcon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import RealtorPost from "../../../components/RealtorPost";
import Modal from "react-native-modal";
import Heart from "react-native-vector-icons/AntDesign";
import SettingsItem from "../../../components/SettingsItem";
import { SocialIcon } from "react-native-elements";
import Icon2 from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from "react-native-picker-select";
import CloseIcon from "react-native-vector-icons/AntDesign";
import PagerView from "react-native-pager-view";
import SliderMenuDetails from "../../../components/SliderMenuDetails";
import { apiRequestGet } from "../../../components/methods/apiRequest";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
import Categories from "../../../components/Categories";
import { getValueFor } from "../../../components/methods/user";
import AddCollection from "../../../components/AddCollection";
import Arrow from "react-native-vector-icons/MaterialIcons";
import { ActivityIndicator } from "react-native-paper";
export default function SeeCollection() {
  const route = useRoute();

  const { width, height, fontScale } = Dimensions.get("window");
  const navigation = useNavigation();
  const [collectionData, setCollectionData] = useState();
  const [mergedItems, setMergedItems] = useState([]);
  const { collectionUser, item, id } = route.params;
  const [ColectionSheet, setColectionSheet] = useState(false);
  const [IsOpenSheet, setIsOpenSheet] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showAlert, setshowAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [tabs, setTabs] = useState(0);
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState(10);
  const [paymentModalShowOrder, setPaymentModalShowOrder] = useState(null);
  const [FormVisible, setFormVisible] = useState(false);
  const apiUrl = "http://192.168.1.102:8000/";
  const [data, setData] = useState({
    project: {
      room_count: 0,
      roomInfo: [],
      images: [],
      location: "0,0",
    },
    projectHousingsList: {},
  });
  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  let debounceTimeout;
  const { slug, ProjectId } = route.params;

  const translateY = useRef(new Animated.Value(400)).current;

  const openModal = (roomOrder) => {
    setPaymentModalShowOrder(roomOrder);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.102:8000/api/emlak-kulup/${collectionUser?.id}/koleksiyonlar/${item?.id}`
        );
        setCollectionData(response?.data);
        setMergedItems(response?.data?.mergedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // fetchData fonksiyonunu çağır
  }, []);

  const openSheet = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    apiRequestGet("project/" + ProjectId).then((res) => {
      setData(res?.data);
    });
  }, []);

  const getLastItemCount = () => {
    var lastBlockItemsCount = 0;
    for (var i = 0; i < selectedTab; i++) {
      lastBlockItemsCount += data.project.blocks[i].housing_count;
    }

    return lastBlockItemsCount;
  };

  const removeItemOnCollection = (collectionId) => {
    const collectionData = {
      item_type: 1,
      room_order: selectedHouse,
      item_id: data.project.id,
      collection_id: collectionId,
    };

    axios
      .post(
        "http://192.168.1.102:8000/api/remove_item_on_collection",
        collectionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        setTimeout(() => {
          setcollectionAddedSucces(true);
        }, 200);
        setTimeout(() => {
          setcollectionAddedSucces(false);
        }, 3000);
        var newCollections = collections.map((collection) => {
          if (collection.id == collectionId) {
            var newLinks = collection.links.filter((link) => {
              if (
                link.collection_id == collectionId &&
                link.item_id == data.project.id &&
                link.room_order == selectedHouse
              ) {
              } else {
                return link;
              }
            });

            return {
              ...collection,
              links: newLinks,
            };
          } else {
            return collection;
          }
        });

        setcollections(newCollections);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };

  const ToggleColSheet = () => {
    setColectionSheet(!ColectionSheet);
  };
  const [showCoverImageModal, setCoverImageModal] = useState(false);

  const [selectedHouse, setselectedHouse] = useState(0);

  const [addCollection, setaddCollection] = useState(false);
  const [user, setUser] = useState({});

  const [newCollectionNameCreate, setnewCollectionNameCreate] = useState("");
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const [collections, setcollections] = useState([]);
  const [collectionAddedSucces, setcollectionAddedSucces] = useState(false);
  const [selectedCollectionName, setselectedCollectionName] = useState("");
  const fetchData = async () => {
    try {
      if (user.access_token) {
        const response = await axios.get(
          "http://192.168.1.102:8000/api/client/collections",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );

        setcollections(response?.data.collections);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const ıtemOnCollection = (collectionId) => {
    let check = false;
    collections.map((collection) => {
      for (var i = 0; i < collection.links.length; i++) {
        if (
          (collection.links[i].item_type =
            1 &&
            collection.links[i].item_id == data.project.id &&
            collection.links[i].room_order == selectedHouse &&
            collection.links[i].collection_id == collectionId)
        ) {
          check = true;
        }
      }
    });

    return check;
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const addCollectionPost = () => {
    const collectionData = {
      collection_name: newCollectionNameCreate,
      cart: {
        id: selectedHouse,
        type: "project",
        project: data.project.id,
        clear_cart: "no",
        selectedCollectionId: null,
      },
    };

    axios
      .post(
        "http://192.168.1.102:8000/api/add/collection",
        collectionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        fetchData();
        setaddCollection(false);
        setnewCollectionNameCreate("");

        setTimeout(() => {
          setcollectionAddedSucces(true);
        }, 200);
        setTimeout(() => {
          setcollectionAddedSucces(false);
        }, 3000);
        // Başarılı yanıtı işleyin
        setselectedCollectionName(response.data.collection.name);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };
  const [selectedCollectionId, setselectedCollectionId] = useState(0);
  const [selectedCollectionName2, setselectedCollectionName2] = useState("");

  const getCollectionId = (id, name) => {
    setselectedCollectionId(id);
    setselectedCollectionName2(name);
  };

  const addSelectedCollection = (id) => {
    const collectionData = {
      collection_name: selectedCollectionName2,
      clear_cart: "no",
      id: selectedHouse,
      project: data.project.id,
      selectedCollectionId: id,
      type: "project",
    };

    axios
      .post("http://192.168.1.102:8000/api/addLink", collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setcollectionAddedSucces(true);
        }, 200);
        setTimeout(() => {
          setcollectionAddedSucces(false);
        }, 2000);
        // Başarılı yanıtı işleyin
        // setselectedCollectionName(response.data.collection.name)
        var newCollections = collections.map((collection) => {
          if (collection.id == id) {
            return {
              ...collection,
              links: [
                ...collection.links,
                {
                  collection_id: id,
                  room_order: selectedHouse,
                  item_id: data.project.id,
                  user_id: user?.id,
                  item_type: 1,
                },
              ],
            };
          } else {
            return collection;
          }
        });

        setcollections(newCollections);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };

  const [PopUpForRemoveItem, setsetPopUpForRemoveItem] = useState(false);
  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const GetIdForCart = (id) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
  };

  const addToCard = async () => {
    const formData = new FormData();
    formData.append("id", selectedCartItem);
    formData.append(
      "isShare",
      data.projectHousingsList[selectedCartItem]["share_sale[]"]
    );
    formData.append(
      "numbershare",
      data.projectHousingsList[selectedCartItem]["number_of_shares[]"]
    );
    formData.append("qt", 1);
    formData.append("type", "project");
    formData.append("clear_cart", "no");
    formData.append("project", data.project.id);
    try {
      if (user?.access_token) {
        const response = await axios.post(
          "http://192.168.1.102:8000/api/institutional/add_to_cart",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };

  const [userid, setUserId] = useState("");
  const [storeid, setStoreId] = useState("");
  const [projectid, setProjectId] = useState("");
  const [roomid, setRoomId] = useState("");
  const [emailid, setEmailId] = useState("");
  const [nameid, setNameId] = useState("");

  const [phoneid, setPhoneId] = useState("");

  const [titleid, setTitleId] = useState("");
  const [offerid, setOfferId] = useState("");

  const [createdid, setCreatedId] = useState("");
  const [selectedroomId, setselectedroomId] = useState();
  const getRoomID = (id) => {
    setselectedroomId(id);
  };
  const postData = async () => {
    try {
      var formData = new FormData();

      formData.append("userid", user.id);
      formData.append("projectUserId", data.project.user.id);
      formData.append("projectId", data.project.id);
      formData.append("roomId", selectedroomId);
      formData.append("name", nameid);
      formData.append("phone", phoneid);
      formData.append("email", emailid);
      formData.append("city_id", city);
      formData.append("county_id", county);
      formData.append("title", titleid);
      formData.append("offer_description", offerid);

      const response = await axios.post(
        "http://192.168.1.102:8000/api/institutional/give_offer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "multipart/form-data", // İçerik tipini belirtmek
          },
        }
      );
      setFormVisible(false);
      setTimeout(() => {
        setTrueModal(true);
      }, 3000);

      // color("#d4edda");
      setNameId("");
      setPhoneId("");
      setEmailId("");
      setcity("");
      setcounty("");
      setTitleId("");
      setOfferId("");
    } catch (error) {
      if (error.response) {
        // Sunucudan gelen hata yanıtı
        console.error("Sunucu Hatası:", error.response.data);
        console.error("Hata Kodu:", error.response.status);
      } else if (error.request) {
        // İstek yapıldı, ancak cevap alınamadı
        console.error("Sunucudan cevap alınamadı:", error.request);
      } else {
        // İstek ayarları sırasında bir hata oluştu
        console.error("İstek Ayar Hatası:", error.message);
      }
      console.error("Post isteği başarısız:", error);
    }
  };
  const [city, setcity] = useState("");
  const [county, setcounty] = useState("");
  const fetchCity = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.102:8000/api/cities"
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const [citites, setCities] = useState([]);
  useEffect(() => {
    fetchCity()
      .then((citites) => setCities(citites.data))
      .catch((error) =>
        console.error("Veri alınırken bir hata oluştu:", error)
      );
  }, []);

  const [counties, setcounties] = useState([]);
  const fetchDataCounty = async (value) => {
    try {
      const response = await axios.get(
        `http://192.168.1.102:8000/api/counties/${value}`
      );
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onChangeCity = (value) => {
    setcity(value);
    if (value) {
      fetchDataCounty(value)
        .then((county) => setcounties(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setcounties([]);
    }
  };

  const [errorStatu, seterrorStatu] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");
  const GiveOffer = () => {
    switch (true) {
      case !nameid:
        seterrorStatu(1);
        seterrorMessage("İsim Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !phoneid:
        seterrorStatu(2);
        seterrorMessage("Telefon Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !titleid:
        seterrorStatu(3);
        seterrorMessage("Meslek Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !city:
        seterrorStatu(4);
        seterrorMessage("Şehir Seçiniz ");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !county:
        seterrorStatu(5);
        seterrorMessage("İlçe Seçniz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !emailid:
        seterrorStatu(6);
        seterrorMessage("Mail Alanı Boş Bırakılmaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      case !offerid:
        seterrorStatu(7);
        seterrorMessage("Açıklama alanı boş bırakılamaz");

        setTimeout(() => {
          seterrorStatu(0);
        }, 5000);
        break;
      default:
        postData();
    }

    if (errorMessage) {
      // ShowAlert(ErrorMessage);
    }
  };
  const OpenFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `http://192.168.1.102:8000/`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Link belirli bir aktivitede paylaşıldı");
        } else {
          console.log("Link paylaşıldı");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Paylaşım iptal edildi");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const ApiUrl = "http://192.168.1.102:8000/";
  return (
    <View style={{ flex: 1 }}>
      <View
        style={style.container}
        onTouchStart={() => {
          closeSheet();
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            width: "100%",

            height:
              collectionUser?.name > 30
                ? width < 400
                  ? ""
                  : 240
                : width < 400
                ? 200
                : 220,
          }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
              backgroundColor: collectionUser?.banner_hex_code + 94,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <View style={style.InfoContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ebebeb94",
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 5,
                  justifyContent: "center",
                  width: 45,
                  height: 30,
                  alignItems: "center",
                }}
                onPress={() => navigation.goBack()}
              >
                <Arrow
                  name="arrow-back-ios"
                  size={20}
                  style={{ left: 3 }}
                  color={"white"}
                />
              </TouchableOpacity>

              <TouchableOpacity style={style.shareIcons} onPress={onShare}>
                <Icon name="sharealt" size={18} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",

                    gap: 10,
                  }}
                >
                  <View style={{ width: 40, height: 40, borderRadius: 20 }}>
                    <ImageBackground
                      source={{
                        uri: `${ApiUrl}storage/profile_images/${collectionUser?.profile_image}`,
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20,
                      }}
                    />
                  </View>
                  <View style={{ width: "90%" }}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Koleksiyon Adı: {item?.name}
                    </Text>
                    <Text style={{ color: "white", fontSize: 15 }}>
                      {collectionUser?.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ width: "60%", paddingTop: 10 }}>
                <TextInput
                  style={{
                    padding: 9,
                    backgroundColor: "#f5f5f53d",
                    borderWidth: 0,
                    borderColor: "#ebebeb",
                    borderRadius: 5,
                  }}
                  placeholder="Ara..."
                  placeholderTextColor={"#333"}
                />
              </View>
            </View>
          </View>

          <ImageBackground
            source={require("../../../src/assets/images/profilePhoto.jpg")}
            style={{ width: "100%", height: "100%" }}
            imageStyle={{
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          />
        </View>
        {/* <View style={style.header}>
          <View
            style={{
              position: "absolute",
              zIndex: 3,
              top: "30%",
              left: 15,
              backgroundColor: "#FFFFFF3b",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon
                name="arrow-back-ios"
                size={20}
                color={"white"}
                style={{ left: 5 }}
              />
            </TouchableOpacity>
          </View>
          <SafeAreaView style={style.ProfileInfoDiv}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                top: 50,
                width: "60%",
              }}
            >
              <Text
                style={{
                  fontSize: width > 400 ? 13 : 12,
                  color: "white",
                  fontWeight: "400",
                  bottom: 10,
                  left: 10,
                  top: 5,
                }}
              >
                Koleksiyon Adı: {item.name}
              </Text>

              <View style={style.ProfileName}>
                <Text
                  style={{
                    fontSize: width > 400 ? 25 : 18,
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  {collectionUser.name}
                </Text>
              </View>
            </View>

            <View style={style.ProfileImageAndIcon}>
              <View>
                <TouchableOpacity onPress={openSheet}>
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      justifyContent: "center",
                      width: 35,
                      height: 35,
                      top: "30%",
                      alignItems: "center",
                      borderRadius: 20,
                    }}
                  >
                    <Icon name="sharealt" size={17} />
                  </View>
                </TouchableOpacity>
              </View>
              <View></View>
            </View>
          </SafeAreaView>
          <View style={style.opacity}></View>

          <ImageBackground
            source={require("../profilePhoto.jpg")}
            style={{ width: "100%", height: "100%" }}
            imageStyle={{
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          />
        </View> */}
        {mergedItems?.length > 0 ? (
          <View style={style.PostContainer}>
            <FlatList
              data={mergedItems}
              renderItem={({ item, index }) => (
                <View
                  style={{ paddingLeft: 10, paddingRight: 10, width: "100%" }}
                >
                  {item.item_type == 2 ? (
                    <RealtorPost
                      key={item?.housing.id}
                      HouseId={item?.housing.id}
                      bookmarkStatus={false}
                      price={`${
                        JSON.parse(item?.housing.housing_type_data)["price"] ??
                        JSON.parse(item?.housing.housing_type_data)[
                          "daily_rent"
                        ]
                      } `}
                      openSharing={
                        item &&
                        item.housing_type_data &&
                        JSON.parse(item.housing_type_data)["open_sharing1"]
                      }
                      discount_amount={item.discount_amount}
                      discountRate={`${
                        JSON.parse(item.housing.housing_type_data)[
                          "discount_rate"
                        ]
                      } `}
                      housing={item.housing}
                      title={item.housing.title}
                      location={" "}
                      image={`${apiUrl}/housing_images/${
                        JSON.parse(item.housing.housing_type_data).image
                      }`}
                    />
                  ) : (
                    <></>
                    // <>
                    //   <Posts
                    //     key={item?.room_order}
                    //     data={item}
                    //     bookmarkStatus={false}
                    //     openModal={openModal}
                    //     openFormModal={OpenFormModal}
                    //     roomOrder={item?.room_order}
                    //     GetIdForCart={GetIdForCart}

                    //   />
                    //   <Modal
                    //     animationType="fade" // veya "fade", "none" gibi
                    //     transparent={true}
                    //     visible={modalVisible}
                    //     onRequestClose={() => {
                    //       setModalVisible(!modalVisible);
                    //     }}
                    //   >
                    //     <View style={style.centeredView}>
                    //       <View style={style.modalView}>
                    //         <TouchableOpacity
                    //           style={{
                    //             position: "absolute",
                    //             right: -5,
                    //             backgroundColor: "#333",
                    //             padding: 6,
                    //             zIndex: 1,
                    //             borderRadius: 30,
                    //             top: -15,
                    //           }}
                    //           onPress={() => setModalVisible(!modalVisible)}
                    //         >
                    //           <Heart name="close" size={20} color={"white"} />
                    //         </TouchableOpacity>
                    //         <View
                    //           style={{
                    //             backgroundColor: "#EEEEEE",
                    //             padding: 10,
                    //           }}
                    //         >
                    //           <Text
                    //             style={{ fontWeight: "bold", fontSize: 12 }}
                    //           >
                    //             {item?.project?.project_title} projesinde{" "}
                    //             {paymentModalShowOrder} No'lu ilan Ödeme Planı
                    //           </Text>
                    //         </View>
                    //         <View>
                    //           <SettingsItem
                    //             info="Peşin Fiyat"
                    //             numbers={
                    //               paymentModalShowOrder != null
                    //                 ? addDotEveryThreeDigits(
                    //                     item.projectHousingsList[
                    //                       paymentModalShowOrder
                    //                     ]["price[]"]
                    //                   ) + " ₺"
                    //                 : "0"
                    //             }
                    //           />
                    //           {paymentModalShowOrder != null ? (
                    //             JSON.parse(
                    //               item.projectHousingsList[
                    //                 paymentModalShowOrder
                    //               ]["payment-plan[]"]
                    //             ) &&
                    //             JSON.parse(
                    //               item.projectHousingsList[
                    //                 paymentModalShowOrder
                    //               ]["payment-plan[]"]
                    //             ).includes("taksitli") ? (
                    //               <SettingsItem
                    //                 info="Ay Taksitli Fiyat"
                    //                 number={
                    //                   item.projectHousingsList[
                    //                     paymentModalShowOrder
                    //                   ]["installments[]"]
                    //                 }
                    //                 numbers={
                    //                   addDotEveryThreeDigits(
                    //                     item.projectHousingsList[
                    //                       paymentModalShowOrder
                    //                     ]["installments-price[]"]
                    //                   ) + "₺"
                    //                 }
                    //               />
                    //             ) : (
                    //               <SettingsItem
                    //                 info="Ay Taksitli Fiyat"
                    //                 numbers="0"
                    //               />
                    //             )
                    //           ) : (
                    //             <SettingsItem
                    //               info="Ay Taksitli Fiyat"
                    //               numbers="0"
                    //             />
                    //           )}
                    //           {paymentModalShowOrder != null ? (
                    //             JSON.parse(
                    //               item.projectHousingsList[
                    //                 paymentModalShowOrder
                    //               ]["payment-plan[]"]
                    //             ) &&
                    //             JSON.parse(
                    //               item.projectHousingsList[
                    //                 paymentModalShowOrder
                    //               ]["payment-plan[]"]
                    //             ).includes("taksitli") ? (
                    //               <SettingsItem
                    //                 info="Peşinat"
                    //                 numbers={
                    //                   addDotEveryThreeDigits(
                    //                     item.projectHousingsList[
                    //                       paymentModalShowOrder
                    //                     ]["advance[]"]
                    //                   ) + "₺"
                    //                 }
                    //               />
                    //             ) : (
                    //               <SettingsItem info="Peşinat" numbers="0" />
                    //             )
                    //           ) : (
                    //             <SettingsItem info="Peşinat" numbers="0" />
                    //           )}

                    //           {paymentModalShowOrder != null ? (
                    //             JSON.parse(
                    //               item.projectHousingsList[
                    //                 paymentModalShowOrder
                    //               ]["payment-plan[]"]
                    //             ) &&
                    //             JSON.parse(
                    //               item.projectHousingsList[
                    //                 paymentModalShowOrder
                    //               ]["payment-plan[]"]
                    //             ).includes("taksitli") ? (
                    //               <SettingsItem
                    //                 info="Aylık Ödenecek Tutar"
                    //                 numbers={
                    //                   addDotEveryThreeDigits(
                    //                     (
                    //                       (item.projectHousingsList[
                    //                         paymentModalShowOrder
                    //                       ]["installments-price[]"] -
                    //                         item.projectHousingsList[
                    //                           paymentModalShowOrder
                    //                         ]["advance[]"]) /
                    //                       item.projectHousingsList[
                    //                         paymentModalShowOrder
                    //                       ]["installments[]"]
                    //                     ).toFixed(0)
                    //                   ) + "₺"
                    //                 }
                    //               />
                    //             ) : (
                    //               <SettingsItem
                    //                 info="Aylık Ödenecek Tutar"
                    //                 numbers="0"
                    //               />
                    //             )
                    //           ) : (
                    //             <SettingsItem
                    //               info="Aylık Ödenecek Tutar"
                    //               numbers="0"
                    //             />
                    //           )}

                    //           <Text>
                    //             {item.projectHousingsList[
                    //               paymentModalShowOrder
                    //             ] &&
                    //             item.projectHousingsList[
                    //               paymentModalShowOrder
                    //             ]["projected_earnings[]"] &&
                    //             item.projectHousingsList[
                    //               paymentModalShowOrder
                    //             ]["projected_earnings[]"] ? (
                    //               <SettingsItem
                    //                 info="Öngörülen Yıllık Kazanç"
                    //                 color={"green"}
                    //                 fontWeight={"700"}
                    //                 icon={
                    //                   <LinkIcon3
                    //                     name="arrow-up-circle"
                    //                     size={15}
                    //                     color={"green"}
                    //                   />
                    //                 }
                    //                 numbers={
                    //                   "%" +
                    //                   item.projectHousingsList[
                    //                     paymentModalShowOrder
                    //                   ]["projected_earnings[]"]
                    //                 }
                    //               />
                    //             ) : (
                    //               ""
                    //             )}
                    //           </Text>
                    //         </View>

                    //         <TouchableOpacity
                    //           style={{
                    //             backgroundColor: "#274abb",
                    //             padding: 10,
                    //             borderRadius: 5,
                    //           }}
                    //         >
                    //           <Text
                    //             style={{
                    //               textAlign: "center",
                    //               color: "white",
                    //               fontSize: 15,
                    //               fontWeight: "bold",
                    //             }}
                    //           >
                    //             Sepete Ekle
                    //           </Text>
                    //         </TouchableOpacity>
                    //       </View>
                    //     </View>
                    //   </Modal>
                    // </>
                  )}
                </View>
              )}
            />
          </View>
        ) : (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color="#333" />
          </View>
        )}
      </View>
      <View style={{ flex: 1, position: "absolute", bottom: 0 }}>
        <Animated.View
          style={{
            zIndex: 1,
            backgroundColor: "#eeeeee",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 20,
            paddingBottom: 30,
            paddingLeft: 10,
            paddingRight: 10,
            transform: [{ translateY }],
          }}
        >
          <ScrollView
            horizontal
            style={{ padding: 5 }}
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 27,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={style.shareIcons}>
                  <LinkIcon name="link" size={23} />
                </View>
                <Text>Kopyala</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={style.shareIcons}>
                  <LinkIcon2 name="whatsapp" size={23} />
                </View>
                <Text>Whatsapp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={style.shareIcons}>
                  <LinkIcon name="instagram" size={23} />
                </View>
                <Text>İnstagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={style.shareIcons}>
                  <LinkIcon2 name="facebook" size={23} />
                </View>
                <Text>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={style.shareIcons}>
                  <LinkIcon3 name="message-circle" size={23} />
                </View>
                <Text>Mesajlar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={style.shareIcons}>
                  <LinkIcon4 name="messenger" size={23} />
                </View>
                <Text>Messenger</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>

      <Modal
        isVisible={IsOpenSheet}
        onBackdropPress={() => setIsOpenSheet(false)}
        backdropColor="transparent"
        style={style.modal2}
        animationIn={"fadeInDown"}
        animationOut={"fadeOutDown"}
      >
        <View
          style={[
            style.card,
            {
              backgroundColor: "white",
              height: width > 400 ? "30%" : "37%",
              padding: 10,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            },
          ]}
        >
          <View style={{ gap: 7 }}>
            <View style={{ padding: 10, paddingTop: 25 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#333",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Paylaş
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ gap: 20 }}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 5,
                }}
              >
                <Icon
                  name="link"
                  size={32}
                  iconStyle={{ color: "#ffffff" }}
                  style={{
                    backgroundColor: "red",
                    padding: 12,
                    borderRadius: 8,
                  }}
                  reverseColor={"orange"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "#333",
                    textAlign: "center",
                    top: 5,
                  }}
                >
                  Bağlantı Kopyala
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SocialIcon
                  iconSize={30}
                  style={{ backgroundColor: "#52CD60", borderRadius: 8 }}
                  raised
                  type="whatsapp"
                />
                <Text
                  style={{ fontSize: 12, color: "#333", textAlign: "center" }}
                >
                  Whatsapp
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SocialIcon
                  iconSize={30}
                  style={{ backgroundColor: "#D33380", borderRadius: 8 }}
                  raised
                  type="instagram"
                />
                <Text
                  style={{ fontSize: 12, color: "#333", textAlign: "center" }}
                >
                  İnstagram
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SocialIcon
                  iconSize={30}
                  style={{ borderRadius: 8 }}
                  raised
                  type="facebook"
                />
                <Text
                  style={{ fontSize: 12, color: "#333", textAlign: "center" }}
                >
                  Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <SocialIcon
                  iconSize={30}
                  style={{ borderRadius: 8 }}
                  raised
                  type="twitter"
                />
                <Text
                  style={{ fontSize: 12, color: "#333", textAlign: "center" }}
                >
                  Twitter
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <View style={{ paddingTop: 20 }}>
              <TouchableOpacity
                onPress={() => setIsOpenSheet(false)}
                style={{
                  backgroundColor: "#F0F0F0",
                  padding: 17,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "#7A7A7A",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  İptal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={ColectionSheet}
        onBackdropPress={ToggleColSheet}
        animationIn={"fadeInDown"}
        animationOut={"fadeOutDown"}
        animationInTiming={200}
        animationOutTiming={200}
        backdropColor="transparent"
        style={style.modal2}
      >
        <View style={style.modalContent2}>
          <SafeAreaView>
            <View
              style={{
                padding: 20,
                paddingTop: 24,
                gap: 13,
                borderBottomWidth: 1,
                borderBottomColor: "#ebebeb",
              }}
            >
              <Text
                style={{
                  color: "#19181C",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                Koleksiyona Ekle
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: "#B2B2B2",
                  fontSize: 14,
                }}
              >
                Konutu koleksiyonlarından birine ekleyebilir veya yeni bir
                koleksiyon oluşturabilirsin
              </Text>
            </View>

            <ScrollView
              contentContainerStyle={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 4,
                gap: 10,
                paddingBottom: 100,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  setColectionSheet(false);
                  setTimeout(() => {
                    setaddCollection(true);
                  }, 700);
                }}
              >
                <View
                  style={{
                    padding: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon2 name="pluscircleo" size={27} color={"#19181C"} />
                </View>
                <View
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    padding: 15,
                    borderBottomColor: "#ebebeb",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#19181C",
                      fontWeight: "600",
                    }}
                  >
                    Yeni Oluştur
                  </Text>
                </View>
              </TouchableOpacity>
              {collections.map((item, index) => (
                <AddCollection
                  checkFunc={ıtemOnCollection}
                  setPopUpForRemoveItem={setsetPopUpForRemoveItem}
                  key={index}
                  item={item}
                  getCollectionId={getCollectionId}
                  removeItemOnCollection={removeItemOnCollection}
                  addLink={addSelectedCollection}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>

      <Modal
        isVisible={collectionAddedSucces}
        onBackdropPress={() => setcollectionAddedSucces(false)}
        animationIn={"fadeInDown"}
        animationOut={"fadeOutDown"}
        animationInTiming={200}
        animationOutTiming={200}
        backdropColor="transparent"
        style={style.modal4}
      >
        <View style={style.modalContent4}>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                textAlign: "center",
                color: "green",
                fontWeight: "500",
              }}
            >
              {selectedHouse} No'lu konutu {selectedCollectionName} adlı
              koleksiyonunuza eklendi
            </Text>
          </View>
        </View>
      </Modal>

      {/* */}
      <Modal
        isVisible={addCollection}
        onBackdropPress={() => setaddCollection(false)}
        animationIn={"fadeInRight"}
        animationOut={"lightSpeedOut"}
        animationInTiming={200}
        animationOutTiming={200}
        style={style.modal3}
      >
        <View style={style.modalContent3}>
          <ScrollView
            bounces={false}
            contentContainerStyle={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 4,
              gap: 10,
              paddingBottom: 20,
            }}
          >
            <SafeAreaView>
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ebebeb",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 0.5 / 2,
                  }}
                  onPress={() => {
                    setaddCollection(false);
                  }}
                >
                  <View
                    style={{
                      padding: 0,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name="close" size={27} color={"#19181C"} />
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1 / 2 }}>
                  <Text
                    style={{
                      color: "#19181C",
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "400",
                    }}
                  >
                    Koleksiyon Oluştur
                  </Text>
                </View>
              </View>
              <View
                style={{ gap: 6, justifyContent: "center", paddingTop: 20 }}
              >
                <Text style={{ fontSize: 13, color: "#19181C" }}>
                  Koleksiyon İsmi
                </Text>
                <TextInput
                  style={style.Input}
                  value={newCollectionNameCreate}
                  onChangeText={(value) => setnewCollectionNameCreate(value)}
                />
              </View>
              <View style={{ paddingTop: 80 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#EA2A28",
                    padding: 10,
                    borderRadius: 5,
                  }}
                  onPress={addCollectionPost}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    Koleksiyon Oluştur
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </ScrollView>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        onBackdropPress={() => setFormVisible(false)}
        visible={FormVisible}
        onRequestClose={() => {
          setFormVisible(false);
        }}
      >
        <View style={[style.centeredView, { padding: 0 }]}>
          <View style={[style.modalView, { height: "90%" }]}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {item?.project?.project_title} projesinde {paymentModalShowOrder}{" "}
              No'lu Konut Başvuru Formu
            </Text>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <View style={{ gap: 15 }}>
                <View style={{ gap: 7 }}>
                  <Text style={style.label}>Ad Soyad</Text>
                  <TextInput
                    style={style.Input}
                    value={nameid}
                    onChangeText={(value) => setNameId(value)}
                  />
                  {errorStatu == 1 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={style.label}>Telefon Numarası</Text>
                  <TextInput
                    style={style.Input}
                    value={phoneid}
                    onChangeText={(value) => setPhoneId(value)}
                  />
                  {errorStatu == 2 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={style.label}>E-Posta</Text>
                  <TextInput
                    style={style.Input}
                    value={emailid}
                    onChangeText={(value) => setEmailId(value)}
                  />
                  {errorStatu == 6 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={style.label} value={titleid}>
                    Meslek
                  </Text>
                  <TextInput
                    style={style.Input}
                    value={titleid}
                    onChangeText={(value) => setTitleId(value)}
                  />
                  {errorStatu == 3 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 7 }}>
                  <Text style={style.label}>Açıklama</Text>
                  <TextInput
                    style={style.Input}
                    value={offerid}
                    onChangeText={(value) => setOfferId(value)}
                  />
                  {errorStatu == 7 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>

                <View style={{ gap: 6 }}>
                  <Text
                    style={{ fontSize: 14, color: "grey", fontWeight: 600 }}
                  >
                    Şehir
                  </Text>
                  <RNPickerSelect
                    doneText="Tamam"
                    placeholder={{
                      label: "Şehir Seçiniz...",
                      value: null,
                    }}
                    style={pickerSelectStyles}
                    value={city}
                    onValueChange={(value) => {
                      onChangeCity(value);
                    }}
                    items={citites}
                  />
                  {errorStatu == 4 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
                <View style={{ gap: 6 }}>
                  <Text
                    style={{ fontSize: 14, color: "grey", fontWeight: 600 }}
                  >
                    İlçe
                  </Text>
                  <RNPickerSelect
                    doneText="Tamam"
                    placeholder={{
                      label: "İlçe Seçiniz...",
                      value: null,
                    }}
                    value={county}
                    style={pickerSelectStyles}
                    onValueChange={(value) => setcounty(value)}
                    items={counties}
                  />
                  {errorStatu == 5 && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                      {errorMessage}
                    </Text>
                  )}
                </View>
              </View>
            </KeyboardAwareScrollView>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#28A745",
                  width: "40%",
                  padding: 15,
                  borderRadius: 5,
                }}
                onPress={GiveOffer}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Gönder
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#DC3545",
                  width: "40%",
                  padding: 15,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setFormVisible(false);
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Kapat
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={showCoverImageModal}
        onBackdropPress={() => setCoverImageModal(false)}
        swipeDirection={["down"]}
        animationIn={"fadeInRightBig"}
        animationOut={"fadeOutDownBig"}
        onSwipeComplete={() => setCoverImageModal(false)}
        backdropColor="transparent"
        style={style.modalImage}
      >
        <View style={style.modalContentImage}>
          <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
            <TouchableOpacity onPress={() => setCoverImageModal(false)}>
              <CloseIcon name="close" color={"white"} size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={ModalForAddToCart}
        onBackdropPress={() => setModalForAddToCart(false)}
        animationType="fade" // veya "fade", "none" gibi
        transparent={true}
      >
        <View style={style.modalContent4}>
          <View style={{ padding: 10, gap: 10 }}>
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: 500 }}
            >
              Sepete eklemek istiyor musunuz ?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: "10",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#2778c4",
                  padding: 10,
                }}
                onPress={() => {
                  addToCard();
                }}
              >
                <Text style={{ color: "white", fontWeight: 700 }}>Evet</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#757575",
                  padding: 10,
                }}
                onPress={() => {
                  setModalForAddToCart(false);
                }}
              >
                <Text style={{ color: "white", fontWeight: 700 }}>Hayır</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width, height, fontScale } = Dimensions.get("window");
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    height: 170,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  opacity: {
    width: "100%",
    height: "100%",
    backgroundColor: "#DE4241E6",
    position: "absolute",
    zIndex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: "100%",
    height: width > 400 ? 90 : 80,
    backgroundColor: "blue",
  },
  UserInfo: {
    width: "50%",
    position: "absolute",
    zIndex: 1,
    top: "40%",
    left: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    width: "100%",
    height: "150%",
    top: 55,
    paddingLeft: 20,
    paddingRight: 20,
  },
  Settings: {
    gap: 40,
    top: 30,
    width: "100%",
    backgroundColor: "#FFFF",
    borderColor: "#e6e6e6",
  },
  headerText: {
    fontSize: 16,
    color: "grey",
  },
  PostContainer: {
    paddingBottom: 160,
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  ProfileInfoDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: width > 400 ? 50 : 20,
    zIndex: 2,
    left: 20,
  },
  ProfileImage: {
    width: 35,
    height: 35,
  },
  ProfileName: {
    alignItems: "center",
    justifyContent: "left",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    bottom: 2,
  },
  ProfileImageAndIcon: {
    gap: 10,
    right: 40,
  },
  shareIcons: {
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    bottom: 2,
  },
  centeredView: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // modal dışı koyu arkaplan
  },
  modalView: {
    width: "100%",

    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#1414148c",
  },
  modalContent2: {
    backgroundColor: "#fefefe",

    height: "52%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal3: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#1414148c",
  },
  modalContent3: {
    backgroundColor: "#fefefe",

    height: "100%",
  },
  Input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ebebeb",
  },
  label: {
    color: "grey",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#FFFFFF",
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
  modalImage: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContentImage: {
    backgroundColor: "black",
    justifyContent: "center",

    flex: 1,
  },
  Input: {
    backgroundColor: "#E6E6E6",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    fontSize: 14,
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
  InfoContainer: {
    paddingTop: width < 400 ? 30 : 50,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
