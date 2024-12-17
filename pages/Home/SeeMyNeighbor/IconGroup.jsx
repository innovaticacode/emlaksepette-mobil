import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("window"); // Get the width of the window

const IconGroup = () => {
  const circleSize = width * 0.4; // 50% of the screen width
  const apartmentSize = circleSize * 0.3; // Size of the apartment icon
  const plusIconSize = circleSize * 0.14; // 20% of the circle size
  const plusIconPosition = {
    bottom: plusIconSize + plusIconSize * 1.4, // Adjusted to center it correctly below the apartment icon
    right: plusIconSize + plusIconSize * 1.4, // Adjusted to center it correctly to the right of the apartment icon
  };

  return (
    <View
      style={[
        styles.circleContainer,
        { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
      ]}
    >
      <View style={styles.iconContainerApartment}>
        <Icon1
          name="office-building-outline"
          size={apartmentSize}
          color="white"
          style={styles.apartmentIcon}
        />
      </View>
      <View
        style={[
          styles.iconContainer,
          { bottom: plusIconPosition.bottom, right: plusIconPosition.right },
        ]}
      >
        <View
          style={[
            styles.plusIconBackground,
            {
              width: plusIconSize,
              height: plusIconSize,
              borderRadius: plusIconSize / 2,
            },
          ]}
        >
          <Icon2 name="pluscircle" size={plusIconSize * 0.9} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconContainerApartment: {
    justifyContent: "center", // Center the icon
    alignItems: "center", // Center the icon
    position: "relative",
    // Set relative position for absolute children
  },
  apartmentIcon: {
    position: "relative", // Position it relatively
  },
  iconContainer: {
    position: "absolute", // Position plus icon absolutely
  },
  plusIconBackground: {
    backgroundColor: "#EA2B2E",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconGroup;
