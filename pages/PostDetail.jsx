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
import Phone from "react-native-vector-icons/Entypo";
import { Platform } from "react-native";
import PagerView from "react-native-pager-view";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import DetailsSettings from "../components/PostDetailsSettings/DetailsSettings";
import Icon4 from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-swiper";
import { SocialIcon, Icon } from "react-native-elements";
import LinkIcon3 from "react-native-vector-icons/Feather";
import MegaPhone from "react-native-vector-icons/Ionicons";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
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
import AwesomeAlert from "react-native-awesome-alerts";
import CommentForProject from "../components/CommentForProject";
import { leftButtonsForPost, rightButtonsForPost } from "./helper";
import ImageViewing from "react-native-image-viewing";
import PaymentPlanModal from "../components/PaymentPlanModal";
export default function PostDetail() {
  const apiUrl = "https://private.emlaksepette.com/";
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

  const {
    HomeId,
    projectId,
  } = route.params;
  console.log(HomeId);
  useEffect(() => {
    getValueFor("user", setUser);
  }, [isFocused]);
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
    projectCartOrders: {},
    sumCartOrderQt: {},
  });
  useEffect(() => {
    apiRequestGet("project/" + projectId).then((res) => {
      setLoading(true)
      setProjectHomeData(res.data);
    }).finally(()=>{
      setLoading(false)
    });
  }, [HomeId]);
  const [ShareSaleEmpty, setShareSaleEmpty] = useState(null);
  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const [loadingCollection, setloadingCollection] = useState(false);
  const GetUserInfo = async () => {
    setloadingCollection(true);
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
      setloadingCollection(false);
    }
  };

 
  const [galleries, setGalleries] = useState([]);
  const [roomData, setroomData] = useState({})
  useEffect(() => {
    setShareSaleEmpty(
      !roomData["share_sale[]"] || roomData["share_sale[]"] === "[]"
    );
    if (user,ProjectHomeData) {
      const roomData = ProjectHomeData.projectHousingsList[HomeId] || {};
      setroomData(roomData)
    }
  
  }, [ProjectHomeData]);

  useEffect(() => {
    if (ProjectHomeData?.project && ProjectHomeData.projectHousingsList && roomData) {
     
      const imageObject = { image: `/project_housing_images/${roomData['image[]']}` };

      
      const updatedImages = [imageObject,...ProjectHomeData?.project?.images];
      setGalleries(updatedImages);
    } else if (ProjectHomeData.project.images ) {
      setGalleries(ProjectHomeData.project.images);
    }
  }, [ProjectHomeData,roomData]);

  const images = galleries.map((image) => ({
    uri: `${apiUrl}${image.image.replace("public", "storage")}`,
  }));



  const [pagination, setPagination] = useState(0);
  const handlePageChange = (pageNumber) => {
    setPagination(pageNumber);
    setSelectedImage(pageNumber);
  };
  const [paymentModalVisible, setpaymentModalVisible] = useState(false)
  const openModal = () => {
    setpaymentModalVisible(true)
  
  };
  const [FormVisible, setFormVisible] = useState(false);
  const openFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };
  const onClose=()=>{
    setpaymentModalVisible(false)
  }
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
        const response = await axios.get(
          "https://private.emlaksepette.com/api/client/collections",
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
      .post(
        "https://private.emlaksepette.com/api/add/collection",
        collectionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      )
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
    }else{
      setAlertForSign(true)
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
      if (page * 10 < ProjectHomeData.project.blocks[selectedTab].housing_count) {
        apiRequestGet(
          "project_housings/" +
            projectId +
            "?start=" +
            (parseInt(lastBlockItemCount) + parseInt(page * 10)) +
            "&end=" +
            ((page + 1) * 10 > ProjectHomeData.project.blocks[selectedTab].housing_count
              ? parseInt(lastBlockItemCount) +
                parseInt(ProjectHomeData.project.blocks[selectedTab].housing_count)
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
            (page + 1) * 10 > ProjectHomeData.project.blocks[selectedTab].housing_count
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
          "https://private.emlaksepette.com/api/institutional/add_to_cart",
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
          "https://private.emlaksepette.com/api/institutional/add_to_cart",
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
        message: `https://private.emlaksepette.com/`,
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
          "https://private.emlaksepette.com/api/add_project_to_favorites/" +
            HomeId,
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
    
    const projectOffer = ProjectHomeData.project.offer ;
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
 
    console.log(discountAmount + '---DiscountAmount')
    console.log(discountedPrice + '---DiscountedPrice')
  const [comments, setcomments] = useState([]);
  const fetchCommentTotalRate = async () => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/project/${projectId}/comments`
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
    if (ProjectHomeData && ProjectHomeData.project && roomData && roomData["off_sale[]"]) {
      const parsedOffsale = JSON.parse(roomData["off_sale[]"]);
      ProjectHomeData && ProjectHomeData.project && roomData && setoffSaleStatus(parsedOffsale);
    }
  }, [HomeId,roomData]) 

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
        return alert('zaten ilandasın ');
      default:
        return [];
    }
  };

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
            <Header onPress={toggleDrawer} tab={settab} index={setindex} />
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
                <DrawerMenu setIsDrawerOpen={setIsDrawerOpen} on />
              </View>
            </Modal>

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
                    İlan No: {1000000 + ProjectHomeData?.project?.id  + '-'+ HomeId}
                  
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView scrollEventThrottle={16}
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
                      {galleries.length}
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
                        getRoomID(HomeId);
                        GetUserInfo();
                        setColectionSheet(true);
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
                            uri: `${apiUrl}${image.image.replace(
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
              <View
                style={{
                  paddingTop: 8,
                  gap: 5,
                  borderBottomWidth: 1,
                  borderColor: "#e8e8e8",
                  paddingBottom: 10,
                }}
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
                      zIndex: 1,
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
                <View style={{paddingLeft:8,gap:5,paddingTop:8}}>
                <Text
                  style={{
                   
                    fontSize: 11,
                    color: "#333",
                    fontWeight: "700",
                   
                  }}
                >
                  {ProjectHomeData?.project?.city?.title
                    ? `${ProjectHomeData?.project?.city?.title} / ${ProjectHomeData?.project?.county?.ilce_title}`
                    : ""}
                </Text>
                <Text
                  style={{
                   
                    fontSize: 16,
                    color: "#333",
                    fontWeight: "700",
                   
                  }}
                >
                  {ProjectHomeData?.projectHousingsList[HomeId]
                    ? ProjectHomeData?.projectHousingsList[HomeId][
                        "advertise_title[]"
                      ] +
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
               

                {offSaleCheck && !soldCheck && ShareSaleEmpty ? (
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
                ) : (roomData["share_sale[]"] &&
                    roomData["share_sale[]"] !== "[]" &&
                    ProjectHomeData.sumCartOrderQt[HomeId]?.qt_total !==
                      roomData["number_of_shares[]"]) ||
                  (roomData["share_sale[]"] &&
                    roomData["share_sale[]"] !== "[]" &&
                    !ProjectHomeData.sumCartOrderQt[HomeId]) ? (
                  <View>
                    <Text style={[styles.regularPrice]}>
                      {roomData["share_sale[]"] &&
                        roomData["share_sale[]"] !== "[]" &&
                        roomData["number_of_shares[]"] !== 0 && (
                          <Text style={styles.shareSaleText}>
                            1/{roomData["number_of_shares[]"]}
                          </Text>
                        )}
                      {" Pay Fiyatı - "}
                      {price}₺
                    </Text>
                  </View>
                ) : <View style={{ paddingTop: 5, }}>
                <Text
                  style={{ fontSize: 14, color: "#264ABB", fontWeight: "800",textAlign:'center'}}
                >
                  {formatPrice(roomData["price[]"])}₺
                </Text>
              </View>}
              </View>
                   
              <View style={styles.priceAndButtons}>
                <View style={[styles.btns,{
                  justifyContent:(roomData["share_sale[]"] !== "[]" && offSaleStatus==1)? '':'center'
                }]}>
                {roomData["share_sale[]"] !== "[]" ? (
                ProjectHomeData.sumCartOrderQt[HomeId]?.qt_total == roomData["number_of_shares[]"] ? (
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
                          ( offSaleStatus== 1 &&
                            roomData["share_sale[]"] !== "[]") ||
                          (ProjectHomeData.projectCartOrders[HomeId]?.status == 1 && ProjectHomeData.projectCartOrders[HomeId]?.is_show_user !== "on") ||
                          ProjectHomeData?.project?.user?.id == user.id ||
                          ProjectHomeData?.project?.user?.id == user.parent_id
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
                          <Text style={styles.payDetailText}>{item.title}</Text>
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
                      { ProjectHomeData?.project?.user?.id == user.id ||
                       ProjectHomeData?.project?.user?.id == user.parent_id ? (
                        <View style={styles.priceContainer}>
                          <TouchableOpacity style={styles.addBasket}>
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
                          (ProjectHomeData.projectCartOrders[HomeId]?.status == 1 && ProjectHomeData.projectCartOrders[HomeId].is_show_user !== "on") ||
                          ProjectHomeData?.project?.user?.id == user.id ||
                          ProjectHomeData?.project?.user?.id == user.parent_id
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
                          <Text style={styles.payDetailText}>{item.title}</Text>
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
                        (ProjectHomeData.projectCartOrders[HomeId] && ProjectHomeData.projectCartOrders[HomeId].is_show_user !== "on") ||
                        (ProjectHomeData.projectCartOrders[HomeId] &&
                          ProjectHomeData.projectCartOrders[HomeId].is_show_user == "on" &&
                          ProjectHomeData.projectCartOrders[HomeId].user_id == user.id) ||
                          ProjectHomeData?.project?.user?.id == user.id ||
                          ProjectHomeData?.project?.user?.id == user.parent_id
                          ? "100%"
                          : "50%",
                    }}
                  >
                    
                    {!ProjectHomeData.projectCartOrders[HomeId] && ProjectHomeData.project.user.id == user.id ||
                   !ProjectHomeData.projectCartOrders[HomeId] && ProjectHomeData.project.user.id == user.parent_id ? (
                      <View style={styles.priceContainer}>
                        <TouchableOpacity style={styles.addBasket}>
                          <Text style={styles.addBasketText}>
                            İlanı Düzenle
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : ProjectHomeData.projectCartOrders[HomeId] ? (
                      ProjectHomeData.projectCartOrders[HomeId]?.status == 1 ? (
                        <View
                          style={
                            ProjectHomeData.projectCartOrders[HomeId].user_id == user.id
                              ? styles.showCustomer
                              : styles.sold
                          }
                        >
                          {ProjectHomeData.projectCartOrders[HomeId].user_id == user.id ? (
                            <Text style={styles.soldText}>
                              Siz satın aldınız
                            </Text>
                          ) : (
                            <Text style={styles.soldText}>Satıldı</Text>
                          )}
                        </View>
                      ) : (
                        <View style={styles.pending}>
                          <Text style={styles.soldText}>Rezerve Edildi</Text>
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
                          <Text style={styles.addBasketText}>{item.title}</Text>
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
                        (ProjectHomeData.projectCartOrders[HomeId]?.status == 1 && ProjectHomeData.projectCartOrders[HomeId].is_show_user !== "on") ||
                        ProjectHomeData?.project?.user?.id == user.id ||
                        ProjectHomeData?.project?.user?.id == user.parent_id
                          ? "none"
                          : "flex",
                    }}
                  >
                    {ProjectHomeData.projectCartOrders[HomeId] ? (
                      (ProjectHomeData.projectCartOrders[HomeId]?.status == 1 && ProjectHomeData.projectCartOrders[HomeId].is_show_user == "on"  ) ||
                      (ProjectHomeData.projectCartOrders[HomeId] &&
                        ProjectHomeData.projectCartOrders[HomeId].is_show_user == "on" &&
                        ProjectHomeData.projectCartOrders[HomeId].user_id != user.id) 
                       
                      ? (
                        <TouchableOpacity
                          style={styles.showCustomer}
                          // onPress={() => openAlert(roomData)}
                        >
                          <Text style={styles.showCustomerText}>
                            Komşumu Gör
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <><Text>Komşu</Text></>
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
                              RigthBtnFunctionsForkey(item.key)
                          }}
                        >
                          <Text style={styles.payDetailText}>{item.title}</Text>
                        </TouchableOpacity>
                      ))
                    )}
                  </View>
                </>
              )}

                  
                </View>
              </View>
                
            
             
              <View>
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
              <View>
                {roomData && roomData["swap[]"] !== '[]' && (
                  <SettingsItem
                    info="Takas Başvurusu Yap"
                    color={"orange"}
                    fontWeight={"700"}
                    icon={<LinkIcon3 name="plus" size={15} color={"orange"} />}
                  />
                )}
              </View>
              {(user.corporate_type == "Emlak Ofisi" || user.type == 1) && (
                <TouchableOpacity
                  onPress={() => {
                   
                    getRoomID(HomeId);
                    GetUserInfo();
                    setColectionSheet(true);
                  }}
                >
                  {roomData && roomData["off_sale[]"] && (
                    <SettingsItem
                      info={
                        user.type == 2 && user.corporate_type == "Emlak Ofisi"
                          ? "Portföye Ekle"
                          : "Koleksiyona Ekle"
                      }
                      color={"red"}
                      fontWeight={"700"}
                      icon={
                        <LinkIcon3 name="bookmark" size={15} color={"red"} />
                      }
                    />
                  )}
                </TouchableOpacity>
              )}

              <View style={{padding:8}}>
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

              <PaymentPlanModal visible={paymentModalVisible} title={ProjectHomeData?.project?.project_title} onClose={onClose} data={roomData ?? roomData } RoomOrder={HomeId}/>

              
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
                <>
                  {loadingCollection ? (
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ActivityIndicator color="#333" size={"small"} />
                    </View>
                  ) : (
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
                            ? " Konutu portföylerinden birine ekleyebilir veya yeni bir portföy oluşturabilirsin"
                            : "Konutu koleksiyonlarından birine ekleyebilir veya yeni bir koleksiyon oluşturabilirsin"}
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
                        {user.access_token ? (
                          <>
                            {namFromGetUser?.has_club == 2 && (
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
                            {namFromGetUser?.has_club == 3 && (
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
                            {namFromGetUser?.has_club == 0 && (
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

                            {namFromGetUser?.has_club == 1 && (
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
                                    ? "Portföyünüze konut ekleyebilmeniz giriş yapmanız gerekmektedir"
                                    : "Koleksiyonunuza konut ekleyebilmeniz giriş yapmanız gerekmektedir"}
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
                  )}
                </>
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
                        {user.type == 2 && user.corporate_type == "Emlak Ofisi"
                          ? "Portföy İsmi"
                          : "Koleksiyon İsmi"}
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

            {/* <Modal
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
                        {selectedCartItem} No'lu Konutu Sepete Eklemek
                        İsteiğinize Eminmisiniz?
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
            </Modal> */}
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
                setModalForAddToCart(false)
                setModalVisible(false);
              }}
              onConfirmPressed={() => {
             addToCard()
               setModalForAddToCart(false)
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
              title={"Sepetinize İlan Ekleyebilmek İçin Giriş Yapmanız Gerekir"}
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
                "Favorilerinize İlan Ekleyebilmek İçin Giriş Yapmanız Gerekir"
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
                navigation.navigate("Login");
                setAlertForFavorite(false);
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
      left:0,
    
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    backgroundColor: "#EA2C2E",
    borderRadius:5
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
    backgroundColor: "#EA2C2E",
    borderRadius:5
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
    borderRadius:5
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
    alignItems: "center",
    justifyContent:'center',
    width: "100%",
    padding:6,
    gap:3  
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#264ABB",
    borderRadius:5
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
    borderRadius:5
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
    borderRadius:5
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
  left:0,
 bottom:50,
    width: 120,
    height: 30,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  commissionText: {
    color: "#EA2C2E",
    fontWeight: "700",
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
});
