import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Categories from "../../../components/Categories";
import CategoryAdverts from "../İlanYükleme/ProjectAdvertsAdd/CategoryAdverts";
import slugify from "react-slugify";

export default function PublicPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, data, title } = route.params;
  const goToSubCategoriesPage = (subcategories) => {};
  const filteredData = data.filter((item) => item.text !== "Tüm Projeler");

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        {filteredData.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              if (item.submenus && item.submenus.length > 0) {
                navigation.navigate("SubCategory", {
                  name: item.text,
                  Submenu: item.submenus,
                  title: title,
                });
              } else {
                navigation.navigate( item.text === "Projeler"
                  ? "AllProjects"
                  : "AllRealtorAdverts", {
                
                    name: title === "Projeler" ? item.text : "Emlak İlanları",
                    slug: slugify(
                      title === "Projeler" ? item.text : "emlak-ilanlari"
                    ),
                    data: null,
                    count: 0,
                    type: null,
                    optional: slugify(item.text),
                    title: slugify(title === "Projeler" ? "" : title || ""),
                    check: slugify(item.text || ""),
                    city: null,
                    county: null,
                    hood: null,
                    href: item.href,
                  
                });
              }
            }}
            key={index}
          >
            <CategoryAdverts text={item.text} title={title} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
{
  /* {category.subcategories.map((subcategory, subIndex) => (
            <Text key={subIndex}>{subcategory}</Text>
          ))} */
}
