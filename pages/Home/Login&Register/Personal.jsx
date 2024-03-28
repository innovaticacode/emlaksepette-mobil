import { View, Text, StyleSheet, TextInput,TouchableOpacity ,TouchableWithoutFeedback, Keyboard, ScrollView,Platform} from 'react-native'
import {React,useState}from 'react'
import EyeIcon from "react-native-vector-icons/Ionicons"
import { CheckBox } from '@rneui/themed';
export default function Personal() {
   
  const [eye, seteye] = useState('eye-off-sharp')
    const [Show, setShow] = useState(false)
    const show=()=>{
        setShow(!Show)
    }
    const [checked, setChecked] =useState(false);
    const [checked1, setChecked1] =useState(false);
    const [checked2, setChecked2] =useState(false);
    const [checked3, setChecked3] =useState(false);
    const toggleCheked=()=>setChecked(!checked)
    const toggleCheked1=()=>setChecked1(!checked1)
    const toggleCheked2=()=>setChecked2(!checked2)
    const toggleCheked3=()=>setChecked3(!checked3)

   
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.container}>
 <ScrollView showsVerticalScrollIndicator={false}>
    
        <View style={{padding:15,gap:20}}>

      <View style={{gap:5}}>
        <View style={{paddingLeft:5}}>
          <Text style={{fontSize:14,color:'grey',fontWeight:600}}>İsim</Text>
        </View>
        <TextInput style={styles.Input} placeholder='Adınızı Giriniz...' />
      </View>

      <View style={{gap:5}}>
        <View style={{paddingLeft:5}}>
          <Text style={{fontSize:14,color:'grey',fontWeight:600}}>E-Posta</Text>
        </View>
        <TextInput style={styles.Input} placeholder='example@gmail.com' />
      </View>

      <View style={{gap:5}}>
        <View style={{paddingLeft:5}}>
          <Text style={{fontSize:14,color:'grey',fontWeight:600}}>Şifre</Text>
        </View>
        <View>
        <TextInput style={styles.Input} placeholder='*********' secureTextEntry={Show? false:true}/>
        <TouchableOpacity style={{position:'absolute',right:10,bottom:9}}  onPress={show}>
        <EyeIcon name={Show? 'eye':'eye-off-sharp'} size={20} color={'#333'}/>
        </TouchableOpacity>
        </View>
       
      </View>

      <View>
      <CheckBox
           checked={checked}
           onPress={toggleCheked}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="#E54242"
           title={
            <Text>
            <Text style={{color:'#027BFF',fontSize:13}}>   Bireysel üyelik sözleşmesini</Text>
            <Text style={{fontSize:13}}> okudum onaylıyorum</Text>
         
            </Text>
           }
          textStyle={{fontSize:13,fontWeight:400}}
            size={22}
           containerStyle={{padding:0,width:'100%'}}
         />
          <CheckBox
           checked={checked1}
           onPress={toggleCheked1}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="#E54242"
           title={
            <Text>
            <Text style={{color:'#027BFF',fontSize:13}}>   Kvkk metnini</Text>
            <Text style={{fontSize:13}}> okudum onaylıyorum</Text>
         
            </Text>
           }
          textStyle={{fontSize:13,fontWeight:400}}
            size={22}
           containerStyle={{padding:1,}}
         />
           <CheckBox
           checked={checked2}
           onPress={toggleCheked2}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="#E54242"
           title={
            <View style={{paddingLeft:10}}>
           <Text>
            <Text style={{color:'#027BFF',fontSize:13}}>Gizlilik sözleşmesi ve aydınlatma metnini</Text>
            <Text style={{fontSize:13}}> okudum onaylıyorum</Text>
       
            </Text>
            </View>
          }

          textStyle={{fontSize:13,fontWeight:400}}
            size={22}
           containerStyle={{padding:1,}}
         />
          <CheckBox
           checked={checked3}
           onPress={toggleCheked3}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="#E54242"
           title={
           <View style={{paddingLeft:10}}>
              <Text>Tarafıma elektronik ileti gönderilmesini kabul ediyorum.</Text>
           </View>
         }
          textStyle={{fontSize:13,fontWeight:400}}
            size={22}
           containerStyle={{padding:1,}}
         />
      </View>
      <View style={{alignItems:'center'}}>
          <TouchableOpacity style={{backgroundColor:'#E54242',padding:9,borderRadius:10,width:'90%'}}>
            <Text style={{textAlign:'center',color:'white',fontSize:15,fontWeight:'bold'}}>Üye Ol</Text>
          </TouchableOpacity>
          </View>
      </View>
      </ScrollView>
      </View>
 
    </TouchableWithoutFeedback>
  )
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },
    Input:{
      padding:9,
      borderWidth:1,
      borderColor:'#ebebeb',
      borderRadius:5,
      backgroundColor:'#FAFAFA'
    }
})