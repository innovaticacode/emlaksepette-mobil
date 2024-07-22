import { View, Text,StyleSheet, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import NeigbourhoodCard from './profileComponents/NeigbourhoodCard'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { getValueFor } from '../../../components/methods/user'

export default function SeeNeigbourhood() {
  const [loading, setloading] = useState(false)
  const [suggests, setsuggests] = useState([])
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
const nav = useNavigation()
  const GetUserInfo =async ()=>{
    setloading(true)
    try {
      if (user.access_token) {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/neighbor-view",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setsuggests(response?.data?.data)
     
      }
    

    
  
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }finally{
      setloading(false)
    }
  }

 
  useEffect(() => {
      GetUserInfo()
  }, [user])

  console.log(user.access_token + 'bilge token')

 
  return (
    <ScrollView style={styles.container} contentContainerStyle={{gap:9}}>
      
              {suggests.map((suggest) => (
        <NeigbourhoodCard key={suggest.id} NeigBourHoodInfo={suggest.owner} project={suggest?.order?.cart} projectInfo={suggest.project} />
      ))}

     
  
            
     
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F5F5F7',
        padding:8
    }
})
