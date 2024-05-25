import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Platform } from "react-native";
export default function OfferItem() {

    const generateRandomColorCode = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      
      const RandomColor=generateRandomColorCode()
  return (
    <View style={[style.container,{backgroundColor:RandomColor+'CC'}]}>
    <View>
        <View style={{paddingLeft:20,gap:20}}>
            <Text style={{fontSize:16,color:'#F6F5F5',fontWeight:'bold'}}>Kampanya</Text>
            <Text style={{fontSize:25,color:'white',fontWeight:'500'}}>3000 ₺</Text>
        </View>
        <View style={{paddingTop:20,paddingLeft:20}}>
            <View style={{flexDirection:'row',display:'flex',}}>
          <Text style={{color:'white',fontSize:18}}>Master Sonsuz Tatil Köyü</Text>
            </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:20,paddingLeft:20,paddingRight:20}}>
            <View>
                <Text style={{color:'white'}}>10 Mart - 20 Mart</Text>
            </View>
            <View>
                <Text style={{color:'white'}}>Son 10 Gün</Text>
            </View>
        </View>
    </View>
    </View>
  )
}
const style=StyleSheet.create({
container:{
    
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

}
})