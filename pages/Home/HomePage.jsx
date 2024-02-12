import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput,
  TouchableWithoutFeedback, Keyboard, ScrollView,
  TouchableOpacity,
  SafeAreaView

} from 'react-native';

import { useState } from 'react';
import Posts from '../../components/Posts';
import SliderBar from '../../components/SliderBar';
import Header from '../../components/Header';
import ProjectPost from '../../components/ProjectPost';

export default function App() {

  const Home = [
    {
      Acıklama: 'MASTER SONSUZ TATİL KÖYÜ',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul/Kartal/Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 1
    },
    {
      Acıklama: 'MALİYETİNE EV DEN MASTER VİLLA VAN',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul/Kartal/Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 2
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul/Kartal/Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 3
    },



  ]


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header />

        <View>
          <SliderBar />
        </View>

        <View style={{ top: 20, padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 19, fontWeight: '500', top: 10 }}>Öne Çıkan Projeler</Text>
          </View>
         
          <TouchableOpacity>
            <View style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }} >Tümünü gör</Text>
            </View>
          </TouchableOpacity>

        </View>
       
        <ScrollView style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }} indicatorStyle='white'>
          {/* {Home.map((item, index) => (
            <Posts key={item.id}
            caption={item.Acıklama} 
            price={item.fiyat}
             ımage={item.resim}
             location={item.konum}
             odaSayısı={item.odaSayısı}
             metre={item.metre}
             katSayısı={item.katsayısı} />
          ))} */}
          {Home.map((item,index)=>(
            <ProjectPost key={item.id} caption={item.Acıklama} ımage={item.resim} location={item.konum}/>
          ))}
          
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}