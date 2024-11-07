import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Comments.styles";
import { BasicButtons } from "../../../../../components";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Comments = () => {
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
            null;
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
    </View>
  );
};

export default Comments;
