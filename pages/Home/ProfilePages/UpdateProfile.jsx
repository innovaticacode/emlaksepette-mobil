import { View, Text, StyleSheet,Dimensions, TouchableOpacity, Image,TextInput, Keyboard,Animated, TouchableWithoutFeedback,ActivityIndicator} from 'react-native'
import {useRef,useState,useEffect} from 'react'
import Editıcon from "react-native-vector-icons/MaterialCommunityIcons"

import ShareIcon from "react-native-vector-icons/Entypo"
import DeleteIcon from "react-native-vector-icons/MaterialIcons"

import ColorPicker from 'react-native-wheel-color-picker'
import { getValueFor } from '../../../components/methods/user'
import axios from 'axios'

export default function UpdateProfile() {
 




  const translateY = useRef(new Animated.Value(400)).current;
  const [sheetDisplay, setsheetDisplay] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChangeText = (text2) => {
    // Girilen metindeki sadece rakamları al
    const cleanedText = text2.replace(/[^0-9]/g, '');
    // Temizlenmiş metni 3-3-2-2 formatında düzenle
    let formattedPhoneNumber = '';
    for (let i = 0; i < cleanedText.length; i++) {
      if (i === 4 || i === 7 || i === 9)  {
        formattedPhoneNumber += ' ';
      }
      formattedPhoneNumber += cleanedText[i];
    }
    setPhoneNumber(formattedPhoneNumber);
  };
  const [iban, setIban] = useState('TR');
  const onChangeText2 = (text) => {
    // Girilen metindeki harf ve rakamları temizle
    const cleanedText = text.replace(/[^a-zA-Z0-9]/g, '');
    // Temizlenmiş metni dört karakterden bir boşluk ekleyerek formatla
    let formattedIban = '';
    for (let i = 0; i < cleanedText.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedIban += ' ';
      }
      formattedIban += cleanedText[i];
    }
    setIban(formattedIban);
  };
  const onFocus = () => {
    // IBAN alanı boşsa, varsayılan değeri göster
    if (iban.length<2) {
      setIban('TR');
    } 
  };
  const openSheet = () => {
    setsheetDisplay(true)
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    setsheetDisplay(false)
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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
      
      // İsteğin başarılı bir şekilde tamamlandığı durum
      console.log('İstek başarıyla tamamlandı:', response.data);

      
  
    } catch (error) {
      // Hata durumunda
     
      console.error('Hata:', error +'post isteği başarısız ');
    }
  };
 
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={{flex:1}}>
    <View style={styles.container} onTouchStart={()=>{
    
        closeSheet()
      }}>
  <View style={styles.ProfileEditArea}>
      <TouchableOpacity style={styles.ProfilImage} onPress={openSheet}>
       <Image source={require('.././profil.jpg')} style={{width:'100%',height:'100%'}} borderRadius={50} />   
            <TouchableOpacity style={{position:'absolute',bottom:0,right:0,backgroundColor:'#EA2A29',padding:4,borderRadius:50}} onPress={openSheet} >
      <Editıcon name='account-edit' size={20} color={'white'}/>
      </TouchableOpacity>
      </TouchableOpacity> 
  </View>
  <View style={{padding:10}}>
    <View style={styles.Form}>
          <View>
            <Text style={styles.label}>İsim</Text>
            <TextInput style={styles.Input} value={name} onChangeText={(value)=>setName(value)} selectTextOnFocus={true} placeholder='İsim' />
          </View>
          {/* <View>
            <Text style={styles.label}>Cep Telefonu</Text>
            <TextInput style={styles.Input} keyboardType='number-pad' value={phoneNumber} onChangeText={onChangeText} placeholder='0544 444 44 44' maxLength={14}/>
          </View> */}
          <View style={{gap:10}}>
          <Text style={{fontSize:13,color:'#333'}}>Profil arka plan rengi</Text>
          <View style={{flexDirection:'row',alignItems:'center',gap:20}}>
          <TouchableOpacity style={{padding:20,backgroundColor:currentColor,width:'20%',borderWidth:'#ebebeb'}} onPress={()=>setopenColorPicker(!openColorPicker)}>

</TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#E54242',padding:10,borderRadius:10}} onPress={()=>setopenColorPicker(false)}>
              <Text style={{color:'white'}}>Seç</Text>
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
            <TouchableOpacity style={styles.updatebtn} onPress={()=>{
            postData()
            }} >
              <Text style={styles.btnText}>Güncelle</Text>
            </TouchableOpacity>
          </View>
    </View>
    
    </View>
    <View style={{ flex: 1,position:'absolute' ,bottom:0,width:'100%',display:sheetDisplay?'flex':'none' }}>
     
     <Animated.View
       style={ [styles.animatedView,{transform: [{ translateY }],}] }>

       <View style={{width:'100%',}}>
       <View style={{alignItems:'center'}}>
        <TouchableOpacity style={{width:40,height:7,backgroundColor:'#ebebeb',borderRadius:10}} onPress={closeSheet}>

        </TouchableOpacity>
       </View>
       <View style={{paddingBottom:10}}>
       <TouchableOpacity style={{padding:15,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}
 
       >
          <View style={{flexDirection:'row',gap:15,justifyContent:'flex-start',padding:3,}}>
            <ShareIcon name='folder-images' size={17}/>
            <Text style={{textAlign:'center',}}>Galeriden Seç</Text>
          </View>
          </TouchableOpacity>
      
        
        <TouchableOpacity style={{padding:15,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
          <View style={{flexDirection:'row',gap:15,justifyContent:'flex-start',padding:3,}}>
          <ShareIcon name='camera' size={17}/>
            <Text style={{textAlign:'center',top:2}}>Fotoğraf Çek</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:15,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
          <View style={{flexDirection:'row',gap:15,justifyContent:'flex-start',padding:3,}}>
          <DeleteIcon name='delete-outline' size={20} color={'#EA2A29'}/>
            <Text style={{textAlign:'center',top:2, color:'#EA2A29'}}>Mevcut Fotoğrafı Kaldır</Text>
           
          </View>
          </TouchableOpacity>
       </View>
       </View>
   
      
     </Animated.View>
   </View>
    </View>
  
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
     height:'15%',
      paddingTop:width>400?20:10,
      
      alignItems:'center'
    },
    ProfilImage:{
      width:width>400 ?'25%':'22%',
      height: '100%',
      
      
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
    animatedView:{
      
      
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      backgroundColor: '#FFFF',  
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
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
     paddingTop:20,
     paddingBottom:5,
     paddingLeft:10,
      paddingRight:20,
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
})