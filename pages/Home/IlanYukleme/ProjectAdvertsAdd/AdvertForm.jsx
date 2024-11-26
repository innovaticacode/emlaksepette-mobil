import { View, Text ,StyleSheet, Alert, TouchableOpacity ,Button,TextInput, ScrollView, FlatList} from 'react-native'
import {useState}from 'react'
import { useRoute } from '@react-navigation/native'
import PagerView from 'react-native-pager-view';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Platform } from "react-native";
export default function AdvertForm({}) {
    const route=useRoute();
    const {InputValue}=route.params;
 
   
  
  return (
 <View style={{flex:1}}>
  <ScrollView>
    <View style={{backgroundColor:'white',flex:1}}>

<View style={{ height:1400}}>
     


    </View>
   
    
    </View>
    </ScrollView>
    <View style={{width:'100%', position:'absolute', bottom:0,gap:0}}>
       
       
       <View style={{width:'100%',backgroundColor:'#E54242',padding:10}}>
       <View style={{padding:3}}>
       <View style={{padding:10,backgroundColor:'#fff'}}> 
               <Text>Daire / 0.00%</Text>
        </View>
       </View>
           <View style={{paddingBottom:20,flexDirection:'row',justifyContent:'space-between',padding:10}}>
               <TouchableOpacity 
                   style={[styles.Card,{flexDirection:'row',alignItems:'center',gap:5}]}
               >   
               <Icon name='arrow-left'/>
                   <Text>Önceki</Text>
               </TouchableOpacity>
           <View style={[styles.Card,{flexDirection:'row'}]}>
               <Text>
                   <Text> </Text>
                   <Text>/</Text>
                   <Text style={{fontWeight:'bold'}}> {InputValue}</Text>
               </Text>
           </View>
           <TouchableOpacity  style={[styles.Card,{flexDirection:'row',alignItems:'center',gap:5}]}>
                   <Text>Sonraki</Text>
                   <Icon name='arrow-right'/>
               </TouchableOpacity>

           </View>
          
       </View>

 </View> 
    </View>
  )
}
const styles = StyleSheet.create({

    Card:{
        backgroundColor: '#FFFFFF',  
        borderRadius: 3,  
        paddingVertical: 4,  
        paddingHorizontal: 10,  
    
       
       
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
  });