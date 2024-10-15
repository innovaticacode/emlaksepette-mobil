import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import CategoryAdverts from "../İlanYükleme/ProjectAdvertsAdd/CategoryAdverts";
import PostDetail from "../../PostDetail";
import HomeList from "./HomeList";
import slugify from "react-slugify";

export default function SubCategoryChild() {
  const route = useRoute();
  const { name, Submenu, title, text } = route.params;
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate(
      title === "Projeler" ? "AllProject" : "AllRealtorAdverts",
      {
    
          name: title === "Projeler" ? `${name}${title}` : "Emlak İlanları",
          slug: slugify(
            title === "Projeler" ? `${name}${title}` : "emlak-ilanlari"
          ),
          data: null,
          count: 0,
          type: slugify(title === "Projeler" ? "" : text || ""),
          optional: slugify(name),
          title: slugify(title === "Projeler" ? "" : title || ""),
          check: slugify(item.text || ""),
          city: null,
          county: null,
          hood: null,
          href: item.href,
      
      }
    );
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        {Submenu.map((item, index) => (
          <TouchableOpacity onPress={() => handlePress(item)} key={index}>
            <CategoryAdverts text={item.text} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
