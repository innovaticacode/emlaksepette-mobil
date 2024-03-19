import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Animated,LayoutAnimation, UIManager, Dimensions, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard  } from 'react-native'
import React,{useState,useRef} from 'react'
import RealtorPost from '../../../components/RealtorPost'
import ArrowIcon from 'react-native-vector-icons/SimpleLineIcons'
import Filter from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ıcon from "react-native-vector-icons/SimpleLineIcons"
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal';
import Check from './Check'
import { CheckBox } from 'react-native-elements'




UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Accordion = ({ title, children, index, selectedIndex, setSelectedIndex }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);


  };

  return (
    <View style={[styles.container2, { }]}>
      <TouchableOpacity style={styles.row} onPress={toggleExpand}>
        <View style={{ flex: 1.8 / 2 }}>
          <Text style={[styles.title, { color:'#333' }]}>{title}</Text>
        </View>
        <View style={{ flex: 0.1 / 2 }}>
          <ıcon name={expanded ? 'arrow-down' : 'arrow-right'} color={'grey'} />
        </View>


      </TouchableOpacity>
      {expanded && <View style={styles.child}>{children}</View>}
    </View>
  );
};
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Accordion2 = ({ title, children, index, selectedIndex, setSelectedIndex }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);


  };

  return (
    <View style={[styles.container2, { borderWidth:0}]}>
      <TouchableOpacity style={[styles.row,{borderWidth:0,borderBottomWidth:1}]} onPress={toggleExpand}>
        <View style={{ flex: 1.8 / 2 }}>
          <Text style={[styles.title, { color:'#333' }]}>{title}</Text>
        </View>
        <View style={{ flex: 0.1 / 2 }}>
          <ıcon name={expanded ? 'arrow-down' : 'arrow-right'} color={'grey'} />
        </View>


      </TouchableOpacity>
      {expanded && <View style={[styles.child,{borderWidth:0,padding:0,paddingTop:0}]}>{children}</View>}
    </View>
  );
};

export default function HomeList() {
     
  const [selectedIndexRadio, setIndexRadio] = useState(0);


    const navigation=useNavigation()
    const [isRealtorAdvert, setisRealtorAdvert] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [modalVisible2, setModalVisible2] = useState(false);
    const closeOthers = (index) => {
      setSelectedIndex(!selectedIndex);
    };

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const { width, height } = Dimensions.get('window');
  return (
   
    <View style={styles.container}>
             <View style={styles.header}>
                <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',alignItems:'center',padding:4}}>
                    <TouchableOpacity style={{backgroundColor:'#ebebeb',paddingLeft:10,paddingRight:10,padding:4,borderRadius:5}} onPress={()=>navigation.goBack()}>
                    <ArrowIcon name='arrow-left' size={20} color={'grey'}/>
                    </TouchableOpacity>
                        <View style={{alignItems:'center',paddingTop:10}}>
                        <Text style={{fontSize:18}}>HomeList</Text>
                        <Text>(100) İlan</Text>
                        </View>
                        <TouchableOpacity style={{backgroundColor:'white',paddingLeft:10,paddingRight:10,padding:4,borderRadius:5,}}>
                    <ArrowIcon name='arrow-left' size={20} color={'white'}/>
                    </TouchableOpacity>
                </View>
            </View> 
            <View style={{flexDirection:'row',gap:5,padding:5}}>
                <TouchableOpacity style={{flex:1/2,paddingTop:12,paddingBottom:12,backgroundColor:'#ebebeb',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10}}
                    onPress={toggleModal}
                >
                    <Text style={{textAlign:'center',fontWeight:'500'}}>Filtrele</Text>
                    <Filter name='filter' size={15}/>
                </TouchableOpacity>
                
                <TouchableOpacity style={{flex:1/2,paddingTop:12,paddingBottom:12,backgroundColor:'#ebebeb'}}
                  onPress={()=>setModalVisible2(!modalVisible2)}
                >
                    <Text style={{textAlign:'center',fontWeight:'500'}}>Sırala</Text>
                </TouchableOpacity>
            </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingBottom:25,padding:10,gap:10}}>
        <RealtorPost/>
        <RealtorPost/>
        <RealtorPost/>
      
      </View>
        </ScrollView>
        <View style={{flex:1,  justifyContent: 'center',alignItems: 'center',}}>
       
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        useNativeDriver={true}
        backdropOpacity={0.6}
        backdropColor="black"
        style={styles.modal}
      >
   
        <View style={styles.modalContent}>
          <SafeAreaView>
         <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,alignItems:'center'}}>
          <TouchableOpacity onPress={toggleModal} style={{
         
            justifyContent:'center',
            padding:8,
            paddingLeft:18,
            paddingRight:18,
            borderRadius:5
          }} >
              <Icon name='close' size={25} color={'#EA2C2E'}/>
          </TouchableOpacity>
          <Text style={{fontSize:17,color:'#333',fontWeight:'500'}}>Filtrele</Text>
          <TouchableOpacity  >
              <Text style={{fontSize:15,color:'#333',fontWeight:'500',color:'#264ABB'}}>Temizle</Text>
          </TouchableOpacity>
         </View>
         <View style={{height:width>400? 700:500}}>
         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1,}} nestedScrollEnabled={false}>
        
        <View style={{gap:5}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name='arrow-right' size={18}/>
                <Text>Konut</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',left:15}}>
            <Icon name='arrow-right' size={18}/>
                <Text>Satılık</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',left:30}}>
            <Icon name='arrow-right' size={18}/>
                <Text>Kiralık</Text>
            </TouchableOpacity>
        </View>
        <View style={{padding:10,paddingTop:15,gap:10}}>
            <Text style={{fontSize:15,color:'#161616'}}>Adres</Text>
            <View>
            <Accordion
                title="İl"
                index={0}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <ScrollView style={{height:100,}}>
                    <View style={{gap:10}}>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    </View>
                </ScrollView>
                
              </Accordion>
              </View>
              <View>
              <Accordion
                title="İlçe"
                index={1}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <ScrollView style={{height:100,}}>
                    <View style={{gap:10}}>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    </View>
                </ScrollView>
                
              </Accordion>
              </View>
              <View>
              <Accordion
                title="Mahalle"
                index={2}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <ScrollView style={{height:100,}}>
                    <View style={{gap:10}}>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    </View>
                </ScrollView>
                
              </Accordion>
              </View>
        </View>
        <View>
        <View style={{padding:10,paddingTop:15,gap:10,}}>
            <Text>Proje Durumu</Text>
            <Accordion
                title="Proje Durumu"
                index={3}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}

              >
                <ScrollView style={{height:100}}>
                    <View style={{gap:10}}>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                    <Text>dfdsdfs</Text>
                   
                    </View>
                </ScrollView>
                
              </Accordion>
        </View>
        </View>
        <View style={{padding:10,gap:7}}>
         
          <Accordion2
                 title="Fiyat"
                 index={3}
                 selectedIndex={selectedIndex}
                 setSelectedIndex={setSelectedIndex}
          >
        <View style={{padding:10,gap:5,flexDirection:'row',alignItems:'center'}}>
          
          <TextInput style={styles.Input} keyboardType='number-pad' placeholder='En Düşük'/>
       <View style={{paddingLeft:5,paddingRight:5,padding:1.5,backgroundColor:'#666666'}}/>
          <TextInput style={styles.Input} keyboardType='number-pad' placeholder='En Yüksek'/>
         </View>
         </Accordion2>
        </View>
        <View style={{padding:10,gap:7}}>
         
         <Accordion2
                title="m2 (net)"
                index={4}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
         >
       <View style={{padding:10,gap:5,flexDirection:'row',alignItems:'center'}}>
         
         <TextInput style={styles.Input} keyboardType='number-pad' placeholder='En Düşük'/>
      <View style={{paddingLeft:5,paddingRight:5,padding:1.5,backgroundColor:'#666666'}}/>
         <TextInput style={styles.Input} keyboardType='number-pad' placeholder='En Yüksek'/>
        </View>
        </Accordion2>
       </View>
       <View style={{padding:10,gap:7}}>
         
         <Accordion2
                title="Oda Sayısı"
                index={5}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
         >
       <View style={{padding:10,gap:10,alignItems:'center'}}>
         
        <Check title='2+1'/>
        <Check title='1+1'/>
        <Check  title='3+1'/>
        </View>
        </Accordion2>
       </View>
       <View style={{padding:10,gap:7}}>
         
         <Accordion2
                title="Bina Yaşı"
                index={6}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
         >
       <View style={{padding:10,gap:10,alignItems:'center'}}>
         
        <Check title='0'/>
        <Check title='2'/>
        <Check  title='3'/>
        </View>
        </Accordion2>
       </View>
       <View style={{padding:10,gap:7}}>
         
         <Accordion2
                title="Kat Sayısı"
                index={7}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
         >
       <View style={{padding:10,gap:10,alignItems:'center'}}>
         
        <Check title='10'/>
        <Check title='9'/>
        <Check  title='12'/>
        </View>
        </Accordion2>
       </View>
      
        
        </ScrollView>
        </View>
      
         
      
       
         </SafeAreaView>
          <View style={{}}>
          <View style={{alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity style={{
          
          justifyContent:"center",
          backgroundColor:'#EA2C2E',
          width:'80%',
          padding:10,
          borderRadius:5
        }}>
          <Text style={{textAlign:'center',color:'white',fontWeight:500}}>
          <Text>(100)</Text>
          <Text> Konutları Görüntüle</Text>
          </Text>
      
        </TouchableOpacity>
        </View>
        </View> 

        </View>
      
      </Modal>
    
      </View>
      <Modal
        animationType="slide" // veya "fade", "none" gibi
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

          <CheckBox
           checked={selectedIndexRadio === 0}
           onPress={() => setIndexRadio(0)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={'Gelişmiş Sıralama'}
       containerStyle={{padding:6}}
         />
            <CheckBox
           checked={selectedIndexRadio === 1}
           onPress={() => setIndexRadio(1)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={'Fiyata göre (Önce en yüksek)'}  
             containerStyle={{padding:6}}
         />
          <CheckBox
           checked={selectedIndexRadio === 2}
           onPress={() => setIndexRadio(2)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={'Fiyata göre (Önce en düşük)'}
           containerStyle={{padding:6}}
         />
            <CheckBox
           checked={selectedIndexRadio === 3}
           onPress={() => setIndexRadio(3)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={'Tarihe göre (Önce en yeni ilan)'}
           containerStyle={{padding:6}}
         />
          <CheckBox
           checked={selectedIndexRadio === 4}
           onPress={() => setIndexRadio(4)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={'Tarihe göre (Önce en eski ilan)'}
           containerStyle={{padding:6}}
         />
            <CheckBox
           checked={selectedIndexRadio === 5}
           onPress={() => setIndexRadio(5)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={'Adrese göre(A-Z)'}
           containerStyle={{padding:6}}
         />
           <CheckBox
           checked={selectedIndexRadio === 6}
           onPress={() => setIndexRadio(6)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={'Adrese göre(Z-A)'}
           containerStyle={{padding:6}}
         />


         <TouchableOpacity onPress={()=>setModalVisible2(!modalVisible2)}
          style={{backgroundColor:'#EA2C2E',padding:10,borderRadius:10}}
          >
          <Text style={{textAlign:'center',color:'white',fontSize:15,fontWeight:'bold'}}>Kapat</Text>
         </TouchableOpacity>
         
         
       
         
          </View>
        </View>
      </Modal>
    



    </View>

  )
}
const { width, height } = Dimensions.get('window');
const styles=StyleSheet.create({
    container:{
        flex:1,
       backgroundColor:'white'
    },
    header:{
      borderBottomWidth:1,
      borderBottomColor:'#ebebeb',
   
      
       
        height:'11%',
        justifyContent:'flex-end'    
    },
    container2: {
      

      
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 8,
        paddingRight: 8,
        alignItems: 'center',
        padding: 13,
      borderWidth:1,
      borderRadius:5,
      borderColor:'#D1D5DB'
    
    
      },
      title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666666'
      },
      child:{
        backgroundColor:'#fff',
        paddingTop:10,
        borderWidth:1,
        borderColor:'#D1D5DB',
        borderTopColor:'white',
        borderRadius:5,
        padding:10
      },
      modal: {
        margin: 0,
       
       
     
      },
      modalContent: {
        backgroundColor: 'white',
        width: width / 1, // Ekranın yarısını kaplayacak şekilde genişlik ayarı
        height: height / 1, // Ekranın yarısını kaplayacak şekilde yükseklik ayarı
      
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
      },
      Input:{
        flex:1/2,
        padding:5,
      borderWidth:1,
      borderColor:'#ebebeb'
      },
      centeredView: {
      
     
        justifyContent: 'center',
        alignItems: 'center',
      // modal dışı koyu arkaplan
      },
      modalView: {
        width:'100%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
      
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
        {/* <View style={{ flex: 1 }}>
   
   <Animated.View
     style={{
       position: 'absolute',
       bottom: 0,
       left: 0,
       right: 0,
       backgroundColor: 'white',
     
      paddingTop:20,
      paddingBottom:30,
      paddingLeft:10,
       paddingRight:10,
        height:400,
     
       transform: [{ translateY }],
     }}
   >
  
    <View style={{alignItems:'center'}}>
    <TouchableOpacity style={{backgroundColor:'grey',padding:3,width:'25%',borderRadius:20}} onPress={closeSheet}/>
    </View>
   
   </Animated.View>
    </View>*/}