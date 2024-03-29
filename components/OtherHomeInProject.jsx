import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { React, useState } from 'react'
import Ablok from "./Bloks/Ablok"
import Bblok from "./Bloks/Bblok"
import ShoppinInfo from './ShoppinInfo';
import Posts from './Posts';
export default function OtherHomeInProject({openmodal}) {
    const [tabs, setTabs] = useState(0);
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
        },
        {
            Acıklama: 'Master VİLLAS KARTEPE KOCAELİ',
            fiyat: '4.150.000 ₺',
            resim: require('../images/home.jpg'),
            konum: 'İstanbul / Kartal / Cevizli',
            metre: '60m2',
            odaSayısı: '3+1',
            katsayısı: `${4} Katlı`,
            id: 8,
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
            id: 9,
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
            id: 10,
            blok:'A'
          }
      ]

    return (
       
        <SafeAreaView>
            <View style={{paddingLeft:10,paddingRight:10}}>
            <View style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow:1, backgroundColor:'#ebebeb',padding:3,gap:10}} bounces={false}>
                    <TouchableOpacity 
                    onPress={()=>setTabs(0)}
                    style={[styles.blockBtn,{
                        borderBottomWidth:tabs==0?1:0
                    }]}>
                        <Text style={{fontWeight:tabs==0?'700':'normal',color:'#333'}}>A Blok</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>setTabs(1)}
                    style={[styles.blockBtn,{
                        borderBottomWidth:tabs==1?1:0
                    }]}>
                       <Text style={{fontWeight:tabs==1?'700':'normal',color:'#333'}}>B Blok</Text>
                    </TouchableOpacity>
                 
                  
                 

                  
                </ScrollView>
              
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
         
            </View>
           
            </View>
          
        </SafeAreaView>
      
       
    )
}
const styles = StyleSheet.create({
    container: {
        
        
        padding:5,
        top: 0,
     
        backgroundColor: '#FFFFFF',  
      
         marginTop:0,
        
       
       
        width: '100%',  
        
        height:'auto',
        borderWidth:0.7,
        borderColor:'#e6e6e6',
        ...Platform.select({
            ios: {
              shadowColor: ' #e6e6e6',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
            },
            android: {
              elevation: 5,
            },
          }),

    },
    tabBar: {
     
        height: 40,
        
        top: 5,
        display: 'flex',
      
        gap: 2,
        backgroundColor: '#EFEFEF',
    },
    
 
      blockBtn:{
  
      paddingLeft:30,
      paddingRight:30,
      padding:8,
      borderBottomWidth:1
      }

})