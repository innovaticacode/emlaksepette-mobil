import { View, Text ,StyleSheet, TouchableOpacity, Pressable} from 'react-native'
import React,{useState,useRef, useEffect} from 'react'
import { TextInput } from 'react-native'
import { getValueFor } from '../../../components/methods/user';

export default function Verification() {
  const [codes, setCodes] = useState(['', '', '', '','','']);
  const inputs = Array(6).fill(0).map(() => useRef(null));

  const handleInputChange = (index, value) => {
    // Sadece bir karakter kabul et
    if (value.length > 1) return;

    // Kodu güncelle
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    // Bir sonraki inputa odaklan

    if (value.length === 0 && index > 0) {
      inputs[index - 1].current.focus();
    } else if (index < 5 && value.length === 1) {
      inputs[index + 1].current.focus();
    }
  };
  const [user, setuser] = useState({})
useEffect(() => {
    getValueFor('user',setuser)
  }, []);
  console.log(user.access_token + 'dfsdfsd')
  return (
    <View style={styles.container}>
        <View style={{width:'100%',gap:15}}>
          <View style={{width:'75%'}}>
          <Text style={{fontSize:30,color:'#333',fontWeight:'500'}}>
            Doğrulama kodunu giriniz
          </Text>
          </View>
          
          <Text style={{fontSize:14,color:'#333'}}> 
            Paneli görüntüleyebilmek için {user?.mobile_phone} No'lu telefona gönderdiğimiz doğrulama kodunu giriniz
          </Text>
        </View>
        <View style={{paddingTop:35,width:'100%',padding:10}}>
          <View style={{flexDirection:'row',justifyContent:'center',gap:10,}}> 
         
          {codes.map((code, index) => (
        <TextInput
          key={index}
          ref={inputs[index]}
          style={styles.Input}
          maxLength={1}
          keyboardType='number-pad'
          value={code}
          onChangeText={(text) => handleInputChange(index, text)}
        />
      ))}
          </View>
          <View style={{paddingTop:30,gap:20}}>
          <TouchableOpacity style={{backgroundColor:'#E54242',padding:10,borderRadius:5}}>
            <Text style={{textAlign:'center',color:'#f7f7f7',fontSize:15,fontWeight:'600'}}>Gönder</Text>

          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity>
                    <Text style={{fontSize:13,color:'blue'}}>Tekrar Gönder</Text>
                </TouchableOpacity>
                </View>
                
          </View>
      
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      
  },
  Input:{
    backgroundColor:'#F3f8ff',
    borderWidth:1,
    borderColor:'#d9d9d9',
    borderRadius:6,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:11,
    paddingBottom:11,
    fontSize:20,
    fontWeight:'bold'
  }
})