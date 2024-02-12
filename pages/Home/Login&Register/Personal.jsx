import { View, Text, StyleSheet, TextInput,TouchableOpacity ,TouchableWithoutFeedback, Keyboard, ScrollView,} from 'react-native'
import {React,useState}from 'react'
import EyeIcon from "react-native-vector-icons/Ionicons"
import { CheckBox } from '@rneui/themed';
export default function Personal() {
    const [Show, setShow] = useState(false)
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
     const toggleCheckbox = () => setChecked(!checked);
     const toggleCheckbox1 = () => setChecked1(!checked1);
     const toggleCheckbox2 = () => setChecked2(!checked2);
     const toggleCheckbox3 = () => setChecked3(!checked3);

    const show=()=>{
        setShow(!Show)
    }
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
 <ScrollView>
    <View style={styles.container}>
       
        <View style={styles.Form}>
            <View style={styles.Inputs}>
                    <View>
                        <Text style={styles.label}>İsim</Text>
                        <TextInput style={styles.Input}/>
                    </View>
                    <View>
                    <Text style={styles.label}>E-Posta</Text>
                        <TextInput style={styles.Input} placeholder='example@gmail.com' keyboardType='email-address'/>
                    </View>
                    <View>
                    <Text style={styles.label}>Cep Telefonu</Text>
                        <TextInput style={styles.Input} placeholder='5344504562' maxLength={10} keyboardType='number-pad'/>
                    </View>

                    <View>
                    <Text style={styles.label}>Şifre</Text>
                    <View style={{
                        display:'flex',
                        flexDirection:'row'

                    }}>
                        <TextInput style={styles.InputPass}  secureTextEntry={!Show}/>
                        <TouchableOpacity
                onPress={show}
                style={{alignItems:'center',justifyContent:'center',width:30,position:'absolute',right:10,bottom:7}}>
                  <EyeIcon name={Show? 'eye-outline':'eye-off-outline'}size={30}/>
                </TouchableOpacity>
                    </View>
                    </View>
           
            </View>
            <View style={styles.Deals}>
                
                <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="#284ABB"
            title={'Bireysel üyelik sözleşmesini okudum onaylıyorum.'}
         />
               <CheckBox
           checked={checked1}
           onPress={toggleCheckbox1}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="#284ABB"
            title={'Kvkk metnini okudum onaylıyorum.'}
         />
              <CheckBox
           checked={checked2}
           onPress={toggleCheckbox2}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="#284ABB"
            title={'Gizlilik sözleşmesi ve aydınlatma metnini okudum onaylıyorum.'}
         />
           <CheckBox
           checked={checked3}
           onPress={toggleCheckbox3}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor="#284ABB"
            title={'Tarafıma elektronik ileti gönderilmesini kabul ediyorum.'}
         />
         
         
                    <View style={{width:'100%',alignItems:'center',height:'12%'}}>
                    <TouchableOpacity style={{
                        width:'95%',
                        height:'100%',
                        backgroundColor:'#284ABB',
                        justifyContent:'center',
                        borderRadius:6
                    }}>
                        <Text style={{
                            fontSize:25,
                            textAlign:'center',
                            color:'white'
                        }}>Üye Ol</Text>
                    </TouchableOpacity>
                    </View>
            </View>
        </View>
        
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  )
}
const styles=StyleSheet.create({
    container:{
            width:'100%',
            height:1000,
            
            alignItems:'center',
            
    },
    Form: {
        width: '90%',
        height: '90%',
        
        display:'flex',
        flexDirection:'column',
        
      },
      Inputs:{
        width:'100%',
        height:'35%',
       
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        gap:30,
        top:50
      },
      Input:{
        width:'100%',
        height:'35%',
        backgroundColor: '#FAFAFA',
        padding:10,
        fontSize:20,
        borderRadius:6,
        borderWidth: 1,
        borderColor: '#EEEEEE'

      },
      label:{
        fontSize:17,
        bottom:10
      },
      InputPass:{
        width:'100%',
        height:'100%',
        backgroundColor: '#FAFAFA',
        padding:10,
        fontSize:20,
        borderRadius:6,
        borderWidth: 1,
        borderColor: '#EEEEEE'
      },
      Deals:{
        width:'100%',
        height:'50%',
        
        top:90,
        gap:10
      },
      DealsItem:{
            width:'100%',
            height:'16%',
            backgroundColor:'yellow',
           
      }
})