import { View, Text ,StyleSheet,ScrollView} from 'react-native'
import React from 'react'
import SliderItem from './SliderItem'



export default function SliderBar() {
  return (
    <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{
        
      top:10,
    }}>
        <SliderItem/>
        <SliderItem/>
        <SliderItem/>
        <SliderItem/>
        <SliderItem/>
        <SliderItem/>
        <SliderItem/>
        <SliderItem/>
        <SliderItem/>
        <SliderItem/>
        <SliderItem/>
    </ScrollView>  
   
   
  )
}
const styles = StyleSheet.create({
    scrollView: {
        marginTop: 20,
      },
    
     
   })