import { View, Text,ScrollView,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

export default function SliderMenuPostDetails({tab,setTab,changeTab}) {
    const menuItems=[
        {text:'Projedeki Diğer Konutlar'},
        {text:'Açıklama'},
        {text:'Özellikler'},
        {text:'Ödeme Planı'},
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
      <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
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
      padding: 7,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "#ebebeb",
    },
    text: {
      fontSize: 12,
    },
  });