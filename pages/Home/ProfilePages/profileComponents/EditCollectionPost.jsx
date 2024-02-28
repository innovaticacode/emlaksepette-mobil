import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
export default function EditCollectionPost() {
  return (
    <TouchableOpacity>
    <View style={styles.container}>
    <View style={styles.post}>
        <View style={{flex:0.6/2,padding:5}}>
           <Image source={require('../../home.jpg')} style={{width:'100%',height:'100%'}}/>
        </View>


        <View style={{flex:1.4/2 ,padding:5}}>
           <View style={{flex:1.6/2,padding:0, flexDirection:'row'}}>
                <View style={{flex:1.4,}}>
                    <Text style={{}}  numberOfLines={3}>
                        <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, vel! Aliquid quos, autem laudantium consequatur cupiditate odit ducimus excepturi consequuntur at deleniti perferendis animi praesentium unde iste nesciunt maxime dolorem.</Text>
                    </Text>
                </View>
                <TouchableOpacity style={{flex:0.6/2,alignItems:"center",justifyContent:"center"}}>
                <View>
                        <Icon name='trash' size={23} color={'#ED2000'}/>
                </View>
                </TouchableOpacity>
           </View>
           <View style={{flex:0.4,padding:0,flexDirection:'row',justifyContent:'space-evenly'}}>
                    <View style={{backgroundColor:'#FFE0DB',paddingLeft:7,paddingRight:7,padding:4,borderRadius:5}} >
                        <Text style={{textAlign:'center',fontWeight:'500',color:'#008001',textDecorationLine: 'line-through',}}>2.590.000₺</Text>
                    </View>
                    <View style={{backgroundColor:'#DAFBD0',paddingLeft:7,paddingRight:7,padding:4,borderRadius:5}}>
                        <Text style={{textAlign:'center',fontWeight:'500',color:'#387F2A'}}>25.900₺</Text>
                    </View>
           </View>
        </View>
      

       

    </View>
    </View>
    </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
    container:{
            
            height:120,
            borderBottomWidth:2,
            borderBottomColor:'#ebebeb'
    },
    post: {
        flexDirection:"row",
        padding:10,
        height:'100%'
    }
    
})