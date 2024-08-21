import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import UserIcon from "react-native-vector-icons/FontAwesome5";
export default function Categories({
  category,
  ıconDisplay,
  showImage,
  bordernone,
  ıconName,
}) {
  return (
    <View
      style={[
        styles.category,
        {
          borderBottomWidth: 0
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <UserIcon
          name={ıconName}
          size={23}
          color={bordernone ? "white" : "#bebebe"}
          style={{ display: ıconDisplay === "none" ? "none" : "flex" }}
        />
        {showImage ? (
          <>
            <View
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                zIndex: 1,
                bottom: -7,
                left: -5,
              }}
            >
              <Image
                source={require("../pages/Home/emlakkulüplogo.png")}
                style={{ tintColor: "white", width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          </>
        ) : (
          ""
        )}
        <Text
          style={{
            fontSize: 14,
            color: bordernone ? "white" : "#333",
            fontWeight: "700",
            
          }}
        >
          {category}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon
          name="arrow-forward-ios"
          size={18}
          color={bordernone ? "white" : "#bebebe"}
          style={{ display: ıconDisplay === "none" ? "none" : "flex" }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  category: {
    padding: 8,
    
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0,
    borderBottomColor: "#ebebeb",
  },
});
