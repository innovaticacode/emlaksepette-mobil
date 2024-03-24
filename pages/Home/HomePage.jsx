import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Animated,
  PanResponder
} from "react-native";
import axios from "axios";

import { useState, useEffect, useRef } from "react";
import Posts from "../../components/Posts";
import SliderBar from "../../components/SliderBar";
import Header from "../../components/Header";
import ProjectPost from "../../components/ProjectPost";
import RealtorPost from "../../components/RealtorPost";
import Splash from "../../components/Splash";
import ProjectPostSkeleton from "../../components/SkeletonComponents/ProjectPostSkeleton";
import { Skeleton } from "@rneui/themed";
import SliderItemSkeleton from "../../components/SkeletonComponents/SliderItemSkeleton";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import Search from "./Search";
import { SearchBar } from "react-native-elements";
import SliderMenu from "../../components/SliderMenu";

import Swiper from 'react-native-swiper';




export default function HomePage() {
  const navigation = useNavigation();
  const apiUrl = "https://emlaksepette.com/";
  const [loadingPrjoects, setloadingPrjoects] = useState(false);
  const [loadingEstates, setloadingEstates] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get(
        "https://emlaksepette.com/api/featured-projects"
      );
      setFeaturedProjects(response.data);
      setloadingPrjoects(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);
  const [featuredEstates, setFeaturedEstates] = useState([]);

  const fetchFeaturedEstates = async () => {
    try {
      const response = await axios.get(
        "https://emlaksepette.com/api/real-estates"
      );
      setFeaturedEstates(response.data);
      setloadingEstates(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedEstates();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    });
  };
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer=()=>{
    setIsDrawerOpen(!isDrawerOpen)
  }
  const renderPagination = (index, total, context) => {
    return (
      <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
        <Text>{index + 1} / {total}</Text>
      </View>
    );
  };
  const swiperRef = useRef(null);


  const handleIndexChanged = (index) => {
    settab(index);
  };

  const goToSlide = (index) => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(index - tab);
      settab(index); // Butona her basıldığında activeIndex'i güncelle
    }
  };

  const [tab, settab] = useState(0)
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{ flex: 1, paddingTop: 25, backgroundColor: "white" }}
      >
        {/* Çekme menüsü */}
        <Modal
          isVisible={isDrawerOpen}
          onBackdropPress={()=>setIsDrawerOpen(false)}
          animationIn='bounceInLeft'
          animationOut='bounceOutLeft'
        
          style={styles.modal}
        >
          <View style={styles.modalContent}>
           <View style={{backgroundColor:'red',padding:10,flex:0.7/2,borderBottomLeftRadius:30, borderBottomRightRadius:30}}>
            <SafeAreaView>
              <Text>dkfsdkfl</Text>
            </SafeAreaView>
           </View>
           <View style={{backgroundColor:'white', flex:1.3/2}}>
              <Search onpres={toggleDrawer}/>
           </View>
          </View>
        </Modal>
        <Header loading={loadingPrjoects} onPress={toggleDrawer} />
        <SearchBar
            containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderWidth:0,borderBottomWidth:0,padding:10}}
            inputContainerStyle={{backgroundColor:'#ebebeb',borderRadius:10}}
            placeholder="Kelime veya ilan no ile ara..."
            inputStyle={{fontSize:15,}}
            showLoading={false}
            
          />
          
        <View>
          <SliderMenu goToSlide={goToSlide} tab={tab} setTab={settab} />
        
         </View>
    
{/*       
        <ScrollView
          scrollEventThrottle={20}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        > */}
        
       
        <Swiper  showsButtons={false}  showsPagination={false}  loop={false} ref={swiperRef} onIndexChanged={handleIndexChanged} >
          <View style={styles.slide1} >
           <ScrollView>
       
       
        
          { 
         
          <View style={{width:'100%',}}>
         
           <View>
           <SliderBar loading={loadingPrjoects} />
         </View> 
          
         
         
        
          <View
            style={{
              top: 30,
              padding: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 30,
            }}
          >
     
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 12, fontWeight: "500" }}>
                ÖNE ÇIKAN PROJELER
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#EA2A29",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 7,
                paddingBottom: 5,
                zIndex: 1,
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "600", color: "white" }}>
                Tümünü gör
              </Text>
            </TouchableOpacity>
          </View>
            {loadingPrjoects == false ? (
              <View style={{ top: 40, padding: 10 }}>
                <ProjectPostSkeleton />
              </View>
            ) : (
              <FlatList
                data={featuredProjects}
                renderItem={({ item }) => (
                  <View style={{paddingLeft:10,paddingRight:10,width:'100%' }}>
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
                      loading={loadingPrjoects}
                    />
                  </View>
                )}
                scrollEnabled={false}
              />
            )}
          </View> }
       
    
    

    
    
   
                  
         
          </ScrollView>
      
          </View>
          <View style={styles.slide2}>
          <ScrollView>
          { <View style={{width:'100%'}}>
            {loadingPrjoects == false ? (
              <View style={{ top: 40, padding: 10 }}>
                <ProjectPostSkeleton />
              </View>
            ) : (
              <FlatList
                data={featuredProjects}
                renderItem={({ item }) => (
                  <View style={{paddingLeft:10,paddingRight:10,width:'100%' }}>
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
                      loading={loadingPrjoects}
                    />
                  </View>
                )}
                scrollEnabled={false}
              />
            )}
          </View> }
          </ScrollView>
          </View>
          </Swiper>
        {/* </ScrollView> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
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

   margin:0
    
  },
  modalContent: {
    backgroundColor: 'white',
   
   flex:1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width:320,
  },
    page: {
   width:'100%',
   height:'100%', // Sayfa yüksekliği
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  slide1: {
   flex:1
    
  },
  slide2: {
flex:1,

   
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

});
  {/*   */}


           {/*    <View style={{ paddingTop: 20, padding: 10 }}>
            {loadingPrjoects == false ? <></> : <Text>Emlak İlanları</Text>}

            <View>
            {
                loadingPrjoects == false ?
                  '' :
                  <FlatList
                    data={featuredEstates}
                    renderItem={({ item }) =>
                      <RealtorPost
                        price={`${JSON.parse(item.housing_type_data)['price']} `}
                        title={item.housing_title}
                        loading={loadingEstates}
                        location={item.city_title + ' / ' + item.county_title}
                        image={`${apiUrl}/housing_images/${JSON.parse(item.housing_type_data).image}`}
                        m2={`${JSON.parse(item.housing_type_data)['squaremeters']} `}
                        roomCount={`${JSON.parse(item.housing_type_data)['room_count']} `}
                        floor={`${JSON.parse(item.housing_type_data)['floorlocation']} `}

                      />

                    }

                    scrollEnabled={false}
                  />
              } 
       
            </View>
          </View> */}