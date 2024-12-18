import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

import { ScrollView } from "react-native";

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
import Icon from "react-native-vector-icons/FontAwesome";
import CalendarPicker from "react-native-calendar-picker";
import ActionSheet from "react-native-actions-sheet";
import { CheckBox } from "react-native-elements";
import { Days, workDays, workTimesItems } from "../../pages/helper";
export default function UpdateShopInfo({ nextStep, prevStep }) {
  const ChekBox = ({ label, text, radio, handleRadio, radioIndex }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => {
          handleRadio(radio, label);
        }}
      >
        <CheckBox
          checked={radio === radioIndex} // Eğer radio seçiliyse işaretli olur
          onPress={() => handleRadio(radio, label)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          containerStyle={{ marginLeft: 0, paddingLeft: 0, marginRight: 4 }}
          checkedColor="#333"
        />
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 13, color: "#333", fontWeight: "600" }}>
            {label}
          </Text>
          <Text style={{ fontSize: 12, color: "#333", fontWeight: "600" }}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const richText = useRef(null);
  const [prevBioText, setprevBioText] = useState("");
  const [year, setyear] = useState(null);
  const [website, setwebsite] = useState(null);
  const [about, setabout] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateChange = (date) => {
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
    setSelectedDate(formattedDate);
  };
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const SetStep = async () => {
    const formData = new FormData();
    try {
      if (user?.access_token) {
        // Gönderilecek JSON verisi
        formData.append("step", 1);
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

  const sendWorkStyles = async () => {
    try {
      if (user?.access_token) {
        // Gönderilecek JSON verisi

        const data = {
          calisma_gunleri: radio === 2 ? selectedDays : workstyleDay,
          calisma_saatleri: workstyleHour,
          acilis_saati: selectedHour,
          kapanis_saati: selectedCloseHour,
        };

        // Convert the object to JSON
        const jsonData = JSON.stringify(data);

        const payload = {
          column_name: "operating_hours",
          value: jsonData,
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
      }
    } catch (error) {
      console.log(error);
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
        setSelectedDate(userData?.year);
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
      case !workstyleDay || !selectedDays:
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: `Çalışma Günleri Alanı Zorunldur`,
            button: "Tamam",
          });
        }, 300);
        break;
      case radio === 2 && selectedDays.length === 0:
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: `Çalışma Günlerini Belirtiniz`,
            button: "Tamam",
          });
        }, 300);
        break;
      case !workstyleHour && radioDays !== 2:
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: `Çalışma Saatleri Alanı Zorunldur`,
            button: "Tamam",
          });
        }, 300);
        break;
      case radioDays === 2 && !selectedHour && !selectedCloseHour:
        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "Uyarı",
            textBody: `Çalışma saatlerini Belirtiniz`,
            button: "Tamam",
          });
        }, 300);
        break;
      default:
        if (website) {
          SendShopInfo("website", website);
        }
        if (selectedDate) {
          setTimeout(() => {
            SendShopInfo("year", selectedDate);
          }, 500);
        }
        if (about) {
          setTimeout(() => {
            SendShopInfo("about", about);
          }, 500);
        }
        sendWorkStyles();
        break;
    }
  };
  const RenderNextButton = () => {
    return <Icon name="chevron-right" size={20} color="#d7dadd" />;
  };

  const RenderPreviousButton = () => {
    return <Icon name="chevron-left" size={20} color="#d7dadd" />;
  };
  const actionSheetRef = useRef(null);
  const [isVisible, setisVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      actionSheetRef.current?.setModalVisible(true);
    } else {
      actionSheetRef.current?.setModalVisible(false);
    }
  }, [isVisible]);
  const actionSheetRef2 = useRef(null);
  const [isVisible2, setisVisible2] = useState(false);

  useEffect(() => {
    if (isVisible2) {
      actionSheetRef2.current?.setModalVisible(true);
    } else {
      actionSheetRef2.current?.setModalVisible(false);
    }
  }, [isVisible2]);

  const actionSheetRef3 = useRef(null);
  const [isVisible3, setisVisible3] = useState(false);

  useEffect(() => {
    if (isVisible3) {
      actionSheetRef3.current?.setModalVisible(true);
    } else {
      actionSheetRef3.current?.setModalVisible(false);
    }
  }, [isVisible3]);
  const actionSheetRef4 = useRef(null);
  const [isVisible4, setisVisible4] = useState(false);

  useEffect(() => {
    if (isVisible4) {
      actionSheetRef4.current?.setModalVisible(true);
    } else {
      actionSheetRef4.current?.setModalVisible(false);
    }
  }, [isVisible4]);
  const [radio, setradio] = useState(null);
  const [radioDays, setradioDays] = useState(null);
  const [workstyleDay, setworkstyleDay] = useState(null);
  const [workstyleHour, setworkstyleHour] = useState(null);
  const handleRadio = (radio, value) => {
    setradio(radio);
    setworkstyleDay(value);
  };
  const handleRadioDays = (radio, value) => {
    setradioDays(radio);
    setworkstyleHour(value);
  };
  const [selectedDays, setSelectedDays] = useState([]);
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      // Gün zaten seçiliyse diziden çıkar
      setSelectedDays(selectedDays.filter((item) => item !== day));
    } else {
      // Gün seçili değilse diziye ekle
      setSelectedDays([...selectedDays, day]);
    }
  };
  const [selectedHour, setselectedHour] = useState(null);
  const [selectedCloseHour, setselectedCloseHour] = useState(null);
  const create24HourArray = () => {
    const hours = [];
    for (let h = 0; h < 24; h++) {
      const hour = h.toString().padStart(2, "0"); // Saatleri 2 haneli formatta oluştur
      hours.push(`${hour}:00`); // Dakikaları sabit "00" olarak ekle
    }
    return hours;
  };

  const hoursArray = create24HourArray();
  console.log(workstyleHour + " sfsdf");
  return (
    <AlertNotificationRoot>
      <ScrollView
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <TouchableWithoutFeedback
          style={{ height: "100%" }}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
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
                if (selectedDate) {
                  setTimeout(() => {
                    SendShopInfo("year", selectedDate);
                  }, 500);
                }
              }}
              confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
              cancelButtonStyle={{ marginLeft: 20, marginRight: 20 }}
            />
            <View>
              <Text style={{ fontSize: 13, color: "#333", fontWeight: "600" }}>
                Emlak Sepette mağazanız, siz ve portföyünüzü tanıtan dijital
                vitrindir. Firma belgeleriniz, ilanlarınızı ve iletişim
                detaylarınızı paylaşarak güvenirliğiniz artırın, daha geniş bir
                kitleye ulaşın.
              </Text>
            </View>
            <View>
              <Text style={styles.Label}>
                Web Sitesi{" "}
                <Text style={{ color: "#666666" }}>( İsteğe bağlı )</Text>
              </Text>
              <TextInput
                style={styles.Input}
                value={website}
                onChangeText={(value) => setwebsite(value)}
              />
            </View>
            <View>
              <Text style={styles.Label}>
                Sektöre Giriş Tarihi{" "}
                <Text style={{ color: "#666666" }}>( İsteğe bağlı )</Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setisVisible(true);
                }}
                style={[styles.Input]}
                // value={year}
                // onChangeText={(value) => setyear(value)}
              >
                <Text>{selectedDate ?? selectedDate}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.Label}>
                Şirket Hakkında Bilgiler{" "}
                <Text style={{ color: "#666666" }}>( İsteğe bağlı )</Text>
              </Text>
              <TextInput
                multiline
                style={[styles.Input, { height: 150 }]}
                value={about}
                onChangeText={(value) => setabout(value)}
              />
            </View>
            <View style={{ gap: 10 }}>
              <View style={{ gap: 5 }}>
                <Text style={styles.headerWorkTime}>Çalışma Günleri</Text>
                <View>
                  <Text style={styles.littleHeaderWorkTime}>
                    Mağazanızın çalışma saatlerini müşterilerinle paylaş.
                  </Text>
                </View>
                <View>
                  {workTimesItems.map((item, _i) => (
                    <ChekBox
                      key={_i}
                      radio={_i} // Radio indexi
                      handleRadio={handleRadio} // Seçim fonksiyonu
                      label={item.label}
                      text={item.text}
                      radioIndex={radio}
                    />
                  ))}
                </View>
                {radio == 2 && (
                  <TouchableOpacity
                    style={[
                      styles.Input,
                      { width: "100%", flexDirection: "row", gap: 1 },
                    ]}
                    onPress={() => {
                      setisVisible2(true);
                    }}
                  >
                    {selectedDays.length == 0 ? (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#333",
                          fontWeight: "600",
                        }}
                      >
                        Günleri Seçiniz
                      </Text>
                    ) : (
                      selectedDays.map((item) => <Text>{item},</Text>)
                    )}
                  </TouchableOpacity>
                )}
              </View>

              <View style={{}}>
                <View style={{ gap: 5 }}>
                  <Text style={styles.headerWorkTime}>Çalışma Saatleri</Text>
                  <View>
                    <Text style={styles.littleHeaderWorkTime}>
                      Mağazanızın çalışma saatlerini müşterilerinle paylaş.
                    </Text>
                  </View>
                  {workDays.map((item, _i) => (
                    <ChekBox
                      key={_i}
                      radio={_i} // Radio indexi
                      handleRadio={handleRadioDays} // Seçim fonksiyonu
                      label={item.label}
                      text={item.text}
                      radioIndex={radioDays}
                    />
                  ))}
                </View>
                {radioDays === 2 && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingTop: 10,
                      paddingBottom: 5,
                    }}
                  >
                    <View
                      style={{ width: "45%", alignItems: "center", gap: 5 }}
                    >
                      <Text style={styles.Label}>Açılış</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setisVisible3(true);
                        }}
                        style={[styles.Input, { width: "100%" }]}
                      >
                        {selectedHour ? (
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#333",
                              fontWeight: "600",
                            }}
                          >
                            {selectedHour}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#333",
                              fontWeight: "600",
                            }}
                          >
                            Seçiniz
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{ width: "45%", alignItems: "center", gap: 5 }}
                    >
                      <Text style={styles.Label}>Kapanış</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setisVisible4(true);
                        }}
                        style={[styles.Input, { width: "100%" }]}
                      >
                        {selectedCloseHour ? (
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#333",
                              fontWeight: "600",
                            }}
                          >
                            {selectedCloseHour}
                          </Text>
                        ) : (
                          <Text
                            style={{
                              fontSize: 13,
                              color: "#333",
                              fontWeight: "600",
                            }}
                          >
                            Seçiniz
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <NextAndPrevButton
          style={"0"}
          nextButtonPress={nextStep}
          prevButtonPress={prevStep}
          SendInfo={checkNextStep}
          step={user.type == 1 ? 4 : 2}
        />
        <ActionSheet
          ref={actionSheetRef}
          onClose={() => setisVisible(false)} // Close ActionSheet when dismissed
          containerStyle={{
            backgroundColor: "#FFF",
            width: "100%", // Set width to 32px less than screen width
            height: "60%", // Set height to 80% of screen height
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          closable={true}
          defaultOverlayOpacity={0.3}
          animated={true}
          drawUnderStatusBar={true} // Optional: if you want it to overlap the status bar
        >
          <View style={{ padding: 10 }}>
            <CalendarPicker
              onDateChange={onDateChange}
              weekdays={["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]} // Türkçe haftanın günleri
              months={[
                "Ocak",
                "Şubat",
                "Mart",
                "Nisan",
                "Mayıs",
                "Haziran",
                "Temmuz",
                "Ağustos",
                "Eylül",
                "Ekim",
                "Kasım",
                "Aralık",
              ]} // Türkçe aylar
              nextComponent={<RenderNextButton />}
              previousComponent={<RenderPreviousButton />}
              todayBackgroundColor="#B9E2F4"
              selectedDayColor="#569FF7"
              selectedDayTextColor="#FFFFFF"
              todayTextStyle={{ fontWeight: "bold" }}
            />
          </View>
        </ActionSheet>
        <ActionSheet
          ref={actionSheetRef2}
          onClose={() => setisVisible2(false)} // Close ActionSheet when dismissed
          containerStyle={{
            backgroundColor: "#FFF",
            width: "100%", // Set width to 32px less than screen width
            height: "40%", // Set height to 80% of screen height
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          closable={true}
          defaultOverlayOpacity={0.3}
          animated={true}
          drawUnderStatusBar={true} // Optional: if you want it to overlap the status bar
        >
          <ScrollView style={{ padding: 10 }} contentContainerStyle={{}}>
            {Days.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ebebeb",
                  backgroundColor:
                    Array.isArray(selectedDays) &&
                    selectedDays.includes(item.dayShort)
                      ? "#EA2C2E"
                      : "transparent",
                  borderRadius: 10,
                }}
                onPress={() => {
                  toggleDay(item.dayShort);
                }}
              >
                <Text
                  style={{
                    color:
                      Array.isArray(selectedDays) &&
                      selectedDays.includes(item.dayShort)
                        ? "white"
                        : "#333",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {item?.day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ActionSheet>
        <ActionSheet
          ref={actionSheetRef3}
          onClose={() => setisVisible3(false)} // Close ActionSheet when dismissed
          containerStyle={{
            backgroundColor: "#FFF",
            width: "100%", // Set width to 32px less than screen width
            height: "60%", // Set height to 80% of screen height
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          closable={true}
          defaultOverlayOpacity={0.3}
          animated={true}
          drawUnderStatusBar={true} // Optional: if you want it to overlap the status bar
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 30, padding: 10 }}
          >
            {hoursArray.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ebebeb",
                  backgroundColor:
                    selectedHour == item ? "#EA2C2E" : "transparent",
                  borderRadius: 10,
                }}
                onPress={() => {
                  setselectedHour(item);
                  setisVisible3(false);
                }}
              >
                <Text
                  style={{
                    color: selectedHour == item ? "white" : "#333",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ActionSheet>
        <ActionSheet
          ref={actionSheetRef4}
          onClose={() => setisVisible4(false)} // Close ActionSheet when dismissed
          containerStyle={{
            backgroundColor: "#FFF",
            width: "100%", // Set width to 32px less than screen width
            height: "60%", // Set height to 80% of screen height
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          closable={true}
          defaultOverlayOpacity={0.3}
          animated={true}
          drawUnderStatusBar={true} // Optional: if you want it to overlap the status bar
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 30, padding: 10 }}
          >
            {hoursArray.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ebebeb",
                  backgroundColor:
                    selectedCloseHour == item ? "#EA2C2E" : "transparent",
                  borderRadius: 10,
                }}
                onPress={() => {
                  setselectedCloseHour(item);
                  setisVisible4(false);
                }}
              >
                <Text
                  style={{
                    color: selectedCloseHour == item ? "white" : "#333",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ActionSheet>
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
  headerWorkTime: {
    color: "#333",
    fontSize: 15,
    fontWeight: "600",
  },
  littleHeaderWorkTime: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "500",
  },
});
