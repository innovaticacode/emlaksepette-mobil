import React from "react";
import { View, Text } from "react-native";
import WarningIcon from "react-native-vector-icons/AntDesign";

const AbsoluteErrorInput = ({ warningColor, warningText, show, style }) => {
  if (show) {
    return (
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 11,
          backgroundColor: warningColor,
          zIndex: 222,
          padding: 5,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 5,
          ...style,
        }}
      >
        {warningColor == "green" ? (
          <WarningIcon style={{ fontSize: 9, color: "#fff" }} name="check" />
        ) : (
          <WarningIcon style={{ fontSize: 9, color: "#fff" }} name="warning" />
        )}
        <Text style={{ fontSize: 9, color: "#fff", marginLeft: 3 }}>
          {warningText}
        </Text>
      </View>
    );
  }
};

export default AbsoluteErrorInput;
