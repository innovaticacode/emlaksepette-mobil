import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput,
  TouchableWithoutFeedback, Keyboard, ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Animated

} from 'react-native';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Posts from '../../components/Posts';
import SliderBar from '../../components/SliderBar';
import Header from '../../components/Header';
import ProjectPost from '../../components/ProjectPost';
import RealtorPost from '../../components/RealtorPost';
import Splash from '../../components/Splash';
import ProjectPostSkeleton from '../../components/SkeletonComponents/ProjectPostSkeleton';
import { Skeleton } from '@rneui/themed';
import SliderItemSkeleton from '../../components/SkeletonComponents/SliderItemSkeleton';

export default function App() {
  const apiUrl = 'https://emlaksepette.com/';
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
    },);
  };






  return (


    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>


      <SafeAreaView style={{ flex: 1, paddingTop: 25, backgroundColor: 'white' }}>
        <Header loading={loadingPrjoects} />
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

          <View style={{ top: 30, padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between',paddingBottom:30 }}>
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 12, fontWeight: '500', }}>ÖNE ÇIKAN PROJELER</Text>
            </View>

            <TouchableOpacity style={{ backgroundColor: '#EA2A29', paddingLeft: 10, paddingRight: 10, paddingTop: 7, paddingBottom: 5, zIndex: 1 }}>

              <Text style={{ fontSize: 12, fontWeight: '600', color: 'white' }} >Tümünü gör</Text>

            </TouchableOpacity>


          </View>


          <View style={{}}>
            {
              loadingPrjoects == false ?


                <View style={{ top: 40, padding: 10 }}>

                  <ProjectPostSkeleton />


                </View>

                :
                <FlatList
                  data={featuredProjects}
                  renderItem={({ item }) =>
                    <View style={{  padding: 10 }}>
                      <ProjectPost key={item.id}
                        caption={item.project_title}
                        ımage={`${apiUrl}/${item.image.replace('public/', 'storage/')}`}
                        location={item.city.title}
                        city={item.county.ilce_title}
                        ProjectNo={item.id}
                        slug={item.slug}
                        acıklama={item.description.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ')}
                        ShoppingName={item.user.name}
                        ShoppingMail={item.user.email}
                        Phone={item.user.phone}
                        ProfilImage={`${apiUrl}/storage/profile_images/${item.user.profile_image}`}
                        ShopingInfo={item.user.corporate_type}
                        loading={loadingPrjoects}
                      />
                    </View>
                  }

                  scrollEnabled={false}
                />
            }


          </View>


          <View style={{ paddingTop: 20, padding: 10 }}>
            {
              loadingPrjoects == false ?
                <>

                </>
                :
                <Text>Emlak İlanları</Text>
            }

            <View>
              {
                loadingPrjoects == false ?
                  '' :
                  <FlatList
                    data={featuredEstates}
                    renderItem={({ item }) =>
                      <RealtorPost
                        price={`${JSON.parse(item.housing_type_data)['price']} `}
                        title={item.housing_title}
                        loading={loadingEstates}
                        location={item.city_title + ' / ' + item.county_title}
                        image={`${apiUrl}/housing_images/${JSON.parse(item.housing_type_data).image}`}
                        m2={`${JSON.parse(item.housing_type_data)['squaremeters']} `}
                        roomCount={`${JSON.parse(item.housing_type_data)['room_count']} `}
                        floor={`${JSON.parse(item.housing_type_data)['floorlocation']} `}

                      />

                    }

                    scrollEnabled={false}
                  />
              }

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>



    </TouchableWithoutFeedback>
  );
}
