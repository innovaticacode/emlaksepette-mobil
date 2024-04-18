import { View, Text,StyleSheet, ScrollView ,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import SwapItem from './profileComponents/SwapItem'
import Modal from "react-native-modal";
export default function SwapScreen() {
    const [DetailModal, setDetailModal] = useState(false)
    const openModal=()=>{
        setDetailModal(true)
    }
  return (
    <ScrollView style={styles.container}  contentContainerStyle={{gap:15,paddingBottom:50}}>
    <SwapItem openModal={openModal}/>
    <SwapItem openModal={openModal}/>
    <SwapItem openModal={openModal}/>
   
 
    <Modal
        animationType="slide"
             backdropColor='#0000'
              onBackdropPress={()=> setDetailModal(!DetailModal)}
        visible={DetailModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setDetailModal(!DetailModal);
        }}>
        <View style={{}}>
          <View style={[styles.modalView, styles.card,{padding:0,borderRadius:10,backgroundColor:"#F8F7F4",gap:20}]}>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Text style={{fontSize:17}}>1.Başvuru Detayları</Text>
          <TouchableOpacity onPress={()=>setDetailModal(false)}>
              <Icon name='closecircle' size={23}/>
          </TouchableOpacity>
          </View>
           
                <View style={{gap:20}}>
                <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}><Text style={{fontWeight:'bold'}}>Adı:</Text> Bozmaz</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}><Text style={{fontWeight:'bold'}}>Telefon:</Text> 05537064474</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Email: </Text>kerembzmz44@gmail.com</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Şehir: </Text>Malatya</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>İlçe: </Text>Arapgir</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Takas Tercihi: </Text>Araç</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Oda Sayısı: </Text>Araç</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Araç Model Yılı: </Text>Araç</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Araç Markası: </Text>Araç</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Yakıt Tipi: </Text>Araç</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Vites Tipi: </Text>Araç</Text>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#ebebeb',paddingBottom:5}}>
                    <Text style={{color:'#333'}}> <Text style={{fontWeight:'bold'}}>Araç Satış Rakamı: </Text>Araç</Text>
                    </View>
                 
                </View>
                
           
          
          </View>
        </View>
      </Modal>
    
    </ScrollView>
  )
}
const styles = StyleSheet.create({
        container:{
            padding:10,
            backgroundColor:'#F5F5F7',
            gap:10
        },
        card:{
            backgroundColor:'#FFF',
            borderRadius: 10,  
            paddingVertical: 30,  
            paddingHorizontal: 10,  
            width: '100%',  
          
        
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
        }
})