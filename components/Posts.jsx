import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Trash from "react-native-vector-icons/Entypo";
import Info from "./Info";
import { addDotEveryThreeDigits } from "./methods/merhod";
import { Platform } from "react-native";
export default function Posts({
  data,
  roomOrder,
  caption,
  location,
  price,
  ımage,
  metre,
  odaSayısı,
  katSayısı,
  No,
  isFavorited,
  setModalVisible,
  openmodal,
  openFormModal,
  openCollection,
  GetIdForCart,
  GetID,
  bookmarkStatus,
}) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  var roomData = data.projectHousingsList[roomOrder];
  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PostDetails", {
          HomeId: roomOrder,
          projectId: data.project.id,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.İlan}>
          <View style={{ width: "30%" }}>
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                left: 0,
                backgroundColor: "#EA2C2E",
                padding: 4,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: 12,
                  color: "white",
                }}
              >
                No {roomOrder} {bookmarkStatus}
              </Text>
            </View>
            <Image
              source={{
                uri:
                  "https://test.emlaksepette.com/project_housing_images/" +
                  roomData["image[]"],
              }}
              style={{ width: "100%", height: 80, objectFit: "cover" }}
            />
          </View>
          <View style={styles.container2}>
            <View style={styles.captionAndIcons}>
              <View style={styles.caption}>
                <Text style={{ fontSize: 9, color: "black" }}>
                  İlan No: {1000000 + data.project.id} 
                </Text>
                <Text style={{ fontSize: 9, fontWeight: 700 }}>
                  {truncateText(roomData["advertise_title[]"], 4)}
                </Text>
              </View>
              <View
                style={{
                  ...styles.ıcons, // Diğer stil özelliklerini ekleyin
                  justifyContent: bookmarkStatus && bookmarkStatus == true ? "space-between" : "flex-end", // Koşula göre justifyContent özelliğini belirleyin
                }}
              >
                {bookmarkStatus && bookmarkStatus == true && (
                  <TouchableOpacity
                    onPress={() => {
                      changeBookmark();
                      openCollection(roomOrder);
                    }}
                  >
                    <View style={styles.ıconContainer}>
                      <Bookmark
                        name={bookmark}
                        size={13}
                        color={bookmark == "bookmark-o" ? "black" : "red"}
                      />
                    </View>
                  </TouchableOpacity>
                )}

                {!isFavorited ? (
                  <TouchableOpacity
                    onPress={() => {
                      changeHeart();
                    }}
                  >
                    <View style={styles.ıconContainer}>
                      <Heart
                        name={heart}
                        size={13}
                        color={heart == "hearto" ? "black" : "red"}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  >
                    <View style={styles.ıconContainer}>
                      <Trash name="trash" size={13} color="red" />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.PriceAndButtons}>
              <View style={styles.btns}>
                <View style={{ width: "50%" }}>
                  {data.projectCartOrders[roomOrder] ? (
                    data.projectCartOrders[roomOrder].status == 1 ? (
                      <TouchableOpacity style={styles.sold}>
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          Satıldı
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.pending}>
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          Rezerve Edildi
                        </Text>
                      </TouchableOpacity>
                    )
                  ) : roomData["off_sale[]"] !== "[]" ? (
                    <TouchableOpacity style={styles.offSale} disabled={true}>
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "500",
                          fontSize: 12,
                        }}
                      >
                        Satışa Kapalı
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#264ABB",
                            fontWeight: "700",
                            fontSize: 12,
                            marginBottom: 5,
                          }}
                        >
                          {addDotEveryThreeDigits(
                            data.projectHousingsList[roomOrder]["price[]"]
                          ) + " ₺"}
                        </Text>
                        <TouchableOpacity
                          style={styles.addBasket}
                          onPress={() => {
                            GetIdForCart(roomOrder);
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "500",
                              fontSize: 12,
                            }}
                          >
                            Sepete Ekle
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>

                <View style={{ width: "50%" }}>
                  {data.projectCartOrders[roomOrder] ? (
                    data.projectCartOrders[roomOrder].is_show_user == "on" ? (
                      <TouchableOpacity style={styles.showCustomer}>
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          Komşumu Gör
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.PayDetailBtn}
                        onPress={() => {
                          openmodal();
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "500",
                            fontSize: 12,
                            color: "white",
                          }}
                        >
                          Ödeme Detayı
                        </Text>
                      </TouchableOpacity>
                    )
                  ) : roomData["off_sale[]"] != "[]" ? (
                    <TouchableOpacity
                      onPress={() => {
                        openFormModal(roomOrder);
                        GetID(roomOrder);
                      }}
                      style={styles.PayDetailBtn}
                    >
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 12,
                          color: "white",
                        }}
                      >
                        Başvuru Yap
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.PayDetailBtn}
                      onPress={() => {
                        openmodal(roomOrder);
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "500",
                          fontSize: 12,
                          color: "white",
                        }}
                      >
                        Ödeme Detayı
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
        {data?.project?.list_item_values && (
          <View
            style={{
              backgroundColor: "#E8E8E8",
              height: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Info
                text={
                  data?.projectHousingsList[roomOrder][
                    data?.project?.list_item_values?.column1_name + "[]"
                  ] +
                  " " +
                  (data.project.list_item_values.column1_additional != null
                    ? data.project.list_item_values.column1_additional
                    : "")
                }
              />
              <Info
                text={
                  data?.projectHousingsList[roomOrder][
                    data?.project?.list_item_values?.column2_name + "[]"
                  ] +
                  " " +
                  (data.project.list_item_values.column2_additional != null
                    ? data.project.list_item_values.column2_additional
                    : "")
                }
              />
              <Info
                text={
                  data?.projectHousingsList[roomOrder][
                    data?.project?.list_item_values?.column3_name + "[]"
                  ] +
                  " " +
                  (data.project.list_item_values.column3_additional != null
                    ? data.project.list_item_values.column3_additional
                    : "")
                }
              />
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.InformationText}>{location}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
const { width, height } = Dimensions.get("window");
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
  PriceAndButtons: {
    marginTop: "auto", // Push to the bottom
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  caption: {
    width: "70%",
  },
  ıcons: {
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
    padding: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#264ABB",
  },
  showCustomer:{
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "green",
  },
  pending: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "orange",
  },
  sold: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: "red",
  },
  PayDetailBtn: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    alignItems: "center",
    backgroundColor: "#000000",
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
  InformationText: {
    fontSize: width > 400 ? 12 : 10,
    right: width > 400 ? 10 : 5,
  },
  priceText: {
    color: "#264ABB",
    fontWeight: "700",
    fontSize: 12,
  },
  discountedPriceText: {
    textDecorationLine: "line-through",
    color: "#FF0000",
    fontWeight: "700",
    fontSize: 10,
  },
  discountText: {
    color: "red",
    fontSize: 11,
    padding: 5,
  },
});
