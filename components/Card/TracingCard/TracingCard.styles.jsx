import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./TracingCard";
import Arrow from "../../../assets/arrow-right.svg";

const TracingCard = ({ title, subTitle, date, description, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress}
      style={styles.container}
    >
      <View style={styles.headTextArea}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.address}>{subTitle}</Text>
        </View>
        <View>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={styles.message}>Mesaj:</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 8,
            flex: 1,
          }}
        >
          <Text numberOfLines={2} style={styles.desc}>
            {description}
          </Text>
          <Arrow width={18} height={18} />
        </View>
      </View>
      <View style={{ backgroundColor: "#EEEEEE", height: 2, width: "100%" }} />
    </TouchableOpacity>
  );
};

export default TracingCard;
