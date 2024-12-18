import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const ShareProgressBar = ({ toplamHisse, satilanHisse, IsShowText }) => {
  const parcalar = Array.from({ length: toplamHisse });

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        {parcalar.map((_, index) => (
          <View
            key={index}
            style={[
              styles.parca,
              index < satilanHisse && styles.filledParca, // Dolu parçalar yeşil olacak
            ]}
          />
        ))}
      </View>
      {!IsShowText && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 5,
            paddingBottom: 3,
          }}
        >
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: "#2549C1",
              }}
            />
            <Text style={{ color: "#2549C1", fontSize: 12, fontWeight: "600" }}>
              Toplam {toplamHisse} Pay
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: "#208011",
              }}
            />
            <Text style={{ color: "#208011", fontSize: 12, fontWeight: "600" }}>
              Kalan {toplamHisse - satilanHisse} Pay
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: "#EA2C2E",
              }}
            />
            <Text style={{ color: "#EA2C2E", fontSize: 12, fontWeight: "600" }}>
              Satılan {satilanHisse} Pay
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: "100%",
  },
  progressBarContainer: {
    flexDirection: "row", // Parçaları yan yana diz
    gap: 4,
  },
  parca: {
    height: 10,
    flex: 1,
    margin: 0,
    backgroundColor: "#D3D3D3",
    borderRadius: 6, // Boş parçalar gri
  },
  filledParca: {
    backgroundColor: "#EA2C2E", // Dolu parçalar yeşil
  },
});
export default ShareProgressBar;
