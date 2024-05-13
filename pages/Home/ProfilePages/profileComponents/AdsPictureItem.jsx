import { View, Text ,StyleSheet,TouchableOpacity, ImageBackground} from 'react-native'
import React from 'react'

export default function AdsPictureItem() {
  return (
    <View>
        <View style={{backgroundColor:'#303134d4',width:'100%',height:'100%',position:'absolute',zIndex:1,justifyContent:'center'}}>
          <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',gap:30,}}>
            <TouchableOpacity style={{backgroundColor:'#B4B4B854',padding:10,borderRadius:5}}>
                <Text style={{fontSize:18,color:'white'}}>Düzenle</Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={{backgroundColor:'#B4B4B854',padding:10,borderRadius:5}}>
                <Text style={{fontSize:18,color:'white'}}>Sil</Text>
            </TouchableOpacity>
          </View>
        </View>
    <View style={styles.uploadArea}>
        <ImageBackground source={require('./home.jpg')} style={{width:'100%',height:'100%'}} borderRadius={5}/> 
      
    </View> 

</View>
  )
}
const styles = StyleSheet.create({
    uploadArea:{
        justifyContent:'center',
        height:200,
        borderRadius:5,
     
    },
    UploadBtn:{
        backgroundColor:'#ea2b2e',
        padding:10,
        borderRadius:5
    }
 
})