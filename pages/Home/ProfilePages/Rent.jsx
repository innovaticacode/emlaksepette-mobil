import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Animated } from 'react-native'
import { useState,useRef } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import RentOrder from './profileComponents/RentOrder';
import Icon from 'react-native-vector-icons/Entypo'
export default function Rent() {
  const [Tabs, setTabs] = useState(0)
  const route = useRoute();
  const { text,display,name } = route.params;

  const translateY = useRef(new Animated.Value(400)).current;
  const [display2, setdisplay2] = useState(false)


  return (
    <View style={{flex:1}}>
    <View style={styles.container}>
    
      <View style={styles.navbar}>
        <View style={styles.TabBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity style={[styles.TabBarBtn, { backgroundColor: Tabs == 0 ? '#ebebeb' : '#E54242', borderWidth: Tabs == 0 ? 1 : 0, borderColor: '#E54242' }]}
                onPress={() => {
                  setTabs(0)
                 
                }}
                
              >
                <Text style={[styles.tabBarText, { color: Tabs === 0 ? '#E54242' : 'white', fontWeight: Tabs === 0 ? '600' : 'normal' }]}>{display=='none'? 'Gelen Rezervasyonlar' :'Aktif'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.TabBarBtn, { backgroundColor: Tabs == 1 ? '#ebebeb' : '#E54242', borderWidth: Tabs == 1 ? 1 : 0, borderColor: '#E54242' }]}
                onPress={() => setTabs(1)}
              >
                <Text style={[styles.tabBarText, { color: Tabs === 1 ? '#E54242' : 'white', fontWeight: Tabs === 1 ? '600' : 'normal' }]}>Geçmiş</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.TabBarBtn, { backgroundColor: Tabs == 2 ? '#ebebeb' : '#E54242', borderWidth: Tabs == 2 ? 1 : 0, borderColor: '#E54242' }]}
                onPress={() => setTabs(2)}
              >
                <Text style={[styles.tabBarText, { color: Tabs === 2 ? '#E54242' : 'white', fontWeight: Tabs === 2 ? '600' : 'normal' }]}>İptal Edilmiş</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
      </View>
      <ScrollView>
      <View style={styles.OrdersArea}>
         
            <RentOrder display={display}/>
            <RentOrder display={display}/>
            <RentOrder display={display}/>
            <RentOrder display={display}/>
            <RentOrder display={display}/>
            <RentOrder display={display}/>


      </View>
      </ScrollView>
  
    </View>
  
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  TabBarBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,

  },
  TabBar: {
    padding: 10,

  },
  OrdersArea:{
    gap:10,
    paddingTop:10,
    padding:10,
    paddingBottom:20
  },
  animatedView: {


    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: '#FFFF',
    borderColor: '#e6e6e6',
    ...Platform.select({
      ios: {
        shadowColor: ' #e6e6e6',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 20,
  },
})