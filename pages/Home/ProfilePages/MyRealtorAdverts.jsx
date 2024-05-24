import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import {useState} from 'react'
import ActiveAdverts from './ProjectAdveretsPages/ActiveAdverts'
import WaitAdverts from './ProjectAdveretsPages/WaitAdverts'
import RejectAdverts from './ProjectAdveretsPages/RejectAdverts'
import PasiveAdverts from './ProjectAdveretsPages/PasiveAdverts'
import { useRoute, useNavigation } from '@react-navigation/native';
import ActiveRealtorAdverts from './ActiveRealtorAdverts'
import WaitRealtorAdverts from './WaitRealtorAdverts'
import RejectRealtorAdverts from './RejectRealtorAdverts'
import PasiveRealtorAdverts from './PasiveRealtorAdverts'
import { Platform } from "react-native";
export default function MyRealtorAdverts() {
  const [Tabs, setTabs] = useState(0)
  const route = useRoute();
  const { header,hidden} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{display:'flex',flexDirection:'row',gap:20}}>
            <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==0? 'red':'#ebebeb'}]}
              onPress={()=>setTabs(0)}
            >
              <Text style={[styles.tabBarText,{color:Tabs===0? 'white':'red',fontWeight:Tabs===0?'600':'normal'}]}>Aktif İlanlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==1? 'red':'#ebebeb'}]}
            onPress={()=>setTabs(1)}
            >
              <Text style={[styles.tabBarText,{color:Tabs===1? 'white':'red',fontWeight:Tabs===1?'600':'normal'}]}>Onay Bekleyen İlanlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==2? 'red':'#ebebeb'}]}
              onPress={()=>setTabs(2)}
            >
              <Text style={[styles.tabBarText,{color:Tabs===2? 'white':'red',fontWeight:Tabs===2?'600':'normal'}]}>Reddedilen İlanlar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==3? 'red':'#ebebeb'}]}
              onPress={()=>setTabs(3)}
            >
              <Text style={[styles.tabBarText,{color:Tabs===3? 'white':'red',fontWeight:Tabs===3?'600':'normal'}]}>Pasif İlanlar</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
      </View>
      {Tabs==0 && <ActiveRealtorAdverts/>}
      {Tabs==1 && <WaitRealtorAdverts/>}
      {Tabs==2 && <RejectRealtorAdverts/>}
      {Tabs==3 && <PasiveRealtorAdverts/>}

    </View>
  )
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },
    tabBar:{
      padding:10,
      borderBottomWidth:1,
      alignItems: "center",
      justifyContent: "center",
    
      backgroundColor: '#FFFF',  
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
    TabBarBtn:{
      backgroundColor:'red',
      padding:10,
      borderRadius:4,
      
    },
    tabBarText:{
      color:'white',
      fontWeight:'500'
    }
})