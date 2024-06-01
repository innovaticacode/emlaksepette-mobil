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
  openmodal,
  openCollection,
  GetIdForCart,
  GetID,
  bookmarkStatus,
  projectDiscountAmount,
  sold,
  allCounts,
  blockHousingCount,
  previousBlockHousingCount,
  isUserSame,
}) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setBookmark] = useState("bookmark-o");
  const roomData = data.projectHousingsList[roomOrder] || {};

  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };

  const changeBookmark = () => {
    setBookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }
  const formatPrice = (price) => addDotEveryThreeDigits(Math.round(price));

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
              <Text style={styles.noText}>No {roomOrder}</Text>
            </View>
            <Image
              source={{
                uri:
                  "https://test.emlaksepette.com/project_housing_images/" +
                  roomData["image[]"],
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.container2}>
            <View style={styles.captionAndIcons}>
              <View style={styles.caption}>
                <Text style={styles.ilanNoText}>
                  İlan No: {1000000 + data.project.id}
                </Text>
                <Text style={styles.adTitleText}>
                  {truncateText(roomData["advertise_title[]"], 4)}
                </Text>
              </View>
              <View
                style={{
                  ...styles.icons,
                  justifyContent: bookmarkStatus ? "space-between" : "flex-end",
                }}
              >
                {bookmarkStatus && (
                  <TouchableOpacity
                    onPress={() => {
                      changeBookmark();
                      openCollection(roomOrder);
                    }}
                  >
                    <View style={styles.iconContainer}>
                      <Bookmark
                        name={bookmark}
                        size={13}
                        color={bookmark === "bookmark-o" ? "black" : "red"}
                      />
                    </View>
                  </TouchableOpacity>
                )}

                {!isUserSame ? (
                  <TouchableOpacity onPress={changeHeart}>
                    <View style={styles.iconContainer}>
                      <Heart
                        name={heart}
                        size={13}
                        color={heart === "hearto" ? "black" : "red"}
                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.iconContainer}>
                      <Trash name="trash" size={13} color="red" />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.priceAndButtons}>
              <View style={styles.btns}>
                <View style={{ width: "50%" }}>
                  {sold ? (
                    sold.status === 1 ? (
                      <TouchableOpacity style={styles.sold}>
                        <Text style={styles.soldText}>Satıldı</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.pending}>
                        <Text style={styles.pendingText}>Rezerve Edildi</Text>
                      </TouchableOpacity>
                    )
                  ) : roomData["off_sale[]"] !== "[]" ? (
                    <TouchableOpacity style={styles.offSale} disabled>
                      <Text style={styles.offSaleText}>Satışa Kapalı</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.priceContainer}>
                      {/* <Text style={styles.priceText}>
                        {addDotEveryThreeDigits(roomData["price[]"])} ₺
                      </Text>
                      {projectDiscountAmount > 0 && (
                        <Text style={styles.discountText}>
                          {projectDiscountAmount} ₺ indirim
                        </Text>
                      )} */}
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
                          sumCartOrderQt[roomOrder]?.qt_total !==
                            numberOfShare) ||
                        (shareSale &&
                          shareSale !== "[]" &&
                          !sumCartOrderQt[roomOrder]) ? (
                        <View>
                          {shareSale &&
                            shareSale !== "[]" &&
                            numberOfShare !== 0 && (
                              <Text style={styles.shareSaleText}>
                                1 / {numberOfShare} Fiyatı
                              </Text>
                            )}
                          <Text style={styles.regularPrice}>
                            {shareSale &&
                            shareSale !== "[]" &&
                            numberOfShare !== 0
                              ? formatPrice(roomData["price[]"] / numberOfShare)
                              : formatPrice(roomData["price[]"])}
                            ₺
                          </Text>
                        </View>
                      ) : null}
                      <TouchableOpacity
                        style={styles.addBasket}
                        onPress={() => GetIdForCart(roomOrder)}
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
                        onPress={openmodal}
                      >
                        <Text style={styles.payDetailText}>Ödeme Detayı</Text>
                      </TouchableOpacity>
                    )
                  ) : roomData["off_sale[]"] !== "[]" ? (
                    <TouchableOpacity
                      onPress={() => {
                        openFormModal(roomOrder);
                        GetID(roomOrder);
                      }}
                      style={styles.payDetailBtn}
                    >
                      <Text style={styles.payDetailText}>Başvuru Yap</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.payDetailBtn}
                      onPress={() => openmodal(roomOrder)}
                    >
                      <Text style={styles.payDetailText}>Ödeme Detayı</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
        {data?.project?.list_item_values && (
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Info
                text={
                  roomData[
                    `${data?.project?.list_item_values?.column1_name}[]`
                  ] +
                  " " +
                  (data.project.list_item_values.column1_additional || "")
                }
              />
              <Info
                text={
                  roomData[
                    `${data?.project?.list_item_values?.column2_name}[]`
                  ] +
                  " " +
                  (data.project.list_item_values.column2_additional || "")
                }
              />
              <Info
                text={
                  roomData[
                    `${data?.project?.list_item_values?.column3_name}[]`
                  ] +
                  " " +
                  (data.project.list_item_values.column3_additional || "")
                }
              />
            </View>
            <View style={styles.infoLocation}>
              <Text style={styles.informationText}>{location}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
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
    
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    marginTop:3,
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
    padding: 5,
    marginTop:3,
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
    padding: 5,
    marginTop:3,
    width: "100%",
    alignItems: "center",
    backgroundColor: "orange",
  },
  pendingText: {
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
  sold: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    marginTop:3,
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
    padding: 5,
    marginTop:3,
    alignItems: "center",
    backgroundColor: "#000000",
  },
  payDetailText: {
    fontWeight: "500",
    fontSize: 12,
    color: "white",
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFFF",
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: "#e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  informationText: {
    fontSize: width > 400 ? 12 : 10,
    right: width > 400 ? 10 : 5,
  },
  ilanNoText: {
    fontSize: 9,
    color: "black",
  },
  adTitleText: {
    fontSize: 9,
    fontWeight: "700",
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
    position: "relative",
    marginLeft: 5,
  },
  discountText: {
    color: "red",
    fontSize: 11,
    padding: 5,
  },
  shareSaleText: {
    textAlign: "center",
    width: "100%",
    color: "#274abb",
    fontWeight: "700",
    fontSize: 12,
    position: "relative",
  },
});
