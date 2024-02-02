import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lonicons from 'react-native-vector-icons/Ionicons'
import Basket from 'react-native-vector-icons/Feather'
import HomePage from '../Home/HomePage'
import Profile from './Profile';
import ShareScreen from './ShareScreen';
import Test from './Test';
import Test2 from './Test2';
const Tab = createBottomTabNavigator();
export default function Home() {
   
  return (
    <Tab.Navigator  screenOptions={{ 
      
        tabBarLabelStyle: { fontSize: 15,fontFamily:'Verdana',fontWeight:'200' },
        tabBarItemStyle: {borderRadius:15,paddingLeft:5,paddingRight:5 },
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor:'grey',
        tabBarActiveBackgroundColor:'transparent', 
        
        
  
        tabBarStyle: { backgroundColor: 'white',padding:6,paddingLeft:4,paddingRight:4, height:95, borderRadius:8, }
      }}
      
    >
        <Tab.Screen name="Home" component={HomePage} options={{
        
          headerShown:false,
          tabBarIcon: ({ color ,focused}) => (
            <Lonicons   name="home-outline" color={focused ? 'black':'grey'} size={33} />
          ),
        }} />
       
        
        <Tab.Screen name="Arama" component={Profile} options={{
           headerStyle:{backgroundColor:'red'},
            
            tabBarIcon: ({ color ,focused}) => (
              <Lonicons name="search-outline"    color={focused ? 'black':'grey'} size={33} />
            ),
          }} />

          <Tab.Screen name="İlan Ver" component={ShareScreen}  options={{
          tabBarLabel:'İlan Ver',
          tabBarLabelStyle:{top:29,fontSize:16 },
           
            tabBarIcon: ({ color ,focused}) => (
              
              <Lonicons   name="add" color={'black'}size={40} style={{top:4}} />
            ),
           tabBarItemStyle:{
            backgroundColor:'red',
            borderRadius:50,
          
            
            bottom:15,
            height:50,
            
            
            
         
            
           }
          }} />
          <Tab.Screen name="Favoriler" component={Test}options={{
          
           
            tabBarIcon: ({ color ,focused}) => (
              <Lonicons name="heart-outline"  color={focused ? 'black':'grey'} size={35} />
             
            ),
            tabBarItemStyle:{
              padding:2,
              borderRadius:20,
              height:62
            }
            
          }} />
          <Tab.Screen name="Sepetim" component={Test2} options={{
          
            
            tabBarIcon: ({ color ,focused}) => (
              <Basket name="shopping-cart"   color={focused ? 'black':'grey'} size={33} />
            ),
          }} />
        </Tab.Navigator>
  )
}