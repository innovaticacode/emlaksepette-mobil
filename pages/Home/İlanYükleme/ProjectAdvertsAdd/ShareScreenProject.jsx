import { View, Text, StyleSheet, ScrollView, TextInput, Keyboard, TouchableOpacity, Button ,Switch,Modal, KeyboardAvoidingView,Alert} from 'react-native'
import { useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Entypo'
import { CheckBox } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/AntDesign'
import Blocks from './Blocks';
import { Platform } from "react-native";
export default function ShareScreenProject({}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const handleTextChange = (newText) => {
    setText(newText);
  };

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    setIsEnabled2(false)
  };

  const [isEnabled2, setIsEnabled2] = useState(false);

  const toggleSwitch2 = () => {
    scrollViewRef.current.scrollToEnd({ x:0,y:0, animated: true });
    setIsEnabled2(previousState => !previousState)
    setIsEnabled(false)
  };

    const [FormInputValue, setFormInputValue] = useState('')



  const route = useRoute()
  const navigation = useNavigation()
  const { name, previousName, beforName, antesName, AndName } = route.params;
  const scrollViewRef = useRef();

  const [blocks, setBlocks] = useState([
  
  ]);
  const [inputValue, setInputValue] = useState('');
  const [inputContent, setInputContent] = useState('');
  const handleAddBlock = () => {
    if (inputValue.trim() !== '' && inputContent.trim()!== '') {
      const newBlock = {
        id: blocks.length + 1, // Yeni bloğun ID'si mevcut blok sayısına bir eklenerek atanır
        text: inputValue,
        content: inputContent
      };
      setBlocks([...blocks, newBlock]); // Yeni bloğu mevcut bloklara ekleyerek diziyi güncelle
      setInputValue('');
      setInputContent('') ;
      setModalVisible(!modalVisible)
    }
  };
  const handleRemoveBlock = (idToRemove) => {
    // ID'ye göre blok dizisinden öğeyi filtrele
    const newBlocks = blocks.filter(block => block.id !== idToRemove);
    // Filtrelenmiş diziyi güncelle
    setBlocks(newBlocks);
  };
  

  const [date, setDate] = useState('');
  const [date2, setDate2] = useState('');

  
  const handleDateChange = (text) => {
    // Girilen metni kontrol et
    let formattedText = text.replace(/\D/g, ''); // Sadece sayıları al
    if (formattedText.length > 2 && formattedText.length <= 4) {
      formattedText = formattedText.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    } else if (formattedText.length > 4) {
      formattedText = formattedText.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    }
    // Biçimlendirilmiş tarihi state'e ayarla
    setDate(formattedText);
  };
  const handleDateChange2 = (text) => {
    // Girilen metni kontrol et
    let formattedText2 = text.replace(/\D/g, ''); // Sadece sayıları al
    if (formattedText2.length > 2 && formattedText2.length <= 4) {
      formattedText2 = formattedText2.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    } else if (formattedText2.length > 4) {
      formattedText2 = formattedText2.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    }
    // Biçimlendirilmiş tarihi state'e ayarla
    setDate2(formattedText2);
  };

  const handleTextInputChange = (text) => {
    setFormInputValue(text);
  };

  const handleButtonPress = () => {
    if (FormInputValue.trim() === '' || parseFloat(FormInputValue) === 0) {
      Alert.alert('Hata', 'Geçerli bir değer giriniz.');
    } else {
      // Burada veriyi işlemek için gerekli kodu ekleyebilirsiniz
      navigation.navigate('AdvertForm',{InputValue:FormInputValue})
    }
  };

  return (
<KeyboardAvoidingView style={styles.container} behavior="padding">
    <View style={styles.container} onTouchStart={() => Keyboard.dismiss()}>
      <View style={[styles.card,{}]}>
      <View style={{backgroundColor:'#ebebeb4d',padding:10,borderRadius:20}}>
            <Icon2 name='home' color={'red'} size={17}/>
            </View>
        <Text style={{ fontWeight: 'bold',fontSize:12, }}>{previousName + ' > ' + beforName + ' > ' + antesName + ' > ' + AndName + ' > ' + name}</Text>
      </View>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom:80,padding:20}}>
        <View style={{}}>
          <Text style={{ fontSize: 20, fontWeight: '400' }}>Proje Detayları</Text>
        </View>
        <View style={styles.Form}>
          <View style={{ gap: 10 }}>
            <Text style={styles.label}>
              <Text> Proje Adı </Text>
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
            <TextInput style={styles.Input}/>

          </View>
          <View style={{gap:10}}>
          <Text style={styles.label}>
              <Text> İlan Açıklaması </Text>
              <Text style={{ color: 'red' }}>*</Text>
            </Text>
          <TextInput
               multiline
               numberOfLines={4}
               placeholder="İlan Açıklaması"
               value={text}
               onChangeText={handleTextChange}
               style={styles.InputArea}
            />
          </View>
          <View style={{gap:10}}>
          <Text style={styles.label}>
              <Text>Yapıcı Firma</Text>
             
            </Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flex:0.2/2,justifyContent:'center',alignItems:'center'}} >
              <Icon name='shop' size={30} color={'#EA2C2E'}/>
              </View>
          <View style={{flex:1.8/2}}>
          <TextInput style={styles.Input}/>
          </View>
           
            </View>
        
          </View>
          <View style={{gap:10}}>
          <Text style={styles.label}>
              <Text>Toplam Proje Alanı(m2)</Text>
             
            </Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flex:0.2/2,justifyContent:'center',alignItems:'center'}} >
              <Icon name='shop' size={30} color={'#EA2C2E'}/>
              </View>
          <View style={{flex:1.8/2}}>
          <TextInput style={styles.Input}/>
          </View>
           
            </View>
        
          </View>
          <View style={{gap:10}}>
          <Text style={styles.label}>
              <Text>Başlangıç Tarihi</Text>
             
            </Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flex:0.2/2,justifyContent:'center',alignItems:'center'}} >
              <Icon name='calendar' size={30} color={'#EA2C2E'}/>
              </View>
          <View style={{flex:1.8/2}}>
          <TextInput style={styles.Input}
          value={date}
          onChangeText={handleDateChange}
          placeholder="DD/MM/YYYY"
          maxLength={10}
          keyboardType='numeric'
          />
          </View>
           
            </View>
        
          </View>
          <View style={{gap:10}}>
          <Text style={styles.label}>
              <Text>Bitiş Tarihi</Text>
             
            </Text>
            <View style={{flexDirection:'row',}}>
              <View style={{flex:0.2/2,justifyContent:'center',alignItems:'center'}} >
              <Icon name='calendar' size={30} color={'#EA2C2E'}/>
              </View>
          <View style={{flex:1.8/2}}>
          <TextInput style={styles.Input}
             value={date2}
             onChangeText={handleDateChange2}
             placeholder="DD/MM/YYYY"
             maxLength={10}
            keyboardType='numeric'
          />
          </View>
           
            </View>
        
          </View>


        </View>
        <View style={styles.swtichs}>
          <Text>Bu Projede Bloklar Var mı?</Text>
          <View style={{flexDirection:'row',gap:30}}>
          <View style={{flexDirection:'row',gap:10,}}>
            <Switch
              
              trackColor={{ false: 'red', true: '#E54242' }}
              thumbColor={isEnabled ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#9FA6BC"
              
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={[styles.Label,{top:5}]}>Evet</Text>
          </View>
          <View style={{flexDirection:'row',gap:10,}}>
            <Switch
              
              trackColor={{ false: 'red', true: '#E54242' }}
              thumbColor={isEnabled2 ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#9FA6BC"
              
              onValueChange={()=>{
                toggleSwitch2()
            
              } }
              value={isEnabled2}
            />
            <Text style={[styles.Label,{top:5}]}>Hayır</Text>
          </View>
          </View>
        </View>
        {
          isEnabled?
          <>
           <View style={{flexDirection:'row',paddingTop:20,gap:10,alignItems:'center'}}>
          <Text style={{fontSize:20}}>Bloklar</Text>
          <TouchableOpacity style={{backgroundColor:'red',padding:4,borderRadius:5}} onPress={()=>{
            setModalVisible(!modalVisible)
          }}>
            <Icon name='plus' size={25} color={'white'}/>
          </TouchableOpacity>
        </View>
       
          </>:''
        
        }
        {
          isEnabled?
          <>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{display:'flex',flexDirection:'row',gap:20}}>
        { 
          blocks.map((item,index)=>(
           
            <Blocks text={item.text} id={index} remove={()=>handleRemoveBlock(item.id)} key={index}  />
          
        
          ))
        
        }
          </View>
          </ScrollView>
          </>:''
        }
        <Text>{inputContent}</Text>
        {
          isEnabled2?
          <>
          <View style={{paddingTop:25,gap:10}}>
           <Text>Bu Projede Kaç Tane {name} var</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
             
              <TextInput style={[styles.Input,{width:'50%'}]} keyboardType='numeric'
                  onChangeText={handleTextInputChange}
                  value={FormInputValue}
              />
              <TouchableOpacity style={{backgroundColor:'red',padding:15,borderRadius:5}}
                onPress={handleButtonPress}
               
              >
                <Text style={{color:'white'}}>İlan Formu Oluştur</Text>
              </TouchableOpacity>
            </View>
            </View>
          </>:''
        }
       
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
            <Text>Blok Adı</Text>
            <TextInput style={[styles.Input,{width:'100%'}]}
   value={inputValue}
   onChangeText={(text) => setInputValue(text)}
           
            />
          </View>
          <View style={{gap:5}}>
            <Text>Bu Blokta Kaç Tane Konut Var</Text>
            <TextInput style={[styles.Input,{width:'100%'}]}
                 value={inputContent}
                 onChangeText={(text) => setInputContent(text)}
                 keyboardType='numeric'
            />
          </View>
           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity style={{backgroundColor:'green',padding:15,paddingLeft:20,paddingRight:20,borderRadius:5}}
         onPress={handleAddBlock} 
            >
              <Text style={{color:'white',fontSize:15,}}>Bloğu Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'red',padding:15,paddingLeft:20,paddingRight:20,borderRadius:5}}
            onPress={()=>setModalVisible(!modalVisible)}
            >
              <Text style={{color:'white',fontSize:15,}}>Kapat</Text>
            </TouchableOpacity>
           </View>
       
         
          </View>
        </View>
      </Modal> 
          {/* <View style={{paddingTop:20,gap:10}}>
            <CheckBox
            containerStyle={{}}
              checked={checked}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              uncheckedIcon={'checkbox-blank-outline'}
              title={ 'İlan Verme Kurallarını Okudum Kabul Ediyorum'}
              checkedColor='#EA2A29'
            />
            <TouchableOpacity style={{backgroundColor:'#E54242',padding:10,borderRadius:5}}>
              <Text style={{textAlign:'center',fontSize:17,color:'white',fontFamily:'Verdana'}}>Devam Et</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  Form: {
    paddingTop:20,
    gap:20
  },
  Input: {
    borderWidth: 0.7,
    borderColor: '#495057',
    padding:15,
   
    borderRadius: 10,
    fontSize: 15,
    color: '#495057',
    fontWeight: '400',

    justifyContent: 'center'
  },
  InputArea:{
    borderWidth: 0.7,
    borderColor: '#495057',
    padding:15,
    height:180,
    paddingTop:20,
    borderRadius: 10,
    fontSize: 15,
    color: '#495057',
    fontWeight: '400',
   
    justifyContent: 'center'
  },
  swtichs:{
    gap:10,
    paddingTop:20
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
  card:{
    flexDirection:'row',
    alignItems:'center',
    gap:8,
    backgroundColor: '#FFFFFF',  
    borderRadius: 10,  
    paddingVertical: 12,  
    paddingHorizontal: 10,  
    width: '100%',  
    marginVertical: 5,  
  
    borderWidth:0.7,
    borderColor:'#CED4DA',
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