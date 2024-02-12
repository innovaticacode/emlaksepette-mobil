import { View, Text, TextInput, TouchableOpacity,TouchableWithoutFeedback,Keyboard, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import Categories from "../../components/Categories";
import Header from "../../components/Header";

export default function Search() {
  return (
    <TouchableWithoutFeedback  onPress={()=>Keyboard.dismiss()}>
      <SafeAreaView>
        <TouchableWithoutFeedback  onPress={()=>Keyboard.dismiss()}>
      <ScrollView>
       
    <View style={{flex:1}}>
      <Header/>
      <View
        style={{
          display: "flex",
         
          flexDirection: "row",
          
          backgroundColor: "#D8D8D8",
          width: "100%",
          height: 40,
          alignItems: "center",
          
          
        }}
      >
        <View>
          <Icon name="search" size={30} style={{backgroundColor:'#D8D8D8'}}color={'grey'} />
        </View>
        <View>
          <TextInput placeholder="Ara" style={{
            backgroundColor:'#D8D8D8',
            width:400,
            height:'100%',
            padding:5,
            fontSize:15,
            borderRadius:10
          }}/>
        </View>
      </View>
      <View style={{backgroundColor:'black',width:'100%',height:0.4,top:20}}></View>
      <View style={{
        top:30,
        height:600,
      
      }}>
          <Categories category='Projeler'/>
          <Categories category='Konut'/>
          <Categories category='İş Yeri'/>
          <Categories category='Arsa'/>
          <Categories category='Prefabrik'/>
          <Categories category='Müstakil Tatil'/>
          <Categories category='Al Sat Acil'/>
    </View>
    
    
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
