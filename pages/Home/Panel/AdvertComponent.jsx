import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { addDotEveryThreeDigits } from '../../../components/methods/merhod'
import { frontEndUriBase } from '../../../components/methods/apiRequest'
export default function AdvertComponent({title,ımage,ID,price,item}) {
  
  
  return (
    <View style={styles.card}>
    <View style={{width:'25%'}}>
        <View style={{width:98,height:97,backgroundColor:'blue',borderRadius:8}}>
          {
            ımage ?
            <ImageBackground source={{uri:ımage}} style={{width:'100%',height:'100%'}}/>:
            <Text>Resim Yok Baba</Text>
          }
           
        </View>
    </View>
      <View style={{width:'72%'}}>
            <View style={{flex:1.2/2,flexDirection:'row'}}>
                    <View style={{width:'70%',gap:3,paddingTop:5,paddingLeft:5}}>
                        <Text style={{fontSize:14,fontWeight:'600'}}>{title}</Text>
                        <Text style={{fontSize:13}}>İlan No:{item.project ? `1000${ID}`: `2000${ID}`}</Text>
                    </View>
                    <View style={{width:'30%',paddingTop:6,gap:5}}>
                      
                  
                    <View>
                        <Text style={{fontWeight:'600',textAlign:'right'}}>{addDotEveryThreeDigits(price)} ₺</Text>
                    </View>
                    </View>
                   
            </View>
            {/* <View style={{flex:0.8/2,flexDirection:'row',justifyContent:'space-around'}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:6}}>
                        <Icon name='heart' color={'red'} size={15}/>
                        <Text style={{color:'grey',fontSize:12}}>100 </Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',gap:6}}>
                        <Icon name='bookmark' color={'#333'} size={13}/>
                        <Text style={{color:'grey',fontSize:12}}>100</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',gap:6}}>
                        <Icon name='eye' color={'grey'} size={16}/>
                        <Text style={{color:'grey',fontSize:12}}>100 </Text>
                </View>
            </View> */}
            <View>
                    
            </View>
      </View>

    </View>
  )
}
const styles=StyleSheet.create({
    card: {
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: "#FFFFFF",
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:10,
        paddingRight:10,
        
        width: "100%",
    
      
        borderColor: "#e6e6e6",
      
      },
})