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
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import Modal from "react-native-modal";
import ProfileSettingsItem from "../../components/ProfileSettingsItem";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../components/methods/user";
import * as SecureStore from "expo-secure-store";
import { Shadow } from "react-native-shadow-2";
import Verification from "./ProfilePages/Verification";
import Menu from "./Menu.json";
import axios from "axios";
import { Platform } from "react-native";
export default function ShoppingProfile() {
  const [data, setData] = useState([]);
  const [MenuItems, setMenuItems] = useState([]);

  const [permissionsUser, setpermissionsUser] = useState([]);

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
        setpermissionsUser(response.data.permissions);
      }
    } catch (error) {
      console.error("eror", error);
    }
  };

  useEffect(() => {
    fetchPermissionUser();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // JSON dosyasını require ile içe aktarıyoruz
        const response = require("./Menu.json");
        const filteredMenu = response.filter((item) => {
          if (item.subMenu) {
            // Eğer alt menü varsa, alt menü öğelerini filtrele
            const filteredSubMenu = item.subMenu.filter((subItem) =>
              permissionsUser.includes(subItem.key)
            );
            if (filteredSubMenu.length > 0) {
              item.subMenu = filteredSubMenu;
              return true; // Ana menü öğesi görünmeli
            }
            return false;
          }
          // Eğer alt menü yoksa, ana menü öğesini kontrol et
          return permissionsUser.includes(item.key);
        });

        console.log(permissionsUser + "yenisdsd");
        setData(filteredMenu);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Etiketlere göre veriyi grupla
  const groupedData = data.reduce((acc, item) => {
    const existingGroupIndex = acc.findIndex(
      (group) => group.label === item.label
    );
    if (existingGroupIndex !== -1) {
      // Grup zaten varsa alt menüyü ekleyin
      acc[existingGroupIndex].subMenu.push(item);
    } else {
      // Grup yoksa yeni bir grup oluşturun
      acc.push({ label: item.label, subMenu: [item] });
    }
    return acc;
  }, []);

  const { width, height, fontScale } = Dimensions.get("window");
  const route = useRoute();

  const [user, setUser] = useState({});
  const [İsLoggedIn, setisLoggedIn] = useState(true);

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  useEffect(() => {
    if (user.role == "Kurumsal Hesap") {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [user]);

  const logout = () => {
    setdialogVisible(false);
    SecureStore.setItemAsync("user", "");
    navigation.navigate("HomePage");
  };
  const logoutModal = () => {
    setdialogVisible(true);
  };
  const navigation = useNavigation();

  const [openAccor, setopenAccor] = useState(false);

  const [dialogVisible, setdialogVisible] = useState(false);
  const PhotoUrl = "https://test.emlaksepette.com/storage/profile_images/";

  //permissionslara atılan istek

  const [PermissionsKeyOfUser, setPermissionsKeyOfUser] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const keysArray = data.map((item) => item.key);
      setPermissionsKeyOfUser(keysArray);
    }
  }, [data]);
  // console.log(PermissionsKeyOfUser + 'dasdsd')

  // const commonKeys = permissionsUser && PermissionsKeyOfUser.length > 0
  // ? PermissionsKeyOfUser.filter(key => permissionsUser.includes(key))
  // : [];

  // // Filtrelenmiş key değerlerine göre menü öğelerini seçin
  // const filteredMenuData = groupedData.filter(item =>
  //   (item.subMenu && item.subMenu.length > 0) || commonKeys.includes(item.key)
  // );

  // console.log(filteredMenuData.length + "sdsf")

  //permissionslara atılan istek

  // useEffect(() => {
  //   // Kullanıcının yetkilerine göre menü öğelerini filtreleme
  //   const filteredMenu = groupedData.filter(item => PermissionsKeyOfUser.includes(item.key));
  //   setMenuItems(filteredMenu);
  // }, [user]);
  // console.log(MenuItems,'fdfsdfsdf')

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
                        setopenAccor((prevState) => ({
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
                            iconName={item.icon}
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
                        />
                      </TouchableOpacity>
                    </View>
                  )
                )}
            </View>
          ))}
        </View>
        <View style={{ flex: 1 / 2 ,paddingBottom:50,alignItems:'center'}}>
          <TouchableOpacity
            onPress={()=>setdialogVisible(true)}
            style={{
              backgroundColor: "#EA2A28",
              padding: 10,
              borderRadius: 6,
              width:'80%'
            }}
          >
            <Text style={{ textAlign: "center", color: "#ffffff" ,fontWeight:'500'}}>
              Çıkış Yap
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
            animationType="slide"
            onBackdropPress={() => setdialogVisible(!dialogVisible)}
            visible={dialogVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setdialogVisible(!dialogVisible);
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
                      onPress={() => setdialogVisible(!dialogVisible)}
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
        {/* 
          <View>
            {İsLoggedIn ? (
              <>
                <View style={{ gap: 30 }}>
                  {user.corporateAccountStatus === 1 ? (
                    <>
                    {
                      user.has_club==1 &&
                      <View>
                      <Text style={style.headerText}>Koleksiyonlarım</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Collecitons")}
                      >
                        <ProfileSettingsItem
                          text={user.corporate_type=='Emlak Ofisi'? 'Portföylerim': "Koleksiyonlarım"}
                          ıconName="bookmark-border"
                        />
                      </TouchableOpacity>
                    </View>
                    }
                      {
                      user.has_club==0 &&
                      <View>
                      <Text style={style.headerText}>Emlak Kulüp</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("RealtorClub")}
                      >
                        <ProfileSettingsItem text="Emlak Kulüp Başvurusu" />
                      </TouchableOpacity>
                    </View>
                    }
                         {
                      user.has_club==2 &&
                      <View>
                      <Text style={style.headerText}>Emlak Kulüp</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("RealtorClub")}
                      >
                        <ProfileSettingsItem text="Emlak Kulüp Başvurusu" />
                      </TouchableOpacity>
                    </View>
                    }
                      {
                      user.has_club==3 &&
                      <View>
                      <Text style={style.headerText}>Emlak Kulüp</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("RealtorClub")}
                      >
                        <ProfileSettingsItem text="Emlak Kulüp Başvurusu" />
                      </TouchableOpacity>
                    </View>
                    }
                    

                      <View>
                        <Text style={style.headerText}>İlanlarım</Text>
                        {
                          user.corporate_type== 'Emlak Ofisi'?
                            <></>:
                            <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("MyProject", {
                                header2: "Proje İlanları",
                              })
                            }
                          >
                            <ProfileSettingsItem
                              text="Proje İlanlarım"
                              IconType={true}
                              IconFeather="plus"
                            />
                          </TouchableOpacity>
                          
                        }
                      

                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("MyRealtor", {
                              header: "Emlak İlanları",
                              hidden: "none",
                            })
                          }
                        >
                          <ProfileSettingsItem
                            text="Emlak İlanlarım"
                            IconType={true}
                            IconFeather="plus"
                          />
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text style={style.headerText}>Komşumu Gör</Text>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("SeeNeigbour")}
                        >
                          <ProfileSettingsItem
                            text="Komşumu Gör"
                            IconType={true}
                            IconFeather="eye"
                          />
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text style={style.headerText}>Başvurular</Text>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ComeSwapScreen", {
                              color: true,
                            })
                          }
                        >
                          <ProfileSettingsItem
                            text="Takas Başvurularım"
                            ıconName="swap-horiz"
                            IconType={false}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("SwapScreen", {
                              color: true,
                            })
                          }
                        >
                          <ProfileSettingsItem
                            text="Gelen Takas Başvurularım"
                            ıconName="swap-horiz"
                            IconType={false}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Suggest", {
                              name: "Gelen Başvurular",
                              color: true,
                            })
                          }
                        >
                          <ProfileSettingsItem
                            text="Gelen Konut Başvuruları"
                            IconFeather="users"
                            IconType={true}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Suggest", {
                              name: "Başvurularım",
                              color: false,
                            })
                          }
                        >
                          <ProfileSettingsItem
                            text="Başvurularım"
                            IconFeather="users"
                            IconType={true}
                          />
                        </TouchableOpacity>
                      </View>

                      <View>
                        <Text style={style.headerText}>
                          Mağazam Emlak Sepette
                        </Text>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("DashBord")}
                        >
                          <ProfileSettingsItem
                            text="Gösterge Paneli"
                            ıconName="home-work"
                          />
                        </TouchableOpacity>

                        <Collapse
                          onToggle={() => {
                            setopenAccor(!openAccor);
                          }}
                        >
                          <CollapseHeader>
                            <View>
                              <ProfileSettingsItem
                                text="Alım Satım Geçmişim"
                                ıconName="shopping-bag"
                                arrowControl={openAccor}
                              />
                            </View>
                          </CollapseHeader>
                          <CollapseBody style={{ margin: 10, gap: 10 }}>
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                               
                                navigation.navigate("Sell", {
                                  displayInfo: "none",
                                });
                              }}
                            >
                              <ProfileSettingsItem
                                text="Aldıklarım"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                             
                                navigation.navigate("Sell", {
                                  text: "Satılmıştır",
                                });
                              }}
                            >
                              <ProfileSettingsItem
                                text="Sattıklarım"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                          </CollapseBody>
                        </Collapse>
                        <Collapse onToggle={() => setopenAccor2(!openAccor2)}>
                          <CollapseHeader>
                            <View>
                              <ProfileSettingsItem
                                text="Kiralama Geçmişim"
                                ıconName="shopping-bag"
                                arrowControl={openAccor2}
                              />
                            </View>
                          </CollapseHeader>
                          <CollapseBody style={{ margin: 10, gap: 10 }}>
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                          
                                navigation.navigate("Rent", {
                                  text: "Kiraya Verdiklerim",
                                  display: "none",
                                  name: "Kiraya Verdiklerim",
                                });
                              }}
                            >
                              <ProfileSettingsItem
                                text="Kiraya verdiklerim"
                                arrowNone={true}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                             
                                navigation.navigate("Rent", {
                                  text: "Kiraladıklarım",
                                  name: "Kiraladıklarım",
                                });
                              }}
                            >
                              <ProfileSettingsItem
                                text="Kiraladıklarım"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                          </CollapseBody>
                        </Collapse>

                        <Collapse onToggle={() => setopenAccor3(!openAccor3)}>
                          <CollapseHeader>
                            <View>
                              <ProfileSettingsItem
                                text="İlanda Kampanya Yap"
                                ıconName="local-offer"
                                arrowControl={openAccor3}
                              />
                            </View>
                          </CollapseHeader>
                          <CollapseBody style={{ margin: 10, gap: 10 }}>
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                               
                                navigation.navigate("Offer", {
                                  name: "Kampanya Oluştur",
                                });
                              }}
                            >
                              <ProfileSettingsItem
                                text="Kampanya Oluştur"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                            
                                navigation.navigate("OfferList", {
                                  name: "Kampanya Listele",
                                });
                              }}
                            >
                              <ProfileSettingsItem
                                text="Kampanyaları Listele"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                          </CollapseBody>
                        </Collapse>
                      </View>
                      <View>
                        <Text style={style.headerText}>Hesabım & Yardım</Text>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("UpdateProfile")}
                        >
                          <ProfileSettingsItem
                            text="Profili Güncelle"
                            ıconName="edit"
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => navigation.navigate("ChangePas")}
                        >
                          <ProfileSettingsItem
                            text="Şifreyi Değiştir"
                            ıconName="lock"
                          />
                        </TouchableOpacity>
                        <Collapse onToggle={() => setopenAccor4(!openAccor4)}>
                          <CollapseHeader>
                            <View>
                              <ProfileSettingsItem
                                text="Kullanıcı Tipi Oluştur"
                                ıconName="person-add-alt-1"
                                arrowControl={openAccor4}
                              />
                            </View>
                          </CollapseHeader>
                          <CollapseBody style={{ margin: 10, gap: 10 }}>
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                            
                                navigation.navigate("UserTypes");
                              }}
                            >
                              <ProfileSettingsItem
                                text="Listele"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                       
                                navigation.navigate("CreateUserType", {
                                  header: "yeni ekleden geldi",
                                  name: "Kullanıcı Ekle",
                                  hidden2: "none",
                                });
                              }}
                            >
                              <ProfileSettingsItem
                                text="Yeni Ekle"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                          </CollapseBody>
                        </Collapse>

                        <Collapse onToggle={() => setopenAccor5(!openAccor5)}>
                          <CollapseHeader>
                            <View>
                              <ProfileSettingsItem
                                text="Alt Kullanıcı Oluştur"
                                ıconName="person-add-alt-1"
                                arrowControl={openAccor5}
                              />
                            </View>
                          </CollapseHeader>
                          <CollapseBody style={{ margin: 10, gap: 10 }}>
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                            
                                navigation.navigate("UsersList", {
                               
                                });
                              }}
                            >
                              <ProfileSettingsItem
                                text="Listele"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                           
                                navigation.navigate("CreateUser", {
                                  header: "Yeni Ekleden geldi",
                                  name: "Kullanıcı Oluştur",
                                  hidden4: "none",
                                });
                              }}
                            >
                              <ProfileSettingsItem
                                text="Yeni Kullanıcı Ekle"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                          </CollapseBody>
                        </Collapse>
                        <Collapse onToggle={() => setopenAccor6(!openAccor6)}>
                          <CollapseHeader>
                            <View>
                              <ProfileSettingsItem
                                text="Reklam Görselleri"
                                ıconName="image"
                                arrowControl={openAccor6}
                              />
                            </View>
                          </CollapseHeader>
                          <CollapseBody style={{ margin: 10, gap: 10 }}>
                            <TouchableOpacity
                              style={{}}
                              onPress={() =>
                                navigation.navigate("AdsPictureList")
                              }
                            >
                              <ProfileSettingsItem
                                text="Listele"
                                arrowNone={true}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{}}
                              onPress={() =>
                                navigation.navigate("UploadAdsPicture")
                              }
                            >
                              <ProfileSettingsItem
                                text="Oluştur"
                                arrowNone={true}
                              />
                            </TouchableOpacity>
                          </CollapseBody>
                        </Collapse>
                      </View>
                    </>
                  ) : (
                    <Verification />
                  )}
                </View>
              </>
            ) : (
              <>
                <View style={{ gap: 30 }}>
                {
                      user.has_club==1 &&
                      <View>
                      <Text style={style.headerText}>Koleksiyonlarım</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Collecitons")}
                      >
                        <ProfileSettingsItem
                          text="Koleksiyonlarım"
                          ıconName="bookmark-border"
                        />
                      </TouchableOpacity>
                    </View>
                    }
                      {
                      user.has_club==0 &&
                      <View>
                      <Text style={style.headerText}>Emlak Kulüp</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("RealtorClub")}
                      >
                        <ProfileSettingsItem text="Emlak Kulüp Başvurusu" />
                      </TouchableOpacity>
                    </View>
                    }
                    {
                      user.has_club==2 &&
                      <View>
                      <Text style={style.headerText}>Emlak Kulüp</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("RealtorClub")}
                      >
                        <ProfileSettingsItem text="Emlak Kulüp Başvurusu" />
                      </TouchableOpacity>
                    </View>
                    }
                      {
                      user.has_club==3 &&
                      <View>
                      <Text style={style.headerText}>Emlak Kulüp</Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("RealtorClub")}
                      >
                        <ProfileSettingsItem text="Emlak Kulüp Başvurusu" />
                      </TouchableOpacity>
                    </View>
                    }
                  <View>
                    <Text style={style.headerText}>Komşumu Gör</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SeeNeigbour")}
                    >
                      <ProfileSettingsItem
                        text="Komşumu Gör"
                        IconType={true}
                        IconFeather="eye"
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={style.headerText}>Başvurular</Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SwapScreen", {
                          color: true,
                        })
                      }
                    >
                      <ProfileSettingsItem
                        text="Takas Başvurularım"
                        IconFeather="users"
                        IconType={true}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Suggest", {
                          name: "Başvurularım",
                          color: false,
                        })
                      }
                    >
                      <ProfileSettingsItem
                        text="Başvurularım"
                        IconFeather="users"
                        IconType={true}
                      />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text style={style.headerText}>Mağazam Emlak Sepette</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("DashBord")}
                    >
                      <ProfileSettingsItem
                        text="Gösterge Paneli"
                        ıconName="home-work"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Forms")}
                    >
                      <ProfileSettingsItem
                        text="Sat Kirala Formlarım"
                        ıconName="info-outline"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Sell", { displayInfo: "none" });
                      }}
                    >
                      <ProfileSettingsItem
                        text="Aldıklarım"
                        ıconName="shopping-bag"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setRentModalVisible(false);
                        navigation.navigate("Rent", {
                          text: "Kiraladıklarım",
                          name: "Kiraladıklarım",
                        });
                      }}
                    >
                      <ProfileSettingsItem
                        text="Kiraladıklarım"
                        ıconName="shopping-bag"
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={style.headerText}>Hesabım & Yardım</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("UpdateProfile")}
                    >
                      <ProfileSettingsItem
                        text="Profili Güncelle"
                        ıconName="edit"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate("ChangePas")}
                    >
                      <ProfileSettingsItem
                        text="Şifreyi Değiştir"
                        ıconName="lock"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
           
          </View>
        </View>

        <Shadow>
       
        </Shadow> */}
      </ScrollView>
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
    fontSize: 15,
    color: "#525B75",
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
