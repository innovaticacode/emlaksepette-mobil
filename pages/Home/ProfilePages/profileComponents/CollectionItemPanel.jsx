import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { frontEndUriBase } from "../../../../components/methods/apiRequest";
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
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {panelInfo.slice(0, 2).map((panelInf, i) => (
            <View key={i} style={{ width: "48%", height: "100%" }}>
              <ImageBackground
                key={i}
                source={{
                  uri:
                    panelInf.item_type === 2 &&
                    panelInf.housing?.housing_type_data
                      ? `${frontEndUriBase}housing_images/${
                          JSON.parse(panelInf.housing.housing_type_data).images
                        }`
                      : `${frontEndUriBase}${panelInf.project.image.replace(
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
        <View style={{ width: "100%", textAlign: "center" }}>
          <Text style={{ fontSize: 12, textAlign: "right" }}>
            <Text> {collection.name} </Text>
          </Text>

          <Text style={{ fontSize: 12, textAlign: "right" }}>
            <Text>Görüntülenme Sayısı : </Text>
            <Text style={{ color: "red", fontWeight: "500" }}>
              {collection?.clicks.length}{" "}
            </Text>
          </Text>
          <Text style={{ fontSize: 12, textAlign: "right" }}>
            <Text>İlan Sayısı : </Text>
            <Text style={{ color: "red", fontWeight: "500" }}>
              {collection?.links?.length}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "100%",
    padding: 9,
    textAlign: "center",
    borderRadius: 5,
    height: 70,
  },
  Images: {
    flexDirection: "row",
    width: "50%",
  },
  NameAndInfo: {
    width: "50%",
  },
});
