import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  PanResponder,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Lightbox from "react-native-lightbox";

export default function CommentItem({ username, comment, date, rate, image }) {
  const [stars, setStars] = useState([false, false, false, false, false]);
  const [commentImages, setCommentImages] = useState([]);

  // API URL'nizi burada tanımlayın
  const apiUrl = "https://private.emlaksepette.com/";

  useEffect(() => {
    // Eğer image varsa ve bir string ise, JSON.parse ile diziyi oluştur
    if (image && typeof image === "string") {
      try {
        const parsedImages = JSON.parse(image);
        // URL'leri oluştur ve logla
        const updatedImages = parsedImages.map((img) => {
          const fixedUrl = img.replace("public/", "storage/");
          console.log("Image URL:", `${apiUrl}${fixedUrl}`);
          return fixedUrl;
        });
        setCommentImages(updatedImages);
      } catch (error) {
        console.error("Invalid image format:", error);
        setCommentImages([]);
      }
    } else {
      setCommentImages([]);
    }
  }, [image]);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { weekday: "long", month: "long", day: "numeric" };
    return dateObject.toLocaleDateString("tr-TR", options);
  };

  const numStars = Math.round(rate);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.commentContainer}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 4 }}>
          {[...Array(numStars)].map((_, index) => (
            <Ionicons key={index} name="star" size={12} color="gold" />
          ))}
        </View>
        <View>
          <Text style={{ fontSize: 11, color: "grey" }}>
            {formatDate(date)}
          </Text>
        </View>
      </View>
      <View style={{ gap: 5 }}>
        <View>
          <Text style={{ fontSize: 11, color: "#333" }}>{username}</Text>
        </View>
        <View>
          <Text numberOfLines={3}>{comment}</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        {commentImages.map((img, i) => {
          const imageUri = `${apiUrl}${img}`;
          console.log(imageUri); // Log the full image URI

          return (
            <View key={i} style={styles.imageWrapper}>
              <Lightbox>
                <Animated.View
                  style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                  }}
                  {...panResponder.panHandlers}
                >
                  <ImageBackground
                    style={styles.image}
                    source={{ uri: imageUri }} // Dynamic URL
                    onError={(error) =>
                      console.log("Image Load Error:", error.nativeEvent.error)
                    }
                    onLoad={() => console.log("Image Loaded")}
                  />
                </Animated.View>
              </Lightbox>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    width: 250,
    gap: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 15,
  },
  imageWrapper: {
    width: 80, // İstenilen boyutları ayarlayın
    height: 80,
    backgroundColor: "red",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
