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
  Dimensions,
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

const { width, height } = Dimensions.get("window");

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
        "https://private.emlaksepette.com/api/menu-list"
      );

      const filteredMenuItems = response.data.slice(0,-1); // Menünün sondaki ögesini çıkarıyor.

      setMenuItems(filteredMenuItems);  // Filtrelenmiş menü öğelerini set ediyoruz
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchmenuItems();
  }, []);

  useEffect(() => {
    // Güncellenen menuItems state'ini kontrol etmek için burayı kullanıyoruz
    console.log("Render Edilen Menü Öğeleri:", menuItems);
  }, [menuItems]); // menuItems her değiştiğinde bu çalışacak

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    setIsDrawerOpen(false);
  };


  // const iconMapping = {
  //   'Projeler': 'folder-home',
  //   'Konut': 'home-group',
  //   'İş Yeri': 'storefront',
  //   'Arsa': 'terrain',
  //   'Tiny House': 'hoop-house',
  //   'Bungalov': 'tent',
  //   'Prefabrik Yapılar': 'greenhouse',
  //   'Tatil Sepette': 'island',
  //   'Gayrimenkul Ligi': 'trophy-variant',
  // };

  return (
    <SafeAreaView
      onTouchStart={() => Keyboard.dismiss()}
      style={{}}
    >
      <ScrollView>
        <View style={{ flex: 1 }}></View>

        <View style={{ gap: 3 }}>
          <TouchableOpacity onPress={() => navigateToScreen('Home')}>
            <Categories category={'Ana Sayfa'} iconName={'home'} />
          </TouchableOpacity>

          {menuItems.map((item, index) => {
            const text = item.text || '';


            const slug = text == "Prefabrik Yapılar"
              ? text
              : slugify(
                text == "Al Sat Acil" || text == "Paylaşımlı İlanlar"
                  ? text
                  : "emlak-ilanlari"
              );

              
            const name = text == "Prefabrik Yapılar"
            ? null
            : slugify(
              text == "Al Sat Acil" || text == "Paylaşımlı İlanlar"
                ? text
                : "Emlak İlanları"
            );
              

            return (
              <TouchableOpacity
                onPress={() => {
                  setIsDrawerOpen(false)

                  if (item.submenus && item.submenus?.length > 0) {
                    navigation.navigate("Public", {
                      title: item.text,
                      data: item.submenus,
                    });
                  } else {
                    navigation.navigate(
                      item.text == "Projeler"
                        ? "AllProject"
                        : "AllRealtorAdverts",
                      {
                        name: name,
                        slug: slug,
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
            )
          })}

          {/* {Object.keys(iconMapping).map((category,index) => (
            <Categories
              key={category}
              category={category}
              iconName={iconMapping[category]}
            />
          ))} */}
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
