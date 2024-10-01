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
import VerifyDocument from "./VerifyDocument";
import { getValueFor } from "../../components/methods/user";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
const labels = ["Adım 1", "Adım 2"];
const labels2 = ["Adım 1"];
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
        const userInfo = await axios.get(
          "http://192.168.18.31:8000/api/users/" + user?.id,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
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
      setCurrentPosition(1);
    } else {
      setCurrentPosition(0);
    }
  }, [namFromGetUser]);

  // useEffect(() => {
  //   if (namFromGetUser.phone_verification_status==1) {
  //     setCurrentPosition(1)
  //   }

  // }, [currentPosition])
  console.log(namFromGetUser.phone_verification_status + "telefon");
  const renderStepContent = () => {
    if (user.type == 1) {
      switch (currentPosition) {
        case 0:
          return <Verification nextStep={nextStep} prevStep={prevStep} />;

        default:
          return null;
      }
    } else {
      switch (currentPosition) {
        case 0:
          return <Verification nextStep={nextStep} prevStep={prevStep} />;
        case 1:
          return <VerifyDocument nextStep={nextStep} prevStep={prevStep} />;

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
  console.log(verifyStatu);

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
            labels={user.type == 1 ? labels2 : labels}
            stepCount={user.type == 1 ? labels2.length : labels.length}
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
                navigation.push("Home", { status: "logout" });
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
    paddingTop: 10,
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
