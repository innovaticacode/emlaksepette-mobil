import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TextInput } from "react-native";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import Modal from "react-native-modal";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
export default function Verification({ nextStep, prevStep }) {
  const [codes, setCodes] = useState("");
  const inputs = useRef([]);
  const [Isucces, setIsucces] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Kullanıcının sayfadan çıkmasını engellemek için koşulları buraya yazın
      e.preventDefault(); // Kullanıcının çıkmasını iptal et
    });

    return unsubscribe;
  }, [navigation]);

  const handleInputChange = (index, value) => {
    // Sadece bir karakter kabul et
    if (value.length > 1) return;

    // Kodu güncelle
    const newCodes = codes.slice(0, index) + value + codes.slice(index + 1);
    setCodes(newCodes);

    // Bir sonraki veya önceki inputa odaklan
    if (value.length === 0 && index > 0) {
      inputs.current[index - 1].focus();
    } else if (index < 5 && value.length === 1) {
      inputs.current[index + 1].focus();
    }
  };
  const [falseCodeAlert, setfalseCodeAlert] = useState(false);
  const updateUserData = async () => {
    try {
      const updateResponse = await axios.get(
        "http://192.168.18.32:8000/api/users/" + user?.id,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );

      // Mevcut kullanıcı verilerini güncellenmiş verilerle birleştirme
      const updatedUser = {
        ...user,
        ...updateResponse.data.user,
        access_token: user.access_token, // access token'ı koruma
      };

      // Kullanıcı durumunu güncelleme
      setuser(updatedUser);

      // SecureStore ile güncellenmiş kullanıcı verilerini kaydetme
      await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    }
  };
  const isfocused = useIsFocused();

  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const [loading, setloading] = useState(false);
  const handleSubmit = async () => {
    setloading(true);
    try {
      // POST isteği yap
      const response = await axios.post(
        "http://192.168.18.32:8000/api/phone-verification/verify",
        { code: codes },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      updateUserData();
      setCodes("");
      setsucces(true);
      nextStep();
      SecureStore.setItemAsync("PhoneVerify", "1");
      setIsucces(true);
      setTimeout(() => {
        setIsucces(false);
      }, 2000);
    } catch (error) {
      console.error("Doğrulama isteği başarısız:", error);
      setfalseCodeAlert(true);
      setsucces(false);
    } finally {
      setloading(false);
    }
  };

  const [verifyStatu, setverifyStatu] = useState(null);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [butonDisabled, setbutonDisabled] = useState(false);
  const sendPostRequest = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      };
      if (user?.access_token) {
        const response = await axios.post(
          "http://192.168.18.32:8000/api/phone-verification/generate",
          {}, // Veri gövdesi boş olabilir veya isteğe özel verileri ekleyebilirsiniz
          config
        );
        setResponse(response.data);
        setError(null);
        setbutonDisabled(true);
      }
    } catch (error) {
      setError("Post isteği başarısız oldu.");
      console.error("Post isteği başarısız oldu:", error);
    } finally {
    }
  };

  useEffect(() => {
    getValueFor("PhoneVerify", setverifyStatu);
  }, [user]);

  useEffect(() => {
    if (verifyStatu == 0) {
      sendPostRequest();
      setIsActive(true);
    }
  }, [verifyStatu]);

  const [succes, setsucces] = useState(true);

  const [seconds, setSeconds] = useState(180); // 3 dakika = 180 saniye
  const [isActive, setIsActive] = useState(false);
  const [showSendAgain, setshowSendAgain] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      setshowSendAgain(true);
      // Zamanlayıcı sıfırlandığında burada başka bir işlem yapabilirsiniz
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const resetTimer = () => {
    setSeconds(180); // 3 dakika = 180 saniye
    setIsActive(false);
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };
  console.log(verifyStatu);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 30,
              color: "#333",
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Hoş Geldiniz!
          </Text>
          <View style={{ paddingTop: 30 }}>
            <Text
              style={{
                fontSize: 13,
                color: "#262020",
                fontWeight: "400",
                letterSpacing: 0.8,
                textAlign: "center",
              }}
            >
              Lütfen hesabınızı doğrulamak için{" "}
              <Text style={{ color: "red" }}>{user?.mobile_phone}</Text> No'lu
              telefona gönderdiğimiz 6 haneli doğrulama kodunu giriniz
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 20, textAlign: "center", color: "#EA2A28" }}>
          {formatTime(seconds)}
        </Text>
      </View>
      <View style={{ paddingTop: 30 }}>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
          {[...Array(6)].map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.Input}
              value={codes[index] || ""}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange(index, text)}
            />
          ))}
        </View>
        <View style={{ padding: 10, paddingTop: 50, gap: 20 }}>
          <TouchableOpacity
            disabled={codes.length == 6 ? false : true}
            onPress={() => {
              handleSubmit();
            }}
            style={{
              backgroundColor: "#EA2A28",
              padding: 9,
              borderRadius: 5,
              opacity: codes.length == 6 ? 1 : 0.5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Onayla
              </Text>
            )}
          </TouchableOpacity>
          {showSendAgain == true && (
            <TouchableOpacity onPress={sendPostRequest}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#EA2A28",
                }}
              >
                Tekrar Gönder
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Modal
        isVisible={Isucces}
        style={styles.modal}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
      >
        <View
          style={[
            styles.modalContent,
            {
              padding: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
            },
          ]}
        >
          <View
            style={{
              backgroundColor: "#ffffff94",
              width: "20%",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <ActivityIndicator size="large" color="#333" />
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={falseCodeAlert}
        style={styles.modal}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        onBackdropPress={() => {
          setfalseCodeAlert(false);
        }}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EA2A28",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Icon name="exclamationcircle" color={"#fff"} size={40} />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 15,
              gap: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                color: "#EA2A28",
                fontSize: 18,
                letterSpacing: 0.7,
              }}
            >
              Uyarı
            </Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ width: "70%", padding: 4, paddingBottom: 20 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#333",
                    letterSpacing: 0.7,
                    lineHeight: 20,
                  }}
                >
                  Girmiş olduğunuz kod hatalı,kontrol ederek tekrar
                  deneyiniz.tekrar göndere basarak kodu yenileyebilirsiniz
                </Text>
              </View>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#EA2A28",
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                setfalseCodeAlert(false);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Tamam
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* {
        user.phone_verification_status!=1 ?
        <>
          <Text>Onaylandı</Text>
        </>:
        <>
         <View style={{width:'100%',gap:15}}>
          <View style={{width:'75%'}}>
          <Text style={{fontSize:30,color:'#333',fontWeight:'500'}}>
            Doğrulama kodunu giriniz
          </Text>
          </View>
        
          <Text style={{fontSize:14,color:'#333'}}> 
            Paneli görüntüleyebilmek için {user?.mobile_phone} No'lu telefona gönderdiğimiz doğrulama kodunu giriniz
          </Text>
        </View>
        <View style={{paddingTop:35,width:'100%',padding:10}}>
          <View style={{flexDirection:'row',justifyContent:'center',gap:10,}}> 
         
          {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.Input}
            value={codes[index] || ''}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange(index, text)}
          />
        ))}
  
          </View>
        
          <View style={{paddingTop:30,gap:20}}>
          <TouchableOpacity  style={{backgroundColor:'#E54242',padding:10,borderRadius:5,opacity:!butonDisabled? 0.5:1}}
            onPress={handleSubmit}
          >
            <Text style={{textAlign:'center',color:'#f7f7f7',fontSize:15,fontWeight:'600'}}>Onayla</Text>

          </TouchableOpacity>
          <TouchableOpacity disabled={butonDisabled} style={{backgroundColor:'#E54242',padding:10,borderRadius:5,opacity:butonDisabled? 0.5:1}}
            onPress={sendPostRequest}
          >
            <Text style={{textAlign:'center',color:'#f7f7f7',fontSize:15,fontWeight:'600'}}>Gönder</Text>

          </TouchableOpacity>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity>
                    <Text style={{fontSize:13,color:'blue'}}>Tekrar Gönder</Text>
                </TouchableOpacity>
                </View>
                
          </View>
      
        </View>
   
        </>
      } */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    margin: 33,
  },
  Input: {
    backgroundColor: "#ebebeb",

    borderRadius: 6,
    width: 50,
    height: 50,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  modal: {
    justifyContent: "center",
    margin: 0,
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",

    borderRadius: 10,
    gap: 15,
  },
});
