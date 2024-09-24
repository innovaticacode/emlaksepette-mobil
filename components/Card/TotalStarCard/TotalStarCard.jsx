import React from "react";
import { View } from "react-native";
import { styles } from "./TotalStarCardStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text } from "react-native";

const TotalStarCard = (props) => {
  const { rate } = props;

  return (
    <React.Fragment>
      <View style={styles.areaCont}>
        <View style={styles.desc}>
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name={index < rate ? "star" : "star-outline"}
              size={14}
              color="gold"
            />
          ))}
          <Text style={styles.text}>{`(${rate ? rate : "0"})`}</Text>
        </View>
      </View>
    </React.Fragment>
  );
};

export default TotalStarCard;
