import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Button,
  Platform,
  Linking,
} from "react-native";

import { React, useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Caption from "../../components/Caption";
import Settings from "../../components/Settings";
import PagerView from "react-native-pager-view";
import Map from "../../components/Map";
import Icon2 from "react-native-vector-icons/Feather";
import DetailsPicture from "../../components/DetailsPicture";
import ShoppinInfo from "../../components/ShoppinInfo";
import * as Clipboard from "expo-clipboard";

import OtherHomeInProject from "../../components/OtherHomeInProject";
import PaymentDetail from "../../components/PaymentDetail";
import Alert from "../../components/Alert";
import FloorPlan from "../../components/FloorPlan";
import Information from "../../components/Information";
import LinkIcon3 from "react-native-vector-icons/Feather";
import LinkIcon4 from "react-native-vector-icons/Fontisto";
import LinkIcon2 from "react-native-vector-icons/FontAwesome";
import LinkIcon from "react-native-vector-icons/Entypo";
import { useRoute } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Arrow from "react-native-vector-icons/MaterialIcons";
import Bookmark from "react-native-vector-icons/FontAwesome";
import SettingsItem from "../../components/SettingsItem";
import Header from "../../components/Header";
import Modal from "react-native-modal";
import Categories from "../../components/Categories";
import Search from "./Search";
import SliderMenuDetails from "../../components/SliderMenuDetails";
import { apiRequestGet } from "../../components/methods/apiRequest";
export default function Details({ navigation }) {
  const apiUrl = "https://emlaksepette.com/";
  const [ColectionSheet, setColectionSheet] = useState(false)
  const [IsOpenSheet, setIsOpenSheet] = useState(false)
  const [showAlert, setshowAlert] = useState(false);
  const [tabs, setTabs] = useState(0);
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [modalVisible, setModalVisible] = useState(false);
  const [data,setData] = useState({
    project : {
      room_count : 0,
      roomInfo : []
    }
  });
  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  const route = useRoute();

  const {

    ProjectId,
  
  } = route.params;

  const translateY = useRef(new Animated.Value(400)).current;
  const openModal = () => {
    setModalVisible(!modalVisible);
  };


  useEffect(() => {
    apiRequestGet("project/"+ProjectId).then((res) => {
      setData(res.data);
    })
  },[])

  const shareLinkOnWhatsApp = () => {
    const url = `https://emlaksepette.com/proje/${slug}//1000${ProjectId}/detay`;

    const whatsappShareURL = `whatsapp://send?text=${encodeURIComponent(url)}`;

    Linking.openURL(whatsappShareURL)
      .then(() => console.log("WhatsApp açıldı ve link paylaşıldı"))
      .catch((error) => console.error("WhatsApp açılamadı:", error));
  };
  const shareLinkOnInstagram = (text) => {
    const url = `https://emlaksepette.com/proje/${slug}/100${ProjectId}/detay`;

    const instagramShareURL = `instagram://story/?text=${encodeURIComponent(
      url
    )}`;

    Linking.openURL(instagramShareURL)
      .then(() => console.log("Instagram açıldı ve link paylaşıldı"))
      .catch((error) => console.error("Instagram açılamadı:", error));
  };
  const copyToClipboard = () => {
    const url = `https://emlaksepette.com/proje/${slug}/1000${ProjectId}/detay`;
    Clipboard.setStringAsync(url);
    ShowAlert();
  };
  const handleShareViaSMS = (text) => {
    const url = text;
    const message = `Bu linki kontrol et: ${url}`;

    Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
  };
  const ShowAlert = () => {
    setshowAlert(true);
    setTimeout(() => {
      setshowAlert(false);
    }, 2000);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const ToggleSheet = () => {
   setIsOpenSheet(!IsOpenSheet)
  };
  const ToggleColSheet = () => {
 setColectionSheet(!ColectionSheet)
   };
  const changeTab = (tabs) => {
    setTabs(tabs);
  };
  console.log(data.project.description)
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={toggleDrawer} />
      <Modal
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
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: data?.project.user?.banner_hex_code,
        }}
      >
        <TouchableOpacity
          style={{
            paddingLeft: 15,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <View style={{ height: 35, width: 35 }}>
              <ImageBackground
                 source={{ uri:`${apiUrl}/storage/profile_images/${data?.project?.user?.profile_image}`}}
                style={{ width: "100%", height: "100%" }}
                borderRadius={20}
              />
            </View>
            <Text style={{ color: "white" }}>  {data?.project?.user?.name ? `${data?.project?.user?.name} ` : ''}</Text>
            <View
              style={{
                width: 18,
                height: 18,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinkIcon
                name="check"
                style={{ position: "absolute", zIndex: 1 }}
                color={"#333"}
              />
              <ImageBackground
                source={require("./BadgeYellow.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>

          <Arrow name="arrow-forward-ios" size={16} color={"white"} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{ height: 250 }}>
          <View style={styles.pagination}>
            <View
              style={{
                backgroundColor: "#333",
                padding: 5,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>1/10</Text>
            </View>
          </View>

          <View style={styles.ıconContainer}>
            <TouchableOpacity onPress={()=>setIsOpenSheet(true)}>
              <View style={styles.ıcon}>
                <Icon name="sharealt" size={18} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                changeHeart();
              }}
            >
              <View style={styles.ıcon}>
                <Heart
                  name={heart}
                  size={18}
                  color={heart == "hearto" ? "black" : "red"}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>
              {
                changeBookmark()
                setColectionSheet(true)
              
              }}>
              <View style={styles.ıcon}>
                <Bookmark
                  name={bookmark}
                  size={18}
                  color={bookmark == "bookmark-o" ? "black" : "red"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <PagerView style={{ height: 250 }}>
            <View key="1">
              <ImageBackground
                // source={{ uri: ımage }}
                style={{ width: "100%", height: "100%" }}
                borderBottomLeftRadius={20}
                borderBottomRightRadius={20}
              />
            </View>
            <View key="2">
              <ImageBackground
                source={require("./home.jpg")}
                style={{ width: "100%", height: "100%" }}
                borderBottomLeftRadius={20}
                borderBottomRightRadius={20}
              />
            </View>
          </PagerView>
        </View>
        <View style={{ paddingTop: 8, gap: 10 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#333",
              fontWeight: "400",
            }}
          >
           {data?.project?.city?.title ? `${data.project.city.title} / ${data.project.county.ilce_title}` : ''}
          </Text>
          <Text style={{ textAlign: "center", fontSize: 16, color: "#264ABB" }}>
          {data?.project?.project_title}
          </Text>
        </View>
        <View>
          <SliderMenuDetails
            tab={tabs}
            setTab={setTabs}
            changeTab={changeTab}
          />
        </View>
        {tabs == 0 && <OtherHomeInProject data={data} openmodal={openModal} />}
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          {tabs == 1 && <Caption data={data} />}
        </View>
        {tabs == 2 && <Information />}
        <View style={{}}>{tabs === 3 && <Map />}</View>

        {tabs == 4 && <FloorPlan />}

        <Modal
          animationType="slide" // veya "fade", "none" gibi
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: -5,
                  backgroundColor: "#333",
                  padding: 6,
                  zIndex: 1,
                  borderRadius: 30,
                  top: -15,
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Heart name="close" size={20} color={"white"} />
              </TouchableOpacity>
              <View style={{ backgroundColor: "#EEEEEE", padding: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 12 }}>
               
                </Text>
              </View>
              <View>
                <SettingsItem info="Peşin Fiyat" numbers="2.000.000" />
                <SettingsItem info="Taksitli 12 Ay Fiyat" numbers="2.500.000" />
                <SettingsItem info="Peşinat" numbers="1.000.000" />
                <SettingsItem info="Aylık Ödenecek Tutar" numbers="100.000" />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#EA2C2E",
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Sepete Ekle
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
        isVisible={IsOpenSheet}
        onBackdropPress={ToggleSheet}
        swipeDirection={['down']}
        backdropColor="transparent"
        style={styles.modal3}
      >
        <View style={styles.modalContent3}>
        <ScrollView horizontal  style={{padding:5}}   showsHorizontalScrollIndicator={false}>
  
    

            </ScrollView>
      
        </View>
      </Modal>
      <Modal
        isVisible={ColectionSheet}
        onBackdropPress={ToggleColSheet}
        swipeDirection={['down']}
        backdropColor="transparent"
        style={styles.modal2}
      >
     
        <View style={styles.modalContent2}>
               
                <View style={{backgroundColor:'#ebebeb',padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <View style={{alignItems:'center'}}>
                <View style={{width:'10%',padding:3,backgroundColor:'grey',borderRadius:50}}/>
                  </View>
               
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,alignItems:'center',paddingLeft:10,paddingRight:10}}>
               
                  <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                    <View style={{backgroundColor:'red',width:50,height:50,borderRadius:5}}></View>
                    <Text style={{color:'#333',fontSize:15,fontWeight:'500'}}>Kaydedildi</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={changeBookmark}>
                    <Bookmark
                  name={bookmark}
                  size={25}
                  color={bookmark == "bookmark-o" ? "black" : "red"}
                />
                    </TouchableOpacity>
                
                  </View>
                </View>
                </View>
                <View>
                  <View style={{padding:10}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,alignItems:'center',paddingLeft:10,paddingRight:10}}>
               
               <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                 <View style={{backgroundColor:'blue',width:40,height:40,borderRadius:5}}></View>
                 <Text style={{color:'#333',fontSize:15,fontWeight:'500'}}>Kartal</Text>
               </View>
               <View>
                 <TouchableOpacity>
            <Icon name="pluscircle" size={20} color={'grey'}/>
                 </TouchableOpacity>
             
               </View>
             </View>
             </View>
                </View>
      
        </View>
   
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    ...Platform.select({
      ios: {},
      android: {
        paddingTop: 25,
      },
    }),
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
  pagination: {
    position: "absolute",
    zIndex: 1,
    padding: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
    bottom: 0,
    alignItems: "center",

    width: "100%",
  },
  ıconContainer: {
    width: 50,
    height: 150,
    backgroundColor: "transparent",
    position: "absolute",
    right: 7,
    top: 43,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 20,
    zIndex: 1,
  },
  ıcon: {
    backgroundColor: "#FFFFFFAD",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  centeredView: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
    // modal dışı koyu arkaplan
  },
  modalView: {
    width: "100%",

    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal2: {
    justifyContent: 'flex-end',
    margin: 0,
   
  },
  modalContent2: {
    backgroundColor: '#FAFAFA',
 
    height:'50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
 
    
  },
  modal3: {
    justifyContent: 'flex-end',
    margin: 0,
   
  },
  modalContent3: {
    backgroundColor: '#FAFAFA',
 
    height:'20%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
 
    
  },
  shareIcons:{
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    bottom:2
  },

});
