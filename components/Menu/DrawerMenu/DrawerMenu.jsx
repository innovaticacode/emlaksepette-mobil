import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
} from "react-native";
import Search from "../../../pages/Home/Search";
import Categories from "../../Categories";
import { useNavigation, DrawerActions } from "@react-navigation/native"; // DrawerActions'ı ekledik
import { getValueFor } from "../../methods/user";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/EvilIcons";
import axios from "axios";
import { styles } from "./DrawerMenu.style";

const DrawerMenu = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [namFromGetUser, setnamFromGetUser] = useState([]);
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
    navigation.dispatch(DrawerActions.closeDrawer()); // Drawer'ı kapatıyoruz
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.closeIconContainer}>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} // Drawer'ı kapatıyoruz
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
                    <Image
                      source={{ uri: PhotoUrl + namFromGetUser.profile_image }}
                      style={styles.profileImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <Icon2 name="user" size={65} color="#333" padding={10} />
                  )}
                </View>
              </View>
              {/* PROFİL FOTO END */}

              {/* GİRİŞ YAP-HESABIM BÖLÜMÜ START */}
              <View style={styles.userInfoContainer}>
                <TouchableOpacity
                  disabled={user.access_token ? true : false}
                  onPress={() => {
                    setIsDrawerOpen(false);
                    setTimeout(() => {
                      navigation.navigate("Login");
                    }, 1000);
                  }}
                >
                  <Text style={styles.userName}>
                    {user.access_token ? namFromGetUser.name : "Giriş Yap"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={user.access_token ? false : true}
                  onPress={() => {
                    navigateToScreen("ShopProfile");
                  }}
                >
                  <Text style={styles.userAccountText}>
                    {user.access_token
                      ? user.type == 1
                        ? "Hesabım"
                        : "Mağazam"
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
              <TouchableOpacity
                onPress={() => navigateToScreen("RealtorClubExplore")}
              >
                <Categories
                  category={"Emlak Kulüp Nedir ?"}
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
                  category={"Satış Noktası Ol"}
                  iconName={"handshake"}
                />
              </TouchableOpacity>
            </View>

            {/* İLAN VER BUTONU START */}
            <View style={styles.advertButtonContainer}>
              <TouchableOpacity
                style={styles.advertButton}
                onPress={() => {
                  navigateToScreen("ShareAdvert");
                }}
              >
                <IconAntDesign name="plus" color={"white"} size={18} />
                <Text style={styles.advertButtonText}>İlan Ver</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* İLAN VER BUTONU END */}

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
                <Text style={styles.customerServiceNumber}>444 3 284</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* MÜŞTERİ HİZMETLERİ ALANI END */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrawerMenu;
