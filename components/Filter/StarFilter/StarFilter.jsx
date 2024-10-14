import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./StarFilter.styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const StarFilter = (props) => {
  const { active = false, star = 5, onPress = () => {}, count } = props;

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={active ? styles.activeBody : styles.body}
      >
        <View style={styles.starBody}>
          {[...Array(star)].map((_, index) => (
            <Ionicons
              key={index}
              name={index < 5 ? "star" : "star-outline"}
              size={12}
              color="gold"
              style={{ marginRight: 1 }}
            />
          ))}
          {count ? <Text style={styles.count}>{`(${count})`}</Text> : null}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default StarFilter;
