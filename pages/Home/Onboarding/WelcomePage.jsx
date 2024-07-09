import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function WelcomePage({ hideSplash }) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 2000, // Adjust duration as per your preference
      easing: Easing.out(Easing.ease), // Smooth easing
    });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.imageContainer}>
        <Animated.View style={[styles.animatedView, animatedStyle]}>
          <ImageBackground
            source={{
              uri: "https://test.emlaksepette.com/images/emlaksepettelogo.png",
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
      {/* <View style={styles.body}>
        <Text style={styles.title}>
          <Text style={styles.highlight}>Emlak sepette'ye</Text> hoşgeldiniz.
        </Text>
        <Text style={styles.subtitle}>
          Kaporanız güvende sistemiyle güvenle alışveriş yap
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  animatedView: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  highlight: {
    color: "#007bff",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
