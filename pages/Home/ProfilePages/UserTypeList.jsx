import { View, Text,StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import Users from './profileComponents/Users'
import { getValueFor } from '../../../components/methods/user';
import Modal from "react-native-modal";
import axios from 'axios';

export default function UserTypeList() {
  const [userList, setuserList] = useState([]);

  const [user, setuser] = useState({})
  useEffect(() => {
    getValueFor('user',setuser)
  }, []);
  const fetchData = async () => {
    try {
      if(user.access_token){
        const response = await axios.get('https://test.emlaksepette.com/api/institutional/roles',{
          headers: {
            'Authorization':`Bearer ${user?.access_token}`
          }
        });
        setuserList(response?.data.roles);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

useEffect(() => {
 
  fetchData();
}, [user])
const roles = userList;

// Her bir rolü map fonksiyonu ile dönüştür ve yeni bir dizi oluştur
const transformedRoles = roles.map(role => ({
  id: role.id,
  name: role.name.charAt(0).toUpperCase() + role.name.slice(1) 
}));



//Delete
const [DeletedData, setDeletedData] = useState({})
const [deletedSuccessMessage, setdeletedSuccessMessage] = useState(false)
const DeleteUser = async (UserId) => {
  try {
    const response = await axios.delete(`https://test.emlaksepette.com/api/institutional/roles/${UserId}`,{
      headers:{
        'Authorization':`Bearer ${user.access_token}`
      }
    });
    fetchData()
     setDeletedData(response.data)
     setdeletedSuccessMessage(false)
  } catch (error) {
    console.error('Delete request error:', error);
  }
};
const [selectedUserName, setselectedUserName] = useState('')
const [selectedUserId, setselectedUserId] = useState(0)
 const getUserIdAndName=(UserId,name)=>{
  setdeletedSuccessMessage(true)
  setselectedUserId(UserId)
  setselectedUserName(name)
 }
console.log(selectedUserId)
  return (
    <ScrollView style={styles.container}
    stickyHeaderIndices={[0]}
    contentContainerStyle={{paddingBottom:40}}
    showsVerticalScrollIndicator={false}
    >
      <View style={{padding:10, backgroundColor: "#F5F5F7",}}>
        <Text style={{color:'#333',fontSize:18}}>Kullanıcı Tipi Listesi ({userList.length})</Text>
      </View>
      <View style={{padding:10,gap:10}}>
        {
            transformedRoles.map((item,index)=>(
             <Users name={item.name} id='1' key={index} index={index} item={item} deleteUser={getUserIdAndName}/>
            ))
        }
  
    

   
      </View>
      <Modal
          isVisible={deletedSuccessMessage}
          onBackdropPress={() => setdeletedSuccessMessage(false)}
          animationIn={'zoomInUp'}
          animationOut={'zoomOutUp'}
          animationInTiming={200}
          animationOutTiming={200}
          backdropColor="transparent"
          style={styles.modal4}
        >
          <View style={styles.modalContent4}>
            <View style={{ padding: 10 ,}}>
              <Text style={{textAlign:'center'}}> {selectedUserName} adlı kullanıcı tipini silmek istediğinize eminmisiniz</Text>
            </View>
            <View style={{flexDirection:'row',gap:5,alignItems:'center',justifyContent:'center',}}>
              <TouchableOpacity 
                style={{backgroundColor:'#e54242',padding:10,width:'40%',borderRadius:6,alignItems:'center'}}
              onPress={()=>{
                DeleteUser(selectedUserId)
              }}>
                <Text style={{color:'#ffffff',fontWeight:'500'}}>Sil</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={()=>setdeletedSuccessMessage(false)}
                style={{backgroundColor:'#1d8027',padding:10,width:'40%',borderRadius:6,alignItems:'center'}}
              >
                <Text style={{color:'#ffffff',fontWeight:'500'}}>Vazgeç</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: "#f5f5f7",
  
  },
  modal4: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#ffffff",
    padding: 20,
    gap:20,
    borderRadius: 5,
  },
})