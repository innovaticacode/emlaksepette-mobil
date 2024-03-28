import { View, Text, StyleSheet,Image,Dimensions,FlatList,Modal ,TouchableOpacity, ScrollView, ImageBackground} from 'react-native'
import {useRef, useState} from 'react'
import Icon from "react-native-vector-icons/MaterialIcons"
import Coin from "react-native-vector-icons/FontAwesome5"
import Loading  from "react-native-vector-icons/EvilIcons"
import Icon2  from "react-native-vector-icons/Entypo"
import { useNavigation } from '@react-navigation/native'
import CollectionItemPanel from './profileComponents/CollectionItemPanel'
export default function Panel({options,onSelect}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const navigation=useNavigation()
  const handleSelect = (option) => {
    setModalVisible(false);
    onSelect(option);
  };

  const calculateButtonPosition = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ x: pageX, y: pageY + height });
      });
    }
  };
  const buttonRef = useRef();
  const { width, height } = Dimensions.get('window');
  return (
    <ScrollView style={{flex:1}}>
    <View style={style.container}>
     
      <View style={style.header}>
        <View style={style.NameInfo}>
        <Text style={{
          fontSize:width>400?16:14,
      
          color:'#C7C7CA'
        }}>Hoşgeldin</Text>
          <Text style={{
            fontSize:width>400? 24:20,
            fontWeight:'400',
         
          }}>Maliyetine Ev</Text>
        </View>
        <View style={style.ProfileImage}>
            
              <Image source={require('../home.jpg')} style={{width:'100%',height:'100%'}} />
            
          </View>  
      </View>


      <View style={{padding:0}}>
          <View style={{width:'100%',paddingLeft:10,paddingRight:10}}>
          <TouchableOpacity
        ref={buttonRef}
        onPress={() => {
          calculateButtonPosition();
          setModalVisible(true);
        }}
        style={style.dropdownButton}>
        <Text style={{color:'#B3B3B3'}}>Son 7 Gün</Text>
        <Icon name='arrow-drop-down'size={20} color={'#B3B3B3'}/>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={style.modalBackground}
          onPress={() => setModalVisible(false)}>
            
          <View style={[style.modalContent, { top: buttonPosition.y, left: buttonPosition.x }]}>
          <View style={{width:'100%',gap:10}}>
            <TouchableOpacity style={{borderWidth:0.8,borderColor:'#ebebeb', padding:10}}>
              <Text>Son 7 Gün</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0.8,borderColor:'#ebebeb',padding:10,justifyContent:'center'}}>
              <Text>Son 15 Gün</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderWidth:0.8,borderColor:'#ebebeb', padding:10}} >
              <Text>1 Ay</Text>
            </TouchableOpacity>
          </View>
          </View>
         
        </TouchableOpacity>
      </Modal>
          </View>

      </View>
        <View style={style.Cards}>
            <View style={style.CardsItems}>
            <View style={style.Item}>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-between'
              }}>
                    
                    <Text style={{fontSize:15, color:'#9ACA66'}}>Toplam Kazanç</Text>
                   <Coin name='coins' size={18} color={'#9ACA66'}/>
              </View>
              <View style={{top:10,gap:10}}>
                <Text style={{fontSize:22,fontWeight:'bold'}}>2500₺</Text>
                <View style={{flexDirection:'row',gap:3}}>
                  <Coin name='angle-up' color={'#9ACA66'}/>
                  <Text style={{fontSize:11,color:'#9ACA66'}}>2.5% </Text>
                <Text style={{fontSize:11, color:'#ACACAC'}}>son 7 gün</Text>
                </View>
               
              </View>
            </View>
               <View style={style.Item}>
               <View style={{
                flexDirection:'row',
                justifyContent:'space-between'
              }}>
                    <View style={{flex:1.8/2}}>
                    <Text style={{fontSize:15,color:'#FF0000'}}>Reddedilen</Text>
                     <Text style={{fontSize:10,fontWeight:'bold'}}>(Komisyon Tutarı)</Text> 
                    </View>

                   <View style={{flex:0.2/2}}>
                   <Coin name='exclamation' size={18} color={'#FF0000'}/>
                   </View>
                    
              </View>
              <View style={{top:8,gap:10}}>
              <Text style={{fontSize:22,fontWeight:'bold'}}>1500₺</Text>
              <View style={{flexDirection:'row',gap:3}}>
              <Coin name='angle-down' color={'#FF0000'}/>
                  <Text style={{fontSize:10,color:'#FF0000'}}>2.5% </Text>
                <Text style={{fontSize:10, color:'#ACACAC'}}>son 7 gün</Text>
                </View>
              </View>
               </View>
            </View>
            
              <View style={style.CardsItems}>
              <View style={style.Item}>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-between'
              }}>
                    <View style={{flex:1.8/2}}>
                     
                    <Text style={{fontSize:15, color:'#FFA500'}}>Onayda</Text>
                     <Text style={{fontSize:10,fontWeight:'bold'}}>(Komisyon Tutarı)</Text> 
                    </View>

                   <View style={{flex:0.2/2}}>
                   <Loading name='spinner-3' size={25} color={'#FFA500'}/>
                   </View>
                    
              </View>
              <View style={{top:8,gap:10}}>
              <Text style={{fontSize:22,fontWeight:'bold'}}>2500₺</Text>
              <View style={{flexDirection:'row',gap:3}}>
              <Icon2 name='minus' color={'#FFA500'}/>
                  <Text style={{fontSize:10, color:'#FFA500'}}>2.5% </Text>
                <Text style={{fontSize:10, color:'#ACACAC'}}>son 7 gün</Text>
                </View>
              </View>
              </View>
                  <View style={style.Item}>
                  <View style={{
                flexDirection:'row',
                justifyContent:'space-between'
              }}>
                    <View style={{flex:1.7/2}}>
                    <Text style={{fontSize:15,color:'#9ACA66'}}>Başarı Yüzdesi(%)</Text>
                     <Text style={{fontSize:10,fontWeight:'bold'}}>(Komisyon Tutarı)</Text> 
                    </View>

                   <View style={{flex:0.2/2}}>
                   <Icon2 name='bar-graph' size={15} color={'#9ACA66'}/>
                   </View>
                    
              </View>
              <View style={{top:8,gap:10}}>
              <Text style={{fontSize:22,fontWeight:'bold'}}>10%</Text>
              <View style={{flexDirection:'row',gap:3}}>
              <Coin name='angle-up' color={'#9ACA66'}/>
                  <Text style={{fontSize:10,color:'#9ACA66'}}>2.5% </Text>
                <Text style={{fontSize:10, color:'#ACACAC'}}>son 7 gün</Text>
                </View>
              </View>
                  </View>
                  
              </View>
        </View>
        <View style={{width:'100%',padding:12,top:5,}}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontSize:18,letterSpacing:0.2}}>Koleksiyonlarım</Text>
                <TouchableOpacity style={{justifyContent:'center',backgroundColor:'red',paddingLeft:6,paddingRight:6,padding:5}} onPress={()=>navigation.navigate('Collecitons')}>
                  <Text style={{letterSpacing:0.2,fontSize:12,color:'white',fontWeight:'500'}}>
                    Tümünü Gör
                  </Text>
                </TouchableOpacity>
              </View>
          <View style={{paddingTop:10,gap:10}}>
                  <CollectionItemPanel/>
                  <CollectionItemPanel/>
                  <CollectionItemPanel/>
                 
              

                

          </View>
        </View>
       
    </View>
    </ScrollView>
  )
}
const { width, height } = Dimensions.get('window');
const style=StyleSheet.create({
    container:{
      flex:1,
        backgroundColor:'#F7F7F9',
     
    },
    header:{
      width:'100%',
      height:width>400? '12%':'9%',
   
      display:'flex',
      flexDirection:'row',
      padding:8,
      justifyContent:'space-between'
    },
    NameInfo:{
      flex:1.7/2,
      gap:6
    },
    ProfileImage:{
      flex:0.3/2,
      width: width>400?'100%':'100%',
     
      height: width>400? '90%':'120%',
      
    },
    dropdownButton: {
      padding: 10,
      backgroundColor: '#FFFFFF',  
      borderRadius: 10,  
      paddingVertical: 15,  
      paddingHorizontal: 10,  
      width: '100%',  
      marginVertical: 10,  
        flexDirection:'row',
        justifyContent:'space-between',
      borderWidth:0.7,
      borderColor:'white',
      ...Platform.select({
          ios: {
            shadowColor: ' white',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          android: {
            elevation: 5,
          },
        }),

    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'transparent',
     alignItems:'center'
    },
    modalContent: {
    
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
     position:'absolute',
      right:10
      
    },
    option: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    Cards:{
        width:'100%',
        padding:10,
        top:5,
       
        gap:10
    },
    CardsItems:{
      display:'flex',
      flexDirection:'row',
   
      gap:10
    },
    Item:{
      width:'100%',
      borderRadius:8,
    
      backgroundColor:'blue',
      flex:1,
      backgroundColor: '#FFFFFF',  
      
      paddingVertical: 20,  
      paddingHorizontal: 20,  
      width: '100%',  
   

      borderWidth:1,
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
  
    CollectionItem:{
      width:'100%',
   
      padding:4
    },
    CollectionImage:{
     width:'100%',
     height:'50%',
        
        backgroundColor:'white',
        padding:2,
        display:'flex',
        flexDirection:'row',
        gap:5
    },
    CollecitonShadow:{
      width:'100%',
   
   
      display:'flex',
      flexDirection:'row',
 
      backgroundColor:'white', 
      borderRadius: 10,  
      paddingVertical: 10,  
      paddingHorizontal: 10,  
     
      marginVertical: 0,  
    
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
