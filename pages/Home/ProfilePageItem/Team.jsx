import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Platform } from "react-native";
export default function Team() {
  return (
    <ScrollView style={{flex:1}}>

    
    <View style={styles.container}>
   
     <View style={styles.card}>
     <View style={{display:'flex',flexDirection:'row',gap:20,justifyContent:'space-around'}}>
            <View style={styles.profileImage}>
              <Text style={{fontSize:17,color:'white'}}>Tİ</Text>
            </View>
            <View style={styles.profileName}>
                <View><Text style={{fontSize:17,color:'grey',fontWeight:'bold'}}>Teoman İnal</Text></View>
                <View><Text style={{fontSize:9,color:'grey',left:2}}>Satış Temsilcisi </Text></View>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:9,color:'grey'}}>Referans Kodu</Text>
              <Text style={{color:'grey',fontSize:11}}>1234567</Text>
            </View>
          </View>
          
     </View>
     <View style={styles.card}>
          <View style={{display:'flex',flexDirection:'row',gap:20,justifyContent:'space-around'}}>
            <View style={styles.profileImage}>
              <Text style={{fontSize:17,color:'white'}}>BB</Text>
            </View>
            <View style={styles.profileName}>
                <View><Text style={{fontSize:17,color:'grey',fontWeight:'bold'}}>Barış Boğaz</Text></View>
                <View><Text style={{fontSize:9,color:'grey',left:2}}>Satış Temsilcisi </Text></View>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:9,color:'grey'}}>Referans Kodu</Text>
              <Text style={{color:'grey',fontSize:11}}>1234567</Text>
            </View>
          </View>
          
     </View>
     
   
    </View>
 
  
    </ScrollView>
  )
}
const styles=StyleSheet.create({
      container:{
       top:15,
        alignItems:'center',
       
        gap:15,
       
      },


  card: {  
 
        alignItems:'center',
    backgroundColor: '#FFFFFF',  
    borderRadius: 10,  
    paddingVertical: 10,  
    paddingHorizontal: 10,  
    width: '90%',  
    marginVertical: 10,  
   display:'flex',
   flexDirection:'row',
gap:10,

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
   width:60,
   height:60,
    backgroundColor:'red',
  
    alignItems:'center',
    justifyContent:'center',
  
   
  },
  profileName:{
    justifyContent:'center'
  
   
  }
})