import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { React, useState } from "react";

export default function DetailsPicture({ ımage }) {
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };

  return (
    <View style={{ width: "100%", height: 250, borderRadius: 20, padding: 1 }}>
      <ImageBackground
        source={{ uri: ımage }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      />
    </View>
  );
}
