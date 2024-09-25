import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./CommentCard.styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { apiUrl, frontEndUri, frontEndUriBase } from "../../methods/apiRequest";

const CommentCard = (props) => {
  // Destructuring owners from props
  const { rate, comment, created_at, images, title, addres } = props;
  const [listImage, setLıstImage] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (images) {
      var parsedImages = JSON.parse(images);
      return setLıstImage(parsedImages[0]?.replace("public/", "storage/"));
    }
  }, [images]);
  const numStars = Math.round(rate);

  const formatCreatedAt = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setDate(formattedDate); // formatlanmış tarihi setDate'e gönderiyoruz
  };

  useEffect(() => {
    formatCreatedAt(created_at);
  }, [created_at]);

  return (
    <View style={styles.cardArea}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Image
            source={{
              uri: frontEndUriBase + listImage,
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.head}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.addres}>{addres}</Text>
          </View>
        </View>
        <View style={styles.desc}>
          <View style={styles.star}>
            {[...Array(5)].map((_, index) => (
              <Ionicons
                key={index}
                name={index < numStars ? "star" : "star-outline"}
                size={12}
                color="gold"
              />
            ))}
          </View>
          <View style={styles.descCont}>
            <Text style={styles.desc}>Owner's Name</Text>
            <Text style={styles.desc}>{date}</Text>
            <Text style={styles.desc}>{comment}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
