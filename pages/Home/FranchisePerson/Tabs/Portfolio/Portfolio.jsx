import { View, Text, Share } from "react-native";
import React, { useState } from "react";
import { BasicButtons, CommentsBottomModal } from "../../../../../components";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { styles } from "./Portfolio.styles";
import RealtorPost from "../../../../../components/Card/RealtorCard/RealtorPost";
import * as Sharing from "expo-sharing";
import * as Linking from "expo-linking";

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleShare = async (screen) => {
    // Uygulamanın scheme’i baz alınarak manuel URL oluşturma
    const url = `https://${screen}`;

    try {
      // URL'yi paylaşma işlemi
      await Share.share({
        message: `Ekran bağlantısı: ${url}`,
      });
    } catch (error) {
      console.error("Paylaşım sırasında bir hata oluştu:", error.message);
    }
  };

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
            handleShare("FranchisePersonDetail");
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
