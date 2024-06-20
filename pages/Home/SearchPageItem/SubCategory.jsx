import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import CategoryAdverts from "../İlanYükleme/ProjectAdvertsAdd/CategoryAdverts";
import slugify from 'react-slugify';

export default function SubCategoryPage({}) {
  const route = useRoute();
  const navigation = useNavigation();
  const { Submenu, title, name } = route.params;

  
  const handlePress = (item) => {
    if (item.submenus && item.submenus.length > 0) {
      navigation.navigate("SubCategoryChild", {
        text: item.text,
        title: title,
        name: name,
        Submenu: item.submenus,
      });
    } else {
   

      navigation.navigate(
        title == "Projeler" ? "AllProject" : "AllRealtorAdverts",
        {
          name: title == "Projeler" ? `${name}${title}` : "Emlak İlanları",
          slug: slugify(
            title == "Projeler" ? `${name}${title}` : "emlak-ilanlari"
          ),
          data: null,
          count: 0,
          type: null,
          optional: slugify(name),
          title: slugify(title == "Projeler" ? "" : title || ""),
          check: slugify(item.text || ""),
          city: null,
          county: null,
          hood: null,
        }
      );
    }
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {Submenu.map((item, index) => (
        <TouchableOpacity onPress={() => handlePress(item)} key={index}>
          <CategoryAdverts text={item.text} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
