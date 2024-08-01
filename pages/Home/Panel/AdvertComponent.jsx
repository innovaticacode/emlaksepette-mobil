import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
export default function AdvertComponent() {
  return (
    <View style={styles.card}>
    <View style={{width:'25%',}}>
        <View style={{width:98,height:97,backgroundColor:'blue',borderRadius:8}}>

        </View>
    </View>
      <View style={{width:'72%'}}>
            <View style={{flex:1.2/2,flexDirection:'row'}}>
                    <View style={{width:'70%',gap:3,paddingTop:5,paddingLeft:5}}>
                        <Text style={{fontSize:14,fontWeight:'600'}}>Kandıra Projesi 4 No’lu</Text>
                        <Text style={{fontSize:13}}>İlan No: 121451</Text>
                    </View>
                    <View style={{width:'30%',paddingTop:6,gap:5}}>
                      
                  
                    <View>
                        <Text style={{fontWeight:'600'}}>100.000 ₺</Text>
                    </View>
                    </View>
                   
            </View>
            <View style={{flex:0.8/2,flexDirection:'row',justifyContent:'space-around'}}>
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
            </View>
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