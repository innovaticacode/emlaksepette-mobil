import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { ScrollView } from "react-native";
import WebView from "react-native-webview";
import NextAndPrevButton from "./NextAndPrevButton";
import { getValueFor } from "../methods/user";
import { apiUrl } from "../methods/apiRequest";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
export default function UpdateShopInfo({ nextStep, prevStep }) {
  const richText = useRef(null);
  const [prevBioText, setprevBioText] = useState("");
  const [year, setyear] = useState(null);
  const [website, setwebsite] = useState(null);

  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const SetStep = async () => {
    const formData = new FormData();
    try {
      if (user?.access_token) {
        // Gönderilecek JSON verisi
        formData.append("step", 2);
        const response = await axios.post(
          `${apiUrl}set_first_register_step`,
          formData, // JSON verisi doğrudan gönderiliyor
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              "Content-Type": "multipart/form-data", // Raw format için Content-Type
            },
          }
        );
      }
    } catch (error) {
      console.error("Post isteği başarısız dsfdsf", error);
    }
  };
  const SendShopInfo = async (columnName, value) => {
    try {
      if (user?.access_token) {
        // Gönderilecek JSON verisi

        const payload = {
          column_name: columnName,
          value: value,
        };

        const response = await axios.post(
          `${apiUrl}change-profile-value-by-column-name`,
          payload, // JSON verisi doğrudan gönderiliyor
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              "Content-Type": "application/json", // Raw format için Content-Type
            },
          }
        );
        nextStep();
        SetStep();
      }
    } catch (error) {
      console.error("Post isteği başarısız", error);
    }
  };
  const [namFromGetUser, setnamFromGetUser] = useState({});
  const [loadingForUserInfo, setloadingForUserInfo] = useState(false);
  const GetUserInfo = async () => {
    setloadingForUserInfo(true);
    try {
      if (user?.access_token && user) {
        const userInfo = await axios.get(apiUrl + "user", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        const userData = userInfo?.data;
        setnamFromGetUser(userData);
        setyear(userData?.year);
        setwebsite(userData?.website);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloadingForUserInfo(false);
    }
  };
  useEffect(() => {
    GetUserInfo();
  }, [user]);
  const [controlForNextStep, setcontrolForNextStep] = useState(false);
  const [message, setmessage] = useState("");

  const checkNextStep = () => {
    switch (true) {
      case !website:
        setcontrolForNextStep(true);
        setTimeout(() => {
          setmessage("Websitenizi daha sonra güncelleyebilirsiniz");
        }, 100);
        break;
      case !year:
        setcontrolForNextStep(true);
        setTimeout(() => {
          setmessage(
            "Kaç Yıldır Sektördesiniz sorusunu daha sonrada güncelleyebilirsin"
          );
        }, 100);

      default:
        if (website) {
          SendShopInfo("website", website);
        }
        if (year) {
          setTimeout(() => {
            SendShopInfo("year", year);
          }, 500);
        }

        break;
    }
  };

  return (
    <AlertNotificationRoot>
      <ScrollView
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ height: "100%" }}
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={{ padding: 15, gap: 20 }}>
            <AwesomeAlert
              show={controlForNextStep}
              showProgress={false}
              titleStyle={{
                color: "#333",
                fontSize: 13,
                fontWeight: "700",
                textAlign: "center",
                margin: 5,
              }}
              title={"Bir Sonraki Adıma Geç"}
              messageStyle={{ textAlign: "center" }}
              message={message}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelButtonColor="#1d8027"
              confirmText="Atla"
              cancelText="Devam Et"
              confirmButtonColor="#EA2C2E"
              onCancelPressed={() => {
                setcontrolForNextStep(false);
              }}
              onConfirmPressed={() => {
                if (website) {
                  SendShopInfo("website", website);
                }
                if (year) {
                  setTimeout(() => {
                    SendShopInfo("year", year);
                  }, 500);
                }
              }}
              confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              cancelButtonStyle={{ marginLeft: 20, marginRight: 20 }}
            />
            <View>
              <Text style={styles.Label}>Web Sitesi</Text>
              <TextInput
                style={styles.Input}
                value={website}
                onChangeText={(value) => setwebsite(value)}
              />
            </View>
            <View>
              <Text style={styles.Label}>Kaç Yıldır Sektördesiniz?</Text>
              <TextInput
                style={styles.Input}
                value={year}
                onChangeText={(value) => setyear(value)}
              />
            </View>
            {/* <View>
            <Text style={styles.Label}>Hakkında</Text>
            <View
              style={{
                height: "65%",
                borderRightWidth: 1,
                borderColor: "#ebebeb",
                borderLeftWidth: 1,
                borderBottomWidth: 1,
              }}
            >
      
               <RichToolbar
                editor={richText}
                selectedIconTint="blue" // Aktif olan ikonun rengi mavi olacak
                iconTint="#333"
                actions={[
                  actions?.setBold,
                  actions?.setItalic,
                  actions?.insertBulletsList,
                  actions?.insertOrderedList,
                  actions?.insertLink,
                  actions?.setStrikethrough,
                  actions?.setUnderline,
                  actions?.undo,
                  actions?.redo,
                  actions?.heading2,
                  actions?.fontSize,
               ]}
                iconMap={{ [actions?.heading2]: handleHead }}
              />
               <RichEditor
             
                ref={richText}
                placeholder="Tanıtım Yazısı Yazınız"
                height={200}
                onChange={(descriptionText) => {
                  setBioText(descriptionText || '');
                }}
              />  
            </View>
          </View> */}
          </View>
        </TouchableWithoutFeedback>
        <NextAndPrevButton
          nextButtonPress={nextStep}
          prevButtonPress={prevStep}
          SendInfo={checkNextStep}
          step={user.type == 1 ? 4 : 2}
        />
      </ScrollView>
    </AlertNotificationRoot>
  );
}
const handleHead = ({ tintColor }) => (
  <Text style={{ color: tintColor }}>H1</Text>
);
const styles = StyleSheet.create({
  Input: {
    padding: 10,
    borderWidth: 0.9,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    fontSize: 13,
    backgroundColor: "#fafafafa",
    color: "#717171",
    fontWeight: "600",
  },
  Label: {
    fontSize: 13,
    bottom: 3,
    left: 6,
    fontWeight: "600",
    letterSpacing: 0.5,
    color: "#333",
  },
});
