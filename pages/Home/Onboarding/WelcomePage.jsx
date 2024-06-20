import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function WelcomePage({ hideSplash }) {
  return (
    <View style={{ flex: 1 }}>
      <Swiper
        paginationStyle={styles.paginationStyle}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        autoplay={false}
      >
        <View style={styles.slide}>
          <Image
            source={{
              uri: "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg",
            }}
            style={styles.image}
          />
          <LinearGradient
            colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
            style={styles.overlay}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
          />
          <Text style={styles.text}>Emlaksepetteye hoşgeldiniz</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, at
            saepe facilis labore pariatur praesentium nesciunt unde. Minima
            culpa qui voluptas, velit consectetur ad?
          </Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg",
            }}
            style={styles.image}
          />
          <LinearGradient
            colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
            style={styles.overlay}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
          />
          <Text style={styles.text}>Emlaksepetteye hoşgeldiniz</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, at
            saepe facilis labore pariatur praesentium nesciunt unde. Minima
            culpa qui voluptas, velit consectetur ad?
          </Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={{
              uri: "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg",
            }}
            style={styles.image}
          />
          <LinearGradient
            colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
            style={styles.overlay}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
          />
          <Text style={styles.text}>Emlaksepetteye hoşgeldiniz</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, at
            saepe facilis labore pariatur praesentium nesciunt unde. Minima
            culpa qui voluptas, velit consectetur ad?
          </Text>
          <TouchableOpacity style={styles.description2} onPress={hideSplash}>
            <Text style={styles.description2Text}>HEMEN BAŞLA</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height,
  },
  text: {
    position: "absolute",
    color: "#333",
    fontSize: 27,
    fontWeight: "bold",
    fontWeight: "900",
  },
  description: {
    position: "absolute",
    color: "#333",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 20,
    bottom: 0, // Metnin konumunu ayarlamak için
    top: 470, // Metnin konumunu ayarlamak için
    fontWeight: "500",
  },
  description2: {
    position: "absolute",
    width: 300, // Örneğin istediğiniz genişliği buradan ayarlayabilirsiniz
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // İstediğiniz aralığı buradan ayarlayabilirsiniz
    bottom: 100, //
  },
  description2Text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  paginationStyle: {
    bottom: 10,
  },
  dotStyle: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDotStyle: {
    backgroundColor: "#007aff",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3,
  },
});
