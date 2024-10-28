import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
  Linking,
} from "react-native";
import Search from "../../../pages/Home/Search";
import Categories from "../../Categories";
import { useNavigation, DrawerActions } from "@react-navigation/native"; // DrawerActions'ı ekledik
import { getValueFor } from "../../methods/user";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/EvilIcons";
import SocialIcons from "react-native-vector-icons/Entypo";
import axios from "axios";
import { styles } from "./DrawerMenu.style";
import { useDispatch } from "react-redux";
import { setShoppingProfile } from "../../../store/slices/Menu/MenuSlice";

const DrawerMenu = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const image = namFromGetUser.profile_image;
  let checkImage = null;

  const PhotoUrl = "https://private.emlaksepette.com/storage/profile_images/";

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const fetchMenuItems = async () => {
    try {
      if (user?.access_token && user?.id) {
        const response = await axios.get(
          `https://private.emlaksepette.com/api/users/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setnamFromGetUser(response.data.user);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [user]);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  if (image == "indir.jpeg") {
    if (namFromGetUser.name) {
      const fullName = namFromGetUser.name.split(" ");
      const name = fullName[0].charAt(0).toUpperCase();
      const surname = fullName[1].charAt(0).toUpperCase();
      checkImage = name + surname;
    }
  }

  return (
    <SafeAreaView>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.mainContainer}>
          <View style={styles.closeIconContainer}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
            >
              <IconAntDesign name="close" size={22} color={"#333"} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.profileRow}>
              {/* PROFİL FOTO START */}
              <View style={styles.profileImageContainer}>
                <View style={styles.profileImageWrapper}>
                  {user.access_token ? (
                    checkImage ? (
                      <Text
                        style={{
                          fontSize: 24,
                          color: "#000",
                          textAlign: "center",
                          textAlignVertical: "center",
                        }}
                      >
                        {checkImage}
                      </Text>
                    ) : (
                      <Image
                        source={{
                          uri: PhotoUrl + namFromGetUser.profile_image,
                        }}
                        style={styles.profileImage}
                        resizeMode="contain"
                      />
                    )
                  ) : (
                    <Icon2 name="user" size={64} color="#000" />
                  )}
                </View>
              </View>

              {/* PROFİL FOTO END */}

              {/* GİRİŞ YAP-HESABIM BÖLÜMÜ START */}
              <View style={styles.userInfoContainer}>
                <TouchableOpacity
                  disabled={user.access_token ? true : false}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.closeDrawer());
                    setTimeout(() => {
                      navigation.navigate("Login");
                    }, 200);
                  }}
                >
                  <Text style={styles.userName}>
                    {user.access_token ? namFromGetUser?.name : "Giriş Yap"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={user.access_token ? false : true}
                  onPress={() => {
                    navigateToScreen("Hesabım");
                    dispatch(setShoppingProfile({ isShoppingProfile: true }));
                  }}
                >
                  <Text style={styles.userAccountText}>
                    {user.access_token
                      ? user.type == 1
                        ? "Hesabım"
                        : "Panelim"
                      : "Hesabım"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* GİRİŞ YAP-HESABIM BÖLÜMÜ END */}

          {/* ÇİZGİ ÖGESİ START */}
          <View style={styles.divider} />
          {/* ÇİZGİ ÖGESİ END */}

          {/* MENÜ ÖGELERİ START */}
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <Search />
            </View>
          </View>
          {/* MENÜ ÖGELERİ END */}

          {/* ÇİZGİ ÖGESİ START */}
          <View style={styles.divider} />
          {/* ÇİZGİ ÖGESİ END */}

          {/* GRİ ALAN START */}
          <View style={styles.grayArea}>
            <View style={styles.categoryWrapper}>
              <TouchableOpacity onPress={() => navigateToScreen("SellAndRent")}>
                <Categories
                  category={"Sat Kirala Nedir ?"}
                  materialIcon={"groups-2"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateToScreen("SeeMyNeighbor")}
              >
                <Categories
                  category={"Komşunu Gör Nedir ?"}
                  materialIcon={"emoji-people"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateToScreen("SalePageMain")}
              >
                <Categories
                  category={"Satış Noktası Ol Nedir?"}
                  iconName={"handshake"}
                />
              </TouchableOpacity>
            </View>

            {/* BUTON START */}
            <View style={styles.advertButtonContainer}>
              <TouchableOpacity
                style={styles.advertButton}
                onPress={() => {
                  navigateToScreen("Support");
                }}
              >
                <IconAntDesign name="plus" color={"white"} size={18} />
                <Text style={styles.advertButtonText}>
                  Destek Talebi Oluştur
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* BUTON END */}

          {/* MÜŞTERİ HİZMETLERİ ALANI START */}
          <View style={styles.customerServiceContainer}>
            <TouchableOpacity style={styles.customerServiceButton}>
              <View>
                <Icon name="headset" size={30} color={"#EA2C2E"} />
              </View>
              <View style={styles.customerServiceTextContainer}>
                <Text style={styles.customerServiceText}>
                  Müşteri Hizmetleri
                </Text>
                <Text style={styles.customerServiceNumber}>0850 309 55 39</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* MÜŞTERİ HİZMETLERİ ALANI END */}

          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={() =>
                openLink(
                  "https://www.facebook.com/p/Emlak-Sepette-61555351466172"
                )
              }
            >
              <SocialIcons
                style={styles.Icons}
                name="facebook-with-circle"
                size={40}
                color={"#333"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLink("https://www.instagram.com/emlaksepette")}
            >
              <SocialIcons
                style={styles.Icons}
                name="instagram-with-circle"
                size={40}
                color={"#333"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openLink(
                  "https://www.linkedin.com/company/emlak-sepette/mycompany/"
                )
              }
            >
              <SocialIcons
                style={styles.Icons}
                name="linkedin-with-circle"
                size={40}
                color={"#333"}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.Version}>v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrawerMenu;
