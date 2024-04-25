import { View, Text, StyleSheet,TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import{useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Eye from 'react-native-vector-icons/Ionicons'
export default function ChangePassword() {

  const navigation=useNavigation()



  const [SecureTextForPass1, setSecureTextForPass1] = useState(true)
  const [SecuretextForNewPass, setSecuretextForNewPass] = useState(true)
  const [SecureTextForNewPassAgain, setSecureTextForNewPassAgain] = useState(true)
  const ToggleForPass1=()=>{
    setSecureTextForPass1(!SecureTextForPass1)
  }
  const ToggleForPass2=()=>{
    setSecuretextForNewPass(!SecuretextForNewPass)
  }
  const ToggleForPass3=()=>{
   setSecureTextForNewPassAgain(!SecureTextForNewPassAgain)
  }
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.container}>
      <View style={styles.Form}>
      <View>
            <Text style={styles.label}>Mevcut Şifre</Text>
            <TextInput style={styles.Input} secureTextEntry={SecureTextForPass1} />
            <TouchableOpacity style={{position:'absolute',right:15,top:25}} onPress={ToggleForPass1}>
              <Eye name={SecureTextForPass1?'eye-off-outline' : 'eye-outline'} size={22}/>
            </TouchableOpacity>

          </View>
          <View>
            <Text style={styles.label}>Yeni Şifre</Text>
            <TextInput style={styles.Input}  secureTextEntry={SecuretextForNewPass} />
            <TouchableOpacity style={{position:'absolute',right:15,top:25}} onPress={ToggleForPass2}>
              <Eye name={SecuretextForNewPass?'eye-off-outline' : 'eye-outline'} size={22}/>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.label}>Yeni Şifre (Tekrar)</Text>
            <TextInput style={styles.Input} secureTextEntry={SecureTextForNewPassAgain}  />
            <TouchableOpacity style={{position:'absolute',right:15,top:25}} onPress={ToggleForPass3}>
              <Eye name={SecureTextForNewPassAgain?'eye-off-outline' : 'eye-outline'} size={22}/>
            </TouchableOpacity>
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.updatebtn} onPress={()=>navigation.navigate('PassVerify')}>
              <Text style={styles.btnText}>Şifre Yenile</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    padding:20
  } ,
  Form:{
    gap:30,
    width:'100%',
   paddingTop:14,
 
  
   borderRadius: 5,  
   paddingVertical: 22,  
   paddingHorizontal: 10,  
   width: '100%',  
   marginVertical: 10,  
  



  },
  Input:{
    padding:9,
    backgroundColor:'transparent',
    borderRadius:10,
    fontSize:15,
    borderWidth:1,
    borderColor:'#ebebeb'
  },
  label:{
    fontSize:14,
    bottom:5,
    left:2,
    fontWeight:'300',
    letterSpacing:0.5,

  },
  updatebtn:{
    width:'100%',
    backgroundColor:'#E54242',
    padding:13,
    borderRadius:10,
    
  },
  btnText:{
    textAlign:'center',
    color:'white',
  
    fontSize:12,
    fontWeight:'500'
}
})