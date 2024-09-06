import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import ClupTabPanel from './Tabs/ClupTabPanel'
import ClupPanelForProject from './Tabs/ClupPanelForProject'
import ClupPanelForDailyRent from './Tabs/ClupPanelForDailyRent'


export default function ClubPanel() {
 const [tab, settab] = useState(0)
  return (
    <View style={{flex:1,backgroundColor:'#fff'}} >
    <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#fff'}}>
    <TouchableOpacity 
    onPress={()=>{
        settab(0)
    }}
            style={{
                padding:12,
                borderBottomWidth: tab==0 ?1:0,
                borderBottomColor:'#EA2C2E'
            }}>
                <Text style={{color: tab==0 ? '#EA2C2E':'#404040',fontWeight:'500'}}>Emlak İlanlarım</Text>
            </TouchableOpacity>
       
            <TouchableOpacity 
               onPress={()=>{
                settab(1)
            }}
            style={{
                padding:12,
                 borderBottomWidth: tab==1 ?1:0,
                borderBottomColor:'#EA2C2E'
            }}>
                <Text style={{color: tab==1 ? '#EA2C2E':'#404040'}}>Proje İlanlarım</Text>
            </TouchableOpacity>
         
            <TouchableOpacity
               onPress={()=>{
                settab(2)
            }}
            style={{
                padding:12,
                 borderBottomWidth: tab==2 ?1:0,
                borderBottomColor:'#EA2C2E'
                
            }} >
                <Text style={{color: tab==2 ? '#EA2C2E':'#404040'}}>Günlük Kiralık</Text>
            </TouchableOpacity>
    </View>
   
     {tab ==0&&<ClupTabPanel/> }
    {tab==1 && <ClupPanelForProject/>}
    {tab==2 && <ClupPanelForDailyRent/>}
 
    </View>
  )
}