import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SuggestItem({openModal}) {
  return (
    <View style={style.container}>
    <View>
        <View style={{borderBottomWidth:1,paddingBottom:15,borderBottomColor:'#ebebeb'}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:18,}}>
                <View style={style.profileImage}>
                    <Image source={require('./home.jpg')} style={{width:'100%',height:'100%'}} />
                </View>
                <View style={style.ProfileName}>
                    <Text>Jonathan Elcott</Text>
                    <Text style={{fontSize:11,color:'grey'}}>jElcott@gmail.com</Text>
                </View>
                
        </View>
        <View style={{paddingTop:15}}>
        <Text>Master Sonsuz Tatil Köyü 2 No'lu Daire</Text>
        </View>
      
        </View>
        <View  style={{paddingTop:10,borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:10}}>
            <Text style={{fontSize:12}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, praesentium. Laboriosam fugiat reprehenderit tenetur, iure consectetur esse eius mollitia exercitationem accusa
            </Text>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
            <View style={{gap:6}}>
             <Text>Teklif Aralığı</Text>
             <View style={{flexDirection:'row'}}>
             <Text style={{color:'red',fontSize:13}}>2.000.000₺ - </Text>
                <Text style={{color:'green',fontSize:13}}>2.500.000₺</Text>
             </View>

            </View>
           <TouchableOpacity style={{flexDirection:'row',backgroundColor:'#E54242',padding:10,paddingLeft:25,paddingRight:25,borderRadius:5}}
            onPress={()=>{
              openModal()
            }}
           >
            <Text style={{textAlign:'center',fontSize:13,color:'white',fontWeight:'bold'}}>Yanıtla</Text>
           </TouchableOpacity>
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
        flex:1.2/2
    }
})