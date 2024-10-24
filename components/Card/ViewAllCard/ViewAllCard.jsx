import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./ViewAllCard.styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Clipboard from "expo-clipboard";
import { frontEndUriBase } from "../../methods/apiRequest";
import { TouchableOpacity } from "react-native";

const ViewAllCard = (props) => {
  const { name, refCode = "", image, onPress } = props;

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(refCode);
    } catch (error) {
      console.error("Referans kodu kopyalanırken hata ol", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.area}>
          <View style={styles.imageArea}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPress()}
              style={{
                width: "100%",
              }}
            >
              <Image
                source={{
                  uri: `${frontEndUriBase}/storage/profile_images/` + image,
                }}
                style={styles.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textArea}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.ref}>
              <Text style={styles.refText}>{`REFERANS KODU: ${refCode}`}</Text>
              <FontAwesome
                name="copy"
                size={24}
                color="#454545"
                onPress={() => {
                  handleCopy();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ViewAllCard;
