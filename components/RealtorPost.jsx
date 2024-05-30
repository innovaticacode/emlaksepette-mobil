import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Info from "./Info";
import { Platform } from "react-native";

export default function RealtorPost({
  title,
  loading,
  price,
  image,
  location,
  m2,
  roomCount,
  floor,
  HouseId,
  GetId,
  discountRate,
  discount_amount,
  housing,
  bookmarkStatus,
  column1_name,
  column1_additional,
  column2_name,
  column2_additional,
  column3_name,
  column3_additional,
  column4_name,
  column4_additional,
  step2_slug,
  step1_slug
}) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  const discountedPrice = discountRate
    ? price - (price * discountRate) / 100
    : price - discount_amount;

  const formattedPrice = parseFloat(price)
    .toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    })
    .replace(/,00$/, "");

  const formattedDiscountedPrice = discountedPrice
    ? discountedPrice !== price
      ? parseFloat(discountedPrice)
          .toLocaleString("tr-TR", {
            style: "currency",
            currency: "TRY",
          })
          .replace(/,00$/, "")
      : null
    : 0;
  const handlePress =
    housing && housing.step2_slug === "gunluk-kiralik"
      ? () => GetId(HouseId)
      : null;
  const housingData = housing && JSON.parse(housing.housing_type_data);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Realtor details", { houseId: HouseId })
      }
    >
      <View style={styles.container}>
        <View style={styles.İlan}>
          <View style={{ width: "30%" }}>
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 80, objectFit: "cover" }}
            />
          </View>

          <View style={styles.container2}>
            <View style={styles.captionAndIcons}>
              <View style={styles.caption}>
                <Text style={{ fontSize: 9, color: "black" }}>
                  İlan No: {2000000 + HouseId} 
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: 700 }}
                  numberOfLines={3}
                >
                  {title}
                </Text>
              </View>
              <View
                style={{
                  ...styles.ıcons, // Diğer stil özelliklerini ekleyin
                  justifyContent: bookmarkStatus && bookmarkStatus == true ? "space-between" : "flex-end", // Koşula göre justifyContent özelliğini belirleyin
                }}
              >
                {bookmarkStatus && bookmarkStatus == true && (
                  <TouchableOpacity onPress={changeBookmark}>
                    <View style={styles.ıconContainer}>
                      <Bookmark
                        name={bookmark}
                        size={13}
                        color={bookmark == "bookmark-o" ? "black" : "red"}
                      />
                    </View>
                  </TouchableOpacity>
                )}

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
              </View>
            </View>

            <View style={styles.PriceAndButtons}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {formattedDiscountedPrice ? (
                  <>
                    <Text style={styles.discountedPriceText}>
                      {formattedPrice}₺
                    </Text>
                    <Text style={styles.priceText}>
                      {formattedDiscountedPrice}₺
                    </Text>
                  </>
                ) : (
                  <Text style={styles.priceText}>{formattedPrice}₺</Text>
                )}
              </View>
              <TouchableOpacity style={styles.addBasket} onPress={handlePress}>
                {step2_slug && step2_slug== "gunluk-kiralik" && step1_slug == "mustakil-tatil" ? (
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "500",
                      fontSize: 12,
                    }}
                  >
                    Rezervasyon
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "500",
                      fontSize: 12,
                    }}
                  >
                    Sepete Ekle
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
          <View
            style={{
              backgroundColor: "#E8E8E8",
              height: 30,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {column1_name && (
                <Info
                  text={`${column1_name} ${
                    column1_additional ? column1_additional : ""
                  }`}
                />
              )}
               {column2_name && (
                <Info
                  text={`${column2_name} ${
                    column2_additional ? column2_additional : ""
                  }`}
                />
              )}
               {column3_name && (
                <Info
                  text={`${column3_name} ${
                    column3_additional ? column3_additional : ""
                  }`}
                />
              )}
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.InformationText}>{location}</Text>
            </View>
          </View>
        {/* {discountRate ? (
          <View
            style={{
              backgroundColor: "#E8E8E8",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.discountText}>
              #{2000000 + HouseId} Numaralı İlan İçin: Satın alma işlemi
              gerçekleştirdiğinizde, Emlak Kulüp üyesi tarafından paylaşılan
              link aracılığıyla %{discountRate}indirim uygulanacaktır.
            </Text>
          </View>
        ) : null} */}
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
    paddingRight:5,
    paddingTop: 5,
  },
  captionAndIcons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
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
    alignItems: "flex-start",
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "50%",
    alignItems: "center",
    backgroundColor: "#264ABB",
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
