import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import Categories from "./Categories"; // Bu import, Categories bileşeninizi temsil eden dosyaya göre değişebilir
import { useNavigation } from "@react-navigation/native";

const DrawerMenu = ({setIsDrawerOpen }) => {
    const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, zIndex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigateToScreen("HomePage")}>
            <Categories
              category="Ana Sayfa"
              bordernone="none"
              iconName="home"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen("Hesabım")}>
            <Categories category="Hesabım" bordernone="none" iconName="user" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateToScreen("RealtorClubExplore")}
          >
            <Categories
              category="Emlak Kulüp"
              bordernone="none"
              showImage={true}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Categories category="İlan Ver" bordernone="none" iconName="plus" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Categories
              category="Sat Kirala"
              bordernone="none"
              iconName="search-plus"
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <ImageBackground
        source={require("../pages/Home/MenuBg.jpg")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          opacity: 0.2,
        }}
        resizeMode="cover"
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
      />
    </>
  );
};

export default DrawerMenu;
