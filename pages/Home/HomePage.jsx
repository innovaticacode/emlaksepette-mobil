import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput,
  TouchableWithoutFeedback, Keyboard, ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl 

} from 'react-native';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Posts from '../../components/Posts';
import SliderBar from '../../components/SliderBar';
import Header from '../../components/Header';
import ProjectPost from '../../components/ProjectPost';

export default function App() {
  const apiUrl='https://emlaksepette.com/';
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get('https://emlaksepette.com/api/featured-projects');
      setFeaturedProjects(response.data)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
   fetchFeaturedProjects()

  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); 
  };


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
       
      <SafeAreaView style={{ flex: 1, paddingTop:25}}>
      <Header />
            <ScrollView scrollEventThrottle={20} 
             refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            >
             
        <View>
          
          <SliderBar />
        </View>

        <View style={{ top: 30, padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 12, fontWeight: '500', top: 10 }}>ÖNE ÇIKAN PROJELER</Text>
          </View>
         
          <TouchableOpacity>
            <View style={{ backgroundColor: '#EA2A29',paddingLeft:10, paddingRight:10, paddingTop:7,paddingBottom:5,  }}>
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
  data={featuredProjects}
  renderItem={({ item }) =>  <ProjectPost key={item.id} 
  caption={item.project_title}
   ımage={`${apiUrl}/${item.image.replace('public/', 'storage/')}`} 
  location={item.city.title}
   city={item.county.ilce_title}
   ProjectNo={item.id}
   slug={item.slug}
   acıklama={item.description.replace(/<\/?[^>]+(>|$)/g , '').replace(/&nbsp;/g, ' ')}
   ShoppingName={item.user.name}
   ShoppingMail={item.user.email}
   Phone={item.user.phone}
   ProfilImage={`${apiUrl}/storage/profile_images/${item.user.profile_image}`}
   ShopingInfo={item.user.corporate_type}

  />}
 
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