import { View, Text,ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useState} from 'react'

export default function SliderMenu({goToSlide,tab,settab}) {

  return (
    <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{
        
      
      }}>
      <View style={{padding:10,flexDirection:'row',gap:10}}>
      <TouchableOpacity style={[styles.tabBtn,{
        backgroundColor:tab==0 ?'#EA2C2E':'#ebebeb',
        borderWidth:tab==0 ? 0 :1
      }]} 
        onPress={()=>{
          goToSlide(0)
         
        }}
      >
        <Text style={{textAlign:'center',color:tab==0?'white':'#EA2C2E'}}>Projeler</Text>
       </TouchableOpacity>
       <TouchableOpacity style={[styles.tabBtn,{
         backgroundColor:tab==1 ?'#EA2C2E':'#ebebeb',
         borderWidth:tab==1 ? 0 :1
       }]}
        onPress={()=>{
          goToSlide(1)
      
        }}
       >
        <Text style={{textAlign:'center',color:tab==1?'white':'#EA2C2E'}}>Konut</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBtn}>
        <Text style={{textAlign:'center',color:'#EA2C2E'}}>İş Yeri</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBtn}>
        <Text style={{textAlign:'center',color:'#EA2C2E'}}>Arsa</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBtn}>
        <Text style={{textAlign:'center',color:'#EA2C2E'}}>Prefabrik</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBtn}>
        <Text style={{textAlign:'center',color:'#EA2C2E'}}>Tatilini Kirala</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.tabBtn}>
        <Text style={{textAlign:'center',color:'#EA2C2E'}}>Al Sat Acil</Text>
       </TouchableOpacity>
     

      </View>
     
      
  
      
      
      
      </ScrollView> 
  )
}
const styles=StyleSheet.create({
    tabBtn:{
        backgroundColor:'#ebebeb',
        paddingLeft:15,
        paddingRight:15,
        padding:5,
          borderRadius:4,
          borderWidth:1,
          borderColor:'#c7c7ca'
    }
})