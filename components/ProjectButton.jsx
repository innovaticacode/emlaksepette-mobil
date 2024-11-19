import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ProjectButton = ({ text, color, onPress ,textColor}) => {

  const getColor = () => {
    return color;
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getColor() }]}
      activeOpacity={0.8}
      onPress={() => onPress()}
    >
      <Text style={[styles.text,{color:textColor? textColor :'#FFF'}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ProjectButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,

    height: "auto",

  },
  text: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
