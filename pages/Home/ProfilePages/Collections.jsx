import { View, Text, StyleSheet, ScrollView, TextInput, Keyboard ,Animated,TouchableOpacity,Modal} from 'react-native'
import { useState,useRef} from 'react'
import CollectionsItem from './profileComponents/CollectionsItem'

import ShareIcon from "react-native-vector-icons/Entypo"
import DeleteIcon from "react-native-vector-icons/MaterialIcons"
import PencilIcon from "react-native-vector-icons/FontAwesome5"
import { SearchBar } from '@rneui/themed';
export default function Collections() {
  const [modalVisible, setModalVisible] = useState(false);
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
     
     
  <ScrollView  showsVerticalScrollIndicator={false}>
      <CollectionsItem openBottom={openSheet} disabled={isDisabled}/>
      <CollectionsItem openBottom={openSheet} disabled={isDisabled}/>
      <CollectionsItem openBottom={openSheet} disabled={isDisabled}/>
      <CollectionsItem openBottom={openSheet} disabled={isDisabled}/>

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
       <TouchableOpacity style={{padding:15,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
          <View style={{flexDirection:'row',gap:15,justifyContent:'flex-start',padding:3,}}>
          <ShareIcon name='share-alternative' size={18}/>
            <Text style={{textAlign:'center',top:2}}>Paylaş</Text>
           
          </View>
          </TouchableOpacity>
        
        <TouchableOpacity style={{padding:15,borderBottomWidth:1,borderBottomColor:'#ebebeb'}}>
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
              <Text style={{color:'white',fontSize:15,fontFamily:'Verdana'}}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'red',padding:15,paddingLeft:20,paddingRight:20,borderRadius:5}}
            onPress={()=>setModalVisible(!modalVisible)}
            >
              <Text style={{color:'white',fontSize:15,fontFamily:'Verdana'}}>İptal</Text>
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
      
})