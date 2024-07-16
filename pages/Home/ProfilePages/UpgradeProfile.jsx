import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState,useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome2 from 'react-native-vector-icons/FontAwesome6'
import Feather from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import Icon3 from "react-native-vector-icons/MaterialIcons";
import RNPickerSelect from "react-native-picker-select";
import { Platform } from "react-native";
import Arrow from "react-native-vector-icons/SimpleLineIcons";
import * as Location from "expo-location";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from 'expo-image-picker';
import { getValueFor } from "../../../components/methods/user";
import { Image } from "react-native-elements";
import MapView from "react-native-maps";
export default function UpgradeProfile() {
  const route = useRoute();
  const { name, tab } = route.params;
  const [choose, setchoose] = useState(false)
  const PhotoUrl = "https://private.emlaksepette.com/storage/profile_images/";
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
        
        }
      }
    })();
  }, []);
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          // alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const [userName, setuserName] = useState("")
  const [iban, setiban] = useState("");
  const [link, setlink] = useState("");
  const [yearsOfSector, setyearsOfSector] = useState("");
  const [phone, setphone] = useState("");
  const [mobilPhone, setmobilPhone] = useState("");
  useEffect(() => {
        setiban(user?.iban)
        setlink(user?.website)
        setyearsOfSector(user?.year)
        setuserName(user?.name)
  }, [user])
  const [openAccor, setopenAccor] = useState(false)
  return (
    <ScrollView style={styles.container} contentContainerStyle={{gap:20,paddingBottom:40}}>
      <View
        style={{
          width: "100%",
          backgroundColor: "red",
          padding: 15,
          alignItems: "center",
        }}
      >
        <View>
          <View
            style={{
              width: 96,
              height: 96,
             
              borderRadius: 50,
            }}
          >

<Image
                source={{ uri: image ? image : `${PhotoUrl}${user.profile_image}` }}
                style={{ width: "100%", height: "100%",borderRadius:50}}
               borderRadius={50}
               />
          </View>
          <TouchableOpacity
                onPress={()=>{
                setchoose(true)
                }}
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              backgroundColor: "#777777",
              borderRadius: 50,
              padding: 4,
            }}
          >
            <View>
              <Icon name="account-edit" size={25} color={"white"} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", paddingTop: 10, gap: 5 }}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
            {user?.name}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "500", color: "#fff" }}>
            {user?.role}
          </Text>
        </View>
      </View>
     
      <View style={{ width: "100%", alignItems: "center" }}>
     
        <View style={{ padding: 5, width: "90%", gap: 25 }}>

            {
                tab ==1 && 
                <>
                        <View style={{ width: "100%",gap:10 }}>
          <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
              <Entypo name="old-phone" size={15} color={'#777777'}/>
            <Text style={styles.label}>Mevcut Telefon Numarası</Text>
          </View>
          <View>
            <TextInput style={styles.ınput} value={phone} onChangeText={(value)=>setphone(value)}/>
          </View>
        </View>

        <View style={{ width: "100%" ,gap:10}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
          <Entypo name="old-phone" size={15} color={'#777777'}/>
            <Text style={styles.label}>Yeni Telefon Numarası</Text>
          </View>
          <View>
            <TextInput style={styles.ınput} keyboardType='numeric' value={iban} onChangeText={(value)=>setiban(value)} />
          </View>
        </View> 
        <View style={[styles.card,{gap:10}]}>
        <TouchableOpacity style={{width:'100%',height:150,borderWidth:1,borderStyle:'dashed',borderColor:'#F27B7D',backgroundColor:'#FDEAEA',alignItems:'center',justifyContent:'center',borderRadius:9}}>
                    <View>
                        <Feather name="cloud-upload-outline" size={60} color={'#EA2B2E'}/>
                        
                    </View>
                    <Text style={{color:'#EA2B2E',fontSize:13}}>Dosyanızı buraya yükleyiniz</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',width:'100%',backgroundColor:'#FDEAEA',padding:10,borderRadius:5,gap:10,alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
            <FontAwesome name="file-text-o" color={'#EB373A'} size={15}/>
                <Text style={{fontSize:13,color:'grey'}}>Belge.pdf</Text>
                <Text style={{fontSize:11}}>Yükleniyor</Text>
            </View>
          

                <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                    <Text style={{fontSize:12,color:'#333',fontWeight:'600'}}>70%</Text>
                    <TouchableOpacity style={{padding:5}}>
                    <Icon name="close" size={15} color={'#333'}/>
                    </TouchableOpacity>
                   
                </View>

        </View> 
  

        </View>
        <Collapse onToggle={()=>setopenAccor(!openAccor)} >
    <CollapseHeader>
      <View style={[styles.card,{padding:0,flexDirection:'row',justifyContent:'space-between',paddingVertical:10}]}>
        <Text style={{color:'#333',}}>Yüklemeniz Gereken Belge Örneği</Text>
        <Arrow name=  {openAccor? 'arrow-down' :'arrow-right'}size={15} color={'grey'}/>
      </View>
    </CollapseHeader>
    <CollapseBody style={{}} >
    <View style={[styles.card, { gap: 15, paddingHorizontal:4,paddingVertical:8,alignItems:'center'}]}>
          <View style={{width:250,height:200}}>
                    <Image source={{uri:'https://private.emlaksepette.com/images/phone-update-image/phonefile.jpg'}} style={{width:'100%',height:'100%'}}/>
          </View>
               
              </View>
    </CollapseBody>
</Collapse>
                </>
            }
        {
        tab == 2 &&
        <>
        <View style={{ width: "100%",gap:10 }}>
          <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
              <Entypo name="old-phone" size={15} color={'#777777'}/>
            <Text style={styles.label}>Sabit Telefonu</Text>
          </View>
          <View>
            <TextInput style={styles.ınput} value={phone} onChangeText={(value)=>setphone(value)}/>
          </View>
        </View>

        <View style={{ width: "100%" ,gap:10}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
              <FontAwesome name="credit-card-alt" color={'#777777'} size={13}/>
            <Text style={styles.label}>Iban Numarası</Text>
          </View>
          <View>
            <TextInput style={styles.ınput} keyboardType='numeric' value={iban} onChangeText={(value)=>setiban(value)} />
          </View>
        </View>
        <View style={{ width: "100%" ,gap:10}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
              <View style={{backgroundColor:'#777777',padding:4,borderRadius:50}}>
                  <Entypo name="link" color={'#ffff'}/>
              </View>
            <Text style={styles.label}>Website Linki</Text>
          </View>
          <View>
            <TextInput style={styles.ınput} value={link} onChangeText={(value)=>setlink(value)} />
          </View>
        </View>
        <View style={{ width: "100%" ,gap:10}}>
          <View  style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
              <FontAwesome2 name="user-tie" size={17} color={'#777777'}/>
            <Text style={styles.label}>Kaç yıldır sektördesiniz</Text>
          </View>
          <View>
            <TextInput style={styles.ınput} value={yearsOfSector} onChangeText={(value)=>setyearsOfSector(value)}/>
          </View>
        </View>
        </>
            }
        {
            tab== 0 &&
            <>
            <View style={{ width: "100%" ,gap:10}}>
            <View  style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
                <FontAwesome2 name="user-tie" size={17} color={'#777777'}/>
              <Text style={styles.label}>Kullanıcı Adı</Text>
            </View>
            <View>
              <TextInput style={styles.ınput} value={userName} onChangeText={(value)=>setuserName(value)}/>
            </View>
          </View>
            <View style={{ width: "100%" ,gap:10}}>
         <View style={{flexDirection:'row',alignItems:'center',gap:5,paddingLeft:10}}>
             <FontAwesome name="credit-card-alt" color={'#777777'} size={13}/>
           <Text style={styles.label}>Iban Numarası</Text>
         </View>
         <View>
           <TextInput style={styles.ınput} keyboardType='numeric' value={iban} onChangeText={(value)=>setiban(value)} />
         </View>
       </View>
 
          </>
        }
        {
            tab ==3 &&
            <>
            <View style={{height:400}}>
                <MapView
                style={{ flex: 1 }}
                />
            </View>
            </>
        }
  
         
      </View>
 

    
     

      </View>
      <View style={{alignItems:'center'}}>
        <TouchableOpacity style={{width:'100%',backgroundColor:'#EA2B2E',width:'90%',padding:10,borderRadius:10}}>
            <Text style={{textAlign:'center',color:'#fff',fontWeight:'600'}}>Güncelle</Text>
        </TouchableOpacity>
      </View>
      <Modal
          isVisible={choose}
          style={styles.modal2}
          animationIn={"fadeInDown"}
          animationOut={"fadeOutDown"}
          onBackdropPress={()=>setchoose(false)}
          swipeDirection={['down']}
          onSwipeComplete={()=>setchoose(false)}
        >
          <View style={styles.modalContent2}>
            <View style={{padding:10,alignItems:'center'}}>
              <TouchableOpacity style={{width:'15%',backgroundColor:'#c2c4c6',padding:4,borderRadius:50}}>

              </TouchableOpacity>
            </View>
            <View style={{padding:20,gap:35}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={pickImage}>
                      <Icon3 name="photo" size={23} color={'#333'}/>
                      <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Kütüphaneden Seç</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={takePhoto}>
                      <Icon3 name="add-a-photo" size={21} color={'#333'}/>
                      <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Fotoğraf Çek</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}}>
                      <Icon3 name="restore-from-trash" size={22} color={'#d83131'}/>
                      <Text style={{fontSize:14,color:'#d83131',fontWeight:'700'}}>Mevcut Fotoğrafı Kaldır</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    
  },
  ınput: {
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  label:{
    color:'#777777',
    fontSize:13,
    fontWeight:'600'
  },
  modal2: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent2: {
    gap: 10,
  
    backgroundColor: "#F8F7F4",
    padding: 10,
    height: "30%",

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "white",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: "100%",
  
 
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
