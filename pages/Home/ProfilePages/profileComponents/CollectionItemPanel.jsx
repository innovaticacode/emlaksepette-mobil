import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import Icon2 from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
export default function CollectionItemPanel({ collection, panelInfo }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EditColection", { collectionItems: panelInfo })
      }
      style={style.container}
    >
      <View style={style.Images}>
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            gap: 10,
          }}
        >
          {panelInfo.slice(0, 2).map((panelInf, i) => (
            <View key={i} style={{ width: "50%", height: "100%" }}>
              <ImageBackground
                key={i}
                source={{
                  uri:
                    panelInf.item_type === 2 &&
                    panelInf.housing?.housing_type_data
                      ? `https://test.emlaksepette.com/${
                          JSON.parse(panelInf.housing.housing_type_data).images
                        }`
                      : `https://test.emlaksepette.com/${panelInf.project.image.replace(
                          "public",
                          "storage"
                        )}`,
                }}
                style={{ width: "100%", height: "100%" }}
              >
                {/* Diğer bileşenler buraya eklenebilir */}
              </ImageBackground>
            </View>
          ))}
        </View>
      </View>

      <View style={style.NameAndInfo}>
        <View style={{ paddingLeft: 5, gap: 4 }}>
          <Text style={{ fontSize: 12 }} numberOfLines={2}>
            <Text>Koleksiyon Adı : {collection.name} </Text>
          </Text>
          <Text style={{ fontSize: 12 }} numberOfLines={2}>
            <Text>İlan Sayısı : </Text>
            <Text style={{ color: "red", fontWeight: "500" }}>
              {collection?.links?.length}
            </Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            paddingLeft: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon2 name="eye" size={17} color="red" />
            <Text style={{ fontSize: 12 }}> {collection?.clicks.length} </Text>
          </View>
          <View>
            <Text style={{ fontSize: 12 }}>Görüntülenme</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    height: 90,
    width: "100%",

    backgroundColor: "white",

    paddingVertical: 5,
    paddingHorizontal: 5,

    marginVertical: 0,

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
  Images: {
    flexDirection: "row",
    flex: 0.9 / 2,

    padding: 5,
    gap: 7,
  },
  NameAndInfo: {
    flex: 1.1 / 2,

    padding: 5,
    gap: 7,
  },
});
