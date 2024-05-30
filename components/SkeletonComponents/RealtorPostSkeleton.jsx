import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Skeleton } from "@rneui/themed";

const RealtorPostSkeleton = () => {
  return (
    <TouchableOpacity style={styles.touchable}>
      <View style={styles.container}>
        <View style={styles.İlan}>
          <View style={{ width: "30%" }}>
            <Skeleton
              style={styles.imageSkeleton}
              skeletonStyle={{ backgroundColor: "#dbdbdb" }}
            />
          </View>

          <View style={styles.container2}>
            <View style={styles.captionAndIcons}>
              <View style={styles.caption}>
                
                <Skeleton
                  style={styles.captionTextSkeleton}
                  skeletonStyle={{ backgroundColor: "#dbdbdb" }}
                />
                <Skeleton
                  style={styles.titleSkeleton}
                  skeletonStyle={{ backgroundColor: "#dbdbdb" }}
                />
              </View>
              <View style={styles.ıcons}>
                <Skeleton
                  style={styles.ıconSkeleton}
                  circle
                  skeletonStyle={{ backgroundColor: "#dbdbdb" }}
                />
                <Skeleton
                  style={styles.ıconSkeleton}
                  circle
                  skeletonStyle={{ backgroundColor: "#dbdbdb" }}
                />
              </View>
            </View>

            <View style={styles.PriceAndButtons}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Skeleton
                  style={styles.priceSkeleton}
                  skeletonStyle={{ backgroundColor: "#dbdbdb" }}
                />
              </View>
              <Skeleton
                style={styles.addBasketSkeleton}
                skeletonStyle={{ backgroundColor: "#dbdbdb" }}
              />
            </View>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItems}>
            <Skeleton
              style={styles.infoItemSkeleton}
              skeletonStyle={{ backgroundColor: "#dbdbdb" }}
            />
            <Skeleton
              style={styles.infoItemSkeleton}
              skeletonStyle={{ backgroundColor: "#dbdbdb" }}
            />
            <Skeleton
              style={styles.infoItemSkeleton}
              skeletonStyle={{ backgroundColor: "#dbdbdb" }}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Skeleton
              style={styles.InformationTextSkeleton}
              skeletonStyle={{ backgroundColor: "#dbdbdb" }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: "#ebebeb",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  İlan: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container2: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
  captionAndIcons: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  PriceAndButtons: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  caption: {
    width: "70%",
  },
  ıcons: {
    display: "flex",
    flexDirection: "row",
    width: "25%",
    bottom: 5,
    justifyContent: "space-between",
  },
  addBasket: {
    paddingLeft: 20,
    paddingRight: 20,
    padding: 5,
    width: "50%",
    alignItems: "center",
    backgroundColor: "#264ABB",
  },
  ıconContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFFF",
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
  InformationText: {
    fontSize: width > 400 ? 12 : 10,
    right: width > 400 ? 10 : 5,
  },
  priceText: {
    color: "#264ABB",
    fontWeight: "700",
    fontSize: 12,
  },
  discountedPriceText: {
    textDecorationLine: "line-through",
    color: "#FF0000",
    fontWeight: "700",
    fontSize: 10,
  },
  discountText: {
    color: "red",
    fontSize: 11,
    padding: 5,
  },
  imageSkeleton: {
    width: "100%",
    height: 80,
  },
  captionTextSkeleton: {
    width: "100%",
    height: 10,
    marginVertical: 5,
  },
  titleSkeleton: {
    width: "100%",
    height: 20,
  },
  ıconSkeleton: {
    width: 28,
    height: 28,
    marginHorizontal: 5,
  },
  priceSkeleton: {
    width: 60,
    height: 20,
  },
  addBasketSkeleton: {
    width: "50%",
    height: 30,
  },
  infoRow: {
    backgroundColor: "#E8E8E8",
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItems: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoItemSkeleton: {
    width: 50,
    height: 20,
    marginHorizontal: 5,
  },
  InformationTextSkeleton: {
    width: 100,
    height: 20,
  },
});

export default RealtorPostSkeleton;
