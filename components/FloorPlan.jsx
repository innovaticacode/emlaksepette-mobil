import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Lightbox from "react-native-lightbox";
import { Platform } from "react-native";
import { getValueFor } from "./methods/user";

export default function FloorPlan({ data }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const apiUrl = "https://private.emlaksepette.com/situation_images/";

  const getFullImageURL = (partialURL) => {
    return `https://private.emlaksepette.com/${partialURL}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {data?.project?.situations?.length > 0 ? (
          data.project.situations.map((situation, i) => (
            <View key={i} style={styles.imageWrapper}>
              <Lightbox>
                <Image
                  style={styles.image}
                  source={{ uri: getFullImageURL(situation.situation) }}
                />
              </Lightbox>
            </View>
          ))
        ) : (
          <Text>Vaziyet & Kat Planı bilgisi bulunamadı.</Text>
        )}
      </View>
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
