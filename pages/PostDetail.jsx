import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  TextInput,
  Pressable,
  Share
} from "react-native";
import { React, useRef, useState, useEffect } from "react";
import Icon2 from "react-native-vector-icons/AntDesign";
import Phone from "react-native-vector-icons/Entypo";
import { Platform } from "react-native";
import PagerView from "react-native-pager-view";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import DetailsSettings from "../components/PostDetailsSettings/DetailsSettings";
import Icon4 from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-swiper";
import { SocialIcon, Icon } from "react-native-elements";
import LinkIcon3 from "react-native-vector-icons/Feather";
import LinkIcon4 from "react-native-vector-icons/Fontisto";
import LinkIcon2 from "react-native-vector-icons/FontAwesome";

import PostMap from "../components/PostDetailsSettings/Postmap";
import PostPayment from "../components/PostDetailsSettings/PostPayment";
import PostCaption from "../components/PostDetailsSettings/PostCaption";
import Header from "../components/Header";
import Modal from "react-native-modal";
import Categories from "../components/Categories";
import Search from "./Home/Search";
import LinkIcon from "react-native-vector-icons/Entypo";
import Arrow from "react-native-vector-icons/MaterialIcons";
import CloseIcon from "react-native-vector-icons/AntDesign";
import SliderMenuPostDetails from "../components/PostDetailsSettings/SliderMenuPostDetails";
import { apiRequestGet } from "../components/methods/apiRequest";
import Posts from "../components/Posts";
import PostOtherProject from "../components/PostDetailsSettings/PostOtherProject";
import SettingsItem from "../components/SettingsItem";
import { addDotEveryThreeDigits } from "../components/methods/merhod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Shadow } from "react-native-shadow-2";
import AddCollection from "../components/AddCollection";
import axios from "axios";
import { getValueFor } from "../components/methods/user";
import OtherHomeInProject from "../components/OtherHomeInProject";
import { ActivityIndicator } from "react-native-paper";
import FloorPlan from "../components/FloorPlan";
import { Svg } from "react-native-svg";
import { Polyline } from "react-native-maps";
import PaymentItem from "../components/PaymentItem";
import DrawerMenu from "../components/DrawerMenu";

export default function PostDetail() {
  const apiUrl = "https://mobil.emlaksepette.com/";
  const [modalVisible, setModalVisible] = useState(false);
  const [tabs, setTabs] = useState(0);
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [ColectionSheet, setColectionSheet] = useState(false);
  const [IsOpenSheet, setIsOpenSheet] = useState(false);

  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  const route = useRoute();
  const [loading, setLoading] = useState(true);

  const {
    HomeId,
    discount,
    isLoading,
    roomData,
    numberOfShare,
    price,
    projectId,
    sold,
    discountedPrice,
    discountAmount,
    offSaleCheck,
    soldCheck,
    shareSale,
    shareSaleEmpty,
    sumCartOrderQt,
  } = route.params;

  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const handleOpenPhone = () => {
    // Telefon uygulamasını açmak için
    Linking.openURL("tel:+905537064474");
  };

  const changeTab = (tabs) => {
    setTabs(tabs);
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
  const [ProjectHomeData, setProjectHomeData] = useState({
    project: {
      room_count: 0,
      roomInfo: [],
      images: [],
      location: "0,0",
    },
    projectHousingsList: {},
  });
  useEffect(() => {
    apiRequestGet("project/" + projectId).then((res) => {
      setProjectHomeData(res.data);
    });
  }, []);

  const [pagination, setPagination] = useState(0);
  const handlePageChange = (pageNumber) => {
    setPagination(pageNumber);
    setSelectedImage(pageNumber);
  };
  const [paymentModalShowOrder, setPaymentModalShowOrder] = useState(null);
  const openModal = (HomeId) => {
    setPaymentModalShowOrder(HomeId);
    setModalVisible(!modalVisible);
  };
  const [FormVisible, setFormVisible] = useState(false);
  const openFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };
  const [changeIcon, setchangeIcon] = useState(false);
  const toggleIcon = () => {
    setchangeIcon(!changeIcon);
  };
  const [showCoverImageModal, setCoverImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const openGalery = (index) => {
    // setSelectedImage(index)
    setCoverImageModal(true);
  };
  const [selectedHouse, setselectedHouse] = useState(0);
  const openCollection = (id) => {
    changeBookmark();
    setselectedHouse(id);
    setColectionSheet(true);
  };

  const [addCollection, setaddCollection] = useState(false);
  const [collections, setCollections] = useState([]);

  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  const [newCollectionNameCreate, setnewCollectionNameCreate] = useState("");
  const fetchData = async (token, setCollections) => {
    try {
      const response = await axios.get(
        "https://mobil.emlaksepette.com/api/client/collections",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.collections) {
        setCollections(response.data.collections);
      } else {
        setCollections([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getValueFor("user", setUser);
  }, [isFocused]);

  useEffect(() => {
    if (user?.access_token) {
      fetchData(user.access_token, setCollections);
    }
  }, [user, ıtemOnCollection]);

  const addCollectionPost = () => {
    const collectionData = {
      collection_name: newCollectionNameCreate,
      cart: {
        id: selectedroomId,
        type: "project",
        project: projectId,
        clear_cart: "no",
        selectedCollectionId: null,
      },
    };

    axios
      .post(
        "https://mobil.emlaksepette.com/api/add/collection",
        collectionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      )
      .then((response) => {
        alert("fsdfds");
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


  const addSelectedCollection = (id, name) => {

    const collectionData = {
      collection_name: name,
      clear_cart: "no",
      id: selectedroomId,
      project: ProjectHomeData.project.id,
      selectedCollectionId: id,
      type: "project",
    };

    axios
      .post("https://mobil.emlaksepette.com/api/addLink", collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
      .then((response) => {
        // setselectedCollectionName(response.data.collection.name)
        var newCollections = collections.map((collection) => {
          if (collection.id == id) {
            return {
              ...collection,
              links: [
                ...collection.links,
                {
                  collection_id: id,
                  room_order: selectedroomId,
                  item_id: ProjectHomeData?.project?.id,
                  user_id: user?.id,
                  item_type: 1,
                },
              ],
            };
          } else {
            return collection;
          }
        });
        setCollections(newCollections);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };

  const [selectedroomId, setselectedroomId] = useState(0);
  const getRoomID = (id) => {
    setselectedroomId(id);
  };

  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const GetIdForCart = (id) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
  };

  const [itemCount, setItemCount] = useState(10);
  const getLastItemCount = () => {
    var lastBlockItemsCount = 0;
    for (var i = 0; i < selectedTab; i++) {
      lastBlockItemsCount += ProjectHomeData.project.blocks[i].housing_count;
    }

    return lastBlockItemsCount;
  };

  const [selectedTab, setSelectedTab] = useState(0);
  const getBlockItems = (selectedOrder) => {
    var lastBlockItemsCount = 0;

    for (var i = 0; i < selectedOrder; i++) {
      lastBlockItemsCount += ProjectHomeData.project.blocks[i].housing_count;
    }
    apiRequestGet(
      "project_housings/" +
        projectId +
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

  const OpenFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [HomeId, projectId]); // HomeId ve projectId değiştiğinde effect tekrar çalışır

  const [PopUpForRemoveItem, setsetPopUpForRemoveItem] = useState(false);
  const formatPrice = (price) => addDotEveryThreeDigits(Math.round(price));

  const ıtemOnCollection = (collectionId) => {
    let check = false;
    collections.map((collection) => {
      for (var i = 0; i < collection.links.length; i++) {
        if (
          (collection.links[i].item_type =
            1 &&
            collection.links[i].item_id == ProjectHomeData.project.id &&
            collection.links[i].room_order == selectedroomId &&
            collection.links[i].collection_id == collectionId)
        ) {
          check = true;
        }
      }
    });

    return check;
  };
  const removeItemOnCollection = (collectionId) => {
    const collectionData = {
      item_type: 1,
      room_order: setselectedroomId,
      item_id: ProjectHomeData?.project?.id,
      collection_id: collectionId,
    };

    axios
      .post(
        "https://mobil.emlaksepette.com/api/remove_item_on_collection",
        collectionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        var newCollections = collections.map((collection) => {
          if (collection.id == collectionId) {
            var newLinks = collection.links.filter((link) => {
              if (
                link.collection_id == collectionId &&
                link.item_id == ProjectHomeData.project.id &&
                link.room_order == selectedroomId
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

        setCollections(newCollections);
      })
      .catch((error) => {
        // Hata durumunu işleyin
        console.error("Error:", error);
      });
  };

  const [paymentItems, setPaymentItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const formatPrice2 = (price) => addDotEveryThreeDigits(Math.round(price));

  useEffect(() => {
    setPaymentItems([]);
    setTotalPrice(0);
    if (
      ProjectHomeData &&
      ProjectHomeData.projectHousingsList &&
      paymentModalShowOrder !== null
    ) {
      let total = 0;
      const items = [];

      for (
        let _index = 0;
        _index <
        ProjectHomeData.projectHousingsList[paymentModalShowOrder][
          "pay-dec-count" + paymentModalShowOrder
        ];
        _index++
      ) {
        const priceString = addDotEveryThreeDigits(
          ProjectHomeData.projectHousingsList[paymentModalShowOrder][
            `pay_desc_price${paymentModalShowOrder}` + _index
          ]
        );

        const price = parseInt(priceString.replace(/\./g, ""), 10);
        total += price;

        const date = new Date(
          ProjectHomeData.projectHousingsList[paymentModalShowOrder][
            "pay_desc_date" + paymentModalShowOrder + _index
          ]
        );

        const padZero = (num) => (num < 10 ? `0${num}` : num);

        const formattedDate = `${padZero(date.getDate())}.${padZero(
          date.getMonth() + 1
        )}.${date.getFullYear()}`;

        items.push(
          <View key={_index}>
            <PaymentItem
              header={`${_index + 1} . Ara Ödeme`}
              price={formatPrice2(price)}
              date={formattedDate}
              dFlex="column"
            />
          </View>
        );
      }

      setTotalPrice(total);

      setPaymentItems(items);
    }
  }, [ProjectHomeData, paymentModalShowOrder]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const addToCard = async () => {
    const formData = new FormData();
    formData.append("id", selectedCartItem);
    formData.append(
      "isShare",
      ProjectHomeData.projectHousingsList[selectedCartItem]["share_sale[]"]
    );
    formData.append(
      "numbershare",
      ProjectHomeData.projectHousingsList[selectedCartItem][
        "number_of_shares[]"
      ]
    );
    formData.append("qt", 1);
    formData.append("type", "project");
    formData.append("clear_cart", "no");
    formData.append("project", ProjectHomeData.project.id);
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

        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
  const addToCardPaymentModal = async () => {
    const formData = new FormData();
    formData.append("id", paymentModalShowOrder);
    formData.append(
      "isShare",
      ProjectHomeData.projectHousingsList[paymentModalShowOrder]["share_sale[]"]
    );
    formData.append(
      "numbershare",
      ProjectHomeData.projectHousingsList[paymentModalShowOrder][
        "number_of_shares[]"
      ]
    );
    formData.append("qt", 1);
    formData.append("type", "project");
    formData.append("clear_cart", "no");
    formData.append("project", ProjectHomeData.project.id);
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

        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
  const { width, height } = Dimensions.get("window");
  const [tab, settab] = useState(0)
  const [index, setindex] = useState(0)
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://mobil.emlaksepette.com/`,
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
  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#333" />
        </View>
      ) : (
        <SafeAreaView
          style={{ backgroundColor: "white", flex: 1, paddingTop: 30 }}
        >
          <Header onPress={toggleDrawer}  tab={settab} index={setindex}/>
          <Modal
            isVisible={isDrawerOpen}
            onBackdropPress={() => setIsDrawerOpen(false)}
            animationIn="bounceInLeft"
            animationOut="bounceOutLeft"
            style={styles.modal}
            swipeDirection={["left"]}
            onSwipeComplete={() => setIsDrawerOpen(false)}
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
              backgroundColor: ProjectHomeData?.project?.user?.banner_hex_code,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile", {
                  name: "",
                  id: ProjectHomeData?.project?.user?.id,
                });
              }}
              style={{
                padding: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
              >
                <View style={{ height: 35, width: 35 }}>
                  <ImageBackground
                    source={{
                      uri: `${apiUrl}/storage/profile_images/${ProjectHomeData?.project?.user?.profile_image}`,
                    }}
                    style={{ width: "100%", height: "100%" }}
                    borderRadius={20}
                  />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: 12,
                    paddingLeft: 10,
                  }}
                >
                  {ProjectHomeData?.project?.user?.name}
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
                    source={require("../pages/Home/BadgeYellow.png")}
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: 12,
                    paddingLeft: 10,
                  }}
                >
                  İlan No: {1000000 + ProjectHomeData?.project?.id + HomeId}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView scrollEventThrottle={16}>
            <View style={{ height: 250 }}>
              <View style={styles.pagination}>
                <View
                  style={{
                    backgroundColor: "#333",
                    padding: 10,
                    paddingLeft: 8,
                    paddingRight: 8,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {pagination + 1} /{" "}
                    {ProjectHomeData?.project?.images?.length}
                  </Text>
                </View>
              </View>

              <View style={styles.ıconContainer}>
                <TouchableOpacity onPress={changeHeart}>
                  <View style={styles.ıcon}>
                    <Heart
                      name={heart}
                      size={18}
                      color={heart === "hearto" ? "black" : "red"}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare}>
                  <View style={styles.ıcon}>
                    <Icon2 name="sharealt" size={18} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    getRoomID(HomeId);

                    setColectionSheet(true);
                  }}
                >
                  <View style={styles.ıcon}>
                    <Bookmark name={bookmark} size={18} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.clubRateContainer}>
                {user &&
                  user.corporate_type == "Emlak Ofisi" &&
                  ProjectHomeData.project.club_rate && (
                    <View style={styles.commissionBadge}>
                      <Text style={styles.commissionText}>
                        %{ProjectHomeData.project.club_rate} KOMİSYON!
                      </Text>
                    </View>
                  )}
              </View>
              <Swiper
                style={{ height: 250 }}
                showsPagination={false}
                onIndexChanged={(index) => setPagination(index)}
                loop={true}
                index={pagination}
              >
                {ProjectHomeData?.project?.images &&
                  ProjectHomeData?.project?.images.map((image, index) => {
                    const uri = `${apiUrl}${image.image.replace(
                      "public",
                      "storage"
                    )}`;
                    return (
                      <Pressable key={index}>
                        <ImageBackground
                          source={{ uri: uri }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Pressable>
                    );
                  })}
              </Swiper>
            </View>
            <View
              style={{
                paddingTop: 8,
                gap: 5,
                borderBottomWidth: 1,
                borderColor: "#e8e8e8",
                paddingBottom: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  color: "#333",
                  fontWeight: "700",
                  marginTop: 5,
                }}
              >
                {ProjectHomeData?.project?.city?.title
                  ? `${ProjectHomeData?.project?.city?.title} / ${ProjectHomeData?.project?.county?.ilce_title}`
                  : ""}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "#264ABB",
                  fontWeight: "700",
                  marginTop: 5,
                }}
              >
                {ProjectHomeData?.projectHousingsList[HomeId]
                  ? ProjectHomeData?.projectHousingsList[HomeId][
                      "advertise_title[]"
                    ] +
                    " " +
                    HomeId +
                    " No'lu " +
                    ProjectHomeData.project.step1_slug.charAt(0).toUpperCase() + // İlk harfi büyütme
                    ProjectHomeData.project.step1_slug.slice(1) // Geri kalanı olduğu gibi bırakma
                  : ""}
              </Text>

              {offSaleCheck && !soldCheck && shareSaleEmpty ? (
                <>
                  {discountAmount != 0 ? (
                    <View style={styles.discountContainer}>
                      <Svg
                        viewBox="0 0 24 24"
                        width={18}
                        height={18}
                        stroke="#EA2B2E"
                        strokeWidth={2}
                        fill="#EA2B2E"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="css-i6dzq1"
                      >
                        <Polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                        <Polyline points="17 18 23 18 23 12" />
                      </Svg>
                      <Text style={styles.originalPrice}>
                        <Text style={styles.strikethrough}>{price} ₺</Text>
                      </Text>
                      <Text style={styles.discountedPrice}>
                        {discountedPrice} ₺
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.regularPrice}>{price} ₺</Text>
                    </View>
                  )}
                  {discountAmount > 0 && (
                    <View>
                      <Text style={styles.discountText}>
                        {discountAmount} ₺ indirim
                      </Text>
                    </View>
                  )}
                </>
              ) : (shareSale &&
                  shareSale !== "[]" &&
                  sumCartOrderQt[HomeId]?.qt_total !== numberOfShare) ||
                (shareSale && shareSale !== "[]" && !sumCartOrderQt[HomeId]) ? (
                <View>
                  <Text style={styles.regularPrice}>
                    {shareSale && shareSale !== "[]" && numberOfShare !== 0 && (
                      <Text style={styles.shareSaleText}>
                        1/{numberOfShare}
                      </Text>
                    )}
                    {" Pay Fiyatı - "}
                    {price}₺
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.priceAndButtons}>
              <View style={styles.btns}>
                <View style={{ width: "50%" }}>
                  {sold ? (
                    sold.status == 1 ? (
                      <View style={styles.sold}>
                        <Text style={styles.soldText}>Satıldı</Text>
                      </View>
                    ) : (
                      <View style={styles.pending}>
                        <Text style={styles.pendingText}>Rezerve Edildi</Text>
                      </View>
                    )
                  ) : roomData["off_sale[]"] !== "[]" ? (
                    <View style={styles.offSale} disabled>
                      <Text style={styles.offSaleText}>Satışa Kapalı</Text>
                    </View>
                  ) : (
                    <View style={styles.priceContainer}>
                      <TouchableOpacity
                        style={styles.addBasket}
                        onPress={() => GetIdForCart(HomeId)}
                      >
                        <Text style={styles.addBasketText}>Sepete Ekle</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <View style={{ width: "50%" }}>
                  {sold ? (
                    sold.is_show_user === "on" ? (
                      <TouchableOpacity style={styles.showCustomer}>
                        <Text style={styles.showCustomerText}>Komşumu Gör</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.payDetailBtn}
                        onPress={openModal}
                      >
                        <Text style={styles.payDetailText}>Ödeme Detayı</Text>
                      </TouchableOpacity>
                    )
                  ) : roomData["off_sale[]"] !== "[]" ? (
                    <TouchableOpacity
                      onPress={() => {
                        openFormModal(HomeId);
                        GetID(HomeId);
                      }}
                      style={styles.payDetailBtn}
                    >
                      <Text style={styles.payDetailText}>Başvuru Yap</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.payDetailBtn}
                      onPress={() => openModal(HomeId)}
                    >
                      <Text style={styles.payDetailText}>Ödeme Detayı</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <View>
              {roomData["projected_earnings[]"] && (
                <SettingsItem
                  info="Öngörülen Yıllık Kazanç"
                  color={"green"}
                  fontWeight={"700"}
                  icon={
                    <LinkIcon3
                      name="arrow-up-circle"
                      size={15}
                      color={"green"}
                    />
                  }
                  numbers={"%" + roomData["projected_earnings[]"]}
                />
              )}
            </View>
            <View>
              {roomData["swap[]"] && (
                <SettingsItem
                  info="Takas Başvurusu Yap"
                  color={"orange"}
                  fontWeight={"700"}
                  icon={<LinkIcon3 name="plus" size={15} color={"orange"} />}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                getRoomID(HomeId);
                setColectionSheet(true);
              }}
            >
              {roomData["off_sale[]"] && (
                <SettingsItem
                  info="Koleksiyona Ekle"
                  color={"red"}
                  fontWeight={"700"}
                  icon={<LinkIcon3 name="bookmark" size={15} color={"red"} />}
                />
              )}
            </TouchableOpacity>
            <View>
              <SliderMenuPostDetails
                tab={tabs}
                setTab={setTabs}
                changeTab={changeTab}
              />
            </View>

            {tabs == 0 && (
              <OtherHomeInProject
                GetID={getRoomID}
                GetIdForCart={GetIdForCart}
                openCollection={openCollection}
                itemCount={itemCount}
                data={ProjectHomeData}
                getLastItemCount={getLastItemCount}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
                openModal={openModal}
                getBlockItems={getBlockItems}
                OpenFormModal={OpenFormModal}
              />
            )}
            {tabs == 1 && <PostCaption data={ProjectHomeData} />}
            {tabs == 2 && (
              <DetailsSettings HomeId={HomeId} data={ProjectHomeData} />
            )}
            {tabs == 3 && (
              <PostPayment HomeId={HomeId} data={ProjectHomeData} />
            )}
            {tabs == 4 && <PostMap data={ProjectHomeData} />}
            {tabs == 5 && <FloorPlan data={ProjectHomeData} />}

            <View style={{ padding: 10 }}></View>

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
                      {ProjectHomeData?.project?.project_title} projesinde{" "}
                      {paymentModalShowOrder} No'lu ilan Ödeme Planı
                    </Text>
                  </View>
                  <View>
                    <SettingsItem
                      info="Peşin Fiyat"
                      numbers={
                        paymentModalShowOrder != null
                          ? addDotEveryThreeDigits(
                              ProjectHomeData.projectHousingsList[
                                paymentModalShowOrder
                              ]["price[]"]
                            ) + " ₺"
                          : "0"
                      }
                    />
                    {paymentModalShowOrder != null ? (
                      JSON.parse(
                        ProjectHomeData.projectHousingsList[
                          paymentModalShowOrder
                        ]["payment-plan[]"]
                      ) &&
                      JSON.parse(
                        ProjectHomeData.projectHousingsList[
                          paymentModalShowOrder
                        ]["payment-plan[]"]
                      ).includes("taksitli") ? (
                        <SettingsItem
                          info="Taksitli 12 Ay Fiyat"
                          numbers={
                            addDotEveryThreeDigits(
                              ProjectHomeData.projectHousingsList[
                                paymentModalShowOrder
                              ]["installments-price[]"]
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
                        ProjectHomeData.projectHousingsList[
                          paymentModalShowOrder
                        ]["payment-plan[]"]
                      ) &&
                      JSON.parse(
                        ProjectHomeData.projectHousingsList[
                          paymentModalShowOrder
                        ]["payment-plan[]"]
                      ).includes("taksitli") ? (
                        <SettingsItem
                          info="Peşinat"
                          numbers={
                            addDotEveryThreeDigits(
                              ProjectHomeData.projectHousingsList[
                                paymentModalShowOrder
                              ]["advance[]"]
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
                        ProjectHomeData.projectHousingsList[
                          paymentModalShowOrder
                        ]["payment-plan[]"]
                      ) &&
                      JSON.parse(
                        ProjectHomeData.projectHousingsList[
                          paymentModalShowOrder
                        ]["payment-plan[]"]
                      ).includes("taksitli") ? (
                        <SettingsItem
                          info="Aylık Ödenecek Tutar"
                          numbers={formatAmount(
                            (parseInt(
                              ProjectHomeData.projectHousingsList[
                                paymentModalShowOrder
                              ]["installments-price[]"]
                            ) -
                              (parseInt(
                                ProjectHomeData.projectHousingsList[
                                  paymentModalShowOrder
                                ]["advance[]"]
                              ) +
                                parseInt(totalPrice))) /
                              parseInt(
                                ProjectHomeData.projectHousingsList[
                                  paymentModalShowOrder
                                ]["installments[]"]
                              )
                          )}
                        />
                      ) : (
                        <SettingsItem info="Aylık Ödenecek Tutar" numbers="0" />
                      )
                    ) : (
                      <SettingsItem info="Aylık Ödenecek Tutar" numbers="0" />
                    )}
                    {paymentItems && paymentItems}
                  </View>

                  <TouchableOpacity
                    onPress={() => addToCardPaymentModal()}
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
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    {ProjectHomeData?.project?.project_title} projesinde{" "}
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
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#28A745",
                        width: "40%",
                        padding: 15,
                        borderRadius: 5,
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
                  {ProjectHomeData?.project?.images.map((image, index) => {
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
          <Modal
            isVisible={ColectionSheet}
            onBackdropPress={() => setColectionSheet(false)}
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
                  bounces={true}
                  contentContainerStyle={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 4,
                    gap: 10,
                    paddingBottom: 150,
                  }}
                >

{
              user.access_token?
              <>
               {user.has_club == 2 && (
        <>
          <View style={{ paddingTop: 10,gap:10,gap:10}}>
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
            <Text style={{ textAlign: "center", color: "#7A8A95" }}>
              Koleksiyonunuza konut ekleyebilmeniz emlak kulüp üyesi olmaız
              gerekmektedir
            </Text>
          </View>
          </View>
        </>
      )}
      {user.has_club == 3 && (
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
            <Text style={{ textAlign: "center", color: "#7A8A95" }}>
              Koleksiyonunuza konut ekleyebilmeniz emlak kulüp üyesi olmaız
              gerekmektedir
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
            <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
              Tekrar Başvur
            </Text>
          </TouchableOpacity>
        </>
      )}
      {user.has_club == 0 && (
        <>
          <View style={{ paddingTop: 10,gap:10 }}>
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
            <Text style={{ textAlign: "center", color: "#7A8A95" }}>
              Koleksiyonunuza konut ekleyebilmeniz emlak kulüp üyesi olmaız
              gerekmektedir
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
            <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
              Tekrar Başvur
            </Text>
          </TouchableOpacity>
          </View>
        </>
      )}

        {
          user.has_club == 1  &&
          <>
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

          </>
        }
              </>
              : <> 
                <View style={{ gap: 10 }}>

<View style={{ paddingTop: 10 }}>
  <Text style={{ textAlign: 'center', color: '#4C6272', fontWeight: 'bold', fontSize: 16 }}>Üyeliğiniz Bulunmamaktadır!</Text>
</View>
<View style={{ width: '100%' }}>
  <Text style={{ textAlign: 'center', color: '#7A8A95' }}>Koleksiyonunuza konut ekleyebilmeniz için giriş yapmanız gerekmektedir</Text>
</View>
<TouchableOpacity style={{ backgroundColor: '#F65656', width: '100%', padding: 10 }}
  onPress={() => {
    setColectionSheet(false)
    navigation.navigate('Login')
  }}
>
  <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Giriş Yap</Text>
</TouchableOpacity>
</View>
              </>
            }
      
                  {/* {user.access_token && user?.has_club == 0 ? (
                    <>
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
                          Emlak Kulüp Üyeliğiniz Bulunmamaktadır!
                        </Text>
                      </View>
                      <View style={{ width: "100%" }}>
                        <Text style={{ textAlign: "center", color: "#7A8A95" }}>
                          Koleksiyonunuza konut ekleyebilmeniz emlak kulüp üyesi
                          olmaız gerekmektedir
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
                        <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                          Emlak Kulüp Üyesi Ol{" "}
                        </Text>
                      </TouchableOpacity>
                    </>
                  ) : !user.access_token ? (
                    <>
                      <View style={{ gap: 10 }}>
                        <View>
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
                            style={{ textAlign: "center", color: "#7A8A95" }}
                          >
                            Koleksiyonunuza konut ekleyebilmeniz için giriş
                            yapmanız gerekmektedir
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
                            style={{ color: "#FFFFFF", textAlign: "center" }}
                          >
                            Giriş Yap
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
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
                          <Icon4
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
                          setPopUpForRemoveItem={setsetPopUpForRemoveItem}
                          removeItemOnCollection={removeItemOnCollection}
                          key={index}
                          item={item}
                          getCollectionId={getCollectionId}
                          addLink={addSelectedCollection}
                        />
                      ))}
                    </>
                  )} */}
                </ScrollView>
              </SafeAreaView>
            </View>
          </Modal>
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
                        <Icon4 name="close" size={27} color={"#19181C"} />
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
                    <Text style={{ fontSize: 13, color: "#19181C",fontWeight:'500' }}>
                      Koleksiyon İsmi
                    </Text>
                    <TextInput
                      style={{
                       
                          backgroundColor: "#E6E6E6",
                          padding: 10,
                          borderWidth: 1,
                          borderColor: "#ebebeb",
                          borderRadius: 5,
                          fontSize: 14,
                        
                      }}
                      value={newCollectionNameCreate}
                      onChangeText={(value) =>
                        setnewCollectionNameCreate(value)
                      }
                    />
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <TouchableOpacity
                    disabled={newCollectionNameCreate ? false:true}
                      style={{
                        backgroundColor: "#EA2A28",
                        padding: 10,
                        borderRadius: 5,
                        opacity:newCollectionNameCreate ? 1:0.3
                      }}
                      onPress={addCollectionPost}
                    >
                      <Text style={{ textAlign: "center", color: "white",fontWeight:'500' }}>
                        Koleksiyon Oluştur
                      </Text>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </ScrollView>
            </View>
          </Modal>

          <Modal
            isVisible={ModalForAddToCart}
            onBackdropPress={() => setModalForAddToCart(false)}
            animationType="fade"
            transparent={true}
            style={styles.modal4}
          >
            <View style={styles.modalContent4}>
              {user.access_token ? (
                <>
                  <View style={{ padding: 10, gap: 10 }}>
                    <Text style={{ textAlign: "center" }}>
                      {selectedCartItem} No'lu Konutu Sepete Eklemek İsteiğinize
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
                </>
              ) : (
                <>
                  <View style={{ gap: 10 }}>
                    <View>
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
                      <Text style={{ textAlign: "center", color: "#7A8A95" }}>
                        Sepetinize konut ekleyebilmeniz için giriş yapmanız
                        gerekmektedir
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#F65656",
                        width: "100%",
                        padding: 10,
                      }}
                      onPress={() => {
                        setModalForAddToCart(false);
                        navigation.navigate("Login");
                      }}
                    >
                      <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
                        Giriş Yap
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
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
                      style={{
                        fontSize: 12,
                        color: "#333",
                        textAlign: "center",
                      }}
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
                      style={{
                        fontSize: 12,
                        color: "#333",
                        textAlign: "center",
                      }}
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
                      style={{
                        fontSize: 12,
                        color: "#333",
                        textAlign: "center",
                      }}
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
                      style={{
                        fontSize: 12,
                        color: "#333",
                        textAlign: "center",
                      }}
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
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    backgroundColor: "#ecf0f1", // Top bar background color
  },
  segment: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  selectedSegment: {
    backgroundColor: "#3498db", // Selected segment color
  },
  segmentText: {
    color: "#2c3e50", // Segment text color
  },
  viewPager: {
    height: 250,
  },
  Info: {
    width: "100%",
    top: 20,
    height: 240,
  },
  text: {
    fontSize: 11,
    fontWeight: "300",

    color: "grey",
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
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
  clubRateContainer: {
    width: 50,
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    top: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    gap: 20,
    zIndex: 1,
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
    backgroundColor: "white",

    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal3: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent3: {
    backgroundColor: "white",

    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  other: {
    padding: 10,
    top: 0,

    backgroundColor: "#FFFFFF",

    marginTop: 0,

    width: "100%",

    height: "auto",
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
  Input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ebebeb",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  discountedPrice: {
    color: "#27bb53",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 14,
    position: "relative",
    marginLeft: 5,
  },
  regularPrice: {
    color: "#274abb",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  discountText: {
    color: "red",
    fontSize: 11,
    padding: 10,
  },
  shareSaleText: {
    width: "100%",
    color: "#274abb",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 14,
    position: "relative",
  },
  originalPrice: {
    marginLeft: 5,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#ea2a28",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 11,
  },
  offSale: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "red",
  },
  offSaleText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  sold: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "red",
  },
  soldText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  payDetailBtn: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#000000",
  },
  payDetailText: {
    fontWeight: "500",
    fontSize: 12,
    color: "white",
  },
  captionAndIcons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  caption: {
    width: "70%",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    width: "25%",
    bottom: 5,
  },
  btns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#264ABB",
  },
  addBasketText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  showCustomer: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "green",
  },
  showCustomerText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  pending: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "orange",
  },
  pendingText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  priceAndButtons: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commissionBadge: {
    position: "absolute",
    left: 0,
    bottom: 50,
    width: 120,
    height: 30,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  commissionText: {
    color: "green",
    fontWeight: "700",
    fontSize: 13,
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
