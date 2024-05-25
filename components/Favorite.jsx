import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Button,
  Modal
} from "react-native";
import {React,useState} from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/Fontisto";
import Posts from "./Posts";
import { Platform } from "react-native";

export default function Favorite() {
  const [modalVisible, setModalVisible] = useState(false);
  const handlepress=()=>{

  }
  return (
    <View style={{padding:10,backgroundColor:'white'}}>
  <View style={styles.containerPost}>
  
    <Posts caption='Master Sonsuz Tatil Köyü' isFavorited='true' setModalVisible={setModalVisible} />
  
   
  </View>

      <Modal
        animationType="slide" // veya "fade", "none" gibi
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Ürünü favorilerden kaldırmak istiyormusunuz?</Text>
            <View style={{display:'flex',flexDirection:'row',gap:25,}}>
            <TouchableOpacity style={{backgroundColor:'red',paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10,borderRadius:10}}>
              <Text style={{color:'white'}}>Evet</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)} 
            style={{backgroundColor:'#35f40e',paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10,borderRadius:10}}>
              <Text style={{color:'white'}}>Vazgeç</Text>
            </TouchableOpacity>
            </View>
       
         
          </View>
        </View>
      </Modal> 
  </View>
  );
}

const styles = StyleSheet.create({
    containerPost:{
 
     
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
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', // modal dışı koyu arkaplan
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
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
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },

});
