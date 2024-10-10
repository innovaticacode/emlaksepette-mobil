import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
  Linking,
  TextInput,
  Pressable,
  Share,
  Dimensions,
} from "react-native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import { React, useEffect, useRef, useState } from "react";
import Icon2 from "react-native-vector-icons/AntDesign";
import Caption from "../../components/Caption";
import PagerView from "react-native-pager-view";
import Map from "../../components/Map";
import { Icon } from "react-native-elements";
import OtherHomeInProject from "../../components/OtherHomeInProject";
import FloorPlan from "../../components/FloorPlan";
import Information from "../../components/Information";
import LinkIcon from "react-native-vector-icons/Entypo";
import { useRoute } from "@react-navigation/native";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import SliderMenuDetails from "../../components/SliderMenuDetails";
import { apiRequestGet } from "../../components/methods/apiRequest";
import AddCollection from "../../components/AddCollection";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import DrawerMenu from "../../components/Menu/DrawerMenu/DrawerMenu";
import { ActivityIndicator } from "react-native-paper";
import AwesomeAlert from "react-native-awesome-alerts";
import CommentForProject from "../../components/CommentForProject";
import ImageViewing from "react-native-image-viewing";
import TextAlertModal from "../../components/TextAlertModal";

export default function Details({ navigation }) {
  const apiUrl = "https://private.emlaksepette.com/";
  const [ColectionSheet, setColectionSheet] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(0);
  const [tabs, setTabs] = useState(0);
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemCount, setItemCount] = useState(10);
  const [paymentModalShowOrder, setPaymentModalShowOrder] = useState(null);
  const [user, setUser] = useState({});
  const [FormVisible, setFormVisible] = useState(false);
  const [selectedBlockx, setSelectedBlockx] = useState(0);
  const [lastBlockItemCount, setLastBlockItemCount] = useState(0);
  const [showInstallment, setShowInstallment] = useState(false);
  const scrollViewRef = useRef();
  const [PopUpForRemoveItem, setsetPopUpForRemoveItem] = useState(false);
  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setloadingDetails] = useState(false);
  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const [DeleteAlert, setDeleteAlert] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [addCollection, setaddCollection] = useState(false);
  const [newCollectionNameCreate, setnewCollectionNameCreate] = useState("");
  const translateY = useRef(new Animated.Value(400)).current;
  const [SeeAlertModal, setSeeAlertModal] = useState(false)
  const [selectedHouse, setselectedHouse] = useState(0);
  const [collections, setcollections] = useState([]);
  const [selectedCollectionName, setselectedCollectionName] = useState("");
  const [selectedCollectionId, setselectedCollectionId] = useState(0);
  const [selectedCollectionName2, setselectedCollectionName2] = useState("");
  const [selectedroomId, setselectedroomId] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setindex] = useState(0);
  const [tab, settab] = useState(0);
  const [AlertForSign, setAlertForSign] = useState(false);
  const [comments, setcomments] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const route = useRoute();
  let debounceTimeout;
  const { slug, ProjectId, ımage } = route.params;

  const [data, setData] = useState({
    project: {
      room_count: 0,
      roomInfo: [],
      images: [],
      location: "0,0",
    },
    projectHousingsList: {},
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };

  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };

  const openModal = (roomOrder) => {
    setPaymentModalShowOrder(roomOrder);
    if (
      JSON.parse(
        data.projectHousingsList[roomOrder]["payment-plan[]"]
      ).includes("taksitli")
    ) {
      setShowInstallment(true);
    } else {
      setShowInstallment(false);
    }
    setModalVisible(!modalVisible);
  };

  const OpenFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };

  const GetUserInfo = async () => {
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(
          "https://private.emlaksepette.com/api/users/" + user?.id,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userData);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
    }
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${user?.access_token}` },
    };
    axios
      .get("https://private.emlaksepette.com/api/project/" + ProjectId, config)
      .then((res) => {
        setData(res?.data);
        setloadingDetails(true);
        GetUserInfo();
      }).finally(() => {
        setloadingDetails(false)

      })

  }, [ProjectId, user]);

  const getLastItemCount = () => {
    var lastBlockItemsCount = 0;
    for (var i = 0; i < selectedTab; i++) {
      lastBlockItemsCount += data.project.blocks[i].housing_count;
    }
    return lastBlockItemsCount;
  };

  const getBlockItems = (selectedOrder) => {
    var lastBlockItemsCount = 0;
    setIsLoading(true);
    for (var i = 0; i < selectedOrder; i++) {
      lastBlockItemsCount += data.project.blocks[i].housing_count;
    }
    setItemCount(10);
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

      setIsLoading(false);
    });
  };

  const fetchHousings = (page) => {
    if (data.project.have_blocks) {
      if (page * 10 < data.project.blocks[selectedTab].housing_count) {
        apiRequestGet(
          "project_housings/" +
          ProjectId +
          "?start=" +
          (parseInt(lastBlockItemCount) + parseInt(page * 10)) +
          "&end=" +
          ((page + 1) * 10 > data.project.blocks[selectedTab].housing_count
            ? parseInt(lastBlockItemCount) +
            parseInt(data.project.blocks[selectedTab].housing_count)
            : parseInt(lastBlockItemCount) + parseInt((page + 1) * 10))
        ).then((res) => {
          // console.log(res);
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
      if (page * 10 < data.project.room_count) {
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
        setColectionSheet(false);
        setTimeout(() => {
          setDeleteAlert(true);
        }, 700);

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
        setaddCollection(false);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const ToggleColSheet = () => {
    setColectionSheet(!ColectionSheet);
  };

  const changeTab = (tabs) => {
    setTabs(tabs);
  };

  const openCollection = (id) => {
    setselectedHouse(id);
    setColectionSheet(true);
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

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

  const filterEmojis = (text) => {
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    return text.replace(emojiRegex, "");
  };

  const handleChangeText = (input) => {
    const filteredText = filterEmojis(input);
    setnewCollectionNameCreate(filteredText);
  };

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
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title:
              user.type == 2 && user.corporate_type == "Emlak Ofisi"
                ? `${newCollectionNameCreate} Adlı portföyünüz oluşturuldu `
                : `${newCollectionNameCreate} Adlı koleksiyonunuz oluşturuldu `,
            textBody:
              user.type == 2 && user.corporate_type == "Emlak Ofisi"
                ? `${selectedHouse} No'lu Konut ${newCollectionNameCreate} Adlı Portföyünüze Eklendi`
                : `${selectedHouse} No'lu Konut ${newCollectionNameCreate} Adlı Koleksiyonuza Eklendi`,
            button: "Tamam",
          });
        }, 700);
        // Başarılı yanıtı işleyin
        setselectedCollectionName(response.data.collection.name);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };

  const getCollectionId = (id, name) => {
    setselectedCollectionId(id);
    setselectedCollectionName2(name);
  };

  const addSelectedCollection = (id, name) => {
    const collectionData = {
      collection_name: name,
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
          setColectionSheet(false);
        }, 500);

        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,

            title:
              user.type == 2 && user.corporate_type == "Emlak Ofisi"
                ? "Portföye ekleme başarılı"
                : "Koleksiyona ekleme başarılı",
            textBody:
              user.type == 2 && user.corporate_type == "Emlak Ofisi"
                ? `${selectedHouse} No'lu Konut ${name} Adlı Portöyünüze Eklendi`
                : `${selectedHouse} No'lu Konut ${name} Adlı Koleksiyonuza Eklendi`,
            button: "Tamam",
          });
        }, 700);

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

  const GetIdForCart = (id) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
  };

  const getRoomID = (id) => {
    setselectedroomId(id);
  };

  useEffect(() => {
    if (data?.project?.image && data.project.images) {
      // data.project.image'i uygun formata dönüştürün
      const imageObject = { image: data?.project?.image };

      // data.project.image'i dizinin başına ekleyin
      const updatedImages = [imageObject, ...data?.project?.images];
      setGalleries(updatedImages);
    } else if (data.project.images) {
      setGalleries(data.project.images);
    }
  }, [data]);

  const images = galleries.map((image) => ({
    uri: `${apiUrl}${image?.image.replace("public", "storage")}`,
  }));

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://private.emlaksepette.com/ilan/${data?.housing?.step1_slug}-${data?.housing?.step2_slug}-${data?.housing?.slug}/2000${data?.housing?.id}/detay`,
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

  const fetchCommentTotalRate = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/project/${ProjectId}/comments`
        );
        setcomments(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCommentTotalRate();
  }, [user]);

  const totalRate = comments
    .map((item) => parseFloat(item?.rate) || 0)
    .reduce((acc, rate) => acc + rate, 0);

  const handleOpenPhone = () => {
    let phoneNumber;

    // Eğer data?.housing?.user?.phone varsa ve area_code mevcutsa
    if (data?.project?.user?.phone && data?.project?.user?.area_code) {
      // Alan kodu ve telefon numarasını birleştir
      phoneNumber = `90${data.project?.user.area_code}${data?.project?.user?.phone}`;
    }
    // Eğer data?.housing?.mobile_phone varsa
    else if (data?.project?.user.mobile_phone) {
      // Telefon numarası başında 0 ile başlıyorsa 0'ı kaldır ve +90 ekle
      phoneNumber = data.project?.user?.mobile_phone.startsWith("0")
        ? `90${data.project?.user?.mobile_phone.slice(1)}`
        : `90${data.project?.user?.mobile_phone}`;
    }

    // Telefon numarasını kontrol et ve URL'yi oluştur
    if (phoneNumber) {
      // Numara başında + ekle
      Linking.openURL(`tel:+${phoneNumber}`);
    } else {
      console.error("Telefon numarası bulunamadı.");
    }
  };
const {width,height}=Dimensions.get("window")
  return (
    <>
      <AlertNotificationRoot>
        <SafeAreaView style={styles.container}>
          {loading == true ? (
            <ActivityIndicator size={"large"} color="#333" />
          ) : (
            <>
              <Header onPress={toggleDrawer} index={setindex} tab={settab} />
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
                  <DrawerMenu setIsDrawerOpen={setIsDrawerOpen} />
                </View>
              </Modal>
              <View style={{ position: 'absolute', width: '100%', bottom: 0, paddingBottom:Platform.OS ==='android'? width * 0.05:width * 0.07,paddingTop:9, zIndex: 1, flexDirection: 'row', justifyContent: 'space-around',backgroundColor:'#F2F2F2' }}>
                <TouchableOpacity style={{ width: '45%', backgroundColor: '#EA2B2E', padding: 12, borderRadius: 8 }} onPress={handleOpenPhone}>
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: '600', textAlign: 'center' }} >Ara</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '45%', backgroundColor: '#EA2B2E', padding: 12, borderRadius: 8 }} onPress={() => {
                  navigation.navigate("Profile", {
                    name: "",
                    id: data?.project?.user?.id,
                  })
                }}>
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: '600', textAlign: 'center' }}>Satış Noktalarını Gör</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: data?.project.user?.banner_hex_code,
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                  onPress={() =>
                    navigation.navigate("Profile", {
                      name: "",
                      id: data?.project?.user?.id,
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 6,
                      alignItems: "center",
                    }}
                  >
                    <View style={{ height: 35, width: 35 }}>
                      <ImageBackground
                        source={{
                          uri: `${apiUrl}/storage/profile_images/${data?.project?.user?.profile_image}`,
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          marginRight: 10,
                        }}
                        borderRadius={20}
                      />
                    </View>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: 12,
                        paddingLeft: 10,
                      }}
                    >
                      {data?.project?.user?.name
                        ? `${data?.project?.user?.name} `
                        : ""}
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
                        source={require("../../src/assets/images/BadgeYellow.png")}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                  </View>

                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 12,
                      paddingLeft: "10px",
                    }}
                  >
                    Proje No: {1000000 + data.project.id}
                  </Text>
                </TouchableOpacity>
              </View>


              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ paddingBottom: 80 }}
                scrollEventThrottle={16}
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    if (data.project.have_blocks) {
                      console.log(
                        (page + 1) * 10,
                        data.project.blocks[selectedTab].housing_count
                      );
                      if (
                        (page + 1) * 10 <
                        data.project.blocks[selectedTab].housing_count
                      ) {
                        setIsLoading(true);
                        clearTimeout(debounceTimeout);
                        debounceTimeout = setTimeout(() => {
                          if (!isLoading) {
                            fetchHousings(page + 1);
                            setPage(page + 1);
                          }
                        }, 1000); // 500ms içinde yeni bir istek yapılmazsa gerçekleştir
                      } else {
                        setIsLoading(false);
                      }
                    } else {
                      if ((page + 1) * 10 < data.project.room_count) {
                        setIsLoading(true);
                        clearTimeout(debounceTimeout);
                        debounceTimeout = setTimeout(() => {
                          if (!isLoading) {
                            fetchHousings(page + 1);
                            setPage(page + 1);
                          }
                        }, 1000); // 500ms içinde yeni bir istek yapılmazsa gerçekleştir
                      }
                    }
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
                        {pagination + 1} / {galleries.length}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ıconContainer}>
                    <TouchableOpacity onPress={onShare}>
                      <View style={styles.ıcon}>
                        <Icon2 name="sharealt" size={18} />
                      </View>
                    </TouchableOpacity>

                  </View>
                  <View style={styles.clubRateContainer}>
                    {user &&
                      user.corporate_type == "Emlak Ofisi" &&
                      data.project.club_rate && (
                        <View style={styles.commissionBadge}>
                          <Text style={styles.commissionText}>
                            %{data.project.club_rate} KOMİSYON!
                          </Text>
                        </View>
                      )}
                  </View>

                  <PagerView
                    style={{ height: 250 }}
                    initialPage={pagination}
                    onPageSelected={(e) =>
                      setPagination(e.nativeEvent.position)
                    }
                  >
                    {galleries.map((image, index) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          setCurrentIndex(index);
                          setIsVisible(true);
                        }}
                      >
                        <ImageBackground
                          source={{
                            uri: `${apiUrl}${image?.image.replace(
                              "public",
                              "storage"
                            )}`,
                          }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Pressable>
                    ))}
                  </PagerView>

                  <ImageViewing
                    images={images}
                    imageIndex={currentIndex}
                    visible={isVisible}
                    onRequestClose={() => setIsVisible(false)}
                  />
                </View>
                {
                  user.corporate_type !== 'Emlak Ofisi' &&
                  <TouchableOpacity style={{ padding: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }} onPress={() => {
                    navigation.navigate("Profile", {
                      name: "",
                      id: data?.project?.user?.id,
                    })
                  }}>
                    <Text style={{ fontSize: 13, color: '#ED3135', fontWeight: '600' }}>Satış Noktalarında Alırsanız %2 İndirim</Text>
                    <Icon2 name="arrowright" size={17} color={'#ED3135'} />
                  </TouchableOpacity>
                }

                <View
                  style={styles.CaptionPriceAndSlider}
                >
                  {totalRate != 0 && (
                    <View
                      style={{
                        position: "absolute",
                        right: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        top: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#264ABB",
                          fontWeight: "600",
                          fontSize: 13,
                        }}
                      >
                        {(totalRate / comments.length).toFixed(1)}
                      </Text>
                      <Icon2 name="star" color={"gold"} />
                    </View>
                  )}
                  <View style={{ width: '100%' }}>
                    <View style={{ gap: 5, width: '70%' }}>
                      <Text
                        style={{

                          fontSize: 11,
                          color: "#333",
                          fontWeight: "600",
                        }}
                      >
                        {data?.project?.city?.title
                          ? `${data.project.city.title} / ${data.project.county.ilce_title} `
                          : ""}
                      </Text>
                      <Text
                        style={{

                          fontSize: 16,
                          color: "#333",
                          fontWeight: "600",
                        }}
                      >
                        {data?.project?.project_title?.toLocaleUpperCase('tr-TR')}
                      </Text>
                    </View>

                  </View>

                  <View>
                    <SliderMenuDetails
                      tab={tabs}
                      setTab={setTabs}
                      changeTab={changeTab}
                    />
                  </View>

                </View>
                {/* {
                  data?.isShareLink?.length!==0 &&
                  <View style={{paddingTop:6,paddingBottom:2,width:'100%',alignItems:'center'}}>
                  <View style={{padding:6,backgroundColor:'#ffc9ca',borderRadius:8,flexDirection:'row',gap:5,width:'95%'}}>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:45,height:45}}>
                      <ImageBackground source={Megaphone} style={{width:'100%',height:'100%'}}/>
                    </View>
                    </View>
                   
                    <View style={{width:'85%'}}>
                      <Text style={{color:'#EA2C2E',fontSize:14,fontWeight:'700'}}>Harika bir haberimiz var!</Text>
                      <Text style={{color:'#721C23',fontSize:13}}>
                      Bu projenin ilanlarını , emlak ofislerinin özel koleksiyonlarından şimdi çok daha uygun fiyatlarla satın alabilirsiniz. <Text style={{fontWeight:'700'}}>Satış noktalarına</Text> hemen göz atın! 
                      </Text>
                    </View>
                  </View>
                 </View>
                } */}

                <View style={{ marginTop: 5 }}>
                  <View style={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: '#EA2B2E', padding: 5, borderRadius: 6, backgroundColor: 'white' }} onPress={() => {
                      setSeeAlertModal(true)
                    }}>
                      <Text style={{ textAlign: 'center', fontSize: 13, color: '#EA2B2E', fontWeight: '600' }}>Bilgilendirme!</Text>
                    </TouchableOpacity>
                  </View>
                  {tabs == 0 && (
                    <OtherHomeInProject
                      GetID={getRoomID}
                      GetIdForCart={GetIdForCart}
                      openCollection={openCollection}
                      itemCount={itemCount}
                      data={data}
                      getLastItemCount={getLastItemCount}
                      setSelectedTab={setSelectedTab}
                      selectedTab={selectedTab}
                      openModal={openModal}
                      isLoading={isLoading}
                      getBlockItems={getBlockItems}
                      OpenFormModal={OpenFormModal}
                      selectedBlock={selectedBlockx}
                      setSelectedBlock={setSelectedBlockx}
                      setLastBlockItemCount={setLastBlockItemCount}
                      lastBlockItemCount={lastBlockItemCount}
                      setPage={setPage}

                    />
                  )}
                  <View>{tabs == 1 && <Caption data={data} />}</View>
                  {tabs == 2 && <Information settings={data} />}
                  <View style={{}}>{tabs === 3 && <Map mapData={data} />}</View>

                  {tabs == 4 && <FloorPlan data={data} />}
                  {tabs == 5 && (
                    <CommentForProject projectId={data?.project?.id} />
                  )}

                </View>

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
                          {user.type == 2 &&
                            user.corporate_type == "Emlak Ofisi"
                            ? "Portföye Ekle"
                            : "Koleksiyona Ekle"}
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#B2B2B2",
                            fontSize: 14,
                          }}
                        >
                          {user.type == 2 &&
                            user.corporate_type == "Emlak Ofisi"
                            ? "Konutu portföylerinden birine ekleyebilir veya yeni bir portföy oluşturabilirsin"
                            : "Konutu koleksiyonlarından birine ekleyebilir veya yeni bir koleksiyon oluşturabilirsin"}
                        </Text>
                      </View>

                      <ScrollView
                        contentContainerStyle={{
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 4,
                          gap: 10,
                          paddingBottom: 150,
                        }}
                      >
                        {user.access_token ? (
                          <>
                            {namFromGetUser.has_club == 2 && (
                              <>
                                <View
                                  style={{ paddingTop: 10, gap: 10, gap: 10 }}
                                >
                                  <View>
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        color: "#4C6272",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                      }}
                                    >
                                      {" "}
                                      Emlak Kulüp Üyeliğiniz Başvuru Sürecinde!
                                    </Text>
                                  </View>

                                  <View style={{ width: "100%" }}>
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        color: "#7A8A95",
                                      }}
                                    >
                                      {user.type == 2 &&
                                        user.corporate_type == "Emlak Ofisi"
                                        ? "Portföyünüze konut ekleyebilmeniz emlak kulüp üyesi olmaız gerekmektedir"
                                        : "Koleksiyonunuza konut ekleyebilmeniz emlak kulüp üyesi olmaız gerekmektedir"}
                                    </Text>
                                  </View>
                                </View>
                              </>
                            )}
                            {namFromGetUser.has_club == 3 && (
                              <>
                                <View style={{ paddingTop: 10 }}>
                                  <Text
                                    style={{
                                      textAlign: "center",
                                      color: "#4C6272",
                                      fontWeight: "bold",
                                      fontSize: 16,
                                    }}
                                  >
                                    {" "}
                                    Emlak Kulüp Üyeliğiniz Reddedildi!
                                  </Text>
                                </View>
                                <View style={{ width: "100%" }}>
                                  <Text
                                    style={{
                                      textAlign: "center",
                                      color: "#7A8A95",
                                    }}
                                  >
                                    {user.type == 2 &&
                                      user.corporate_type == "Emlak Ofisi"
                                      ? "Portföyünüze konut ekleyebilmeniz emlak kulüp üyesi olmaız gerekmektedir"
                                      : "Koleksiyonunuza konut ekleyebilmeniz emlak kulüp üyesi olmaız gerekmektedir"}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "#F65656",
                                    width: "100%",
                                    padding: 10,
                                  }}
                                  onPress={() => {
                                    navigation.navigate("Collections");
                                    setColectionSheet(false);
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: "#FFFFFF",
                                      textAlign: "center",
                                    }}
                                  >
                                    Tekrar Başvur
                                  </Text>
                                </TouchableOpacity>
                              </>
                            )}
                            {namFromGetUser.has_club == 0 && (
                              <>
                                <View style={{ paddingTop: 10, gap: 10 }}>
                                  <View>
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        color: "#4C6272",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                      }}
                                    >
                                      Emlak Kulüp Üyeliğiniz Bulunmamaktadır!
                                    </Text>
                                  </View>

                                  <View style={{ width: "100%" }}>
                                    <Text
                                      style={{
                                        textAlign: "center",
                                        color: "#7A8A95",
                                      }}
                                    >
                                      {user.type == 2 &&
                                        user.corporate_type == "Emlak Ofisi"
                                        ? "Portföyünüze konut ekleyebilmeniz emlak kulüp üyesi olmaız gerekmektedir"
                                        : "Koleksiyonunuza konut ekleyebilmeniz emlak kulüp üyesi olmaız gerekmektedir"}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    style={{
                                      backgroundColor: "#F65656",
                                      width: "100%",
                                      padding: 10,
                                    }}
                                    onPress={() => {
                                      nav.navigate("Collections");
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                      }}
                                    >
                                      Tekrar Başvur
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </>
                            )}

                            {namFromGetUser.has_club == 1 && (
                              <>
                                <TouchableOpacity
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
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
                                    <Icon2
                                      name="pluscircleo"
                                      size={27}
                                      color={"#19181C"}
                                    />
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
                                    setPopUpForRemoveItem={
                                      setsetPopUpForRemoveItem
                                    }
                                    key={index}
                                    item={item}
                                    getCollectionId={getCollectionId}
                                    removeItemOnCollection={
                                      removeItemOnCollection
                                    }
                                    addLink={addSelectedCollection}
                                  />
                                ))}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <View style={{ gap: 10 }}>
                              <View style={{ paddingTop: 10 }}>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#4C6272",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                  }}
                                >
                                  Üyeliğiniz Bulunmamaktadır!
                                </Text>
                              </View>
                              <View style={{ width: "100%" }}>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    color: "#7A8A95",
                                  }}
                                >
                                  {user.type == 2 &&
                                    user.corporate_type == "Emlak Ofisi"
                                    ? "Portföyünüze konut ekleyebilmeniz Giriş yapmanız gerekmektedir."
                                    : "Koleksiyonunuza konut ekleyebilmeniz Giriş yapmanız gerekmektedir."}
                                </Text>
                              </View>
                              <TouchableOpacity
                                style={{
                                  backgroundColor: "#F65656",
                                  width: "100%",
                                  padding: 10,
                                }}
                                onPress={() => {
                                  setColectionSheet(false);
                                  navigation.navigate("Login");
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#FFFFFF",
                                    textAlign: "center",
                                  }}
                                >
                                  Giriş Yap
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </>
                        )}
                      </ScrollView>
                    </SafeAreaView>
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
                              {user.type == 2 &&
                                user.corporate_type == "Emlak Ofisi"
                                ? "Portföy Oluştur"
                                : "Koleksiyon Oluştur"}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            gap: 6,
                            justifyContent: "center",
                            paddingTop: 20,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#19181C",
                              fontWeight: "500",
                            }}
                          >
                            {user.type == 2 &&
                              user.corporate_type == "Emlak Ofisi"
                              ? "Portföy İsmi"
                              : "Koleksiyon İsmi"}
                          </Text>
                          <TextInput
                            style={styles.Input}
                            value={newCollectionNameCreate}
                            onChangeText={(value) => handleChangeText(value)}
                          />
                        </View>
                        <View style={{ paddingTop: 10 }}>
                          <TouchableOpacity
                            disabled={newCollectionNameCreate ? false : true}
                            style={{
                              backgroundColor: "#EA2A28",
                              padding: 10,
                              borderRadius: 5,
                              opacity: newCollectionNameCreate ? 1 : 0.3,
                            }}
                            onPress={addCollectionPost}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                                color: "white",
                                fontWeight: "500",
                              }}
                            >
                              {user.type == 2 &&
                                user.corporate_type == "Emlak Ofisi"
                                ? "Portföy Oluştur"
                                : "Koleksiyon Oluştur"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </SafeAreaView>
                    </ScrollView>
                  </View>
                </Modal>
              </ScrollView>
            </>
          )}
          <TextAlertModal visible={SeeAlertModal} onClose={setSeeAlertModal} />

          <AwesomeAlert
            show={AlertForSign}
            showProgress={false}
            titleStyle={{
              color: "#333",
              fontSize: 13,
              fontWeight: "700",
              textAlign: "center",
              margin: 5,
            }}
            title={"Sepetinize ürün ekleyebilmek için giriş yapmanız gerekmektedir."}
            messageStyle={{ textAlign: "center" }}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Vazgeç"
            confirmText="Giriş Yap"
            cancelButtonColor="#ce4d63"
            confirmButtonColor="#1d8027"
            onCancelPressed={() => {
              setAlertForSign(false);
              setModalVisible(false);
            }}
            onConfirmPressed={() => {
              navigation.navigate("Login");
              setAlertForSign(false);
              setModalVisible(false);
            }}
            confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          />
        </SafeAreaView>
      </AlertNotificationRoot>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    justifyContent: "center",

    flex: 1,
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: 25,
      },
    }),
  },
  clubRateContainer: {
    width: 50,
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    gap: 20,
    zIndex: 1,
  },
  commissionBadge: {
    position: "absolute",
    right: 0,
    bottom: 60,
    width: 120,
    height: 30,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  commissionText: {
    color: "#EA2C2E",
    fontWeight: "700",
    fontSize: 13,
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
    borderRadius: 5,
    bottom: 0,
    alignItems: "center",

    width: "100%",
  },
  ıconContainer: {
    width: 50,
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    right: 10,
    top: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    gap: 20,
    zIndex: 2,
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
    margin: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    backgroundColor: "#F2F2F2",
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
  CaptionPriceAndSlider: {
    gap: 8,
    paddingBottom: 10,
    width: "100%",
    paddingTop: 10,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: "#FFFFFF",

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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "95%",

    backgroundColor: "white",
    borderRadius: 6,


  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },

});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  inputAndroid: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
});
