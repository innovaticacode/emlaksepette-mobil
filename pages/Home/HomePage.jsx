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
 
  ImageBackground
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
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';
import PagerView from "react-native-pager-view";
import Categories from "../../components/Categories";



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
  const filteredEstates = featuredEstates.filter(estate => estate.step1_slug =='is-yeri');
  const filteredHomes = featuredEstates.filter(estate => estate.step1_slug =='konut').slice(0,5);
  
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
  const scrollViewRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const handleScroll = (event) => {
   
    const scrollPosition = event.nativeEvent.contentOffset.y;
    // Sayfanın 200px aşağısına inildiğinde gizlenmesi gerekiyor
    if (scrollPosition >10) {
    
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  };

  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    // Burada arama işlemleri yapılabilir
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{ flex: 1, paddingTop: 25, backgroundColor: "white" }}
      >
      
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
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('HomePage')
                  setIsDrawerOpen(false)
                  }}>
                <Categories category='Ana Sayfa' bordernone='none' ıconName='home' />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('Hesabım')
                  setIsDrawerOpen(false)
                  }}>
                <Categories category='Hesabım' bordernone='none' ıconName='user' />
                </TouchableOpacity>
                <TouchableOpacity>
                <Categories category='Emlak Kulüp' bordernone='none' showImage={true} />
                </TouchableOpacity>
                <TouchableOpacity>
                <Categories category='İlan Ver' bordernone='none' ıconName='plus'/>
                </TouchableOpacity>
                <TouchableOpacity>
                <Categories category='Sat Kirala' bordernone='none' ıconName='search-plus'/>
                </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
           </View>
           <View style={{backgroundColor:'white', flex:1.3/2}}>
              <Search onpres={toggleDrawer}/>
           </View>
          </View>
        </Modal>

        <Header loading={loadingPrjoects} onPress={toggleDrawer} />
        
        <View style={{flexDirection:'row',height:'5%',alignItems:'center',justifyContent:'space-between',paddingRight:5}}> 
        <SearchBar
            containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderWidth:0,borderBottomWidth:0,padding:10,flex:1.6/2}}
            inputContainerStyle={{backgroundColor:'#ebebeb',borderRadius:10}}
            placeholder="Kelime veya ilan no ile ara..."
            inputStyle={{fontSize:15,}}
            showLoading={false}
            onChangeText={handleSearch}
            value={searchText}
          />
   <TouchableOpacity style={[styles.allBtn,{flex:0.4/2,height:'100%',justifyContent:'center'}]}>
                    <Text style={{color:'white',fontSize:13,textAlign:'center'}}>Sat Kirala</Text>
                  </TouchableOpacity>
        </View>
       
          
        <View style={{paddingTop:10}}>
          
          <SliderMenu goToSlide={goToSlide} tab={tab} setTab={settab} />
        
         </View>
      
         {/* <View style={{flexDirection:'row',justifyContent:'center',gap:20,paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:10}}>
              <TouchableOpacity style={styles.btn}>
                <Text style={{textAlign:'center'}}>Filtrele</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Text style={{textAlign:'center'}}>Sırala</Text>
                </TouchableOpacity>
              </View> */}
      
          
              {
                tab==0?
                <>
                  <Animatable.View animation={isHidden ? "fadeOutDown" : 'fadeInDown'} delay={1000} duration={1000} style={{ opacity: isHidden ? 1 : 0, display:  isHidden?'none':'flex' }}>
          <View style={{ padding: 8 }}>
            <PagerView style={{ height: 100 }}>
              <View style={{ backgroundColor: 'red', borderRadius: 15, width: '100%', height: '100%' }}>
                <ImageBackground source={require('./slider.png')} style={{ width: '100%', height: '100%' }} resizeMode='cover' borderRadius={15} />
              </View>
              <View style={{ backgroundColor: 'red', borderRadius: 15 }}>
                <Text>fskljfklds</Text>
              </View>
            </PagerView>
          </View>
          <Animatable.View  animation={isHidden ? "slideOutDown" : 'slideInDown'} duration={1500} style={{ display: isHidden ? 'none' : 'flex' }}>
          <View style={{ height: 100 }}>
            <SliderBar loading={loadingPrjoects} />
          </View>
          </Animatable.View>
        </Animatable.View>
                </>:''
              }
            

        <Swiper  showsButtons={false}  showsPagination={false}  loop={false} ref={swiperRef} onIndexChanged={handleIndexChanged} >
       
          <View style={styles.slide1} >
         
           <ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16} nestedScrollEnabled={false} >
       
        
          <View style={{gap:20,paddingTop:25}}>
              <View>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:10,paddingRight:10,alignItems:'center'}}>
                  <Text style={{fontSize:12}}>ÖNE ÇIKAN PROJELER</Text>
                  <TouchableOpacity style={styles.allBtn}>
                    <Text style={{color:'white',fontSize:13}}>Tümünü Gör</Text>
                  </TouchableOpacity>
                </View>

              </View>
          
         
        
              {loadingPrjoects == false ? (
              <View style={{ top: 40, padding: 10 }}>
                <ProjectPostSkeleton />
              </View>
            ) : (
                <>
               
             
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
                </>

             
            )}

          </View>
 
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
              
                filteredHomes.map((item,index)=>(
                  <RealtorPost
                  key={index}
                  price={`${JSON.parse(item.housing_type_data)['price']} `}
                  title={item.housing_title}
                  loading={loadingEstates}
                  location={item.city_title + ' / ' + item.county_title}
                  image={`${apiUrl}/housing_images/${JSON.parse(item.housing_type_data).image}`}
                  m2={`${JSON.parse(item.housing_type_data)['squaremeters']} `}
                  roomCount={`${JSON.parse(item.housing_type_data)['room_count']} `}
                  floor={`${JSON.parse(item.housing_type_data)['floorlocation']} `}
    
                />
                ))
              
            )}
          </View> }
          </ScrollView>
          </View>
          <View style={styles.slide3}>
       
            <ScrollView>
          {
            filteredEstates.map((item,index)=>(
              <RealtorPost
              key={index}
              price={`${JSON.parse(item.housing_type_data)['price']} `}
              title={item.housing_title}
              loading={loadingEstates}
              location={item.city_title + ' / ' + item.county_title}
              image={`${apiUrl}/housing_images/${JSON.parse(item.housing_type_data).image}`}
              m2={`${JSON.parse(item.housing_type_data)['squaremeters']} `}
              roomCount={`${JSON.parse(item.housing_type_data)['room_count']} `}
              floor={`${JSON.parse(item.housing_type_data)['floorlocation']} `}

            />
            ))
          }
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
   flex:1,
    top:10
  },
  slide2: {
flex:1,

   
  },
  slide3: {
    flex: 1,
  
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  filterBtn:{
    backgroundColor:'#ebebeb',
    paddingLeft:15,
    paddingRight:15,
    padding:5,
      borderRadius:4,
      borderWidth:1,
      borderColor:'#c7c7ca'
  },
  btn:{
    backgroundColor:'#ebebeb',
     width:'45%',
      paddingTop:8,
      paddingBottom:8,
      borderRadius:5,
      borderWidth:1,
      borderColor:'#c7c7ca',

  },
  allBtn:{
    backgroundColor:'#EA2C2E',
    paddingLeft:15,
    paddingRight:15,
    padding:5,
    borderRadius:4
  }

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
          </View> */}    {/*  */}