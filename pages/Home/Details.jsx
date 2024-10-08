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
  TextInput,
  Pressable,
  Dimensions,
  Share,
} from "react-native";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
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

import RNPickerSelect from "react-native-picker-select";

import { StatusBar } from "expo-status-bar";

import { Skeleton } from "@rneui/base";
import PaymentItem from "../../components/PaymentItem";
import { err } from "react-native-svg";

import DrawerMenu from "../../components/DrawerMenu";
import { ActivityIndicator } from "react-native-paper";
import AwesomeAlert from "react-native-awesome-alerts";
import CommentForProject from "../../components/CommentForProject";
import ImageViewing from "react-native-image-viewing";

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
  const [user, setUser] = useState({});
  const [FormVisible, setFormVisible] = useState(false);
  const [selectedBlockx, setSelectedBlockx] = useState(0);
  const [lastBlockItemCount, setLastBlockItemCount] = useState(0);
  const [showInstallment, setShowInstallment] = useState(false);
  const scrollViewRef = useRef();
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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Yüklenme durumu için zaman aşımı ekliyoruz
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 saniye sonra yüklenme durumunu false yapıyoruz

    return () => clearTimeout(timer); // Bileşen kaldırıldığında zamanlayıcıyı temizliyoruz
  }, []);

  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  const route = useRoute();
  let debounceTimeout;
  const { slug, ProjectId, ımage } = route.params;

  const translateY = useRef(new Animated.Value(400)).current;
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

  const [loadingDetails, setloadingDetails] = useState(false);
  const [namFromGetUser, setnamFromGetUser] = useState([]);
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
      });
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
  const [DeleteAlert, setDeleteAlert] = useState(false);
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
  const [pagination, setPagination] = useState(0);

  const handlePageChange = (pageNumber) => {
    setPagination(pageNumber);
    setSelectedImage(pageNumber);
  };
  const handleIndexChanged = (index) => {
    console.log("Current index:", index); // Debug: current index
    setPagination(index);
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

  const [PopUpForRemoveItem, setsetPopUpForRemoveItem] = useState(false);
  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const GetIdForCart = (id) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
  };

  const addToCardPaymentModal = async () => {
    const formData = new FormData();
    formData.append("id", paymentModalShowOrder);
    formData.append(
      "isShare",
      data.projectHousingsList[paymentModalShowOrder]["share_sale[]"]
    );
    formData.append(
      "numbershare",
      data.projectHousingsList[paymentModalShowOrder]["number_of_shares[]"]
    );
    formData.append("qt", 1);
    formData.append("type", "project");
    formData.append("clear_cart", "no");
    formData.append("project", data.project.id);
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
        "https://private.emlaksepette.com/api/institutional/give_offer",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "multipart/form-data", // İçerik tipini belirtmek
          },
        }
      );
      setFormVisible(false);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody:
          "Başvurunuz gönderildi. 1-2 iş günü içerisinde haber verilecektir.",
        button: "Tamam",
      });

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
        "https://private.emlaksepette.com/api/cities"
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
        `https://private.emlaksepette.com/api/counties/${value}`
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

  const { width, height } = Dimensions.get("window");
  const [errorStatu, seterrorStatu] = useState(0);
  const [errorMessage, seterrorMessage] = useState("");
  const formatPhoneNumber = (value) => {
    // Sadece rakamları al
    const cleaned = ("" + value).replace(/\D/g, "");

    // 0 ile başlıyorsa, ilk karakteri çıkar
    const cleanedWithoutLeadingZero = cleaned.startsWith("0")
      ? cleaned.substring(1)
      : cleaned;

    let formattedNumber = "";

    for (let i = 0; i < cleanedWithoutLeadingZero.length; i++) {
      if (i === 0) formattedNumber += "(";
      if (i === 3) formattedNumber += ") ";
      if (i === 6 || i === 8) formattedNumber += " ";
      formattedNumber += cleanedWithoutLeadingZero[i];
    }

    return formattedNumber;
  };
  const handlePhoneNumberChange = (value) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setPhoneId(formattedPhoneNumber);
  };
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
      case phoneid.length < 10:
        seterrorStatu(2);
        seterrorMessage("Geçerli bir telefon numarası giriniz");

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
  };
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    if (data.project.image && data.project.images) {
      // data.project.image'i uygun formata dönüştürün
      const imageObject = { image: data.project.image };

      // data.project.image'i dizinin başına ekleyin
      const updatedImages = [imageObject, ...data.project.images];
      setGalleries(updatedImages);
    } else if (data.project.images) {
      setGalleries(data.project.images);
    }
  }, [data]);

  const images = galleries.map((image) => ({
    uri: `${apiUrl}${image.image.replace("public", "storage")}`,
  }));

  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  var months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const [paymentItems, setPaymentItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const formatPrice = (price) => addDotEveryThreeDigits(Math.round(price));

  useEffect(() => {
    setPaymentItems([]);
    setTotalPrice(0);
    if (data && data.projectHousingsList && paymentModalShowOrder !== null) {
      let total = 0;
      const items = [];

      for (
        let _index = 0;
        _index <
        data.projectHousingsList[paymentModalShowOrder][
          "pay-dec-count" + paymentModalShowOrder
        ];
        _index++
      ) {
        const priceString = addDotEveryThreeDigits(
          data.projectHousingsList[paymentModalShowOrder]["share_sale[]"] !==
            "[]"
            ? data.projectHousingsList[paymentModalShowOrder][
                `pay_desc_price${paymentModalShowOrder}` + _index
              ] /
                data.projectHousingsList[paymentModalShowOrder][
                  "number_of_shares[]"
                ]
            : data.projectHousingsList[paymentModalShowOrder][
                `pay_desc_price${paymentModalShowOrder}` + _index
              ]
        );

        const price = parseInt(priceString.replace(/\./g, ""), 10);
        const roundedPrice = Math.round(price);
        total += roundedPrice;

        const date = new Date(
          data.projectHousingsList[paymentModalShowOrder][
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
              price={formatPrice(price)}
              date={formattedDate}
              dFlex="column"
            />
          </View>
        );
      }

      console.log(totalPrice);
      setTotalPrice(total);

      setPaymentItems(items);
    }
  }, [data, paymentModalShowOrder]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const [index, setindex] = useState(0);
  const [tab, settab] = useState(0);
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
  const [AlertForSign, setAlertForSign] = useState(false);
  const [comments, setcomments] = useState([]);
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

  // ((parseInt(data.projectHousingsList[paymentModalShowOrder]['installments-price[]']) - (parseInt(data.projectHousingsList[paymentModalShowOrder]['advance[]']) + parseInt(totalPrice))) / parseInt(data.projectHousingsList[paymentModalShowOrder]['installments[]'])) / data.projectHousingsList[paymentModalShowOrder]['number_of_shares[]']).toFixed(0))
  // console.log(data.projectHousingsList[paymentModalShowOrder]['installments-price[]'] - (parseInt(data.projectHousingsList[paymentModalShowOrder]['advance[]'])+parseInt(totalPrice) /parseInt(data.projectHousingsList[paymentModalShowOrder]['installments[]'])   /data.projectHousingsList[paymentModalShowOrder]['number_of_shares[]'] ))
  console.log(parseInt(totalPrice));
  // const advance = parseInt(data.projectHousingsList[paymentModalShowOrder]['advance[]'], 10);
  // const numberOfShares = parseInt(data.projectHousingsList[paymentModalShowOrder]['number_of_shares[]'], 10);
  // const installmentsPrice = parseInt(data.projectHousingsList[paymentModalShowOrder]['installments-price[]'], 10);
  // const totalPrice2 = totalPrice
  // const installments = parseInt(data.projectHousingsList[paymentModalShowOrder]['installments[]'], 10);

  // // İşlemlerin gerçekleştirilmesi
  // const perShareAdvance = advance / numberOfShares;
  // const subtotal = perShareAdvance + totalPrice2;
  // const remaining = installmentsPrice - subtotal;
  // const finalInstallment = remaining / installments;

  // // Sonucu formatlama ve yazdırma
  // const formattedFinalInstallment = Math.round(finalInstallment); // Yuvarlama işlemi
  // console.log( parseInt(data?.projectHousingsList[1]['installments-price[]']) - (parseInt(data?.projectHousingsList[1]['advance[]'] )  / parseInt(data?.projectHousingsList[1]['number_of_shares[]']) + parseInt(totalPrice)) + 'fsdfdsf')
  // console.log(parseInt(data?.projectHousingsList[1]['installments-price[]']) -  (parseInt(data?.projectHousingsList[1]['advance[]'] )  / parseInt(data?.projectHousingsList[1]['number_of_shares[]']) + parseInt(totalPrice)) / parseInt(data.projectHousingsList[1]['installments[]']) + 'Takstili Fiyat')
  // console.log( ((data.projectHousingsList[1]['installments-price[]'] / data?.projectHousingsList[1]['number_of_shares[]']) - ((parseInt(data?.projectHousingsList[1]['advance[]'] )/parseInt(data?.projectHousingsList[1]['number_of_shares[]'])) + parseInt(totalPrice) ) ) / parseInt(data.projectHousingsList[1]['installments[]']) )
  console.log(ProjectId + "asd w wasdcxvfd qwe21aszxc asd");

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
                        fontWeight: 600,
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
                      fontWeight: 600,
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
                    paddingTop: 13,
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
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 11,
                      color: "#333",
                      fontWeight: "700",
                    }}
                  >
                    {data?.project?.city?.title
                      ? `${data.project.city.title} / ${data.project.county.ilce_title} `
                      : ""}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      color: "#264ABB",
                      fontWeight: "700",
                    }}
                  >
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
                    setPaymentModalShowOrder={setPaymentModalShowOrder}
                  />
                )}
                <View>{tabs == 1 && <Caption data={data} />}</View>
                {tabs == 2 && <Information settings={data} />}
                <View style={{}}>{tabs === 3 && <Map mapData={data} />}</View>

                {tabs == 4 && <FloorPlan data={data} />}
                {tabs == 5 && (
                  <CommentForProject projectId={data?.project?.id} />
                )}

                <Modal
                  animationType="fade" // veya "fade", "none" gibi
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", margin: 0 }}
                >
                  {data.projectHousingsList[paymentModalShowOrder] ? (
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
                        <View
                          style={{ backgroundColor: "#EEEEEE", padding: 10 }}
                        >
                          <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                            {data.project.have_blocks ? (
                              <>
                                {data?.project?.project_title} projesinde{" "}
                                {data.project.blocks[selectedBlockx].block_name}{" "}
                                {paymentModalShowOrder - lastBlockItemCount}{" "}
                                No'lu ilan Ödeme Planı
                              </>
                            ) : (
                              <>
                                {data?.project?.project_title} projesinde{" "}
                                {paymentModalShowOrder - lastBlockItemCount}{" "}
                                No'lu ilan Ödeme Planı
                              </>
                            )}
                          </Text>
                        </View>
                        <View>
                          <SettingsItem
                            info="Peşin Fiyat"
                            numbers={
                              paymentModalShowOrder != null
                                ? data.projectHousingsList[
                                    paymentModalShowOrder
                                  ]["share_sale[]"] != "[]" &&
                                  data.projectHousingsList[
                                    paymentModalShowOrder
                                  ]["number_of_shares[]"]
                                  ? addDotEveryThreeDigits(
                                      (
                                        parseInt(
                                          data.projectHousingsList[
                                            paymentModalShowOrder
                                          ]["price[]"]
                                        ) /
                                        parseInt(
                                          data.projectHousingsList[
                                            paymentModalShowOrder
                                          ]["number_of_shares[]"]
                                        )
                                      ).toFixed(0)
                                    ) + " ₺"
                                  : addDotEveryThreeDigits(
                                      data.projectHousingsList[
                                        paymentModalShowOrder
                                      ]["price[]"]
                                    ) + " ₺"
                                : "0"
                            }
                          />
                          {showInstallment ? (
                            <>
                              {paymentModalShowOrder != null ? (
                                JSON.parse(
                                  data.projectHousingsList[
                                    paymentModalShowOrder
                                  ]["payment-plan[]"]
                                ) &&
                                JSON.parse(
                                  data.projectHousingsList[
                                    paymentModalShowOrder
                                  ]["payment-plan[]"]
                                ).includes("taksitli") ? (
                                  <SettingsItem
                                    info={
                                      data.projectHousingsList[
                                        paymentModalShowOrder
                                      ]["installments[]"] +
                                      " " +
                                      "Ay Taksitli Fiyat"
                                    }
                                    numbers={
                                      data.projectHousingsList[
                                        paymentModalShowOrder
                                      ]["share_sale[]"] !== "[]" &&
                                      data.projectHousingsList[
                                        paymentModalShowOrder
                                      ]["number_of_shares[]"]
                                        ? addDotEveryThreeDigits(
                                            Math.round(
                                              data.projectHousingsList[
                                                paymentModalShowOrder
                                              ]["installments-price[]"] /
                                                data.projectHousingsList[
                                                  paymentModalShowOrder
                                                ]["number_of_shares[]"]
                                            )
                                          ) + "₺"
                                        : addDotEveryThreeDigits(
                                            Math.round(
                                              data.projectHousingsList[
                                                paymentModalShowOrder
                                              ]["installments-price[]"]
                                            )
                                          ) + "₺"
                                    }
                                  />
                                ) : (
                                  <SettingsItem
                                    info="Taksitli 12 Ay Fiyat"
                                    numbers="0"
                                  />
                                )
                              ) : (
                                <SettingsItem
                                  info="Taksitli 12 Ay Fiyat"
                                  numbers="0"
                                />
                              )}
                              {paymentModalShowOrder != null ? (
                                JSON.parse(
                                  data.projectHousingsList[
                                    paymentModalShowOrder
                                  ]["payment-plan[]"]
                                ) &&
                                JSON.parse(
                                  data.projectHousingsList[
                                    paymentModalShowOrder
                                  ]["payment-plan[]"]
                                ).includes("taksitli") ? (
                                  <SettingsItem
                                    info="Peşinat"
                                    numbers={
                                      data.projectHousingsList[
                                        paymentModalShowOrder
                                      ]["share_sale[]"] != "[]" &&
                                      data.projectHousingsList[
                                        paymentModalShowOrder
                                      ]["number_of_shares[]"]
                                        ? addDotEveryThreeDigits(
                                            Math.round(
                                              data.projectHousingsList[
                                                paymentModalShowOrder
                                              ]["advance[]"] /
                                                data.projectHousingsList[
                                                  paymentModalShowOrder
                                                ]["number_of_shares[]"]
                                            )
                                          ) + "₺"
                                        : addDotEveryThreeDigits(
                                            Math.round(
                                              data.projectHousingsList[
                                                paymentModalShowOrder
                                              ]["advance[]"]
                                            )
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
                                  data.projectHousingsList[
                                    paymentModalShowOrder
                                  ]["payment-plan[]"]
                                ) &&
                                JSON.parse(
                                  data.projectHousingsList[
                                    paymentModalShowOrder
                                  ]["payment-plan[]"]
                                ).includes("taksitli") ? (
                                  <SettingsItem
                                    info="Aylık Ödenecek Tutar"
                                    numbers={
                                      data.projectHousingsList[
                                        paymentModalShowOrder
                                      ]["share_sale[]"] != "[]" &&
                                      data.projectHousingsList[
                                        paymentModalShowOrder
                                      ]["number_of_shares[]"]
                                        ? addDotEveryThreeDigits(
                                            (data.projectHousingsList[
                                              paymentModalShowOrder
                                            ]["installments-price[]"] /
                                              data?.projectHousingsList[
                                                paymentModalShowOrder
                                              ]["number_of_shares[]"] -
                                              (parseInt(
                                                data?.projectHousingsList[
                                                  paymentModalShowOrder
                                                ]["advance[]"]
                                              ) /
                                                parseInt(
                                                  data?.projectHousingsList[
                                                    paymentModalShowOrder
                                                  ]["number_of_shares[]"]
                                                ) +
                                                parseInt(totalPrice))) /
                                              parseInt(
                                                data.projectHousingsList[
                                                  paymentModalShowOrder
                                                ]["installments[]"]
                                              )
                                          ) + "₺"
                                        : addDotEveryThreeDigits(
                                            (
                                              (parseInt(
                                                data.projectHousingsList[
                                                  paymentModalShowOrder
                                                ]["installments-price[]"]
                                              ) -
                                                (parseInt(
                                                  data.projectHousingsList[
                                                    paymentModalShowOrder
                                                  ]["advance[]"]
                                                ) +
                                                  parseInt(totalPrice))) /
                                              parseInt(
                                                data.projectHousingsList[
                                                  paymentModalShowOrder
                                                ]["installments[]"]
                                              )
                                            ).toFixed(0)
                                          ) + "₺"
                                    }
                                  />
                                ) : (
                                  <SettingsItem
                                    info="Aylık Ödenecek Tutar"
                                    numbers="0"
                                  />
                                )
                              ) : (
                                <SettingsItem
                                  info="Aylık Ödenecek Tutar"
                                  numbers="0"
                                />
                              )}
                              {paymentItems && paymentItems}
                            </>
                          ) : (
                            ""
                          )}
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            addToCardPaymentModal();
                          }}
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
                  ) : (
                    ""
                  )}
                </Modal>

                {/* <Modal
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
          </Modal> */}

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

                {/* <Modal
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
                        {selectedHouse} No'lu konutu {selectedCollectionName}{" "}
                        adlı koleksiyonunuza eklendi
                      </Text>
                    </View>
                  </View>
                </Modal> */}

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
                <Modal
                  animationType="fade"
                  transparent={true}
                  onBackdropPress={() => setFormVisible(false)}
                  visible={FormVisible}
                  onRequestClose={() => {
                    setFormVisible(false);
                  }}
                  style={{ margin: 0 }}
                >
                  <View style={[styles.centeredView, { padding: 10 }]}>
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
                      <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                      >
                        <View style={{ gap: 15 }}>
                          <View style={{ gap: 7 }}>
                            <Text style={styles.label}>Ad Soyad</Text>
                            <TextInput
                              style={styles.Input}
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
                            <Text style={styles.label}>Telefon Numarası</Text>
                            <TextInput
                              style={styles.Input}
                              value={phoneid}
                              keyboardType="number-pad"
                              onChangeText={handlePhoneNumberChange}
                            />
                            {errorStatu == 2 && (
                              <Text style={{ color: "red", fontSize: 12 }}>
                                {errorMessage}
                              </Text>
                            )}
                          </View>
                          <View style={{ gap: 7 }}>
                            <Text style={styles.label}>E-Posta</Text>
                            <TextInput
                              style={styles.Input}
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
                            <Text style={styles.label} value={titleid}>
                              Meslek
                            </Text>
                            <TextInput
                              style={styles.Input}
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
                            <Text style={styles.label}>Açıklama</Text>
                            <TextInput
                              style={styles.Input}
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
                              style={{
                                fontSize: 14,
                                color: "grey",
                                fontWeight: 600,
                              }}
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
                              style={{
                                fontSize: 14,
                                color: "grey",
                                fontWeight: 600,
                              }}
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
                  style={styles.modalImage}
                >
                  <View style={styles.modalContentImage}>
                    <View style={{ alignItems: "flex-end", marginBottom: 20 }}>
                      <TouchableOpacity
                        onPress={() => setCoverImageModal(false)}
                      >
                        <CloseIcon name="close" color={"white"} size={30} />
                      </TouchableOpacity>
                    </View>

                    {/* <PagerView
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
            </PagerView> */}
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
              {
                user.access_token ?
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
                  </> :
                  <>
                    <View style={{ gap: 10 }}>

                      <View style={{}}>
                        <Text style={{ textAlign: 'center', color: '#4C6272', fontWeight: 'bold', fontSize: 16 }}>Üyeliğiniz Bulunmamaktadır!</Text>
                      </View>
                      <View style={{ width: '100%' }}>
                        <Text style={{ textAlign: 'center', color: '#7A8A95' }}>Sepetinize konut ekleyebilmeniz için giriş yapmanız gerekmektedir</Text>
                      </View>
                      <TouchableOpacity style={{ backgroundColor: '#F65656', width: '100%', padding: 10 }}
                        onPress={() => {
                          setModalForAddToCart(false)
                          navigation.navigate('Login')
                        }}
                      >
                        <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Giriş Yap</Text>
                      </TouchableOpacity>
                    </View>
                  </>
              }

            </View>
          </Modal> */}
              </ScrollView>
            </>
          )}
          {/* <AwesomeAlert
            show={DeleteAlert}
            showProgress={false}
            titleStyle={{
              color: "#333",
              fontSize: 15,
              fontWeight: "700",
              textAlign: "center",
              margin: 5,
            }}
            title={"siliindi"}
            messageStyle={{ textAlign: "center" }}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={false}
            cancelText="Vazgeç"
            confirmText="Giriş Yap"
            cancelButtonColor="#ce4d63"
            confirmButtonColor="#1d8027"
          
            confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
            cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
          /> */}
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
    backgroundColor: "white",
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
    color: "green",
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
