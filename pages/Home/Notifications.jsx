import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React,{useEffect, useState} from "react";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Notificate from "../../components/Notificate";
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from "moment";
import "moment/locale/tr";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Platform } from "react-native";

export default function Notifications() {
  const route = useRoute();
  const { notifications } = route.params;

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton}>
      <Text style={styles.deleteButtonText}>Sil</Text>
    </TouchableOpacity>
  );
  const [user, setUser] = useState({})
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);


  const deleteRequestWithToken = async () => {
    try {
      const response = await axios.delete('https://mobil.emlaksepette.com/api/institutional/notifications', {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      });
      Alert.alert('Başarılı', 'Silme işlemi başarılı!');
      console.log('Delete request successful:', response.data);
    } catch (error) {
      Alert.alert('Hata', 'Silme işlemi başarısız oldu!');
      console.error('Error making DELETE request:', error);
    }
  };
const navigation=useNavigation()
console.log(user?.access_token)
  return (
    <View style={styles.container}>
          {
            notifications?.length ==0?
            <View style={{alignItems:'center',justifyContent:'center',height:'100%',gap:10}}>
            <View style={[ styles.card, {alignItems:'center',justifyContent:'center'}]}>
                <Icon name="bell" size={50} color={'#EA2A28'}/>
            </View>
            <View>
            <Text style={{color:'grey',fontSize:16,fontWeight:'600'}}>Bildiriminiz bulunmamaktadır</Text>
              <Text></Text>
            </View>
            <View style={{width:'100%',alignItems:'center'}}>
              <TouchableOpacity style={{backgroundColor:'#EA2A28',width:'90%',padding:8,borderRadius:5}} onPress={()=>{
             
                  navigation.navigate('HomePage')
           
             
              }}>
                <Text style={{color:'#ffffff',fontWeight:'600',textAlign:'center'}}>Ana Sayfa'ya dön</Text>
              </TouchableOpacity>
            </View>
  
          </View>
            :
       
          <>
          <View style={{ paddingBottom: 5 ,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{ color: "grey" }}>Bugün</Text>
        <TouchableOpacity style={{backgroundColor:'#EB2B2E',paddingLeft:20,paddingRight:20,padding:3,borderRadius:5}} onPress={deleteRequestWithToken}>
          <Text style={{alignItems:'center',color:'#ffffff',fontWeight:'700'}}>Tümünü Sil</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{}}>
        <View style={{ gap: 15 }}>
          {notifications.map((item, index) => (
            <GestureHandlerRootView key={index}>
              <Swipeable renderRightActions={renderRightActions}>
                <Notificate
                  key={index}
                  name={item.text}
                  time={moment(item.created_at).locale("tr").format("LLL")}
                />
              </Swipeable>
            </GestureHandlerRootView>
          ))}
        </View>
      </ScrollView></>
       }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },

  deleteButton: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#ea2b2e",

    flexDirection: "row",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding:15,
   
  borderRadius:50,

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
  }
});
