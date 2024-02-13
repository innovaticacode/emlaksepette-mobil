import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput,
  TouchableWithoutFeedback, Keyboard, ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList

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
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 1
    },
    {
      Acıklama: 'MALİYETİNE EV DEN MASTER VİLLA VAN',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul / Sultangazi / ismetpaşa',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 2
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 3,
      blok:'A'
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 4,
      blok:'A'
    },

    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 5,
      blok:'A'
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 6,
      blok:'A'
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 7,
      blok:'A'
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '5.150.000 ₺',
      resim: require('../Home/home.jpg'),
      konum: 'İstanbul / Kartal /Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 8,
      blok:'A'
    },


  ]


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1, } }>
        <Header />
            <ScrollView>
        <View>
          <SliderBar />
        </View>

        <View style={{ top: 30, padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 12, fontWeight: '500', top: 10 }}>ÖNE ÇIKAN PROJELER</Text>
          </View>
         
          <TouchableOpacity>
            <View style={{ backgroundColor: '#EA2A29',paddingLeft:10, paddingRight:10, paddingTop:5,paddingBottom:5,  }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: 'white' }} >Tümünü gör</Text>
            </View>
          </TouchableOpacity>

        </View>
       
        {/* <ScrollView style={{ marginTop: 15, display: 'flex', flexDirection: 'column' }} indicatorStyle='white'>
       
          {Home.map((item,index)=>(
            <ProjectPost key={item.id} caption={item.Acıklama} ımage={item.resim} location={item.konum} blok={item.blok}/>
          ))}
          
        </ScrollView> */}
        <FlatList
  data={Home}
  renderItem={({ item }) =>  <ProjectPost key={item.id} caption={item.Acıklama} ımage={item.resim} location={item.konum} blok={item.blok}/>}
   scrollEnabled={false}
/>
       
      </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
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