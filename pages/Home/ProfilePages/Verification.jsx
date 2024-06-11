import { View, Text ,StyleSheet, TouchableOpacity, Pressable, ActivityIndicator} from 'react-native'
import React,{useState,useRef, useEffect} from 'react'
import { TextInput } from 'react-native'
import { getValueFor } from '../../../components/methods/user';
import axios from 'axios';
import Modal from "react-native-modal";
export default function Verification() {
  const [codes, setCodes] = useState('');
  const inputs = useRef([]);
const [Isucces, setIsucces] = useState(false)

  const handleInputChange = (index, value) => {
    // Sadece bir karakter kabul et
    if (value.length > 1) return;

    // Kodu güncelle
    const newCodes = codes.slice(0, index) + value + codes.slice(index + 1);
    setCodes(newCodes);

    // Bir sonraki veya önceki inputa odaklan
    if (value.length === 0 && index > 0) {
      inputs.current[index - 1].focus();
    } else if (index < 5 && value.length === 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
  
    try {
      // POST isteği yap
      const response = await axios.post(
        'https://mobil.emlaksepette.com/api/phone-verification/verify',
        { code: codes },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setCodes('')
      setsucces(true)
    
      setIsucces(true)
      setTimeout(() => {
          setIsucces(false)
      }, 2000);
    } catch (error) {
      console.error('Doğrulama isteği başarısız:', error);
      setsucces(false)
    }
  };
  const [user, setuser] = useState({})
useEffect(() => {
    getValueFor('user',setuser)
  }, []);


  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [butonDisabled, setbutonDisabled] = useState(false)
  const sendPostRequest = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        }
      };
  
      const response = await axios.post(
        'https://mobil.emlaksepette.com/api/phone-verification/generate',
        {}, // Veri gövdesi boş olabilir veya isteğe özel verileri ekleyebilirsiniz
        config
      );
  
      setResponse(response.data);
      setError(null);
      setbutonDisabled(true)
    } catch (error) {
      setError('Post isteği başarısız oldu.');
      console.error('Post isteği başarısız oldu:', error);
    }finally{
 
    }

  };

  const [succes, setsucces] = useState(true)

 
  return (
    <View style={styles.container}>
      {
        user.phone_verification_status==1 ?
        <>
          <Text>Onaylandı</Text>
        </>:
        <>
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
         
          {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.Input}
            value={codes[index] || ''}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange(index, text)}
          />
        ))}
  
          </View>
        
          <View style={{paddingTop:30,gap:20}}>
          <TouchableOpacity  style={{backgroundColor:'#E54242',padding:10,borderRadius:5,opacity:!butonDisabled? 0.5:1}}
            onPress={handleSubmit}
          >
            <Text style={{textAlign:'center',color:'#f7f7f7',fontSize:15,fontWeight:'600'}}>Onayla</Text>

          </TouchableOpacity>
          <TouchableOpacity disabled={butonDisabled} style={{backgroundColor:'#E54242',padding:10,borderRadius:5,opacity:butonDisabled? 0.5:1}}
            onPress={sendPostRequest}
          >
            <Text style={{textAlign:'center',color:'#f7f7f7',fontSize:15,fontWeight:'600'}}>Gönder</Text>

          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity>
                    <Text style={{fontSize:13,color:'blue'}}>Tekrar Gönder</Text>
                </TouchableOpacity>
                </View>
                
          </View>
      
        </View>
        <Modal isVisible={Isucces} style={styles.modal}
          animationIn={'fadeInRight'}
          animationOut={'fadeOutLeft'}
        >
          <View style={styles.modalContent}>
                <ActivityIndicator size='large' color={'red'}/>
                <Text style={{textAlign:'center'}}>Doğrulanıyor...</Text>
          </View>
        </Modal>
        </>
      }
       
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
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom : 50,
    borderRadius: 5,
    gap:15
  },
})