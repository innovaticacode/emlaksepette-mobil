import { View, Text,ScrollView,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

export default function SliderMenuDetails({tab,setTab,changeTab}) {
    const menuItems=[
        {text:'Projedeki Konutlar'},
        {text:'Açıklama'},
        {text:'Özellikler'},
        {text:'Harita'},
        {text:'Vaziyet & Kat Planı'}
    ]
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{}}
      bounces={false}
    >
      <View style={{ flexDirection: "row"}}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabBtn,
              {
                backgroundColor: tab == index ? "#EA2C2E" : "white"
              },
            ]}
            onPress={()=>{
                changeTab(index)
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: tab == index ? "white" : "#333",
                fontSize: 12,
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
      backgroundColor: "white",
      paddingLeft: 15,
      paddingRight: 15,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderColor: "#ebebeb",
    },
    text: {
      fontSize: 12,
    },
  });