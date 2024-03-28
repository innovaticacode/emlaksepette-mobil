import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Icon2  from "react-native-vector-icons/Entypo"
export default function CollectionItemPanel() {
  return (
   <TouchableOpacity style={style.container}>
        <View style={style.Images}>
                <View style={{width:'50%',height:'100%', }}>
                        <ImageBackground source={require('./home.jpg')} style={{width:'100%',height:'100%'}}/>
                </View> 
                <View style={{width:'50%',height:'100%',backgroundColor:'grey'}}>
                <ImageBackground source={require('./home.jpg')} style={{width:'100%',height:'100%'}}/>
                     </View>

               
        </View>

        <View style={style.NameAndInfo}>
            <View style={{paddingLeft:5,gap:4}}>
            <Text style={{fontSize:12}} numberOfLines={2}>
                    <Text>Koleksiyon Adı : </Text>
                    <Text style={{color:'red',fontWeight:'500'}}>Villa</Text>
                </Text>
                <Text style={{fontSize:12}} numberOfLines={2}>
                    <Text>İlan Sayısı : </Text>
                    <Text style={{color:'red',fontWeight:'500'}}>3</Text>
                </Text>
            </View>
               
                <View style={{flexDirection:'row',gap:5,alignItems:'center',paddingLeft:5}}>
                    <View style={{flexDirection:'row',gap:3,alignItems:'center',justifyContent:'center'}}>
                    <Icon2 name='eye' size={17} color="red"/>
                    <Text style={{fontSize:12}}>20</Text>
                    </View>
                    <View>
                    <Text style={{fontSize:12}}>Görüntülenme</Text>
                    </View>
             

                </View>
            </View>
   </TouchableOpacity>
  )
}
const style=StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        borderRadius:10,
        height:90,
        width:'100%',
   
   
   
   
        backgroundColor:'white', 
    
        paddingVertical: 5,  
        paddingHorizontal: 5,  
       
        marginVertical: 0,  
      
        borderWidth:0.7,
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
    Images:{
        flexDirection:'row',
        flex:0.9/2,
      
        padding:5,
        gap:7
    },
    NameAndInfo:{
        flex:1.1/2,
  
        padding:5,
        gap:7
    }
})