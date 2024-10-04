import { View, Text,ScrollView,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
export default function SliderMenuRealtorDetails({tab,setTab,changeTab}) {
    const menuItems=[
      
        {text:'Açıklama',Icontype:false},
        {text:'Özellikler',Icontype:false},
        {text:'Harita',Icontype:false},
        {text:'Yorumlar',Icontype:false},
      
    ]
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{}}
      bounces={false}
      contentContainerStyle={{justifyContent:'center'}}
    >
      <View style={{ padding: 0, flexDirection: "row", gap: 10, alignItems:'center',width:'100%'}}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              
              styles.tabBtn,
              {
                backgroundColor: tab == index ? "#EA2C2E" : "white",
                borderWidth: tab == index ? 0 : 1,
              },
            ]}
            onPress={()=>{
                changeTab(index)
            }}
          >
            {
              item.Icontype?
              <Icon name='swap-horizontal' size={12} color={tab == index ? "white" : "black"}/>:''
            }
             
            <Text
              style={{
                textAlign: "center",
                color: tab == index ? "white" : "#333",
                fontSize: 13,
                fontWeight:'600'
              }}
            >
              {item.text}
            </Text>

          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    tabBtn: {
      gap:5,
      flexDirection:'row',
      backgroundColor: "white",
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: "center",
      alignItems: "center",
      padding: 7,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#ebebeb",
    },
    text: {
      fontSize: 12,
    },
  });