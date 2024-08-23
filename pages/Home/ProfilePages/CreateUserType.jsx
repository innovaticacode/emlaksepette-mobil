import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Checkbox from "./profileComponents/Checkbox";
import { Platform } from "react-native";
import Users from "./profileComponents/Users";
import axios from "axios";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { getValueFor } from "../../../components/methods/user";
import { ActivityIndicator } from "react-native-paper";
export default function CreateUserType() {
  const route = useRoute();

  const [TypeName, setTypeName] = useState("");
  const navigation = useNavigation();
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const [Permissions, setPermissions] = useState([]);
  const [groupNames, setGroupNames] = useState([]);

  // fetchData fonksiyonunu tanımlayın
  const [loadig, setloadig] = useState(false)
  const fetchData = async () => {
    setloadig(true)
    try {
      if (user.access_token) {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/institutional/roles/create",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setPermissions(response?.data?.groupedPermissions);
        setGroupNames(response?.data?.groupNames);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally{
      setloadig(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);

  const arrays = Object.values(Permissions);

  const descriptions = [];

  arrays.forEach((array) => {
    array.forEach((item) => {
      descriptions.push(item?.description);
    });
  });
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (description) => {
    if (checkedItems.includes(description)) {
      // Eğer seçilen öğe zaten varsa, listeden kaldır
      setCheckedItems(checkedItems.filter((item) => item !== description));
    } else {
      // Değilse, listede ekleyin
      setCheckedItems([...checkedItems, description]);
    }
  };
  const handleShowCheckedItems = () => {
    postData();
    
  };
  const [loadingUpdate, setloadingUpdate] = useState(false)
  const postData = async () => {
    if (!TypeName) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Boş Yer Bırakmayın',
        textBody: 'Lütfen Kullanıcı Rolü Giriniz',
        button: 'Tamam',
      })
    }else{
      setloadingUpdate(true)
      try {
        var formData = new FormData();
        formData.append("name", TypeName);
        checkedItems.forEach((item) => {
          formData.append("permissions[]", item); // [] kullanarak PHP tarafında bir dizi olarak alınmasını sağlar
        });
        const response = await axios.post(
          "https://private.emlaksepette.com/api/institutional/roles",
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
         setTypeName('')
         setCheckedItems([])
         fetchData()
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Başarılı',
          textBody: 'Kullanıcı Tipi Oluşturma Başarılı',
          button: 'Tamam',
          onPressButton:()=>{
            navigation.goBack()
            Dialog.hide()
          }
        })
      
       
      } catch (error) {
      
  
        console.error("Hata:", error + "post isteği başarısız ");
      }finally{
        setloadingUpdate(false)
      }
    }
   
  };

  return (
    <AlertNotificationRoot>
    {
      loadig ?
      <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
      <ActivityIndicator color='#333' size={'large'}/>
    </View>:
    <ScrollView style={{ backgroundColor: "white" }}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={[styles.InputArea, {}]}>
          <Text style={[styles.label]}>Kullanıcı Rolü Belirle</Text>
          <TextInput
            style={styles.Input}
            value={TypeName}
            placeholder="Rol"
            onChangeText={(value) => setTypeName(value)}
          />
        </View>
        <View style={{}}>
          <View>
            {Object.values(Permissions).map((array, index) => (
              <View
                key={index}
                style={{ gap: 10, marginTop: 10, marginBottom: 10 }}
              >
                <Text
                  style={{ fontSize: 15, color: "#333", fontWeight: "500" }}
                >
                  {groupNames[index]}
                </Text>

                {array.map((item, subIndex) => (
                  <Checkbox
                    title={item.description}
                    key={subIndex}
                    id={item.id}
                    chechked={handleCheckboxChange}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" ,paddingBottom:15}}>
        
          <TouchableOpacity
            style={{
              backgroundColor: "#EA2A29",
              padding: 9,
              width: "90%",
              borderRadius: 5,
              opacity:loadingUpdate ? 0.5:1,
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'center'
            }}
            onPress={handleShowCheckedItems}
          >
            {
              loadingUpdate ?
              <ActivityIndicator color="#333" size={'small'}/>
              :
              <Text
              style={[
                styles.label2,
                { color: "white", textAlign: "center", fontSize: 14 ,fontWeight:'700'},
              ]}
            >
              Kaydet
            </Text>
            }
        
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </ScrollView>
    }
   
    
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    gap: 20,
  },
  InputArea: {
    width: "100%",
    gap: 10,
    padding: 10,
  },
  Input: {
    padding: 9,
    backgroundColor: "transparent",
    borderRadius: 7,
    fontSize: 15,
    borderWidth: 2,
    borderColor: "#ebebeb",
  },
  label: {
    fontSize: 14,
    bottom: 5,
    left: 6,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  label2: {
    fontSize: 14,

    fontWeight: "300",
    letterSpacing: 0.5,
  },
  userContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingVertical: 22,
    paddingHorizontal: 10,
    width: "100%",
    marginVertical: 10,
    gap: 10,
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
});
