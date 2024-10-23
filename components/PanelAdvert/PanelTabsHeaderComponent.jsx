import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import { addDotEveryThreeDigits } from '../methods/merhod';
export default function PanelTabsHeaderComponent({IconName,IconStatus,Price,header,IconContainerColor}) {
  return (
    <View
    style={[
      styles.card,
      { padding: 10, flexDirection: "row", alignItems: "center", gap: 15 },
    ]}
  >
    <View>
      <View
        style={{
          backgroundColor: IconContainerColor,
          width: 40,
          height: 40,
          borderRadius: 7,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{}}>
        {
                                        IconStatus==0 &&
                                        <Icon2 name={IconName} size={15} color={'white'}/>
                                }
                                  {
                                        IconStatus==1 &&
                                        <Icon name={IconName} size={17} color={'white'}/>
                                }
                                  {
                                        IconStatus==2 &&
                                        <Icon3 name={IconName} size={19} color={'white'}/>
                                }
         
        </View>
      </View>
    </View>

    <View style={{ gap: 3 }}>
      <Text style={{ color: "#000000", fontWeight: "400", fontSize: 14 }}>
       {header}
      </Text>
      <Text style={{ color:IconContainerColor, fontWeight: "700", fontSize: 16, }}>
        {addDotEveryThreeDigits(Price)} ₺
      </Text>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
    card: {
      backgroundColor: "#FFFFFF",
  
      width: "100%",
      borderRadius: 8,
  
      borderColor: "#e6e6e6",
    },
    card2: {
        flexDirection:'row'
        },
    StatisticCard: {
      gap: 10,
    },
    IconContainer:{
          backgroundColor:'transparent',
          borderRightColor:'#F6F6F6',
          borderTopRightRadius:12,
          borderBottomRightRadius:12,
          borderRightWidth:5,
          alignItems:'center',
          justifyContent:'center',
          width:'20%'
    }
  });
  