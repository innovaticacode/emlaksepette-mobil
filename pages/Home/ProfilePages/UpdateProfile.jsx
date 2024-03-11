import { View, Text, StyleSheet,Dimensions, TouchableOpacity, Image,TextInput, Keyboard,Animated, TouchableWithoutFeedback} from 'react-native'
import {useRef,useState} from 'react'
import Editıcon from "react-native-vector-icons/MaterialCommunityIcons"

import ShareIcon from "react-native-vector-icons/Entypo"
import DeleteIcon from "react-native-vector-icons/MaterialIcons"
import PencilIcon from "react-native-vector-icons/FontAwesome5"
export default function UpdateProfile() {
  const translateY = useRef(new Animated.Value(400)).current;

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
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={{flex:1}}>
    <View style={styles.container} onTouchStart={()=>{
    
        closeSheet()
      }}>
  <View style={styles.ProfileEditArea}>
      <TouchableOpacity style={styles.ProfilImage} onPress={openSheet}>
            <Image source={require('.././profil.jpg')} style={{width:'100%',height:'100%'}} />
            <TouchableOpacity style={{position:'absolute',bottom:0,right:0,backgroundColor:'#EA2A29',padding:4,}} onPress={openSheet}>
      <Editıcon name='account-edit' size={20} color={'white'}/>
      </TouchableOpacity>
      </TouchableOpacity> 
  </View>
  <View style={{padding:10}}>
    <View style={styles.Form}>
          <View>
            <Text style={styles.label}>İsim</Text>
            <TextInput style={styles.Input}  selectTextOnFocus={true} placeholder='İsim Soyisim' />
          </View>
          <View>
            <Text style={styles.label}>Cep Telefonu</Text>
            <TextInput style={styles.Input} keyboardType='number-pad' value={phoneNumber} onChangeText={onChangeText} placeholder='0544 444 44 44' maxLength={14}/>
          </View>
          <View>
            <Text style={styles.label}>Iban Numarası</Text>
            <TextInput style={styles.Input} value={iban} onChangeText={onChangeText2} onFocus={onFocus}  maxLength={28} keyboardType='number-pad'/>
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.updatebtn}>
              <Text style={styles.btnText}>Güncelle</Text>
            </TouchableOpacity>
          </View>
    </View>
    </View>
    </View>
    <View style={{ flex: 1,position:'absolute' ,bottom:0,width:'100%', }}>
     
     <Animated.View
       style={ [styles.animatedView,{transform: [{ translateY }],}] }>

       <View style={{width:'100%',}}>
       <View style={{alignItems:'center'}}>
        <TouchableOpacity style={{width:40,height:7,backgroundColor:'#ebebeb',borderRadius:10}} onPress={closeSheet}>

        </TouchableOpacity>
       </View>
       <View style={{paddingBottom:10}}>
       <TouchableOpacity style={{padding:15,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
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
      padding:15,
      backgroundColor:'transparent',
      borderRadius:20,
      fontSize:15,
      borderWidth:2,
      borderColor:'#ebebeb'
    },
    label:{
      fontSize:14,
      bottom:5,
      left:2,
      fontWeight:'300',
      letterSpacing:0.5,
      fontFamily:'Verdana'
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
      width:'50%',
      backgroundColor:'#E54242',
      padding:13,
      borderRadius:10,
      
    },
    btnText:{
        textAlign:'center',
        color:'white',
        fontFamily:'Verdana',
        fontSize:13,
        fontWeight:'500'
    }
})