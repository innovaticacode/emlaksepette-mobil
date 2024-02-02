import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import Favorite from '../../components/Favorite'

export default function Test() {
  return (
    <ScrollView>

     <Favorite/>
     <Favorite/>
     <Favorite/>
     <Favorite/>
    </ScrollView>
  )
}