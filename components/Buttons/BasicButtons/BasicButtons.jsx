import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./BasicButtons.styles";

const BasicButtons = ({ icon, text, onPress, containerStyle }) => {
  const getStyle = () => {
    if (containerStyle) {
      return { ...styles.container, ...containerStyle };
    }
    return styles.container;
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress()}
        style={getStyle()}
      >
        <React.Fragment>{icon}</React.Fragment>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

export default BasicButtons;
