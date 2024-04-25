import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import AdsPictureItem from './profileComponents/AdsPictureItem'
import { useNavigation } from '@react-navigation/native'

export default function AdsPictureList() {
    const navigation=useNavigation()
  return (
        <ScrollView style={styles.container} stickyHeaderIndices={[1]} contentContainerStyle={{paddingBottom:40}} showsVerticalScrollIndicator={false}>
            <View style={{alignItems:'flex-end',padding:15}}>
            <TouchableOpacity style={{backgroundColor:'#E3E6ED',padding:10,borderRadius:6,flexDirection:'row',gap:10,alignItems:'center'}}
                onPress={()=>{
                    navigation.navigate('UploadAdsPicture')
                }}
            >
                        <Text style={{color:'green',fontWeight:'500'}}>Yeni Görsel Ekle</Text>
                        <Icon name='pluscircleo' size={17} color={'green'}/>
                    </TouchableOpacity>
            </View>
       
                <View style={{padding:7,flexDirection:'row',justifyContent:'space-between',backgroundColor:'#F5F5F7'}}>
                    <Text style={{color:'#333',fontSize:18,letterSpacing:0.5,fontWeight:'500'}}>Reklam Görselleriniz</Text>
                  
                </View>
                <View style={{gap:10,padding:10}}> 
                <AdsPictureItem/>
                <AdsPictureItem/>
                <AdsPictureItem/>
                <AdsPictureItem/>
                </View>
          
        </ScrollView>
  )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#F5F5F7'
    }
})