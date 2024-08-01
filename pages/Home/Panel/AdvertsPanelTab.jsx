import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import RealtorAdvertTab from './RealtorAdvertTab'
import ProjectAdvertTab from './ProjectAdvertTab'
import DailyRentTab from './DailyRentTab'

export default function AdvertsPanelTab() {
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
   
    {tab==0 &&<RealtorAdvertTab/>}
    {tab==1 &&<ProjectAdvertTab/>}
    {tab==2 &&<DailyRentTab/>}
    
 
    </View>
  )
}