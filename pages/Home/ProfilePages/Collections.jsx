
import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import CollectionsTab from '../Panel/CollectionsTab'
import CollectionsGraphic from '../Panel/CollectionsGraphic'
import { getValueFor } from '../../../components/methods/user'
import RegisterRealtorClub from './RegisterRealtorClub'
import axios from 'axios'


export default function Collections() {
 const [tab, settab] = useState(0)
 const [loading, setloading] = useState(false)
 const [user, setuser] = useState({})
 useEffect(() => {
    getValueFor('user',setuser)
 }, [])
 const [namFromGetUser, setnamFromGetUser] = useState([])
 const GetUserInfo =async ()=>{
    setloading(true)
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(
          "https://private.emlaksepette.com/api/users/" + user?.id,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const userData = userInfo?.data?.user
        setnamFromGetUser(userData)
      
      }
    
  
    
  
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }finally{
    
    }
  }
  useEffect(() => {
GetUserInfo()
  }, [user])
  
  console.log(namFromGetUser)
  return (
    <>

    {
        (namFromGetUser?.has_club==0 ||  namFromGetUser?.has_club==2 || namFromGetUser?.has_club==3 ) ?
        <Text>sdfsd</Text>:
  
   
    <View style={{flex:1}}>
    <View style={{flexDirection:'row',justifyContent: 'space-between',backgroundColor:'#fff'}}>
    <TouchableOpacity 
    onPress={()=>{
        settab(0)
    }}
            style={{
                padding:12,
                width:'45%',
                borderBottomWidth: tab==0 ?1:0,
                borderBottomColor:'#EA2C2E'
            }}>
                <Text style={{color: tab==0 ? '#EA2C2E':'#404040',fontWeight:'500',textAlign:'center',fontSize:15}}>Koleksiyonlar</Text>
            </TouchableOpacity>
       
            <TouchableOpacity 
            disabled={namFromGetUser.has_club==(0||2||3)?true:false}
               onPress={()=>{
                settab(1)
            }}
            style={{
                padding:12,
                width:'50%',
                 borderBottomWidth: tab==1 ?1:0,
                borderBottomColor:'#EA2C2E'
            }}>
                <Text style={{color: tab==1 ? '#EA2C2E':'#404040',textAlign:'center',fontSize:15,opacity:namFromGetUser.has_club==0||2||3? 0.5:1}}>Koleksiyon İstatistikleri</Text>
            </TouchableOpacity>
         
           
    </View>
            {tab == 0 && <CollectionsTab/>}
            {tab==1 && <CollectionsGraphic/>}
    
 
    </View>
      }
    </>
  )
}