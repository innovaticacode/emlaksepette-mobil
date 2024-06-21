import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  PanResponder,
  Button,
  TextInput,
} from "react-native";
import React, { useState, useRef,useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import Search from "./Search";
import { Platform } from "react-native";
import Categories from "../../components/Categories";
import ProjectPost from "../../components/ProjectPost";
import * as Animatable from "react-native-animatable";
import RealtorPost from "../../components/RealtorPost";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
export default function AllRealtorAdverts() {
  const apiUrl = "https://mobil.emlaksepette.com/";
  const route = useRoute();
  const { name, data } = route.params;
  const navigation = useNavigation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [isHidden, setIsHidden] = useState(false);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    // Sayfanın 200px aşağısına inildiğinde gizlenmesi gerekiyor
    if (scrollPosition > 25) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  };
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalForAddToCart, setModalForAddToCart] = useState(false);
  const [selectedCartItem, setselectedCartItem] = useState(0);
  const GetIdForCart = (id) => {
    setselectedCartItem(id);
    setModalForAddToCart(true);
    
  };
  
  const addToCard = async () => {
    const formData = new FormData();
    formData.append("id", selectedCartItem);
    formData.append("isShare", null);
    formData.append("numbershare", null);
    formData.append("qt", 1);
    formData.append("type", "housing");
    formData.append("project", null);
    formData.append("clear_cart", "no");

    try {
      if (user?.access_token) {
        const response = await axios.post(
          "https://mobil.emlaksepette.com/api/institutional/add_to_cart",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        setModalForAddToCart(false);
        navigation.navigate("Sepetim");
      }
    } catch (error) {
      console.error("post isteği olmadı", error);
    }
  };

  
  const [loadingPrjoects, setloadingPrjoects] = useState(false);
  const [loadingEstates, setloadingEstates] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  
  const [featuredEstates, setFeaturedEstates] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const fetchFeaturedEstates = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://mobil.emlaksepette.com/api/real-estates?page=${reset ? 1 : page}&limit=12`
      );
      const newEstates = response.data;

      if (reset) {
        setFeaturedEstates(newEstates);
        setPage(2);
        setHasMore(true);
      } else {
        if (newEstates.length > 0) {
          setFeaturedEstates(prevEstates => {
            const newUniqueEstates = newEstates.filter(
              estate => !prevEstates.some(prevEstate => prevEstate.id === estate.id)
            );
            return [...prevEstates, ...newUniqueEstates];
          });
          setPage(prevPage => prevPage + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchFeaturedEstates();
  }, []);
 

  // Sayfa yenileme fonksiyonu
  const onRefresh = () => {
    setRefreshing(true);
    fetchFeaturedEstates();
  };
  const [index, setindex] = useState(0)
  const [tab, settab] = useState(0)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Header onPress={toggleDrawer} index={setindex} tab={settab} />

        <Modal
          swipeDirection="left"
          onSwipeComplete={() => setModalVisible(false)}
          onSwipeThreshold={(gestureState) => {
            return {
              horizontal: gestureState.ly > Dimensions.get("window").width / 10,
            };
          }}
          isVisible={isDrawerOpen}
          onBackdropPress={() => setIsDrawerOpen(false)}
          animationIn="bounceInLeft"
          animationOut="bounceOutLeft"
          style={styles.modal}
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
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("RealtorClubExplore");
                      setIsDrawerOpen(false);
                    }}
                  >
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

        <View
          style={{
            padding: 10,
          }}
        >
          <View style={{ padding: 0 }}>
            <Text
              style={[
                styles.headerText,
                {
                  fontSize: 15,
                  textAlign: "center",
                },
              ]}
            >
              Tüm Konut İlanları
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: "white", fontSize: 13, fontWeight: "600" }}>
              Filtrele
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={{ color: "white", fontSize: 13, fontWeight: "600" }}>
              Sırala
            </Text>
          </TouchableOpacity>
        </View>
        {refreshing && (
        <View style={{ padding: 10, backgroundColor: 'white', alignItems: 'center' }}>
          <ActivityIndicator animating={true} size="small" color="#000000" />
        </View>
      )}
            <FlatList
        data={featuredEstates}
     
        renderItem={({ item }) => (
          <RealtorPost
          GetId={GetIdForCart}
        
          HouseId={item.id}
          price={`${
            JSON.parse(item.housing_type_data)["price"]
          } `}
          housing={item}
          title={item.housing_title}
          loading={loadingEstates}
          location={item.city_title + " / " + item.county_title}
          image={`${apiUrl}/housing_images/${
            JSON.parse(item.housing_type_data).image
          }`}
          column1_name={`${
            JSON.parse(item.housing_type_data)[item.column1_name]
          } `}
          column1_additional={item.column1_additional}
          column2_name={`${
            JSON.parse(item.housing_type_data)[item.column2_name]
          } `}
          column2_additional={item.column2_additional}
          column3_name={`${
            JSON.parse(item.housing_type_data)[item.column3_name]
          } `}
          column3_additional={item.column3_additional}
          column4_name={`${
            JSON.parse(item.housing_type_data)[item.column4_name]
          } `}
          column4_additional={item.column4_additional}
          bookmarkStatus={true}
          dailyRent={false}

        />

        )}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        onEndReached={() => fetchFeaturedEstates(false)}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListFooterComponent={loading && !refreshing ? <ActivityIndicator  style={{margin:20}}size="small" color="#000000" /> : null}
    
       
      />
     
    
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropColor="transparent"
        style={styles.modal2}
      >
        <View style={styles.modalContent2}>
          {/* <FlatList
                  data={InputLabel}
                  renderItem={({item})=>(
                      <View>
                      <Text>{item.label}</Text>
                  <TextInput style={{padding:10,backgroundColor:'#ebebeb',borderWidth:1}} placeholder={item.placeholder}/>
                  </View>
                  )}
              /> */}

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.btnFilter}>
              <Text style={{ color: "white" }}>
                <Text>Sonuçları Gör</Text>
                <Text> (100)</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
          isVisible={ModalForAddToCart}
          onBackdropPress={() => setModalForAddToCart(false)}
          animationType="fade" // veya "fade", "none" gibi
          transparent={true}
          style={styles.modal4}
        >
          <View style={styles.modalContent4}>
            <View style={{ padding: 10, gap: 10 }}>
              <Text style={{ textAlign: "center" }}>
                #1000{selectedCartItem} No'lu Konutu Sepete Eklemek İsteiğinize
                Eminmisiniz?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    addToCard();
                  }}
                >
                  <Text style={{ color: "white" }}>Sepete Ekle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#e44242",
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    setModalForAddToCart(false);
                  }}
                >
                  <Text style={{ color: "white" }}>Vazgeç</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 0,
    ...Platform.select({
      ios: {},
      android: {
        top: 15,
      },
    }),
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

  headerText: {
    color: "#333",
    fontSize: 20,
  },
  btn: {
    flex: 0.9 / 2,
    backgroundColor: "#264ABB",
    padding: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    backgroundColor: "#f4f4f4",
    padding: 20,
    height: "75%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  btnFilter: {
    width: "80%",
    backgroundColor: "#264ABB",
    padding: 9,
    alignItems: "center",
    borderRadius: 5,
  },
  modal4: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 5,
  },
});
