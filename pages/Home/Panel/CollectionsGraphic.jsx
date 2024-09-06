import { View, Text, StyleSheet, ScrollView, Dimensions,TouchableOpacity,FlatList, Platform } from 'react-native'
import React,{useState,useEffect} from 'react'
import {
    BarChart,
    StackedBarChart
  
  } from "react-native-chart-kit";
import CollectionGraphicComponent from './CollectionGraphicComponent';
import { CheckBox } from "react-native-elements";
import { Stack } from "@react-native-material/core";
import Modal from "react-native-modal";
import Svg, { Circle } from 'react-native-svg';
  
export default function CollectionsGraphic() {
 
    const [selectedIndex, setIndex] = useState(null);
    const [selectedTime, setselectedTime] = useState('1 Ay')
  const handleRadio =(index,sort)=>{
      setIndex(index)
      setTimeout(() => {
        setSortLıstModal(false)
        setselectedTime(sort)
      }, 600);
       
  }
  const [selectedIndex2, setIndex2] = useState(null);
  const [selectedTime2, setselectedTime2] = useState('1 Ay')
  const [SortLıstModal2, setSortLıstModal2] = useState(false)
const handleRadio2 =(index,sort)=>{
    setIndex2(index)
    setTimeout(() => {
      setSortLıstModal2(false)
      setselectedTime2(sort)
    }, 600);
     
}
  const [SortLıstModal, setSortLıstModal] = useState(false)

  return (
    <ScrollView contentContainerStyle={{padding:12,gap:10}}>
        <View style={styles.card}>
                <View style={styles.CompHeader}>
                    <View>
                        <Text>Koleksiyon İstatistikleri</Text>
                    </View>
                    <View>
                    <TouchableOpacity style={{borderWidth:1,borderColor:'#E9E9E9',paddingLeft:19,paddingRight:19,padding:3,borderRadius:5,}} 
                                onPress={()=>{
                                    setSortLıstModal2(true)
                                }}
                                        >
                                <Text style={{fontSize:13,color:'#333',fontWeight:'600'}}>{selectedTime2}</Text>
                            </TouchableOpacity>
   

                    </View>
                </View>
                <View>
                    <View style={{padding:15,gap:7}}>
                        <Text style={{fontSize:14}}>Koleksiyon Görüntülenme Oranı</Text>
                        <Text style={{fontSize:12}}>%<Text style={{fontWeight:'600'}}>50</Text></Text>
                    </View>
                  
                </View>
        </View>
        <View style={styles.card}>
                <View style={styles.CompHeader}>
                    <View>
                        <Text>Koleksiyon İstatistikleri</Text>
                    </View>
                    <View>
                            <TouchableOpacity style={{borderWidth:1,borderColor:'#E9E9E9',paddingLeft:19,paddingRight:19,padding:3,borderRadius:5,}} 
                                onPress={()=>{
                                    setSortLıstModal(true)
                                }}
                                        >
                                <Text style={{fontSize:13,color:'#333',fontWeight:'600'}}>{selectedTime}</Text>
                            </TouchableOpacity>
   

                    </View>
                </View>
                <View>
                    <View style={{padding:15,gap:7}}>
                        <Text style={{fontSize:14}}>Koleksiyon Favorilere Ekleme</Text>
                        <Text style={{fontSize:12}}>%<Text style={{fontWeight:'600'}}>50</Text></Text>
                    </View>
                   <View style={{alignItems:'center',flexDirection:'row'}}>
                        
                   </View>
                </View>
        </View>
        <Modal
    isVisible={SortLıstModal}
    onBackdropPress={()=> setSortLıstModal(false)}
    backdropColor="transparent"
    style={[styles.modal,{padding:20,justifyContent:'center',backgroundColor:'#3339'}]}
    animationIn={"fadeIn"}
    animationOut={"fadeOut"}
    swipeDirection={['down']}
    onSwipeComplete={()=>setEditModalVisible(false)}
  >
    <View style={[styles.modalContent,{borderTopLeftRadius:6,borderTopRightRadius:6,padding:0,borderRadius:6,backgroundColor:'#ffffff'}]}>
    <View style={{paddingTop:15,alignItems:'center'}}>
         <Text style={{color:'#333',fontSize:17,fontWeight:'600'}}>Filtrele</Text>
        </View>
      <View>
      <Stack row align="center" spacing={4}>
         <CheckBox
           checked={selectedIndex === 0}
           onPress={() => {
            handleRadio(0,'1 Ay')
              
          }}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
            1 Ay
           </Text>}
                   containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
                      checkedColor="#333"
         />
         <CheckBox
           checked={selectedIndex === 1}
           onPress={() =>{ handleRadio(1,'1 Yıl') }}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text style={{color:'#333',fontWeight:'600'}}>
             1 Yıl
           </Text>}
                    containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
                   checkedColor="#333"
         />
           <CheckBox
           checked={selectedIndex === 2}
           onPress={() => handleRadio(2,'6 Ay')}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
            6 Ay
           </Text>}
                     containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
                      checkedColor="#333"
         />
              <CheckBox
           checked={selectedIndex === 3}
           onPress={() => handleRadio(3,'3 Ay')}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
            3 Ay
           </Text>}
         containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
              checkedColor="#333"
         />
           <CheckBox
           checked={selectedIndex === 4}
           onPress={() => handleRadio(4,'15 Gün')}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
          15 gün
           </Text>}
         containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
              checkedColor="#333"
         />
           <CheckBox
           checked={selectedIndex === 5}
           onPress={() => handleRadio(5,'Bugün')}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
           Bugün
           </Text>}
         containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
              checkedColor="#333"
         />
       </Stack>
      </View>
        </View>
</Modal>
<Modal
    isVisible={SortLıstModal2}
    onBackdropPress={()=> setSortLıstModal(false)}
    backdropColor="transparent"
    style={[styles.modal,{padding:20,justifyContent:'center',backgroundColor:'#3339'}]}
    animationIn={"fadeIn"}
    animationOut={"fadeOut"}
    swipeDirection={['down']}
   
  >
    <View style={[styles.modalContent,{borderTopLeftRadius:6,borderTopRightRadius:6,padding:0,borderRadius:6,backgroundColor:'#ffffff'}]}>
    <View style={{paddingTop:15,alignItems:'center'}}>
         <Text style={{color:'#333',fontSize:17,fontWeight:'600'}}>Filtrele</Text>
        </View>
      <View>
      <Stack row align="center" spacing={4}>
         <CheckBox
           checked={selectedIndex2 === 0}
           onPress={() => {
            handleRadio2(0,'1 Ay')
              
          }}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
            1 Ay
           </Text>}
                   containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
                      checkedColor="#333"
         />
         <CheckBox
           checked={selectedIndex2 === 1}
           onPress={() =>{ handleRadio2(1,'1 Yıl') }}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text style={{color:'#333',fontWeight:'600'}}>
             1 Yıl
           </Text>}
                    containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
                   checkedColor="#333"
         />
           <CheckBox
           checked={selectedIndex2 === 2}
           onPress={() => handleRadio2(2,'6 Ay')}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
            6 Ay
           </Text>}
                     containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
                      checkedColor="#333"
         />
              <CheckBox
           checked={selectedIndex2 === 3}
           onPress={() => handleRadio2(3,'3 Ay')}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
            3 Ay
           </Text>}
         containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
              checkedColor="#333"
         />
           <CheckBox
           checked={selectedIndex2 === 4}
           onPress={() => handleRadio2(4,'15 Gün')}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
          15 gün
           </Text>}
         containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
              checkedColor="#333"
         />
           <CheckBox
           checked={selectedIndex2 === 5}
           onPress={() => handleRadio2(5,'Bugün')}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
           Bugün
           </Text>}
         containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
              checkedColor="#333"
         />
       </Stack>
      </View>
        </View>
</Modal>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
       
        
        width: "100%",
        borderRadius:8,
      
        borderColor: "#e6e6e6",
      
      },
      CompHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#E9E9E9',
        paddingTop:10,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:10
      },
      optionsContainer: {
        position: 'absolute',
        top: '100%', // Düğmenin altına yerleştirir
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 5,
        elevation: 5,
        zIndex: 10,
      },
      option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      modal: {
        justifyContent: "flex-end",
        margin: 0,
        backgroundColor:'#0c03033d'
      },
      modalContent: {
        gap: 5,
       paddingBottom:25,
        backgroundColor: "#ffffff",
        padding: 10,
      
    
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        ...Platform.select({
          ios: {
            shadowColor: "white",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
          },
        }),
      },
    
})