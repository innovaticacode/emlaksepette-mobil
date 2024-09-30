import { View, Text,ScrollView,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

export default function SliderMenuPostDetails({tab,setTab,changeTab}) {
    const menuItems=[
        {text:'Projedeki Diğer Konutlar'},
        {text:'Açıklama'},
        {text:'Özellikler'},
        {text:'Ödeme Planı'},
        {text:'Harita'},
        {text:'Vaziyet & Kat Planı'},
        {text:'Yorumlar'}
    ]
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
 
      bounces={false}
    >
      <View style={{ flexDirection: "row", alignItems:'center',gap:5 }}>
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