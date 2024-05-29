import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import Modal from "react-native-modal";
import ProfileSettingsItem from "../../components/ProfileSettingsItem";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../components/methods/user";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Menu from "./Menu.json";
import { Platform } from "react-native";
import { ActivityIndicator } from "react-native";

export default function ShoppingProfile() {
  const { width, height, fontScale } = Dimensions.get("window");
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [data, setData] = useState([]);
  const [permissionsUser, setPermissionsUser] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [openAccor, setOpenAccor] = useState({});
  const PhotoUrl = "https://test.emlaksepette.com/storage/profile_images/";

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  useEffect(() => {
    if (user.role === "Kurumsal Hesap") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const fetchPermissionUser = async () => {
    try {
      if (user.access_token) {
        const response = await axios.get(
          `https://test.emlaksepette.com/api/institutional/users/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setPermissionsUser(response.data.permissions);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchPermissionUser();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Yükleme başladı

        const response = require("./Menu.json");
        const filteredMenu = response.filter((item) => {
          if (item.subMenu) {
            const filteredSubMenu = item.subMenu.filter((subItem) =>
              permissionsUser.includes(subItem.key)
            );
            if (filteredSubMenu.length > 0) {
              item.subMenu = filteredSubMenu;
              return true;
            }
            return false;
          }
          return permissionsUser.includes(item.key);
        });
        setData(filteredMenu);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchData();
  }, [permissionsUser]);

  const groupedData = data.reduce((acc, item) => {
    const existingGroupIndex = acc.findIndex(
      (group) => group.label === item.label
    );
    if (existingGroupIndex !== -1) {
      acc[existingGroupIndex].subMenu.push(item);
    } else {
      acc.push({ label: item.label, subMenu: [item] });
    }
    return acc;
  }, []);

  const logout = () => {
    setDialogVisible(false);
    SecureStore.setItemAsync("user", "");
    navigation.navigate("HomePage");
  };

  const toggleAccor = (index) => {
    setOpenAccor((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <View
          style={[
            style.opacity,
            { backgroundColor: user.banner_hex_code + 97 },
          ]}
        ></View>

        <ImageBackground
          source={require("./profilePhoto.jpg")}
          style={{ width: "100%", height: "100%" }}
          imageStyle={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        />
        <View style={style.UserInfo}>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              alignItems: "center",
              paddingLeft: 20,
              gap: 20,
            }}
          >
            <View
              style={{
                width: 65,
                height: 65,
              }}
            >
              <View style={style.profileImage}>
                <Image
                  source={{ uri: PhotoUrl + user.profile_image }}
                  style={{ width: "100%", height: "100%" }}
                  borderRadius={50}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                  >
                    {user.name}
                  </Text>
                  <View style={{ width: 20, height: 20, left: 10 }}>
                    <ImageBackground
                      source={require("./BadgeYellow.png")}
                      style={{ flex: 1 }}
                    />

                    <Icon
                      name="check"
                      style={{ position: "absolute", left: 3.5, top: 3.5 }}
                      size={13}
                    />
                  </View>
                </View>

                <Text
                  style={{ color: "white", fontSize: 11, fontWeight: "bold" }}
                >
                  {user.corporate_type}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}>
          <View style={{ gap: 20, padding: 10 }}>
            {groupedData.map((group, index) => (
              <View key={index}>
                {/* Başlık */}
                <Text style={style.headerText}>{group.label}</Text>

                {/* Alt menü */}
                {group.subMenu.length > 0 &&
                  group.subMenu.map((item, subIndex) =>
                    item.subMenu ? (
                      <Collapse
                        key={subIndex}
                        onToggle={() => {
                          setOpenAccor((prevState) => ({
                            ...prevState,
                            [subIndex]: !prevState[subIndex],
                          }));
                        }}
                        isCollapsed={!openAccor[subIndex]}
                      >
                        <CollapseHeader>
                          <View>
                            <ProfileSettingsItem
                              key={subIndex}
                              text={item.text}
                              ıconName={item.icon}
                              arrowControl={
                                item.subMenu && item.subMenu.length > 0
                              }
                              isCollapsed={!openAccor[subIndex]}
                            />
                          </View>
                        </CollapseHeader>
                        <CollapseBody style={{ margin: 10, gap: 10 }}>
                          {item.subMenu &&
                            item.subMenu.map((subItem, subItemIndex) => (
                              <TouchableOpacity
                                key={subItemIndex}
                                onPress={() => navigation.navigate(subItem.url)}
                              >
                                <ProfileSettingsItem
                                  text={subItem.text}
                                  arrowNone={true}
                                />
                              </TouchableOpacity>
                            ))}
                        </CollapseBody>
                      </Collapse>
                    ) : (
                      <View>
                        <TouchableOpacity
                          onPress={() => navigation.navigate(item.url)}
                        >
                          <ProfileSettingsItem
                            text={item.text}

                            ıconName={item.icon}
                            arrowControl={ 
                              item.subMenu && item.subMenu.length > 0
                            }
                            isCollapsed={!openAccor[subIndex]}

                          />
                        </TouchableOpacity>
                      </View>
                    )
                  )}
              </View>
            ))}
          </View>
          <View
            style={{ flex: 1 / 2, paddingBottom: 50, alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => setDialogVisible(true)}
              style={{
                backgroundColor: "#EA2A28",
                padding: 10,
                borderRadius: 6,
                width: "80%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  fontWeight: "500",
                }}
              >
                Çıkış Yap
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            onBackdropPress={() => setDialogVisible(!dialogVisible)}
            visible={dialogVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setDialogVisible(!dialogVisible);
            }}
          >
            <View style={{}}>
              <View
                style={[
                  style.modalView,
                  style.card,
                  {
                    padding: 0,
                    borderRadius: 10,
                    backgroundColor: "#F8F7F4",
                    alignItems: "center",
                    gap: 20,
                  },
                ]}
              >
                <Text style={{ color: "#333" }}>
                  Çıkış Yapmak İstedğinize Emin misiniz?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View style={{ flex: 1 / 2 }}>
                    <TouchableOpacity
                      onPress={logout}
                      style={{
                        backgroundColor: "#F8D7DA",
                        padding: 10,
                        borderRadius: 6,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "#721C24" }}>
                        Çıkış Yap
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1 / 2 }}>
                    <TouchableOpacity
                      style={[
                        {
                          backgroundColor: "#D4EDDA",
                          padding: 10,
                          borderRadius: 6,
                        },
                      ]}
                      onPress={() => setDialogVisible(!dialogVisible)}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#165724",
                          fontWeight: "600",
                        }}
                      >
                        İptal Et
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </View>
  );
}
const { width, height, fontScale } = Dimensions.get("window");
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    width: "100%",
    height: "19%",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  opacity: {
    width: "100%",
    height: "100%",
    backgroundColor: "#DE4241E6",
    position: "absolute",
    zIndex: 1,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    borderRadius: 50,
  },
  UserInfo: {
    width: "100%",
    paddingTop: "10%",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  body: {
    width: "100%",
    height: "150%",
    top: 55,
    paddingLeft: 20,
    paddingRight: 20,
  },
  Settings: {
    gap: 40,
    top: 30,
    width: "100%",
    backgroundColor: "#FFFF",
    borderColor: "#e6e6e6",
  },
  headerText: {
    fontSize: 13,
    color: "#000000",
    fontWeight: "bold",
  },
  animatedView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#FFFF",
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
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 20,
  },
  btnLogOut: {
    backgroundColor: "#E54242",
    width: "70%",
    padding: 13,
    borderRadius: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#F8F7F4",
    padding: 10,
    height: "30%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 22,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 10,

    borderWidth: 0.7,
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
