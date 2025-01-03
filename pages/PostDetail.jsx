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
  Share,
  Button,
} from "react-native";
import { React, useRef, useState, useEffect } from "react";
import Icon2 from "react-native-vector-icons/AntDesign";

import { Platform } from "react-native";
import PagerView from "react-native-pager-view";
import * as SecureStore from "expo-secure-store";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import DetailsSettings from "../components/PostDetailsSettings/DetailsSettings";
import Icon4 from "react-native-vector-icons/AntDesign";

import LinkIcon3 from "react-native-vector-icons/Feather";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import PostMap from "../components/PostDetailsSettings/Postmap";
import PostPayment from "../components/PostDetailsSettings/PostPayment";
import PostCaption from "../components/PostDetailsSettings/PostCaption";

import Modal from "react-native-modal";

import LinkIcon from "react-native-vector-icons/Entypo";
import Arrow from "react-native-vector-icons/MaterialIcons";
import CloseIcon from "react-native-vector-icons/AntDesign";
import SliderMenuPostDetails from "../components/PostDetailsSettings/SliderMenuPostDetails";
import {
  apiRequestGet,
  apiUrl,
  frontEndUriBase,
} from "../components/methods/apiRequest";
import Posts from "../components/Posts";
import PostOtherProject from "../components/PostDetailsSettings/PostOtherProject";
import SettingsItem from "../components/SettingsItem";
import { addDotEveryThreeDigits } from "../components/methods/merhod";

import AddCollection from "../components/AddCollection";
import axios from "axios";
import { getValueFor } from "../components/methods/user";
import OtherHomeInProject from "../components/OtherHomeInProject";
import { ActivityIndicator } from "react-native-paper";
import FloorPlan from "../components/FloorPlan";
import { Svg } from "react-native-svg";
import { Polyline } from "react-native-maps";

import AwesomeAlert from "react-native-awesome-alerts";
import CommentForProject from "../components/CommentForProject";
import { leftButtonsForPost, PriceStatus, rightButtonsForPost } from "./helper";
import ImageViewing from "react-native-image-viewing";
import PaymentPlanModal from "../components/PaymentPlanModal";
import TextAlertModal from "../components/TextAlertModal";
import ShareProgressBar from "../components/ShareProgessBar";
import AwesomeAlertComp from "../components/AwesomeAlertComp";
import AddCollectionSheet from "../components/BottomModals/AddCollectionBottomModal/AddCollectionSheet";
import { styles } from "../styles/PostDetails.styles";
export default function PostDetail() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tabs, setTabs] = useState(0);
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [ColectionSheet, setColectionSheet] = useState(false);
  const [IsOpenSheet, setIsOpenSheet] = useState(false);
  const [selectedBlockx, setSelectedBlockx] = useState(0);
  const [lastBlockItemCount, setLastBlockItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  const route = useRoute();
  const [loading, setLoading] = useState(false);

  const { HomeId, projectId } = route.params;
  console.log(HomeId);
  useEffect(() => {
    getValueFor("user", setUser);
  }, [isFocused]);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;

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
    projectCartOrders: {},
    sumCartOrderQt: {},
  });
  useEffect(() => {
    apiRequestGet("project/" + projectId)
      .then((res) => {
        setLoading(true);
        setProjectHomeData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [HomeId]);
  const [ShareSaleEmpty, setShareSaleEmpty] = useState(null);
  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const [loadingCollection, setloadingCollection] = useState(false);
  const GetUserInfo = async () => {
    setloadingCollection(true);
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(apiUrl + "users/" + user?.id, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userData);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloadingCollection(false);
    }
  };

  const [galleries, setGalleries] = useState([]);
  const [roomData, setroomData] = useState({});
  useEffect(() => {
    setShareSaleEmpty(
      !roomData["share_sale[]"] || roomData["share_sale[]"] === "[]"
    );
    if ((user, ProjectHomeData)) {
      const roomData = ProjectHomeData.projectHousingsList[HomeId] || {};
      setroomData(roomData);
    }
  }, [ProjectHomeData]);

  useEffect(() => {
    if (
      ProjectHomeData?.project &&
      ProjectHomeData.projectHousingsList &&
      roomData
    ) {
      const imageObject = {
        image: `/project_housing_images/${roomData["image[]"]}`,
      };

      const updatedImages = [imageObject, ...ProjectHomeData?.project?.images];
      setGalleries(updatedImages);
    } else if (ProjectHomeData.project.images) {
      setGalleries(ProjectHomeData.project.images);
    }
  }, [ProjectHomeData, roomData]);

  const images = galleries.map((image) => ({
    uri: `${frontEndUriBase}${image.image.replace("public", "storage")}`,
  }));

  const [pagination, setPagination] = useState(0);
  const handlePageChange = (pageNumber) => {
    setPagination(pageNumber);
    setSelectedImage(pageNumber);
  };
  const [paymentModalVisible, setpaymentModalVisible] = useState(false);
  const [PaymaentAlert, setPaymaentAlert] = useState(false);
  const openModal = () => {
    if (
      roomData["share_sale[]"] !== "[]" &&
      ProjectHomeData.sumCartOrderQt[HomeId]?.qt_total ==
        roomData["number_of_shares[]"]
    ) {
      setPaymaentAlert(true);
    } else {
      setpaymentModalVisible(true);
    }
  };
  const [FormVisible, setFormVisible] = useState(false);
  const openFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };
  const onClose = () => {
    setpaymentModalVisible(false);
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
      if (user.access_token) {
        const response = await axios.get(`${apiUrl}client/collections`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.collections) {
          setCollections(response.data.collections);
        } else {
          setCollections([]);
        }
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

  const filterEmojis = (text) => {
    // Emoji kod noktalarını içeren regex deseni
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
        id: selectedroomId,
        type: "project",
        project: projectId,
        clear_cart: "no",
        selectedCollectionId: null,
      },
    };

    axios
      .post(`${apiUrl}add/collection`, collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.access_token}`,
        },
      })
      .then((response) => {
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
                ? `${selectedroomId} No'lu Konut ${newCollectionNameCreate} Adlı Portföyünüze Eklendi`
                : `${selectedroomId} No'lu Konut ${newCollectionNameCreate} Adlı Koleksiyonuza Eklendi`,
            button: "Tamam",
          });
        }, 700);
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
      .post(`${apiUrl}addLink`, collectionData, {
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
                ? `${selectedroomId} No'lu Konut ${name} Adlı Portföyünüze Eklendi`
                : `${selectedroomId} No'lu Konut ${name} Adlı Koleksiyonunuza Eklendi`,
            button: "Tamam",
          });
        }, 700);
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
    if (user.access_token) {
      setselectedCartItem(id);
      setModalForAddToCart(true);
    } else {
      setAlertForSign(true);
    }
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
  const getBlockItems = (selectedOrder) => {
    var lastBlockItemsCount = 0;
    setIsLoading(true);
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
      setIsLoading(false);
      setItemCount(10);
    });
  };
  const fetchHousings = (page) => {
    if (ProjectHomeData.project.have_blocks) {
      if (
        page * 10 <
        ProjectHomeData.project.blocks[selectedTab].housing_count
      ) {
        apiRequestGet(
          "project_housings/" +
            projectId +
            "?start=" +
            (parseInt(lastBlockItemCount) + parseInt(page * 10)) +
            "&end=" +
            ((page + 1) * 10 >
            ProjectHomeData.project.blocks[selectedTab].housing_count
              ? parseInt(lastBlockItemCount) +
                parseInt(
                  ProjectHomeData.project.blocks[selectedTab].housing_count
                )
              : parseInt(lastBlockItemCount) + parseInt((page + 1) * 10))
        ).then((res) => {
          // console.log(res);
          setProjectHomeData({
            ...ProjectHomeData,
            projectHousingsList: {
              ...ProjectHomeData.projectHousingsList,
              ...res.data.housings,
            },
          });
          setItemCount(
            (page + 1) * 10 >
              ProjectHomeData.project.blocks[selectedTab].housing_count
              ? ProjectHomeData.project.blocks[selectedTab].housing_count
              : (page + 1) * 10
          );
          setIsLoading(false);
        });
      }
    } else {
      if (page * 10 < ProjectHomeData.project.room_count) {
        setIsLoading(true);
        apiRequestGet(
          "project_housings/" +
            projectId +
            "?start=" +
            page * 10 +
            "&end=" +
            (page + 1) * 10
        ).then((res) => {
          setProjectHomeData({
            ...ProjectHomeData,
            projectHousingsList: {
              ...ProjectHomeData.projectHousingsList,
              ...res.data.housings,
            },
          });

          setItemCount(
            (page + 1) * 10 > ProjectHomeData.project.room_count
              ? ProjectHomeData.project.room_count
              : (page + 1) * 10
          );
          setIsLoading(false);
        });
      }
    }
  };
  let debounceTimeout;
  const OpenFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

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
      .post(`${apiUrl}remove_item_on_collection`, collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
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
          `${apiUrl}institutional/add_to_cart_api`,
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
          `${apiUrl}institutional/add_to_cart_api`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        navigation.navigate("Sepetim");
      } else {
        setModalVisible(false);
        setTimeout(() => {
          setAlertForSign(true);
        }, 400);
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
  const { width, height } = Dimensions.get("window");
  const [tab, settab] = useState(0);
  const [index, setindex] = useState(0);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: frontEndUriBase,
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
  const [AlertForSign, setAlertForSign] = useState(false);
  const [inFavorite, setInFavorite] = useState(false);
  const [AlertForFavorite, setAlertForFavorite] = useState(false);
  const addFavorites = () => {
    if (user.access_token) {
      const config = {
        headers: { Authorization: `Bearer ${user.access_token}` },
      };
      axios
        .post(
          `${apiUrl}add_project_to_favorites/` + HomeId,
          {
            project_id: projectId,
            housing_id: HomeId,
          },
          config
        )
        .then((res) => {
          changeHeart();

          if (res.data.status == "removed") {
            setInFavorite(false);
          } else {
            setInFavorite(true);
          }
        });
    } else {
      setAlertForFavorite(true);
    }
  };
  const getDiscountAmount = (project, roomIndex) => {
    const projectOffer = ProjectHomeData.project.offer;
    return projectOffer ? projectOffer.discount_amount : 0;
  };

  const discountAmount = getDiscountAmount(ProjectHomeData.project, HomeId);

  const offSaleCheck = false;
  const discountedPrice = roomData["price[]"] - discountAmount;
  const isShareSale =
    roomData["share_sale[]"] &&
    roomData["share_sale[]"] !== "[]" &&
    roomData["number_of_shares[]"] !== 0;
  const price = isShareSale
    ? discountAmount != 0
      ? formatPrice(discountedPrice / roomData["number_of_shares[]"])
      : formatPrice(roomData["price[]"] / roomData["number_of_shares[]"])
    : discountAmount != 0
    ? formatPrice(discountedPrice)
    : formatPrice(roomData["price[]"]);

  console.log(discountAmount + "---DiscountAmount");
  console.log(discountedPrice + "---DiscountedPrice");
  const [comments, setcomments] = useState([]);
  const fetchCommentTotalRate = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `${apiUrl}project/${projectId}/comments`
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

  const [offSaleStatus, setoffSaleStatus] = useState(null);
  useEffect(() => {
    if (
      ProjectHomeData &&
      ProjectHomeData.project &&
      roomData &&
      roomData["off_sale[]"]
    ) {
      const parsedOffsale = JSON.parse(roomData["off_sale[]"]);
      ProjectHomeData &&
        ProjectHomeData.project &&
        roomData &&
        setoffSaleStatus(parsedOffsale);
    }
  }, [HomeId, roomData]);

  // console.log(ProjectHomeData.project.images)

  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePress = () => {
    // openFormModal(roomOrder);
    // GetID(roomOrder); //
    navigation.navigate("SwapScreenNav", {
      roomOrder: HomeId,
      projectId: ProjectHomeData?.project?.id,
    });
  };
  const RigthBtnFunctionsForkey = (key) => {
    switch (key) {
      case "PaymentModal":
        return openModal(HomeId);
      case "request":
        return alert("bilgi Al Modalı Gelecek");
      case "GiveOffer":
        return handlePress();

      default:
        return [];
    }
  };
  const LeftBtnFunctionsForkey = (key) => {
    switch (key) {
      case "AddBasket":
        return GetIdForCart(HomeId);
      case "request":
        return alert("bilgi Al Modalı Gelecek");
      case "GiveOffer":
        return handlePress();
      case "ShowAdvert":
        return alert("zaten ilandasın ");
      default:
        return [];
    }
  };
  const saveData = async (
    title,
    amount,
    imageUrl,
    neightboord,
    ilanNo,
    roomOrderString
  ) => {
    try {
      // SecureStore'a verileri kaydediyoruz
      await SecureStore.setItemAsync("advertise_title", title);
      await SecureStore.setItemAsync("amount", amount.toString()); // Amount'u string olarak kaydediyoruz
      await SecureStore.setItemAsync("imageUrl", imageUrl);
      await SecureStore.setItemAsync("neightboord", neightboord.toString()); // Boolean'ı string olarak kaydediyoruz
      await SecureStore.setItemAsync("ilanNo", ilanNo.toString()); // İlan numarasını string olarak kaydediyoruz
      await SecureStore.setItemAsync(
        "roomOrderString",
        roomOrderString.toString()
      ); // Oda sırasını string olarak kaydediyoruz
    } catch (error) {
      console.error("Veri saklanırken bir hata oluştu:", error);
    }
  };
  const today = new Date();
  const formattedDate = today.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  function truncateText(text, wordLimit) {
    const words = text?.split(" ");
    return words?.length > wordLimit
      ? words?.slice(0, wordLimit).join(" ") + "..."
      : text;
  }
  const [SeeAlertModal, setSeeAlertModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleYes = () => {
    // İlan başlığını, fiyatı ve ilan numarasını alın
    const title = HomeId ? roomData["advertise_title[]"] : "Başlık bulunamadı";
    const amount = 250; // Fiyatı burada belirliyoruz
    const imageUrl = roomData
      ? `${frontEndUriBase}project_housing_images` + roomData["image[]"]
      : ""; // Resim URL'sini burada belirleyin
    const neightboord = false;
    const ilanNo = 1000000 + ProjectHomeData.project.id + "-" + HomeId; // İlan numarasını belirliyoruz
    const roomOrderString = HomeId.toString();

    // Verileri secureStore ile saklayın
    saveData(title, amount, imageUrl, neightboord, ilanNo, roomOrderString)
      .then(() => {
        // Basket bileşenine yönlendirin
        navigation.navigate("Basket2");

        // Modalı kapatın
      })
      .catch((error) => {
        console.error("Onay işlemi sırasında bir hata oluştu:", error);
      });
  };
  const handleOpenPhone = () => {
    let phoneNumber;

    // Eğer data?.housing?.user?.phone varsa ve area_code mevcutsa
    if (
      ProjectHomeData?.project?.user?.phone &&
      ProjectHomeData?.project?.user?.area_code
    ) {
      // Alan kodu ve telefon numarasını birleştir
      phoneNumber = `90${ProjectHomeData.project?.user.area_code}${ProjectHomeData?.project?.user?.phone}`;
    }
    // Eğer data?.housing?.mobile_phone varsa
    else if (ProjectHomeData?.project?.user.mobile_phone) {
      // Telefon numarası başında 0 ile başlıyorsa 0'ı kaldır ve +90 ekle
      phoneNumber = ProjectHomeData.project?.user?.mobile_phone.startsWith("0")
        ? `90${ProjectHomeData.project?.user?.mobile_phone.slice(1)}`
        : `90${ProjectHomeData.project?.user?.mobile_phone}`;
    }

    // Telefon numarasını kontrol et ve URL'yi oluştur
    if (phoneNumber) {
      // Numara başında + ekle
      Linking.openURL(`tel:+${phoneNumber}`);
    } else {
      console.error("Telefon numarası bulunamadı.");
    }
  };
  const [show, setShow] = useState(false);
  const tempIndexRef = useRef(currentIndex); // To temporarily store the index
  const handleImageIndexChange = (index) => {
    tempIndexRef.current = index; //Update temporary index
  };
  const [isVisibleSheet, setisVisibleSheet] = useState(false);
  return (
    <>
      <AlertNotificationRoot>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#333" />
          </View>
        ) : (
          <SafeAreaView
            style={{ backgroundColor: "white", flex: 1, paddingTop: 30 }}
          >
            <View style={styles.CallAndSeePlaceContainer}>
              <TouchableOpacity
                style={styles.CallBtn}
                onPress={handleOpenPhone}
              >
                <Text style={styles.CallBtnText}>Ara</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.seePlaceBtn}
                onPress={() => {
                  navigation.navigate("Profile", {
                    name: "",
                    id: ProjectHomeData?.project?.user?.id,
                  });
                }}
              >
                <Text style={styles.seePlaceBtnText}>
                  Satış Noktalarını Gör
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor:
                  ProjectHomeData?.project?.user?.banner_hex_code,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile", {
                    name: "",
                    id: ProjectHomeData?.project?.user?.id,
                  });
                }}
                style={styles.ProfileBannerBtn}
              >
                <View
                  style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
                >
                  <View style={{ height: 35, width: 35 }}>
                    <ImageBackground
                      source={{
                        uri: `${frontEndUriBase}/storage/profile_images/${ProjectHomeData?.project?.user?.profile_image}`,
                      }}
                      style={{ width: "100%", height: "100%" }}
                      borderRadius={20}
                    />
                  </View>
                  <Text style={styles.ProfileName}>
                    {ProjectHomeData?.project?.user?.name}
                  </Text>
                  <View style={styles.ProfileIconVerify}>
                    <LinkIcon
                      name="check"
                      style={{ position: "absolute", zIndex: 1 }}
                      color={"#333"}
                    />
                    <ImageBackground
                      source={require("../src/assets/images/BadgeYellow.png")}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.ProjectIdText}>
                    İlan No:{" "}
                    {1000000 + ProjectHomeData?.project?.id + "-" + HomeId}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Komşumu Gör"
              message={`"${truncateText(
                HomeId ? roomData["advertise_title[]"] : "Başlık bulunamadı",
                20
              )}"\n\nİlan No: ${
                1000000 + ProjectHomeData.project.id + "-" + HomeId
              }\nÖdeme Tarihi: ${formattedDate}\nTutar: 250 TL\n\nKomşumu Gör Özelliği: İlgilendiğiniz projeden konut alanları arayıp proje hakkında detaylı referans bilgisi almanıza imkan sağlar.\n\nKomşunuza ait iletişim bilgilerini görmek için aşağıdaki adımları takip edin:\n\n1. Ödeme işlemini tamamlayın ve belirtilen tutarı ödediğiniz takdirde,\n2. Ödemeniz onaylandıktan sonra, "Komşumu Gör" düğmesi aktif olacak ve komşunuzun iletişim bilgilerine ulaşabileceksiniz.`}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Hayır"
              confirmText="Evet"
              confirmButtonColor="#EA2A28"
              onCancelPressed={() => {
                setShowAlert(false);
              }}
              onConfirmPressed={() => {
                setShowAlert(false);

                setTimeout(() => {
                  handleYes();
                }, 300);
              }}
              contentContainerStyle={{
                borderRadius: 10,
                padding: 20,
                width: "100%",
              }}
              titleStyle={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#EA2A28",
                textAlign: "center",
              }}
              messageStyle={{
                fontSize: 14,
                color: "#333",
                textAlign: "left",
              }}
              cancelButtonTextStyle={{
                fontSize: 16,
              }}
              confirmButtonTextStyle={{
                fontSize: 16,
              }}
            />
            <ScrollView
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingBottom: 60 }}
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  if (ProjectHomeData.project.have_blocks) {
                    console.log(
                      (page + 1) * 10,
                      ProjectHomeData.project.blocks[selectedTab].housing_count
                    );
                    if (
                      (page + 1) * 10 <
                      ProjectHomeData.project.blocks[selectedTab].housing_count
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
                    if ((page + 1) * 10 < ProjectHomeData.project.room_count) {
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
                  <View style={styles.PaginationContainer}>
                    <Text style={{ color: "white", fontSize: 12 }}>
                      {pagination + 1} / {galleries.length}
                    </Text>
                  </View>
                </View>

                <View style={styles.ıconContainer}>
                  <TouchableOpacity onPress={addFavorites}>
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
                  {(user.corporate_type == "Emlak Ofisi" || user.type == 1) && (
                    <TouchableOpacity
                      onPress={() => {
                        setisVisibleSheet(true);
                      }}
                    >
                      <View style={styles.ıcon}>
                        <Bookmark name={bookmark} size={18} />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.clubRateContainer}>
                  {user &&
                    user?.corporate_type == "Emlak Ofisi" &&
                    ProjectHomeData?.project?.club_rate && (
                      <View style={styles.commissionBadge}>
                        <Text style={styles.commissionText}>
                          %{ProjectHomeData?.project?.club_rate} KOMİSYON!
                        </Text>
                      </View>
                    )}
                </View>
                <PagerView
                  initialPage={currentIndex}
                  key={currentIndex}
                  style={{ height: 250 }}
                  onPageSelected={(e) => setPagination(e.nativeEvent.position)}
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
                          uri: `${frontEndUriBase}${image.image.replace(
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
                  backgroundColor="#000"
                  images={images}
                  imageIndex={currentIndex}
                  visible={isVisible}
                  onRequestClose={() => {
                    setIsVisible(false);
                    setCurrentIndex(tempIndexRef.current);
                  }}
                  onImageIndexChange={handleImageIndexChange}
                  FooterComponent={({ imageIndex }) => (
                    <View style={{ marginBottom: 50 }}>
                      <Text
                        style={{
                          color: "#FFF",
                          fontSize: 12,
                          textAlign: "center",
                          fontWeight: "500",
                        }}
                      >
                        {imageIndex + 1} / {images.length}
                      </Text>
                    </View>
                  )}
                />
              </View>
              {user?.corporate_type !== "Emlak Ofisi" && (
                <TouchableOpacity
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                  onPress={() => {
                    navigation.navigate("Profile", {
                      name: "",
                      id: ProjectHomeData?.project?.user?.id,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#ED3135",
                      fontWeight: "600",
                    }}
                  >
                    Satış Noktalarında Alırsanız %2 İndirim
                  </Text>
                  <Icon2 name="arrowright" size={17} color={"#ED3135"} />
                </TouchableOpacity>
              )}
              <View style={styles.totalRateView}>
                {totalRate != 0 && (
                  <View style={styles.totalRateContainer}>
                    <Text style={styles.totalRateText}>
                      {(totalRate / comments.length).toFixed(1)}
                    </Text>

                    <Icon2 name="star" color={"gold"} />
                  </View>
                )}
                <View style={styles.LocationContainer}>
                  <Text style={styles.LocationText}>
                    {ProjectHomeData?.project?.city?.title
                      ? `${ProjectHomeData?.project?.city?.title} / ${ProjectHomeData?.project?.county?.ilce_title}`
                      : ""}
                  </Text>
                  <Text style={styles.LocationText}>
                    {ProjectHomeData?.projectHousingsList[HomeId]
                      ? ProjectHomeData?.projectHousingsList[HomeId][
                          "advertise_title[]"
                        ]?.toLocaleUpperCase("tr-TR") +
                        " " +
                        HomeId +
                        " No'lu " +
                        ProjectHomeData.project.step1_slug
                          .charAt(0)
                          .toUpperCase() + // İlk harfi büyütme
                        ProjectHomeData.project.step1_slug.slice(1) // Geri kalanı olduğu gibi bırakma
                      : ""}
                  </Text>
                </View>
                {PriceStatus.map((item) => (
                  <View
                    style={{
                      display:
                        user.type == 2
                          ? Array.isArray(item.OnlySee) &&
                            item.OnlySee.includes(user.corporate_type) &&
                            item.offsale == offSaleStatus &&
                            !ProjectHomeData.projectCartOrders[HomeId]
                            ? "flex"
                            : "none"
                          : item.isShowClient == 1 &&
                            item.offsale == offSaleStatus &&
                            !ProjectHomeData.projectCartOrders[HomeId]
                          ? "flex"
                          : "none",
                    }}
                  >
                    {!ProjectHomeData.projectCartOrders[HomeId] &&
                    !roomData["share_sale[]"] ? (
                      <View>
                        {discountAmount ? (
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
                              <Text style={styles.strikethrough}>
                                {formatPrice(roomData["price[]"])} ₺
                              </Text>
                            </Text>
                            <Text style={styles.discountedPrice}>
                              {formatPrice(discountedPrice)} ₺
                            </Text>
                          </View>
                        ) : (
                          <Text style={styles.regularPrice}>
                            {formatPrice(roomData["price[]"])} ₺
                          </Text>
                        )}
                        {discountAmount > 0 && (
                          <Text style={styles.discountText}>
                            {formatPrice(discountAmount)} ₺ indirim
                          </Text>
                        )}
                      </View>
                    ) : (roomData["share_sale[]"] &&
                        roomData["share_sale[]"] !== "[]" &&
                        ProjectHomeData.sumCartOrderQt[HomeId]?.qt_total !==
                          roomData["number_of_shares[]"]) ||
                      (roomData["share_sale[]"] &&
                        roomData["share_sale[]"] !== "[]" &&
                        !ProjectHomeData.sumCartOrderQt[HomeId]) ? (
                      <View>
                        <Text style={[styles.regularPrice, {}]}>
                          {roomData["share_sale[]"] &&
                            roomData["share_sale[]"] !== "[]" &&
                            roomData["number_of_shares[]"] !== 0 && (
                              <Text style={styles.shareSaleText}>
                                1/{roomData["number_of_shares[]"]}
                              </Text>
                            )}
                          {" Pay Fiyatı - "}
                          {roomData["share_sale[]"] &&
                          roomData["share_sale[]"] !== "[]" &&
                          roomData["number_of_shares[]"] !== 0
                            ? formatPrice(
                                roomData["price[]"] /
                                  roomData["number_of_shares[]"]
                              )
                            : formatPrice(roomData["price[]"])}
                          ₺
                        </Text>
                      </View>
                    ) : (
                      <View style={{ paddingTop: 5 }}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: "#EA2C2E",
                            fontWeight: "800",
                            textAlign: "center",
                          }}
                        >
                          {formatPrice(roomData["price[]"])}₺
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.priceAndButtons}>
                <View
                  style={[
                    styles.btns,
                    {
                      justifyContent:
                        roomData["share_sale[]"] !== "[]" && offSaleStatus == 1
                          ? ""
                          : "center",
                    },
                  ]}
                >
                  {roomData["share_sale[]"] !== "[]" ? (
                    ProjectHomeData.sumCartOrderQt[HomeId]?.qt_total ==
                    roomData["number_of_shares[]"] ? (
                      <>
                        <View
                          style={{
                            width: "50%",
                          }}
                        >
                          <View style={styles.sold}>
                            <Text style={styles.soldText}>Satıldı</Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: "50%",
                            display:
                              (offSaleStatus == 1 &&
                                roomData["share_sale[]"] !== "[]") ||
                              (ProjectHomeData.projectCartOrders[HomeId]
                                ?.status == 1 &&
                                ProjectHomeData.projectCartOrders[HomeId]
                                  ?.is_show_user !== "on") ||
                              ProjectHomeData?.project?.user?.id == user.id ||
                              ProjectHomeData?.project?.user?.id ==
                                user.parent_id
                                ? "none"
                                : "flex",
                          }}
                        >
                          {rightButtonsForPost.map((item, _i) => (
                            <TouchableOpacity
                              key={_i}
                              style={[
                                styles.payDetailBtn,
                                {
                                  display:
                                    user.type == 2
                                      ? Array.isArray(item.OnlySee) &&
                                        item.OnlySee.includes(
                                          user.corporate_type
                                        ) &&
                                        item.offsale == offSaleStatus
                                        ? "flex"
                                        : "none"
                                      : item.isShowClient == 1 &&
                                        item.offsale == offSaleStatus
                                      ? "flex"
                                      : "none",
                                },
                              ]}
                              onPress={() => {
                                RigthBtnFunctionsForkey(item.key);
                              }}
                            >
                              <Text style={styles.payDetailText}>
                                {item.title}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </>
                    ) : (
                      <>
                        <View
                          style={{
                            width: offSaleStatus == 1 ? "100%" : "50%",
                          }}
                        >
                          {ProjectHomeData?.project?.user?.id == user.id ||
                          ProjectHomeData?.project?.user?.id ==
                            user.parent_id ? (
                            <View style={styles.priceContainer}>
                              <TouchableOpacity
                                style={styles.addBasket}
                                onPress={() => {
                                  navigation.navigate("EditPending");
                                }}
                              >
                                <Text style={styles.addBasketText}>
                                  İlanı Düzenle
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            leftButtonsForPost.map((item, _i) => (
                              <TouchableOpacity
                                onPress={() => {
                                  LeftBtnFunctionsForkey(item.key);
                                }}
                                style={[
                                  styles.addBasket,
                                  {
                                    backgroundColor: item.BackgroundColor,
                                    display:
                                      user.type == 2
                                        ? Array.isArray(item.OnlySee) &&
                                          item.OnlySee.includes(
                                            user.corporate_type
                                          ) &&
                                          item.offsale == offSaleStatus
                                          ? "flex"
                                          : "none"
                                        : item.isShowClient == 1 &&
                                          item.offsale == offSaleStatus
                                        ? "flex"
                                        : "none",
                                  },
                                ]}
                                key={_i}
                              >
                                <Text style={styles.addBasketText}>
                                  {item.title}
                                </Text>
                              </TouchableOpacity>
                            ))
                          )}
                        </View>

                        <View
                          style={{
                            width: "50%",
                            display:
                              (roomData["off_sale[]"] == 1 &&
                                roomData["share_sale[]"] !== "[]") ||
                              (ProjectHomeData.projectCartOrders[HomeId]
                                ?.status == 1 &&
                                ProjectHomeData.projectCartOrders[HomeId]
                                  .is_show_user !== "on") ||
                              ProjectHomeData?.project?.user?.id == user.id ||
                              ProjectHomeData?.project?.user?.id ==
                                user.parent_id
                                ? "none"
                                : "flex",
                          }}
                        >
                          {rightButtonsForPost.map((item, _i) => (
                            <TouchableOpacity
                              key={_i}
                              style={[
                                styles.payDetailBtn,
                                {
                                  display:
                                    user.type == 2
                                      ? Array.isArray(item.OnlySee) &&
                                        item.OnlySee.includes(
                                          user.corporate_type
                                        ) &&
                                        item.offsale == offSaleStatus
                                        ? "flex"
                                        : "none"
                                      : item.isShowClient == 1 &&
                                        item.offsale == offSaleStatus
                                      ? "flex"
                                      : "none",
                                },
                              ]}
                              onPress={() => {
                                RigthBtnFunctionsForkey(item.key);
                              }}
                            >
                              <Text style={styles.payDetailText}>
                                {item.title}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </>
                    )
                  ) : (
                    <>
                      <View
                        style={{
                          width:
                            (roomData["off_sale[]"] == 1 &&
                              roomData["share_sale[]"] !== "[]") ||
                            (ProjectHomeData.projectCartOrders[HomeId] &&
                              ProjectHomeData.projectCartOrders[HomeId]
                                .is_show_user !== "on") ||
                            (ProjectHomeData.projectCartOrders[HomeId] &&
                              ProjectHomeData.projectCartOrders[HomeId]
                                .is_show_user == "on" &&
                              ProjectHomeData.projectCartOrders[HomeId]
                                .user_id == user.id) ||
                            ProjectHomeData?.project?.user?.id == user.id ||
                            ProjectHomeData?.project?.user?.id == user.parent_id
                              ? "100%"
                              : "50%",
                        }}
                      >
                        {(!ProjectHomeData.projectCartOrders[HomeId] &&
                          ProjectHomeData.project.user.id == user.id) ||
                        (!ProjectHomeData.projectCartOrders[HomeId] &&
                          ProjectHomeData.project.user.id == user.parent_id) ? (
                          <View style={styles.priceContainer}>
                            <TouchableOpacity
                              style={styles.addBasket}
                              onPress={() => {
                                navigation.navigate("EditPending");
                              }}
                            >
                              <Text style={styles.addBasketText}>
                                İlanı Düzenle
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : ProjectHomeData.projectCartOrders[HomeId] ? (
                          ProjectHomeData.projectCartOrders[HomeId]?.status ==
                          1 ? (
                            <View
                              style={
                                ProjectHomeData.projectCartOrders[HomeId]
                                  .user_id == user.id
                                  ? styles.showCustomer
                                  : styles.sold
                              }
                            >
                              {ProjectHomeData.projectCartOrders[HomeId]
                                .user_id == user.id ? (
                                <Text style={styles.soldText}>
                                  Siz satın aldınız
                                </Text>
                              ) : (
                                <Text style={styles.soldText}>Satıldı</Text>
                              )}
                            </View>
                          ) : (
                            <View style={styles.pending}>
                              <Text style={styles.soldText}>
                                Rezerve Edildi
                              </Text>
                            </View>
                          )
                        ) : (
                          leftButtonsForPost.map((item, _i) => (
                            <TouchableOpacity
                              onPress={() => {
                                LeftBtnFunctionsForkey(item.key);
                              }}
                              style={[
                                styles.addBasket,
                                {
                                  backgroundColor: item.BackgroundColor,
                                  display:
                                    user.type == 2
                                      ? Array.isArray(item.OnlySee) &&
                                        item.OnlySee.includes(
                                          user.corporate_type
                                        ) &&
                                        item.offsale == offSaleStatus
                                        ? "flex"
                                        : "none"
                                      : item.isShowClient == 1 &&
                                        item.offsale == offSaleStatus
                                      ? "flex"
                                      : "none",
                                },
                              ]}
                              key={_i}
                            >
                              <Text style={styles.addBasketText}>
                                {item.title}
                              </Text>
                            </TouchableOpacity>
                          ))
                        )}
                      </View>

                      <View
                        style={{
                          width: "50%",
                          display:
                            (offSaleStatus == 1 &&
                              roomData["share_sale[]"] !== "[]") ||
                            (ProjectHomeData.projectCartOrders[HomeId]
                              ?.status == 1 &&
                              ProjectHomeData.projectCartOrders[HomeId]
                                .is_show_user !== "on") ||
                            ProjectHomeData?.project?.user?.id == user.id ||
                            ProjectHomeData?.project?.user?.id == user.parent_id
                              ? "none"
                              : "flex",
                        }}
                      >
                        {ProjectHomeData.projectCartOrders[HomeId] ? (
                          (ProjectHomeData.projectCartOrders[HomeId]?.status ==
                            1 &&
                            ProjectHomeData.projectCartOrders[HomeId]
                              .is_show_user == "on") ||
                          (ProjectHomeData.projectCartOrders[HomeId] &&
                            ProjectHomeData.projectCartOrders[HomeId]
                              .is_show_user == "on" &&
                            ProjectHomeData.projectCartOrders[HomeId].user_id !=
                              user.id) ? (
                            <TouchableOpacity
                              style={styles.showCustomer}
                              onPress={() => setShowAlert(true)}
                            >
                              <Text style={styles.showCustomerText}>
                                Komşumu Gör
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <></>
                          )
                        ) : (
                          rightButtonsForPost.map((item, _i) => (
                            <TouchableOpacity
                              key={_i}
                              style={[
                                styles.payDetailBtn,
                                {
                                  display:
                                    user.type == 2
                                      ? Array.isArray(item.OnlySee) &&
                                        item.OnlySee.includes(
                                          user.corporate_type
                                        ) &&
                                        item.offsale == offSaleStatus
                                        ? "flex"
                                        : "none"
                                      : item.isShowClient == 1 &&
                                        item.offsale == offSaleStatus
                                      ? "flex"
                                      : "none",
                                },
                              ]}
                              onPress={() => {
                                RigthBtnFunctionsForkey(item.key);
                              }}
                            >
                              <Text style={styles.payDetailText}>
                                {item.title}
                              </Text>
                            </TouchableOpacity>
                          ))
                        )}
                      </View>
                    </>
                  )}
                </View>
              </View>
              {roomData["share_sale[]"] !== "[]" && offSaleStatus != 1 && (
                <ShareProgressBar
                  toplamHisse={roomData["number_of_shares[]"]}
                  satilanHisse={
                    ProjectHomeData.projectCartOrders[HomeId]
                      ? ProjectHomeData.sumCartOrderQt[HomeId]?.qt_total
                      : 0
                  }
                  IsShowText={
                    ProjectHomeData.sumCartOrderQt[HomeId]?.qt_total ==
                    roomData["number_of_shares[]"]
                  }
                />
              )}

              <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                {roomData &&
                  roomData["projected_earnings[]"] &&
                  roomData["projected_earnings[]"] && (
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
                      numbers={
                        "%" +
                        (roomData && roomData["projected_earnings[]"]
                          ? roomData["projected_earnings[]"]
                          : 0)
                      }
                    />
                  )}
              </View>

              {roomData && roomData["swap[]"] && roomData["swap[]"] !== "[]" ? (
                <View
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                >
                  <TouchableOpacity
                    style={styles.takasBtn}
                    onPress={() => {
                      if (user.access_token) {
                        navigation.navigate("SwapForm", {
                          projectId: projectId,
                          houseid: HomeId,
                          type: 1,
                        });
                      } else {
                        setShow(true);
                      }
                    }}
                  >
                    <View style={styles.takasContainer}>
                      <View style={styles.takasIcon}>
                        <Icon2 name="plus" size={16} color={"#fff"} />
                      </View>
                      <View style={{}}>
                        <Text style={styles.takasText}>
                          Takas Başvurusu Yap
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Arrow
                        name="arrow-forward-ios"
                        size={16}
                        color={"#333"}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={{ padding: 8 }}>
                <SliderMenuPostDetails
                  tab={tabs}
                  setTab={setTabs}
                  changeTab={changeTab}
                />
              </View>

              <View style={styles.InformationCon}>
                <TouchableOpacity
                  style={styles.InfoBtn}
                  onPress={() => {
                    setSeeAlertModal(true);
                  }}
                >
                  <Text style={styles.InfoText}>Bilgilendirme!</Text>
                </TouchableOpacity>
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
              {tabs == 1 && <PostCaption data={ProjectHomeData} />}
              {tabs == 2 && (
                <DetailsSettings HomeId={HomeId} data={ProjectHomeData} />
              )}
              {tabs == 3 && (
                <PostPayment HomeId={HomeId} data={ProjectHomeData} />
              )}
              {tabs == 4 && <PostMap data={ProjectHomeData} />}
              {tabs == 5 && <FloorPlan data={ProjectHomeData} />}
              {tabs == 6 && (
                <CommentForProject projectId={ProjectHomeData?.project?.id} />
              )}

              <View style={{ padding: 10 }}></View>

              <PaymentPlanModal
                visible={paymentModalVisible}
                title={ProjectHomeData?.project?.project_title}
                onClose={onClose}
                data={roomData ?? roomData}
                RoomOrder={HomeId}
                deposit_rate={ProjectHomeData?.project?.deposit_rate}
              />
            </ScrollView>
            <TextAlertModal
              visible={SeeAlertModal}
              onClose={setSeeAlertModal}
            />
            <AddCollectionSheet
              isVisible={isVisibleSheet}
              setIsVisible={setisVisibleSheet}
              ProjectId={ProjectHomeData?.project?.id}
              type={1}
              roomOrder={HomeId}
            />

            <AwesomeAlertComp
              message={
                "Takas başvurusu yapmak için giriş yapmanız gerekmektedir"
              }
              canselFunc={() => {
                setShow(false);
              }}
              confirmFunc={() => {
                setShow(false);
                setTimeout(() => {
                  navigation.navigate("Login");
                }, 200);
              }}
              show={show}
              setShow={setShow}
            />

            <AwesomeAlert
              show={ModalForAddToCart}
              showProgress={false}
              titleStyle={{
                color: "#333",
                fontSize: 13,
                fontWeight: "700",
                textAlign: "center",
                margin: 5,
              }}
              title={`${selectedCartItem} No'lu Konutu Sepete Eklemek İstediğinize Eminmisiniz?`}
              messageStyle={{ textAlign: "center" }}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Vazgeç"
              confirmText="Sepete Ekle"
              cancelButtonColor="#ce4d63"
              confirmButtonColor="#1d8027"
              onCancelPressed={() => {
                setModalForAddToCart(false);
                setModalVisible(false);
              }}
              onConfirmPressed={() => {
                addToCard();
                setModalForAddToCart(false);
                setModalVisible(false);
              }}
              confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            />
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
              title={
                "Sepetinize ilan ekleyebilmek için giriş yapmanız gerekiyor."
              }
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
                setAlertForSign(false);
                setModalVisible(false);
                setTimeout(() => {
                  navigation.navigate("Login");
                }, 400);
              }}
              confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            />
            <AwesomeAlert
              show={PaymaentAlert}
              showProgress={false}
              titleStyle={{
                color: "#333",
                fontSize: 13,
                fontWeight: "700",
                textAlign: "center",
                margin: 5,
              }}
              title={"Satıldı"}
              messageStyle={{ textAlign: "center" }}
              message={`Bu İlan İçin Ödeme Detayı Bilgisi Gösterilemiyor`}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              confirmText="Tamam"
              confirmButtonColor="#1d8027"
              onConfirmPressed={() => {
                setPaymaentAlert(false);
              }}
              confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            />
            <AwesomeAlert
              show={AlertForFavorite}
              showProgress={false}
              titleStyle={{
                color: "#333",
                fontSize: 13,
                fontWeight: "700",
                textAlign: "center",
                margin: 5,
              }}
              title={
                "Favorilerinize ilan ekleyebilmek için giriş yapmanız gerekmektedir."
              }
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
                setAlertForFavorite(false);
              }}
              onConfirmPressed={() => {
                setAlertForFavorite(false);
                setTimeout(() => {
                  navigation.navigate("Login");
                }, 400);
              }}
              confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            />
          </SafeAreaView>
        )}
      </AlertNotificationRoot>
    </>
  );
}
