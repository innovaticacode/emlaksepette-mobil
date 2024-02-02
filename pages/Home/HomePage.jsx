import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput ,TouchableWithoutFeedback,Keyboard,ScrollView, TouchableOpacity } from 'react-native';


import Posts from '../../components/Posts';
import SliderBar from '../../components/SliderBar';
import Header from '../../components/Header';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
   <View style={{flex:1}}>
   <Header/>
  
   <View>
 <SliderBar/>
   </View>
   
   <View style={{top:20,padding:10, display:'flex',flexDirection:'row' ,justifyContent:'space-between'}}>
   <View>
   <Text style={{fontSize:19,fontWeight:'500',top:10}}>Emlak İlanları</Text>
   </View>
   <TouchableOpacity>
   <View style={{backgroundColor:'red',padding:10,borderRadius:10}}>  
   <Text style={{fontSize:14,fontWeight:'600',color:'white'}} >Tümünü gör</Text>
   </View>
   </TouchableOpacity>
     
   </View>
   <ScrollView style={{padding:10,marginTop:10  }}>
      <Posts/>
      <Posts/>
      <Posts/>
      <Posts/>
      <Posts/>
      <Posts/>
    </ScrollView>
   </View>
   </TouchableWithoutFeedback>
   );
}