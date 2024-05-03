import { View, Text,StyleSheet, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import Users from './profileComponents/Users'
import { getValueFor } from '../../../components/methods/user';
import axios from 'axios';

export default function UserTypeList() {
  const [userList, setuserList] = useState([]);

  const [user, setuser] = useState({})
  useEffect(() => {
    getValueFor('user',setuser)
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get('https://test.emlaksepette.com/api/institutional/roles',{
        headers: {
          'Authorization':  `Bearer ${user.access_token}`
        }
      });
      setuserList(response?.data.roles);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




useEffect(() => {
 
  fetchData();
}, [])
const roles = userList;

// Her bir rolü map fonksiyonu ile dönüştür ve yeni bir dizi oluştur
const transformedRoles = roles.map(role => ({
  id: role.id,
  name: role.name.charAt(0).toUpperCase() + role.name.slice(1) 
}));
console.log(transformedRoles)
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
             <Users name={item.name} id='1' key={index} index={index}/>
            ))
        }
  
    

   
      </View>
 
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor: "#f5f5f7",
  
  }
})