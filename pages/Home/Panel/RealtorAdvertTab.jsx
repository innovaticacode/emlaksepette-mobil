import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import axios from "axios";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import GraphicForRealtor from "./RealtorAdvertTabPages/GraphicForRealtor";
import BalanceForRealtor from "./RealtorAdvertTabPages/BalanceForRealtor";
import PendingBalance from "./RealtorAdvertTabPages/PendingBalance";
import RejectBalance from "./RealtorAdvertTabPages/RejectBalance";
import { apiRequestGetWithBearer } from "../../../components/methods/apiRequest";
import { useEffect } from "react";




const CustomTabBar = ({
  navigationState,
  position,
  setIndex,
  tab,
  indexChange,
}) => {
  const menuItems = [
    {
      text: "Tüm İşlemler",
      color: "#EEEDEB",
      textColor: "#000000",
      Inactive: "#FFFFFF",
      InactiveTex: "#000000",
    },
    {
      text: "Ciro",
      color: "#BFFFC5",
      textColor: "#00D21A",
      Inactive: "#FFFFFF",
      InactiveTex: "#000000",
    },
    {
      text: "Bekleyen İşlemler",
      color: "#FFECB2",
      textColor: "#FF9908",
      Inactive: "#FFFFFF",
      InactiveTex: "#000000",
    },
    {
      text: "Reddedilen İşlemler",
      color: "#FBD5D5",
      textColor: "#EA2C2E",
      Inactive: "#FFFFFF",
      InactiveTex: "#000000",
    },
  ];

  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: "#F6F6F6" }}
      >
        <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: tab == index ? item.color : item.Inactive,

                  borderRadius: 8,
                },
              ]}
              onPress={() => {
                indexChange(index);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: tab == index ? item.textColor : item.InactiveTex,
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default function RealtorAdvertTab() {
 

  const renderScene = ({ route, index }) => {
  
    switch (route.key) {
      case "first":
        return <GraphicForRealtor index={index}  />;
      case "second":
        return <BalanceForRealtor index={index} />;
      case "shop":
        return <PendingBalance index={index} />;
      case "area":
        return <RejectBalance index={index} />;
      default:
        return null;
    }
  };
  const layout = useWindowDimensions();
  const [tab, settab] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "shop", title: "Shop" },
    { key: "area", title: "Area" },
  ]);
  const indexChange = (index) => {
    setIndex(index);
    settab(index);
   
  };

 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6F6" }}>

      <TabView
        navigationState={{ index, routes, }}
        renderScene={({ route, jumpTo }) =>
          renderScene({ route, jumpTo, index  })
        }
        onIndexChange={indexChange}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <CustomTabBar {...props} indexChange={indexChange} tab={tab} />
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  tabTitle: {
    color: "black",
  },
  activeTabTitle: {
    color: "blue",
  },
  tabBtn: {
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  text: {
    fontSize: 12,
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
});
