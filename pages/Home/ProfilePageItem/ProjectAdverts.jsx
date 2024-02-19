import { View, Text, ScrollView,Image,Dimensions} from 'react-native'
import React from 'react'

export default function ProjectAdverts() {
  const { width, height } = Dimensions.get('window');
  return (
    <ScrollView >
      <View style={{}}>
    <View style={{alignItems:'center',width:'100%',bottom: width>400?100:170}}>
     <Image source={require('./House.jpg')} resizeMode='contain' style={{width:'85%'}}/>
      <Text style={{bottom: width>400?250:270,fontSize:20,fontWeight:'500'}}>Henüz Proje Yayınlanmadı</Text>
    </View>
    
      </View>
     
    </ScrollView>
  )
}