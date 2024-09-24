// components/NoDataScreen.js

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphaneni burada ekle
import { useNavigation } from "@react-navigation/native"; // Navigasyonu kullanabilmek için

const NoDataScreen = ({ message, iconName, buttonText, navigateTo }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      {/* İkon */}
      <Icon
        name={iconName} // İkon ismi özelleştirilebilir
        size={64}
        color="#333"
        style={{ marginBottom: 20 }}
      />

      {/* Bilgilendirme yazısı */}
      <Text
        style={{
          fontSize: 18,
          color: "#333",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        {message} {/* Mesaj özelleştirilebilir */}
      </Text>

      {/* Anasayfaya Dön Butonu */}
      <TouchableOpacity
        style={{
          backgroundColor: "#EA2A28",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
        }}
        onPress={() => navigation.navigate(navigateTo)} // Yönlendirme özelleştirilebilir
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          {buttonText} {/* Buton yazısı özelleştirilebilir */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoDataScreen;
