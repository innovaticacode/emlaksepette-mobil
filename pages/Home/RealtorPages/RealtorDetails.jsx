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
} from "react-native";
import ImageViewing from "react-native-image-viewing";
import { React, useRef, useState, useEffect } from "react";
import Icon2 from "react-native-vector-icons/AntDesign";
import * as Clipboard from "expo-clipboard";
import { Platform } from "react-native";
import PagerView from "react-native-pager-view";
import { useNavigation, useRoute } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import Categories from "../../../components/Categories";
import { SocialIcon, Icon } from "react-native-elements";
import LinkIcon from "react-native-vector-icons/Entypo";
import Arrow from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SliderMenuPostDetails from "../../../components/PostDetailsSettings/SliderMenuPostDetails";
import { apiRequestGet } from "../../../components/methods/apiRequest";
import Header from "../../../components/Header";
import Search from "../Search";
import SliderMenuRealtorDetails from "../../../components/SliderMenuRealtorDetail";
import RealtorCaption from "./RealtorCaption";
import Settings from "./Settings";
import CloseIcon from "react-native-vector-icons/AntDesign";
import RealtorMap from "./RealtorMap";
import Comment from "./Comment";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
import { Shadow } from "react-native-shadow-2";
import { CheckBox } from "react-native-elements";
import SwapForm from "./SwapForm";
import AddCollection from "../../../components/AddCollection";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import DrawerMenu from "../../../components/DrawerMenu";
import { ActivityIndicator } from "react-native-paper";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
export default function PostDetail() {
  const apiUrl = "https://private.emlaksepette.com/";
  const [modalVisible, setModalVisible] = useState(false);
  const [tabs, setTabs] = useState(0);
  const [images, setImages] = useState([]);
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [ColectionSheet, setColectionSheet] = useState(false);
  const [IsOpenSheet, setIsOpenSheet] = useState(false);

  // changeHeart FOKSİYONU TANIMLAMA START //
  const [heart, setHeart] = useState("hearto");
  const changeHeart = () => {
    const newHeart = heart === "hearto" ? "heart" : "hearto";
    setHeart(newHeart);
    console.log("Heart icon name changed to:", newHeart); // Durumu kontrol et
  };
  // changeHeart FOKSİYONU TANIMLAMA END //

  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      `https://private.emlaksepette.com/ilan/${data?.housing?.step1_slug}-${data?.housing?.step2_slug}-${data?.housing?.slug}/2000${data?.housing?.id}/detay`
    );
    alert("Metin kopyalandı!");
  };
  const shareLinkOnWhatsApp = () => {
    const url = `https://private.emlaksepette.com/ilan/${data?.housing?.step1_slug}-${data?.housing?.step2_slug}-${data?.housing?.slug}/2000${data?.housing?.id}/detay`;

    const whatsappShareURL = `whatsapp://send?text=${encodeURIComponent(url)}`;

    Linking.openURL(whatsappShareURL)
      .then(() => console.log("WhatsApp açıldı ve link paylaşıldı"))
      .catch((error) => console.error("WhatsApp açılamadı:", error));
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  const route = useRoute();
  const { houseId } = route.params;
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

  const [pagination, setpagination] = useState(0);
  const handlePageChange = (pageNumber) => {
    setpagination(pageNumber);
    setSelectedImage(pageNumber);
  };

  const [paymentModalShowOrder, setPaymentModalShowOrder] = useState(null);
  const openModal = (roomOrder) => {
    setPaymentModalShowOrder(roomOrder);
    setModalVisible(!modalVisible);
  };
  const [FormVisible, setFormVisible] = useState(false);
  const openFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };
  const [data, setData] = useState({});

  const [loading, setloading] = useState(false);

  // USEEFFECT BAĞIMLILIĞINI START //
  useEffect(() => {
    if (data?.housing?.isFavoritedByUser === 1) {
      setHeart("heart");
      setInFavorite(true);
      console.log("Heart state changed to:", heart);
    } else {
      setHeart("hearto");
      setInFavorite(false);
      console.log("Heart state changed to:", heart);
    }
  }, [data?.housing?.isFavoritedByUser]);
  // USEEFFECT BAĞIMLILIĞINI END //

  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const [loadingcollection, setloadingcollection] = useState(false);
  const GetUserInfo = async () => {
    setloadingcollection(true);
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
      setloadingcollection(false);
    }
  };
  const [IsSwap, setIsSwap] = useState("");

  const fetchDetails = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user?.access_token}` },
    };
    try {
      setloading(true);
      const response = await axios.get(
        `https://private.emlaksepette.com/api/housing/${houseId}`,
        config
      );
      setloading(false);
      GetUserInfo();
      setData(response.data);

      // images dizisini ve kapak resmini alın
      const housingData = JSON.parse(response.data.housing.housing_type_data);
      const fetchedImages = housingData.images || [];

      // Kapak resmini al ve kontrol et
      const coverImage = response.data.labels["Kapak Resmi"];
      if (coverImage) {
        const coverImageUri = `${apiUrl}/housing_images/${coverImage}`;
        console.log("Kapak Resmi URI:", coverImageUri); // URI'yi kontrol et

        setImages([coverImageUri, ...fetchedImages]);
      } else {
        setImages(fetchedImages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false); // İstek tamamlandığında loading durumunu false yap
    }
  };
  console.log(houseId);
  useEffect(() => {
    fetchDetails();
  }, [user]);

  const [modalVisibleComennet, setmodalVisibleComment] = useState(false);
  const handleModal = () => setmodalVisibleComment(!modalVisibleComennet);
  const [rating, setRating] = useState(0); // Başlangıçta hiçbir yıldız dolu değil

  const handleStarPress = (index) => {
    // Tıklanan yıldıza kadar olan tüm yıldızları dolu yap
    setRating(index + 1);

    // Sarı yıldızların sayısını hesapla ve konsola yazdır
    const yellowStars = index + 1;
  };
  const [checked, setChecked] = useState(false);
  const toggleCheked = () => setChecked(!checked);
  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState("");

  const openSwapAler = (message) => {
    setAlertMessage(message);
    setModalVisibleAlert(true);
  };

  const [colorAlert, setcolorAlert] = useState(false);
  const [LoadingModal, setLoadingModal] = useState(false);
  const [ColectionSheet2, setColectionSheet2] = useState(false);
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
  const [collections, setcollections] = useState([]);

  const [newCollectionNameCreate, setnewCollectionNameCreate] = useState("");

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
  useEffect(() => {
    fetchData();
  }, [user, addCollection]);

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
        id: data.housing.id,
        type: null,
        project: null,
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
        setaddCollection(false);
        setnewCollectionNameCreate("");
        setTimeout(() => {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title:(user.type==2 && user.corporate_type=='Emlak Ofisi')? `${newCollectionNameCreate} Adlı portföyünüz oluşturuldu ` : `${newCollectionNameCreate} Adlı koleksiyonunuz oluşturuldu `,
            textBody:(user.type==2 && user.corporate_type=='Emlak Ofisi')? `${houseId} No'lu Konut ${newCollectionNameCreate} Adlı Portföyünüze Eklendi` : `${houseId} No'lu Konut ${newCollectionNameCreate} Adlı Koleksiyonuza Eklendi`,
          });
        }, 700);
        // Başarılı yanıtı işleyin
        // setselectedCollectionName(response.data.collection.name)
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
      id: data?.housing?.id,
      project: null,
      selectedCollectionId: id,
      type: 2,
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
            title:(user.type==2 && user.corporate_type=='Emlak Ofisi')?'Portföye Ekleme Başarılı': "Koleksiyona ekleme başarılı",
            textBody:(user.type==2 && user.corporate_type=='Emlak Ofisi') ? `${id} No'lu Konut ${name} Adlı Portföyünüze Eklendi`: `${id} No'lu Konut ${name} Adlı Koleksiyonunuza Eklendi`,
            button: "Tamam",
          });
        }, 700);
        var newCollections = collections.map((collection) => {
          if (collection.id == id) {
            return {
              ...collection,
              links: [
                ...collection.links,
                {
                  collection_id: id,
                  room_order: null,
                  item_id: data?.housing?.id,
                  user_id: user?.id,
                  item_type: 2,
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
  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const addToCard = async () => {
    const formData = new FormData();
    formData.append("id", houseId);
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
  const ıtemOnCollection = (collectionId) => {
    let check = false;
    collections.map((collection) => {
      for (var i = 0; i < collection?.links?.length; i++) {
        if (
          (collection.links[i].item_type =
            1 &&
            collection.links[i].item_id == data.housing.id &&
            collection.links[i].collection_id == collectionId)
        ) {
          check = true;
        }
      }
    });

    return check;
  };
  const removeItemOnCollection = (collectionId,name) => {
    const collectionData = {
      item_type: 2,

      item_id: data.housing.id,
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
        setColectionSheet(false)
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title:(user.type==2 && user.corporate_type=='Emlak Ofisi') ? 'Portföyden Silindi': "Koleksiyondan Silindi",
          textBody:(user.type==2 && user.corporate_type=='Emlak Ofisi') ? `${houseId} No'lu Konut ${name} Adlı Portföyünüzden Silindi` : `${houseId} No'lu Konut ${name} Adlı Koleksiyonunuzdan Silindi`,
        });
        var newCollections = collections.map((collection) => {
          if (collection.id == collectionId) {
            var newLinks = collection.links.filter((link) => {
              if (
                link.collection_id == collectionId &&
                link.item_id == data.housing.id &&
                link.room_order == null
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
  const { width, height } = Dimensions.get("window");
  const [PopUpForRemoveItem, setsetPopUpForRemoveItem] = useState(false);
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
  const [index, setindex] = useState(0);
  const [tab, settab] = useState(0);
  const [inFavorite, setInFavorite] = useState(false);
  const [AlertForFavorite, setAlertForFavorite] = useState(false);

  // FATORİ EKLEME FONKSİYONU START //
  const addFavorites = () => {
    if (user.access_token) {
      const config = {
        headers: { Authorization: `Bearer ${user.access_token}` },
      };
      axios
        .post(
          `https://private.emlaksepette.com/api/add_housing_to_favorites/${data?.housing?.id}`,
          {},
          config
        )
        .then((res) => {
          console.log("Response received:", res.data); // Yanıtı kontrol et
          changeHeart(); // Kalp durumunu değiştirdiğinden emin ol
          if (res.data.status === "removed") {
            setInFavorite(false);
          } else {
            setInFavorite(true);
          }
        })
        .catch((error) => {
          console.error("Error adding to favorites:", error); // Hata durumunu kontrol et
        });
    } else {
      setAlertForFavorite(true);
    }
  };

  // FATORİ EKLEME FONKSİYONU END //

  const [AlertForAddToCard, setAlertForAddToCard] = useState(false);
  const OpenSharing =
    data &&
    data.housing &&
    data.housing.housing_type_data &&
    JSON.parse(data.housing.housing_type_data)["open_sharing1"];

  const totalRate =
    data &&
    data?.housingComments &&
    data?.housingComments
      ?.map((item) => parseFloat(item?.rate) || 0)
      .reduce((acc, rate) => acc + rate, 0);

  //     useEffect(() => {
  //

  //     }, [fetchDetails])

  // console.log(IsSwap + 'swap')

  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create an array of images for ImageViewing
  const imageURIs = images.map((item, _) => {
    if (_ == 0) {
      return {
        uri: `${item}`,
      };
    } else {
      return {
        uri: `${apiUrl}/housing_images/${item}`,
      };
    }
  });

  const handleOpenPhone = () => {
    let phoneNumber;

    // Eğer data?.housing?.user?.phone varsa ve area_code mevcutsa
    if (data?.housing?.user?.phone && data?.housing?.user?.area_code) {
      // Alan kodu ve telefon numarasını birleştir
      phoneNumber = `90${data.housing.user.area_code}${data.housing.user.phone}`;
    }
    // Eğer data?.housing?.mobile_phone varsa
    else if (data?.housing?.mobile_phone) {
      // Telefon numarası başında 0 ile başlıyorsa 0'ı kaldır ve +90 ekle
      phoneNumber = data.housing.mobile_phone.startsWith("0")
        ? `90${data.housing.mobile_phone.slice(1)}`
        : `90${data.housing.mobile_phone}`;
    }

    // Telefon numarasını kontrol et ve URL'yi oluştur
    if (phoneNumber) {
      // Numara başında + ekle
      Linking.openURL(`tel:+${phoneNumber}`);
    } else {
      console.error("Telefon numarası bulunamadı.");
    }
  };

  console.log(data?.housing?.user?.mobile_phone + "qeqw eqw eqw ewq");

  // Handle page change in PagerView

  return (
    <>
      <AlertNotificationRoot>
        {loading ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <ActivityIndicator color="#333" size={"large"} />
          </View>
        ) : (
          <SafeAreaView
            style={{ backgroundColor: "#f9f9f9", flex: 1, paddingTop: 20 }}
          >
            <Header onPress={toggleDrawer} index={setindex} tab={settab} />
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
               
                  <DrawerMenu setIsDrawerOpen={setIsDrawerOpen} />
               
              
              </View>
            </Modal>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                position: "absolute",
                bottom: 0,
                padding: 10,
                zIndex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingBottom: width > 400 ? 15 : 7,
                }}
              >
                {data?.housing?.user?.id == user?.id ? (
                  <></>
                ) : (
                  <TouchableOpacity
                    onPress={handleOpenPhone}
                    style={{
                      backgroundColor: "#ffffff",
                      width: "45%",
                      padding: 10,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "#EB2B2E",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#EB2B2E",
                        fontWeight: "700",
                      }}
                    >
                      Ara
                    </Text>
                  </TouchableOpacity>
                )}
                {data?.housing?.user?.id == user?.id ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#008001",
                      width: "90%",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#ffffff",
                        fontWeight: "700",
                      }}
                    >
                      İlanı Düzenle
                    </Text>
                  </TouchableOpacity>
                ) : data?.housing?.step1_slug == "mustakil-tatil" &&
                  data?.housing?.step2_slug == "gunluk-kiralik" ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CreateReservation", { data: data });
                    }}
                    style={{
                      backgroundColor: "#EB2B2E",
                      width: "45%",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#ffffff",
                        fontWeight: "700",
                      }}
                    >
                      Rezervasyon Yap
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      if (user.access_token) {
                        setModalForAddToCart(true);
                      } else {
                        setAlertForAddToCard(true);
                      }
                    }}
                    style={{
                      backgroundColor: "#EB2B2E",
                      width: "45%",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#ffffff",
                        fontWeight: "700",
                      }}
                    >
                      Sepete Ekle
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: data?.housing?.user?.banner_hex_code,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Profile", {
                    name: "",
                    id: data?.housing.user?.id,
                  });
                }}
                style={{
                  paddingLeft: 15,
                  padding: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between", // İlan No'nun sağda olması için
                }}
              >
                <View
                  style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
                >
                  <View style={{ height: 35, width: 35 }}>
                    {data?.housing?.user?.profile_image ? (
                      <ImageBackground
                        source={{
                          uri: `${apiUrl}/storage/profile_images/${data?.housing?.user?.profile_image}`,
                        }}
                        style={{ width: "100%", height: "100%" }}
                        borderRadius={20}
                      />
                    ) : (
                      <ImageBackground
                        source={{
                          uri: `${apiUrl}/storage/profile_images/indir.png`,
                        }}
                        style={{ width: "100%", height: "100%" }}
                        borderRadius={20}
                      />
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      width: 190,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: 12,
                        paddingLeft: 10,
                      }}
                      numberOfLines={1}
                    >
                      {data?.housing?.user?.name}
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
                        source={require("../BadgeYellow.png")}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                  </View>
                </View>

                {/* İlan No kısmı en sağda hizalanıyor */}
                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    İlan No:#2000{data?.housing?.id}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingBottom: 50 }}
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
                      {pagination + 1} / {images.length}
                    </Text>
                  </View>
                </View>

                <View style={styles.ıconContainer}>
                  <TouchableOpacity onPress={onShare}>
                    <View style={styles.ıcon}>
                      <Icon2 name="sharealt" size={18} />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      console.log("Favorite button pressed"); // Butona tıklanıp tıklanmadığını kontrol et
                      addFavorites();
                    }}
                  >
                    <View style={styles.ıcon}>
                      <Heart
                        name={heart}
                        size={18}
                        color={heart === "hearto" ? "black" : "red"}
                      />
                    </View>
                  </TouchableOpacity>

                  {OpenSharing == "Evet" && (
                    <TouchableOpacity
                      onPress={() => {
                        openCollection();
                      }}
                    >
                      <View style={styles.ıcon}>
                        <Bookmark name={bookmark} size={18} />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                <PagerView
                  style={{ height: 250 }}
                  onPageSelected={(event) =>
                    handlePageChange(event.nativeEvent.position)
                  }
                >
                  {images.map((item, index) => (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setIsVisible(true);
                        setCurrentIndex(index);
                      }}
                    >
                      <ImageBackground
                        source={{
                          uri: `${apiUrl}/housing_images/${
                            item.split("/")[item.split("/").length - 1]
                          }`,
                        }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Pressable>
                  ))}
                </PagerView>

                {/* Full-screen image viewing */}
                <ImageViewing
                  images={imageURIs}
                  imageIndex={currentIndex}
                  visible={isVisible}
                  onRequestClose={() => setIsVisible(false)}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  padding: 10,
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
                }}
              >
                <View style={{ paddingTop: 0, gap: 5 }}>
                  {totalRate != 0 && (
                    <View
                      style={{
                        position: "absolute",
                        right: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: "#264ABB",
                          fontWeight: "600",
                          fontSize: 13,
                        }}
                      >
                        {(totalRate / data?.housingComments?.length).toFixed(1)}
                      </Text>
                      <Icon2 name="star" color={"gold"} />
                    </View>
                  )}

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "#333",
                      fontWeight: "600",
                    }}
                  >
                    {data?.housing?.city?.title} /{" "}
                    {data?.housing?.county?.title}
                  </Text>

                  {/* <Text style={{textAlign:'center',color: "#264A" ,fontSize:15}}>{addDotEveryThreeDigits(JSON.parse(data?.housing?.housing_type_data)?.price)} ₺</Text>   */}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "#264ABB",
                    }}
                  >
                    {data?.pageInfo?.meta_title}
                  </Text>
                </View>
                <View style={{ padding: 10 }}>
                  {data && data.housing && data.housing.housing_type_data && (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "green",
                        fontWeight: "bold",
                        fontSize: 13,
                      }}
                    >
                      {addDotEveryThreeDigits(
                        JSON.parse(data.housing.housing_type_data)["price"]
                          ? JSON.parse(data.housing.housing_type_data)["price"]
                          : JSON.parse(data.housing.housing_type_data)[
                              "daily_rent"
                            ]
                      )}{" "}
                      ₺{" "}
                      {JSON.parse(data.housing.housing_type_data)[
                        "daily_rent"
                      ] && <Text style={{ color: "#EA2A28" }}>/ Gecelik</Text>}
                    </Text>
                  )}
                  <View style={{ paddingTop: 5 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 11,
                        color: "grey",
                        fontWeight: "700",
                      }}
                    >
                      {" "}
                      {"Emlak" +
                        " > " +
                        data?.housing?.step1_slug.charAt(0).toUpperCase() +
                        data?.housing?.step1_slug.slice(1) +
                        " > " +
                        data?.housing?.step2_slug.charAt(0).toUpperCase() +
                        data?.housing?.step2_slug.slice(1)}
                    </Text>
                  </View>
                </View>
                {data.housing &&
                  data.housing.housing_type_data &&
                  JSON.parse(data.housing.housing_type_data)["swap"] ==
                    "Evet" && (
                    <View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#FEF4EB",
                          flexDirection: "row",
                          padding: 6,
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          navigation.navigate("SwapForm", {
                            houseid: data?.housing?.id,
                          });
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "#F37919",
                              padding: 6,
                              borderRadius: 5,
                            }}
                          >
                            <Icon2 name="plus" size={16} color={"#fff"} />
                          </View>
                          <View style={{}}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#333",
                                fontWeight: "600",
                              }}
                            >
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
                  )}

                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <SliderMenuRealtorDetails
                    tab={tabs}
                    setTab={setTabs}
                    changeTab={changeTab}
                  />
                </View>
              </View>
              <View style={{ marginTop: 7 }}>
                {tabs == 0 && <RealtorCaption data={data} />}
                {tabs == 1 && <Settings data={data} />}
                {tabs == 2 && <RealtorMap mapData={data} />}
                {tabs == 3 && <Comment data={data} handleModal={handleModal} />}
              </View>

              {/* {tabs == 4 && (
              <SwapForm
                data={data}
                openModal={openSwapAler}
                color={setcolorAlert}
              />
            )} */}

              {/* 
                  {
                    ProjectHomeData.projectHousingsList((item,index)=>(
                      <Text>asd</Text>
                        // <Posts
                        //     key={index}
                        // />
                    ))
                  } */}

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
                      onPress={copyToClipboard}
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
                    <TouchableOpacity onPress={shareLinkOnWhatsApp}>
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
                backdropColor="transparent"
                style={styles.modal4}
              >
                <View style={styles.modalContent4}>
                  <>
                    {loadingcollection ? (
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
                      <SafeAreaView style={{}}>
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
                            {
                              (user.type==2 && user.corporate_type=='Emlak Ofisi') ? 'Portföye Ekle'
                              :
                              'Koleksiyona Ekle'
                            }
                            
                          </Text>
                          <Text
                            style={{
                              textAlign: "center",
                              color: "#B2B2B2",
                              fontSize: 14,
                            }}
                          >
                            {
                               (user.type==2 && user.corporate_type=='Emlak Ofisi') ? 
                               'Konutu portföylerinden birine ekleyebilir veya yeni bir portföy oluşturabilirsin':
                               'Konutu koleksiyonlarından birine ekleyebilir veya yeni bir koleksiyon oluşturabilirsin'
                            }
                            
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
                          {user.access_token &&
                            namFromGetUser.has_club == 1 && (
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
                                    removeItemOnCollection={
                                      removeItemOnCollection
                                    }
                                    key={index}
                                    item={item}
                                    getCollectionId={getCollectionId}
                                    addLink={addSelectedCollection}
                                  />
                                ))}
                              </>
                            )}
                          {!user.access_token && (
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
                                    {
                                      (user.type==2 && user.corporate_type=='Emlak Ofisi') ?
                                      'Portföyünüze konut ekleyebilmeniz için giriş yapmanız gerekmektedir':
                                      'Koleksiyonunuza konut ekleyebilmeniz için giriş yapmanız gerekmektedir'

                                    }
                                   
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
                          {user.access_token &&
                            namFromGetUser.has_club == 0 && (
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
                                    {
                                      (user.type==2 && user.corporate_type=='Emlak Ofisi') ?
                                      'Portföyünüze konut ekleyebilmeniz için Emlak Kulüp üyesi olmanız gerekmektedir':
                                      'Koleksiyonunuza konut ekleyebilmeniz için Emlak Kulüp üyesi olmanız gerekmektedir'

                                    }
                                    
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
                                    Emlak Kulüp Üyesi Ol{" "}
                                  </Text>
                                </TouchableOpacity>
                              </>
                            )}
                          {user.access_token &&
                            namFromGetUser.has_club == 2 && (
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
                                   {
                                      (user.type==2 && user.corporate_type=='Emlak Ofisi') ?
                                      'Portföyünüze konut ekleyebilmeniz için Emlak Kulüp üyesi olmanız gerekmektedir':
                                      'Koleksiyonunuza konut ekleyebilmeniz için Emlak Kulüp üyesi olmanız gerekmektedir'

                                    }
                                  </Text>
                                </View>
                              </>
                            )}
                          {user.access_token &&
                            namFromGetUser.has_club == 3 && (
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
                                    {
                                      (user.type==2 && user.corporate_type=='Emlak Ofisi') ?
                                      'Portföyünüze konut ekleyebilmeniz için Emlak Kulüp üyesi olmanız gerekmektedir':
                                      'Koleksiyonunuza konut ekleyebilmeniz için Emlak Kulüp üyesi olmanız gerekmektedir'

                                    }
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

                          {/* {user.access_token && user?.has_club == 0 ? (
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
                                  <Text style={{ textAlign: "center", color: "#7A8A95" }}>
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
                                  <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
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
                style={styles.modal5}
              >
                <View style={styles.modalContent5}>
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
                            {
                                      (user.type==2 && user.corporate_type=='Emlak Ofisi') ?
                                      'Portföy Oluştur':
                                      'Koleksiyon Oluştur'

                                    }
                            
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          gap: 6,
                          justifyContent: "center",
                          paddingTop: 15,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 13,
                            color: "#19181C",
                            fontWeight: "500",
                          }}
                        >
                            {
                                      (user.type==2 && user.corporate_type=='Emlak Ofisi') ?
                                      'Portföy İsmi':
                                      'Koleksiyon İsmi'

                                    }
                          
                        </Text>
                        <TextInput
                          style={styles.Input}
                          value={newCollectionNameCreate}
                          onChangeText={(value) => handleChangeText(value)}
                        />
                      </View>
                      <View style={{ paddingTop: 15 }}>
                        <TouchableOpacity
                          disabled={newCollectionNameCreate ? false : true}
                          style={{
                            backgroundColor: "#EA2A28",
                            padding: 10,
                            borderRadius: 6,
                            opacity: newCollectionNameCreate ? 1 : 0.3,
                          }}
                          onPress={() => {
                            addCollectionPost();
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontWeight: "500",
                            }}
                          >
                              {
                                      (user.type==2 && user.corporate_type=='Emlak Ofisi') ?
                                      'Portföy Oluştur':
                                      'Koleksiyon Oluştur'

                                    }
                          
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </SafeAreaView>
                  </ScrollView>
                </View>
              </Modal>

              {/* <Modal
              isVisible={modalVisibleComennet}
              onBackdropPress={() => setmodalVisibleComment(false)}
              backdropColor="transparent"
              style={styles.modal2}
            >
              <View style={styles.modalContent2}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <Text style={{ textAlign: "center", fontSize: 16 }}>
                    Konutu Değerlendir
                  </Text>
                  <TouchableOpacity
                    onPress={() => setmodalVisibleComment(false)}
                    style={{
                      backgroundColor: "#E54242",
                      width: "30%",
                      padding: 8,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "white" }}>
                      İptal Et
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 4,
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderBottomColor: "#ebebeb",
                      padding: 10,
                    }}
                  >
                    <View style={{ height: 35, width: 35 }}>
                      {data?.housing?.user?.profile_image ? (
                        <ImageBackground
                          source={{
                            uri: `${apiUrl}/storage/profile_images/${data?.housing?.user?.profile_image}`,
                          }}
                          style={{ width: "100%", height: "100%" }}
                          borderRadius={20}
                        />
                      ) : (
                        <ImageBackground
                          source={{
                            uri: `${apiUrl}/storage/profile_images/indir.png`,
                          }}
                          style={{ width: "100%", height: "100%" }}
                          borderRadius={20}
                        />
                      )}
                    </View>
    
                    <Text style={{ color: "#333" }}>
                      {data?.housing?.user?.name}
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
                        source={require("../BadgeYellow.png")}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    gap: 20,
                    paddingTop: 15,
                  }}
                >
                  {[...Array(5)].map((_, index) => (
                    <View key={index}>
                      <TouchableOpacity onPress={() => handleStarPress(index)}>
                        <Ionicons
                          name={index < rating ? "md-star" : "md-star-outline"}
                          size={30}
                          color={index < rating ? "gold" : "gray"}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <View style={{ paddingTop: 20, gap: 5 }}>
                  <Text style={{ fontSize: 13 }}>Yorumunuz</Text>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      padding: 9,
                      borderRadius: 6,
                      borderColor: "#ebebeb",
                      backgroundColor: "#EDEFF7",
                    }}
                    placeholder="Örn:Mahalle gerçekten çok nezih "
                  />
                </View>
                <View style={{ marginTop: 15 }}>
                  <ScrollView
                    horizontal
                    style={{ height: 100, gap: 10 }}
                    contentContainerStyle={{ gap: 15 }}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#f2f2f2",
                        height: 100,
                        borderWidth: 1,
                        borderStyle: "dashed",
                        borderColor: "grey",
                        width: 100,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Ionicons
                          name="camera-outline"
                          size={30}
                          color={"#EA2B2E"}
                        />
                        <Text style={{ fontSize: 10, color: "#333" }}>
                          Fotoğraf Ekle
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <CheckBox
                    checked={checked}
                    onPress={toggleCheked}
                    // Use ThemeProvider to make change for all checkbox
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor="#E54242"
                    title={
                      <View style={{ paddingLeft: 10 }}>
                        <Text>
                          <Text style={{ fontSize: 13 }} numberOfLines={2}>
                            Yorumlarda ismiminin gözükmesine ve yorum detaylanının
                            site genelinde kullanılmmasına izin veriyorum.
                          </Text>
                          <Text style={{ fontSize: 13 }}>
                            Aydınlatma Metnine ulaşmak için tıklayınız
                          </Text>
                        </Text>
                      </View>
                    }
                    containerStyle={{
                      backgroundColor: "white",
                      borderWidth: 0.5,
                      borderColor: "#ebebeb",
                    }}
                  />
                </View>
              </View>
            </Modal> */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleAlert}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisibleAlert(!modalVisibleAlert);
                }}
              >
                <View style={styles.centeredView}>
                  <View
                    style={[
                      styles.modalView,
                      {
                        height: "100%",
                        padding: 10,
                        borderRadius: 0,
                        backgroundColor: colorAlert,
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <View
                      style={{
                        flex: 0.3 / 2,
                        padding: 2,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisibleAlert(!modalVisibleAlert)}
                      >
                        <Icon name="closesquare" size={40} color={"red"} />
                      </Pressable>
                    </View>
                    <View style={{ flex: 1.5 / 2 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 15,
                          color: "red",
                        }}
                      >
                        {AlertMessage}
                      </Text>
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
                    {images.map((item, _index) => [
                      <View key={_index} style={{}}>
                        <ImageBackground
                          source={{ uri: `${apiUrl}/housing_images/${item}` }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </View>,
                    ])}
                    {/* {
                  data.housing.images.map((image,index) => {
                    // console.log(`${apiUrl}${image.image.replace("public",'storage')}`)
                    return(
                      <Pressable key={index+1} onPress={()=>setCoverImageModal(true)}>
                        <ImageBackground
                          source={{uri:`${apiUrl}${image.image.replace("public",'storage')}`}}
                          style={{ width: "100%", height: "100%", }}
                         
                          resizeMode='cover'
                        
                        />
                      </Pressable>
                    )
                  })
                } */}
                  </PagerView>
                </View>
              </Modal>
            </ScrollView>
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
              title={"Giriş Yap"}
              messageStyle={{ textAlign: "center" }}
              message="Favorilerinize İlan Ekleyebilmek İçin Giriş Yapmanız Gerekir"
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
            <AwesomeAlert
              show={AlertForAddToCard}
              showProgress={false}
              titleStyle={{
                color: "#333",
                fontSize: 13,
                fontWeight: "700",
                textAlign: "center",
                margin: 5,
              }}
              title={`Giriş Yap`}
              messageStyle={{ textAlign: "center" }}
              message="Sepetinize konut ekleyebilmek için Giriş Yapmanız gerekmektedir"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Vazgeç"
              confirmText="Giriş Yap"
              cancelButtonColor="#ce4d63"
              confirmButtonColor="#1d8027"
              onCancelPressed={() => {
                setAlertForAddToCard(false);
              }}
              onConfirmPressed={() => {
                navigation.navigate("Login");
                setAlertForAddToCard(false);
              }}
              confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
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
              title={`2000${houseId} No'lu Konutu sepete eklemek istediğinize eminmisiniz`}
              messageStyle={{ textAlign: "center" }}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Hayır"
              confirmText="Evet"
              cancelButtonColor="#ce4d63"
              confirmButtonColor="#1d8027"
              onCancelPressed={() => {
                setModalForAddToCart(false);
              }}
              onConfirmPressed={() => {
                addToCard();
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
    backgroundColor: "#ECECF2", // Top bar background color
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
  ıconContainer: {
    width: 50,
    height: 150,
    backgroundColor: "transparent",
    position: "absolute",
    right: 7,
    top: 43,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
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
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "white",
    padding: 20,
    height: "30%",
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
    padding: 5,
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
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "white",
    padding: 20,
    height: "88%",
  },
  modal3: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent3: {
    backgroundColor: "white",

    height: "35%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal4: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#fefefe",

    height: "52%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal5: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "#1414148c",
  },
  modalContent5: {
    backgroundColor: "#fefefe",

    height: "100%",
  },
  centeredViewSave: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // modal dışı koyu arkaplan
  },
  modalViewSave: {
    width: "100%",

    backgroundColor: "red",
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
  modal6: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#1414148c",
  },
  modalContent6: {
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 5,
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
});
