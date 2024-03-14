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
  Modal,
  Linking,
  
 
} from "react-native";


import { React, useRef, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Caption from "../../components/Caption";
import Settings from "../../components/Settings";
import PagerView from 'react-native-pager-view';
import Map from "../../components/Map";
import Icon2 from 'react-native-vector-icons/Feather';
import DetailsPicture from "../../components/DetailsPicture";
import ShoppinInfo from "../../components/ShoppinInfo";
import * as Clipboard from 'expo-clipboard';

import OtherHomeInProject from "../../components/OtherHomeInProject";
import PaymentDetail from "../../components/PaymentDetail";
import Alert from "../../components/Alert";
import FloorPlan from "../../components/FloorPlan";
import Information from "../../components/Information";
import LinkIcon3 from "react-native-vector-icons/Feather"
import LinkIcon4 from "react-native-vector-icons/Fontisto"
import LinkIcon2 from "react-native-vector-icons/FontAwesome"
import LinkIcon from "react-native-vector-icons/Entypo"
import { useRoute } from '@react-navigation/native';
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";

export default function Details({navigation}) {
  const [showAlert, setshowAlert] = useState(false)
  const [tabs, setTabs] = useState(0);
  const [heart, setHeart] = useState('hearto');
  const [bookmark, setbookmark] = useState('bookmark-o')
  const changeHeart = () => {
    setHeart(heart === 'hearto' ? 'heart' : 'hearto');

  };
  const changeBookmark=()=>{
    setbookmark(bookmark==='bookmark-o' ? 'bookmark': 'bookmark-o')
  }
  const route = useRoute();
 
  const {  otherParam ,konum,ımage,sehir,acıklama, ShoppingName,ShoppingMail,ShopingInfo, Phone,slug,ProjectId} = route.params;
 
  const translateY = useRef(new Animated.Value(400)).current;

  const openSheet = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }; 

  const shareLinkOnWhatsApp = () => {
 
    const url=`https://emlaksepette.com/proje/${slug}//1000${ProjectId}/detay`
  
 
    const whatsappShareURL = `whatsapp://send?text=${encodeURIComponent(url)}`;
  
   
    Linking.openURL(whatsappShareURL)
      .then(() => console.log('WhatsApp açıldı ve link paylaşıldı'))
      .catch((error) => console.error('WhatsApp açılamadı:', error));
  };
  const shareLinkOnInstagram = (text) => {
 
    const url=`https://emlaksepette.com/proje/${slug}/100${ProjectId}/detay`
  
   
    const instagramShareURL = `instagram://story/?text=${encodeURIComponent(url)}`;
  
   
    Linking.openURL(instagramShareURL)
      .then(() => console.log('Instagram açıldı ve link paylaşıldı'))
      .catch((error) => console.error('Instagram açılamadı:', error));
  };
  const copyToClipboard = () => {
    const url=`https://emlaksepette.com/proje/${slug}/1000${ProjectId}/detay`
    Clipboard.setStringAsync(url);
    ShowAlert()
  };
  const handleShareViaSMS = (text) => {
    const url = text; 
    const message = `Bu linki kontrol et: ${url}`;

 
    Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
  };
  const ShowAlert = ()=>{
        setshowAlert(true)
        setTimeout(() => {
          setshowAlert(false)
        }, 2000);
  }
  const [alert, setalert] = useState(false)
const getAlert = ()=>{
 
 setalert(!alert)

}
  return (
      <View>
      
    <ScrollView style={{ backgroundColor: 'white' }} indicatorStyle="white" onTouchStart={closeSheet} >
      <View style={{ flex: 1, height:tabs===4 ?1000:1590 && tabs===3 ?1370:1590 && tabs===2?1360:1590 && tabs===1?1100:1490 && tabs===0 ? 1600:1590
      && tabs===5 ? 'auto':1500
      }}>
    <View style={{position:'absolute',zIndex:1,display:heart=='heart-o'?'flex':'none'}}>

      <Alert text= {alert===true?'Favorilere Eklendi':'Favorilerden Kaldırıldı'}/>
      </View>
      <View
          style={{
            width: 50,
            height: 150,
            backgroundColor: "transparent",
            position: "absolute",
            right: 20,
            top: 43,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 20,
            zIndex:1
          }}
        >
          <TouchableOpacity onPress={openSheet}>
            <View
              style={{
                backgroundColor: "#FFFFFFAD",
                justifyContent: "center",
                width: 40,
                height: 40,
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Icon name="sharealt" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            getAlert()
            changeHeart()
          }}>
            <View
              style={{
                backgroundColor: "#FFFFFFAD",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Heart name={heart} size={20} color={heart=='hearto'?'black':'red'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={changeBookmark}>
            <View
              style={{
                backgroundColor: "#FFFFFFAD",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
            >
              <Bookmark name={bookmark} size={20} color={bookmark=='bookmark-o'?'black':'red'} />
            </View>
          </TouchableOpacity>
        </View>
        <PagerView style={styles.viewPager} >
      
          <View style={styles.page} key="1">
            <DetailsPicture ımage={ımage}/>
          </View>
          <View style={styles.page} key="2">
            <DetailsPicture />
          </View>
          <View style={styles.page} key="3">
            <DetailsPicture />
          </View>
          <View style={styles.page} key="4">
            <DetailsPicture />
          </View>
        </PagerView>
        <View
          style={{
            width: "100%",
            height: 500,

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            top: 5,
          }}
        >
          <View
            style={{ width: '100%', height: 40, gap: 10 }}
          >
           
            <View style={{ }}>
            <View style={{width:'100%',paddingLeft:10, alignItems:'center',top:3}}>
              <Text style={styles.text}>{konum} / {sehir}</Text>
            </View>
              <View style={{ width: '100%',paddingLeft:10,paddingRight:6 ,top:15}}>
                <Text style={{ fontSize: 17, textAlign:'center', color:'#264ABB' }}>
                  {otherParam}
                </Text>
              </View>
            </View>
          
          

            <View style={{
              width:'100%',
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',
              bottom:7
            }}
              >

           
            </View>
    
          
          </View>
         
          <View
            style={{
              width: "100%",
              height: 70,

              justifyContent: 'center',
              top: 35,
             

              display: "flex",
              flexDirection: "row",
              gap: 5
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{width:800,display:'flex',flexDirection:'row',gap:5,marginLeft:10,marginRight:-90}}>
            <TouchableOpacity
              onPress={() => setTabs(0)}
              style={{
                width: '15%',
                backgroundColor: tabs === 0 ? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40
              }}
            >
              <Text  style={{ color: tabs === 0 ? "white" : "black",fontSize:12 }}>Projedeki İlanlar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTabs(1)}
              style={{
                width: '15%',
                backgroundColor: tabs === 1 ? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40
              }}
            >
              <Text  style={{ color: tabs === 1 ? "white" : "black",fontSize:12  }}>Açıklama</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTabs(2)}
              style={{
                width: '15%',
                backgroundColor: tabs === 2 ? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40

              }}
            >
              <Text  style={{ color: tabs === 2? "white" : "black",fontSize:12  }}>Genel Bilgi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTabs(3)}
              style={{
                width: '15%',
                backgroundColor: tabs === 3 ? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40
              }}
            >
              <Text  style={{ color: tabs === 3 ? "white" : "black" ,fontSize:12 }}>Özellikler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTabs(4)}
              style={{
                width: '10%',
                backgroundColor: tabs === 4 ? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40

              }}
            >
              <Text style={{ color: tabs === 4 ? "white" : "black" ,fontSize:12 }}>Harita</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTabs(5)}
              style={{
                width: '15%',
                backgroundColor: tabs ===5? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40

              }}
            >
              <Text style={{ color: tabs === 5? "white" : "black",fontSize:12  }}>Vaziyet & Kat Planı</Text>
            </TouchableOpacity>
        
            </View>
            </ScrollView>
          </View>
       
          <View style={{ width: '100%', height:tabs===4 ?700:740}}>
            {tabs === 0 && <OtherHomeInProject/>}
            {tabs === 1 && <Caption acıklama={acıklama}/>}
            {tabs === 2 && <Information ShoppingName={ShoppingName} ShopingInfo={ShopingInfo} ShoppingMail={ShoppingMail} Phone={Phone}/>}
            {tabs === 3 && <Settings/> }
            {tabs === 4 && <Map/>}
            {tabs===5&& <FloorPlan/>}
          </View>
         
         
        </View>
      
      </View>

    </ScrollView>
   
    <View style={{ flex: 1 }}>
   
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#eeeeee',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
         paddingTop:20,
         paddingBottom:30,
         paddingLeft:10,
          paddingRight:10,
         
          transform: [{ translateY }],
        }}
      >
         <View style={{display:showAlert? 'flex':'none', justifyContent:'center',alignItems:'center',paddingBottom:15}}>
          <View style={{padding:11, backgroundColor:'#6fdb4e97',display:showAlert? 'flex':'none' , flexDirection:'row',alignItems:'center',gap:15,borderRadius:10,}}>
            <Text style={{textAlign:'center',color:'white'}}>Bağlantı Panoya Kopyalandı</Text>
            <Heart name="check" size={20} color={'white'}/>
       </View>  
       </View>
          <ScrollView horizontal  style={{padding:5}}   showsHorizontalScrollIndicator={false}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',gap:27}}>
            <TouchableOpacity style={{alignItems:'center'}}
              onPress={()=>{
                copyToClipboard()
              }}
            >
            <View style={styles.shareIcons}>
             <LinkIcon name="link" size={23}/>
            
            </View>
            <Text>Kopyala</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}}
          onPress={()=>{
            shareLinkOnWhatsApp(acıklama)
          }} 
          >
            <View style={styles.shareIcons}>
             <LinkIcon2 name="whatsapp" size={23}/>
            </View>
            <Text>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}}
          onPress={()=>{
            shareLinkOnInstagram('dlkflksdf')
          }}
          >
            <View style={styles.shareIcons}>
             <LinkIcon name="instagram" size={23}/>
            </View>
            <Text>İnstagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}}>
            <View style={styles.shareIcons}>
             <LinkIcon2 name="facebook" size={23}/>
            </View>
            <Text>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}}
              onPress={()=>{
                handleShareViaSMS(konum)
              }}
          >
            <View style={styles.shareIcons}>
             <LinkIcon3 name="message-circle" size={23}/>
            </View>
            <Text>Mesajlar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}}>
            <View style={styles.shareIcons}>
             <LinkIcon4 name="messenger" size={23}/>
            </View>
            <Text>Messenger</Text>
          </TouchableOpacity>
            </View>
          </ScrollView>
    
       
      </Animated.View>
    </View>

    
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#ecf0f1', 
  },
  segment: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  selectedSegment: {
    backgroundColor: '#3498db',
  },
  segmentText: {
    color: '#2c3e50', 
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
    fontSize:20,
    textAlign:'center',
    color:'white',
    fontWeight:'400',
    letterSpacing:1
  },
  openButton: {
    backgroundColor: '#f194ff',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheetText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#f194ff',
    borderRadius: 20,
    padding: 10,
    alignSelf: 'flex-end',
  },
  shareIcons:{
    backgroundColor: "#dbdbdb",
    justifyContent: "center",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    bottom:2
  }
});