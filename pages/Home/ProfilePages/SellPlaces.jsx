import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import SellPlaceItem from '../../../components/SellPlaceItem';
import axios from 'axios';
import { getValueFor } from '../../../components/methods/user';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function SellPlaces({ data }) {
  const [Places, setPlaces] = useState([]);
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getValueFor('user', setuser);
  }, []);

  const GetSellPlace = async () => {
    setloading(true);
    try {
      if (user?.access_token && user) {
        const placeInfo = await axios.get(
          `https://private.emlaksepette.com/api/magaza/${user.id}/satis-noktalari`
        );
        setPlaces(placeInfo?.data?.usersFromCollections);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    GetSellPlace();
  }, [user]);

  console.log(Places, 'satışNoktaları')

  return (
    <>
      {
        loading ?
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fff' }}>
            <ActivityIndicator size={'large'} color='#333' />
          </View>
          :
          <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={{ padding: 10, flexGrow: 1 }}>
            {
              Places.length == 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                  {/* İkon */}
                  <Icon name="store-off-outline" size={64} color="#333" style={{ marginBottom: 20 }} />

                  {/* Bilgilendirme yazısı */}
                  <Text style={{ fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 20 }}>
                    Henüz satış noktası bulunmamaktadır.
                  </Text>

                  {/* Anasayfaya Dön Butonu */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#EA2A28',
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      borderRadius: 8
                    }}
                    onPress={() => navigation.navigate('HomePage')}  // 'Home' rotasına yönlendirme
                  >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Anasayfaya Dön</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                Places.map((item, _i) => (
                  <SellPlaceItem key={_i} item={item} />
                ))
              )
            }
          </ScrollView>
      }
    </>
  )
}
