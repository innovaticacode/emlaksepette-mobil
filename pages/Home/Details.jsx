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
import Comment from "../../components/Comment";
import Map from "../../components/Map";
import Icon2 from 'react-native-vector-icons/Feather';
import DetailsPicture from "../../components/DetailsPicture";
import ShoppinInfo from "../../components/ShoppinInfo";
import { FAB } from 'react-native-elements';

export default function Details() {
  const [tabs, setTabs] = useState(0);
 
  const [modalVisible, setModalVisible] = useState(false);

  return (

    <ScrollView style={{ backgroundColor: 'white' }} indicatorStyle="white">
      <View style={{ flex: 1, height: 1590, }}>
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
            style={{ width: '100%', height: 100, gap: 10 }}
          >
           
            <View style={{ }}>
              <View style={{ width: '100%',paddingLeft:10,paddingRight:6 }}>
                <Text style={{ fontSize: 20,  }}>
                  Master Realtor'den Kuruçeşme Hatip Köyde 2+1 daire
                </Text>
              </View>
            </View>
            <View style={{ padding:7 }}>
              <Text style={{ color: "#3A811D", fontSize: 21, fontWeight: "bold" }}>
                2.500.000 ₺
              </Text>
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
              <Text style={styles.text}>İstanbul/Kartal/Cevizli</Text>
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
              bottom:10,

              display: "flex",
              flexDirection: "row",
              gap: 5
            }}
          >
            <TouchableOpacity
              onPress={() => setTabs(0)}
              style={{
                width: "23%",
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
                width: "23%",
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
                width: "23%",
                backgroundColor: tabs === 2 ? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40
              }}
            >
              <Text  style={{ color: tabs === 2 ? "white" : "black" }}>Harita</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTabs(3)}
              style={{
                width: "23%",
                backgroundColor: tabs === 3 ? "#ea2a28" : "#EFEFEF",
                alignItems: "center",
                justifyContent: 'center',
                height: 40

              }}
            >
              <Text style={{ color: tabs === 3 ? "white" : "black" }}>Yorumlar</Text>
            </TouchableOpacity>
            
          </View>

          <View style={{ width: '100%', height:tabs===2 ?400:740}}>
            {tabs === 0 && <Settings />}
            {tabs === 1 && <Caption />}
            {tabs === 2 && <Map />}
            {tabs === 3 && <Comment />}
          </View>
          <View style={styles.Info}>
          <ShoppinInfo top={tabs===0? 'none':'flex' && tabs===2? 'none':'flex'} />

          </View>
         
        </View>
        <View style={{
          width:'100%',
          display:'flex',
          justifyContent:'space-between',
          flexDirection:'row',
          alignItems:'center',
          padding:10,
          position:'absolute',
          bottom:790
        }}>
        <TouchableOpacity style={{width:'40%',height:50,
        backgroundColor:'red',
          alignItems:'center',
          justifyContent:'center'
          

      }}>
          <Text  style={{
        fontSize:20,
        color:'white'
      }}>Ara</Text>

        </TouchableOpacity>
        <TouchableOpacity style={{width:'40%',height:50,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'

      }}>
      <Text style={{
        fontSize:20,
        color:'white'
      }}>Sepete Ekle</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

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
  }
});
