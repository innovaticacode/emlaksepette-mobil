import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated, TouchableOpacity, Switch ,Modal, Touchable} from 'react-native'
import { useState, useRef ,useEffect} from 'react'
import { useRoute,useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import UserTypes from './profileComponents/UserTypes';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ModalEdit from "react-native-modal";
import DotIcon from 'react-native-vector-icons/Entypo'
import RNPickerSelect from "react-native-picker-select";
import { getValueFor } from '../../../components/methods/user';
import axios from 'axios';
export default function CreateUser() {
  const route = useRoute();
  const navigation = useNavigation();
  const { header,hidden3,hidden4,changeSlectedState,show } = route.params;
  const [display, setdisplay] = useState(false)
  const translateY = useRef(new Animated.Value(400)).current;
  const [isEnabled, setIsEnabled] = useState(false);
  const [UserTypeValue, setUserTypeValue] = useState('')
  const [isSelected, setisSelected] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
const [isShowSheet, setisShowSheet] = useState(false)
  const [isShowText, setisShowText] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonPress = (text) => {
    setUserTypeValue(text)
    closeSheet()
  };


    const Types=[
      {
        'Role':'Satış Temsilcisi',
        'id':1
      },
      {
        'Role':'Satış Departmanı',
        'id:':2
      }
    ]
    const [isShow, setisShow] = useState(false)

    const handlePres = (text) => {
      setisSelected(text)
     

   
    }
const [user, setuser] = useState({})

const [UserType, setUserType] = useState('')
const [roles, setroles] = useState({})


console.log(roles); // roles state'i güncellendikten sonra yazdırılmalı


  return (
    <TouchableWithoutFeedback onPress={() => {
     
      Keyboard.dismiss()
 
    }}>
      <View style={style.container}>
        <View style={[style.Form, {display:hidden3}]}>
          <View style={style.Inputs}>
            <View>
              <Text style={style.Label}>İsim Soyisim</Text>
              <TextInput style={style.Input} />
            </View>
            <View>
              <Text style={style.Label}>Email</Text>
              <TextInput style={style.Input} />
            </View>
            <View>
              <View style={{flexDirection:'row',gap:10}}>
              <Text style={style.Label}>Şifre</Text>
             
                 <Text style={{fontSize:11 ,display:show==='none'? 'flex':'none'}}>(DEĞIŞTIRMEK ISTEMIYORSANIZ BOŞ BIRAKIN)</Text>
             
            
              </View>
             
              <TextInput style={style.Input} />
            </View>
            <View>
            <Text style={style.Label}>Kullanıcı Tipi</Text>
            <RNPickerSelect
          doneText='Tamam'
          value={UserType}
              placeholder={{
                label: 'Seçiniz...',
                value: null,
              }}
              style={pickerSelectStyles}
               onValueChange={(value) => setUserType(value)}
              items={pickerItems}
            />
            </View>
        
  
            <View style={{flexDirection:'row',gap:20,}}>
            <Switch
              style={{left:7}}
              trackColor={{ false: 'red', true: '#E54242' }}
              thumbColor={isEnabled ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#9FA6BC"
              
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={[style.Label,{top:5}]}>Aktif</Text>
          </View>

          </View>
          <View style={{width:'100%',alignItems:'center', }}>
      <TouchableOpacity style={{backgroundColor:'#EA2A29',padding:13,width:'50%',borderRadius:10}}>
                <Text style={[style.label2,{color:'white',textAlign:'center',fontSize:16}]}>Kaydet</Text>
      </TouchableOpacity>
      </View>
        </View>
       
        <View style={{alignItems:'center' ,display:hidden4}}>
        <View style={style.card}>
     <View style={{display:'flex',flexDirection:'row',gap:20,justifyContent:'space-around'}}>
            <View style={style.profileImage}>
              <Text style={{fontSize:17,color:'white'}}>Tİ</Text>
            </View>
            <View style={style.profileName}>
              <View>
                <Text style={{fontSize:13,color:'#27B006'}}>Aktif</Text>
                </View>
                <View><Text style={{fontSize:17,color:'grey',fontWeight:'bold'}}>Teoman İnal</Text></View>
                <View><Text style={{fontSize:9,color:'grey',left:2}}>Satış Temsilcisi </Text></View>
            </View>
            <View style={{justifyContent:'center'}}>
              <Text style={{fontSize:9,color:'grey'}}>Referans Kodu</Text>
              <Text style={{color:'grey',fontSize:11}}>1234567</Text>
            </View>
            
          </View>
          <View style={{position:'absolute',right:10,top:12 }}>
              <TouchableOpacity onPress={()=>setModalVisible(true)}>
              <DotIcon name='dots-three-vertical' size={18}/>
              </TouchableOpacity>
              
            </View>
          
     </View>
        </View>
        {/**/}
        <ModalEdit
        isVisible={modalVisible}
        onBackdropPress={()=>setModalVisible(false)}
        swipeDirection={["down"]}
        onSwipeComplete={()=>setModalVisible(false)}
        backdropColor="transparent"
        style={style.modal3}
      >
        <View style={[style.modalContent3,{gap:10}]}>
          <View style={{alignItems:'center',paddingTop:15}}>
          <TouchableOpacity style={{backgroundColor:'#bdc6cf',padding:4,width:'15%',borderRadius:20}}/>
          </View>
            <View style={{gap:10,padding:10}}>
              <TouchableOpacity style={{padding:10,backgroundColor:'#EA2A28',flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{color:'white'}}>Kullanıcıyı Sil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:10,backgroundColor:'#79ad69',flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{color:'white'}}>Kullanıcıyı Düzenle</Text>
              </TouchableOpacity>
            </View>
               
                  
    
        </View>
      </ModalEdit>  
      </View>
    
    </TouchableWithoutFeedback>
  )
}
const pickerSelectStyles = StyleSheet.create({
  
  inputIOS: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 6,
    padding: 9,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#bdc6cf",
    borderRadius: 6,
    padding: 9,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  Form: {
    width: '100%',
    padding: 2,

  },
  Inputs: {
    gap: 20,
    padding: 20
  },
  Input: {
    padding: 9,
    backgroundColor: 'transparent',
    borderRadius: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ebebeb'
  },
  Label: {
    fontSize: 14,
    bottom: 3,
    left: 6,
    fontWeight: '300',
    letterSpacing: 0.5,
  
  },
  bottomSheetItem: {
    width: '100%',
    padding: 5,
   
  },
  animatedView: {

    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: '#FFFF',
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
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 20,
  },
  label2:{
    fontSize:14,
   
    fontWeight:'300',
    letterSpacing:0.5,
   
  },
  card: {  
 
    alignItems:'center',
backgroundColor: '#FFFFFF',  
borderRadius: 10,  
paddingVertical: 10,  
paddingHorizontal: 10,  
width: '90%',  
marginVertical: 10,  
display:'flex',
flexDirection:'row',
gap:10,

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
profileImage:{
width:60,
height:60,
backgroundColor:'red',

alignItems:'center',
justifyContent:'center',


},
profileName:{
justifyContent:'center'


},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 0,
},
modalView: {
  
  width:'70%',
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  gap:20,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
    
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
Btn:{
   backgroundColor:'#E54242',
            paddingLeft:20,
            paddingRight:20,
            padding:8,
            justifyContent:'center',
            borderRadius:10
        
},
btnText:{
  color:'white',

  letterSpacing:0.5
},
modal3: {
  justifyContent: "flex-end",
  margin: 0,
},
modalContent3: {
  backgroundColor: "#f5f5f7",

  height: "30%",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
})