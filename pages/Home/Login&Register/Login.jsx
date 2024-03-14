import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity ,Dimensions,} from 'react-native'
import { React, useState } from 'react'
import BackIcon from "react-native-vector-icons/AntDesign"
import EyeIcon from "react-native-vector-icons/Ionicons"

import IconSocialMedia from "react-native-vector-icons/AntDesign"

export default function Login({navigation}) {
    const [eye, seteye] = useState('eye-off-outline')
    const [Show, setShow] = useState(false)
    const show=()=>{
        setShow(!Show)
    }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <SafeAreaView style={{backgroundColor:'white'}}>
      
        <View style={styles.container}>

          <View style={styles.Form}>

            <View style={styles.header}>
              <Text style={{
                fontSize: 30,
                color: '#274ABA',
                fontWeight: '500',
                letterSpacing: 1
              }}>Hoşgeldiniz</Text>
              <Text style={{
                color: 'grey'
              }}>Hayalinizdeki evi bizimle bulun</Text>
            </View>

            <View style={styles.formControl}>
              <View>
                <Text style={styles.label}>E-Posta</Text>
                <TextInput style={styles.ınput} />
              </View>
               
              <View>
              <Text style={styles.labelPass}>Şifre</Text>
              <View style={{display:'flex',flexDirection:'row',}}>
                <TextInput style={styles.ınput} secureTextEntry={!Show} />
                <TouchableOpacity
                onPress={show}
                style={{alignItems:'center',justifyContent:'center',width:30,position:'absolute',right:10,bottom:10}}>
                  <EyeIcon name={Show? 'eye-outline':'eye-off-outline'}size={30}/>
                </TouchableOpacity>
              </View>
              </View>
            </View>
            <View style={styles.butons}>
              <View style={styles.forgotPassAndOtherLogin}>
                <View style={{ width: '50%', alignItems: 'flex-start' }}>
                  <TouchableOpacity>
                    <Text style={styles.text}>Kurumsal Giriş</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%', alignItems: 'flex-end' }}>
                  <TouchableOpacity>
                    <Text style={styles.text}>Şifremi Unuttum</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.forgotpass}></View>
              </View>
              <View style={{ width: '100%', height: 45, }}>
                <TouchableOpacity style={styles.btnLogin}>
                  <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: '500',
                    letterSpacing: 1
                  }}>Giriş Yap</Text>
                </TouchableOpacity>
              </View>
                  
             
                  
            </View>

            <View style={styles.otherSections}>
            <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',bottom:8}}>
              <View style={styles.hr}/>
              <View><Text style={{top:10,margin:10,opacity:0.5}}>OR</Text></View>  
              <View style={styles.hr}/>
              </View>

              <View style={{display:'flex',flexDirection:'column',height:100,gap:6,}}>
                    <TouchableOpacity style={{
                     flex:1,
                     borderColor:'grey',
                     borderRadius:6,
                     backgroundColor:'transparent',
                     borderWidth:1,
                    padding:5,
                    display:'flex',
                    flexDirection:'row'
                    }}>
                      <View style={styles.IconContainer}>
                      <IconSocialMedia name='google' size={30} color={'black'}/>
                      </View>
                      <View style={{alignItems:'center',justifyContent:'center',width:'60%',left:40}}>
                      <Text style={{
                        fontSize:18,
                        fontWeight:'600'
                      }}>Google ile giriş yap</Text>
                      </View>
                      
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                     flex:1,
                     backgroundColor:'transparent',
                     borderWidth:1,
                     borderColor:'grey',
                     borderRadius:6,
                     
                     padding:5,
                     display:'flex',
                     flexDirection:'row'
                    }}>
                      <View style={styles.IconContainer2}>
                      <IconSocialMedia name='facebook-square' size={30} color={'black'}/>
                      </View>
                      <View style={{justifyContent:'center',width:'60%',left:40}}>
                      <Text style={{
                        fontSize:18,
                        fontWeight:'600'
                      }}>Facebook ile giriş yap</Text>
                        </View>
                     
                    </TouchableOpacity>
                  
          </View>
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={{
                    fontSize:15,
                    margin:5,
                    color:'grey',
                    fontWeight:500
                }}>Henüz bir hesabınız yokmu?
                 <Text onPress={()=>navigation.navigate('Register')} style={{
                  color:'blue',
                  textDecorationLine:'underline',
                 }}> Kayıt Ol</Text>

                 </Text>
              </View> 
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  
  container: {
    width: '100%',
    height: '100%',
    bottom:25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Form: {
    width: '90%',
    height: '90%',

  },
  header: {
    width: '100%',
    height: '10%',

  },
  formControl: {
    width: '100%',
    height: width>400?'25%':'30%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-around',
    
    
  },
  butons: {
    width: '100%',
    height: '19%',
    
  },
  ınput: {
    backgroundColor: '#FAFAFA',
  
    width:'100%',
    padding: 12,
    fontSize: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#EEEEEE'
  },
  label: {
    fontSize: 16,
    margin: 5,
    fontWeight: '600'
  },
  forgotPassAndOtherLogin: {
    width: '100%',
    height: 40,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
  
    color: 'grey'
  },
  btnLogin: {
    flex: 1,
    backgroundColor: '#264ABB',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
   backgroundColor:'#264ABB'
  },
labelPass:{
  
  fontSize: 16,
 
  margin:5,
  fontWeight: '600'
},
hr:{
  width:'40%',
    height:1,
    backgroundColor:'grey',
    opacity:0.5,
    top:30,
   
},
otherSections:{
  width:'100%',
  height:150,
    bottom: width>400? 60:30,
   
    
  
  display:'flex',
  flexDirection:'column',
 
 justifyContent:'center'
 
},
IconContainer: {
  padding: 2,
 
 
  alignItems: 'center',
  justifyContent: 'center',
  width: width<400? '16%':'15%',
  height:'100%',

  

 
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


},
IconContainer2: {
  
 
 
  alignItems: 'center',
  justifyContent: 'center',
  width: width<400? '16%':'15%',
  height:'100%',
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


},

})