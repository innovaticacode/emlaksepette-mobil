import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome6";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import { he } from "date-fns/locale";

const { width } = Dimensions.get("window"); // Get the width of the window

const IconGroup = () => {
  const circleSize = width * 0.4; // 50% of the screen width
  const apartmentSize = circleSize * 0.32; // Size of the apartment icon
  const plusIconSize = circleSize * 0.2; // 20% of the circle size
  const plusIconPosition = {
    bottom: plusIconSize + plusIconSize * 0.55,
    right: plusIconSize + plusIconSize * 0.3,
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
          name="file1"
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
              width: plusIconSize * 1.4,
              height: plusIconSize,
              borderRadius: plusIconSize,
            },
          ]}
        >
          <Icon2
            style={styles.handshake}
            name="handshake"
            size={plusIconSize * 0.9}
            color="white"
          />
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
    border: 50,
    borderColor: "#EA2B2E",
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
  handshake: {
    border: 100,
    borderColor: "black",
  },
});

export default IconGroup;
