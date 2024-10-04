import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import AdsPictureItem from './profileComponents/AdsPictureItem'
import { useNavigation } from '@react-navigation/native'
import { apiRequestGetWithBearer, apiRequestPostWithBearer } from '../../../components/methods/apiRequest'
import { ActivityIndicator } from 'react-native-paper'
import AwesomeAlert from 'react-native-awesome-alerts'
import { ALERT_TYPE, AlertNotificationDialog, AlertNotificationRoot, Dialog } from 'react-native-alert-notification'
import ImageViewing from "react-native-image-viewing";
export default function AdsPictureList({StoreBanners,getStoreBanner}) {
    const navigation=useNavigation()
    
    const [loadingPictures, setloadingPictures] = useState(false);
  
   
    const [deleteAlert, setdeleteAlert] = useState(false)

    const getIdForDelete=(id)=>{
      
        setSelectedPictureId(id)
       
        setTimeout(() => {
                setdeleteAlert(true)
        }, 200);
    }
    const [SelectedPictureId, setSelectedPictureId] = useState(null)
    const [resMessage, setresMessage] = useState([])
    const deleteStoreBanner= () => {
  
      apiRequestPostWithBearer(`institutional/store_banner/${SelectedPictureId}`,{
        "_method" : "DELETE"
      })
        .then((res) => {
      
          getStoreBanner()
          setTimeout(() => {
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Başarılı",
                textBody:res?.data?.message ,
                button: "Tamam",
              });
          }, 200);
         
      
        })
        .catch((err) => {
          
        })
        .finally(() => {
          
        });
    };
   
  return (
    <>
      {
           
           <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:40,gap:10}} showsVerticalScrollIndicator={false}>
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                   <View>
                       <Text>Yüklediğim Reklam Görselleri ({StoreBanners.length})</Text>
                   </View>
                
               </View>
                   {
                       StoreBanners.length==0?
                       <Text>afda</Text>:
                       StoreBanners?.map((item, _i) => (
                           <AdsPictureItem key={_i} image={item.image} id={item.id}  getIdForDelete={getIdForDelete}/>
                         ))
                       
                   }
         
           </ScrollView>
       }
      
         <AwesomeAlert
       show={deleteAlert}
       showProgress={false}
       titleStyle={{
         color: "#333",
         fontSize: 13,
         fontWeight: "700",
         textAlign: "center",
         margin: 5,
       }}
       title={"Mağaza Görselini Sil"}
       messageStyle={{ textAlign: "center" }}
       message={`Mağaza Görselini Silmek İstediğinize Emin misiniz?`}
       closeOnTouchOutside={true}
       closeOnHardwareBackPress={false}
       showCancelButton={true}
       showConfirmButton={true}
       cancelText="Vazgeç"
       confirmText="Sil"
       cancelButtonColor="#ce4d63"
       confirmButtonColor="#1d8027"
       onCancelPressed={() => {
         setdeleteAlert(false);
       }}
       onConfirmPressed={() => {
           setdeleteAlert(false)
           setTimeout(() => {
               deleteStoreBanner()
           }, 500);
       

         
       }}
       confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
       cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
     />
    </>

      
    

      
  )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#F5F5F7',
      
        
    }
})