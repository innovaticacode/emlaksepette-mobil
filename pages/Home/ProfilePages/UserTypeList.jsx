import { View, Text,StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native'
import React,{useState,useEffect} from 'react'
import Users from './profileComponents/Users'
import { getValueFor } from '../../../components/methods/user';
import Modal from "react-native-modal";
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome6'
import AwesomeAlert from "react-native-awesome-alerts";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
export default function UserTypeList() {
  const [userList, setuserList] = useState([]);
  const navigation=useNavigation()
  const [user, setuser] = useState({})
  useEffect(() => {
    getValueFor('user',setuser)
  }, []);
  const [loading, setloading] = useState(false)
  const fetchData = async () => {
    setloading(true)
    try {
      if(user.access_token){
        const response = await axios.get('https://private.emlaksepette.com/api/institutional/roles',{
          headers: {
            'Authorization':`Bearer ${user?.access_token}`
          }
        });
        setuserList(response?.data.roles);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally{
      setloading(false)
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
    const response = await axios.delete(`https://private.emlaksepette.com/api/institutional/roles/${UserId}`,{
      headers:{
        'Authorization':`Bearer ${user.access_token}`
      }
    });
    fetchData()
     setDeletedData(response.data)
     setdeletedSuccessMessage(false)
     Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Silme Başarılı',
      textBody: `${selectedUserName} Adlı kullanıcı silindi`,
    })
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
  return (
    <AlertNotificationRoot>
      {
          loading ? 
          <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
            <ActivityIndicator color='#333' size={'large'}/>
          </View>
          :
          transformedRoles.length==0 ?
          <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 10,
            backgroundColor:'white'
          }}
        >
          <View
            style={[
              styles.card,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Icon name="user-tie" size={50} color={"#EA2A28"} />
          </View>
          <View>
            <Text
              style={{ color: "grey", fontSize: 16, fontWeight: "600" }}
            >
              Kullanıcı Tipi Bulunanmadı
            </Text>
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#EA2A28",
                width: "90%",
                padding: 8,
                borderRadius: 5,
              }}
              onPress={() => {
                setloading(true);
                setTimeout(() => {
                  navigation.navigate("CreateUserType");
                  setloading(false);
                }, 700);
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Oluştur
              </Text>
            </TouchableOpacity>
          </View>
        </View>:
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
      <AwesomeAlert
      
      show={deletedSuccessMessage}
      showProgress={false}
        titleStyle={{color:'#333',fontSize:13,fontWeight:'700',textAlign:'center',margin:5}}
        title={ `${selectedUserName} adlı kullanıcı tipini silmek istediğinize emin misiniz?`}
        messageStyle={{textAlign:'center'}}
      
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}

      cancelText="Hayır"
      confirmText="Evet"
      cancelButtonColor="#ce4d63"
      confirmButtonColor="#1d8027"
      onCancelPressed={() => {
       setdeletedSuccessMessage(false)
      }}
      onConfirmPressed={() => {
        DeleteUser(selectedUserId)
      }}
      confirmButtonTextStyle={{marginLeft:20,marginRight:20}}
      cancelButtonTextStyle={{marginLeft:20,marginRight:20}}
    />
    
    </ScrollView>
      }
    
    </AlertNotificationRoot>
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
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,

    borderRadius: 50,

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
})