// components/NoDataScreen.js

import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // İkon kütüphaneni burada ekle
import { useNavigation } from "@react-navigation/native"; // Navigasyonu kullanabilmek için

const NoDataScreen = ({ message, iconName, buttonText, navigateTo,isShowButton }) => {
    const navigation = useNavigation();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                
            }}
        >
            <View
                style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 50,
                    borderColor: "#e6e6e6",
                    padding: 15,
                    borderWidth: 0.7,
                    marginBottom: 20,
                    ...Platform.select({
                        ios: {
                            shadowColor: " #e6e6e6",
                            shadowOffset: { width: 1, height: 1 },
                            shadowOpacity: 0.2,
                            shadowRadius: 5,
                        },
                        android: {
                            elevation: 5,
                        },
                    }),

                }}
            >
                {/* İkon */}
                <Icon
                    name={iconName} // İkon ismi özelleştirilebilir
                    size={50}
                    color="#EA2A28"
                />
            </View>
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
         {
            buttonText &&

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
         }
            
          
        </View>
    );
};

export default NoDataScreen;
