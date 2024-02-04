import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList
} from "react-native";
import {React,useState} from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Caption from "../../components/Caption";
import Settings from "../../components/Settings";
import PagerView from 'react-native-pager-view';
import Comment from "../../components/Comment";
import Map from "../../components/Map";
import Icon2 from 'react-native-vector-icons/Feather';
import DetailsPicture from "../../components/DetailsPicture";
export default function Details() {
    const [tabs, setTabs] = useState(0);
   
    
  return (
    
    <ScrollView style={{backgroundColor:'white'}}>
    <View style={{flex:1,height:1200}}>
    <PagerView style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
       <DetailsPicture/>
        </View>
        <View style={styles.page} key="2">
        <DetailsPicture/>
        </View>
        <View style={styles.page} key="3">
        <DetailsPicture/>
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
          style={{ width: 400, height: 100, gap: 10 }}
        > 
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
        <View>
        <Text style={{ fontSize: 15, fontWeight: "bold",  }}>
            İlan No:0000000
          </Text>
        </View>
        <View>
            <Text style={{fontSize:15,fontWeight:'bold'}}>Koceli/İzmit</Text>
        </View>
          
          </View>

          <View style={{width:'100%',alignItems:'center'}}>
          <Text style={{ fontSize: 20 }}>
            Master Realtor'den Kuruçeşme Hatip Köyde 2+1 daire
          </Text>
          </View>
          <View style={{alignItems:'center'}}>
          <Text style={{ color: "#3A811D", fontSize: 21, fontWeight: "bold" }}>
            2.500.000
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
        </View>
        <View
          style={{
            width: "100%",
            height: 45,
           
            justifyContent:'center',
            top: 20,
            display: "flex",
            flexDirection: "row",
            gap:5
          }}
        >
          <TouchableOpacity
         onPress={() => setTabs(0)}
            style={{
                width: "23%",
             backgroundColor:tabs ===0? "#ea2a28": "#EFEFEF",
              alignItems: "center",
              justifyContent:'center',
              height:40
            }}
          >
          <Text>Açıklama</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => setTabs(1)}
            style={{
              width: "23%",
              backgroundColor: tabs ===1? "#ea2a28": "#EFEFEF",
              alignItems: "center",
              justifyContent:'center',
              height:40
              
            }}
          >
          <Text>Özellikler</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => setTabs(2)}
            style={{
                width: "23%",
              backgroundColor: tabs ===2? "#ea2a28": "#EFEFEF",
              alignItems: "center",
              justifyContent:'center',
              height:40
            }}
          >
          <Text>Harita</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => setTabs(3)}
            style={{
                width: "23%",
              backgroundColor: tabs ===3? "#ea2a28": "#EFEFEF",
              alignItems: "center",
              justifyContent:'center',
              height:40
              
            }}
          >
          <Text style={{color:tabs ===3? "white": "black"}}>Yorumlar</Text>
          </TouchableOpacity>
        </View>

        <View style={{width:'100%',height:300,top:30}}>
        {tabs === 0 && <Caption/>}
        {tabs === 1 && <Settings/>}
        {tabs === 2 && <Map/>}
        {tabs === 3 && <Comment/>}

       
        </View>
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
    viewPager:{
        height:250
    }
  });
