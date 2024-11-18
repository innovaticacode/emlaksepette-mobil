import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
} from "react-native";

import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Trash from "react-native-vector-icons/Entypo";
import Info from "./Info";
import { addDotEveryThreeDigits } from "./methods/merhod";
import { Platform } from "react-native";
import moment from "moment";
import "moment/locale/tr";
import { Svg } from "react-native-svg";
import { Polyline } from "react-native-maps";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import { getValueFor } from "./methods/user";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from "react-native-alert-notification";
import * as SecureStore from "expo-secure-store";
import {
  BookmarkStatus,
  leftButtonsForPost,
  PriceStatus,
  rightButtonsForPost,
} from "../pages/helper";
import PaymentPlanModal from "./PaymentPlanModal";
import ShareProgressBar from "./ShareProgessBar";
import { apiUrl, frontEndUriBase } from "./methods/apiRequest";

export default function Posts({
  project,
  price,
  formattedDiscountedPrice,
  numberOfShare,
  shareSaleEmpty,
  offSaleCheck,
  sumCartOrderQt,
  soldCheck,
  shareSale,
  data,
  roomOrder,
  location,
  openFormModal,
  openModal,
  openCollection,
  GetIdForCart,
  GetID,
  bookmarkStatus,
  projectDiscountAmount,
  sold,
  allCounts,
  blockHousingCount,
  previousBlockHousingCount,
  projectFavorites,
  isUserSame,
  haveBlocks,
  lastBlockItemCount,
  isFavorite,
}) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState("hearto");
  const [showAlert, setShowAlert] = useState(false);
  const [inFavorite, setInFavorite] = useState(false);
  const [bookmark, setBookmark] = useState("bookmark-o");
  const roomData = data.projectHousingsList[roomOrder] || {};
  const [user, setUser] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const openAlert = (room) => {
    setSelectedRoom(room);
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const [neightboord, setNeightboord] = useState(false);


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

  const handleYes = () => {
    // İlan başlığını, fiyatı ve ilan numarasını alın
    const title = selectedRoom
      ? selectedRoom["advertise_title[]"]
      : "Başlık bulunamadı";
    const amount = 250; // Fiyatı burada belirliyoruz
    const imageUrl = selectedRoom
      ? frontEndUriBase + "project_housing_images/" +
      selectedRoom["image[]"]
      : ""; // Resim URL'sini burada belirleyin
    const neightboord = false;
    const ilanNo = 1000000 + data.project.id + roomOrder; // İlan numarasını belirliyoruz
    const roomOrderString = roomOrder.toString();

    // Verileri secureStore ile saklayın
    saveData(title, amount, imageUrl, neightboord, ilanNo, roomOrderString)
      .then(() => {
        // Basket bileşenine yönlendirin
        navigation.navigate("Basket2");

        // Modalı kapatın
        closeAlert();
      })
      .catch((error) => {
        console.error("Onay işlemi sırasında bir hata oluştu:", error);
      });
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };

  const changeBookmark = () => {
    setBookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };

  function truncateText(text, wordLimit) {
    const words = text?.split(" ");
    return words?.length > wordLimit
      ? words?.slice(0, wordLimit).join(" ") + "..."
      : text;
  }
  const formatPrice = (price) => addDotEveryThreeDigits(Math.round(price));

  function navigateToPostDetails() {

    navigation.navigate('PostDetails', { HomeId: roomOrder, projectId: data.project.id })

  }

  const changeFavorite = () => {
    setShowAlert(true);
  };

  const addFavorites = () => {
    if (user.access_token) {
      const config = {
        headers: { Authorization: `Bearer ${user.access_token}` },
      };
      axios
        .post(
          `${apiUrl}add_project_to_favorites/` +
          roomOrder,
          {
            project_id: project?.id,
            housing_id: roomOrder,
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
      setShowAlert(false);
    } else {
      setalertForFavorite(true);
    }
  };

  useEffect(() => {
    if (projectFavorites?.includes(roomOrder)) {
      setHeart("heart");
      setInFavorite(true);
    } else {
      setHeart("hearto");
      setInFavorite(false);
    }
  }, [projectFavorites]);

  const [addShowCart, setaddShowCart] = useState(false);

  const addToCard = async () => {
    const formData = new FormData();
    formData.append("id", roomOrder);
    formData.append(
      "isShare",
      roomData["share_sale[]"] ? roomData["share_sale[]"] : "[]"
    );
    formData.append(
      "numbershare",
      roomData["number_of_shares[]"] ? roomData["number_of_shares[]"] : "[]"
    );
    formData.append("qt", 1);
    formData.append("type", "project");
    formData.append("clear_cart", "no");
    formData.append("project", project?.id);
    try {
      if (user?.access_token) {
        const response = await axios.post(
          `${apiUrl}institutional/add_to_cart`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };
  const [alertForSign, setalertForSign] = useState(false);
  const [alertForFavorite, setalertForFavorite] = useState(false);
  const [cartIsNull, setcartIsNull] = useState(false);
  const [AddCartShow, setAddCartShow] = useState(false);

  const handlePress = () => {
    // openFormModal(roomOrder);
    // GetID(roomOrder); //
    navigation.navigate("SwapScreenNav", {
      roomOrder: roomOrder,
      projectId: data.project.id,
    });
  };



  const [offSaleStatus, setoffSaleStatus] = useState(null);
  useEffect(() => {
    if (project && data && roomData && roomData["off_sale[]"]) {
      const parsedOffsale = JSON.parse(roomData["off_sale[]"]);
      project && data && roomData && setoffSaleStatus(parsedOffsale);
    }
  }, [roomData]);



  const [PaymaentAlert, setPaymaentAlert] = useState(false);
  const [paymentModalVisible, setpaymentModalVisible] = useState(false)
  const HandleModal = () => {
    if ((roomData['share_sale[]'] !== '[]' && sumCartOrderQt[roomOrder]?.qt_total == numberOfShare)) {
      setPaymaentAlert(true)
    } else {
      setpaymentModalVisible(true)
    }


    // if (offSaleStatus != 5 && !user.access_token) {
    //   setPaymaentAlert(true);
    // } else {
    //   openModal(roomOrder);
    // }
  };
  const onClose = () => {
    setpaymentModalVisible(false)
  }
  const AddCartModal = () => {
    if (user.access_token) {
      if (user.cartItem !== null) {
        setcartIsNull(true);
      } else {
        setaddShowCart(true);
      }
    } else {
      setalertForSign(true);
    }
  };
  const RigthBtnFunctionsForkey = (key) => {
    switch (key) {
      case "PaymentModal":
        return HandleModal();
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
        return AddCartModal();
      case "request":
        return alert("bilgi Al Modalı Gelecek");
      case "GiveOffer":
        return alert("Teklif ver ve Başvuru Yap için Başka sayfalara geçicek");
      case "ShowAdvert":
        return navigateToPostDetails();
      default:
        return [];
    }
  };


  return (
    <View style={styles.container}>
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
          setPaymaentAlert(false)
        }}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}

      />
      <AwesomeAlert
        show={cartIsNull}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        title={"Sepetinize sadece 1 Ürün Ekleyebilirsiniz "}
        messageStyle={{ textAlign: "center" }}
        message={`Mevcut sepeti silmek istermisiniz`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Hayır"
        confirmText="Evet"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={() => {
          setcartIsNull(false);
        }}
        onConfirmPressed={() => {
          addToCard();
          setcartIsNull(false);
        }}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <AwesomeAlert
        show={alertForFavorite}
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
        message={`Favorilerinize konut ekleyebilmek için giriş yapmanız gerekmektedir.`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Vazgeç"
        confirmText="Giriş Yap"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={() => {
          setalertForFavorite(false);
        }}
        onConfirmPressed={() => {
          setalertForFavorite(false);
          setTimeout(() => {
            navigation.navigate("Login");
          }, 400);
        }}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <AwesomeAlert
        show={alertForSign}
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
        message={`Sepetine konut ekleyebilmek için giriş yapmanız gerekmektedir.`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Vazgeç"
        confirmText="Giriş Yap"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={() => {
          setalertForSign(false);
        }}
        onConfirmPressed={() => {
          setalertForSign(false);
          setTimeout(() => {
            navigation.navigate("Login");
          }, 400);
        }}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <AwesomeAlert
        show={addShowCart}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        title={truncateText(roomData["advertise_title[]"], 4)}
        messageStyle={{ textAlign: "center" }}
        message={`#1000${project?.id} No'lu Projenin ${roomOrder} No'lu Konutu'nu Sepete Eklemek İstiyor Musunuz?`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Hayır"
        confirmText="Evet"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={() => {
          setaddShowCart(false);
        }}
        onConfirmPressed={() => {
          addToCard();
        }}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <View style={styles.İlan}>
        <TouchableOpacity
          style={{ width: "30%" }}
          onPress={navigateToPostDetails}
        >
          <View>
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                left: 0,
                backgroundColor: "#EA2C2E",
                padding: 4,
              }}
            >
              <Text style={styles.noText}>
                No {haveBlocks ? roomOrder - lastBlockItemCount : roomOrder}
              </Text>
            </View>
            <Image
              source={{
                uri:
                  frontEndUriBase + "project_housing_images/" +
                  roomData["image[]"],
              }}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.container2}>
          <View style={styles.captionAndIcons}>
            <View style={styles.caption}>
              <Text style={styles.ilanNoText}>
                İlan No: {1000000 + data.project.id + '-' + roomOrder}
              </Text>
              <Text style={styles.adTitleText}>
                {truncateText(roomData["advertise_title[]"], 4)}
              </Text>
            </View>
            <View
              style={[
                styles.icons,
                {
                  // justifyContent: bookmarkStatus ? "space-between" : "flex-end",
                  justifyContent: "flex-end",
                }]}
            >
              {/* {BookmarkStatus.map((item) => (
                <TouchableOpacity
                  onPress={() => {
                    changeBookmark();
                    openCollection(roomOrder);
                    GetID(roomOrder);
                  }}
                >
                  {sold ? (
                    <></>
                  ) : (
                    <View
                      style={[
                        styles.ıconContainer,
                        {
                          display:
                            user.type == 2
                              ? Array.isArray(item.OnlySee) &&
                                item.OnlySee.includes(user.corporate_type) &&
                                Array.isArray(item.offsale) &&
                                item.offsale.includes(Number(offSaleStatus))
                                ? "flex"
                                : "none"
                              : item.isShowClient == 1 &&
                                Array.isArray(item.offsalePersonal) &&
                                item.offsalePersonal.includes(
                                  Number(offSaleStatus)
                                )
                                ? "flex"
                                : "none",
                        },
                      ]}
                    >
                      <Bookmark
                        name={bookmark}
                        size={13}
                        color={bookmark === "bookmark-o" ? "black" : "red"}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))} */}

              <TouchableOpacity onPress={addFavorites}>
                {sold || offSaleStatus == 1 ? (
                  <></>
                ) : (
                  <View style={styles.ıconContainer}>
                    <Heart
                      name={heart}
                      size={13}
                      color={heart === "hearto" ? "black" : "red"}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {
            PriceStatus.map((item) => (
              <View style={{
                display:

                  user.type == 2
                    ? Array.isArray(item.OnlySee) &&
                      item.OnlySee.includes(
                        user.corporate_type
                      ) &&
                      item.offsale == offSaleStatus &&
                      !sold
                      ? "flex"
                      : "none"
                    : item.isShowClient == 1 &&
                      item.offsale == offSaleStatus &&
                      !sold
                      ? "flex"
                      : "none",

              }}>

                {offSaleCheck && !soldCheck && shareSaleEmpty ? (

                  <View>
                    {projectDiscountAmount ? (
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
                          {formatPrice(formattedDiscountedPrice)} ₺
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.regularPrice}>
                        {formatPrice(roomData["price[]"])} ₺
                      </Text>
                    )}
                    {projectDiscountAmount > 0 && (
                      <Text style={styles.discountText}>
                        {formatPrice(projectDiscountAmount)} ₺ indirim
                      </Text>
                    )}
                  </View>
                ) : (shareSale &&
                  shareSale !== "[]" &&
                  sumCartOrderQt[roomOrder]?.qt_total !== numberOfShare) ||
                  (shareSale && shareSale !== "[]" && !sumCartOrderQt[roomOrder]) ? (
                  <View>
                    <Text style={[styles.regularPrice, {}]}>
                      {shareSale && shareSale !== "[]" && numberOfShare !== 0 && (
                        <Text style={styles.shareSaleText}>1/{numberOfShare}</Text>
                      )}
                      {" Pay Fiyatı - "}
                      {shareSale && shareSale !== "[]" && numberOfShare !== 0
                        ? formatPrice(roomData["price[]"] / numberOfShare)
                        : formatPrice(roomData["price[]"])}
                      ₺
                    </Text>
                  </View>
                ) : (
                  <View style={{ paddingTop: 5, alignItems: "flex-end" }}>
                    <Text
                      style={{ fontSize: 12, color: "#264ABB", fontWeight: "800" }}
                    >
                      {formatPrice(roomData["price[]"])}₺
                    </Text>
                  </View>
                )
                }
              </View>
            ))
          }

          <View style={styles.priceAndButtons}>
            <View style={styles.btns}>
              {roomData["share_sale[]"] !== "[]" ? (
                sumCartOrderQt[roomOrder]?.qt_total == numberOfShare ? (
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
                            (sold?.status == 1 && sold.is_show_user !== "on") ||
                            project.user.id == user.id ||
                            project.user.id == user.parent_id
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
                      {project.user.id == user.id ||
                        project.user.id == user.parent_id ? (
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
                          (offSaleStatus == 1 &&
                            roomData["share_sale[]"] !== "[]") ||
                            (sold?.status == 1 && sold.is_show_user !== "on") ||
                            project.user.id == user.id ||
                            project.user.id == user.parent_id
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
                        (offSaleStatus == 1 &&
                          roomData["share_sale[]"] !== "[]") ||
                          (sold && sold.is_show_user !== "on") ||
                          (sold &&
                            sold.is_show_user == "on" &&
                            sold.user_id == user.id) ||
                          project.user.id == user.id ||
                          project.user.id == user.parent_id
                          ? "100%"
                          : "50%",
                    }}
                  >

                    {(!sold && project.user.id == user.id) ||
                      (!sold && project.user.id == user.parent_id) ? (

                      <View style={styles.priceContainer}>
                        <TouchableOpacity style={styles.addBasket}>
                          <Text style={styles.addBasketText}>
                            İlanı Düzenle
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : sold ? (
                      sold?.status == 1 ? (
                        <View
                          style={
                            sold.user_id == user.id
                              ? styles.showCustomer
                              : styles.sold
                          }
                        >
                          {sold.user_id == user.id ? (
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
                          (sold?.status == 1 && sold.is_show_user !== "on") ||
                          project.user.id == user.id ||
                          project.user.id == user.parent_id
                          ? "none"
                          : "flex",
                    }}
                  >
                    {sold ? (
                      (sold?.status == 1 && sold.is_show_user == "on") ||
                        (sold &&
                          sold.is_show_user == "on" &&
                          sold.user_id != user.id)

                        ? (
                          <TouchableOpacity
                            style={styles.showCustomer}
                            onPress={() => openAlert(roomData)}
                          >
                            <Text style={styles.showCustomerText}>
                              Komşumu Gör
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          null
                        )
                    ) : (
                      rightButtonsForPost.map((item, _i) => (
                        <TouchableOpacity
                          key={_i}
                          style={[
                            styles.payDetailBtn,
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
                          onPress={() => {
                            RigthBtnFunctionsForkey(item.key);
                          }}
                        >
                          <Text style={styles.payDetailText}>{item.title}</Text>
                        </TouchableOpacity>
                      ))
                    )}
                  </View>
                </>
              )}

              <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Komşumu Gör"
                message={`"${truncateText(
                  selectedRoom
                    ? selectedRoom["advertise_title[]"]
                    : "Başlık bulunamadı",
                  20
                )}"\n\nİlan No: ${1000000 + data.project.id + roomOrder
                  }\nÖdeme Tarihi: ${formattedDate}\nTutar: 250 TL\n\nKomşumu Gör Özelliği: İlgilendiğiniz projeden konut alanları arayıp proje hakkında detaylı referans bilgisi almanıza imkan sağlar.\n\nKomşunuza ait iletişim bilgilerini görmek için aşağıdaki adımları takip edin:\n\n1. Ödeme işlemini tamamlayın ve belirtilen tutarı ödediğiniz takdirde,\n2. Ödemeniz onaylandıktan sonra, "Komşumu Gör" düğmesi aktif olacak ve komşunuzun iletişim bilgilerine ulaşabileceksiniz.`}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Hayır"
                confirmText="Evet"
                confirmButtonColor="#008000"
                cancelButtonColor="#EA2A28"
                onCancelPressed={closeAlert}
                onConfirmPressed={handleYes}
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
            </View>
          </View>
        </View>
      </View>

      {

        (roomData['share_sale[]'] !== '[]' && offSaleStatus != 1) &&

        <ShareProgressBar toplamHisse={roomData['number_of_shares[]']} satilanHisse={sold ? sumCartOrderQt[roomOrder]?.qt_total : 0} IsShowText={sumCartOrderQt[roomOrder]?.qt_total == numberOfShare} />



      }

      {data?.project?.list_item_values && (
        <View style={[styles.infoContainer, { gap: 16 }]}>
          <View style={styles.infoRow}>
            {
              roomData[`${data?.project?.list_item_values?.column1_name}[]`] &&
              <Info
                text={
                  roomData[`${data?.project?.list_item_values?.column1_name}[]`] +
                  " " +
                  (data.project.list_item_values.column1_additional || "")
                }
              />
            }

            {
              roomData[`${data?.project?.list_item_values?.column2_name}[]`] &&
              <Info
                text={
                  roomData[`${data?.project?.list_item_values?.column2_name}[]`] +
                  " " +
                  (data.project.list_item_values.column2_additional || "")
                }
              />
            }

            {
              roomData[`${data?.project?.list_item_values?.column3_name}[]`] &&
              <Info
                text={
                  roomData[`${data?.project?.list_item_values?.column3_name}[]`] ? roomData[`${data?.project?.list_item_values?.column3_name}[]`] : null +
                    " " +
                    (data.project.list_item_values.column3_additional || "")
                }
              />
            }

            <Info text={moment(project.created_at).locale("tr").format("LL")} />
          </View>
          <View style={styles.infoLocation}>
            <Text style={styles.informationText}>{location}</Text>
          </View>
        </View>
      )}
      <PaymentPlanModal visible={paymentModalVisible} title={data?.project?.project_title} onClose={onClose} data={roomData} RoomOrder={roomOrder} />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBlockColor: "#E8E8E8",
  },
  İlan: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 5,
    paddingTop: 5,
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
    gap: 2,
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EA2B2E",
    borderRadius: 5,
  },
  addBasketText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  showCustomer: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 5,
  },
  showCustomerText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  pending: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 5,
  },
  pendingText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  offSale: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 5,
  },
  offSaleText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  sold: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 5,
  },
  soldText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  payDetailBtn: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  payDetailText: {
    fontWeight: "700",
    fontSize: 12,
    color: "black",
  },
  ıconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFFF",
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: "#f0f0f0",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  informationText: {
    fontSize: width > 400 ? 12 : 10,
    right: width > 400 ? 10 : 5,
  },
  ilanNoText: {
    fontSize: 11,
    color: "black",
    fontWeight: "800",
    marginHorizontal: 5,
  },
  adTitleText: {
    fontSize: 11,
    fontWeight: "700",
    paddingTop: 3,
    marginHorizontal: 5,
  },
  noText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: 80,
    objectFit: "cover",
  },
  priceAndButtons: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  priceText: {
    color: "#264ABB",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 5,
  },
  discountText: {
    color: "red",
    fontSize: 11,
    padding: 5,
  },
  infoContainer: {
    backgroundColor: "#E8E8E8",
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoRow: {
    display: "flex",
    flexDirection: "row",
  },
  infoLocation: {
    justifyContent: "center",
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    marginLeft: 5,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#ea2a28",
    fontWeight: "700",
    fontSize: 11,
  },
  discountedPrice: {
    color: "#27bb53",
    fontWeight: "700",
    fontSize: 12,
    position: "relative",
    marginLeft: 5,
  },
  regularPrice: {
    color: "#274abb",
    fontWeight: "700",
    fontSize: 12,
  },
  discountText: {
    color: "red",
    fontSize: 11,
    padding: 5,
  },
  shareSaleText: {
    width: "100%",
    color: "#274abb",
    fontWeight: "700",
    fontSize: 12,
    position: "relative",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#EA2A28",
    marginHorizontal: 10,
  },
});
