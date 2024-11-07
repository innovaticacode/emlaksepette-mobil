import { View, Text } from "react-native";
import React, { useState } from "react";
import { BasicButtons, CommentsBottomModal } from "../../../../../components";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "./Portfolio.styles";
import RealtorPost from "../../../../../components/Card/RealtorCard/RealtorPost";

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <View style={styles.body}>
      <View style={styles.btnArea}>
        <BasicButtons
          icon={
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={20}
              color="black"
            />
          }
          text={"Yorum Yaz"}
          onPress={() => {
            setIsVisible(true);
          }}
          containerStyle={{ width: "48%" }}
        />
        <BasicButtons
          icon={
            <MaterialCommunityIcons
              name="share-variant"
              size={20}
              color="black"
            />
          }
          text={"Paylaş"}
          onPress={() => {
            null;
          }}
          containerStyle={{ width: "48%" }}
        />
      </View>
      <View>
        <RealtorPost chekView={true} />
      </View>
      <CommentsBottomModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

export default Portfolio;
