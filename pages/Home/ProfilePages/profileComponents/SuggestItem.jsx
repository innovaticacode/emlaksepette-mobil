import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { Platform } from "react-native";
export default function SuggestItem({openModal,name,color,title,username,mail,location,status,job}) {
  return (
    <View style={style.container}>
    <View>
        <View style={{borderBottomWidth:1,paddingBottom:15,borderBottomColor:'#ebebeb'}}>

        <View style={{flexDirection:'row',alignItems:'center',}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:8,}}>
                <View style={style.profileImage}>
                    <Image source={require('./home.jpg')} style={{width:'100%',height:'100%'}} />
                </View>
                <View style={style.ProfileName}>
                    <Text>{username}</Text>
                    <Text style={{fontSize:11,color:'grey'}}>{mail}</Text>
                </View>
                </View>
                <View style={{}}>
               
                  <TouchableOpacity style={{flexDirection:'row',backgroundColor: color?'#E54242':'green',padding:9,paddingLeft:12,paddingRight:12,borderRadius:5}}
                  onPress={()=>{
                    openModal()
                  }}
                 >
                 
                  <Text style={{textAlign:'center',fontSize:13,color:'white',fontWeight:'bold'}}>{name=='Başvurularım'?'Yanıtı Gör':'Yanıtla'}</Text>
                 </TouchableOpacity>
                
         </View>
             
         
        </View>
        <View style={{paddingTop:15}}>
        <Text>{title}</Text>
        </View>
      
        </View>
        <View  style={{paddingTop:10,borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:10}}>
            <Text style={{fontSize:12}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, praesentium. Laboriosam fugiat reprehenderit tenetur, iure consectetur esse eius mollitia exercitationem accusa
            </Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
            <View style={{gap:6}}>
           <Text>{location}</Text>
           <Text>
            <Text>Telefon : </Text>
            <Text>05537064474</Text>
           </Text>
           <Text>
            <Text>Meslek : </Text>
            <Text>{job}</Text>
           </Text>

            </View>
        
        </View>
     
    </View>
    </View>
  )
}
const style =StyleSheet.create({
    container:{
        backgroundColor:'#FFF',
        borderRadius: 10,  
        paddingVertical: 20,  
        paddingHorizontal: 10,  
        width: '100%',  
        marginVertical: 10,  
    
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
    profileImage:{
           width:55,
            height:50
    },
    ProfileName:{
        flex:1.3/2,
      
    }
})