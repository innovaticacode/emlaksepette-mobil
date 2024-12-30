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
  Image,
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

import LinkIcon from "react-native-vector-icons/Entypo";
import { useRoute } from "@react-navigation/native";

import Modal from "react-native-modal";
import SliderMenuDetails from "../../components/SliderMenuDetails";
import {
  apiRequestGet,
  apiUrl,
  frontEndUriBase,
} from "../../components/methods/apiRequest";
import AddCollection from "../../components/AddCollection";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";

import { ActivityIndicator } from "react-native-paper";
import AwesomeAlert from "react-native-awesome-alerts";
import CommentForProject from "../../components/CommentForProject";
import ImageViewing from "react-native-image-viewing";
import TextAlertModal from "../../components/TextAlertModal";
import { styles } from "../../styles/Details.style";

export default function Details({ navigation }) {
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
  const [SeeAlertModal, setSeeAlertModal] = useState(false);
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
        const userInfo = await axios.get(`${apiUrl}users/` + user?.id, {
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
    }
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${user?.access_token}` },
    };
    axios
      .get(`${apiUrl}project/` + ProjectId, config)
      .then((res) => {
        setData(res?.data);
        setloadingDetails(true);
        GetUserInfo();
      })
      .finally(() => {
        setloadingDetails(false);
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

  const removeItemOnCollection = (collectionId) => {
    const collectionData = {
      item_type: 1,
      room_order: selectedHouse,
      item_id: data.project.id,
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
        const response = await axios.get(apiUrl + "client/collections", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });

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
      .post(apiUrl + "add/collection", collectionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      })
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

  const GetIdForCart = (id) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
  };

  const [emailid, setEmailId] = useState("");
  const [nameid, setNameId] = useState("");

  const [phoneid, setPhoneId] = useState("");

  const [titleid, setTitleId] = useState("");
  const [offerid, setOfferId] = useState("");

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
        apiUrl + "institutional/give_offer",
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
      const response = await axios.get(apiUrl + "cities");
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
      const response = await axios.get(apiUrl + `counties/${value}`);
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
      const imageObject = { image: data?.project?.image };

      // data.project.image'i dizinin başına ekleyin
      const updatedImages = [imageObject, ...data?.project?.images];
      setGalleries(updatedImages);
    } else if (data.project.images) {
      setGalleries(data.project.images);
    }
  }, [data]);

  const images = galleries.map((image) => ({
    uri: `${frontEndUriBase}${image?.image.replace("public", "storage")}`,
  }));

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${frontEndUriBase}ilan/${data?.housing?.step1_slug}-${data?.housing?.step2_slug}-${data?.housing?.slug}/2000${data?.housing?.id}/detay`,
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
          `${apiUrl}project/${ProjectId}/comments`
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
  const tempIndexRef = useRef(currentIndex); // To temporarily store the index
  const handleImageIndexChange = (index) => {
    tempIndexRef.current = index; //Update temporary index
  };

  return (
    <>
      <AlertNotificationRoot>
        <SafeAreaView style={styles.container}>
          {loading == true ? (
            <ActivityIndicator size={"large"} color="#333" />
          ) : (
            <>
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
                      id: data?.project?.user?.id,
                    });
                  }}
                >
                  <Text style={styles.seePlaceBtnText}>
                    Satış Noktalarını Gör
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.ProfileBannerContainer,
                  {
                    backgroundColor: data?.project.user?.banner_hex_code,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.ProfileBannerBtn}
                  onPress={() =>
                    navigation.navigate("Profile", {
                      name: "",
                      id: data?.project?.user?.id,
                    })
                  }
                >
                  <View style={styles.ProfileBannerItem}>
                    <View style={{ height: 35, width: 35 }}>
                      <ImageBackground
                        source={{
                          uri: `${frontEndUriBase}/storage/profile_images/${data?.project?.user?.profile_image}`,
                        }}
                        style={styles.ProfileImageBanner}
                        borderRadius={20}
                      />
                    </View>
                    <Text style={styles.ProfileName}>
                      {data?.project?.user?.name
                        ? `${data?.project?.user?.name} `
                        : ""}
                    </Text>
                    <View style={styles.ProfileIconVerify}>
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

                  <Text style={styles.ProjectIdText}>
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
                    <View style={styles.PaginationContainer}>
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
                    key={currentIndex}
                    initialPage={currentIndex}
                    style={{ height: 250 }}
                    onPageSelected={(e) =>
                      setPagination(e.nativeEvent.position)
                    }
                  >
                    {galleries.map((image, index) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          setIsVisible(true);
                          setCurrentIndex(index);
                        }}
                      >
                        <Image
                          source={{
                            uri: `${frontEndUriBase}${image?.image.replace(
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
                    presentationStyle="overFullScreen"
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
                {user.corporate_type !== "Emlak Ofisi" && (
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
                        id: data?.project?.user?.id,
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

                <View style={styles.CaptionPriceAndSlider}>
                  {totalRate != 0 && (
                    <View style={styles.totalRateContainer}>
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
                  <View style={{ width: "100%" }}>
                    <View style={styles.LocationContainer}>
                      <Text style={styles.LocationText}>
                        {data?.project?.city?.title
                          ? `${data.project.city.title} / ${data.project.county.ilce_title} `
                          : ""}
                      </Text>
                      <Text style={styles.TitleText}>
                        {data?.project?.project_title?.toLocaleUpperCase(
                          "tr-TR"
                        )}
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

                <View style={{ marginTop: 5 }}>
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
                  {/* {tabs == 2 && <Information settings={data} />} */}
                  <View style={{}}>{tabs === 2 && <Map mapData={data} />}</View>

                  {tabs == 3 && <FloorPlan data={data} />}
                  {tabs == 4 && (
                    <CommentForProject projectId={data?.project?.id} />
                  )}
                </View>
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
            title={
              "Sepetinize ürün ekleyebilmek için giriş yapmanız gerekmektedir."
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
        </SafeAreaView>
      </AlertNotificationRoot>
    </>
  );
}

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
  fullViewImgText: {
    color: "#FFF",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
});
