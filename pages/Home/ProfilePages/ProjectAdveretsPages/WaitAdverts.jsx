import { View, Text, StyleSheet, ScrollView ,Animated,TouchableOpacity} from 'react-native'
import {useState,useRef, useEffect} from 'react'
import ProjectAdvertPost from '../profileComponents/ProjectAdvertPost'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { apiRequestGetWithBearer } from '../../../../components/methods/apiRequest';
import axios from "axios"
import { getValueFor } from '../../../../components/methods/user';
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Stack } from '@react-native-material/core';
import Icon3 from "react-native-vector-icons/MaterialIcons";
import Icon4 from "react-native-vector-icons/FontAwesome5"
import { ActivityIndicator } from 'react-native-paper';
export default function ActiveAdverts({}) {

  const navigation = useNavigation()
    const translateY = useRef(new Animated.Value(400)).current;
    const [selectedProject,setSelectedProject] = useState(null);
    const [display, setdisplay] = useState(false)
    const [projectName, setprojectName] = useState(null)
    const openSheet = (id,name) => {
        setSelectedProject(id);
        setEditModalVisible(!EditModalVisible)
        setprojectName(name)
    }; 
    const [user,setUser] = useState({})
    const [projects,setProjects] = useState([])
    const [projectCount,setProjectCount] = useState(0)
    useEffect(() => {
      getValueFor("user",setUser)
    },[]);
    const [start,setStart] = useState(0);
    const [take,setTake] = useState(10);
    const [ProjectRecords, setProjectRecords] = useState([])
      const fetchProjects = async () => {
        try {
          const response = await axios.get('https://private.emlaksepette.com/api/get_my_projects?status=2&start='+start+'&take='+take, {
            headers: { Authorization: 'Bearer ' + user.access_token }
          });
          setProjects(response.data.data);
          setProjectCount(response.data.total_projects_count);
          setProjectRecords(response.data.data)
        } catch (error) {
          console.log(error);
        }
      };
    
   
  

    useEffect(() => {
      fetchProjects();
    }, [user])
    
   const [EditModalVisible, setEditModalVisible] = useState(false)
   const [selectedIndex, setIndex] = useState(0);
const [SortLıstModal, setSortLıstModal] = useState(false)
const handleRadio =(index)=>{
  setIndex(index)
  setTimeout(() => {
    setSortLıstModal(false)
    fetchProjects();
  }, 600);
    
}
const [searchValue, setsearchValue] = useState('')
const handleSearch = (value)=>{
        setsearchValue(value)
        const filteredData = value
        ? projects.filter((item) =>
            item?.project_title.toLowerCase().includes(value.toLowerCase())
          )
        : projects;
      setProjectRecords(filteredData);
}
  return (
    <View style={{flex:1}}>
    <ScrollView>
    <View style={styles.container} >
    <View style={{
            paddingTop:6,
            paddingLeft:12,
            paddingBottom:6
      }}>
    
          <Text 
           style={{
            fontSize: 16,
            color: "#333",
            fontWeight: "600",
          }}
          >Onay Bekleyen İlanlar({projects?.length})</Text>
        
    
      </View>
        <View style={{padding:2,paddingLeft:10,paddingRight:10,flexDirection:'row',gap:4}}>
    <TextInput style={styles.Input} placeholder="Kelime veya İlan No ile ara" value={searchValue} onChangeText={handleSearch} />
    <TouchableOpacity style={{backgroundColor:'#ebebeb',width:'10%',borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={()=>{
      setSortLıstModal(true)
    }}>
          <MaterialIcon name="swap-vertical" size={23} color={'#333'}/>
    </TouchableOpacity>
  </View>
        <View style={styles.Adverts}>
          {
            ProjectRecords.map((project,index) => {
              return(
                <ProjectAdvertPost key={index} project={project} Onpress={openSheet}/>
              )
            })
          }
        
        </View>
       
    </View>
   
    </ScrollView>
    <Modal
    isVisible={SortLıstModal}
    onBackdropPress={()=> setSortLıstModal(false)}
    backdropColor="transparent"
    style={[styles.modal,{padding:20,justifyContent:'center',backgroundColor:'#3339'}]}
    animationIn={"fadeIn"}
    animationOut={"fadeOut"}
    swipeDirection={['down']}
    onSwipeComplete={()=>setEditModalVisible(false)}
  >
    <View style={[styles.modalContent,{borderTopLeftRadius:6,borderTopRightRadius:6,padding:0,borderRadius:6,backgroundColor:'#ffffff'}]}>
    <View style={{paddingTop:15,alignItems:'center'}}>
         <Text style={{color:'#333',fontSize:17,fontWeight:'600'}}>Sıralama</Text>
        </View>
      <View>
      <Stack row align="center" spacing={4}>
         <CheckBox
           checked={selectedIndex === 0}
           onPress={() => handleRadio(0)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
            Fiyata göre (Önce en düşük)
           </Text>}
                   containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
                      checkedColor="#333"
         />
         <CheckBox
           checked={selectedIndex === 1}
           onPress={() => handleRadio(1)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text style={{color:'#333',fontWeight:'600'}}>
            Fiyata göre (Önce en yüksek)
           </Text>}
                    containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
                   checkedColor="#333"
         />
           <CheckBox
           checked={selectedIndex === 2}
           onPress={() => handleRadio(2)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
            Tarihe göre (Önce en eski ilan)
           </Text>}
                     containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
                      checkedColor="#333"
         />
              <CheckBox
           checked={selectedIndex === 3}
           onPress={() => handleRadio(3)}
           checkedIcon="dot-circle-o"
           uncheckedIcon="circle-o"
           title={<Text  style={{color:'#333',fontWeight:'600'}}>
            Tarihe göre (Önce en yeni ilan)
           </Text>}
         containerStyle={{backgroundColor:'transparent',borderWidth:0,margin:0}}
              checkedColor="#333"
         />
       </Stack>
      </View>
        </View>
</Modal>
      <Modal
            isVisible={EditModalVisible}
            onBackdropPress={openSheet}
       
            backdropColor="transparent"
            style={styles.modal}
            animationIn={"fadeInDown"}
            animationOut={"fadeOutDown"}
            swipeDirection={['down']}
            onSwipeComplete={()=>setEditModalVisible(false)}
          >
          <View style={styles.modalContent}>
            <View style={{paddingTop:10,alignItems:'center'}}>
              <TouchableOpacity style={{width:'15%',backgroundColor:'#c2c4c6',padding:4,borderRadius:50}}>
  
                </TouchableOpacity>
              </View>
              <View style={{padding:10,gap:25,paddingBottom:10}}>
              <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={{}}>
                        <Icon3 name="mode-edit-outline" size={23} color={'#333'}/>
                        <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>İlanları Düzenle</Text>
                </TouchableOpacity>
         
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}}
                onPress={()=>{
                  
                  navigation.navigate('EditProject',{id:selectedProject,name:projectName})
                    setEditModalVisible(false)
                  }}
                >
                <MaterialIcon name="home-edit" size={23} color={'#333'} />
                        <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>Genel Düzenleme</Text>
                </TouchableOpacity>
               
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={{}}>
                        <MaterialIcon name="content-save-cog" size={23} color={'#333'}/>
                        <Text style={{fontSize:14,color:'#333',fontWeight:'700'}}>İşlem Kayıtları</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
    
    </View>
  )
}
const styles=StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'white'
        },
        headerText:{
            fontSize:20,
            color:'#141824',
            fontWeight:'600'
        },
        Adverts:{
            width:'100%',
            paddingTop:10,
         
            gap:10,
         
        },
      
      modal: {
        justifyContent: "flex-end",
        margin: 0,
      },
      modal: {
        justifyContent: "flex-end",
        margin: 0,
      },
      modalContent: {
        gap: 5,
       paddingBottom:25,
        backgroundColor: "#f8f8ff",
        padding: 10,
      
      
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
      Input:{
        backgroundColor:'#ebebeb',
        padding:10,
        borderRadius:5,
        width:'90%'
      }
})

    {/* <Animated.View
       style={[styles.animatedView,{ transform: [{ translateY }], }]}
     >
    
      
           <View style={{display:'flex',justifyContent:'space-around',gap:10,width:'100%',bottom:0,padding:10}}>
        
      <View >
            <TouchableOpacity style={{width:'100%',backgroundColor:'#DAFBD0',padding:8,flexDirection:'row',justifyContent:'center',gap:6}}
            
            >
                
                <Text style={{textAlign:'center',color:'#1B6C0A',fontWeight:'500'}}>{hidden=='none'?'Düzenle':'Genel Düzenleme'}</Text>
            </TouchableOpacity>
        </View>
        <View >
            <TouchableOpacity style={{width:'100%',backgroundColor:'#DAFBD0',padding:8,flexDirection:'row',justifyContent:'center',gap:6,}}
            
            >
                
                <Text style={{textAlign:'center',color:'#1B6C0A',fontWeight:'500'}}>{hidden=='none'?'Resimler':'İlanları Düzenle'}</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={{width:'100%',backgroundColor:'#FFE0DB',padding:8,flexDirection:'row',justifyContent:'center',}}
            
            >
                
                <Text style={{textAlign:'center',color:'#B81900',fontWeight:'500'}}>Pasife Al</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity style={{width:'100%',backgroundColor:'#FFE0DB',padding:8,flexDirection:'row',justifyContent:'center',}}
            
            >
                
                <Text style={{textAlign:'center',color:'#B81900',fontWeight:'500'}}>Sil</Text>
            </TouchableOpacity>
        </View>
       
        
           </View>
     
   
      
</Animated.View>*/}