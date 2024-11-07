import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { addDotEveryThreeDigits } from '../methods/merhod';
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/FontAwesome5";
export default function PanelComponent({IconName,IconContainerColor,Balance,backGroundColor,IconStatus,header}) {
  return (
    <View
    style={[
      styles.card2,
      {
        flexDirection:'row',
        borderRadius: 8,
        backgroundColor: backGroundColor,
     
      },
    ]}
  >
        <View style={styles.IconContainer}>
                <View style={{width:40,height:40,backgroundColor:IconContainerColor,borderRadius:60,alignItems:'center',justifyContent:'center'}}>
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
        <View style={{paddingTop:15,paddingBottom:15,paddingLeft:10}}>
        <View>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: 'white',
        }}
      >
        {header}
      </Text>
    </View>
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "800",
          color: 'white',
        }}
      >
        {addDotEveryThreeDigits(Balance)} ₺
      </Text>
    </View>
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