import { View, Text ,StyleSheet,ScrollView, FlatList} from 'react-native'
import React,{useState,useEffect} from 'react'
import SliderItem from './SliderItem'
import axios from 'axios';
import SliderItemSkeleton from './SkeletonComponents/SliderItemSkeleton';


export default function SliderBar() {
  const apiUrl='https://emlaksepette.com/';
  const [loading, setloading] = useState(false)
  const [featuredStores, setFeaturedStores] = useState([]);

  const fetchFeaturedStores = async () => {
    try {
      const response = await axios.get('https://emlaksepette.com/api/featured-stores');
      setFeaturedStores(response.data)
      setloading(true)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
   fetchFeaturedStores()

  }, []);
  return (
    <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{
        
      top:10,
    }}>



      {
        featuredStores.map((item,index)=>(
       
          <View style={{width:100,alignItems:'center'}} key={index}>
            {
              loading==false?
              <>
              <SliderItemSkeleton/>
          </>:
              <>
              <SliderItem key={index} image={`${apiUrl}/storage/profile_images/${item.profile_image}`} mapla={item.latitude} maplo={item.longitude}  />
          <Text numberOfLines={2} style={{fontSize:12}}>{item.name}</Text>
          
          </>
            }

          </View>
           
        ))
      }
    
    </ScrollView>  
   
   
  )
}
const styles = StyleSheet.create({
    scrollView: {
        marginTop: 20,
      },
    
     
   })