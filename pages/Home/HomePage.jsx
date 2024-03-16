import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput,
  TouchableWithoutFeedback, Keyboard, ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl ,
  Animated

} from 'react-native';
import axios from 'axios';
import { useState,useEffect,useRef } from 'react';
import Posts from '../../components/Posts';
import SliderBar from '../../components/SliderBar';
import Header from '../../components/Header';
import ProjectPost from '../../components/ProjectPost';
import RealtorPost from '../../components/RealtorPost';
import Splash from '../../components/Splash';

export default function App() {
  const apiUrl='https://emlaksepette.com/';
  const [loadingPrjoects, setloadingPrjoects] = useState(false)
  const [loadingEstates, setloadingEstates] = useState(false)
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await axios.get('https://emlaksepette.com/api/featured-projects');
      setFeaturedProjects(response.data)
      setloadingPrjoects(true)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
   fetchFeaturedProjects()

  }, []);
  const [featuredEstates, setFeaturedEstates] = useState([]);

  const fetchFeaturedEstates = async () => {
    try {
      const response = await axios.get('https://emlaksepette.com/api/real-estates');
      setFeaturedEstates(response.data)
      setloadingEstates(true)
      
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
   fetchFeaturedEstates()
   
  }, []);
  

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, ); 
  };






  return (
    

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
     
        
        <SafeAreaView style={{ flex: 1, paddingTop:25,backgroundColor:'white'}}>
      <Header />
            <ScrollView scrollEventThrottle={20} 
             refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            > 
             
        <View>
          
          <SliderBar loading={loadingPrjoects} />
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
       
       
        <View>
          
           <View style={{alignItems:'center',justifyContent:'center'}}>
              <Text>
                {
                  loadingPrjoects==false?
                  <Text>Yükleniyor</Text>:''
                }
              </Text>
          
           </View>
                
             

        <FlatList
  data={featuredProjects}
  renderItem={({ item }) => 

  <ProjectPost key={item.id} 
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
   loading={loadingPrjoects}
  />

  }
 
 scrollEnabled={false}
/>
</View>  
  <View style={{paddingTop:20,padding:10}}>
    <Text>Emlak İlanları</Text>
      <View>
      <FlatList
  data={featuredEstates}
  renderItem={({ item }) => 
  <RealtorPost
  price={`${JSON.parse(item.housing_type_data)['price']} `}
 
    title={item.housing_title}
    loading={loadingEstates}
  />
 

  

  }
 
 scrollEnabled={false}
/>
      </View>
   </View>
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