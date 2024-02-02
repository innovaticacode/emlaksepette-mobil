import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from 'react-native-vector-icons/Fontisto'
export default function Favorite() {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 100,
      padding:5,
       
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap:8,
        marginTop:15
      }}
    >
      <View style={{ width: "25%", height: 100, }}>
        <ImageBackground
          source={require("../images/home.jpg")}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        />
      </View>
      <View
        style={{ width: "50%", height: 100, backgroundColor: "white" }}
      >
          <Text  style={{fontSize:16}}>Master Realtor'den Kuruçeşme Hatip Köyde 2+1 daire</Text>
          <View style={{width:100,height:30,position:'absolute',right:0,bottom:0}}>
          <Text style={{color:'red'}}>2.500.000</Text>
          </View>
      </View>
      <View
        style={{ width: "25%", height: 100 ,backgroundColor:'white',display: "flex",flexDirection:'column',alignItems:'center',justifyContent:'space-around' }}
      >
      <TouchableOpacity
            style={{            
              padding: 6,
              alignItems: "center",
             
            }}
          >  
         <Icon name="delete" size={25} color={'red'}/>
          </TouchableOpacity> 
          <TouchableOpacity
          style={{            
            padding: 6,
            alignItems: "center",
            
          }}
        >  
       <Icon2 name="shopping-basket-add" size={25} color={'#274ABB'}/>
        </TouchableOpacity> 
      </View>
    </TouchableOpacity>
  );
}
