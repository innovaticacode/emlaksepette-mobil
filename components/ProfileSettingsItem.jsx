import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Feather";

import Arrow from "react-native-vector-icons/SimpleLineIcons";
export default function ProfileSettingsItem({
  text,
  ıconName,
  IconType,
  IconFeather,
  arrowControl,
  arrowNone,
  isCollapsed,
}) {
  return (
    <View style={style.ıtem}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            flex: 1.3 / 2,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Icon2 name={ıconName} size={18} color={"#525B75"} />

          <Text style={{ fontSize: 13, color: "#000000" }}>{text}  </Text>
        </View>
        <View style={{ flex: 0.7 / 2, alignItems: "flex-end" }}>
          {!arrowControl ? (
            ""
          ) : (
            <Arrow
              name={!isCollapsed ? "arrow-down" : "arrow-right"}
              size={15}
              color={"#525B75"}
            />
          )}
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  ıtem: {
    marginTop: 5,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#bebebe",
  },
});
