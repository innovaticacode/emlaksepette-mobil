import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { TabView } from "react-native-tab-view";
import HomePage from "./HomePage";
import axios from "axios";
import Estates from "./Home Pages/Estates";
import Shop from "./Home Pages/Shop";
import Area from "./Home Pages/Area";
import Prefabrik from "./Home Pages/Prefabrik";
import BookHouse from "./Home Pages/BookHouse";
import { useNavigation } from "@react-navigation/native";
import FirstHome from "./FirstHome";
import Shared from "./Home Pages/Shared";
import SellAcil from "./Home Pages/SellAcil";
import { apiUrl } from "../../components/methods/apiRequest";

const renderScene = ({ route, index }) => {
  const scenes = {
    home: <FirstHome index={index} />,
    first: <HomePage index={index} />,
    second: <Estates index={index} />,
    shop: <Shop index={index} />,
    area: <Area index={index} />,
    prefabrik: <Prefabrik index={index} />,
    bookhouse: <BookHouse index={index} />,
    // sellacil: <SellAcil index={index} />,
    // shared: <Shared index={index} />,
  };

  return scenes[route.key] || null;
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
        const response = await axios.get(apiUrl + "menu-list");
        setMenuItems([{ text: "Anasayfa" }, ...response.data.slice(0, -1)]);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  const onTabLayout = (event) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    setTabWidth(measuredWidth);
  };

  const renderItem = React.useCallback(
    ({ item, index }) => (
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
    ),
    [tab, indexChange, onTabLayout]
  );

  return (
    <View style={{ padding: 5, flexDirection: "row", gap: 5 }}>
      {/* <ScrollView
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
      > */}
      <View style={{ padding: 10 }}>
        <FlatList
          data={menuItems}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          windowSize={3}
          maxToRenderPerBatch={5}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default function HomePage2() {
  const navigation = useNavigation();
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

  const indexChange = React.useCallback((index) => {
    setIndex(index);
    settab(index);
  }, []);

  return (
    <SafeAreaView style={styles.searchMainArea}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.search}
          placeholder="Kelime veya İlan no ile ara..."
          onPress={() => {
            navigation.navigate("SearchPage");
          }}
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene} // Sadece renderScene fonksiyonunu kullanın
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
  searchMainArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 10,
  },
  searchArea: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  search: {
    padding: 8,
    backgroundColor: "#ebebeb",
    borderRadius: 5,
  },
});
