import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import axios from 'axios';

import { ActivityIndicator } from 'react-native-paper';
import { getValueFor } from '../../../components/methods/user';
import SellPlaceItem from '../../../components/SellPlaceItem';

export default function SellPlacesForBrands({data}) {
  const [Places, setPlaces] = useState([])
  const [user, setuser] = useState({})
  useEffect(() => {
    getValueFor('user',setuser)
  }, [])
  const [loading, setloading] = useState(false)
  const GetSellPlace = async () => {
 setloading(true)
    try {
      if (user?.access_token && user) {
        const placeInfo = await axios.get(
         `https://emlaksepette.com/api/magaza/${data?.data?.id}/satis-noktalari`
         
        );
        setPlaces(placeInfo?.data?.usersFromCollections)
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
        setloading(false)
    }
  };
  useEffect(() => {
      GetSellPlace()
  }, [user])
  
  console.log(Places ,'satışNoktaları')
  return (
<>

    {
       

      loading ?
      <View style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'#fff'}}>
        <ActivityIndicator size={'large'} color='#333'/>
      </View>
      :
      Places.length==0 ?
      <View>
          <Text style={{textAlign:'center',color:'#333',fontWeight:'700'}}>Satış Noktası Bulunumadı</Text>
      </View>:
   
  <ScrollView style={{
    backgroundColor:'#fff',
  
  }}
    contentContainerStyle={{
      padding:10,
      gap:10
    }}
  >
{
  Places.map((item,_i)=>(
    <SellPlaceItem key={_i} item={item}/>
  ))
}
   
   
  </ScrollView>
   }
  </>
  )
}