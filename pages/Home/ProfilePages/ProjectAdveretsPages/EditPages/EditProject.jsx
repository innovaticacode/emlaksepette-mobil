import { View, Text, StyleSheet, ScrollView, Image, Modal, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ArrowRightIcon from 'react-native-vector-icons/AntDesign';
import HomeIcon from 'react-native-vector-icons/Entypo';
import BuildingIcon from 'react-native-vector-icons/FontAwesome';
import WidthIcon from 'react-native-vector-icons/SimpleLineIcons';
import LocationIcon from 'react-native-vector-icons/MaterialIcons';
import CalendarIcon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { useIsFocused, useRoute } from "@react-navigation/native";
import { actions, RichEditor, RichToolbar }  from "react-native-pell-rich-editor"; 
import MapView, { Marker } from 'react-native-maps';
import { apiRequestGet, apiRequestPost, frontEndUri } from '../../../../../components/methods/apiRequest';
import { addDotEveryThreeDigits } from '../../../../../components/methods/merhod';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';


export default function EditProject() {
  const route = useRoute();
  const { id ,name} = route.params;

  const [data,setData] = useState({
    start_date : new Date(),
    end_date : new Date()
  });

  const [showCoverImageModal,setCoverImageModal] = useState(false);
  const [selectedImage,setSelectedImage] = useState("");
  const [loading, setloading] = useState(false)
  useEffect(() => {
    setloading(true)
    apiRequestGet('get_my_project/'+id).then((res) => {
      setloading(false)
      setData({
        ...res.data.project,
        start_date : new Date(res.data.project.start_date),
        end_date : new Date(res.data.project.project_end_date),
      });

      richText.current?.setContentHTML(res.data.project.description)
    })
  },[])

  const [open,setOpen] = useState(false);
  
  const richText = useRef(null); 
  const setDataFunc = (key,value) => {
    setData({
      ...data,
      [key] : value
    })
  }

  const deleteImage = (id) => {
    apiRequestPost('delete_project_gallery_image/'+id,{'_method' : 'DELETE'}).then((res) => {
      
      const newImages = data.images.filter((image) => {
        if(image.id != id){
          return image;
        }
      })

      setData({
        ...data,
        images : newImages
      });

      setCoverImageModal(false);
    })
  }
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);



   useEffect(() => {
     const fetchCities = async () => {
       try {
       const response = await axios.get(
           "https://mobil.emlaksepette.com/api/cities"
         );
         setCities(response.data.data);
       } catch (error) {
         console.error("Hata:", error);
         Alert.alert("Error", "Could not load cities");
       }
     };

     fetchCities();
   }, []);

   const fetchCounties = async (cityId) => {
     try {
       const response = await axios.get(
         `https://mobil.emlaksepette.com/api/counties/${cityId}`
       );
       setCounties(response.data.data);
     } catch (error) {
       console.error("Hata:", error);
       Alert.alert("Error", "Could not load counties");
     }
   };

   const fetchNeighborhoods = async (countyId) => {
     try {
       const response = await axios.get(
         `https://mobil.emlaksepette.com/api/neighborhoods/${countyId}`
       );
       setNeighborhoods(response.data.data);
     } catch (error) {
       console.error("Hata:", error);
   Alert.alert("Error", "Could not load neighborhoods");
  }
   };



   const onChangeCity = (value) => {
     setSelectedCity(value);
     setSelectedCounty(null);
     setSelectedNeighborhood(null);

     setCounties([]);
     setNeighborhoods([]);
     if (value) {
       fetchCounties(value);
      
     }
   };

   const onChangeCounty = (value) => {
     setSelectedCounty(value);
     setSelectedNeighborhood(null);
     setNeighborhoods([]);
     if (value) {
       fetchNeighborhoods(value);
       
     }
   };

   const onChangeNeighborhood = (value) => {
     setSelectedNeighborhood(value);
     if (value) {
    
   }
   };
   const isFocused =useIsFocused(false)
   useEffect(() => {
  
        setSelectedCity(data?.city?.id)
        setSelectedCounty(data?.county?.ilce_key)

   }, [data,selectedCity,selectedCounty])


  return (
    <>
    {
      loading ?
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator color='#333'/>
      </View>
      :
      <ScrollView style={{backgroundColor:'#f7f7f7'}} >
      <View style={{backgroundColor:'transparent'}}>
        <View style={styles.breadcrumb}>
      
          <Text style={{marginLeft:5,fontWeight:'bold',fontSize:12}}>Proje İlanlarım </Text>
          <ArrowRightIcon style={{marginLeft:5,fontWeight:'bold',fontSize:12}} name='right'/>
          <Text style={{marginLeft:5,fontWeight:'bold',fontSize:12}}>Genel Düzenleme</Text>
          <ArrowRightIcon style={{marginLeft:5,fontWeight:'bold'}} name='right'/>
          <Text style={{marginLeft:5,fontWeight:'bold',fontSize:12}}>{name}</Text>
         
        </View>
        <View style={styles.card}>
          <Modal
            animationType="fade"
            transparent={false}
            visible={showCoverImageModal}
            style={{backgroundColor:'#000'}}
            onRequestClose={() => {
              setCoverImageModal(!showCoverImageModal);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{width:'100%',height:'100%'}}>
                  <View style={styles.close_icon_area}>
                    <TouchableOpacity onPress={() => {setCoverImageModal(!showCoverImageModal)}}>
                      <CloseIcon name='close' style={styles.close_icon} size={30}></CloseIcon>
                    </TouchableOpacity>
                  </View>
                  <Image style={{width:'100%',height:'100%',objectFit:'contain'}} source={{uri : frontEndUri+(selectedImage?.image?.replace('public','storage'))}}></Image>
                  <View style={styles.image_buttons}>
                    <TouchableOpacity onPress={() => {deleteImage(selectedImage?.id)}}>
                      <View style={styles.image_button}>
                        <CloseIcon name='delete' style={styles.image_delete_button} size={30}></CloseIcon>
                        <Text style={styles.image_text}>Fotoğrafı Sil</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.image_cards}>
            <Text style={styles.label}>
              Kapak Görseli
            </Text>
            <View style={styles.image_card}>
              <Image style={{width:'100%',height:'100%'}} source={{uri : (frontEndUri+(data?.image?.replace('public','storage')))}}></Image>
            </View>
          </View>
          <View style={styles.image_cards}>
            <Text style={styles.label}>
              Proje Galerisi
            </Text>
            <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:4}}>
              <TouchableOpacity onPress={() => {setCoverImageModal(true);}}>
                <View style={styles.image_card}>
                  <CloseIcon name='plus' size={40}></CloseIcon>
                </View>
              </TouchableOpacity>
              {
                data.images?.map((image) => {
                  return (
                    <TouchableOpacity onPress={() => {setCoverImageModal(true);setSelectedImage(image)}}>
                      <View style={styles.image_card}>
                        <Image style={{width:'100%',height:'100%'}} source={{uri : (frontEndUri+(image?.image?.replace('public','storage')))}}></Image>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            
          </View>

          <View style={styles.image_cards}>
            <Text style={styles.label}>
              Proje Vaziyet&Kat Planı
            </Text>
            <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:4}}>
              <TouchableOpacity onPress={() => {setCoverImageModal(true);}}>
                <View style={styles.image_card}>
                  <CloseIcon name='plus' size={40}></CloseIcon>
                </View>
              </TouchableOpacity>
              {
                data.situations?.map((image) => {
                  return (
                    <TouchableOpacity onPress={() => {setCoverImageModal(true);setSelectedImage(image)}}>
                      <View style={styles.image_card}>
                        <Image style={{width:'100%',height:'100%'}} source={{uri : (frontEndUri+(image?.situation?.replace('public','')))}}></Image>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            
          </View>
          <Text style={styles.label}>İlan Başlığı</Text>
          <TextInput
            onChangeText={(value) => {setDataFunc('project_title',value)}}
            value={data.project_title}
            style={styles.input}
            placeholder="İlan Başlığı"
          />

          <Text style={{...styles.label,marginTop:10}}>İlan Açıklaması</Text>
          <RichToolbar 
            editor={richText} 
            actions={[ 
              actions.setBold, 
              actions.insertImage, 
              actions.insertBulletsList, 
              actions.insertOrderedList, 
              actions.insertLink, 
              actions.setStrikethrough, 
              actions.setItalic, 
              actions.setUnderline, 
              actions.heading1,
            ]} 
            iconMap={{[actions.heading1]:handleHead,}} 
          /> 
          <RichEditor ref={richText} 
            height={200}
            initialContentHTML={data.description}
            onChange={(descriptionText) => { 
              console.log("descriptionText:",descriptionText);
            }} 
          />
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.label}>Yapımcı Firma</Text>
            <View style={styles.leftIconInput}>
              <View style={styles.leftIcon}>
                <BuildingIcon style={{color:'#fff'}} size={25} name='building-o'></BuildingIcon>
              </View>
              <View style={styles.rightInput}>
                <TextInput
                  onChangeText={(value) => {setDataFunc('create_company',value)}}
                  value={data.create_company}
                  style={styles.inputWithIcons}
                  placeholder="Yapımcı Firma"
                />
              </View>
            </View>
            <Text style={styles.label}>Toplam Proje Alanı (M2)</Text>
            <View style={styles.leftIconInput}>
              <View style={styles.leftIcon}>
                <WidthIcon style={{color:'#fff'}} size={25} name='size-fullscreen'></WidthIcon>
              </View>
              <View style={styles.rightInput}>
                <TextInput
                  onChangeText={(value) => {setDataFunc('total_project_area',value)}}
                  value={addDotEveryThreeDigits(data.total_project_area)}
                  style={styles.inputWithIcons}
                  placeholder="Toplam Proje Alanı (M2)"
                />
              </View>
            </View>
            <Text style={styles.label}>Ada Bilgisi</Text>
            <View style={styles.leftIconInput}>
              <View style={styles.leftIcon}>
                <LocationIcon style={{color:'#fff'}} size={25} name='location-pin'></LocationIcon>
              </View>
              <View style={styles.rightInput}>
                <TextInput
                  onChangeText={(value) => {setDataFunc('island',value)}}
                  value={data.island}
                  style={styles.inputWithIcons}
                  placeholder="Ada Bilgisi"
                />
              </View>
            </View>
            <Text style={styles.label}>Parsel Bilgisi</Text>
            <View style={styles.leftIconInput}>
              <View style={styles.leftIcon}>
                <LocationIcon style={{color:'#fff'}} size={25} name='location-pin'></LocationIcon>
              </View>
              <View style={styles.rightInput}>
                <TextInput
                  onChangeText={(value) => {setDataFunc('parcel',value)}}
                  value={data.parcel}
                  style={styles.inputWithIcons}
                  placeholder="Parsel Bilgisi"
                />
              </View>
            </View>
            <Text style={styles.label}>Başlangıç Tarihi</Text>
            <View style={styles.leftIconInput}>
              <View style={styles.leftIcon}>
                <CalendarIcon style={{color:'#fff'}} size={25} name='calendar'></CalendarIcon>
              </View>
              <View style={styles.rightInput}>
                <DateTimePicker onChange={(event,date) => {setDataFunc('start_date',date)}} display="spinner" locale="tr-TR" timeZoneName={'Europe/Istanbul'} accentColor="#fff" style={{...styles.inputWithIcons,height:45,backgroundColor:'#fff'}} value={data.start_date}></DateTimePicker>
              </View>
            </View>
            <Text style={styles.label}>Bitiş Tarihi</Text>
            <View style={styles.leftIconInput}>
              <View style={styles.leftIcon}>
                <CalendarIcon style={{color:'#fff'}} size={25} name='calendar'></CalendarIcon>
              </View>
              <View style={styles.rightInput}>
                <DateTimePicker onChange={(event,date) => {setDataFunc('end_date',date)}} display="spinner" locale="tr-TR" timeZoneName={'Europe/Istanbul'} accentColor="#fff" style={{...styles.inputWithIcons,height:45,backgroundColor:'#fff'}} value={data.end_date}></DateTimePicker>
              </View>
            </View>
          </View>
        </View>
        
        <Text style={{fontSize:15,marginTop:10,fontWeight:'bold',padding:10,paddingTop:0,paddingBottom:0}}>Adres Bilgileri</Text>
        <View style={styles.card}>
          <Text style={styles.label}>İl <Text style={{color :'red'}}>*</Text></Text>
          <RNPickerSelect doneText="Tamam"
            placeholder={{
              label: 'İl Seçiniz...',
              value: null,
            }}
            value={selectedCity}
            style={pickerSelectStyles}
            onValueChange={(value) => {
              onChangeCity(value);
            }}
            items={cities}
          />
          <Text style={{...styles.label,marginTop:15}}>İlçe <Text style={{color :'red'}}>*</Text></Text>
          <RNPickerSelect doneText="Tamam"
            placeholder={{
              label: 'İlçe Seçiniz...',
              value: null,
            }}
            value={selectedCounty}
            style={pickerSelectStyles}
            onValueChange={(value) => {
              onChangeCounty(value);
            }}
            items={counties}
          />
          <Text style={{...styles.label,marginTop:15}}>Mahalle <Text style={{color :'red'}}>*</Text></Text>
          <RNPickerSelect doneText="Tamam"
            placeholder={{
              label: 'Mahalle Seçiniz...',
              value: null,
            }}
            value={selectedNeighborhood}
            style={pickerSelectStyles}
            onValueChange={(value) => {
              onChangeNeighborhood(value);
            }}
            items={neighborhoods}
          />
          <MapView
            style={{marginTop:15}}
            height={300}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              key={0}
              coordinate={{latitude : 37.78825, longitude :  -122.4324}}
              title="asd"
              description="asd"
            />
          </MapView>
          <View style={{padding:10,paddingBottom:50,paddingTop:15}}>
      <TouchableOpacity style={styles.updateBtn}>
        <Text style={{color:'white',textAlign:'center',fontWeight:'600'}}>Güncelle</Text>
      </TouchableOpacity>
      </View> 
        </View>
       
      </View>
   


    </ScrollView>
    }
     
    </>

  )
}

const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});

const styles=StyleSheet.create({
  close_icon_area : {
    width : '100%',
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'flex-end',
    position :'absolute',
    zIndex : 999
  },
  close_icon : {
    color : '#fff',
    marginTop : 50,
    marginRight : 20
  },
  image_buttons : {
    position : 'absolute',
    bottom : 40,
    display : 'flex',
    justifyContent : 'space-evenly',
    width : '100%'
  },
  image_button : {
    backgroundColor : '#dc3545',
    padding : 10,
    borderRadius : 40,
    display : 'flex',
    justifyContent : 'center',
    flexDirection : 'row',
    alignItems : 'center'
  },
  image_text : {
    fontWeight : 'bold',
    marginLeft : 10,
    fontSize : 15,
    color : '#fff'
  },
  image_delete_button : {
    color : '#000',
    color : '#fff'
  },
  image_cards : {
    marginBottom : 10
  },  
  image_card : {
    borderColor : 'rgba(222, 222, 222, 0.53)',
    padding : 5,
    height : 55,
    width : 55,
    borderWidth : 1
  },
  container:{
    backgroundColor:'white',
    padding:10,
    flex:1,
  },
  label : {
    fontSize : 12,
    marginBottom : 7,
    fontWeight : 'bold'
  },  
  leftIcon : {
    backgroundColor : '#e54242',
    height : '100%',
    flex : 1,
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center'
  },
  rightInput : {
    flex : 7
  },
  leftIconInput : {
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    marginBottom : 15,
    borderTopLeftRadius : 5,
    borderBottomLeftRadius : 5,
    overflow : 'hidden'
  },
  card : {
    backgroundColor : '#fff',
    padding : 10,
    paddingTop : 10,
    paddingBottom : 10,
    marginTop : 10
  },
  input : {
    width : '100%',
    backgroundColor : '#fff',
    height : 40,
    borderColor : '#ced4da',
    borderWidth : 1,
    borderRadius : 10,
    padding : 10
  },
  inputWithIcons : {
    width : '100%',
    backgroundColor : '#fff',
    height : 40,
    borderColor : '#ced4da',
    borderWidth : 1,
    padding : 10,
    borderBottomRightRadius : 5,
    borderTopRightRadius : 5,
    overflow : 'hidden'
  },
  breadcrumbHome : {
    backgroundColor : '#e54242',
    color : '#fff',
    borderRadius : 20,
    padding : 10,
    borderColor: '#fff',
    marginRight : 10,
    overflow: 'hidden',
  },
  breadcrumb:{
    padding : 10,
    backgroundColor : '#fff',
    display : 'flex',
    flexDirection : 'row',
    paddingLeft : 15,
    alignItems : 'center',
    flexWrap:'wrap'
  },
  deleteButton:{
    paddingLeft:30,
    paddingRight:30,
    backgroundColor:'#ea2b2e',
    flexDirection:'row',
    alignItems:'center',
  },
  deleteButtonText:{
    color:'white',
    fontSize:15
  },
  select : {
    fontSize : 60,
    color : 'red',
    borderWidth : 1,
    borderColor : '#333'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width : '100%',
    height : '100%',
    backgroundColor : '#000'
  },
  modalView: {
    borderRadius: 20,
    display : 'flex',
    alignItems: 'center',
    justifyContent:'flex-end',
    shadowColor: '#000',
    width:'100%',
    height:'100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  updateBtn:{
    backgroundColor : '#e54242',
    padding:12,
    borderRadius:5
  }
})