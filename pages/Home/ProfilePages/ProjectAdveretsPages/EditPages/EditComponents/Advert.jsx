import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { CheckBox } from "@rneui/themed";
import Icon from "react-native-vector-icons/AntDesign";
export default function Advert() {
  const [checked, setchecked] = useState(false);
  const toggleCheked = () => {
    setchecked(!checked);
  };
  return (
    <View style={{ padding: 2, borderWidth: 1 }}>
      <View style={{ flexDirection: "row",gap:10 }}>
        <View style={style.center}>
          <CheckBox
            checked={checked}
            onPress={toggleCheked}
            // Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#E54242"
            containerStyle={{ padding: 0, backgroundColor:'transparent', borderRadius: 5 }}
            size={25}
          />
        </View>
        <View style={style.center}>
      <Text>1</Text>

        </View>
        <View style={[style.center,{width:70,height:70,backgroundColor:'blue'}]}> 


        </View>
        <View style={[{width:200,height:70,flexDirection:'row',alignItems:'center',gap:10}]}>
       
         <View style={{padding:3}}>
         <Text style={{fontSize:12,color:'#333'}} numberOfLines={3}>Lorem ipsum dolor satibus voluptates deleniti ducimus</Text>
         </View>
         <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
         
        </View> 
        <View style={[style.center,{width:150,height:70,flexDirection:'row',alignItems:'center',gap:10}]}>
          <View>
          <Text>32432432₺</Text>
          </View>
       
          
          <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
        </View>
        <View style={[style.center,{width:150,height:70,flexDirection:'row',gap:10,alignItems:'center'}]}>
          <View>
          <Text>2432423423₺</Text>
          </View>
          <TouchableOpacity style={[{backgroundColor:'#E4EDFF',paddingLeft:8,paddingRight:8,padding:5,alignItems:'center',borderRadius:5}]}>
          <Icon name="edit" size={18} color={'#003CC7'}/>
         </TouchableOpacity>
        </View>
        <View style={[style.center,{width:150,height:70,alignItems:'center'}]}>
          <TouchableOpacity style={{backgroundColor:'#E4EDFF',padding:6}}>
            <Text style={{fontSize:12,textAlign:'center',color:'#003CC7'}}>Ara ödemeleri güncelle 0 ara ödeme bulunmakta</Text>
          </TouchableOpacity>
        </View>
        <View style={[style.center,{backgroundColor:'purple',width:120,height:70}]}>

        </View>
        <View style={[style.center,{backgroundColor:'pink',width:120,height:70}]}>

        </View>
        <View style={[style.center,{backgroundColor:'#333',width:90,height:70}]}>

        </View>
        <View style={[style.center,{backgroundColor:'orange',width:70,height:70}]}>

        </View>
      </View>
    </View>
  );
}
{
  /* */
}

const style=StyleSheet.create({
  center:{
   
    justifyContent:'center'
  }
})
