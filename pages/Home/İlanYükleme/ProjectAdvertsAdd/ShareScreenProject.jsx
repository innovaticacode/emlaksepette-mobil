import { View, Text, StyleSheet, ScrollView, TextInput, Keyboard, TouchableOpacity,Button} from 'react-native'
import {useRef,useState} from 'react'
import { useNavigation,useRoute } from '@react-navigation/native'
import QuillEditor from 'react-native-quill-editor'
export default function ShareScreenProject() {

  const [text, setText] = useState('');



    const route=useRoute()
    const navigation=useNavigation()
    const {name,previousName,beforName,antesName,AndName}=route.params;
  return (
    
    <View style={styles.container} onTouchStart={()=>Keyboard.dismiss()}>
        <View style={{padding:10}}>
      <Text style={{fontWeight:'bold'}}>{ previousName +' > ' + beforName + ' > '+ antesName + ' > '+ AndName+  ' > ' +name}</Text>
      </View>
      <ScrollView>
        <View style={{padding:20}}>
            <Text style={{fontSize:20,fontFamily:'Verdana',fontWeight:'400'}}>Proje Detayları</Text>
        </View>
        <View style={styles.Form}>
                <View style={{gap:10}}>
                    <Text style={styles.label}>
                        <Text> Proje Adı </Text>
                       <Text style={{color:'red'}}>*</Text>
                         </Text>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                    
                    style={[styles.Input]}/>
                </View>
   
                <QuillEditor
      style={{ height: 300 }}
      options={{
        placeholder: '请赋诗一首...',
      }}
      onChange={onChange}
   />
          
        </View>
      </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#FFF'
        },
        Form:{
            padding:20
        },
        Input:{
            borderWidth:0.7,
            borderColor:'#495057',
            padding:13,
            borderRadius:10,
            fontSize:15,
            color:'#495057',
            fontWeight:'400',
            fontFamily:'Verdana',
            justifyContent:'center'
        },
        label:{
            fontSize:14,

        }
})