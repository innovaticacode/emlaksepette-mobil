import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { useRoute,useNavigation } from '@react-navigation/native'
import CategoryAdverts from '../ProjectAdvertsAdd/CategoryAdverts';
import Icon from 'react-native-vector-icons/AntDesign'
export default function AdvertStatu() {
    const navigation=useNavigation()
    const route=useRoute()
    const {name}=route.params;
  return (
    <View style={{backgroundColor:'white',flex:1}}>
           <View style={[styles.Card,{paddingVertical:11,paddingHorizontal:15,flexDirection:'row',alignItems:'center',gap:10}]}>
            <View style={{backgroundColor:'#ebebeb4d',padding:10,borderRadius:'50%'}}>
            <Icon name='home' color={'red'} size={17}/>
            </View>
          
            <Text style={{fontWeight:'bold',fontSize:12}}>{name + ' >'}</Text>
        </View>
    
     {
        name=='İş Yeri'?
        <>
          <TouchableOpacity onPress={()=>navigation.navigate('AdvertType',{name:'Satılık',previousName:name })}>
        <CategoryAdverts text='Satılık'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AdvertType',{name:'Kiralık',previousName:name })} >
        <CategoryAdverts text='Kiralık'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AdvertType',{name:'Devren Satılık',previousName:name })}>
        <CategoryAdverts text='Devren Satılık'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AdvertType',{name:'Devren Kiralık',previousName:name })}>
        <CategoryAdverts text='Devren Kiralık'/>
        </TouchableOpacity>
        </>
      :<>
        <TouchableOpacity onPress={()=>navigation.navigate('AdvertType',{name:'Satılık',previousName:name })}>
        <CategoryAdverts text='Satılık'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AdvertType',{name:'Kiralık',previousName:name })}>
        <CategoryAdverts text='Kiralık'/>
        </TouchableOpacity>
      </>
     }
  
  
    </View>
  )
}
const styles=StyleSheet.create({
    Card:{
        backgroundColor: '#FFFFFF',  
        borderRadius: 10,  
        paddingVertical: 22,  
        paddingHorizontal: 5,  
        width: '100%',  
        marginVertical: 10,  
      
        borderWidth:0.7,
        borderColor:'#CED4DA',
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
})