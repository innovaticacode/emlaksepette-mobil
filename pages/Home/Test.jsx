import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import Favorite from "../../components/Favorite";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import Categories from "../../components/Categories";
import Search from "./Search";
import { useNavigation } from "@react-navigation/native";
import Favorites from "./Favorites";
import CollectionsPage from "./CollectionsPage";
import { getValueFor } from "../../components/methods/user";
import { ActivityIndicator } from "react-native";
import { Platform } from "react-native";
import DrawerMenu from "../../components/DrawerMenu";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
export default function Test() {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tabs, setTabs] = useState(1);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  //APİ İSTEĞİ BU SAYFAYA ATILACAK VE DİĞER SAYFALARA PROPS OLARAK GEÇİLECEK

  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const [index, setindex] = useState(0);
  const [tab, settab] = useState(0);
  return (
    <AlertNotificationRoot>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
          <Header onPress={toggleDrawer} index={setindex} tab={settab} />
        </View>

        <Modal
          isVisible={isDrawerOpen}
          onBackdropPress={() => setIsDrawerOpen(false)}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          style={styles.modal}
          swipeDirection={["left"]}
          onSwipeComplete={() => setIsDrawerOpen(false)}
        >
          <View style={styles.modalContent}>
         
              <DrawerMenu setIsDrawerOpen={setIsDrawerOpen} />
          
         
          </View>
        </Modal>
        {user.access_token ? (
          <>
            <View style={styles.TabBar}>
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#ebebeb",
                }}
              >
                <TouchableOpacity
                  onPress={() => setTabs(1)}
                  style={[
                    styles.tabBarBtn,
                    {
                      backgroundColor: tabs == 1 ? "#E54242" : "white",
                    },
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color:
                        tabs == 1
                          ? "white"
                          : "white" && tabs == 2
                          ? "#333"
                          : "white",
                    }}
                  >
                    Favoriler
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTabs(2)}
                  style={[
                    styles.tabBarBtn,
                    {
                      backgroundColor: tabs == 2 ? "#E54242" : "white",
                    },
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color:
                        tabs == 2
                          ? "white"
                          : "white" && tabs == 1
                          ? "#333"
                          : "white",
                    }}
                  >
                    {
                      user.corporate_type=='Emlak Ofisi'?
                      'Pörtföylerim':
                      'Koleksiyonlarım'
                    }
                
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {tabs == 1 && <Favorites />}
            {tabs == 2 && <CollectionsPage />}
          </>
        ) : (
          <></>
        )}
      </SafeAreaView>
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },

  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
  TabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabBarBtn: {
    width: "50%",

    padding: 7,
    borderRadius: 5,
  },
});
