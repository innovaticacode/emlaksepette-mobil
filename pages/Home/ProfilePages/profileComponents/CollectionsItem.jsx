import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Dot from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../../components/methods/user";
import { slugify } from "slugify";
import { Image } from "moti";

export default function CollectionsItem({
  openBottom,
  projectItems,
  disabled,
  shareWp,
  copy,
  item,
  getId,
  name,
  onRemove,
  SelectCollection,
  isChoosed,
}) {
  const navigation = useNavigation();
  const [collectionItems, setCollectionItems] = useState([]);
  const getCollectionItems = () => {
    var collectionItemsTemp = [];
    for (var i = 0; i < projectItems.length; i++) {
      if (projectItems[i].collection_id == item.id) {
        collectionItemsTemp.push(projectItems[i]);
      }
    }
    setCollectionItems(collectionItemsTemp);
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  useEffect(() => {
    getCollectionItems();
  }, [projectItems]);

  const [numOfLinks, setNumOfLinks] = useState(item.links.length);

  const handleRemove = async () => {
    try {
      await onRemove();
      setCollectionItems((prevItems) =>
        prevItems.filter((projectItem) => projectItem.collection_id !== item.id)
      );
    } catch (error) {
      console.error("Error removing item from collection:", error);
    }
  };

  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    setIsHighlighted(false);
  }, [isChoosed]);

  return (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      disabled={!isChoosed}
      onPress={() => {
        SelectCollection(item?.id);

        setIsHighlighted(!isHighlighted);
      }}
    >
      <View
        style={[
          style.container,
          { borderColor: isHighlighted ? "red" : "#e6e6e6" },
        ]}
      >
        <View
          style={{
            width: "100%",
            borderBottomWidth: 1,
            padding: 15,
            borderBottomColor: "#D3D2D7",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ paddingLeft: 16 }}>
            <Text style={{ color: "#333", fontSize: 15, fontWeight: "600" }}>
              {item.name}
            </Text>
          </View>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 40, right: 20 }}
            onPress={() => {
              openBottom();
              getId(item.id, item.name, item);
            }}
          >
            <Dot name="dots-three-vertical" size={22} color={"#333"} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", height: 180, padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {item?.links.slice(0, 4).map((image, i) => (
                <View
                  style={{
                    width: 70,
                    height: 70,
                    backgroundColor: "grey",
                    borderRadius: 5,
                  }}
                  key={i}
                >
                  <Image
                    key={i}
                    source={{
                      uri:
                        image.item_type == 2 &&
                        image.housing?.housing_type_data
                          ? `https://private.emlaksepette.com/housing_images/${
                              JSON.parse(image.housing.housing_type_data).image
                            }`
                          : `https://private.emlaksepette.com/${image.project.image.replace(
                              "public",
                              "storage"
                            )}`,
                    }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {/* Diğer bileşenler buraya eklenebilir */}
                  </Image>
                </View>
              ))}
            </View>
          </View>
          <View style={{ width: "50%", justifyContent: "center", gap: 10 }}>
            <View style={{ gap: 6 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Dot name="eye" size={17} color={"#333"} />
                <Text style={{ fontSize: 14, color: "#333" }}>
                  {item.clicks.length} Görüntüleme
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <Icon4 name="notebook-outline" size={17} color={"#333"} />
                <Text style={{ fontSize: 14, color: "#333" }}>
                  İlan Sayısı: {collectionItems.length}
                </Text>
              </View>
            </View>
            <View style={{ width: "65%" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#EA2B2E",
                  borderRadius: 14,
                  padding: 10,
                  width: "80%",
                }}
                onPress={() => {
                  navigation.navigate("EditColection", {
                    collectionItems: collectionItems,
                    item: item,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "white",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Görüntüle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <View style={style.header}>
          <View
            style={{
              flex: 1 / 2,
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Dot name="eye" size={15} color={"#EA2B2E"} />
            <Text style={{ color: "#EA2B2E", fontSize: 13 }}>
              {item.clicks.length} Görüntülenme
            </Text>
          </View>
          <View style={{ flex: 1 / 2, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                openBottom();
                getId(item.id, item.name);
              }}
            >
              <Dot name="dots-three-horizontal" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ paddingTop: 15, paddingBottom: 15 }}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontWeight: "700", fontSize: 13 }}>
                Koleksiyon Adı:
              </Text>
              <Text style={{ color: "#EA2B2E" }} numberOfLines={2}>
                {item.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontWeight: "700", fontSize: 13 }}>
                İlan Sayısı:
              </Text>
              <Text style={{ color: "#EA2B2E" }}>{collectionItems.length}</Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <View>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#FFEFCA",
                padding: 8,
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
              }}
              onPress={() => {
                navigation.navigate("EditColection", {
                  collectionItems: collectionItems,
                  item: item,
                });
              }}
            >
              <Icon name="pencil" size={15} color={"#BD3803"} />
              <Text
                style={{
                  textAlign: "center",
                  color: "#BD3803",
                  fontWeight: "500",
                  fontSize: 13,
                }}
              >
                Düzenle
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#C7EBFF",
                padding: 8,
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
              onPress={() => {
                navigation.navigate("SeeColleciton", {
                  item: item,
                  collectionUser: user,
                });
              }}
            >
              <Dot
                name="eye"
                size={15}
                style={{ textAlign: "center" }}
                color={"#025787"}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "#025787",
                  fontWeight: "500",
                  fontSize: 13,
                }}
              >
                Önizle
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#DAFBD0",
                padding: 8,
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
              onPress={() => {
                copy();
              }}
            >
              <Icon2 name="copy" size={15} color={"#1F6F11"} />
              <Text
                style={{
                  textAlign: "center",
                  color: "#1F6F11",
                  fontWeight: "600",
                  fontSize: 13,
                }}
              >
                Linki Kopyala
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#DAFBD0",
                padding: 8,
                flexDirection: "row",
                justifyContent: "center",
                gap: 10,
              }}
              onPress={() => {
                shareWp();
              }}
            >
              <Icon3 name="whatsapp" size={15} color={"#1F6F11"} />
              <Text
                style={{
                  textAlign: "center",
                  color: "#1F6F11",
                  fontWeight: "600",
                  fontSize: 13,
                }}
              >
                Whatsappta Paylaş
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",

    borderRadius: 10,
    borderWidth: 1,
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
  header: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
    padding: 10,
  },
});
