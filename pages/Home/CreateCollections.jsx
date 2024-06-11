import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'

export default function CreateCollections() {
    const route=useRoute()
    const {id}= route.params
    const [CollectionName, setCollectionName] = useState('')
  return (
    <ScrollView style={styles.container}>
            <View style={{gap:5,paddingTop:10}}> 
              <Text style={{fontSize:13,color:'#333',fontWeight:'bold'}}>Koleksiyon İsmi</Text>
              <TextInput style={styles.Input} value={CollectionName} onChangeText={(value)=>setCollectionName(value)}/>
              <View style={{paddingTop:10,alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#EA2B2E',padding:9,borderRadius:5,width:'90%'}}>
                  <Text style={{color:'#ffffff',fontSize:13,fontWeight:'bold',textAlign:'center'}}>Koleksiyon Ekle</Text>
                </TouchableOpacity>
              </View>
            </View>
          
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f7f7f7f7',
        padding:10
    },
      Input:{
        backgroundColor:'#ebebebeb',
        padding:9,
        borderRadius:5
      }
})