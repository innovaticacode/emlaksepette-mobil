import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function SellPlaceItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Profile", { id: item?.id });
      }}
      style={{
        flexDirection: "row",
        padding: 10,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flex: 0.5 / 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: 90, height: 90 }}>
          <Image
            source={{
              uri: `https://private.emlaksepette.com/storage/profile_images/${item.profile_image}`,
            }}
            style={{ width: "100%", height: "100%", borderRadius: 8 }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1.5 / 2,
          padding: 1,
          justifyContent: "center",
          paddingLeft: 15,
        }}
      >
        <View style={{ gap: 4 }}>
          <Text style={{ color: "#333", fontWeight: "600" }}>{item?.name}</Text>
          <Text style={{ fontSize: 13, color: "#333" }}>{item?.phone}</Text>
          <Text style={{ fontSize: 13, color: "#333" }}>{item?.email}</Text>
          {item?.headquarters_district && item?.headquarters_city ? (
            <Text style={{ color: "#333", fontWeight: "600", fontSize: 13 }}>
              {item?.headquarters_city} / {item?.headquarters_district}
            </Text>
          ) : (
            <Text style={{ fontSize: 13 }}>İl / İlçe Bilgisi Bulunmuyor</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
