import { View, Text } from "react-native";
import React from "react";

export default function PaymentItem({
  header,
  price,
  dFlex,
  date,
  align,
  top,
  color,
  fontWeight,
  border,
}) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: border === "0" ? 0 : 1,
        borderColor: "#EBEBEB",
      }}
    >
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 12,
              color: color ? color : "black",
              fontWeight: fontWeight ? fontWeight : 400,
            }}
          >
            {header}
          </Text>
        </View>
        <View style={{ justifyContent: "right" }}>
          <Text
            style={{
              fontSize: 12,
              color: color ? color : "black",
              fontWeight: "700", // fontWeight 700 yerine "bold" da kullanılabilir
            }}
          >
            {price} ₺
            {"\n"}
            {date}

          </Text>
        </View>
    </View>
  );
}
