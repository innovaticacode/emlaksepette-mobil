import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CollectionsItem from '../ProfilePages/profileComponents/CollectionsItem'

export default function CollectionsOfBrand({data}) {
  return (
   <ScrollView style={{paddingLeft:10,paddingRight:10}}>
    {
      data?.data?.collections.map((item,_i)=>(
        <CollectionsItem item={item} showDots={true}/>
      ))
    }
   </ScrollView>
  )
}