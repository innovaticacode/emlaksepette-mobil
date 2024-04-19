import { View, Text, StyleSheet, ScrollView, TextInput, Keyboard ,Animated,TouchableOpacity,Modal,Linking} from 'react-native'
import { useState,useRef,useEffect} from 'react'
import CollectionsItem from './profileComponents/CollectionsItem'

import ShareIcon from "react-native-vector-icons/Entypo"
import DeleteIcon from "react-native-vector-icons/MaterialIcons"
import PencilIcon from "react-native-vector-icons/FontAwesome5"
import Icon from "react-native-vector-icons/FontAwesome"
import Heart from "react-native-vector-icons/AntDesign";
import IconMessenger from "react-native-vector-icons/Fontisto"
import IconSms from "react-native-vector-icons/Feather"
import * as Clipboard from 'expo-clipboard';

import { SearchBar } from '@rneui/themed';
import axios from 'axios'
import { getValueFor } from '../../../components/methods/user'
export default function Collections() {
  const [showAlert, setshowAlert] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [SharemodalVisible, setShareModalVisible] = useState(false);
  const [searchColection, setSearchColection] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [display, setdisplay] = useState(false)
  const updateSearch = (searchColection) => {
    setSearchColection(searchColection);
  };
  const translateY = useRef(new Animated.Value(400)).current;

  const openSheet = () => {
    setIsDisabled(true)
    setdisplay(true)
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
    
  const closeSheet = () => {
setIsDisabled(false)
setdisplay(false)
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }; 
  const shareLinkOnWhatsApp = () => {
 
    const url=`https://7f24-78-178-52-190.ngrok-free.app/proje/1000381/detay`
  
 
    const whatsappShareURL = `whatsapp://send?text=${encodeURIComponent(url)}`;
  
   
    Linking.openURL(whatsappShareURL)
      .then(() => console.log('WhatsApp açıldı ve link paylaşıldı'))
      .catch((error) => console.error('WhatsApp açılamadı:', error));
  };
  const shareLinkOnInstagram = (text) => {
 
    const url=`https://7f24-78-178-52-190.ngrok-free.app/proje/1000381/detay`
  
   
    const instagramShareURL = `instagram://story/?text=${encodeURIComponent(url)}`;
  
   
    Linking.openURL(instagramShareURL)
      .then(() => console.log('Instagram açıldı ve link paylaşıldı'))
      .catch((error) => console.error('Instagram açılamadı:', error));
  };
  const copyToClipboard = () => {
    const url=`https://7f24-78-178-52-190.ngrok-free.app/proje/1000381/detay`
    Clipboard.setStringAsync(url);
   ShowAlert()
  };
  const handleShareViaSMS = (text) => {
    const url = text; 
    const message = `Bu linki kontrol et: ${url}`;

 
    Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
  };
  const shareLinkOnMessenger = () => {
    const url = 'https://7f24-78-178-52-190.ngrok-free.app/proje/1000381/detay';
    const messengerShareURL = `fb-messenger://share/?link=${encodeURIComponent(url)}`;
  
    Linking.openURL(messengerShareURL)
      .then(() => console.log('Messenger açıldı ve link paylaşıldı'))
      .catch((error) => console.error('Messenger açılamadı:', error));
  };

const shareLinkOnFacebook = () => {
  const myAppLink = 'https://myapp.com/link-to-share'; // Paylaşılacak link
  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(myAppLink)}`;

  Linking.openURL(facebookShareURL)
    .then(() => console.log('Facebook paylaşımı başlatıldı'))
    .catch((error) => console.error('Facebook paylaşımı başlatılamadı:', error));
};
const ShowAlert = ()=>{
  setshowAlert(true)
  setTimeout(() => {
    setshowAlert(false)
  }, 2000);
}
const [collections, setcollections] = useState([])
const [start,setStart] = useState(1);
const [take,setTake] = useState(10);
const [user,setUser] = useState({})

// useEffect(() => {
//   getValueFor("user",setUser)
// },[]);
// useEffect(() => {
//   axios.get('https://emlaksepette.com/api/apiproject_housings/412?start=10&end=20'+start+'&take='+take,{ headers: { Authorization: 'Bearer ' + user.access_token } }).then((res) => {
//     setcollections(res.data.data + 'evler');

//   console.log(user+ 'user')
//   }).catch((e) => {
//     console.log(e);
//   })
// },[user]);
  return ( 
    <View style={{flex:1,}}>
    <View style={{alignItems:'center',flex:1,padding:10,backgroundColor:'white'}} onTouchStart={()=>{
      Keyboard.dismiss()
      closeSheet()
    }}>
     
      <View style={styles.SearchArea}> 
    <SearchBar inputStyle={styles.Input} containerStyle={{padding:4,backgroundColor:'#dbdbdb',borderBottomWidth:0,borderTopWidth:0,borderRadius:4}}
     inputContainerStyle={{backgroundColor:'#ebebeb',padding:0}}
     placeholder='Koleksiyonlarında Ara...'
    value={searchColection}
    onChangeText={setSearchColection}
    onFocus={closeSheet}
     />
      </View>
    <View style={styles.container}>
    <View style={{display:showAlert? 'flex':'none', justifyContent:'center',alignItems:'center',paddingBottom:15}}>
          <View style={{padding:11, backgroundColor:'#6fdb4e97',display:showAlert? 'flex':'none' , flexDirection:'row',alignItems:'center',gap:15,borderRadius:10,}}>
            <Text style={{textAlign:'center',color:'white'}}>Bağlantı Panoya Kopyalandı</Text>
            <Heart name="check" size={20} color={'white'}/>
       </View>  
       </View>
     
  <ScrollView  showsVerticalScrollIndicator={false}>

        <CollectionsItem openBottom={openSheet} disabled={isDisabled} shareWp={shareLinkOnWhatsApp} copy={copyToClipboard}/>
 


    </ScrollView> 
   
    </View>
  
    </View>
   
    <View style={{ flex: 1,position:'absolute' ,bottom:0,width:'100%', display: display==false? 'none':'flex'}}>
     
     <Animated.View
       style={ [styles.animatedView,{transform: [{ translateY }],}] }>

       <View style={{width:'100%',}}>
       <View style={{alignItems:'center'}}>
        <TouchableOpacity style={{width:40,height:7,backgroundColor:'#ebebeb',borderRadius:10}} onPress={closeSheet}>

        </TouchableOpacity>
       </View>
       <View style={{paddingBottom:10}}>
       <TouchableOpacity style={{padding:15,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}
        onPress={()=>setModalVisible(!modalVisible)}
       >
          <View style={{flexDirection:'row',gap:15,justifyContent:'flex-start',padding:3,}}>
            <PencilIcon name='pencil-alt' size={17}/>
            <Text style={{textAlign:'center',}}>Koleksiyonun Adını Düzenle</Text>
          </View>
          </TouchableOpacity>
       <TouchableOpacity style={{padding:15,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}
        onPress={()=>{
          setShareModalVisible(!SharemodalVisible)
        }}
       >
          <View style={{flexDirection:'row',gap:15,justifyContent:'flex-start',padding:3,}}>
          <ShareIcon name='share-alternative' size={18}/>
            <Text style={{textAlign:'center',top:2}}>Paylaş</Text>
           
          </View>
          </TouchableOpacity>
        
        <TouchableOpacity style={{padding:15,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}
          onPress={()=>setModalVisible2(!modalVisible2)}
        >
          <View style={{flexDirection:'row',gap:15,justifyContent:'flex-start',padding:3,}}>
            <DeleteIcon name='delete-outline' size={20}/>
            <Text style={{textAlign:'center',top:2}}>Koleksiyonu Sil</Text>
          </View>
          </TouchableOpacity>
        
       </View>
       </View>
   
      
     </Animated.View>
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
          <View style={{gap:5}}>
            <Text>Koleksiyon Adı</Text>
            <TextInput style={[styles.Input,{width:'100%'}]}
  
            />
          </View>
         
           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity style={{backgroundColor:'green',padding:15,paddingLeft:20,paddingRight:20,borderRadius:5}}
       
            >
              <Text style={{color:'white',fontSize:15,}}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'red',padding:15,paddingLeft:20,paddingRight:20,borderRadius:5}}
            onPress={()=>setModalVisible(!modalVisible)}
            >
              <Text style={{color:'white',fontSize:15,}}>İptal</Text>
            </TouchableOpacity>
           </View>
       
         
          </View>
        </View>
      </Modal> 
      <Modal
        animationType="slide" // veya "fade", "none" gibi
        transparent={true}
        visible={SharemodalVisible}
        onRequestClose={() => {
          setShareModalVisible(!SharemodalVisible);
        }}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
         
     
          
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection:'row',gap:17,justifyContent:'center'}}>
            <TouchableOpacity style={{backgroundColor:'#1cea30',padding:15,borderRadius:30,justifyContent:'center'}}
              onPress={copyToClipboard}
            >
          <ShareIcon name='link' size={30} color={'white'}/>
           </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#01E676',padding:15,paddingRight:17,paddingLeft:17,borderRadius:30}}
              onPress={shareLinkOnWhatsApp}
            >
         <Icon name='whatsapp' size={33}color={'white'}/>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'#0766FF',paddingLeft:20,paddingRight:20,borderRadius:30,justifyContent:'center'}}
            onPress={shareLinkOnFacebook}
           >
        <Icon name='facebook' size={30} color={'white'}/>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'#F04E53',paddingLeft:17,paddingRight:17,borderRadius:30,justifyContent:'center'}}
              onPress={shareLinkOnInstagram}
           >
        <Icon name='instagram' size={31} color={'white'}/>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'#0766FF',paddingLeft:15,paddingRight:15,borderRadius:30,padding:13,justifyContent:'center'}}
           onPress={handleShareViaSMS}
           >
        <IconSms name='message-circle' size={30} color={'white'}/>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'#0766FF',paddingLeft:15,paddingRight:15,borderRadius:30,padding:13,justifyContent:'center'}}
            onPress={shareLinkOnMessenger}
           >
        <IconMessenger name='messenger' size={30} color={'white'}/>
           </TouchableOpacity>
            </View>
           
            </ScrollView>
            <View style={{alignItems:'center',paddingTop:10}}>
              <TouchableOpacity style={{backgroundColor:'red',paddingRight:25,paddingLeft:25,padding:5,borderRadius:5}}
                onPress={()=>setShareModalVisible(!SharemodalVisible)}
              >
                <Text style={{color:'white'}}>Kapat</Text>
              </TouchableOpacity>
            </View>
         
       
         
          </View>
        </View>
      </Modal> 
      <Modal
        animationType="slide" // veya "fade", "none" gibi
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView3}>
          <View style={styles.modalView3}>
            <Text style={styles.modalText3}>Ürünü favorilerden kaldırmak istiyormusunuz?</Text>
            <View style={{display:'flex',flexDirection:'row',gap:25,}}>
            <TouchableOpacity style={{backgroundColor:'red',paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10,borderRadius:10}}>
              <Text style={{color:'white'}}>Evet</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => setModalVisible2(!modalVisible2)} 
            style={{backgroundColor:'#35f40e',paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10,borderRadius:10}}>
              <Text style={{color:'white'}}>Vazgeç</Text>
            </TouchableOpacity>
            </View>
       
         
          </View>
        </View>
      </Modal> 
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: 25,
        paddingHorizontal: 0,
        width: '100%',
        marginVertical: 0,
    },
      SearchArea:{
        width:'100%',
      
      },
      
        Input: {
          backgroundColor: '#ebebebba',
          marginTop: 0,
          padding: 10,
          fontSize: 17,
          borderRadius: 4,
            
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
       paddingBottom:20,
       paddingLeft:10,
        paddingRight:20,
      },
      centeredView: {
        padding:20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // modal dışı koyu arkaplan
      },
      modalView: {
        width:'100%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
       gap:20,
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
      centeredView2: {
        padding:20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // modal dışı koyu arkaplan
      },
      modalView2: {
        width:'100%',
    
        backgroundColor: 'white',
        borderRadius: 10,
        padding:20,
        gap:15,
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
      centeredView3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // modal dışı koyu arkaplan
      },
      modalView3: {
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
      modalText3: {
        marginBottom: 15,
        textAlign: 'center',
      },
      
})