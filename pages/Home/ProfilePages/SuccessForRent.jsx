import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
export default function SuccessForRent() {
  const route = useRoute();
  const {
    title,
    message,
    primaryButtonText,
    secondaryButtonText,
    onContinue,
    onGoHome,
    icon, // Add any additional params like the icon if needed
  } = route.params;
  const nav = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Geri butonunu devre dışı bırak
        return true;
      };

      // Android'de donanım geri tuşunu engelle
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [])
  );
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        padding: 30,
        backgroundColor: "#f7f7f7",
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: "#D4EDDA",
            borderRadius: 50,
            width: 100,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="check" size={45} color={"#1C5F2D"} />
        </View>
        <View style={{ paddingTop: 50 }}>
          <Text style={{ fontSize: 18, color: "#333", fontWeight: "600" }}>
            {message}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: 50,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#EB2B2E",
            padding: 10,
            width: "80%",
            borderRadius: 5,
          }}
          onPress={onGoHome}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "#ffff",
              fontWeight: "700",
            }}
          >
            {primaryButtonText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#EB2B2E",
            padding: 10,
            width: "80%",
            borderRadius: 5,
          }}
          onPress={onContinue}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "#ffff",
              fontWeight: "700",
            }}
          >
            {secondaryButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
