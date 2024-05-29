import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ShoppinInfo from "./ShoppinInfo";
import { Platform } from "react-native";
import { Image } from "react-native-elements";
import axios from "axios";
import { getValueFor } from "./methods/user";
export default function FloorPlan({ data }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const apiUrl = "https://test.emlaksepette.com/situation_images/";

  const getFullImageURL = (partialURL) => {
    return `https://test.emlaksepette.com/${partialURL}`;
  };

  console.log(data.project.situations, "asd");

  return (
    <View style={{ padding: 9, top: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            padding: 12,
          }}
        >
          {data?.project?.situations?.length > 0 ? (
            data.project.situations.map((situation, i) => (
              <View
                key={i}
                style={{ width: 200, height: 100, marginBottom: 10 }}
              >
                <Image
                  style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                  source={{ uri: getFullImageURL(situation.situation) }}
                />
              </View>
            ))
          ) : (
            <Text>No images available</Text>
          )}
        </View>
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
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
