import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  PanResponder,
  Button,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import Search from "./Search";
import Categories from "../../components/Categories";
import ProjectPost from "../../components/ProjectPost";
import * as Animatable from "react-native-animatable";
export default function AllProjects() {
  const apiUrl = "https://emlaksepette.com/";
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
    if (scrollPosition > 15) {
      setIsHidden(true);
  
    } else {
      setIsHidden(false);
    
    }
  };
  const [modalVisible, setModalVisible] = useState(false);


        const InputLabel=[
            {label:'Fiyat',placeholder:'Fiyat giriniz'}
        ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Header onPress={toggleDrawer} />

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
            padding: isHidden ? 5 : 10,
            borderBottomWidth: 1,
            borderColor: "#ebebeb",
          }}
        >
          <View style={{ padding: 0 }}>
            <Animatable.View animation={isHidden ? "zoomInUp" : "fadeInUp"}>
              <Text
                style={[
                  styles.headerText,
                  {
                    fontSize: isHidden ? 15 : 23,
                    textAlign: isHidden ? "center" : "left",
                  },
                ]}
              >
                Tüm Projeler
              </Text>
            </Animatable.View>
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

        <ScrollView
     
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
            
          <View>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <View
                  style={{ paddingLeft: 10, paddingRight: 10, width: "100%" }}
                >
                  <ProjectPost
                    key={item.id}
                    caption={item.project_title}
                    ımage={`${apiUrl}/${item.image.replace(
                      "public/",
                      "storage/"
                    )}`}
                    location={item.city.title}
                    city={item.county.ilce_title}
                    ProjectNo={item.id}
                    slug={item.slug}
                    acıklama={item.description
                      .replace(/<\/?[^>]+(>|$)/g, "")
                      .replace(/&nbsp;/g, " ")}
                    ShoppingName={item.user.name}
                    ShoppingMail={item.user.email}
                    Phone={item.user.phone}
                    ProfilImage={`${apiUrl}/storage/profile_images/${item.user.profile_image}`}
                    ShopingInfo={item.user.corporate_type}
                  />
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
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
           
                       
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.btnFilter}>
                    <Text style={{color:'white'}}>
                    <Text>Sonuçları Gör</Text>
                    <Text> (100)</Text>
                    </Text>
                  
                </TouchableOpacity>
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
  btnFilter:{
    width:'80%',
        backgroundColor: "#264ABB",
        padding: 9,
        alignItems:'center',
        borderRadius:5
  }
});
