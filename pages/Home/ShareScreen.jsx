import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Platform } from "react-native";

import { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../components/methods/user";

export default function ShareScreen() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigation = useNavigation();
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const [index, setindex] = useState(0);
  const [tab, settab] = useState(0);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          ...Platform.select({
            ios: {},
            android: {
              paddingTop: 25,
            },
          }),
        }}
      >
        {/* <Header onPress={toggleDrawer} index={setindex} tab={settab} /> */}
      </View>
      <Image
        source={require("../../src/assets/images/ilan_ekle_gorsel.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Opss, İlan Verme Özelliğimiz Şimdilik Web’de!
      </Text>
      <Text style={styles.description}>
        Emlak Sepette mobil uygulamamızda ilan verme özelliği henüz
        bulunmamaktadır. İlan vermek için lütfen web sitemizi ziyaret edin.
      </Text>

      {/* ************ Silme İlan ekleme özelliği geldiğinde kullanılabilir.********** */}
      {/* <Modal
        isVisible={isDrawerOpen}
        onBackdropPress={() => setIsDrawerOpen(false)}
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft"
        style={styles.modal}
        swipeDirection={["left"]}
        onSwipeComplete={() => setIsDrawerOpen(false)}
      >
        {/* <View>
          <DrawerMenu setIsDrawerOpen={setIsDrawerOpen} />
        </View>
      </Modal> */}
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: 10 }}
        nestedScrollEnabled={true}
      >
        <View
          style={{
            gap: 15,
            height: "100%",
            paddingBottom: 25,
            paddingTop: 5,
            alignItems: "center",
          }}
        >
          {user.role == "Kurumsal Hesap" &&
            user.corporate_type == "İnşaat Ofisi" && (
              <>
                <View style={styles.card}>
                  <View
                    style={{
                      width: "100%",
                      height: 13,
                      backgroundColor: "#EA2A28",
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}
                  />
                  <View style={{ alignItems: "center" }}>
                    <View style={{ width: 80, height: 80 }}></View>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontWeight: "400",
                        textAlign: "center",
                        fontSize: 12,
                      }}
                    >
                      Kendi proje ilanınızı ekleyin ve hayalinzdeki projenizi
                      paylaşın. Binlerce kişiye ulaşın
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      style={styles.addBtn}
                      onPress={() => {
                        navigation.navigate("CategorieChoose", {
                          name: "Proje İLanı",
                          previousName: "Proje İlanı",
                        });
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        Proje İlanı Ekle
                      </Text>
                      <Icon name="pluscircle" color={"white"} size={15} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.card}>
                  <View
                    style={{
                      width: "100%",
                      height: 13,
                      backgroundColor: "#274ABB",
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}
                  />
                  <View style={{ alignItems: "center" }}>
                    <View style={{ width: 80, height: 80 }}></View>
                  </View>
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        fontWeight: "400",
                        textAlign: "center",
                        fontSize: 12,
                      }}
                    >
                      Kendi emlak ilanınızı ekleyin ve ev, daire veya arsa
                      satışınızı hızlandırın. Hemen ilan verin!
                    </Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                      style={[styles.addBtn, { backgroundColor: "#274ABB" }]}
                      onPress={() => {
                        navigation.navigate("Emlak", {
                          name: "İlan Ver",
                        });
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontWeight: "600",
                        }}
                      >
                        Emlak İlanı Ekle
                      </Text>
                      <Icon name="pluscircle" color={"white"} size={15} />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

          {user.role == "Kurumsal Hesap" &&
          user.corporate_type != "İnşaat Ofisi" ? (
            <View style={styles.card}>
              <View
                style={{
                  width: "100%",
                  height: 13,
                  backgroundColor: "#274ABB",
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}
              />
              <View style={{ alignItems: "center" }}>
                <View style={{ width: 80, height: 80 }}></View>
              </View>
              <View style={{ padding: 10 }}>
                <Text
                  style={{
                    fontWeight: "400",
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  Kendi emlak ilanınızı ekleyin ve ev, daire veya arsa
                  satışınızı hızlandırın. Hemen ilan verin!
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={[styles.addBtn, { backgroundColor: "#274ABB" }]}
                  onPress={() => {
                    navigation.navigate("Emlak", {
                      name: "İlan Ver",
                    });
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "600",
                    }}
                  >
                    Emlak İlanı Ekle
                  </Text>
                  <Icon name="pluscircle" color={"white"} size={15} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            ""
          )}

          <View
            style={[
              styles.card,
              { display: user.role == "Bireysel Hesap" ? "flex" : "none" },
            ]}
          >
            <View
              style={{
                width: "100%",
                height: 13,
                backgroundColor: "#333333",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            />
            <View style={{ alignItems: "center" }}>
              <View style={{ width: 80, height: 80 }}></View>
            </View>
            <View style={{ padding: 10 }}>
              <Text
                style={{ fontWeight: "400", textAlign: "center", fontSize: 12 }}
              >
                Kendi emlak ilanınızı ekleyin ve ev, daire veya arsa satışınızı
                hızlandırın. Hemen ilan verin!
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[styles.addBtn, { backgroundColor: "#333333" }]}
                onPress={() => {
                  navigation.navigate("SellAndRent");
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  Sat Kirala
                </Text>
                <Icon name="pluscircle" color={"white"} size={15} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView> */}
      {/* <<<<<<<<<< Silme İlan ekleme özelliği geldiğinde kullanılabilir. >>>>>>>>>>>>>>*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "auto",
    height: 300,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0C0C0C",
    marginBottom: 8,
    textAlign: "center",
    paddingRight: 40,
    paddingLeft: 40,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    paddingRight: 40,
    paddingLeft: 40,
    marginTop: 10,
  },
});

// const styles = StyleSheet.create({
//   toggleButton: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   toggleButton: {
//     fontSize: 20,
//     marginBottom: 20,
//   },

//   modal: {
//     margin: 0,
//   },
//   card: {
//     backgroundColor: "#FFFFFF",
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     gap: 8,
//     width: "90%",

//     height: 210,
//     borderWidth: 0.7,
//     borderColor: "#e6e6e6",
//     ...Platform.select({
//       ios: {
//         shadowColor: " #e6e6e6",
//         shadowOffset: { width: 1, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
//   addBtn: {
//     backgroundColor: "#EA2A28",
//     padding: 8,
//     width: "60%",
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 10,
//   },
// });
