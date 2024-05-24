import { View, Text, StyleSheet, ScrollView ,Animated,TouchableOpacity} from 'react-native'
import {useState,useRef, useEffect} from 'react'
import ProjectAdvertPost from '../profileComponents/ProjectAdvertPost'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { apiRequestGetWithBearer } from '../../../../components/methods/apiRequest';
import axios from "axios"
import { getValueFor } from '../../../../components/methods/user';
import { Platform } from "react-native";
export default function RejectAdverts({header,header2,hidden}) {
    const translateY = useRef(new Animated.Value(400)).current;
    const [display, setdisplay] = useState(false)
    const openSheet = () => {
        setEditModalVisible(!EditModalVisible)
    }; 
    const [user,setUser] = useState({})
    const [projects,setProjects] = useState([])
    const [projectCount,setProjectCount] = useState(0)
    useEffect(() => {
      getValueFor("user",setUser)
    },[]);
    const [start,setStart] = useState(0);
    const [take,setTake] = useState(10);
    useEffect(() => {
      axios.get('https://test.emlaksepette.com/api/get_my_projects?status=3&start='+start+'&take='+take,{ headers: { Authorization: 'Bearer ' + user.access_token } }).then((res) => {
        setProjects(res.data.data);
        setProjectCount(res.data.total_projects_count)
      }).catch((e) => {
        console.log(e);
      })
    },[user]);
   const [EditModalVisible, setEditModalVisible] = useState(false)
  return (
    <View style={{flex:1}}>
    <ScrollView>
    <View style={styles.container} >
        <View style={{
            paddingTop:20,
            paddingLeft:20
        }}>
            <Text style={styles.headerText}>Rededilen İlanlar({projects.length})</Text>
        </View>
        <View style={styles.Adverts}>
          {
            projects.map((project,index) => {
              return(
                <ProjectAdvertPost key={index} project={project} Onpress={openSheet}/>
              )
            })
          }
        
        </View>
       
    </View>
   
    </ScrollView>
    <Modal
          isVisible={EditModalVisible}
          onBackdropPress={openSheet}
     
          backdropColor="transparent"
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={{width:'100%',}}> 
              <ScrollView style={{gap:10}} contentContainerStyle={{gap:10,alignItems:'center'}} showsVerticalScrollIndicator={false}>  
            <View>
              <TouchableOpacity style={{backgroundColor:'grey',padding:3,width:40,borderRadius:10}}/>
            </View>
           <TouchableOpacity style={{backgroundColor:'#DAFBD0',width:'90%',padding:10,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:15,borderWidth:0.4,borderColor:'#1B6C0A94'}}>
            <Text style={{textAlign:'center',color:'#1B6C0A',fontWeight:'bold'}}>İlanları Düzenle</Text>
            <MaterialIcon name='home-edit' size={18} color={'#1B6C0A'}/>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'#FFEFCA',width:'90%',padding:10,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:15,borderWidth:0.4,borderColor:'#BD3803'}}>
            <Text style={{textAlign:'center',color:'#BD3803',fontWeight:'bold'}}>İşlem Kayıtları</Text>
            <MaterialIcon name='archive' size={18} color={'#BD3803'}/>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'#DAFBD0',width:'90%',padding:10,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:15,borderWidth:0.4,borderColor:'#1B6C0A94'}}>
            <Text style={{textAlign:'center',color:'#1B6C0A',fontWeight:'bold'}}>Genel Düzenleme</Text>
            <MaterialIcon name='view-dashboard-edit' size={18} color={'#1B6C0A'}/>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'#FFE0DB',width:'90%',padding:10,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:15,borderWidth:0.4,borderColor:'#BC260F'}}>
            <Text style={{textAlign:'center',color:'#BC260F',fontWeight:'bold'}}>Sil</Text>
            <MaterialIcon name='delete-outline' size={18} color={'#BC260F'}/>
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'#FFE0DB',width:'90%',padding:10,borderRadius:5,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:15,borderWidth:0.4,borderColor:'#BC260F'}}>
            <Text style={{textAlign:'center',color:'#BC260F',fontWeight:'bold'}}>Pasife Al</Text>
            <MaterialIcon name='delete-outline' size={18} color={'#BC260F'}/>
           </TouchableOpacity>
           </ScrollView>
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
            
          paddingTop:20,
          paddingLeft:10,
          paddingRight:10,
            gap:10,
         
        },
      
      modal: {
        justifyContent: "flex-end",
        margin: 0,
      },
      modalContent: {
        gap:10,
        alignItems:'center',
        backgroundColor: "#F8F7F4",
        padding: 10,
        height: "35%",
      
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