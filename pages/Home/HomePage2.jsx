import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import { TabView } from "react-native-tab-view";
import axios from "axios";
import Modal from "react-native-modal";
import Header from "../../components/Header";
import DrawerMenu from "../../components/DrawerMenu";
import Search from "./Search";
import HomePage from "../Home/HomePage"
import CommonPage from "./Home Pages/CommonPage";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CustomTabBar = ({
  navigationState,
  position,
  indexChange,
  tab,
}) => {
  const [menuItems, setMenuItems] = React.useState([]);
  const scrollViewRef = React.useRef(null);
  const [tabWidth, setTabWidth] = React.useState(0);

  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("https://private.emlaksepette.com/api/menu-list");
        setMenuItems(response.data);
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

  const onTabLayout = (event) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    setTabWidth(measuredWidth);
  };

  return (
    <View style={{ padding: 5, flexDirection: "row", gap: 5 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onLayout={() => {
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
                  backgroundColor: tab === index ? "#EA2C2E" : "white",
                  borderWidth: tab === index ? 0 : 1,
                },
              ]}
              onPress={() => indexChange(index)}
              onLayout={onTabLayout}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: tab === index ? "white" : "#333",
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
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([]);

  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("https://private.emlaksepette.com/api/menu-list");
        const menuItems = response.data;
        setRoutes(menuItems.map((item) => ({ key: item.key, title: item.text })));
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const indexChange = (index) => {
    setIndex(index);
    setTab(index);
  };

  const renderScene = ({ route }) => {
    return route.title === "Projeler" ? (
      <HomePage />
    ) : (
      <CommonPage text={route.title} />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff", paddingTop: 30 }}>
      <Header onPress={() => setIsDrawerOpen(!isDrawerOpen)} index={setIndex} tab={setTab} />

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
          <View
            style={{
              backgroundColor: "#EA2C2E",
              height: Platform.OS === "android" ? height * 0.32 : height * 0.32,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <DrawerMenu setIsDrawerOpen={setIsDrawerOpen} />
          </View>
          <View style={{ flex: 1.3 / 1 }}>
            <Search onpres={() => setIsDrawerOpen(false)} />
          </View>
        </View>
      </Modal>

      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <TextInput
          style={{ padding: 8, backgroundColor: "#ebebeb", borderRadius: 5 }}
          placeholder="Kelime veya İlan no ile ara.."
          onPress={() => navigation.navigate("SearchPage")}
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={indexChange}
        initialLayout={{ width: Dimensions.get("window").width }}
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
  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320
  }
});
