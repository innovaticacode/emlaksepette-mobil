import { View, Text ,StyleSheet,ScrollView} from 'react-native'
import React from 'react'
import SliderItem from './SliderItem'


const MenuItem=[
    {
        text:'Villa',
        id:1
      
    },
    {
        text:'Villa',
        id:2
    },
    {
        text:'Villa',
        id:3
    },
    {
        text:'Villa',
        id:4
    },
    {
        text:'Villa',
        id:5
    }
    
]

export default function SliderBar() {
  return (
    <ScrollView horizontal={true}  indicatorStyle={"white"} style={{
        
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