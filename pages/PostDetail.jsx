import {
    View,
    Text,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
  
    Button, Modal,
  } from "react-native";
  import { React, useRef, useState } from "react";
  import Icon from "react-native-vector-icons/AntDesign";


  import PagerView from 'react-native-pager-view';
  import { useRoute ,Dimensions } from '@react-navigation/native';
  import Heart from "react-native-vector-icons/AntDesign";
  import Bookmark from "react-native-vector-icons/FontAwesome";
import OtherHomeInProject from "../components/OtherHomeInProject";
import Information from "../components/Information";
import Map from "../components/Map";
import FloorPlan from "../components/FloorPlan";
import Settings from "../components/Settings";
import Caption from "../components/Caption";
import DetailsPicture from "../components/DetailsPicture";
import ShoppinInfo from "../components/ShoppinInfo";
import Comment from "../components/Comment";
import DetailsSettings from "../components/PostDetailsSettings/DetailsSettings";
import PaymentDetail from "../components/PaymentDetail";




export default function PostDetail() {
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
  const {   konum ,caption,location,price} = route.params;
 
  return (
    
    <SafeAreaView>
      <View style={{
    position:'absolute',
    zIndex:1,
    width:'100%',
    height:'7%',
  
    bottom:30,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    paddingRight:20,
    paddingLeft:20
 }}>
    <TouchableOpacity 
   
    style={{
      width:'30%',
      height:'80%',
      backgroundColor:'#284ABB',
    
      justifyContent:'center'
    }}>
      <Text style={styles.btnText}>Ara</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{
      width:'35%',
      height:'80%',
      backgroundColor:'#284ABB',
    
      justifyContent:'center'
    }}>
      <Text style={styles.btnText}>Sepete Ekle</Text>
    </TouchableOpacity>
    
 </View>
        
    <ScrollView style={{ backgroundColor:'white' }} indicatorStyle="white">
      <View style={{ flex: 1, height:tabs===3 ?1000: 1590 }}>
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
          <TouchableOpacity>
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
          <TouchableOpacity onPress={changeHeart}>
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
           <DetailsPicture/>
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
            style={{ width: '100%', height: 80, gap: 20 }}
          >
           
            <View style={{ }}>
              <View style={{ width: '100%',paddingLeft:10,paddingRight:6 }}>
                <Text style={{ fontSize: 16,  }}>
                 {caption}
                </Text>
                <Text style={{
                    fontSize:16,
                    color:'#264ABB',
                    fontWeight:'bold',
                    top:10
                }}>{price}</Text>
              </View>
            </View>
          
            <View
              style={{
                backgroundColor: "grey",
                width: "100%",
                height: 0.4,
                bottom: 5,
              }}
            ></View>

            <View style={{
              width:'100%',
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',
              bottom:7
            }}
              >

            <View style={{width:'50%',paddingLeft:10,}}>
              <Text style={styles.text}>{location}</Text>
            </View>
            <View style={{width:'50%',paddingRight:10, alignItems:'flex-end'}}>
              <Text style={styles.text} >İlan No:0000000</Text>
            </View>
           
            </View>
    
          
          </View>
         
          <View
            style={{
              width: "100%",
              height: 80,

              justifyContent: 'center',
              top: 40,
             

              display: "flex",
              flexDirection: "row",
              gap: 5
            }}
          >
            <ScrollView horizontal indicatorStyle="white" style={{marginLeft:-20,marginRight:-14,top:10}}>
              <View style={{width:800,display:'flex',flexDirection:'row',gap:5,justifyContent:'center'}}>
         
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
              <Text  style={{ color: tabs === 0 ? "white" : "black" }}>Özellikler</Text>
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
              <Text  style={{ color: tabs === 1 ? "white" : "black" }}>Açıklama</Text>
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
              <Text style={{ color: tabs === 2? "white" : "black" }}>Ödeme Planı</Text>
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
              <Text style={{ color: tabs === 3 ? "white" : "black" }}>Harita</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTabs(4)}
              style={{
                width: '15%',
                backgroundColor: tabs === 4 ? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40

              }}
            >
              <Text style={{ color: tabs === 4? "white" : "black" }}>Vaziyet&Kat Planı</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTabs(5)}
              style={{
                width: '15%',
                backgroundColor: tabs === 5 ? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40

              }}
            >
              <Text style={{ color: tabs === 5? "white" : "black" }}>Yorumlar</Text>
            </TouchableOpacity>
        
            </View>
            </ScrollView>
          </View>
       
          <View style={{ width: '100%', height:tabs===4 ?700:740}}>
            {tabs === 0 && <DetailsSettings/>}
            {tabs === 1 && <Caption/>}
            {tabs === 2 && <PaymentDetail/>}
            {tabs === 3 && <Map/>}
            {tabs === 4 && <FloorPlan/>}
            {tabs === 5 && <Comment/>}
           
          </View>
          <View style={styles.Info}>
          <ShoppinInfo flex={  tabs===0? 'none':'flex' && tabs===3?'none':'flex'} bottom={tabs ===2 ?350:0} />
              
          </View>
         
        </View>
      
      </View>

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
      backgroundColor: '#ecf0f1', // Top bar background color
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
      fontWeight:'500',
      fontFamily:'Verdana',
      color:'grey'
    },
    btnText:{
      fontSize:15,
      textAlign:'center',
      color:'white',
      fontWeight:'400',
      letterSpacing:1
    }
  });

{/* */}