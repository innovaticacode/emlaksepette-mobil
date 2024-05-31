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
 Pressable
} from "react-native";
import { React, useRef, useState,useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";

import { Platform } from "react-native";
import PagerView from 'react-native-pager-view';
import { useNavigation, useRoute  } from '@react-navigation/native';
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import Categories from "../../../components/Categories";

import LinkIcon from "react-native-vector-icons/Entypo";
import Arrow from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons'
import SliderMenuPostDetails from "../../../components/PostDetailsSettings/SliderMenuPostDetails";
import { apiRequestGet } from "../../../components/methods/apiRequest";
import Header from "../../../components/Header";
import Search from "../Search";
import SliderMenuRealtorDetails from "../../../components/SliderMenuRealtorDetail";
import RealtorCaption from "./RealtorCaption";
import Settings from "./Settings";
import CloseIcon from 'react-native-vector-icons/AntDesign';
import RealtorMap from "./RealtorMap";
import Comment from "./Comment";
import { addDotEveryThreeDigits } from "../../../components/methods/merhod";
import { Shadow } from 'react-native-shadow-2';
import { CheckBox } from "react-native-elements";
import SwapForm from "./SwapForm";
import AddCollection from "../../../components/AddCollection";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";


export default function PostDetail() {
const apiUrl = "https://test.emlaksepette.com";
const [modalVisible, setModalVisible] = useState(false);
  const [tabs, setTabs] = useState(0);
const [images,setImages] = useState([]);
const [heart, setHeart] = useState('hearto');
const [bookmark, setbookmark] = useState('bookmark-o')
const [ColectionSheet, setColectionSheet] = useState(false);
const [IsOpenSheet, setIsOpenSheet] = useState(false);
const changeHeart = () => {
  setHeart(heart === 'hearto' ? 'heart' : 'hearto');
 
};
const changeBookmark=()=>{
  setbookmark(bookmark==='bookmark-o' ? 'bookmark': 'bookmark-o')
}
const route = useRoute();
const {houseId}=route.params
const navigation=useNavigation();
const windowWidth = Dimensions.get('window').width;
const handleOpenPhone = () => {
  // Telefon uygulamasını açmak için
  Linking.openURL('tel:+905537064474');
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

const [pagination, setpagination] = useState(0)
const handlePageChange = (pageNumber) => {
  setpagination(pageNumber);
  setSelectedImage(pageNumber)
}
const [paymentModalShowOrder, setPaymentModalShowOrder] = useState(null);
const openModal = (roomOrder) => {
  setPaymentModalShowOrder(roomOrder);
  setModalVisible(!modalVisible);
};
const [FormVisible, setFormVisible] = useState(false)
const openFormModal=(no)=>{
  setPaymentModalShowOrder(no)
  setFormVisible(!FormVisible)
}
const [data, setData] = useState({})
useEffect(() => {
  apiRequestGet("housing/" + houseId).then((res) => {
    setData(res.data);
    setImages(JSON.parse(res.data.housing.housing_type_data).images);
  });
}, []);
//  console.log( JSON.parse(data?.housing?.housing_type_data)['price'])
console.log(data.id)
const [modalVisibleComennet, setmodalVisibleComment] = useState(false)
  const handleModal=()=>(
    setmodalVisibleComment(!modalVisibleComennet)
  )
  const [rating, setRating] = useState(0); // Başlangıçta hiçbir yıldız dolu değil

  const handleStarPress = (index) => {
    // Tıklanan yıldıza kadar olan tüm yıldızları dolu yap
    setRating(index + 1);

    // Sarı yıldızların sayısını hesapla ve konsola yazdır
    const yellowStars = index + 1;
    console.log(`Sarı yıldızlar: ${yellowStars}`);
  };
  const [checked, setChecked] = useState(false);
  const toggleCheked = () => setChecked(!checked);
  const [modalVisibleAlert, setModalVisibleAlert] = useState(false);
  const [AlertMessage, setAlertMessage] = useState('')
  
  const openSwapAler=(message)=>{
    setAlertMessage(message)
    setModalVisibleAlert(true)
  }

  const [colorAlert, setcolorAlert] = useState(false)
  const [LoadingModal, setLoadingModal] = useState(false)
  const [ColectionSheet2, setColectionSheet2] = useState(false);
  const [changeIcon, setchangeIcon] = useState(false)
  const  toggleIcon=()=>{
    setchangeIcon(!changeIcon)
  }
  const [showCoverImageModal,setCoverImageModal] = useState(false);
  const [selectedImage,setSelectedImage] = useState(0);
  const openGalery=(index)=>{
    // setSelectedImage(index)
    setCoverImageModal(true)
  }

  const [selectedHouse, setselectedHouse] = useState(0)
  const openCollection=(id)=>{
      setselectedHouse(id)
      changeBookmark()
      setColectionSheet(true);
  }

const [addCollection, setaddCollection] = useState(false)
const [collections, setcollections] = useState([])

const [user, setUser] = useState({});

const [newCollectionNameCreate, setnewCollectionNameCreate] = useState('')
useEffect(() => {
  getValueFor("user", setUser);
}, []);

const fetchData = async () => {
 
  try {
    const response = await axios.get('https://test.emlaksepette.com/api/getCollections',{
      headers: {
        'Authorization': `Bearer ${user.access_token}`
      }
    });
  
    setcollections(response?.data.collections);
  } catch (error) {
    console.error('Error fetching data:', error);
  }finally{
  
  }
};
useEffect(() => {
  fetchData();
}, [user]);


const addCollectionPost=()=>{
  const collectionData = {
    collection_name: newCollectionNameCreate,
    cart: {
      id: data.housing.id,
      type:null,
      project: null,
      clear_cart: "no",
      selectedCollectionId: null
    }
  };


  axios.post('https://test.emlaksepette.com/api/add/collection', collectionData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`,
      
     
    },
  })
  .then(response => {

    // Başarılı yanıtı işleyin
    // setselectedCollectionName(response.data.collection.name)
    console.log('Response:', response.data);
  })
  .catch(error => {
    // Hata durumunu işleyin
    console.error('Error:', error);
  });

}
const [selectedCollectionId, setselectedCollectionId] = useState(0)
const [selectedCollectionName2, setselectedCollectionName2] = useState('')
const getCollectionId=(id,name)=>{
    setselectedCollectionId(id)
    setselectedCollectionName2(name)
} 
const addSelectedCollection=()=>{
  const collectionData = {
    collection_name:selectedCollectionName2,
    clear_cart: "no",
    id: data.housing.id,
    project:null,
    selectedCollectionId: selectedCollectionId,
    type:null
  };


  axios.post('https://test.emlaksepette.com/api/addLink', collectionData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`,
      
     
    },
  })
  .then(response => {
  
    console.log('Response:', response.data);
  })
  .catch(error => {
    // Hata durumunu işleyin
    console.error('Error:', error);
  });

}
const [ModalForAddToCart, setModalForAddToCart] = useState(false)
const addToCard = async () => {
  const formData=new FormData()
  formData.append('id',houseId)
  formData.append('isShare',null)
  formData.append('numbershare',null)
  formData.append('qt',1)
  formData.append('type','housing')
  formData.append('project',null)
  formData.append('clear_cart','no')

try {
  if (user?.access_token) {
    const response = await axios.post(
      "https://test.emlaksepette.com/api/institutional/add_to_cart",
      formData,
      {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      }
    );
      setModalForAddToCart(false)
      navigation.navigate('Sepetim')
  }
} catch (error) {
  console.error('post isteği olmadı' ,error);
} 
};


return (
  
  <SafeAreaView style={{  backgroundColor: "white",flex:1}}>

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
            source={require('../MenuBg.jpg')}
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
              <View style={{width:'100%',height:'10%',backgroundColor:'transparent',position:'absolute',bottom:15,zIndex:1}}>
                <View style={{flexDirection:'row',gap:20,justifyContent:'center'}}>
                <TouchableOpacity
                    style={{backgroundColor:'#EA2A28',padding:10,width:'40%',borderRadius:5}}
                >
                    <Text style={{textAlign:'center',color:'#ffffff',fontWeight:'500'}}>Ara</Text>
                  </TouchableOpacity>
                  {data?.housing?.step2_slug=='gunluk-kiralik' ?
                     <TouchableOpacity
                     onPress={()=>{
                      navigation.navigate('CreateReservation')
                     }}
                       style={{backgroundColor:'#EA2A28',padding:10,width:'40%',borderRadius:5}}
                     >
                       <Text  style={{textAlign:'center',color:'#ffffff',fontWeight:'500'}}>Rezervasyon Yap</Text>
                     </TouchableOpacity>
                     :
                        <TouchableOpacity
                  onPress={()=>{
                    setModalForAddToCart(true)
                  }}
                    style={{backgroundColor:'#EA2A28',padding:10,width:'40%',borderRadius:5}}
                  >
                    <Text  style={{textAlign:'center',color:'#ffffff',fontWeight:'500'}}>Sepete Ekle</Text>
                  </TouchableOpacity>
           
                  }
               
               </View>
              </View> 
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor:  data?.housing?.user?.banner_hex_code
      }}
    >
      <TouchableOpacity
          onPress={()=>{
            navigation.navigate('Profile',{name:'',id:data?.housing.user?.id})
          }}
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
            {
              data?.housing?.user?.profile_image ? 
              <ImageBackground
              source={{
               uri: `${apiUrl}/storage/profile_images/${data?.housing?.user?.profile_image}`,
              }}
             style={{ width: "100%", height: "100%" }}
             borderRadius={20}
           /> :
           <ImageBackground
           source={{
            uri: `${apiUrl}/storage/profile_images/indir.png`,
           }}
          style={{ width: "100%", height: "100%" }}
          borderRadius={20}
        />
            }
          
          </View>
          <Text style={{ color: "white" }}>
            {data?.housing?.user?.name }
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
              source={require('../BadgeYellow.png')}
              style={{ width: "100%", height: "100%" }}
            /> 
          </View>
        </View>

       
      </TouchableOpacity>
    </View>
    <ScrollView
    showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}

    >
      <View style={{ height: 250 }}>
        <View style={styles.pagination}>
          <View
            style={{
              backgroundColor: "#333",
              padding: 5,
              paddingLeft: 8,
              paddingRight: 8,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
               {pagination +1} / {images.length}
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
                openCollection()
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
           
        <PagerView style={{ height: 250, }}
        
          onPageSelected={(event) => handlePageChange(event.nativeEvent.position)}
        >
 

          {
            images.map((item,_index) => [
             
              <Pressable key={_index+1} onPress={()=>setCoverImageModal(true)}>
      
                <ImageBackground source={{uri:`${apiUrl}/housing_images/${item}`}} style={{width:'100%',height:'100%'}}/>
              
                </Pressable>
             
            ])
          }
{/*        
                    <ImageBackground
                      source={{uri:`${apiUrl}${image.image.replace("public",'storage')}`}}
                      style={{ width: "100%", height: "100%", }}
                     
                      resizeMode='cover'
                    
                    /> */}
            
   
        </PagerView>
       
     
      </View>
      <Shadow  style={{width:'100%',margin:7,padding:10,}}> 
      <View style={{ paddingTop: 8, gap: 10,}}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#333",
            fontWeight: "400",
          }}
        >
        {data?.housing?.city?.title} / {data?.housing?.county?.title}
        </Text>
         {/* <Text style={{textAlign:'center',color: "#264A" ,fontSize:15}}>{addDotEveryThreeDigits(JSON.parse(data?.housing?.housing_type_data)?.price)} ₺</Text>   */}
        <Text style={{ textAlign: "center", fontSize: 15, color: "#264ABB" }}>
       {data?.pageInfo?.meta_title} 
     
        </Text>
       
      </View>

      <View style={{justifyContent:'center',alignItems:'center'}}>
   
        <SliderMenuRealtorDetails
          tab={tabs}
          setTab={setTabs}
          changeTab={changeTab}
        />
      
      
    
      </View>
      </Shadow>
      
      
          {tabs==0 && <RealtorCaption data={data}/>}
          {tabs == 1 && <Settings data={data} />}
          {tabs== 2 && <RealtorMap mapData={data}/>}
          {tabs==3 && <Comment data={data} handleModal={handleModal}/> }
          {tabs==4 && <SwapForm data={data} openModal={openSwapAler} color={setcolorAlert} />}
   
{/* 
              {
                ProjectHomeData.projectHousingsList((item,index)=>(
                  <Text>asd</Text>
                    // <Posts
                    //     key={index}
                    // />
                ))
              } */}
     
      

      <Modal
        isVisible={IsOpenSheet}
        onBackdropPress={ToggleSheet}
        swipeDirection={["down"]}
        backdropColor="transparent"
        style={styles.modal2}
      >
        <View style={styles.modalContent3}>
          <Text style={styles.modalText3}>Paylaş</Text>
        </View>
      </Modal>
      <Modal
          isVisible={ColectionSheet}
          onBackdropPress={ToggleColSheet}
      
          animationIn={'fadeInDown'}
          animationOut={'fadeOutDown'}
          animationInTiming={200}
          animationOutTiming={200}
          backdropColor="transparent"
          style={styles.modal4}
        >
          <View style={styles.modalContent4}>
            <SafeAreaView>
                <View style={{padding:20,paddingTop:24,gap:13,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
                  <Text style={{color:'#19181C',textAlign:'center',fontSize:16,fontWeight:'400'}}>Koleksiyona Ekle</Text>
                  <Text style={{textAlign:'center',color:'#B2B2B2',fontSize:14}}>Konutu koleksiyonlarından birine ekleyebilir veya yeni bir koleksiyon oluşturabilirsin</Text>
                </View>
                
                <ScrollView  contentContainerStyle={{paddingLeft:10,paddingRight:10,paddingTop:4,gap:10,paddingBottom:100}}>
                  <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
                    onPress={()=>{
                      setColectionSheet(false)
                      setTimeout(() => {
                        setaddCollection(true)
                      }, 700);
                   
                     
                    }}
                  >
                    <View style={{padding:0,alignItems:'center',justifyContent:'center'}}>
                    <Icon name="pluscircleo" size={27} color={'#19181C'}/>
                    </View>
                    <View style={{width:'100%',borderBottomWidth:1,padding:15,borderBottomColor:'#ebebeb'}}>
                      <Text style={{fontSize:13,color:'#19181C',fontWeight:'600'}}>Yeni Oluştur</Text>
                    </View>
                  </TouchableOpacity>
                     {
                        collections.map((item,index)=>(
                          <AddCollection  key={index} item={item} getCollectionId={getCollectionId} addLink={addSelectedCollection}/> 
                        ))

                      }
              
                

                </ScrollView>
                </SafeAreaView> 
          </View>
        </Modal>

        <Modal
          isVisible={addCollection}
          onBackdropPress={()=>setaddCollection(false)}
      
          animationIn={'fadeInRight'}
          animationOut={'lightSpeedOut'}
          animationInTiming={200}
          animationOutTiming={200}
 
          style={styles.modal5}
        >
          <View style={styles.modalContent5}>
                
                <ScrollView bounces={false} contentContainerStyle={{paddingLeft:10,paddingRight:10,paddingTop:4,gap:10,paddingBottom:20}}>
                  <SafeAreaView>
               
                    <View style={{flexDirection:'row',padding:10,alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
                    <TouchableOpacity style={{flexDirection:'row',alignItems:'center',flex:0.5/2}}
                      onPress={()=>{
                        setaddCollection(false)
                      }}
                  >
                    <View style={{padding:0,alignItems:'center',justifyContent:'center'}}>
                    <Icon name="close" size={27} color={'#19181C'}/>
                    </View>
                 
                  </TouchableOpacity>
                  <View style={{flex:1/2}}>
                    <Text style={{color:'#19181C',textAlign:'center',fontSize:16,fontWeight:'400'}}>Koleksiyon Oluştur</Text>
                  </View>
                    </View>
                        <View style={{gap:6,justifyContent:'center',paddingTop:20}}>
                          <Text style={{fontSize:13,color:'#19181C'}}>Koleksiyon İsmi</Text>
                          <TextInput
                  style={styles.Input}
                      value={newCollectionNameCreate}
                      onChangeText={(value)=>setnewCollectionNameCreate(value)}
             
                />
             
                        </View>
                        <View style={{paddingTop:80}}>
                        <TouchableOpacity style={{backgroundColor:'#EA2A28',padding:10,borderRadius:6}}
                            onPress={()=>{
                              addCollectionPost()
                            }}
                        >
                          <Text style={{textAlign:'center',color:'white'}}>Koleksiyon Oluştur</Text>
                        </TouchableOpacity>
                        </View>
                      
                  </SafeAreaView>
                
              
              
                  

                </ScrollView>
                
          </View>
        </Modal>

      <Modal
        isVisible={modalVisibleComennet}
        onBackdropPress={() => setmodalVisibleComment(false)}
        backdropColor="transparent"
        style={styles.modal2}
      >
        <View style={styles.modalContent2}>
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
          <Text style={{textAlign:'center',fontSize:16}}>Konutu Değerlendir</Text>
          <TouchableOpacity 
          onPress={()=>setmodalVisibleComment(false)}
            style={{
              backgroundColor:'#E54242',
              width:'30%',
              padding:8,
              borderRadius:5
          
            }}
          >
            <Text style={{textAlign:'center',color:'white'}}>İptal Et</Text>
          </TouchableOpacity>
          </View>
         <TouchableOpacity>
              <View style={{ flexDirection: "row", gap: 4, alignItems: "center", borderBottomWidth:1,borderBottomColor:'#ebebeb',padding:10}}>
          <View style={{ height: 35, width: 35 }}>
            {
              data?.housing?.user?.profile_image ? 
              <ImageBackground
              source={{
               uri: `${apiUrl}/storage/profile_images/${data?.housing?.user?.profile_image}`,
              }}
             style={{ width: "100%", height: "100%" }}
             borderRadius={20}
           /> :
           <ImageBackground
           source={{
            uri: `${apiUrl}/storage/profile_images/indir.png`,
           }}
          style={{ width: "100%", height: "100%" }}
          borderRadius={20}
        />
            }
          
          </View>

          <Text style={{ color: "#333" }}>
            {data?.housing?.user?.name }
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
              source={require('../BadgeYellow.png')}
              style={{ width: "100%", height: "100%" }}
            /> 
          </View>
        </View>
            </TouchableOpacity>
               <View style={{flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'center',gap:20,paddingTop:15}}>
               {[...Array(5)].map((_, index) => (
                <View key={index}>
        <TouchableOpacity  onPress={() => handleStarPress(index)}>
          <Ionicons
            name={index < rating ? 'md-star' : 'md-star-outline'}
            size={30}
            color={index < rating ? 'gold' : 'gray'}
          />
        </TouchableOpacity>
        </View>
      ))}
    


                </View>        
                <View style={{paddingTop:20,gap:5}}>
                  <Text style={{fontSize:13}}>Yorumunuz</Text>
        <TextInput style={{borderWidth:1,padding:9,borderRadius:6,borderColor:'#ebebeb',backgroundColor:'#EDEFF7'}}placeholder="Örn:Mahalle gerçekten çok nezih " />
      </View>
      <View style={{marginTop:15}}>
     <ScrollView horizontal style={{height:100,gap:10}} contentContainerStyle={{gap:15}} bounces={false} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={{backgroundColor:'#f2f2f2',height:100,borderWidth:1,borderStyle:'dashed',borderColor:'grey', width:100,alignItems:'center',justifyContent:'center'}}>
        <View style={{alignItems:'center'}}>
        <Ionicons name="camera-outline"size={30} color={'#EA2B2E'}/>
          <Text style={{fontSize:10,color:'#333'}}>Fotoğraf Ekle</Text>
        </View>
        </TouchableOpacity>
     
     
      
     </ScrollView>
     </View>
     <View style={{width:'100%',alignItems:'center'}}>
     <CheckBox
                checked={checked}
                onPress={toggleCheked}
                // Use ThemeProvider to make change for all checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="#E54242"
                title={
                  <View style={{ paddingLeft: 10 }}>
                    <Text>
                      <Text style={{ fontSize: 13 }} numberOfLines={2}>
                 Yorumlarda ismiminin gözükmesine ve yorum detaylanının site genelinde kullanılmmasına izin veriyorum.
                      </Text>
                      <Text style={{ fontSize: 13 }}>Aydınlatma Metnine ulaşmak için tıklayınız</Text>
                    </Text>
                  </View>
                }
          containerStyle={{backgroundColor:'white',borderWidth:0.5,borderColor:'#ebebeb'}}
           
              />
     </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleAlert}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleAlert(!modalVisibleAlert);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{height:'100%',padding:10,borderRadius:0,backgroundColor:colorAlert ,flexDirection:'row',alignItems:'center'}]}>
            <View style={{flex:0.3/2,padding:2,alignItems:'center',justifyContent:'center'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisibleAlert(!modalVisibleAlert)}>
          <Icon name="closesquare" size={40} color={'red'}/>
            </Pressable> 
            </View>
        <View style={{flex:1.5/2}}>
        <Text style={{textAlign:'center',fontSize:15,color:'red'}}>{AlertMessage}</Text>
        </View>
           
          
          </View>
        </View>
      </Modal>
      <Modal
          isVisible={showCoverImageModal}
          onBackdropPress={()=>setCoverImageModal(false)}
          swipeDirection={["down"]}
          animationIn={'fadeInRightBig'}
          animationOut={'fadeOutDownBig'}
                onSwipeComplete={()=>setCoverImageModal(false)}
          backdropColor="transparent"
          style={styles.modalImage}
        >
          <View style={styles.modalContentImage}>
                 <View style={{alignItems:'flex-end',marginBottom:20}}>
                  <TouchableOpacity onPress={()=>setCoverImageModal(false)}>
                  <CloseIcon name="close" color={'white'} size={30}/>
                  </TouchableOpacity>
                
                 </View>
                
            <PagerView style={{ height: 300 }}
            initialPage={selectedImage}
            onPageSelected={(event) => handlePageChange(event.nativeEvent.position)}
            
          >
                  {
            images.map((item,_index) => [
             
              <View key={_index} style={{}}>
      
                <ImageBackground source={{uri:`${apiUrl}/housing_images/${item}`}} style={{width:'100%',height:'100%'}}/>
              
              </View>
             
            ])
          }
            {/* {
              data.housing.images.map((image,index) => {
                // console.log(`${apiUrl}${image.image.replace("public",'storage')}`)
                return(
                  <Pressable key={index+1} onPress={()=>setCoverImageModal(true)}>
                    <ImageBackground
                      source={{uri:`${apiUrl}${image.image.replace("public",'storage')}`}}
                      style={{ width: "100%", height: "100%", }}
                     
                      resizeMode='cover'
                    
                    />
                  </Pressable>
                )
              })
            } */}
            
          </PagerView>

                 </View>
     
        </Modal>

        <Modal
          isVisible={ModalForAddToCart}
          onBackdropPress={()=>setModalForAddToCart(false)}
      
          animationIn={'zoomInUp'}
          animationOut={'zoomOutUp'}
          animationInTiming={200}
          animationOutTiming={200}
          backdropColor="transparent"
          style={styles.modal6}
        >
          <View style={styles.modalContent6}>
            <View style={{padding:10,gap:10}}>
           <Text style={{textAlign:'center'}}>#1000{data?.housing?.id} No'lu Konutu Sepete Eklemek İsteiğinize Eminmisiniz?</Text>
           <View style={{flexDirection:'row',justifyContent:'center',gap:20}}>

            <TouchableOpacity style={{backgroundColor:'green',padding:10,paddingLeft:20,paddingRight:20,borderRadius:6}}
              onPress={()=>{
                addToCard() 
              }}
            >
              <Text style={{color:'white'}}>Sepete Ekle</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:'#e44242',padding:10,paddingLeft:20,paddingRight:20,borderRadius:6}}
                onPress={()=>{
                  setModalForAddToCart(false)
                }}
            >
              <Text style={{color:'white'}}>Vazgeç</Text>
            </TouchableOpacity>

           </View>

            </View>

          </View>
        </Modal>
    </ScrollView>




  </SafeAreaView>
)
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#ECECF2', // Top bar background color
  },
  segment: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  selectedSegment: {
    backgroundColor: '#3498db', // Selected segment color
  },
  segmentText: {
    color: '#2c3e50', // Segment text color
  },
  viewPager: {
    height: 250
  },
  Info: {
    
    width: '100%',
    top: 20,
    height: 240
  },
  text:{
    fontSize:11,
    fontWeight:'300',
   
    color:'grey'
  },
  btnText:{
    fontSize:15,
    textAlign:'center',
    color:'white',
    fontWeight:'500',
    letterSpacing:1,
  
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
modal: {
  justifyContent: "flex-end",
  margin: 0,
},
modalContent2: {
  backgroundColor: "white",
  padding: 20,
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
  borderRadius: 5,
  bottom: 0,
  alignItems: "center",

  width: "100%",
},other:{
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
modal2: {
  justifyContent: "flex-end",
  margin: 0,
},
modalContent2: {
  backgroundColor: "white",
  padding: 20,
  height: "88%",

},
modal3: {
  justifyContent: "flex-end",
  margin: 0,
},
modalContent3: {
  backgroundColor: "white",

  height: "35%",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
},
modal4: {
  justifyContent: "flex-end",
  margin: 0,
  backgroundColor:'#1414148c'
},
modalContent4: {
  backgroundColor: "#fefefe",

  height: "52%",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
},
modal5: {
  justifyContent: "flex-end",
  margin: 0,
  backgroundColor:'#1414148c'
},
modalContent5: {
  backgroundColor: "#fefefe",

  height: "100%",

},
centeredViewSave: {
  padding: 10,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",

  // modal dışı koyu arkaplan
},
modalViewSave: {
  width: "100%",

  backgroundColor: "red",
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
modalImage: {
  justifyContent: "flex-end",
  margin: 0,
},
modalContentImage: {
  backgroundColor: "black",
  justifyContent:'center',
  
flex:1
  
},

Input: {
  backgroundColor:'#E6E6E6',
  padding: 10,
  borderWidth: 1,
  borderColor: "#ebebeb",
  borderRadius: 5,
  fontSize: 14,
},
modal6: {
  justifyContent: "center",
  margin: 0,
  padding: 20,
  backgroundColor: "#1414148c",
},
modalContent6: {
  backgroundColor: "#fefefe",
  padding: 20,
  borderRadius: 5,
},
});

