import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function SliderItem({
  image,
  StoreID,
  borderColor,
  navigationStatus,
  url,
  userName,
}) {
  const [checkImage, setCheckImage] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (image && userName) {
      if (image.endsWith("indir.jpeg") || image.endsWith("indir.jpg")) {
        const fullName = userName.split(" ");
        let checkImage = "";
        if (fullName.length > 1) {
          const name = fullName[0].charAt(0).toUpperCase();
          const surname = fullName[1].charAt(0).toUpperCase();
          checkImage = `${name}${surname}`;
        } else {
          checkImage = fullName[0].charAt(0).toUpperCase();
        }
        setCheckImage(checkImage);
      } else {
        setCheckImage(null);
      }
    } else {
      setCheckImage(null);
    }
  }, [image, userName]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (navigationStatus == true) {
          navigation.push(url);
        } else {
          navigation.navigate("Profile", {
            name: "Master Realtor",
            id: StoreID,
          });
        }
      }}
    >
      <View
        style={[
          styles.container,
          {
            borderColor: borderColor,
          },
        ]}
      >
        {checkImage ? (
          <View style={styles.textArea}>
            <Text style={styles.text}>{checkImage}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.image}
            borderRadius={50}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    flexWrap: "wrap",
    borderRadius: 50,
    margin: 6,
    padding: 1,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
});
