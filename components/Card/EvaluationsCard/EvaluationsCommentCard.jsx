import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./EvaluationsCommentCard.styles";
import { frontEndUriBase } from "../../methods/apiRequest";
import ImageView from "react-native-image-viewing";

const EvaluationsCommentCard = (props) => {
  const {
    mainImage = "",
    title = "",
    star,
    desc = "",
    info = "",
    images,
  } = props;

  let formattedMainImage = "";
  const [parsedImages, setParsedImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images) {
      try {
        const parsed = JSON.parse(images);
        setParsedImages(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("JSON parsing error:", error);
      }
    }
  }, [images]);

  if (mainImage) {
    if (mainImage.startsWith("public/")) {
      formattedMainImage = mainImage.replace("public/", "storage/");
    } else {
      formattedMainImage = `housing_images/${mainImage}`;
    }
  } else {
    console.warn("Main image is not provided or is invalid:", mainImage);
  }

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
    setVisible(true);
  };

  const imagesList = parsedImages.map((image) => ({
    uri: frontEndUriBase + image.replace("public/", "storage/"),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={{
            uri: frontEndUriBase + formattedMainImage,
          }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.star}>
            {[...Array(star)].map((_, index) => (
              <Ionicons
                key={index}
                name={index < 5 ? "star" : "star-outline"}
                size={12}
                color="gold"
                style={{ marginRight: 1 }}
              />
            ))}
          </View>
          <Text style={styles.desc}>{desc}</Text>
          <Text style={styles.info}>{info}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            {Array.isArray(parsedImages) && parsedImages.length > 0
              ? parsedImages.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleImagePress(index)}
                  >
                    <Image
                      source={{
                        uri:
                          frontEndUriBase +
                          image.replace("public/", "storage/"),
                      }}
                      style={styles.multiImage}
                    />
                  </TouchableOpacity>
                ))
              : null}
          </View>
        </ScrollView>
      </View>

      <ImageView
        images={imagesList}
        imageIndex={currentImageIndex}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
          setCurrentImageIndex(0);
        }}
      />
    </View>
  );
};

export default EvaluationsCommentCard;
