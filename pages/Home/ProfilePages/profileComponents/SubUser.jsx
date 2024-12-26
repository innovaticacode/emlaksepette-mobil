import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Platform } from "react-native";
import { frontEndUriBase } from "../../../../components/methods/apiRequest";
export default function SubUser({
  setModalVisible,
  item,
  GetId,
  isChoosed,
  getUserID,
}) {
  const [isHighLighted, setisHighLighted] = useState(false);
  useEffect(() => {
    setisHighLighted(false);
  }, [isChoosed]);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderWidth: isHighLighted ? 1 : 0, borderColor: "red" },
      ]}
      disabled={!isChoosed}
      onPress={() => {
        getUserID(item.id);
        setisHighLighted(!isHighLighted);
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            padding: 3,
            width: "100%",
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  uri: `${frontEndUriBase}storage/profile_images/${item.profile_image}`,
                }}
                style={{ width: "100%", height: "100%" }}
                borderRadius={30}
              />
            </View>
            <View style={{ paddingTop: 2, gap: 4 }}>
              <Text style={{ fontSize: 13, color: "#333", fontWeight: "500" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 10, color: "grey" }}>{item.email}</Text>
              <Text style={{ fontSize: 12, color: "#333" }}>{item.title}</Text>
            </View>
          </View>

          <View style={{ padding: 3, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                GetId(item);
              }}
            >
              <Icon name="dots-three-vertical" size={25} color={"#333"} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            padding: 3,
            width: "100%",
            alignItems: "flex-end",
            paddingLeft: 15,
          }}
        >
          {item.status == 1 && (
            <Text style={{ color: "green", fontSize: 13 }}>
              Hesap Doğrulandı
            </Text>
          )}
          {item.status == 0 && (
            <Text style={{ color: "#E5781E", fontSize: 13 }}>
              Hesap Doğrulanmadı
            </Text>
          )}
          {item.status == 5 && (
            <Text style={{ color: "#bc260f", fontSize: 13 }}>
              Hesap Pasife Alındı
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: "100%",

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
});
