import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  Linking,

  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { React, useEffect, useRef, useState } from "react";
import Icon2 from "react-native-vector-icons/AntDesign";
import Caption from "../../components/Caption";
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
import AddCollection from "../../components/AddCollection";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { styles } from "./Details";
import DrawerMenu from "../../components/DrawerMenu";
import { ActivityIndicator } from "react-native-paper";

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
  const apiUrl = "https://private.emlaksepette.com/";
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
          setItemCount(
            (page + 1) * 10 > data.project.room_count
              ? data.project.room_count
              : (page + 1) * 10
          );
          setIsLoading(false);
        });
      }
    }
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
        "https://private.emlaksepette.com/api/remove_item_on_collection",
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

  const shareLinkOnWhatsApp = () => {
    const url = `https://private.emlaksepette.com/proje/${data.project.slug}/1000${ProjectId}/detay`;

    const whatsappShareURL = `whatsapp://send?text=${encodeURIComponent(url)}`;

    Linking.openURL(whatsappShareURL)
      .then(() => console.log("WhatsApp açıldı ve link paylaşıldı"))
      .catch((error) => console.error("WhatsApp açılamadı:", error));
  };
  const shareLinkOnInstagram = (text) => {
    const url = `https://private.emlaksepette.com/${slug}/100${ProjectId}/detay`;

    const instagramShareURL = `instagram://story/?text=${encodeURIComponent(
      url
    )}`;

    Linking.openURL(instagramShareURL)
      .then(() => console.log("Instagram açıldı ve link paylaşıldı"))
      .catch((error) => console.error("Instagram açılamadı:", error));
  };
  const copyToClipboard = () => {
    const url = `https://private.emlaksepette.com/${slug}/1000${ProjectId}/detay`;
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
    try {
      if (user.access_token) {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/client/collections",
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
        "https://private.emlaksepette.com/api/add/collection",
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
      .post("https://private.emlaksepette.com/api/addLink", collectionData, {
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
  const [PopUpForRemoveItem, setPopUpForRemoveItem] = useState(false);
  const { width, height } = Dimensions.get("window");

  const [users, setUsers] = useState({});
  const [İsLoggedIn, setisLoggedIn] = useState(true);

  useEffect(() => {
    getValueFor("user", setUsers);
  }, []);

  const [userid, setUserId] = useState("");
  const [storeid, setStoreId] = useState("");
  const [projectid, setProjectId] = useState("");
  const [roomid, setRoomId] = useState("");
  const [emailid, setEmailId] = useState("");
  const [nameid, setNameId] = useState("");

  const [phoneid, setPhoneId] = useState("");
  const [cityid, setCityId] = useState("");
  const [countyid, setCountyId] = useState("");
  const [titleid, setTitleId] = useState("");
  const [offerid, setOfferId] = useState("");
  const [approvalid, setApprovalId] = useState("");
  const [responseid, setResponseId] = useState("");
  const [salesid, setSalesId] = useState("");
  const [offerresid, settOfferresid] = useState("");

  const [createdid, setCreatedId] = useState("");

  const postData = async () => {
    try {
      var formData = new FormData();
      formData.append("name", nameid);
      formData.append("phone", phoneid);
      formData.append("email", emailid);
      formData.append("city_id", cityid);
      formData.append("county_id", countyid);
      formData.append("title", titleid);
      formData.append("offer_description", offerid);

      const response = await axios.post(
        "https://private.emlaksepette.com/api/institutional/give_offer",
        formData
      );

      openModal(JSON.stringify(response.data.message));
      color("#d4edda");
      setNameid("");
      setPhoneid("");
      setEmailid("");
      setCityiid("");
      setCountyid("");
      setTitleid("");
      setOfferid("");
    } catch (error) {
      // Hata durumunda
      openModal("Tüm Alanları Doldurunuz");
      color("#F8D7DA");
      console.error("Hata:", error + "post isteği başarısız ");
    }
  };

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
              flex: 1 / 3,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
          <DrawerMenu setIsDrawerOpen={setIsDrawerOpen}/>
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
                borderRadius: 5,
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
            openModal={openModal}
            getBlockItems={getBlockItems}
            OpenFormModal={OpenFormModal}
          />
        )}
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          {tabs == 1 && <Caption data={data} />}
        </View>
        {tabs == 2 && <Information settings={data} />}
        <View style={{}}>{tabs === 3 && <Map mapData={data} />}</View>

        {tabs == 4 && <FloorPlan data={data} />}

        <Modal
          animationType="fade" // veya "fade", "none" gibi
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
                  borderRadius: 5,
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
                    <Text
                      value={nameid}
                      onChangeValue={(value) => setNameId(value)}
                      style={styles.label}
                      onChangeText={(value) => setNameId("name", value)}
                    >
                      Ad Soyad
                    </Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text
                      style={styles.label}
                      value={phoneid}
                      onChangeText={(value) => setPhoneId("phoneid", value)}
                    >
                      Telefon Numarası
                    </Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text
                      style={styles.label}
                      value={emailid}
                      onChangeText={(value) => setEmailId("emailid", value)}
                    >
                      E-Posta
                    </Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text
                      style={styles.label}
                      value={titleid}
                      onChangeText={(value) => setTitleId("titleid", value)}
                    >
                      Meslek
                    </Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text
                      style={styles.label}
                      value={cityid}
                      onChangeText={(value) => setCity("cityid", value)}
                    >
                      İl
                    </Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text
                      style={styles.label}
                      value={countyid}
                      onChangeText={(value) => setCounty("countyid", value)}
                    >
                      İlçe
                    </Text>
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
                    borderRadius: 5,
                  }}
                  onPress={handleSubmit}
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

        <View style={{ padding: 10 }}>
          <ActivityIndicator
            size="large"
            color="#333"
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
