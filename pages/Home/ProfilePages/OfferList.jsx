import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'
import OfferItem from './profileComponents/OfferItem';

export default function OfferList() {
    const route = useRoute();
    const navigation=useNavigation()
    const { name } = route.params;
  return (
    <View style={styles.container}>
        <View style={styles.header}> 
                <TouchableOpacity style={styles.btnAddOffer} onPress={()=>{
                        navigation.navigate('Offer',{name:'Kampanya Oluştur'})
                }}>
                    <Icon name='plus' color={'#27B006'} size={15}/>
                    <Text style={{textAlign:'center',color:'#27B006'}}>Yeni Kampanya Ekle</Text>
                </TouchableOpacity>
                
        </View>
        <ScrollView>
                    <View style={{padding:15}}>
                        <OfferItem/>
                        <OfferItem/>
                        <OfferItem/>
                    </View>
                </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    btnAddOffer:{
        backgroundColor:'#F5F7FA',
        flexDirection:'row',
      justifyContent:'center',
      gap:10,
      alignItems:'center',
        width:'50%',
        padding:9
    },
    header:{
        padding:10,
        alignItems:'flex-end'
    }
})