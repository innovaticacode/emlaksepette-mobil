import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./SubjectFilter.styles";

const SubjectFilter = (props) => {
  const { active = false, onPress = () => {}, text = "" } = props;
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={active ? styles.activeBody : styles.body}
      >
        <Text style={active ? styles.activeText : styles.text}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

export default SubjectFilter;
