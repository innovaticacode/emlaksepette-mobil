import { View, Text, StyleSheet ,TouchableOpacity,ScrollView ,Modal,TextInput,Linking} from 'react-native'
import {useState} from 'react'
import { useRoute } from '@react-navigation/native'
import SuggestItem from './profileComponents/SuggestItem';

export default function Suggests() {
 
  const [modalVisible, setModalVisible] = useState(false);
    const route = useRoute();
    const { header,name} = route.params;
    const [Tabs, setTabs] = useState(0)
    const openModal=()=>{
      setModalVisible(!modalVisible)
    }
    const closeModal=()=>{
      setModalVisible(!modalVisible)
    }
  return (
    
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{display:'flex',flexDirection:'row',gap:20}}>
            <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==0? '#ebebeb':'#E54242'}]}
              onPress={()=>setTabs(0)}
            >
              <Text style={[styles.tabBarText,{color:Tabs===0? 'red':'white',fontWeight:Tabs===0?'600':'normal'}]}>{name} (1)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.TabBarBtn,{backgroundColor:Tabs==1? '#ebebeb':'#E54242'}]}
            onPress={()=>setTabs(1)}
            >
              <Text style={[styles.tabBarText,{color:Tabs===1? 'red':'white',fontWeight:Tabs===1?'600':'normal'}]}>Yanıtlanan Teklifler (0)</Text>
            </TouchableOpacity>
           
          
            </View>
        </ScrollView>
      </View>
    <ScrollView>
        <View style={{padding:15}}>
            <SuggestItem openModal={openModal}/>
            <SuggestItem openModal={openModal}/>
          
        </View>
    </ScrollView>
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
            <Text>Yanıtınız</Text>
            <TextInput style={[styles.Input,{width:'100%'}]}
              multiline
            />
          </View>
         
           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity style={{backgroundColor:'green',padding:15,paddingLeft:20,paddingRight:20,borderRadius:5}}
           
            >
              <Text style={{color:'white',fontSize:15,}}>Yanıtla</Text>
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
    </View>
 
  )
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    tabBar:{
        paddingLeft:20,
        padding:10,
        borderBottomWidth:1,
      
      
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
      TabBarBtn:{
        backgroundColor:'red',
        padding:10,
        borderRadius:4,
        
      },
      tabBarText:{
        color:'white',
        fontWeight:'500'
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
      Input: {
        backgroundColor: '#ebebebba',
        marginTop: 0,
       padding:10,
       height:100,
        fontSize: 17,
        borderRadius: 4,
          
    },
      
})