import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import { apiUrl } from '../methods/apiRequest';
import axios from 'axios';
import RNPickerSelect from "react-native-picker-select";
import MapView, { Marker } from 'react-native-maps';
import { getValueFor } from '../methods/user';
import { ActivityIndicator } from 'react-native-paper';
export default function UpdateAdress() {
  const [Neigbour, setNeigbour] = useState([]);
  const [citites, setCities] = useState([]);
  const [counties, setcounties] = useState([]);
  const [city, setcity] = useState(null)
  const [county, setcounty] = useState(null)
  const [neigbourhood, setneigbourhood] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    
  };
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const [namFromGetUser, setnamFromGetUser] = useState({});
  const [loadingForUserInfo, setloadingForUserInfo] = useState(false);
  const GetUserInfo = async () => {
    setloadingForUserInfo(true);
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(
          apiUrl+"users/" + user?.id,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userData);
     console.log(userData.city_id)
     onChangeCity(userData.city_id)
     onChangeCounty(userData.county_id)
     setneigbourhood(userData.neighborhood_id)
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloadingForUserInfo(false);
    }
  };

  useEffect(() => {
    GetUserInfo()
  }, [user])
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl + "cities");
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData()
      .then((citites) => setCities(citites.data))
      .catch((error) =>
        console.error("Veri alınırken bir hata oluştu:", error)
      );
  }, []);

  const fetchDataCounty = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}counties/${value}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };


  



  const onChangeCity = (value) => {
    setcity(value);
    if (value) {
      fetchDataCounty(value)
        .then((county) => setcounties(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setcounties([]);
    }
  };
  const fetchDataNeigbour = async (value) => {
    try {
      const response = await axios.get(`${apiUrl}neighborhoods/${value}`);
      return response.data;
    } catch (error) {
      console.error("Hata:", error);
      throw error;
    }
  };

  const onChangeCounty = (value) => {
    setcounty(value);
    if (value) {
      fetchDataNeigbour(value)
        .then((county) => setNeigbour(county.data))
        .catch((error) =>
          console.error("Veri alınırken bir hata oluştu:", error)
        );
    } else {
      setNeigbour([]);
    }
  };

  
  return (
   <ScrollView contentContainerStyle={{padding:10,gap:20,paddingTop:20}}>
    {
      loadingForUserInfo ?
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator/>
      </View>:
        <View style={{gap:20}}>
<View style={{ gap: 6 }}>
              <Text style={styles.Label}>
                İl
              </Text>
              <RNPickerSelect
                doneText="Tamam"
                value={city}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => {
                  onChangeCity(value);
                }}
                items={citites}
              />
              {/* {errorStatu == 8 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )} */}
            </View>
            <View style={{ gap: 6 }}>
              <Text style={styles.Label}>
                İlçe
              </Text>
              <RNPickerSelect
                doneText="Tamam"
                value={county}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => {
                  onChangeCounty(value);
                }}
                items={counties}
              />
              {/* {errorStatu == 9 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )} */}
            </View>
            <View style={{ gap: 6 }}>
              <Text style={styles.Label}>
                Mahalle
              </Text>
              <RNPickerSelect
                doneText="Tamam"
                value={neigbourhood}
                placeholder={{
                  label: "Seçiniz...",
                  value: null,
                }}
                style={pickerSelectStyles}
                onValueChange={(value) => setneigbourhood(value)}
                items={Neigbour}
              />
              {/* {errorStatu == 10 ? (
                <Text style={{ fontSize: 12, color: "red" }}>
                  {errorMessage}
                </Text>
              ) : (
                ""
              )} */}
            </View>

            <View style={{height:'65%'}}>
            <MapView
            onPress={handleMapPress} 
  
    initialRegion={{
      latitude:39.925533,
      longitude:32.866287, 
       latitudeDelta: 10,
      longitudeDelta: 10,
      altidute:50.03281021118164,
      
    }}
    style={{flex:1,borderRadius:10}}
    >
           {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Seçtiğiniz Konum"
          />
        )}
  </MapView>
            </View>
        </View>
    }
           
   </ScrollView>
  )
}
const styles = StyleSheet.create({
 
  Label: {
    fontSize: 13,
    bottom: 3,
    left: 6,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: "#333",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    padding: 8,
    fontSize: 14, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 6,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});