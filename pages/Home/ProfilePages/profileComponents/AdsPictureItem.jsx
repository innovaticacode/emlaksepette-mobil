import { View, Text ,StyleSheet,TouchableOpacity, ImageBackground} from 'react-native'
import React,{useState} from 'react'
import {apiRequestGetWithBearer, apiRequestPostWithBearer, frontEndUriBase } from '../../../../components/methods/apiRequest'
import ImageViewing from "react-native-image-viewing";
export default function AdsPictureItem({image,id,getIdForDelete}) {

const [isVisible, setIsVisible] = useState(false)
  return (
    <TouchableOpacity style={styles.uploadArea} onPress={()=>{
      setIsVisible(true)
    }}>
      <View style={styles.opacityAndButtons}>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.editButton}>
              <Text style={{color:'white',fontSize:15,fontWeight:'600'}}>Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={()=>{
          getIdForDelete(id)
            
          }}>
              <Text style={{color:'white',fontSize:15,fontWeight:'600'}}>Sil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ImageBackground source={{uri:`http://192.168.18.31:8000${image}`}} style={{width:'100%',height:'100%'}} borderRadius={10}/>
      <ImageViewing
              images={[
                {
                  uri: `http://192.168.18.31:8000${image}`,
                },
              ]}
              imageIndex={0}
              visible={isVisible}
              onRequestClose={() => setIsVisible(false)}
            />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    uploadArea:{
        width:'100%',
        height:170,
        borderRadius:10,

    },
    opacityAndButtons:{
      position:'absolute',
    width:'100%',
    height:'100%',
      zIndex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#00000070',
      borderRadius:10

    },
    buttons:{
      flexDirection:'row',
      gap:20
    },
    editButton:{
      backgroundColor:'#11110Ede',
      padding:9,
      borderRadius:8
    },
    deleteButton:{
      backgroundColor:'#EA2C2E',
      paddingLeft:25,
      paddingRight:25,
      paddingTop:8,
      paddingBottom:8,
      borderRadius:8
    }
 
})