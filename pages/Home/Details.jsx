import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Button,
  Platform,
  Linking,
  ActivityIndicator,
  TextInput,
  Pressable,
} from "react-native";

import { React, useEffect, useRef, useState } from "react";
import Icon2 from "react-native-vector-icons/AntDesign";
import Caption from "../../components/Caption";
import Settings from "./RealtorPages/Settings";
import PagerView from "react-native-pager-view";
import Map from "../../components/Map";
import { SocialIcon, Icon } from "react-native-elements";
import * as Clipboard from "expo-clipboard";

import OtherHomeInProject from "../../components/OtherHomeInProject";

import FloorPlan from "../../components/FloorPlan";
import Information from "../../components/Information";

import LinkIcon from "react-native-vector-icons/Entypo";

import { useRoute } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Arrow from "react-native-vector-icons/MaterialIcons";
import Bookmark from "react-native-vector-icons/FontAwesome";
import SettingsItem from "../../components/SettingsItem";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import Categories from "../../components/Categories";
import Search from "./Search";
import SliderMenuDetails from "../../components/SliderMenuDetails";
import { apiRequestGet } from "../../components/methods/apiRequest";
import { addDotEveryThreeDigits } from "../../components/methods/merhod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CloseIcon from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-swiper";
import AddCollection from "../../components/AddCollection";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
export default function Details({ navigation }) {
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
  const apiUrl = "https://test.emlaksepette.com/";
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
  const route = useRoute();
  let debounceTimeout;
  const { slug, ProjectId } = route.params;

  const translateY = useRef(new Animated.Value(400)).current;
  const openModal = (roomOrder) => {
    setPaymentModalShowOrder(roomOrder);
    setModalVisible(!modalVisible);
  };
  const OpenFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };

  useEffect(() => {
    apiRequestGet("project/" + ProjectId).then((res) => {
      setData(res.data);
    });
  }, []);

  const getLastItemCount = () => {
    var lastBlockItemsCount = 0;
    for (var i = 0; i < selectedTab; i++) {
      lastBlockItemsCount += data.project.blocks[i].housing_count;
    }

    return lastBlockItemsCount;
  };

  const getBlockItems = (selectedOrder) => {
    var lastBlockItemsCount = 0;

    for (var i = 0; i < selectedOrder; i++) {
      lastBlockItemsCount += data.project.blocks[i].housing_count;
    }
    apiRequestGet(
      "project_housings/" +
        ProjectId +
        "?start=" +
        lastBlockItemsCount +
        "&end=" +
        (lastBlockItemsCount + 10)
    ).then((res) => {
      setData({
        ...data,
        projectHousingsList: res.data.housings,
      });

      setItemCount(10);
    });
  };

  const fetchHousings = (page) => {
    if (data.project.have_blocks) {
      if (page * 10 <= data.project.blocks[selectedTab].housing_count) {
        setIsLoading(true);
        apiRequestGet(
          "project_housings/" +
            ProjectId +
            "?start=" +
            page * 10 +
            "&end=" +
            ((page + 1) * 10 > data.project.blocks[selectedTab].housing_count
              ? data.project.blocks[selectedTab].housing_count
              : (page + 1) * 10)
        ).then((res) => {
          setData({
            ...data,
            projectHousingsList: {
              ...data.projectHousingsList,
              ...res.data.housings,
            },
          });
          setItemCount(
            (page + 1) * 10 > data.project.blocks[selectedTab].housing_count
              ? data.project.blocks[selectedTab].housing_count
              : (page + 1) * 10
          );
          setIsLoading(false);
        });
      }
    } else {
      if (page * 10 <= data.project.room_count) {
        setIsLoading(true);
        apiRequestGet(
          "project_housings/" +
            ProjectId +
            "?start=" +
            page * 10 +
            "&end=" +
            (page + 1) * 10
        ).then((res) => {
          setData({
            ...data,
            projectHousingsList: {
              ...data.projectHousingsList,
              ...res.data.housings,
            },
          });
          console.log(
            (page + 1) * 10 > data.project.room_count
              ? data.project.room_count
              : (page + 1) * 10
          );
          setItemCount(
            (page + 1) * 10 > data.project.room_count
              ? data.project.room_count
              : (page + 1) * 10
          );
          console.log("asd123123", page);
          setIsLoading(false);
        });
      }
    }
  };

  console.log(collections);

  const removeItemOnCollection = (collectionId) => {
    const collectionData = {
      item_type: 1,
      room_order: selectedHouse,
      item_id: data.project.id,
      collection_id: collectionId,
    };

    axios
      .post(
        "https://test.emlaksepette.com/api/remove_item_on_collection",
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
        console.log(newCollections, "qwe");
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };

  const shareLinkOnWhatsApp = () => {
    const url = `https://test.emlaksepette.com/proje/${data.project.slug}/1000${ProjectId}/detay`;

    const whatsappShareURL = `whatsapp://send?text=${encodeURIComponent(url)}`;

    Linking.openURL(whatsappShareURL)
      .then(() => console.log("WhatsApp açıldı ve link paylaşıldı"))
      .catch((error) => console.error("WhatsApp açılamadı:", error));
  };
  const shareLinkOnInstagram = (text) => {
    const url = `https://test.emlaksepette.com/${slug}/100${ProjectId}/detay`;

    const instagramShareURL = `instagram://story/?text=${encodeURIComponent(
      url
    )}`;

    Linking.openURL(instagramShareURL)
      .then(() => console.log("Instagram açıldı ve link paylaşıldı"))
      .catch((error) => console.error("Instagram açılamadı:", error));
  };
  const copyToClipboard = () => {
    const url = `https://test.emlaksepette.com/${slug}/1000${ProjectId}/detay`;
    Clipboard.setStringAsync(url);
    ShowAlert();
  };
  const handleShareViaSMS = (text) => {
    const url = text;
    const message = `Bu linki kontrol et: ${url}`;

    Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
  };
  const ShowAlert = () => {
    setshowAlert(true);
    setTimeout(() => {
      setshowAlert(false);
    }, 2000);
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const ToggleSheet = () => {
    setIsOpenSheet(!IsOpenSheet);
  };
  const ToggleColSheet = () => {
    setColectionSheet(!ColectionSheet);
  };
  const changeTab = (tabs) => {
    setTabs(tabs);
  };
  const [pagination, setpagination] = useState(0);

  const handlePageChange = (pageNumber) => {
    setpagination(pageNumber);
    setSelectedImage(pageNumber);
  };
  const [changeIcon, setchangeIcon] = useState(false);
  const toggleIcon = () => {
    setchangeIcon(!changeIcon);
  };
  const [showCoverImageModal, setCoverImageModal] = useState(false);
  const openGalery = (index) => {
    // setSelectedImage(index)
    setCoverImageModal(true);
  };
  const [selectedImage, setSelectedImage] = useState(0);

  const [selectedHouse, setselectedHouse] = useState(0);
  const openCollection = (id) => {
    setselectedHouse(id);
    setColectionSheet(true);
  };

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
    console.log(collections);
    try {
      if (user.access_token) {
        const response = await axios.get(
          "https://test.emlaksepette.com/api/client/collections",
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
        "https://test.emlaksepette.com/api/add/collection",
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
        console.log("Response:", response.data);
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
      .post("https://test.emlaksepette.com/api/addLink", collectionData, {
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
        console.log(newCollections);
        setcollections(newCollections);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };
  const [PopUpForRemoveItem, setPopUpForRemoveItem] = useState(false);
  console.log(selectedCollectionName2);

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={toggleDrawer} />
      <Modal
        isVisible={isDrawerOpen}
        onBackdropPress={() => setIsDrawerOpen(false)}
        animationIn="fadeInLeftBig"
        swipeDirection={["left"]}
        onSwipeComplete={() => setIsDrawerOpen(false)}
        animationOut="fadeOutLeftBig"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              backgroundColor: "#EA2C2E",
              flex: 0.7 / 2,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <SafeAreaView style={{ zIndex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HomePage");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Ana Sayfa"
                    bordernone="none"
                    ıconName="home"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Hesabım");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Hesabım"
                    bordernone="none"
                    ıconName="user"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("RealtorClubExplore");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Emlak Kulüp"
                    bordernone="none"
                    showImage={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Categories
                    category="İlan Ver"
                    bordernone="none"
                    ıconName="plus"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Categories
                    category="Sat Kirala"
                    bordernone="none"
                    ıconName="search-plus"
                  />
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
            <ImageBackground
              source={require("./MenuBg.jpg")}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                opacity: 0.2,
              }}
              resizeMode="cover"
              borderBottomLeftRadius={30}
              borderBottomRightRadius={30}
            />
          </View>
          <View style={{ backgroundColor: "white", flex: 1.3 / 2 }}>
            <Search onpres={toggleDrawer} />
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: data?.project.user?.banner_hex_code,
        }}
      >
        <TouchableOpacity
          style={{
            paddingLeft: 15,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
          onPress={() =>
            navigation.navigate("Profile", {
              name: "",
              id: data?.project?.user?.id,
            })
          }
        >
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <View style={{ height: 35, width: 35 }}>
              <ImageBackground
                source={{
                  uri: `${apiUrl}/storage/profile_images/${data?.project?.user?.profile_image}`,
                }}
                style={{ width: "100%", height: "100%" }}
                borderRadius={20}
              />
            </View>
            <Text style={{ color: "white" }}>
              {" "}
              {data?.project?.user?.name ? `${data?.project?.user?.name} ` : ""}
            </Text>
            <View
              style={{
                width: 18,
                height: 18,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinkIcon
                name="check"
                style={{ position: "absolute", zIndex: 1 }}
                color={"#333"}
              />
              <ImageBackground
                source={require("./BadgeYellow.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>

          <Arrow name="arrow-forward-ios" size={16} color={"white"} />
          <Text style={{ color: "white", fontSize: 15 }}>
            {" "}
            1000{data.project.id} No'lu proje
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
              if (!isLoading) {
                fetchHousings(page + 1);
                setPage(page + 1);
              }
            }, 1000); // 500ms içinde yeni bir istek yapılmazsa gerçekleştir
          }
        }}
      >
        <View style={{ height: 250 }}>
          <View style={styles.pagination}>
            <View
              style={{
                backgroundColor: "#333",
                padding: 5,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>
                {pagination + 1} / {data.project.images.length}
              </Text>
            </View>
          </View>

          <View style={styles.ıconContainer}>
            <TouchableOpacity onPress={() => setIsOpenSheet(true)}>
              <View style={styles.ıcon}>
                <Icon2 name="sharealt" size={18} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                changeHeart();
              }}
            >
              <View style={styles.ıcon}>
                <Heart
                  name={heart}
                  size={18}
                  color={heart == "hearto" ? "black" : "red"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <PagerView
            style={{ height: 250 }}
            initialPage={selectedImage}
            onPageSelected={(event) =>
              handlePageChange(event.nativeEvent.position)
            }
          >
            {data.project.images.map((image, index) => {
              // console.log(`${apiUrl}${image.image.replace("public",'storage')}`)
              return (
                <Pressable
                  key={index + 1}
                  onPress={() => {
                    openGalery(index);
                  }}
                >
                  <ImageBackground
                    source={{
                      uri: `${apiUrl}${image.image.replace(
                        "public",
                        "storage"
                      )}`,
                    }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Pressable>
              );
            })}
          </PagerView>
        </View>
        <View style={{ paddingTop: 8, gap: 10 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#333",
              fontWeight: "400",
            }}
          >
            {data?.project?.city?.title
              ? `${data.project.city.title} / ${data.project.county.ilce_title}`
              : ""}
          </Text>
          <Text style={{ textAlign: "center", fontSize: 16, color: "#264ABB" }}>
            {data?.project?.project_title}
          </Text>
        </View>
        <View>
          <SliderMenuDetails
            tab={tabs}
            setTab={setTabs}
            changeTab={changeTab}
          />
        </View>
        {tabs == 0 && (
          <OtherHomeInProject
            openCollection={openCollection}
            itemCount={itemCount}
            data={data}
            getLastItemCount={getLastItemCount}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            openmodal={openModal}
            getBlockItems={getBlockItems}
            OpenFormModal={OpenFormModal}
          />
        )}
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          {tabs == 1 && <Caption data={data} />}
        </View>
        {tabs == 2 && <Information settings={data} />}
        <View style={{}}>{tabs === 3 && <Map mapData={data} />}</View>

        {tabs == 4 && <FloorPlan />}

        <Modal
          animationType="slide" // veya "fade", "none" gibi
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: -5,
                  backgroundColor: "#333",
                  padding: 6,
                  zIndex: 1,
                  borderRadius: 30,
                  top: -15,
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Heart name="close" size={20} color={"white"} />
              </TouchableOpacity>
              <View style={{ backgroundColor: "#EEEEEE", padding: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                  {data?.project?.project_title} projesinde{" "}
                  {paymentModalShowOrder} No'lu ilan Ödeme Planı
                </Text>
              </View>
              <View>
                <SettingsItem
                  info="Peşin Fiyat"
                  numbers={
                    paymentModalShowOrder != null
                      ? addDotEveryThreeDigits(
                          data.projectHousingsList[paymentModalShowOrder][
                            "price[]"
                          ]
                        ) + " ₺"
                      : "0"
                  }
                />
                {paymentModalShowOrder != null ? (
                  JSON.parse(
                    data.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ) &&
                  JSON.parse(
                    data.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ).includes("taksitli") ? (
                    <SettingsItem
                      info="Taksitli 12 Ay Fiyat"
                      numbers={
                        addDotEveryThreeDigits(
                          data.projectHousingsList[paymentModalShowOrder][
                            "installments-price[]"
                          ]
                        ) + "₺"
                      }
                    />
                  ) : (
                    <SettingsItem info="Taksitli 12 Ay Fiyat" numbers="0" />
                  )
                ) : (
                  <SettingsItem info="Taksitli 12 Ay Fiyat" numbers="0" />
                )}
                {paymentModalShowOrder != null ? (
                  JSON.parse(
                    data.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ) &&
                  JSON.parse(
                    data.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ).includes("taksitli") ? (
                    <SettingsItem
                      info="Peşinat"
                      numbers={
                        addDotEveryThreeDigits(
                          data.projectHousingsList[paymentModalShowOrder][
                            "advance[]"
                          ]
                        ) + "₺"
                      }
                    />
                  ) : (
                    <SettingsItem info="Peşinat" numbers="0" />
                  )
                ) : (
                  <SettingsItem info="Peşinat" numbers="0" />
                )}

                {paymentModalShowOrder != null ? (
                  JSON.parse(
                    data.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ) &&
                  JSON.parse(
                    data.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ).includes("taksitli") ? (
                    <SettingsItem
                      info="Aylık Ödenecek Tutar"
                      numbers={
                        addDotEveryThreeDigits(
                          (
                            (data.projectHousingsList[paymentModalShowOrder][
                              "installments-price[]"
                            ] -
                              data.projectHousingsList[paymentModalShowOrder][
                                "advance[]"
                              ]) /
                            data.projectHousingsList[paymentModalShowOrder][
                              "installments[]"
                            ]
                          ).toFixed(0)
                        ) + "₺"
                      }
                    />
                  ) : (
                    <SettingsItem info="Aylık Ödenecek Tutar" numbers="0" />
                  )
                ) : (
                  <SettingsItem info="Aylık Ödenecek Tutar" numbers="0" />
                )}
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#EA2C2E",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Sepete Ekle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={IsOpenSheet}
          onBackdropPress={() => setIsOpenSheet(false)}
          backdropColor="transparent"
          style={styles.modal2}
          animationIn={"fadeInDown"}
          animationOut={"fadeOutDown"}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: "white",
                height: "30%",
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
              <ScrollView horizontal contentContainerStyle={{ gap: 20,}} showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={{alignItems:'center',justifyContent:'center',paddingTop:5}}>
      <Icon
        name="link"
    size={32}
                  iconStyle={{color:'#ffffff'}}
        style={{backgroundColor:'red',padding:12,borderRadius:8}}
        reverseColor={'orange'}
   
      />
      <Text
                    style={{ fontSize: 12, color: "#333", textAlign: "center",top:5 }}
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
              {/* <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 27,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }} onPress={copyToClipboard}>
                <View style={{backgroundColor:'#E54242',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon name="link" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>Kopyala</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center"}} onPress={shareLinkOnWhatsApp}>
                <View style={{backgroundColor:'#24D366',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon2 name="whatsapp" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>Whatsapp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }} onPress={shareLinkOnInstagram}>
                <View style={{backgroundColor:'#E1306C',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon name="instagram" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>İnstagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={{backgroundColor:'#1877F2',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon2 name="facebook" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={{backgroundColor:'#51b0e6',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon3 name="message-circle" size={23} color={'white'}/>
                </View>
                <Text style={{color:'#333',fontSize:12}}>Mesajlar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={{backgroundColor:'#7698E3',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon4 name="messenger" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>Messenger</Text>
              </TouchableOpacity>
            </View> */}
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
          style={styles.modal2}
        >
          <View style={styles.modalContent2}>
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
                    <Icon name="pluscircleo" size={27} color={"#19181C"} />
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
                    setPopUpForRemoveItem={setPopUpForRemoveItem}
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
          style={styles.modal4}
        >
          <View style={styles.modalContent4}>
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

        {/* <Modal
          isVisible={PopUpForRemoveItem}
          onBackdropPress={()=>setPopUpForRemoveItem(false)}
      
          animationIn={'zoomInUp'}
          animationOut={'zoomOutUp'}
          animationInTiming={200}
          animationOutTiming={200}
          backdropColor="transparent"
          style={styles.modal4}
        >
          <View style={styles.modalContent4}>
            <View style={{padding:10,gap:10}}>
           <Text style={{textAlign:'center'}}>{selectedHouse} No'lu konutu {selectedCollectionName} adlı koleksiyonunuzdan kaldırmak istediğinize eminmisiniz</Text>
           <View style={{flexDirection:'row',justifyContent:'center',gap:20}}>

            <TouchableOpacity style={{backgroundColor:'green',padding:10,paddingLeft:20,paddingRight:20,borderRadius:6}}>
              <Text style={{color:'white'}}>Evet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:'#e44242',padding:10,paddingLeft:20,paddingRight:20,borderRadius:6}}
                onPress={()=>{
                  setPopUpForRemoveItem(false)
                }}
            >
              <Text style={{color:'white'}}>Hayır</Text>
            </TouchableOpacity>

           </View>

            </View>
                    
          </View>
        </Modal> */}
        <Modal
          isVisible={addCollection}
          onBackdropPress={() => setaddCollection(false)}
          animationIn={"fadeInRight"}
          animationOut={"lightSpeedOut"}
          animationInTiming={200}
          animationOutTiming={200}
          style={styles.modal3}
        >
          <View style={styles.modalContent3}>
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
                    style={styles.Input}
                    value={newCollectionNameCreate}
                    onChangeText={(value) => setnewCollectionNameCreate(value)}
                  />
                </View>
                <View style={{ paddingTop: 80 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#EA2A28",
                      padding: 10,
                      borderRadius: 6,
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
          animationType="slide"
          transparent={true}
          onBackdropPress={() => setFormVisible(false)}
          visible={FormVisible}
          onRequestClose={() => {
            setFormVisible(false);
          }}
        >
          <View style={[styles.centeredView, { padding: 0 }]}>
            <View style={[styles.modalView, { height: "90%" }]}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {data?.project?.project_title} projesinde{" "}
                {paymentModalShowOrder} No'lu Konut Başvuru Formu
              </Text>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{ gap: 15 }}>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>Ad Soyad</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>Telefon Numarası</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>E-Posta</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>Meslek</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>İl</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>İlçe</Text>
                    <TextInput style={styles.Input} />
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
                    borderRadius: 10,
                  }}
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
                    borderRadius: 10,
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

        <View style={{ padding: 10 }}>
          <ActivityIndicator
            size="large"
            color="grey"
            style={{ display: isLoading ? "flex" : "none" }}
          />
        </View>
        <Modal
          isVisible={showCoverImageModal}
          onBackdropPress={() => setCoverImageModal(false)}
          swipeDirection={["down"]}
          animationIn={"fadeInRightBig"}
          animationOut={"fadeOutDownBig"}
          onSwipeComplete={() => setCoverImageModal(false)}
          backdropColor="transparent"
          style={styles.modalImage}
        >
          <View style={styles.modalContentImage}>
            <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
              <TouchableOpacity onPress={() => setCoverImageModal(false)}>
                <CloseIcon name="close" color={"white"} size={30} />
              </TouchableOpacity>
            </View>

            <PagerView
              style={{ height: 300 }}
              initialPage={selectedImage}
              onPageSelected={(event) =>
                handlePageChange(event.nativeEvent.position)
              }
            >
              {data.project.images.map((image, index) => {
                // console.log(`${apiUrl}${image.image.replace("public",'storage')}`)
                return (
                  <Pressable
                    key={index + 1}
                    onPress={() => setCoverImageModal(true)}
                  >
                    <ImageBackground
                      source={{
                        uri: `${apiUrl}${image.image.replace(
                          "public",
                          "storage"
                        )}`,
                      }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </Pressable>
                );
              })}
            </PagerView>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: 25,
      },
    }),
  },
  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
  pagination: {
    position: "absolute",
    zIndex: 1,
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    bottom: 0,
    alignItems: "center",

    width: "100%",
  },
  ıconContainer: {
    width: 50,
    height: 150,
    backgroundColor: "transparent",
    position: "absolute",
    right: 7,
    top: 42,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 20,
    zIndex: 1,
  },
  ıcon: {
    backgroundColor: "#FFFFFFAD",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
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
    borderRadius: 6,
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
    borderRadius: 6,
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
    borderRadius: 10,
  },
});
