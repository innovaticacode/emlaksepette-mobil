import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { addDotEveryThreeDigits } from "../../../../components/methods/merhod";
import { Platform } from "react-native";
import Icon2 from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getValueFor } from "../../../../components/methods/user";

export default function EditCollectionPost({ item, collection, onRemove }) {
  const parseHousingData = (data) => JSON.parse(data);
  const navigation = useNavigation();
  const apiUrl = "https://emlaksepette.com/api/";
  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

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
      idOran: 1000000,
      roomOrder: item.project_values["daily_rent[]"]
        ? addDotEveryThreeDigits(item.project_values["daily_rent[]"])
        : 0,
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
      defaultPrice: price ? addDotEveryThreeDigits(price) : 0,
      discountRate: discountRate,
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
      idOran: 2000000,

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
      discountRate: discountRate,
    };
  }

  const displayPrice =
    itemData.price !== 0 ? itemData.price : itemData.dailyRent;

  // useEffect(() => {
  //   navigation.setOptions({ title: collection.name });
  // }, [collection.name]);

  const handleRemoveFromCollection = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}remove-from-collection`,
        {
          itemType: item.item_type == 1 ? "project" : "housing",
          itemId: item.item_type == 1 ? item.room_order : null,
          projectId: item.item_type == 1 ? item.project.id : item.housing.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );
      if (response.data.success) {
        onRemove(item.id);
        console.log(response.data);
      } else {
        console.error(
          "Failed to remove item from collection:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error removing item from collection:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                item?.item_type === 2 && item?.housing?.housing_type_data
                  ? `https://emlaksepette.com/housing_images/${itemData.image}`
                  : `https://emlaksepette.com/project_housing_images/${itemData.image.replace(
                      "public",
                      "storage"
                    )}`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>
            <Text style={{ fontSize: 9 }}>
              İlan No: {parseInt(itemData.id) + parseInt(itemData.idOran)}{" "}
              {"\n"}
            </Text>
            <Text style={{ fontWeight: 700,fontSize: 11 }}>{itemData.advertise_title}</Text>
          </Text>

          <View style={styles.priceAndEarningContainer}>
            <View style={{ width: "80%" }}>
              <View style={styles.priceContainer}>
                <Text style={styles.value}>
                  <Text style={styles.label}>Fiyat: </Text>
                  {itemData.discountRate !== 0 && (
                    <Text style={styles.originalPrice}>
                      {" "}
                      {itemData.defaultPrice} ₺
                    </Text>
                  )}
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: "13px",
                      marginRight: 10,
                    }}
                  >
                    {" "}
                    {itemData.discountedPrice} ₺
                  </Text>
                </Text>
              </View>
              <View style={styles.earningContainer}>
                <Text style={styles.earning}>
                  <Text style={styles.label}>Kazanç: </Text>
                  <Text style={{ fontWeight: "700", fontSize: "13px" }}>
                    {item.action &&
                    (item.action === "tryBuy" || item.action === "noCart") ? (
                      <Text>
                        {item.earningAmount % 1 === 0
                          ? addDotEveryThreeDigits(item.earningAmount)
                          : item.earningAmount.toFixed(2)}{" "}
                        ₺
                      </Text>
                    ) : (
                      <>
                        <Text>
                          {item.sharePrice.balance &&
                          item.sharePrice.status === "0" ? (
                            <Text style={styles.orange}>
                              {item.sharePrice.balance % 1 === 0
                                ? addDotEveryThreeDigits(
                                    item.sharePrice.balance
                                  )
                                : item.sharePrice.balance.toFixed(2)}{" "}
                              ₺ {"\n"}
                              <Text>Onay Bekleniyor</Text>
                            </Text>
                          ) : item.sharePrice.balance &&
                            item.sharePrice.status === "1" ? (
                            <Text style={styles.green}>
                              {item.sharePrice.balance % 1 === 0
                                ? addDotEveryThreeDigits(
                                    item.sharePrice.balance
                                  )
                                : item.sharePrice.balance.toFixed(2)}{" "}
                              ₺ {"\n"}
                              <Text>Komisyon Kazandınız</Text>
                            </Text>
                          ) : item.sharePrice.balance &&
                            item.sharePrice.status === "2" ? (
                            <Text style={styles.red}>
                              {item.sharePrice.balance % 1 === 0
                                ? addDotEveryThreeDigits(
                                    item.sharePrice.balance
                                  )
                                : item.sharePrice.balance.toFixed(2)}{" "}
                              ₺ {"\n"}
                              <Text>Kazancınız Reddedildi</Text>
                            </Text>
                          ) : (
                            "-"
                          )}
                        </Text>
                      </>
                    )}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={{ width: "20%" }}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  Alert.alert(
                    "Emin misiniz?",
                    "Bu öğeyi koleksiyondan kaldırmak istediğinizden emin misiniz?",
                    [
                      {
                        text: "Hayır",
                        style: "cancel",
                      },
                      {
                        text: "Evet",
                        onPress: handleRemoveFromCollection,
                        style: "destructive",
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  Sil
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
  orange: {
    color: "#FFA500",
  },
  green: {
    color: "#008000",
    fontWeight: "bold",
  },
  red: {
    color: "#FF0000",
    fontWeight: "bold",
  },
  priceAndEarningContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  detailsContainer: {
    width: "75%",
    padding: 5,
  },
  imageContainer: {
    width: "25%",
    height: 90,
    padding: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    objectFit: "cover",
  },
  title: {
    fontSize: 13,
    fontWeight: 700,
    width: "100%",
  },

  priceContainer: {
    width: "100%",
    gap: 4,
  },
  earningContainer: {
    width: "100%",
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
    fontWeight: "bold",
    fontSize: 10,
    color: "#e54242",
    textDecorationLine: "line-through",
  },
  deleteButtonContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-between",
    width: "40%",
  },
  deleteButton: {
    backgroundColor: "#E54242",
    padding: 5,
    borderRadius: 5,
    width: "100%",
  },
  deleteButtonText: {
    textAlign: "center",
    color: "#ffffff",
  },
});
