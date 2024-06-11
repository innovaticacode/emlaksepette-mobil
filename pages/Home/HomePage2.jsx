import * as React from 'react';
import { View, useWindowDimensions,Text, SafeAreaView ,StyleSheet,TouchableOpacity,ScrollView, ImageBackground} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import HomePage from './HomePage';
import Navbar from '../../components/Navbar';
import SliderMenu from '../../components/SliderMenu';
import axios from 'axios';
import { useState } from 'react';
import Estates from './Home Pages/Estates';
import Shop from './Home Pages/Shop';
import Area from './Home Pages/Area';
import Header from '../../components/Header';
import Modal from "react-native-modal";
import Search from './Search';
import Categories from '../../components/Categories';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from '@react-navigation/native';
const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = ({ route,index }) => {
    switch (route.key) {
      case 'first':
        return <HomePage index={index} />;
      case 'second':
        return <Estates index={index} />;
        case 'shop':
            return <Shop index={index} />;
            case 'area':
                return <Area  index={index}/>;
      default:
        return null;
    }
  };
  
  const CustomTabBar = ({ navigationState, position, setIndex,tab,indexChange }) => {
    const [menuItems, setMenuItems] = React.useState([]);

   React.useEffect(() => {
      const fetchMenuItems = async () => {
        try {
          const response = await axios.get(
            "https://mobil.emlaksepette.com/api/menu-list"
          );
          setMenuItems(response.data);
        } catch (error) {
          console.error("Error fetching menu items:", error);
        }
      };
  
      fetchMenuItems();
    }, []);
  
    return (
       <View>
    <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    
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
           indexChange(index)
          }}
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
  )};
export default function HomePage2() {
    const navigation=useNavigation()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };
  const layout = useWindowDimensions();
  const [tab, settab] = React.useState(0)
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'shop', title: 'Shop' },
    { key: 'area', title: 'Area' }
  ]);
const indexChange=(index)=>{
            setIndex(index)
            settab(index)
}

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#ffffff',paddingTop:30}}>
       <Header onPress={toggleDrawer} />
       
       <Modal
        isVisible={isDrawerOpen}
        onBackdropPress={() => setIsDrawerOpen(false)}
        animationIn="bounceInLeft"
        animationOut="bounceOutLeft"
        style={styles.modal}
        swipeDirection={['left']}
        onSwipeComplete={()=>setIsDrawerOpen(false)}
      >
    
        <View style={styles.modalContent}>
          <View
            style={{
              backgroundColor: "#EA2C2E",
              flex: 0.7 / 2,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <SafeAreaView style={{ zIndex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HomePage");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Ana Sayfa"
                    bordernone="none"
                    ıconName="home"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Hesabım");
                    setIsDrawerOpen(false);
                  }}
                >
                  <Categories
                    category="Hesabım"
                    bordernone="none"
                    ıconName="user"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Categories
                    category="Emlak Kulüp"
                    bordernone="none"
                    showImage={true}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Categories
                    category="İlan Ver"
                    bordernone="none"
                    ıconName="plus"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Categories
                    category="Sat Kirala"
                    bordernone="none"
                    ıconName="search-plus"
                  />
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
            <ImageBackground
              source={require("./MenuBg.jpg")}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                opacity: 0.2,
              }}
              resizeMode="cover"
              borderBottomLeftRadius={30}
              borderBottomRightRadius={30}
            />
          </View>
          <View style={{ backgroundColor: "white", flex: 1.3 / 2 }}>
            <Search onpres={toggleDrawer} />
          </View>
        </View>
      </Modal>
      <TabView
      navigationState={{ index, routes }}
      renderScene={({ route, jumpTo }) => renderScene({ route, jumpTo, index })}
      onIndexChange={indexChange}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <CustomTabBar {...props} indexChange={indexChange} tab={tab}/>}


    />
          </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row',
      paddingTop: 20,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
    },
    activeTabItem: {
      borderBottomWidth: 2,
      borderBottomColor: 'blue',
    },
    tabTitle: {
      color: 'black',
    },
    activeTabTitle: {
      color: 'blue',
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
  