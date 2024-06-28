// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
// import {useState} from 'react'
// import ActiveAdverts from './ProjectAdveretsPages/ActiveAdverts'
// import WaitAdverts from './ProjectAdveretsPages/WaitAdverts'
// import RejectAdverts from './ProjectAdveretsPages/RejectAdverts'
// import PasiveAdverts from './ProjectAdveretsPages/PasiveAdverts'
// import { useRoute, useNavigation } from '@react-navigation/native';
// import ActiveRealtorAdverts from './ActiveRealtorAdverts'
// import WaitRealtorAdverts from './WaitRealtorAdverts'
// import RejectRealtorAdverts from './RejectRealtorAdverts'
// import PasiveRealtorAdverts from './PasiveRealtorAdverts'
// import { Platform } from "react-native";
// export default function MyRealtorAdverts() {
//   const [Tabs, setTabs] = useState(0)
//   const route = useRoute();

//   return (
//     <View style={styles.container}>
//       <View style={styles.tabBar}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <View style={{display:'flex',flexDirection:'row',gap:20}}>
//             <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==0? 'red':'#ebebeb'}]}
//               onPress={()=>setTabs(0)}
//             >
//               <Text style={[styles.tabBarText,{color:Tabs===0? 'white':'red',fontWeight:Tabs===0?'600':'normal'}]}>Aktif İlanlar</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==1? 'red':'#ebebeb'}]}
//             onPress={()=>setTabs(1)}
//             >
//               <Text style={[styles.tabBarText,{color:Tabs===1? 'white':'red',fontWeight:Tabs===1?'600':'normal'}]}>Onay Bekleyen İlanlar</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==2? 'red':'#ebebeb'}]}
//               onPress={()=>setTabs(2)}
//             >
//               <Text style={[styles.tabBarText,{color:Tabs===2? 'white':'red',fontWeight:Tabs===2?'600':'normal'}]}>Reddedilen İlanlar</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==3? 'red':'#ebebeb'}]}
//               onPress={()=>setTabs(3)}
//             >
//               <Text style={[styles.tabBarText,{color:Tabs===3? 'white':'red',fontWeight:Tabs===3?'600':'normal'}]}>Pasif İlanlar</Text>
//             </TouchableOpacity>
//             </View>
//         </ScrollView>
//       </View>
//       {Tabs==0 && <ActiveRealtorAdverts/>}
//       {Tabs==1 && <WaitRealtorAdverts/>}
//       {Tabs==2 && <RejectRealtorAdverts/>}
//       {Tabs==3 && <PasiveRealtorAdverts/>}

//     </View>
//   )
// }
// const styles=StyleSheet.create({
//     container:{
//       flex:1,
//       backgroundColor:'white'
//     },
//     tabBar:{
//       padding:10,
//       borderBottomWidth:1,
//       alignItems: "center",
//       justifyContent: "center",
    
//       backgroundColor: '#FFFF',  
//       borderColor:'#e6e6e6',
//       ...Platform.select({
//           ios: {
//             shadowColor: ' #e6e6e6',
//             shadowOffset: { width: 1, height: 1 },
//             shadowOpacity: 0.1,
//             shadowRadius: 5,
//           },
//           android: {
//             elevation: 5,
//           },
//         }),
//     },
//     TabBarBtn:{
//       backgroundColor:'red',
//       padding:10,
//       borderRadius:4,
      
//     },
//     tabBarText:{
//       color:'white',
//       fontWeight:'500'
//     }
// })

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
import { useNavigation } from "@react-navigation/native";

 import ActiveRealtorAdverts from './ActiveRealtorAdverts'
 import WaitRealtorAdverts from './WaitRealtorAdverts'
 import RejectRealtorAdverts from './RejectRealtorAdverts'
 import PasiveRealtorAdverts from './PasiveRealtorAdverts'
const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

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
      text : "Onaylanan"
  },
  {
    text : "Onay Bekleyen İlanlar"
  
  
},
{
  text : "Reddeilen İlanlar"
},
{
  text : "Pasif İlanlar"
}
   
]
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
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
export default function HomePage2() {
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const layout = useWindowDimensions();
  const [tab, settab] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "shop", title: "Shop" },
    { key: "area", title: "Area" }
  
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
