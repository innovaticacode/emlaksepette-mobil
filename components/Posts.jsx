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
}) {
  console.log(data.project.listItemValues);
  const column1 = data.project.roomInfo.find((roomInfoTemp) => {
    if (
      roomInfoTemp.name == data.project.listItemValues.column1_name + "[]" &&
      roomInfoTemp.room_order == roomOrder
    ) {
      return roomInfoTemp;
    }
  });
  const column2 = data.project.roomInfo.find((roomInfoTemp) => {
    if (
      roomInfoTemp.name == data.project.listItemValues.column2_name + "[]" &&
      roomInfoTemp.room_order == roomOrder
    ) {
      return roomInfoTemp;
    }
  });
  const column3 = data.project.roomInfo.find((roomInfoTemp) => {
    if (
      roomInfoTemp.name == data.project.listItemValues.column3_name + "[]" &&
      roomInfoTemp.room_order == roomOrder
    ) {
      return roomInfoTemp;
    }
  });

  console.log(column1);
  const navigation = useNavigation();
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PostDetails", {
          caption: caption,
          location: location,
          price: price,
          metre: metre,
          odaSayısı: odaSayısı,
          katSayısı: katSayısı,
          name: caption,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.İlan}>
          <View style={{ width: "35%" }}>
            <View
              style={{
                position: "absolute",
                zIndex: 1,
                left: 0,
                backgroundColor: "#EA2C2E",
                padding: 4,
              }}
            >
              <Text style={{ color: "white", fontWeight: "500", fontSize: 12 }}>
                No {No}
              </Text>
            </View>
            <Image
              source={{
                uri:
                  "https://emlaksepette.com/project_housing_images/" +
                  data.project.roomInfo.find((roomInfoTemp) => {
                    if (
                      roomInfoTemp.room_order == roomOrder &&
                      roomInfoTemp.name == "image[]"
                    ) {
                      return roomInfoTemp;
                    }
                  }).value,
              }}
              style={{ width: "90%", height: "90%" }}
            />
          </View>
          <View style={styles.container2}>
            <View style={styles.captionAndIcons}>
              <View style={styles.caption}>
                <Text style={{ fontSize: 11 }}>
                  {
                    data.project.roomInfo.find((roomInfoTemp) => {
                      if (
                        roomInfoTemp.room_order == roomOrder &&
                        roomInfoTemp.name == "advertise_title[]"
                      ) {
                        return roomInfoTemp;
                      }
                    }).value
                  }
                </Text>
              </View>
              <View style={styles.ıcons}>
                <TouchableOpacity onPress={changeBookmark}>
                  <View style={styles.ıconContainer}>
                    <Bookmark
                      name={bookmark}
                      size={15}
                      color={bookmark == "bookmark-o" ? "black" : "red"}
                    />
                  </View>
                </TouchableOpacity>
                {!isFavorited ? (
                  <TouchableOpacity
                    onPress={() => {
                      changeHeart();
                    }}
                  >
                    <View style={styles.ıconContainer}>
                      <Heart
                        name={heart}
                        size={15}
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
                      <Trash name="trash" size={15} color="red" />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.PriceAndButtons}>
              <View>
                <Text
                  style={{
                    color: "#264ABB",
                    fontWeight: "600",
                    fontSize: 12,
                    left: 20,
                  }}
                >
                  {price}
                </Text>
              </View>
              <View style={styles.btns}>
                <TouchableOpacity style={styles.addBasket}>
                  <Text
                    style={{ color: "white", fontWeight: "500", fontSize: 12 }}
                  >
                    Sepete Ekle
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.PayDetailBtn}
                  onPress={() => {
                    openmodal();
                  }}
                >
                  <Text style={{ fontWeight: "500", fontSize: 12 }}>
                    Ödeme Detayı
                  </Text>
                </TouchableOpacity>
              </View>
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
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Info
              text={
                column1.value +
                " " +
                (data.project.listItemValues.column1_additional != null
                  ? data.project.listItemValues.column1_additional
                  : "")
              }
            />
            <Info
              text={
                column2.value +
                " " +
                (data.project.listItemValues.column2_additional != null
                  ? data.project.listItemValues.column2_additional
                  : "")
              }
            />
            <Info
              text={
                column3.value +
                " " +
                (data.project.listItemValues.column3_additional != null
                  ? data.project.listItemValues.column3_additional
                  : "")
              }
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text style={styles.InformationText}>{location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,

    marginTop: 10,

    display: "flex",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  İlan: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
    flex: 1,

    justifyContent: "space-between",
  },
  container2: {
    flex: 1,

    display: "flex",
    flexDirection: "column",
  },
  captionAndIcons: {
    height: "50%",

    display: "flex",
    flexDirection: "row",
  },
  PriceAndButtons: {
    height: "50%",
  },
  caption: {
    width: "60%",
  },
  ıcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: width > 400 ? 13 : 15,
    bottom: 5,
    paddingLeft: width > 400 ? 5 : 3,
    padding: width > 400 ? 0 : 3,
    left: width > 400 ? 18 : 11,
  },
  btns: {
    display: "flex",
    flexDirection: "row",
  },
  addBasket: {
    width: "50%",
    alignItems: "center",
    backgroundColor: "#264ABB",
    padding: 6,
  },
  PayDetailBtn: {
    width: "50%",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 6,
    borderWidth: 0.5,
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
});
