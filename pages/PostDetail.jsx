import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  TextInput,
} from "react-native";
import { React, useRef, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Phone from "react-native-vector-icons/Entypo";

import PagerView from "react-native-pager-view";
import { useNavigation, useRoute } from "@react-navigation/native";
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import DetailsSettings from "../components/PostDetailsSettings/DetailsSettings";

import LinkIcon3 from "react-native-vector-icons/Feather";
import LinkIcon4 from "react-native-vector-icons/Fontisto";
import LinkIcon2 from "react-native-vector-icons/FontAwesome";

import PostMap from "../components/PostDetailsSettings/Postmap";
import PostPayment from "../components/PostDetailsSettings/PostPayment";
import PostCaption from "../components/PostDetailsSettings/PostCaption";
import Header from "../components/Header";
import Modal from "react-native-modal";
import Categories from "../components/Categories";
import Search from "./Home/Search";
import LinkIcon from "react-native-vector-icons/Entypo";
import Arrow from "react-native-vector-icons/MaterialIcons";
import SliderMenuDetails from "../components/SliderMenuDetails";
import OtherHomeInProject from "../components/OtherHomeInProject";
import SliderMenuPostDetails from "../components/PostDetailsSettings/SliderMenuPostDetails";
import { apiRequestGet } from "../components/methods/apiRequest";
import Posts from "../components/Posts";
import PostOtherProject from "../components/PostDetailsSettings/PostOtherProject";
import SettingsItem from "../components/SettingsItem";
import { addDotEveryThreeDigits } from "../components/methods/merhod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Shadow } from "react-native-shadow-2";

export default function PostDetail() {
  const apiUrl = "https://emlaksepette.com";
  const [modalVisible, setModalVisible] = useState(false);
  const [tabs, setTabs] = useState(0);
  const [heart, setHeart] = useState("hearto");
  const [bookmark, setbookmark] = useState("bookmark-o");
  const [ColectionSheet, setColectionSheet] = useState(false);
  const [IsOpenSheet, setIsOpenSheet] = useState(false);

  const changeHeart = () => {
    setHeart(heart === "hearto" ? "heart" : "hearto");
  };
  const changeBookmark = () => {
    setbookmark(bookmark === "bookmark-o" ? "bookmark" : "bookmark-o");
  };
  const route = useRoute();
  const { HomeId, projectId } = route.params;
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const handleOpenPhone = () => {
    // Telefon uygulamasını açmak için
    Linking.openURL("tel:+905537064474");
  };

  const changeTab = (tabs) => {
    setTabs(tabs);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const ToggleSheet = () => {
    setIsOpenSheet(!IsOpenSheet);
  };
  const ToggleColSheet = () => {
    setColectionSheet(!ColectionSheet);
  };
  const [ProjectHomeData, setProjectHomeData] = useState({
    project: {
      room_count: 0,
      roomInfo: [],
      images: [],
      location: "0,0",
    },
    projectHousingsList: {},
  });
  useEffect(() => {
    apiRequestGet("project/" + projectId).then((res) => {
    
      setProjectHomeData(res.data);
    });
  }, []);
  const [pagination, setpagination] = useState(0);
  const handlePageChange = (pageNumber) => {
    setpagination(pageNumber);
  };
  const [paymentModalShowOrder, setPaymentModalShowOrder] = useState(null);
  const openModal = (roomOrder) => {
    setPaymentModalShowOrder(roomOrder);
    setModalVisible(!modalVisible);
  };
  const [FormVisible, setFormVisible] = useState(false);
  const openFormModal = (no) => {
    setPaymentModalShowOrder(no);
    setFormVisible(!FormVisible);
  };
  const [changeIcon, setchangeIcon] = useState(false)
  const  toggleIcon=()=>{
    setchangeIcon(!changeIcon)
  }
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
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
              source={require("../pages/Home/MenuBg.jpg")}
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
          backgroundColor: ProjectHomeData?.project?.user?.banner_hex_code,
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
                source={{
                  uri: `${apiUrl}/storage/profile_images/${ProjectHomeData?.project?.user?.profile_image}`,
                }}
                style={{ width: "100%", height: "100%" }}
                borderRadius={20}
              />
            </View>
            <Text style={{ color: "white" }}>
              {ProjectHomeData?.project?.user?.name}
            </Text>
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
                source={require("../pages/Home/BadgeYellow.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>

          <Arrow name="arrow-forward-ios" size={16} color={"white"} />
        </TouchableOpacity>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        // onScroll={({ nativeEvent }) => {
        //   if (isCloseToBottom(nativeEvent)) {
        //     clearTimeout(debounceTimeout);
        //     debounceTimeout = setTimeout(() => {
        //       if (!isLoading) {
        //         fetchHousings(page + 1);
        //         setPage(page + 1);
        //       }
        //     }, 1000); // 500ms içinde yeni bir istek yapılmazsa gerçekleştir
        //   }
        // }}
      >
        <View style={{ height: 200 }}>
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
              <Text style={{ color: "white", fontSize: 12 }}>
                {pagination + 1} / {ProjectHomeData.project.images.length}
              </Text>
            </View>
          </View>

          <View style={styles.ıconContainer}>
            <TouchableOpacity onPress={() => setIsOpenSheet(true)}>
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

            <TouchableOpacity
              onPress={() => {
                changeBookmark();
                setColectionSheet(true);
              }}
            >
              <View style={styles.ıcon}>
                <Bookmark
                  name={bookmark}
                  size={18}
                  color={bookmark == "bookmark-o" ? "black" : "red"}
                />
              </View>
            </TouchableOpacity>
          </View>
          <PagerView style={{ height: 200 }}
          
            onPageSelected={(event) => handlePageChange(event.nativeEvent.position)}
          >
             {
              ProjectHomeData.project.images.map((image,index) => {
              
                return(
                  <View key={index+1}>
                     <ImageBackground
                      source={{uri:`${apiUrl}/${image.image.replace("public",'storage')}`}}
                      style={{ width: "100%", height: "100%" }}
                 
                    /> 
                  </View>
                )
              })
            } 
            
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
            {ProjectHomeData?.project?.city?.title
              ? `${ProjectHomeData.project.city.title} / ${ProjectHomeData.project.county.ilce_title}`
              : ""}
          </Text>
          <Text style={{ textAlign: "center", fontSize: 16, color: "#264ABB" }}>
            {ProjectHomeData.projectHousingsList[HomeId]
              ? ProjectHomeData.projectHousingsList[HomeId]["advertise_title[]"]
              : ""}
          </Text>
        </View>
        <View>
          <SliderMenuPostDetails
            tab={tabs}
            setTab={setTabs}
            changeTab={changeTab}
          />
        </View>

        {/* 
                {
                  ProjectHomeData.projectHousingsList((item,index)=>(
                    <Text>asd</Text>
                      // <Posts
                      //     key={index}
                      // />
                  ))
                } */}

        {tabs == 0 && (
          <PostOtherProject
            data={ProjectHomeData}
            openmodal={openModal}
            openFormModal={openFormModal}
          />
        )}
        {tabs == 1 && <PostCaption data={ProjectHomeData} />}
        {tabs == 2 && (
          <DetailsSettings roomOrder={HomeId} data={ProjectHomeData} />
        )}
        {tabs == 3 && <PostPayment roomOrder={HomeId} data={ProjectHomeData} />}
        {tabs == 4 && <PostMap data={ProjectHomeData} />}
     
        <Modal
          isVisible={IsOpenSheet}
          onBackdropPress={ToggleSheet}
          swipeDirection={["down"]}
          backdropColor="transparent"
          style={styles.modal2}
        >
            
          <View style={[styles.card, {backgroundColor:'white',height:'14%',padding:10}]}>
        
          <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>
                  <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 27,
              }}
            >
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={{backgroundColor:'#E54242',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon name="link" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>Kopyala</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center"}}>
                <View style={{backgroundColor:'#24D366',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon2 name="whatsapp" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>Whatsapp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={{backgroundColor:'#E1306C',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon name="instagram" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>İnstagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={{backgroundColor:'#1877F2',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon2 name="facebook" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={{backgroundColor:'#51b0e6',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon3 name="message-circle" size={23} color={'white'}/>
                </View>
                <Text style={{color:'#333',fontSize:12}}>Mesajlar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View style={{backgroundColor:'#7698E3',width:40,height:40,borderRadius:20,alignItems:'center',justifyContent:'center'}}>
                  <LinkIcon4 name="messenger" size={23} color={'white'} />
                </View>
                <Text style={{color:'#333',fontSize:12}}>Messenger</Text>
              </TouchableOpacity>
            </View>
                  
                  </ScrollView>
      
          </View>
   
        </Modal>
    
        <Modal
          isVisible={ColectionSheet}
          onBackdropPress={ToggleColSheet}
          swipeDirection={["down"]}
          backdropColor="transparent"
          style={styles.modal2}
        >
          <View style={styles.modalContent2}>
          <View style={styles.modalContent2}>
                  <View style={{width:'100%',padding:8,backgroundColor:'#F8F7F4',borderTopLeftRadius:15,borderTopRightRadius:15}}>
                    <View style={{alignItems:'center',padding:5}}>
                      <View style={{backgroundColor:'#D4D3D2',width:50,height:6,borderRadius:20}}/>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10}}>
                      <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
                        <View style={{width:55,height:55,borderRadius:10}}>
                          <ImageBackground     source={{uri:`${apiUrl}${ProjectHomeData?.project?.image?.replace("public",'storage')}`}} style={{width:'100%',height:'100%'}} borderRadius={10}/>
                        </View>
                        <Text style={{color:'#333',fontWeight:'500'}}>{bookmark=='bookmark-o'?'Kaydet':'Kaydedildi'}</Text>
                      </View>
                      <View>
                      <TouchableOpacity
              onPress={() => {
                changeBookmark();
                setTimeout(() => {
                  setColectionSheet(false);
                }, 500);
             
              }}
            >
              <View style={{alignItems:'center',justifyContent:'center'}}>
                <Bookmark
                  name={bookmark}
                  size={25}
                  color={bookmark == "bookmark-o" ? "black" : "red"}
                />
              </View>
            </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:10,paddingLeft:10,paddingTop:10}}>
                    <Text style={{fontSize:13,color:'#333'}}>Koleksiyonlar</Text>
                   <TouchableOpacity>
                    <Text style={{fontSize:13,color:'#333',textDecorationLine:'underline'}}>Yeni Koleksiyon</Text>
                   </TouchableOpacity>
                  </View>
                
                   <View>
                      <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:10,paddingRight:10,paddingTop:6}}>
                        <View style={{flexDirection:'row',alignItems:'center', gap:10}}>
                          <View style={{width:55,height:55,backgroundColor:'red',borderRadius:10}}>
                       
                          </View>
                          <Text style={{fontSize:13,color:'#333'}}>Koleksiyon İsmi</Text>
                        </View>
                        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',paddingRight:5}}
                          onPress={toggleIcon}
                        >
                            <Icon name= {changeIcon? 'checkcircle' : "pluscircleo"} size={21}/>
                        </TouchableOpacity>
                      </TouchableOpacity>
                  </View> 
          </View>
          </View>
        </Modal>

        <View style={{ padding: 10 }}></View>

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
                  {ProjectHomeData?.project?.project_title} projesinde{" "}
                  {paymentModalShowOrder} No'lu ilan Ödeme Planı
                </Text>
              </View>
              <View>
                <SettingsItem
                  info="Peşin Fiyat"
                  numbers={
                    paymentModalShowOrder != null
                      ? addDotEveryThreeDigits(
                          ProjectHomeData.projectHousingsList[
                            paymentModalShowOrder
                          ]["price[]"]
                        ) + " ₺"
                      : "0"
                  }
                />
                {paymentModalShowOrder != null ? (
                  JSON.parse(
                    ProjectHomeData.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ) &&
                  JSON.parse(
                    ProjectHomeData.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ).includes("taksitli") ? (
                    <SettingsItem
                      info="Taksitli 12 Ay Fiyat"
                      numbers={
                        addDotEveryThreeDigits(
                          ProjectHomeData.projectHousingsList[
                            paymentModalShowOrder
                          ]["installments-price[]"]
                        ) + "₺"
                      }
                    />
                  ) : (
                    <SettingsItem info="Taksitli 12 Ay Fiyat" numbers="0" />
                  )
                ) : (
                  <SettingsItem info="Taksitli 12 Ay Fiyat" numbers="0" />
                )}
                {paymentModalShowOrder != null ? (
                  JSON.parse(
                    ProjectHomeData.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ) &&
                  JSON.parse(
                    ProjectHomeData.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ).includes("taksitli") ? (
                    <SettingsItem
                      info="Peşinat"
                      numbers={
                        addDotEveryThreeDigits(
                          ProjectHomeData.projectHousingsList[
                            paymentModalShowOrder
                          ]["advance[]"]
                        ) + "₺"
                      }
                    />
                  ) : (
                    <SettingsItem info="Peşinat" numbers="0" />
                  )
                ) : (
                  <SettingsItem info="Peşinat" numbers="0" />
                )}

                {paymentModalShowOrder != null ? (
                  JSON.parse(
                    ProjectHomeData.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ) &&
                  JSON.parse(
                    ProjectHomeData.projectHousingsList[paymentModalShowOrder][
                      "payment-plan[]"
                    ]
                  ).includes("taksitli") ? (
                    <SettingsItem
                      info="Aylık Ödenecek Tutar"
                      numbers={
                        addDotEveryThreeDigits(
                          (
                            (ProjectHomeData.projectHousingsList[
                              paymentModalShowOrder
                            ]["installments-price[]"] -
                              ProjectHomeData.projectHousingsList[
                                paymentModalShowOrder
                              ]["advance[]"]) /
                            ProjectHomeData.projectHousingsList[
                              paymentModalShowOrder
                            ]["installments[]"]
                          ).toFixed(0)
                        ) + "₺"
                      }
                    />
                  ) : (
                    <SettingsItem info="Aylık Ödenecek Tutar" numbers="0" />
                  )
                ) : (
                  <SettingsItem info="Aylık Ödenecek Tutar" numbers="0" />
                )}
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
          animationType="slide"
          transparent={true}
          onBackdropPress={() => setFormVisible(false)}
          visible={FormVisible}
          onRequestClose={() => {
            setFormVisible(false);
          }}
        >
          <View style={[styles.centeredView, { padding: 0 }]}>
            <View style={[styles.modalView, { height: "90%" }]}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                {ProjectHomeData?.project?.project_title} projesinde{" "}
                {paymentModalShowOrder} No'lu Konut Başvuru Formu
              </Text>
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={{ gap: 15 }}>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>Ad Soyad</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>Telefon Numarası</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>E-Posta</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>Meslek</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>İl</Text>
                    <TextInput style={styles.Input} />
                  </View>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.label}>İlçe</Text>
                    <TextInput style={styles.Input} />
                  </View>
                </View>
              </KeyboardAwareScrollView>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#28A745",
                    width: "40%",
                    padding: 15,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Gönder
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#DC3545",
                    width: "40%",
                    padding: 15,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setFormVisible(false);
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Kapat
                  </Text>
                </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 50,
    backgroundColor: "#ecf0f1", // Top bar background color
  },
  segment: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  selectedSegment: {
    backgroundColor: "#3498db", // Selected segment color
  },
  segmentText: {
    color: "#2c3e50", // Segment text color
  },
  viewPager: {
    height: 250,
  },
  Info: {
    width: "100%",
    top: 20,
    height: 240,
  },
  text: {
    fontSize: 11,
    fontWeight: "300",

    color: "grey",
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
  },
  shareIcons: {
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    bottom: 2,
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
  ıconContainer: {
    width: 50,
    height: 150,
    backgroundColor: "transparent",
    position: "absolute",
    right: 7,
    top: 22,
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
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {

    backgroundColor: "white",

    height: "30%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  other: {
    padding: 5,
    top: 0,

    backgroundColor: "#FFFFFF",

    marginTop: 0,

    width: "100%",

    height: "auto",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  card: {  
    backgroundColor: '#FFFFFF',  
    borderWidth:0.7,
    borderColor:'#e6e6e6',
    ...Platform.select({
        ios: {
          shadowColor: ' #e6e6e6',
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        android: {
          elevation: 5,
        },
      }),
  
    
  },
  Input:{
    borderWidth:1,
    padding:10,
    borderRadius:6,
    borderColor:'#ebebeb'
  },
});
