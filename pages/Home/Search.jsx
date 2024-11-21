import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Keyboard,
} from "react-native";
import { React, useState, useEffect } from "react";
import Categories from "../../components/Categories";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import slugify from "react-slugify";
import { Platform } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { apiUrl } from "../../components/methods/apiRequest";

export default function Search({ onpres, setIsDrawerOpen }) {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const fetchmenuItems = async () => {
    try {
      const response = await axios.get(
        apiUrl + "menu-list"
      );

      const filteredMenuItems = response.data;

      setMenuItems(filteredMenuItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchmenuItems();
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <SafeAreaView onTouchStart={() => Keyboard.dismiss()} style={{}}>
      <ScrollView>
        <View style={{ flex: 1 }}></View>

        <View style={{ gap: 3 }}>
          <TouchableOpacity onPress={() => navigateToScreen("Home")}>
            <Categories category={"Ana Sayfa"} iconName={"home"} />
          </TouchableOpacity>

          {menuItems.map((item, index) => {
            const text = item.text || "";
            const slug =
              text == "Prefabrik Yapılar"
                ? text
                : slugify(
                  text == "Al Sat Acil" || text == "Paylaşımlı İlanlar"
                    ? text
                    : "emlak-ilanlari"
                );
            const name =
              text == "Prefabrik Yapılar"
                ? null
                : slugify(
                  text == "Al Sat Acil" || text == "Paylaşımlı İlanlar"
                    ? text
                    : "Emlak İlanları"
                );
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.closeDrawer());
                  if (item.text === "Gayrimenkul Ligi") {
                    return navigation.navigate("RealEstateLeague");
                  }
                  if (item.submenus && item.submenus?.length > 0) {
                    navigation.navigate("Public", {
                      title: item.text,
                      data: item.submenus,
                    });
                  } else {
                    navigation.navigate(item.text === "Projeler"
                      ? "AllProjects"
                      : "AllRealtorAdverts", {
                      name: name,
                      slug: slug,
                      data: null,
                      count: 0,
                      type: null,
                      optional: null,
                      title:
                        item.text === "Al Sat Acil" ||
                          item.text === "Paylaşımlı İlanlar"
                          ? item.text
                          : null,
                      check: null,
                      city: null,
                      county: null,
                      hood: null,
                      href: item.href,

                    });
                  }
                }}
                key={index}
              >
                <Categories category={item.text} />
              </TouchableOpacity>
            );
          })}
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
