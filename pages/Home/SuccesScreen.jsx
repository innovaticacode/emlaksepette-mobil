import { View, Text ,Platform, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign'
export default function SuccesScreen() {
    const route= useRoute()
    const {message,name,HouseID}=route.params
    const nav=useNavigation()
  return (
    <View style={{alignItems:'center', flex:1,padding:30,backgroundColor:'#f7f7f7'}}>
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <View style={{backgroundColor:'#D4EDDA',borderRadius:50,width:100,height:100,alignItems:'center',justifyContent:'center'}}>
                <Icon name='check' size={45} color={'#1C5F2D'}/>
            </View>
            <View style={{paddingTop:50}}>
            <Text style={{fontSize:18,color:'#333',fontWeight:'600'}}>{message}</Text> 
            </View>
           
        </View>
        <View style={{paddingTop:50,width:'100%',alignItems:'center',justifyContent:'center',gap:20}}>
            <TouchableOpacity style={{backgroundColor:'#EB2B2E',padding:10,width:'80%',borderRadius:5}}
                    onPress={()=>{
                        nav.navigate('HomePage')
                    }}
            >
                <Text style={{textAlign:'center',fontSize:14,color:'#ffff',fontWeight:'700'}}>Ana Sayfa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#EB2B2E',padding:10,width:'80%',borderRadius:5}}
                        onPress={()=>{
                            nav.navigate('Realtor details',{houseId:HouseID})
                        }}
            >
                <Text style={{textAlign:'center',fontSize:14,color:'#ffff',fontWeight:'700'}}>İlana Git</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}