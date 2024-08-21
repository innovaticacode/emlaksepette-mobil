import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "./methods/user";
import { Image } from "expo-image";

export default function ProjectPost({
  project,
  ımage,
  location,
  city,
  user,
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
  const [userLogin, setuserLogin] = useState({});
  useEffect(() => {
    getValueFor("user", setuserLogin);
  }, []);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
          ProjectId: ProjectNo,
        })
      }
    >
      <View style={styles.container}>
        <Image
          source={{ uri: ımage }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.ShoppingName}>
          <View style={styles.ShopImage}>
            <Image
              source={{ uri: ProfilImage }}
              style={{ width: "50%", height: "90%" }}
              contentFit="cover"
              transition={200}
            />
          </View>
          {/* <View style={styles.ShopText}>
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
          </View> */}
        </View>

        <View
          style={[
            styles.Description,
            {
              backgroundColor: user?.banner_hex_code + "CC",
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
          {userLogin &&
            userLogin.corporate_type == "Emlak Ofisi" &&
            project.club_rate && (
              <View style={styles.commissionBadge}>
                <Text style={styles.commissionText}>
                  %{project.club_rate} KOMİSYON!
                </Text>
              </View>
            )}
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
    width: 100,
    backgroundColor: 'red',
    left: 0,
    height: 70,
    top: 0,
    display: "flex",
    flexDirection: "column",
    borderBottomRightRadius:20
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
    width: "100%",
    height: 40,
    bottom: 0,
    position: "absolute",
    right: 0,
    alignItems: "center",
    borderTopRightRadius:20,
    justifyContent: "center",
  },
  commissionBadge: {
    position: "absolute",
    right: 0,
    bottom: 60,
    width: 120,
    height: 30,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  commissionText: {
    color: "green",
    fontWeight: "700",
    fontSize: 13,
  },
});
