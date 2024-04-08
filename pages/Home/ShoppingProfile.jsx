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
import LogOut from "react-native-vector-icons/Entypo";
import Categories from "../../components/Categories";
import SettingsItem from "../../components/SettingsItem";
import BackIcon from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import ProfileSettingsItem from "../../components/ProfileSettingsItem";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../components/methods/user";
import * as SecureStore from 'expo-secure-store';
export default function ShoppingProfile() {
  const { width, height, fontScale } = Dimensions.get("window");
  const route = useRoute();

  const [user,setUser] = useState({});
  const [İsLoggedIn,setisLoggedIn] = useState(true);

  useEffect(() => {
    getValueFor("user",setUser);
  },[])

  useEffect(() => {
    if(user.role == "Kurumsal Hesap"){
      setisLoggedIn(true)
    }else{
      setisLoggedIn(false);
    }
  },[user])

  const logout = () => {
    SecureStore.setItemAsync("user","");
    navigation.navigate("HomePage")
  }

  const navigation = useNavigation();

  const translateY = useRef(new Animated.Value(400)).current;
  const translateY2 = useRef(new Animated.Value(400)).current;
  // const { isLoggedIn,setisLoggedIn } = route.params;
  // const [isLoggedIn, setisLoggedIn] = useState(false)
  const [display, setdisplay] = useState(false);

  const openSheet = () => {
    setdisplay(true);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    setdisplay(false);
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const [isSelected, setisSelected] = useState(false);

  const handlePres = (text) => {
    setisSelected(text);
    openSheet();
  };
  {
    /* Modal Visible States */
  }
  const [SellModalVisible, setSellModalVisible] = useState(false);
  const [RentModalVisible, setRentModalVisible] = useState(false);
  const [OfferModalVisible, setOfferModalVisible] = useState(false);
  const [UserTypeModalVisible, setUserTypeModalVisible] = useState(false);
  const [UserModalVisible, setUserModalVisible] = useState(false);
  const [AdsPictureVisible, setAdsPictureVisible] = useState(false);
  {
    /* Modal Visible States */
  }
  {
    /* Modal Functions*/
  }
  const toggleSellModal = () => {
    setSellModalVisible(!SellModalVisible);
  };
  const toggleRentModal = () => {
    setRentModalVisible(!RentModalVisible);
  };
  const toggleOfferModal = () => {
    setOfferModalVisible(!OfferModalVisible);
  };
  const toggleUserModal = () => {
    setUserModalVisible(!UserModalVisible);
  };
  const toggleUserTypeModal = () => {
    setUserTypeModalVisible(!UserModalVisible);
  };
  const toggleAdsPictureModal = () => {
    setAdsPictureVisible(!AdsPictureVisible);
  };
  {
    /* Modal Functions*/
  }
  return (
    <View style={style.container} onTouchStart={() => closeSheet()}>
      <View style={style.header}>
        <View style={style.opacity}></View>

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
                  source={require("./profil.jpg")}
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
                <Text style={{ color: "white", fontSize: 15 }}>{user.name}</Text>
              </View>

              <View style={{ width: 22, height: 22, left: 10 }}>
                <ImageBackground
                  source={require("./BadgeYellow.png")}
                  style={{ flex: 1 }}
                />

                <Icon
                  name="check"
                  style={{ position: "absolute", left: 3.5, top: 3 }}
                  size={15}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}>
        <View style={{ padding: 10 }}>
          <View>
            {İsLoggedIn ? (
              <>
                <View style={{ gap: 30 }}>
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

                  <View>
                    <Text style={style.headerText}>İlanlarım</Text>
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
                    <Text style={style.headerText}>Başvurular</Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Suggest", {
                          name: "Gelen Başvurular",
                          color: true,
                        })
                      }
                    >
                      <ProfileSettingsItem
                        text="Takas Başvuruları"
                        IconFeather="users"
                        IconType={true}
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
                        setSellModalVisible(true);
                        handlePres("MyBasket");
                      }}
                    >
                      <ProfileSettingsItem
                        text="Alım Satım Geçmişim"
                        ıconName="shopping-bag"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setRentModalVisible(true);
                        handlePres("MyBasket");
                      }}
                    >
                      <ProfileSettingsItem
                        text="Kiralama Geçmişim"
                        ıconName="shopping-bag"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setOfferModalVisible(true);
                        handlePres("Offer");
                      }}
                    >
                      <ProfileSettingsItem
                        text="İlanda Kampanya Yap"
                        ıconName="arrow-downward"
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
                    <TouchableOpacity
                      onPress={() => setUserTypeModalVisible(true)}
                    >
                      <ProfileSettingsItem
                        text="Kullanıcı Tipi Oluştur"
                        ıconName="person-add-alt-1"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setUserModalVisible(true);
                      }}
                    >
                      <ProfileSettingsItem
                        text="Alt Kullanıcı Oluştur"
                        ıconName="person-add-alt-1"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setAdsPictureVisible(true);
                      }}
                    >
                      <ProfileSettingsItem
                        text="Reklam Görselleri"
                        ıconName="image"
                      />
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", padding: 20 }}>
                      <TouchableOpacity style={style.btnLogOut}>
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: 15,
                          }}
                        >
                          Çıkış Yap
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View style={{ gap: 30 }}>
                  <View>
                    <Text style={style.headerText}>Emlak Kulüp</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("RealtorClub")}
                    >
                      <ProfileSettingsItem text="Emlak Kulüp Başvurusu" />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <Text style={style.headerText}>Başvurular</Text>
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
                        setSellModalVisible(true);
                        handlePres("MyBasket");
                      }}
                    >
                      <ProfileSettingsItem
                        text="Alış Geçmişim"
                        ıconName="shopping-bag"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setRentModalVisible(true)
                        handlePres("MyBasket");
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
                    <View style={{ alignItems: "center", paddingTop: 15 }}>
                      <TouchableOpacity style={style.btnLogOut} onPress={logout}>
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: 15,
                          }}
                        >
                          Çıkış Yap
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>

        <Modal
          isVisible={SellModalVisible}
          onBackdropPress={toggleSellModal}
          swipeDirection={["down"]}
          backdropColor="transparent"
          style={style.modal}
        >
          <View style={style.modalContent}>
            {
              İsLoggedIn?
              <>
                   <TouchableOpacity
              style={{}}
              onPress={() => {
                setSellModalVisible(false);
                navigation.navigate("Sell", { displayInfo: "none" });
              }}
            >
              <ProfileSettingsItem text="Aldıklarım" ıconName="shopping-bag" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setSellModalVisible(false);
                navigation.navigate("Sell", { text: "Satılmıştır" });
              }}
            >
              <ProfileSettingsItem text="Sattıklarım" ıconName="shopping-bag" />
            </TouchableOpacity>
              </> :
                    <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      setSellModalVisible(false);
                      navigation.navigate("Sell", { displayInfo: "none" });
                    }}
                  >
                    <ProfileSettingsItem text="Aldıklarım" ıconName="shopping-bag" />
                  </TouchableOpacity>
            }
       
          </View>
        </Modal>
        <Modal
          isVisible={RentModalVisible}
          onBackdropPress={toggleRentModal}
          swipeDirection={["down"]}
          backdropColor="transparent"
          style={style.modal}
        >
          <View style={style.modalContent}>
            {
              İsLoggedIn? 
              <>
                <TouchableOpacity
              style={{}}
              onPress={() => {
                setRentModalVisible(false);
                navigation.navigate("Rent", {
                  text: "Kiraya Verdiklerim",
                  display: "none",
                  name: "Kiraya Verdiklerim",
                });
              }}
            >
              <ProfileSettingsItem
                text="Kiraya verdiklerim"
                ıconName="shopping-bag"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{}}
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
              </> :
                <TouchableOpacity
                style={{}}
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
            }
          
          </View>
        </Modal>
        <Modal
          isVisible={OfferModalVisible}
          onBackdropPress={toggleOfferModal}
          swipeDirection={["down"]}
          backdropColor="transparent"
          style={style.modal}
        >
          <View style={style.modalContent}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setOfferModalVisible(false);
                navigation.navigate("Offer", { name: "Kampanya Oluştur" });
              }}
            >
              <ProfileSettingsItem
                text="Kampanya Oluştur"
                ıconName="local-offer"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setOfferModalVisible(false);
                navigation.navigate("OfferList", { name: "Kampanya Listele" });
              }}
            >
              <ProfileSettingsItem
                text="Kampanyaları Listele"
                ıconName="local-offer"
              />
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={UserTypeModalVisible}
          onBackdropPress={() => setUserTypeModalVisible(false)}
          swipeDirection={["down"]}
          backdropColor="transparent"
          style={style.modal}
        >
          <View style={style.modalContent}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setUserTypeModalVisible(false);
                navigation.navigate("CreateUserType", {
                  header: "Listeleden geldi",
                  hidden: "none",
                  name: "Kullanıcılar",
                });
              }}
            >
              <ProfileSettingsItem text="Listele" ıconName="person-add-alt-1" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setUserTypeModalVisible(false);
                navigation.navigate("CreateUserType", {
                  header: "yeni ekleden geldi",
                  name: "Kullanıcı Ekle",
                  hidden2: "none",
                });
              }}
            >
              <ProfileSettingsItem
                text="Yeni Ekle"
                ıconName="person-add-alt-1"
              />
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={UserModalVisible}
          onBackdropPress={toggleUserModal}
          swipeDirection={["down"]}
          backdropColor="transparent"
          style={style.modal}
        >
          <View style={style.modalContent}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setUserModalVisible(false);
                navigation.navigate("CreateUser", {
                  header: "Listeleden  geldi",
                  hidden3: "none",
                  name: "Kullanıcılar",
                  changeSlectedState: "false",
                });
              }}
            >
              <ProfileSettingsItem text="Listele" ıconName="person-add-alt-1" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setUserModalVisible(false);
                navigation.navigate("CreateUser", {
                  header: "Yeni Ekleden geldi",
                  name: "Kullanıcı Oluştur",
                  hidden4: "none",
                });
              }}
            >
              <ProfileSettingsItem
                text="Yeni Kullanıcı Ekle"
                ıconName="person-add-alt-1"
              />
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={AdsPictureVisible}
          onBackdropPress={toggleAdsPictureModal}
          swipeDirection={["down"]}
          backdropColor="transparent"
          style={style.modal}
        >
          <View style={style.modalContent}>
            <TouchableOpacity style={{}}>
              <ProfileSettingsItem text="Listele" />
            </TouchableOpacity>
            <TouchableOpacity style={{}}>
              <ProfileSettingsItem text="Oluştur" />
            </TouchableOpacity>
          </View>
        </Modal>
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
    backgroundColor: "blue",
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
    backgroundColor: "#EA2C2E",
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
});
{
  /* <View style={{ flex: 1, position: 'absolute', bottom: 0, width: '100%', display: display == false ? 'none' : 'flex' }}>

        <Animated.View
          style={[style.animatedView, { transform: [{ translateY }], }]}>

          <View style={{ width: '100%', }}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={{ width: 40, height: 7, backgroundColor: '#ebebeb', borderRadius: 10 }} onPress={closeSheet}>

              </TouchableOpacity>
            </View>
            <View style={{ paddingBottom: 10, }}>

              {
                isSelected == "userType" ?
                  <>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      onPress={() => navigation.navigate('CreateUserType', { header: 'Listeleden geldi', hidden: 'none', name: 'Kullanıcılar' })}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                        <Text style={{ textAlign: 'center', top: 2 }}>Listele</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      onPress={() => navigation.navigate('CreateUserType', { header: 'yeni ekleden geldi', name: 'Kullanıcı Ekle', hidden2: 'none' })}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Yeni Ekle</Text>

                      </View>
                    </TouchableOpacity></> : ''



              }
              {
                isSelected == "createUser" ?
                  <>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      onPress={() => navigation.navigate('CreateUser', { header: 'Listeleden  geldi', hidden3: 'none', name: 'Kullanıcılar', changeSlectedState: 'false' })}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Listele</Text>

                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      onPress={() => navigation.navigate('CreateUser', { header: 'Yeni Ekleden geldi', name: 'Kullanıcı Oluştur', hidden4: 'none', })}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, hidden4: 'none' }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Yeni Ekle</Text>

                      </View>
                    </TouchableOpacity>

                  </> : ''
              }




              {
                isSelected == "MyBasket" ?
                  <>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      onPress={() => navigation.navigate('Sell', { displayInfo: 'none' })}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Gayrimenkul Alış</Text>

                      </View>
                    </TouchableOpacity>
                    {İsLoggedIn ?
                      <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                        onPress={() => navigation.navigate('Sell', {text:'Satılmıştır'})}
                      >
                        <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, hidden4: 'none' }}>

                          <Text style={{ textAlign: 'center', top: 2, }}>Gayrimenkul Satış</Text>

                        </View>
                      </TouchableOpacity> : ''
                    }


                  </> : ''

              }

              {
                isSelected == "Rent" ?
                  <>

                    {
                      İsLoggedIn ?
                        <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                          onPress={() => navigation.navigate('Rent', { text: 'Kiraya Verdiklerim' ,display:'none',name:'Kiraya Verdiklerim'})}
                        >
                          <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                            <Text style={{ textAlign: 'center', top: 2, }}>Kiraya Verdiklerim</Text>

                          </View>
                        </TouchableOpacity> : ''
                    }

                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                      onPress={() => navigation.navigate('Rent', { text: 'Kiraladıklarım',name:'Kiraladıklarım' })}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, hidden4: 'none' }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Kiraladıklarım</Text>

                      </View>
                    </TouchableOpacity>

                  </> : ''
              }

              {
                isSelected == "Offer" ?
                  <>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                          onPress={()=>navigation.navigate('Offer',{name:'Kampanya Oluştur'})}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Oluştur</Text>

                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}
                          onPress={()=>navigation.navigate('OfferList',{name:'Kampanya Listele'})}
                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, hidden4: 'none' }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Listele</Text>

                      </View>
                    </TouchableOpacity>

                  </> : ''
              }
              {
                isSelected == "Ads" ?
                  <>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}

                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Oluştur</Text>

                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ebebeb', }}

                    >
                      <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'flex-start', padding: 3, hidden4: 'none' }}>

                        <Text style={{ textAlign: 'center', top: 2, }}>Listele</Text>

                      </View>
                    </TouchableOpacity>

                  </> : ''
              }


            </View>
          </View>


        </Animated.View>
            </View>*/
}
