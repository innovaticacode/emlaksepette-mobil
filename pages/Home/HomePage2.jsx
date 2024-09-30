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
  Dimensions,
  Platform,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import HomePage from "./HomePage";
import Navbar from "../../components/Navbar";
import SliderMenu from "../../components/SliderMenu";
import axios from "axios";
import { useState } from "react";
import DrawerMenu from "../../components/DrawerMenu";
import Search from "./Search";
import Header from "../../components/Header";
import Estates from "./Home Pages/Estates";
import Shop from "./Home Pages/Shop";
import Area from "./Home Pages/Area";
import Prefabrik from "./Home Pages/Prefabrik";
import BookHouse from "./Home Pages/BookHouse";
import SellAcil from "./Home Pages/SellAcil";
import Shared from "./Home Pages/Shared";
import Modal from "react-native-modal";
import Categories from "../../components/Categories";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FirstHome from "./FirstHome";

const { width, height } = Dimensions.get("window");

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = ({ route, index }) => {
  switch (route.key) {
    case "home":
      return <FirstHome index={index} />;
    case "first":
      return <HomePage index={index} />;
    case "second":
      return <Estates index={index} />;
    case "shop":
      return <Shop index={index} />;
    case "area":
      return <Area index={index} />;
    case "prefabrik":
      return <Prefabrik index={index} />;
    case "bookhouse":
      return <BookHouse index={index} />;
    case "sellacil":
      return <SellAcil index={index} />;
    case "shared":
      return <Shared index={index} />;
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
  const [menuItems, setMenuItems] = React.useState([]);
  const scrollViewRef = React.useRef(null); // ScrollView için ref
  const [tabWidth, setTabWidth] = React.useState(0);

  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/menu-list"
        );
        setMenuItems(response.data);
        setMenuItems([{ text: "Anasayfa" }, ...response.data.slice(0, -1)]);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

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
    <View style={{ padding: 5, flexDirection: "row", gap: 5 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
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
              key={index}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: tab == index ? "#EA2C2E" : "white",
                  borderWidth: tab == index ? 0 : 1,
                },
              ]}
              onPress={() => {
                indexChange(index);
              }}
              onLayout={onTabLayout}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: tab == index ? "white" : "#333",
                  fontSize: 12,
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
    { key: "home", title: "Home" },
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "shop", title: "Shop" },
    { key: "area", title: "Area" },
    { key: "prefabrik", title: "Prefabrik" },
    { key: "bookhouse", title: "Bookhouse" },
    { key: "sellacil", title: "Sellacil" },
    { key: "shared", title: "Shared" },
  ]);
  const indexChange = (index) => {
    setIndex(index);
    settab(index);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff", paddingTop: 30 }}
    >
      <Header onPress={toggleDrawer} index={setIndex} tab={settab} />

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
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <TextInput
          style={{ padding: 8, backgroundColor: "#ebebeb", borderRadius: 5 }}
          placeholder="Kelime veya İlan no ile ara..."
          onPress={() => {
            navigation.navigate("SearchPage");
          }}
        />
      </View>
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
    // borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
});
