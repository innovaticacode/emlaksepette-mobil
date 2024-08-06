import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native";
import Categories from "./Categories"; // Bu import, Categories bileşeninizi temsil eden dosyaya göre değişebilir
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "./methods/user";
const { width, height } = Dimensions.get("window");

const DrawerMenu = ({ setIsDrawerOpen }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    setIsDrawerOpen(false);
  };
  console.log(user);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          zIndex: 1,

          height: height * 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigateToScreen("HomePage")}>
            <Categories
              category="Ana Sayfa"
              bordernone="none"
              iconName="home"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen("Hesabım")}>
            {user.access_token ? (
              <Categories
                category="Hesabım"
                bordernone="none"
                iconName="user"
              />
            ) : (
              <Categories
                category="Giriş Yap"
                bordernone="none"
                iconName="user"
              />
            )}
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
          {user.role == "Kurumsal Hesap" && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ShareAdvert");
                setIsDrawerOpen(false);
              }}
            >
              <Categories
                category="İlan Ver"
                bordernone="none"
                iconName="plus"
              />
            </TouchableOpacity>
          )}

          {user.role == "Bireysel Hesap" && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Emlak", { name: "İlan Ver" });
                setIsDrawerOpen(false);
              }}
            >
              <Categories
                category="Sat Kirala"
                bordernone="none"
                iconName="search-plus"
              />
            </TouchableOpacity>
          )}
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
