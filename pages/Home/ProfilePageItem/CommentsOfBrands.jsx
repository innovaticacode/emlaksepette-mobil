import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SubjectFilter } from "../../../components";

export default function CommentsOfBrands(props) {
  const {} = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <View>
        <Text style={styles.title}>Konuya Göre Filtrele</Text>
        <View style={{ flexDirection: "row" }}>
          <SubjectFilter
            text="Tümü"
            active={activeIndex === 0}
            onPress={() => handleActive(0)}
          />
          <SubjectFilter
            text="Fotoğraflı Yorum"
            active={activeIndex === 1}
            onPress={() => handleActive(1)}
          />
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 19,
    color: "#0C0C0C",
    lineHeight: 12,
  },
});
