import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { StarFilter, SubjectFilter } from "../../../components";

export default function CommentsOfBrands(props) {
  const {} = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [starIndex, setStarIndex] = useState(5);

  const handleStar = (index) => {
    setStarIndex(index);
  };

  const handleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <View style={styles.subjectArea}>
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
        <View style={styles.starArea}>
          <Text style={styles.title}>Puana Göre Filitrele</Text>
          <FlatList
            data={[5, 4, 3, 2, 1]}
            renderItem={({ item }) => (
              <>
                <StarFilter
                  star={item}
                  active={starIndex === item}
                  onPress={() => handleStar(item)}
                />
              </>
            )}
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
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
  subjectArea: {
    gap: 6,
  },
  starArea: {
    marginTop: 6,
    gap: 4,
  },
});
