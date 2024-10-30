

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
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import axios from "axios";
import { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";

 import ActiveRealtorAdverts from './ActiveRealtorAdverts'
 import WaitRealtorAdverts from './WaitRealtorAdverts'
 import RejectRealtorAdverts from './RejectRealtorAdverts'
 import PasiveRealtorAdverts from './PasiveRealtorAdverts'
import SelledRealtorAdverts from "./SelledRealtorAdverts";
import { useEffect } from "react";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const renderScene = ({ route, index }) => {
  switch (route.key) {
    case "first":
      return <ActiveRealtorAdverts index={index} />;
    case "second":
      return <WaitRealtorAdverts index={index} />;
    case "shop":
      return <RejectRealtorAdverts index={index} />;
    case "area":
      return <PasiveRealtorAdverts index={index} />;
   ;
   case "area2":
    return <SelledRealtorAdverts index={index} />;
 ;
    default:
      return null;
  }
};

const CustomTabBar = ({
  navigationState,
  position,
  setIndex,
  tab,
  indexChange,
}) => {
  // const [menuItems, setMenuItems] = React.useState([]);

const menuItems=[
  {
      text : "Aktif İlanlar"
  },
  {
    text : "Onay Bekleyen İlanlar"
  
  
},
{
  text : "Reddedilen İlanlar"
},
{
  text : "Pasif İlanlar"
},
{
  text : "Satılan İlanlar"
}
   
]
const scrollViewRef = React.useRef(null); // ScrollView için ref
const [tabWidth, setTabWidth] = React.useState(0);
React.useEffect(() => {
  if (scrollViewRef.current && tabWidth > 0) {
    const tabCount = menuItems.length;
    const viewWidth = width;
    const tabOffset = tab * tabWidth;
    const contentWidth = tabWidth * tabCount;
    const centeredOffset = Math.max(
      0,
      Math.min(
        tabOffset - (viewWidth / 2 - tabWidth / 2),
        contentWidth - viewWidth
      )
    );

    scrollViewRef.current.scrollTo({
      x: centeredOffset,
      animated: true,
    });
  }
}, [tab, menuItems, tabWidth]);

// Calculate the width of each tab after layout
const onTabLayout = (event) => {
  const { width: measuredWidth } = event.nativeEvent.layout;
  setTabWidth(measuredWidth);
};
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 
         ref={scrollViewRef} // Ref ekleniyor
         onLayout={() => {
           // Calculate the width of each tab dynamically
           if (menuItems.length > 0) {
             const tabWidth = width / menuItems.length;
             setTabWidth(tabWidth);
           }
         }}
      >
        <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
            onLayout={onTabLayout}
              key={index}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: tab == index ? "#EEEDEB" : "white",
                  borderWidth: tab == index ? 0 : 1,
                },
              ]}
              onPress={() => {
                indexChange(index);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: tab == index ? "#333" : "#333",
                  fontSize: 12,
                  fontWeight:'600'
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
export default function MyRealtorAdverts() {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const route =useRoute()
  const [tab, settab] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
      settab(route?.params?.tab ?route?.params?.tab :tab)
      setIndex(route?.params?.tab ?route?.params?.tab :tab)
  }, [])
  
  const layout = useWindowDimensions();

  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "shop", title: "Shop" },
    { key: "area", title: "Area" },
    { key: "area2", title: "Area2" }
  
  ]);
  const indexChange = (index) => {
    setIndex(index);
    settab(index);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff", paddingTop: 30 }}
    >
    
      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route, jumpTo }) =>
          renderScene({ route, jumpTo, index })
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
    borderRadius: 8,
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
 