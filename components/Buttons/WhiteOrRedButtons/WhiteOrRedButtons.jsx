import React from "react";
import { Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { style } from "./WhiteOrRedButtons.styles";

const WhiteOrRedButtons = ({ text, onPress, icon, bgColor }) => {
  // Arka plan rengini dinamik olarak ayarla
  const getStyle = () => {
    if (bgColor) {
      return { backgroundColor: bgColor };
    }
  };

  // Metin rengini dinamik olarak ayarla
  const getTextColor = () => {
    if (bgColor) {
      return { color: "#fff" }; // Arka plan varsa beyaz metin rengi
    }
    return { color: "#EA2B2E" }; // Arka plan yoksa varsayılan metin rengi
  };

  return (
    <TouchableOpacity
      style={[style.btnBody, getStyle()]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && (
        <AntDesign name="home" size={20} color={bgColor ? "#fff" : "#EA2B2E"} />
      )}
      <Text style={[style.text, getTextColor()]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default WhiteOrRedButtons;
