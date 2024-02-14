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
import Caption from "../../components/Caption";
import Settings from "../../components/Settings";
import PagerView from 'react-native-pager-view';

import Map from "../../components/Map";
import Icon2 from 'react-native-vector-icons/Feather';
import DetailsPicture from "../../components/DetailsPicture";
import ShoppinInfo from "../../components/ShoppinInfo";

import OtherHomeInProject from "../../components/OtherHomeInProject";
import PaymentDetail from "../../components/PaymentDetail";
import FloorPlan from "../../components/FloorPlan";
import Information from "../../components/Information";


import { useRoute } from '@react-navigation/native';
import Heart from "react-native-vector-icons/AntDesign";
import Bookmark from "react-native-vector-icons/FontAwesome";

export default function Details() {
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
  const {  otherParam ,konum} = route.params;
  return (
      <View>
     
        
    <ScrollView style={{ backgroundColor: 'white' }} indicatorStyle="white">
      <View style={{ flex: 1, height:tabs===4 ?1100:1590 }}>
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
            <DetailsPicture />
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
              <View style={{ width: '100%',paddingLeft:10,paddingRight:6 }}>
                <Text style={{ fontSize: 16,  }}>
                  {otherParam}
                </Text>
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
              <Text style={styles.text}>{konum}</Text>
            </View>
            <View style={{width:'50%',paddingRight:10, alignItems:'flex-end'}}>
              <Text style={styles.text} >İlan No:0000000</Text>
            </View>
           
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
            <ScrollView horizontal indicatorStyle="white" >
              <View style={{width:800,display:'flex',flexDirection:'row',gap:5,marginLeft:10,marginRight:-130}}>
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
              <Text  style={{ color: tabs === 0 ? "white" : "black",fontSize:12 }}>Projedeki Konutlar</Text>
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
                width: '10%',
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
                width: '14%',
                backgroundColor: tabs ===5? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40

              }}
            >
              <Text style={{ color: tabs === 5? "white" : "black",fontSize:12  }}>Vaziyet&Kat planı</Text>
            </TouchableOpacity>
        
            </View>
            </ScrollView>
          </View>
       
          <View style={{ width: '100%', height:tabs===4 ?700:740}}>
            {tabs === 0 && <OtherHomeInProject/>}
            {tabs === 1 && <Caption/>}
            {tabs === 2 && <Information/>}
            {tabs === 3 && <Settings/> }
            {tabs === 4 && <Map/>}
            {tabs===5&& <FloorPlan/>}
          </View>
          <View style={styles.Info}>
          <ShoppinInfo flex={  tabs===3? 'none':'flex'} bottom={tabs ===2 ?120:0} />
      
          </View>
         
        </View>
      
      </View>

    </ScrollView>
  
    </View>

  );
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
    fontSize:20,
    textAlign:'center',
    color:'white',
    fontWeight:'400',
    letterSpacing:1
  }
});