import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import Verification from "./ProfilePages/Verification";
import VerifyDocument from "../../components/VerifyComponents/VerifyDocument";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { apiUrl } from "../../components/methods/apiRequest";
import UpdateProfileImage from "../../components/VerifyComponents/UpdateProfileImage";
import UpdateShopInfo from "../../components/VerifyComponents/UpdateShopInfo";
import SuccessRegistered from "../../components/VerifyComponents/SuccessRegistered";
import UpdateAdress from "../../components/VerifyComponents/UpdateAdress";
const labels = [
  "Mağaza Profili Oluştur",
  "Adres Bilgisi",
  "Profil Fotoğrafı Güncelle",
  "Belgeler",
  "Başarılı",
];
const labels2 = ["Adres Bilgisi", "Profil Fotoğrafı Güncelle", "Başarılı"];
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#EA2A29",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#EA2A29",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#EA2A29",
  separatorUnFinishedColor: "grey",
  stepIndicatorFinishedColor: "#EA2A29",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: "#EA2A29",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#EA2A29",
};

const VerifyScreen = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(3);
  const [verifyStatu, setverifyStatu] = useState(null);
  const [namFromGetUser, setnamFromGetUser] = useState({});
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
    getValueFor("PhoneVerify", setverifyStatu);
  }, []);
  const [loading, setloading] = useState(false);

  const GetUserInfo = async () => {
    setloading(true);
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(apiUrl + "users/" + user?.id, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        const userData = userInfo?.data?.user;
        setnamFromGetUser(userData);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, [user]);

  useEffect(() => {
    if (namFromGetUser.phone_verification_status == 1) {
      setCurrentPosition(namFromGetUser?.first_register_step + 1);
    } else {
      setCurrentPosition(0);
    }
  }, [namFromGetUser]);

  // useEffect(() => {
  //   if (namFromGetUser.phone_verification_status==1) {
  //     setCurrentPosition(1)
  //   }

  // }, [currentPosition])

  const renderStepContent = () => {
    if (namFromGetUser.type == 1) {
      switch (currentPosition) {
        case 0:
          return <UpdateProfileImage nextStep={nextStep} prevStep={prevStep} />;
        case 1:
          return <UpdateAdress nextStep={nextStep} prevStep={prevStep} />;
        case 2:
          return <SuccessRegistered nextStep={nextStep} prevStep={prevStep} />;
        default:
          return null;
      }
    } else {
      switch (currentPosition) {
        case 0:
          return <UpdateShopInfo nextStep={nextStep} prevStep={prevStep} />;

        case 1:
          return <UpdateAdress nextStep={nextStep} prevStep={prevStep} />;
        case 2:
          return <UpdateProfileImage nextStep={nextStep} prevStep={prevStep} />;
        case 3:
          return <VerifyDocument nextStep={nextStep} prevStep={prevStep} />;
        case 4:
          return <SuccessRegistered nextStep={nextStep} prevStep={prevStep} />;

        default:
          return null;
      }
    }
  };

  const nextStep = () => {
    if (currentPosition < labels.length - 1) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  const prevStep = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  };
  const navigation = useNavigation();

  return (
    <>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={namFromGetUser.type == 1 ? labels2 : labels}
            stepCount={
              namFromGetUser.type == 1 ? labels2.length : labels.length
            }
          />
          {/* <Text>{namFromGetUser.phone_verification_status} </Text> */}
          <View style={styles.content}>{renderStepContent()}</View>

          {/* <View style={styles.buttonContainer}>
             {currentPosition > 0 && (
               <Button title="Önceki" onPress={prevStep} />
             )}
             {currentPosition < labels.length - 1 && (
               <Button title="Sonraki" onPress={nextStep} />
             )}
           </View>  */}
          <View style={{ alignItems: "center", paddingBottom: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#EC302E",
                padding: 8,
                borderRadius: 8,
                width: "80%",
              }}
              onPress={() => {
                SecureStore.setItemAsync("user", "");
                navigation.navigate("Drawer", {
                  screen: "Home",
                  params: {
                    status: "logout",
                  },
                });
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Kapat
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
    paddingTop: 30,
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default VerifyScreen;
