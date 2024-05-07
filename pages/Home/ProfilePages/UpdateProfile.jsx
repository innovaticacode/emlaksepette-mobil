import { View, Text, StyleSheet,Dimensions, TouchableOpacity, Image,TextInput, Keyboard,Animated, TouchableWithoutFeedback,ActivityIndicator, ScrollView} from 'react-native'
import {useRef,useState,useEffect} from 'react'
import Editıcon from "react-native-vector-icons/MaterialCommunityIcons"

import ShareIcon from "react-native-vector-icons/Entypo"
import DeleteIcon from "react-native-vector-icons/MaterialIcons"
import Modal from "react-native-modal";
import ColorPicker from 'react-native-wheel-color-picker'
import { getValueFor } from '../../../components/methods/user'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Fontisto'

export default function UpdateProfile() {
 




  const translateY = useRef(new Animated.Value(400)).current;
  const [sheetDisplay, setsheetDisplay] = useState(false)
 


 

  const [user, setuser] = useState({})
useEffect(() => {
    getValueFor('user',setuser)
  }, []);
console.log(user.banner_hex_code)
  const [currentColor, setCurrentColor] = useState(user.banner_hex_code);
  const [swatchesOnly, setSwatchesOnly] = useState(false);
  const [swatchesLast, setSwatchesLast] = useState(false);
  const [swatchesEnabled, setSwatchesEnabled] = useState(true);
  const [disc, setDisc] = useState(false);

  const onColorChange = (color) => {
    setCurrentColor(color);
  };

  const onColorChangeComplete = (color) => {
    // Renk değişimi tamamlandığında burada istediğiniz işlemleri yapabilirsiniz
    console.log("Yeni renk:", color);
  };
  const [openColorPicker, setopenColorPicker] = useState(false)

 const [UpdateSuccess, setUpdateSuccess] = useState(false)
  const [loadingModal, setloadingModal] = useState(false)
  const [name, setName] = useState('');

  const postData = async () => {
  

    try {
    var formData=new FormData()
      formData.append('name', name);
      formData.append('banner_hex_code',currentColor)
      formData.append('_method','PUT')
    
      console.log(formData)
      const response = await axios.post('https://test.emlaksepette.com/api/client/profile/update', formData ,{
        headers:{
          Authorization: `Bearer ${user.access_token}`,
        }
      });
        setName('')

          setUpdateSuccess(true)
         500
     
        setTimeout(() => {
            setUpdateSuccess(false)
        }, 1500);
      // İsteğin başarılı bir şekilde tamamlandığı durum
      console.log('İstek başarıyla tamamlandı:', response.data);

      
  
    } catch (error) {
      // Hata durumunda
     
      console.error('Hata:', error +'post isteği başarısız ');
    }finally{
      setloadingModal(false)
    }
  };

  useEffect(() => {
    setCurrentColor(user?.banner_hex_code)
  },[user])
 
  const handleUpdate=()=>{
    if (name) {
      postData()
    }
  }
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <ScrollView style={{flex:1,backgroundColor:'white'}}>

  <View style={styles.ProfileEditArea}>
    <View style={{width:90,height:90}}>
    <TouchableOpacity style={styles.ProfilImage}>
       <Image source={require('.././profil.jpg')} style={{width:'100%',height:'100%'}} borderRadius={50} />   
       
      </TouchableOpacity> 
      <TouchableOpacity style={{position:'absolute',bottom:0,right:0,backgroundColor:'#EA2A29',padding:4,borderRadius:50}}  >
      <Editıcon name='account-edit' size={20} color={'white'}/>
      </TouchableOpacity>
    </View>
   
     
  </View>
  <View style={{padding:10}}>
    <View style={styles.Form}>
          <View>
            <Text style={styles.label}>İsim</Text>
            <TextInput style={styles.Input} value={name} onChangeText={(value)=>setName(value)} selectTextOnFocus={true} placeholder={user.name}/>
          </View>
          {/* <View>
            <Text style={styles.label}>Cep Telefonu</Text>
            <TextInput style={styles.Input} keyboardType='number-pad' value={phoneNumber} onChangeText={onChangeText} placeholder='0544 444 44 44' maxLength={14}/>
          </View> */}
          <View style={{gap:10}}>
          <Text style={{fontSize:13,color:'#333'}}>Profil arka plan rengi</Text>
          <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
          <TouchableOpacity style={{padding:20,backgroundColor:currentColor ,width:'20%',borderWidth:'#ebebeb'}} onPress={()=>setopenColorPicker(!openColorPicker)}>

</TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#E54242',padding:10,borderRadius:10}} onPress={()=>setopenColorPicker(!openColorPicker)}>
              <Text style={{color:'white'}}>{openColorPicker==true ? 'Kapat' : 'Seç' }</Text>
            </TouchableOpacity>
          </View>
         
          </View>
      
          <View style={[styles.card,{display:openColorPicker? 'flex':'none'}]}>
          <ColorPicker
          
      color={currentColor}
      swatchesOnly={false}
      onColorChange={onColorChange}
      onColorChangeComplete={onColorChangeComplete}
      thumbSize={50}
      sliderSize={20}
      noSnap={true}
      gapSize={0}
      sliderHidden={true}
      row={false}
      swatchesLast={swatchesLast}
      swatches={swatchesEnabled}
      discrete={false}
      wheelLodingIndicator={<ActivityIndicator size={40} />}
      sliderLodingIndicator={<ActivityIndicator size={20} />}
      useNativeDriver={false}
      useNativeLayout={false}
    />
          </View>
     

          
    </View>
    <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.updatebtn} onPress={handleUpdate}>
              <Text style={styles.btnText}>Güncelle</Text>
            </TouchableOpacity>
          </View>
    </View>
  

  

   <Modal isVisible={UpdateSuccess} style={styles.modal}
          animationIn={'fadeInRight'}
          animationOut={'fadeOutLeft'}
        >
          <View style={styles.modalContent}>
                <Icon name='check' size={25} color={'green'}/>
                <Text style={{textAlign:'center',color:'green'}}>Profiliniz Başarıyla Güncellendi</Text>
          </View>
        </Modal>
        <Modal isVisible={loadingModal} style={styles.modal}
          animationIn={'fadeInRight'}
          animationOut={'fadeOutLeft'}
        >
          <View style={styles.modalContent}>
                  <ActivityIndicator size='large'/>
                <Text style={{textAlign:'center',color:'green'}}>Profiliniz Güncelleniyor</Text>
          </View>
        </Modal>

    </ScrollView>
  
    </TouchableWithoutFeedback>
  )
}
const {width,height}=Dimensions.get('window')
const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#F7F7F9',
    },
    ProfileEditArea:{
      width:'100%',
      paddingTop:width>400?20:10,
      
      alignItems:'center'
    },
    ProfilImage:{
    
      
      
    },
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
      padding:10,
      backgroundColor:'transparent',
      borderRadius:10,
      fontSize:14,
      borderWidth: 1,
      borderColor: "#ebebeb",
      color:'#333'
    },
    label:{
      fontSize:13,
      bottom:5,
      left:2,
      letterSpacing:0.5,
      fontSize: 14, color: "grey", fontWeight: '500'
      
    },
  
    updatebtn:{
      width:'90%',
      backgroundColor:'#E54242',
      padding:13,
      borderRadius:10,
      
    },
    btnText:{
        textAlign:'center',
        color:'white',
      
        fontSize:13,
        fontWeight:'500'
    },
    card: {  
        
      backgroundColor: '#FFFFFF',  
      borderRadius: 10,  
      paddingVertical: 22,  
      paddingHorizontal: 30,  
      width: '100%',  
      
      height:240,
      borderWidth:0.7,
      borderColor:'#e6e6e6',
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
    modal: {
      justifyContent: "center",
      margin: 0,
      padding: 30,
    },
    modalContent: {
      flexDirection:'row',
      justifyContent:'center',
      backgroundColor: "white",
      padding: 25,
   
    borderRadius:10,
    alignItems:'center',
      gap:20,
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