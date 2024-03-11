import { View, Text,TouchableWithoutFeedback,Keyboard,ScrollView, StyleSheet,FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import BasketItem from '../../components/BasketItem'
import { Swipeable,GestureHandlerRootView } from "react-native-gesture-handler";
import TrashIcon from 'react-native-vector-icons/EvilIcons'

export default function Basket() {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={()=>{
      
    }}>
      <Text style={styles.deleteButtonText}>Sil</Text>
      <TrashIcon name='trash' size={23} color={'white'}/>
    </TouchableOpacity>
  );
    const [ Basket, SetBasket]=useState([
      {
        name:'MASTER ORMAN KÖY EVLERİ',
        price:2500000,
        shopName:'Maliyetine Ev',
        shopPoint:8.3,
        id:1,
        hisse:true
      },
     {
       name:'Master Sonsuz Tatil Köyü',
       price:3500000,
       shopName:'Master Realtor',
       shopPoint:7.5,
       id:2,
       hisse:false
     },
     {
       name:'Master Realtorden Kocaeli Kandıra Projesi',
       price:1500000,
       shopName:'Master Realtor',
       shopPoint:5.5,
       id:3,
       hisse:false
     }
    ])


  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
     
        {
          Basket.map((item,index)=>(
            <GestureHandlerRootView key={index}>
              <Swipeable renderRightActions={renderRightActions}>
            <BasketItem key={index} name={item.name} shopName={item.shopName} price={item.price} shopPoint={item.shopPoint} hisse={item.hisse}/>
            </Swipeable>
          </GestureHandlerRootView>
       
          ))
        }
  
    {/* <FlatList
    
      data={Basket}
      renderItem={({ item ,index}) => (
        
       
       
      )}
      keyExtractor={item => item.id}
    /> */}
   
   
 <View  style={styles.acceptCart}>
 <View style={{width:'100%',padding:5,flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
      <View style={{flex:1.5/2}}>
        <TextInput
        placeholder='İndirim Kuponu Uygula'
        style={{
          borderWidth:1,
          borderColor:'#ebebeb',
          padding:11,
          fontSize:13,
         borderTopLeftRadius:10,
         borderBottomLeftRadius:10,
          
        }}/>
      </View>
      <TouchableOpacity style={{flex:0.5/2,backgroundColor:'#ea2b2e',justifyContent:'center',borderTopRightRadius:10,borderBottomRightRadius:10}}>
          <Text style={{textAlign:'center',color:'white',fontFamily:'Verdana'}}>Uygula</Text>
      </TouchableOpacity>
    </View>
     <View style={{flexDirection:'row'}}> 
        <View style={{flex:0.8/2,paddingLeft:15,padding:4,gap:4}}>
          <Text style={{color:'grey',fontSize:12}}>Toplam</Text>
          <Text style={{fontFamily:'Verdana',fontWeight:'200'}}>25.000 ₺</Text>
          </View>  
         <TouchableOpacity style={{flex:1.2/2,backgroundColor:'#ea2b2e',justifyContent:'center',borderRadius:5}}> 
            <Text style={{textAlign:'center',color:'white'}}>Sepeti Onayla</Text>
         </TouchableOpacity>
       
       
     </View>
     </View>
   
    </View>
    </TouchableWithoutFeedback>
  )
}
const styles=StyleSheet.create({
  container:{
    backgroundColor:'white',
    flex:1,
    padding:13,
    gap:10
  
  },
  acceptCart:{
    width:'100%',
 
    padding:10,
    position:'absolute',
    bottom:15,
    left:13, gap:8,
    backgroundColor: '#FFFFFF',  
    borderRadius: 4,  
    paddingVertical: 15,  
    paddingHorizontal: 10,  
    width: '100%',  

  
    borderWidth:0.7,
    borderColor:'#CED4DA',
    ...Platform.select({
        ios: {
          shadowColor: ' #e6e6e6',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        android: {
          elevation: 5,
        },
      }),
  },
  deleteButton:{
    padding:30,
    backgroundColor:'#ea2b2e',
   
    flexDirection:'row',
    alignItems:'center',
    
  },
  deleteButtonText:{
    color:'white',
    fontSize:15
  }
})