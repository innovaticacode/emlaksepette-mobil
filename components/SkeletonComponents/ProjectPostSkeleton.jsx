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
import { Skeleton } from "@rneui/themed";
import ProjectPost from "../ProjectPost";
export default function ProjectPostSkeleton({}) {
  return (
    <TouchableOpacity style={{ backgroundColor: "#ebebeb" }}>
      <View style={styles.container}>
        <View style={styles.ShoppingName}>
          <View style={styles.ShopImage}>
            <Skeleton
              circle
              width={50}
              height={50}
              skeletonStyle={{ backgroundColor: "#dbdbdb" }}
              style={{ backgroundColor: "#ced4da" }}
            />
          </View>

          <Skeleton
            style={styles.ShopText}
            skeletonStyle={{ backgroundColor: "#dbdbdb" }}
          />
        </View>

        <Skeleton
          style={styles.Description}
          skeletonStyle={{ backgroundColor: "#dbdbdb" }}
        />
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
    backgroundColor: "#FFFFFF",
    left: "35%",
    height: 70,
    top: 0,
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
    width: "100%",
    height: 40,
    bottom: 0,
    position: "absolute",
    right: 0,
    alignItems: "center",
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
    fontSize: "13",
  },
});