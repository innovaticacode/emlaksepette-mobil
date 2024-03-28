import { View, Text,ScrollView,FlatList } from 'react-native'
import React from 'react'
import Posts from '../Posts'
import ShoppinInfo from '../ShoppinInfo'

export default function Ablok({openmodal}) {
  const Home = [
    {
      Acıklama: 'MASTER SONSUZ TATİL KÖYÜ SATILIK EV PAYI MASTER REALTOR',
      fiyat: '5.150.000 ₺',
      resim: require('../images/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 1
    },
    {
      Acıklama: 'MALİYETİNE EV DEN MASTER VİLLA VAN',
      fiyat: '5.150.000 ₺',
      resim: require('../images/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 2
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '5.150.000 ₺',
      resim: require('../images/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 3,
      blok:'A'
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '3.150.000 ₺',
      resim: require('../images/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 4,
      blok:'A'
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '4.150.000 ₺',
      resim: require('../images/home.jpg'),
      konum: 'İstanbul / Kartal / Cevizli',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${4} Katlı`,
      id: 5,
      blok:'B'
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '6.150.000 ₺',
      resim: require('../images/home.jpg'),
      konum: 'İstanbul / Beyoğlu / Çukurcuma',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${8} Katlı`,
      id: 6,
      blok:'A'
    },
    {
      Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
      fiyat: '6.150.000 ₺',
      resim: require('../images/home.jpg'),
      konum: 'İstanbul / Beyoğlu / Çukurcuma',
      metre: '60m2',
      odaSayısı: '3+1',
      katsayısı: `${8} Katlı`,
      id: 7,
      blok:'A'
    }
  ]
  return (
          

  
    <View>
            {Home.map((item, index) => (
            <Posts key={item.id}
            openmodal={openmodal}
            No={item.id}
            caption={item.Acıklama} 
            price={item.fiyat}
             ımage={item.resim}
             location={item.konum}
             odaSayısı={item.odaSayısı}
             metre={item.metre}
             katSayısı={item.katsayısı}
              display={item.blok=='A'?'flex':'none'}
             />
             
          ))}  
         </View> 
       
       
     
        
  
  )
}