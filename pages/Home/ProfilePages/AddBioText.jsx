import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

import { Keyboard } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { apiRequestGetWithBearer, apiRequestPostWithBearer } from "../../../components/methods/apiRequest";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from "react-native-alert-notification";
export default function AddBioText() {
  const richText = useRef();
useEffect(() => {
  Keyboard.addListener
}, [])
const [showButton, setshowButton] = useState(false)
  const [BioText, setBioText] = useState("");
  const [prevBioText, setprevBioText] = useState("")
  const [loadingText, setloadingText] = useState(false)
  const UploadText=()=>{
    setloadingText(true)
    let formData=new FormData()
    formData.append('about',BioText)
    apiRequestPostWithBearer(`institutional/about`, formData)
    .then((res) => {
        setTimeout(() => {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Başarılı",
                textBody:'Tanıtım Yazısı Başarı İle Yayınlandı' ,
                button: "Tamam",
                onHide:()=>{
                    getBiotext()
                }
              }); 
             
              
        }, 200);
    })
    .catch((err) => {
      alert(err);
    }).finally(()=>{
        setTimeout(() => {
            setloadingText(false)
        }, 500);
 

     
    })
  }
  const [loadingGetText, setloadingGetText] = useState(false)
  const getBiotext=()=>{
    setloadingGetText(true)
        apiRequestGetWithBearer('institutional/about').then((res)=>{
            setprevBioText(res?.data?.about)
            setBioText(res?.data?.about)
        }).catch((err)=>{
            alert(err)
        }).finally(()=>{
                setloadingGetText(false)
        })
  }
  useEffect(() => {
        getBiotext()
  }, [])
  const [IsChangedtext, setIsChangedtext] = useState(false)
  const navigation=useNavigation()
 const  onChangeBioText =()=>{
         

   
 }
 
 const handleGoBack = () => {

        Alert.alert(
            "Uyarı",
            "Eğer Sayfadan Çıkarsanız Yaptığınız Değişikler Silinir",
            [
              {
                text: "Kaydet",
                onPress: () => UploadText(),
                style: "cancel"
              },
              {
                text: "Kaydetmeden Çık",
                onPress: () => navigation.goBack(),
              
              }
            ]
          );
      
    
  
    return true; // Android'de fiziksel geri tuşunun varsayılan davranışını engellemek için true döndür
  };
  useEffect(() => {
    navigation.setOptions({
        
      headerLeft: () => (
<TouchableOpacity onPress={()=>{
    if (prevBioText==BioText) {
     navigation.goBack()
    }else{
        handleGoBack()
    }
} } >
 <Icon name="arrow-back-ios-new" size={25}/>
 </TouchableOpacity>
       
      ),
      
      
    });
  }, [prevBioText,BioText]);
 console.log(BioText==prevBioText)
  return (
    loadingGetText?
    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
        <ActivityIndicator/>
    </View>
    :
    <AlertNotificationRoot style={{flex:1}}>
         <TouchableWithoutFeedback style={{  }} onPress={()=>{
        richText.current.dismissKeyboard()
    }}>
  <View>
  <View style={{width:'100%',height:'70%'}}>
            {
                BioText && 
                <View style={{position:'absolute',zIndex:1,bottom:10,right:15}}>
                <Text style={{fontWeight:'600',color:'#333'}}>{BioText.length}</Text>
              </View>
            }
    
        <RichToolbar
          editor={richText}
          actions={[
            actions?.setBold,
            actions?.insertImage,
            actions?.insertBulletsList,
            actions?.insertOrderedList,
            actions?.insertLink,
            actions?.setStrikethrough,
            actions?.setItalic,
            actions?.setUnderline,
            actions?.heading1,
            actions.setTextColor
          
          ]}
          iconMap={{ [actions?.heading1]: handleHead }}
        />
        <RichEditor

        useContainer={false}
          ref={richText}
          placeholder="Tanıtım Yazısı Yazınız"
          height={200}
          initialContentHTML={prevBioText}
        
          onChange={(descriptionText) => {
               setBioText(descriptionText)
          }}
       
        
        />
      
        </View>
       
        
       
     
      
  </View>
        
       
   
      
    </TouchableWithoutFeedback>
    <View style={{padding:10,paddingTop:10,position:'absolute',bottom:50,width:'100%'}}>
        <TouchableOpacity style={{backgroundColor:'#EA2C2E',padding:13,borderRadius:6,width:'100%'}} onPress={UploadText}>
            {
                loadingText ?
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <ActivityIndicator/>
                </View>:
                <Text style={{textAlign:'center',fontWeight:'600',color:'#fff'}}>Kaydet</Text>
            }
            
        </TouchableOpacity>
    </View>

    </AlertNotificationRoot>
   
  );
}
const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);
const styles = StyleSheet.create({
    alert:{
        color:'red'
    }
});
