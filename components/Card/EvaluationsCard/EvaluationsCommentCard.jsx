import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./EvaluationsCommentCard.styles";

const EvaluationsCommentCard = (props) => {
  const {
    mainImage = "",
    title = "",
    star = 5,
    desc = "",
    info = "",
    images = [],
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={{
            uri: mainImage,
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
      {/* çoklu yorum var ise burada göstereceğiz */}

      <View style={{ paddingTop: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row" }}>
            {images.map((imageUri, index) => (
              <Image
                key={index}
                source={{ uri: imageUri }}
                style={styles.multiImage}
                resizeMode="cover"
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EvaluationsCommentCard;
