import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./Comments.styles";
import { BasicButtons, CommentsBottomModal } from "../../../../../components";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Comments = () => {
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
        <View style={styles.commentBody}>
          <MaterialCommunityIcons name="star" size={16} color="#FFC700" />
          <Text style={styles.comment}>
            Lorem ipsum dolor sit amet consectet. Pharetra morbi sed lorem
            dignissim semper morbi habitant sit.
          </Text>
          <Text style={styles.commentName}>22 Eylül 2024 | K****</Text>
        </View>
      </View>
      <CommentsBottomModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </View>
  );
};

export default Comments;
