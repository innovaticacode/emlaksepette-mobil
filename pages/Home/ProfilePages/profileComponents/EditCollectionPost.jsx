import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { addDotEveryThreeDigits } from "../../../../components/methods/merhod";
import { Platform } from "react-native";

export default function EditCollectionPost({ item }) {
  const parseHousingData = (data) => JSON.parse(data);

  let itemData = {
    id: 0,
    price: 0,
    dailyRent: 0,
    advertise_title: "",
    image: "",
    earning: 0,
    discountedPrice: 0,
    defaultPrice: 0,
  };

  if (item.item_type === 1) {
    const discountRate = item.project_values["discount_rate[]"] || 0;
    const price = item.project_values["price[]"]
      ? parseInt(item.project_values["price[]"])
      : 0;
    const discountedPrice = price - (price * discountRate) / 100;

    itemData = {
      id: item.project.id,
      price: price ? addDotEveryThreeDigits(price) : addDotEveryThreeDigits(0),
      dailyRent: item.project_values["daily_rent[]"]
        ? addDotEveryThreeDigits(item.project_values["daily_rent[]"])
        : 0,
      advertise_title: item.project_values["advertise_title[]"] || "",
      image: item.project_values["image[]"] || "",
      earning: discountedPrice ? parseInt(discountedPrice) / 100 : 0,
      discountedPrice: discountedPrice
        ? addDotEveryThreeDigits(discountedPrice)
        : 0,
    };
  } else if (item?.housing?.housing_type_data) {
    const housingData = parseHousingData(item.housing.housing_type_data);
    const discountRate = housingData.discount_rate
      ? housingData.discount_rate[0]
      : 0;
    const defaultPrice = housingData.price
      ? parseInt(housingData.price[0])
      : parseInt(housingData.daily_rent[0]);
    const discountedPrice = defaultPrice
      ? defaultPrice - (defaultPrice * discountRate) / 100
      : 0;

    itemData = {
      id: item.housing.id,
      price: housingData.price
        ? addDotEveryThreeDigits(housingData.price[0])
        : 0,
      dailyRent: housingData.daily_rent
        ? addDotEveryThreeDigits(housingData.daily_rent[0])
        : 0,
      advertise_title: item.housing.title || "",
      image: housingData.image || "",
      earning: discountedPrice ? parseInt(discountedPrice) / 100 : 0,
      discountedPrice: discountedPrice
        ? addDotEveryThreeDigits(discountedPrice)
        : 0,
      defaultPrice: defaultPrice ? addDotEveryThreeDigits(defaultPrice) : 0,
    };
  }

  const displayPrice =
    itemData.price !== 0 ? itemData.price : itemData.dailyRent;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                item?.item_type === 2 && item?.housing?.housing_type_data
                  ? `https://test.emlaksepette.com/housing_images/${itemData.image}`
                  : `https://test.emlaksepette.com/${itemData.image.replace(
                      "public",
                      "storage"
                    )}`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              #{parseInt(itemData.id) + 2000000} {"\n"}
              {itemData.advertise_title}
            </Text>
          </View>
          <View style={styles.priceAndEarningContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.value}>
                {itemData.discountedPrice} ₺ {"\n"}
                <Text style={styles.originalPrice}>
                  {itemData.defaultPrice} ₺
                </Text>
              </Text>
            </View>
            <View style={styles.earningContainer}>
              <Text style={styles.label}>Kazanç</Text>
              <Text style={styles.earning}>
                {item.earningAmount % 1 === 0
                  ? addDotEveryThreeDigits(item.earningAmount)
                  : item.earningAmount.toFixed(2)}{" "}
                ₺
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: 10,
    paddingHorizontal: 5,
    width: "100%",
    borderWidth: 0.7,
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
  row: {
    flexDirection: "row",
    gap: 4,
  },
  imageContainer: {
    flex: 0.25,
    padding: 1,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    objectFit: "cover",
  },
  detailsContainer: {
    flex: 0.55,
    padding: 5,
  },
  titleContainer: {
    flex: 0.5,
  },
  title: {
    fontSize: 13,
  },
  priceAndEarningContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceContainer: {
    width: "50%",
    gap: 4,
  },
  earningContainer: {
    width: "50%",
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: "#333",
  },
  value: {
    fontSize: 15,
    color: "#298A1D",
  },
  earning: {
    fontSize: 15,
    color: "#298A1D",
  },
  originalPrice: {
    fontSize: 11,
    color: "#e54242",
    textDecorationLine: "line-through",
  },
  deleteButtonContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#E54242",
    width: "100%",
    padding: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    textAlign: "center",
    color: "#ffffff",
  },
});
