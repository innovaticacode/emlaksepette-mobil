import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import ImageView from "react-native-image-viewing";
import { Platform } from "react-native";
import { getValueFor } from "./methods/user";
import { frontEndUriBase } from "./methods/apiRequest";

export default function FloorPlan({ data }) {
  const [user, setUser] = useState({});
  const [isVisible, setIsVisible] = useState(false); // Görüntüleme modalı için
  const [currentIndex, setCurrentIndex] = useState(0); // Hangi resimde olduğumuzu takip etmek için

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  

  const getFullImageURL = (partialURL) => {
    return `${frontEndUriBase}${partialURL}`;
  };

  // Resimleri, react-native-image-viewing için uygun formata getirme
  const images = data?.project?.situations?.map((situation) => ({
    uri: getFullImageURL(situation.situation),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {data?.project?.situations?.length > 0 ? (
          data.project.situations.map((situation, i) => (
            <TouchableOpacity
              key={i}
              style={styles.imageWrapper}
              onPress={() => {
                setCurrentIndex(i); // Tıklanan resmin indeksini ayarla
                setIsVisible(true); // Modalı aç
              }}
            >
              <Image
                style={styles.image}
                source={{ uri: getFullImageURL(situation.situation) }}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text>Vaziyet & Kat Planı bilgisi bulunamadı.</Text>
        )}
      </View>

      {/* Resimleri tam ekran ve kaydırılabilir şekilde gösteren modal */}
      <ImageView
        images={images}
        imageIndex={currentIndex}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: "#e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  imageContainer: {
    width: "100%",
    padding: 12,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageWrapper: {
    width: "50%", // İki resim yan yana gelmesi için yarısını ayarladık
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
