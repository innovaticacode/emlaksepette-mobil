import React from "react";
import { View, Text, FlatList } from "react-native";
import { Svg, Path } from "react-native-svg";
import { styles } from "./TotalStarCardStyle";

const TotalStarCard = ({ ratingCounts }) => {
  const ratings = [5, 4, 3, 2, 1];
  const renderStars = (rating) => {
    const stars = [];
    // Render filled stars
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Svg key={i} viewBox="0 0 14 14" width={10.89} height={10.89}>
          <Path
            d="M13.668 5.014a.41.41 0 0 1 .21.695l-3.15 3.235.756 4.53a.4.4 0 0 1-.376.5.382.382 0 0 1-.179-.046l-3.91-2.14-3.9 2.164a.372.372 0 0 1-.408-.03.41.41 0 0 1-.155-.397l.733-4.557-3.17-3.217a.415.415 0 0 1-.1-.415.396.396 0 0 1 .313-.277l4.368-.68L6.64.229A.386.386 0 0 1 6.986 0c.146 0 .281.087.348.226L9.3 4.364l4.368.65z"
            fill="rgb(255, 192, 0)"
          />
        </Svg>
      );
    }
    // Render empty stars
    for (let i = rating; i < 5; i++) {
      stars.push(
        <Svg key={i + 5} viewBox="0 0 14 14" width={10.89} height={10.89}>
          <Path
            d="M13.668 5.014a.41.41 0 0 1 .21.695l-3.15 3.235.756 4.53a.4.4 0 0 1-.376.5.382.382 0 0 1-.179-.046l-3.91-2.14-3.9 2.164a.372.372 0 0 1-.408-.03.41.41 0 0 1-.155-.397l.733-4.557-3.17-3.217a.415.415 0 0 1-.1-.415.396.396 0 0 1 .313-.277l4.368-.68L6.64.229A.386.386 0 0 1 6.986 0c.146 0 .281.087.348.226L9.3 4.364l4.368.65z"
            fill="rgb(203, 211, 227)"
          />
        </Svg>
      );
    }
    return stars;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={ratings}
        renderItem={({ item }) => (
          <View style={styles.ratingCountContainer}>
            <View style={styles.starRatingContainer}>{renderStars(item)}</View>
            <Text style={styles.ratingCount}>({ratingCounts[item - 1]})</Text>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default TotalStarCard;
