import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import {useEffect, useState} from 'react'
import ActiveAdverts from './ProjectAdveretsPages/ActiveAdverts'
import WaitAdverts from './ProjectAdveretsPages/WaitAdverts'
import RejectAdverts from './ProjectAdveretsPages/RejectAdverts'
import PasiveAdverts from './ProjectAdveretsPages/PasiveAdverts'
import { ALERT_TYPE,Toast } from 'react-native-alert-notification';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Platform } from "react-native";
export default function MyProjectAdverts({navigation}) {
  const [Tabs, setTabs] = useState(0)
  const route = useRoute();
  const { header,header2,status} = route.params;
  const [showMessage,setShowMessage] = useState(false);
  useEffect(() => {
    if(status == "update_project"){
      if(!showMessage){
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Başarılı',
          textBody: 'Başarıyla projeyi güncellediniz admin onayının ardından aktife alınacaktır.',
        })
      }
  
      setShowMessage(true);
    }
  },[status])

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
            <TouchableOpacity  style={[styles.TabBarBtn,{backgroundColor:Tabs==2? 'red':'#ebebeb'}]}
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
      {Tabs==0 && <ActiveAdverts header={header2}/>}
      {Tabs==1 && <WaitAdverts navigationx={navigation} header={header2}/>}
      {Tabs==2 && <RejectAdverts header={header2}/>}
      {Tabs==3 && <PasiveAdverts header={header2}/>}

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