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

import Users from "./profileComponents/Users";
import axios from "axios";
import { getValueFor } from "../../../components/methods/user";
export default function CreateUserType() {
  const route = useRoute();
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGE5OGU0NWVmZDZmOGFmMTZmMTdlYjZlOTYwZjZjZjk3ZWFlNTIyOTUxNzM3ZDcwM2IyODIyNTJjYmM5NWIwZWI3NTI5ZDZmZGJkMjkxODEiLCJpYXQiOjE3MTQwMzgzODguOTAzNDYyLCJuYmYiOjE3MTQwMzgzODguOTAzNDY5LCJleHAiOjE3NDU1NzQzODguODkwOTQ3LCJzdWIiOiIxMDgiLCJzY29wZXMiOltdfQ.COl7GBq8jVhi4tdpv9M4XfVaB725vZUkUanlNOjomYucIgRwW8fqShfw9-u28idpkCL9mEmcovWB9Cy58eQU7NRtFyShUHj1NglDP_BWcimJfTGd5GVNfGe2n5NzklTJtdUr0TuEz0QIAJmMFppH2PDJ1dtVGt8YbWwqCxRK6a08mN4YtQR9Z6tLe9_s5PDw49qy9QFyu91S5o11rMlN4bX3iLG0h0-zPDY3Vl6TO7IJkgBe4o8FUoxvlSH9xEwU0jo1wqTR_r38105CjeAV4SCMLLfPEzeKQkxMJ5A2DRVrPRl-dg7EAIyS8lK6OHQ6KpmlZqOFDAdFwlIK7btEV0_brS3vrON2x63jYrnFAOhZ5jR8WBNsGqnJVGn1NZoX0VwqHF2dxWAqcTjqbqAYmSJpagWB_Awk02Zqt1rEQDHajN4N1jld0fddP5R8pRO6P_pzqwwq1-is01pIVqWLp27YRAtF4hpDEcOTzEuhrt_UN98m4l-6wGr3suxuIhwb_zfH0lw_qDqyZK54dOX6Q8oPqYn4daZN5TtgJs87jaSw615M7VZXwYp7hd43ZfSqSbfLX2k0vskLIbWKBgdooW3npWPjlmv72zu9GHRKpEdWUbmBDHXjjGDQOhLuumiC9vZOWU-hcIJYWwGAyAY0Y1A-xRaRTkTB8St8TxWul5Q";
  const { header, hidden, hidden2 } = route.params;
  const [TypeName, setTypeName] = useState("");
  const navigation = useNavigation()
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const [Permissions, setPermissions] = useState([]);
  useEffect(() => {
    // fetchData fonksiyonunu tanımlayın
    const fetchData = async () => {

      try {
        const response = await axios.get(
          "https://test.emlaksepette.com/api/institutional/roles/create",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setPermissions(response?.data?.groupedPermissions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // fetchData fonksiyonunu çağırın
    fetchData();
    
   
  
    // user.access_token ve permissions değiştiğinde fetchData fonksiyonunu yeniden çağırın
  }, [user.access_token, Permissions]);

 

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
    console.log(checkedItems);
    postData()
    navigation.navigate('UserTypes')
    
  };
  const postData = async () => {
   
    try {
    var formData=new FormData()
      formData.append('name', TypeName);
      checkedItems.forEach(item => {
        formData.append('permissions[]',  item); // [] kullanarak PHP tarafında bir dizi olarak alınmasını sağlar
      });
      console.log(formData)
      const response = await axios.post('https://test.emlaksepette.com/api/institutional/roles', formData ,{
        headers:{
          Authorization: `Bearer ${user.access_token}`,
        }
      });
      
      // İsteğin başarılı bir şekilde tamamlandığı durum
      console.log('İstek başarıyla tamamlandı:', response.data);

      
  
    } catch (error) {
      // Hata durumunda
     
      console.error('Hata:', error +'post isteği başarısız ');
    }
  };
  
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={[styles.InputArea, { display: hidden }]}>
            <Text style={[styles.label]}>Kullanıcı Rolü Belirle</Text>
            <TextInput
              style={styles.Input}
              value={TypeName}
              placeholder="Rol"
              onChangeText={(value) => setTypeName(value)}
            />
          </View>
          <View style={{ display: hidden }}>
            <Text style={styles.label}>İzinler</Text>
            <View>
              {Object.values(Permissions).map((array, index) => (
                <View key={index} style={{ gap: 10 }}>
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
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#EA2A29",
                padding: 13,
                width: "50%",
                borderRadius: 10,
              }}
              onPress={handleShowCheckedItems}
            >
              <Text
                style={[
                  styles.label2,
                  { color: "white", textAlign: "center", fontSize: 16 },
                ]}
              >
                Kaydet
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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
    borderRadius: 10,
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
