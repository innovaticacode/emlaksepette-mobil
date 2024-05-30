import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function CommentItem({ username, comment, date, rate }) {
  const [stars, setStars] = useState([false, false, false, false, false]);

  const handleLastStarPress = () => {
    const allYellow = stars.every((star) => star === true);
    const newStars = allYellow
      ? [false, false, false, false, false]
      : [true, true, true, true, true];
    setStars(newStars);
  };
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);

    // Tarih formatını ayarla
    const options = { weekday: "long", month: "long", day: "numeric" };

    // Tarihi belirtilen formatta formatla
    const formattedDate = dateObject.toLocaleDateString("tr-TR", options); // 'tr-TR' Türkçe dilini temsil eder, dil ayarını kendi ihtiyacınıza göre değiştirebilirsiniz

    return formattedDate;
  };
  const numStars = Math.round(rate);
  return (
    <View style={styles.commentContainer}>
      <View
        style={{
          width: "100%",
          backgroundColor: "#F9F9F9",
          padding: 10,
          borderRadius: 5,
          height: 120,
        }}
      >
        <View
          style={{
            flex: 0.4 / 2,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 0.5, flexDirection: "row" }}>
            {[...Array(numStars)].map((_, index) => (
              <Ionicons key={index} name="star" size={9} color="gold" />
            ))}
          </View>

          <View style={{ flex: 1 / 2, alignItems: "flex-end" }}>
            <Text style={{ fontSize: 13, color: "grey" }}>
              {formatDate(date)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 0.3 / 2, width: "100%" }}>
          <Text style={{ fontSize: 11, color: "#333" }}>{username}</Text>
        </View>
        <View style={{ flex: 1.5 / 2, paddingTop: 5 }}>
          <Text numberOfLines={3}>{comment}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  commentContainer: {
    width: 250,
  },
});
{
  /* {stars.map((selected, index) => (
     
  <Ionicons
  key={index}
    name={'md-star'}
    size={10}
    color={'yellow'}
  />

))}   */
}
