import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
export default function ProjectPost({
  project,

  ımage,
  location,
  city,

  ProfilImage,

  ProjectNo,
  loading,
}) {
  const navigation = useNavigation();
  const generateRandomColorCode = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const RandomColor = generateRandomColorCode();
  return (
    <TouchableOpacity
      style={{ marginTop: 10 }}
      onPress={() =>
        navigation.navigate("Details", {
        
          ProjectId: ProjectNo,
      
        })
      }
    >
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: ımage }}
          style={{ width: "100%", height: "100%" }}
        />
        <View style={styles.ShoppingName}>
          <View style={styles.ShopImage}>
            <Image
              source={{ uri: ProfilImage }}
              style={{ width: "50%", height: "90%" }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.ShopText}>
            <Text
              style={{
                color: "white",
                fontSize: 8,
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              {location} / {city}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.Description,
            {
              backgroundColor: project.user.banner_hex_code + "CC",
              padding: 10,
            },
          ]}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "800",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            {project.project_title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: width > 400 ? 230 : 180,
    alignItems: "center",

    display: "flex",
    flexDirection: "row",
  },
  ShoppingName: {
    position: "absolute",
    width: "30%",
    backgroundColor: "#FFFFFF",
    left: 0,
    height: "40%",
    display: "flex",
    flexDirection: "column",
  },
  ShopImage: {
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  ShopText: {
    height: "25%",
    backgroundColor: "black",
    justifyContent: "center",
  },
  Description: {
    width: "40%",
    height: "100%",
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
