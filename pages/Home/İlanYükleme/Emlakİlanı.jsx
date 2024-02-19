import { View, Text,TouchableOpacity, SafeAreaView } from 'react-native'
import {React,useRef,useState} from 'react'
import BottomSheet from  "react-native-simple-bottom-sheet";
export default function Emlakİlanı() {
  const panelRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    panelRef.current.togglePanel()
  };
  return (
    <View style={{flex:1,}}>
        <TouchableOpacity onPress={() => panelRef.current.togglePanel()}>
      <Text>Toggle</Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={toggleVisibility} style={{height:60,backgroundColor:'red'}}><Text>tıkla</Text></TouchableOpacity>
    <View style={{flex: 1 ,height:0, display:isVisible ?'flex':'none'}}>
  
  
    <BottomSheet  ref={ref => panelRef.current = ref} >
      <View style={{width:'100%',height:300,backgroundColor:'red'}}>

      </View>
    </BottomSheet>
  </View>
</View>
  )
}