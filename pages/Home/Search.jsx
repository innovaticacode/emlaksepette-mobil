import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Image,
} from "react-native";
import { React, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import Categories from "../../components/Categories";
import Header from "../../components/Header";
import { SearchBar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import slugify from "react-slugify";

import { Platform } from "react-native";

export default function Search({ onpres }) {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const [menuItems, setMenuItems] = useState([]);

  const fetchmenuItems = async () => {
    try {
      const response = await axios.get(
        "https://mobil.emlaksepette.com/api/menu-list"
      );
      setMenuItems(response.data);
      const submenus = response.data[0].submenus;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchmenuItems();
  }, []);

  return (
    <SafeAreaView onTouchStart={() => Keyboard.dismiss()} style={{ top: 10 }}>
      <ScrollView>
        <View style={{ flex: 1 }}></View>

        <View style={{ gap: 10 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                onpres();

                if (item.submenus && item.submenus.length > 0) {
                  navigation.navigate("Public", {
                    title: item.text,
                    data: item.submenus,
                  });
                } else {
                  console.log(item.text);
                  navigation.navigate(
                    item.text == "Projeler"
                      ? "AllProject"
                      : "AllRealtorAdverts",
                    {
                      name:
                        item.text == "Al Sat Acil" ||
                        item.text == "Paylaşımlı İlanlar"
                          ? item.text
                          : "Emlak İlanları",
                      slug: slugify(
                        item.text == "Al Sat Acil" ||
                          item.text == "Paylaşımlı İlanlar"
                          ? item.text
                          : "emlak-ilanlari"
                      ),
                      data: null,
                      count: 0,
                      type: null,
                      optional: null,
                      title:
                        item.text == "Al Sat Acil" ||
                        item.text == "Paylaşımlı İlanlar"
                          ? item.text
                          : null,
                      check: null,
                      city: null,
                      county: null,
                      hood: null,
                      href: item.href,
                    }
                  );
                }
              }}
              key={index}
            >
              <Categories category={item.text} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Input: {
    alignItems: "center",
    height: "30%",
    bottom: 8,
    zIndex: 1,
  },
  RealtorClub: {
    width: "100%",
    padding: 15,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "black",
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
