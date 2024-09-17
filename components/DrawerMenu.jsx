import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Text,
  Image,
} from "react-native";
import Search from "../pages/Home/Search";
import Categories from "./Categories";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "./methods/user";
<<<<<<< HEAD
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialIcons";
import Search from "../pages/Home/Search";
=======
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/EvilIcons";
>>>>>>> 2b675788f1cc1127218f4ac29b46bb0bab11314f
import axios from "axios";

const DrawerMenu = ({ setIsDrawerOpen }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [namFromGetUser, setnamFromGetUser] = useState([]);
  const PhotoUrl = "https://private.emlaksepette.com/storage/profile_images/";


  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  useEffect(() => {
    if (user?.access_token && user?.id) {
      axios
        .get(`https://private.emlaksepette.com/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        })
        .then((response) => setnamFromGetUser(response.data.user))
        .catch((error) =>
          console.error("Kullanıcı verileri güncellenirken hata oluştu:", error)
        );
    }
  }, [user]);

  useEffect(() => {
    console.log("User object:", user); // user objesini kontrol et
    console.log("User type:", user.type); // user.type değerini kontrol et
  }, [user]);

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
    setIsDrawerOpen(false);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={{ alignItems: "flex-end", paddingRight: 15 }}>
          <TouchableOpacity onPress={() => setIsDrawerOpen(false)}>
            <IconAntDesign name="close" size={22} color={"#333"} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
            }}
          >
            {/* PROFİL FOTO START */}
            <View
              style={{
                width: 65,
                height: 65,
              }}
            >
              <View style={{ borderRadius: 50 }}>
                {user.access_token ? (
                  <Image
                    source={{ uri: PhotoUrl + namFromGetUser.profile_image }}
                    style={{ width: "100%", height: "100%" }}
                    borderRadius={50}
                  />
                ) : (
                  <Icon2 name="user" size={65} color="#333" padding={10}/>
                )}
              </View>
            </View>
            {/* PROFİL FOTO START */}

<<<<<<< HEAD
=======
            {/* GİRİŞ YAP-HESABIM BÖLÜMÜ START */}
>>>>>>> 2b675788f1cc1127218f4ac29b46bb0bab11314f
            <View style={{ gap: 6 }}>
              <TouchableOpacity
                disabled={user.access_token ? true : false}
                onPress={() => {
                  navigation.navigate("Login");
                  setIsDrawerOpen(false);
                }}
              >
                <Text
                  style={{ color: "#333", fontWeight: "600", fontSize: 13 }}
                >
                  {user.access_token ? namFromGetUser.name : "Giriş Yap"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={user.access_token ? false : true}
                onPress={() => {
                  navigation.navigate('ShopProfile');
                  setIsDrawerOpen(false);
                }}

              >
                <Text style={{ fontSize: 12 }}>
                  {user.access_token ?
                    user.type == 1 ? 'Hesabım' : 'Mağazam' : 'Hesabım'}
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
<<<<<<< HEAD
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{ width: "85%", backgroundColor: "#C4C4C4", padding: 0.5 }}
          />
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: "80%" }}>
=======
        {/* GİRİŞ YAP-HESABIM BÖLÜMÜ END */}


        {/* ÇİZGİ ÖGESİ START */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '85%', backgroundColor: '#C4C4C4', padding: 0.5 }} />
        </View>
        {/* ÇİZGİ ÖGESİ END */}


        {/* MENÜ ÖGELERİ START */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '80%' }}>
>>>>>>> 2b675788f1cc1127218f4ac29b46bb0bab11314f
            <Search setIsDrawerOpen={setIsDrawerOpen} />
          </View>
        </View>
        {/* MENÜ ÖGELERİ END */}

<<<<<<< HEAD
        {/* ARA ÇİZGİ ÖGESİ START */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{ width: "85%", backgroundColor: "#C4C4C4", padding: 0.5 }}
          />
=======

        {/* ÇİZGİ ÖGESİ START */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '85%', backgroundColor: '#C4C4C4', padding: 0.5 }} />
>>>>>>> 2b675788f1cc1127218f4ac29b46bb0bab11314f
        </View>
        {/* ÇİZGİ ÖGESİ END */}

<<<<<<< HEAD
        <View style={{ width: "100%", alignItems: "center", gap: 10 }}>
          {/* GRİ ALAN START */}
          <View
            style={{
              backgroundColor: "#F7F7F7",
              padding: 10,
              width: "85%",
              borderRadius: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => navigateToScreen("RealtorClubExplore")}
            >
              <Categories category={"Emlak Kulüp"} iconName={"hand-coin"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen("")}>
              <Categories
                category={"Gayrimenkul Ligi"}
                iconName={"trophy-variant"}
              />
=======

        {/* GRİ ALAN START */}
        <View style={{ width: '100%', alignItems: 'center', gap: 10 }}>
          <View style={{ backgroundColor: '#F7F7F7', padding: 10, width: '85%', borderRadius: 8 }}>
            {
            ((!user.access_token || user.type==1 ) || user.corporate_type=='Emlak Ofisi' )  && 
              <TouchableOpacity onPress={() => navigateToScreen('RealtorClubExplore')}>
              <Categories category={'Emlak Kulüp'} iconName={'hand-coin'} />
            </TouchableOpacity>
            }
           
            <TouchableOpacity onPress={() => navigateToScreen('')}>
              <Categories category={'Gayrimenkul Ligi'} iconName={'trophy-variant'} />
>>>>>>> 2b675788f1cc1127218f4ac29b46bb0bab11314f
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen("")}>
              <Categories
                category={"Paylaşımlı İlanlar"}
                iconName={"handshake"}
              />
            </TouchableOpacity>
          </View>
          {/* GRİ ALAN END */}

<<<<<<< HEAD
          <View style={{ width: "100%", alignItems: "center" }}>
            {/* İLAN VER BUTONU START */}
            <TouchableOpacity
              style={{
                backgroundColor: "#EA2C2E",
                width: "85%",
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
=======

          {/* İLAN VER BUTONU START */}
          <View style={{ width: '100%', alignItems: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: '#EA2C2E', width: '85%', padding: 10, borderRadius: 10, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' }}
>>>>>>> 2b675788f1cc1127218f4ac29b46bb0bab11314f
              onPress={() => {
                setIsDrawerOpen(false);
                navigation.navigate("ShareAdvert");
              }}
            >
              <IconAntDesign name="plus" color={"white"} size={18} />
              <Text style={{ color: "white", fontWeight: "600" }}>
                İlan Ver
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* İLAN VER BUTONU END */}


        {/* MÜŞTERİ HİZMETLERİ ALANI START */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#FFF3F2",
              flexDirection: "row",
              alignItems: "center",
              width: "85%",
              justifyContent: "center",
              gap: 10,
              padding: 8,
              borderRadius: 8,
            }}
          >
            <View>
              <Icon name="headset" size={30} color={"#EA2C2E"} />
            </View>
            <View style={{ gap: 5 }}>
              <Text
                style={{
                  color: "#EA2C2E",
                  fontWeight: "400",
                  letterSpacing: 1,
                }}
              >
                Müşteri Hizmetleri
              </Text>
              <Text
                style={{
                  color: "#EA2C2E",
                  fontWeight: "400",
                  letterSpacing: 1,
                }}
              >
                444 3 284{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* MÜŞTERİ HİZMETLERİ ALANI END */}
    </SafeAreaView>
  );
};

export default DrawerMenu;
