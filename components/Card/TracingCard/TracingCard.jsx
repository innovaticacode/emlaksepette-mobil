import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./TracingCard.styles";
import Arrow from "../../../assets/arrow-right.svg";
import { formatDate } from "../../../utils";

const TracingCard = ({
  title,
  subTitle,
  date,
  description,
  onPress,
  colorKey,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress}
      style={[
        styles.container,
        { backgroundColor: colorKey % 2 === 0 ? "#FFF" : "#F7F7F7" },
      ]}
    >
      <View style={styles.headTextArea}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.address}>{subTitle}</Text>
        </View>
        <View>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
      </View>
      <View style={styles.descView}>
        <Text style={styles.message}>Mesaj:</Text>
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.desc}>
            {description}
          </Text>
          <Arrow width={18} height={18} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TracingCard;
