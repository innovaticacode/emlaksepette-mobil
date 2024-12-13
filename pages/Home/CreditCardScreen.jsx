import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome";
import { Platform } from "react-native";
import AbsoluteErrorInput from "../../components/custom_inputs/AbsoluteErrorInput";
export default function CreditCardScreen({
  getError,
  CompeletePayment,
  creditCartData,
  setCreditCartData,
  errors,
}) {
  const months = [
    { label: "Ocak", value: 1 },
    { label: "Şubat", value: 2 },
    { label: "Mart", value: 3 },
    { label: "Nisan", value: 4 },
    { label: "Mayıs", value: 5 },
    { label: "Haziran", value: 6 },
    { label: "Temmuz", value: 7 },
    { label: "Ağustos", value: 8 },
    { label: "Eylül", value: 9 },
    { label: "Ekim", value: 10 },
    { label: "Kasım", value: 11 },
    { label: "Aralık", value: 12 },
  ];
  const [month, setmonth] = useState("");
  const [Year, setYear] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [NameOfCardUser, setNameOfCardUser] = useState("");

  const [creditCartWarningText, setCreditCartWarningText] = useState("Zorunlu");
  const [creditCartWarningColor, setCreditCartWarningColor] =
    useState("#cc3300");

  const [nameWarningText, setNameWarningText] = useState("Zorunlu");
  const [nameWarningColor, setNameWarningColor] = useState("#cc3300");

  const [yearWarningText, setYearWarningText] = useState("Zorunlu");
  const [yearWarningColor, setYearWarningColor] = useState("#cc3300");

  const [monthWarningText, setMonthWarningText] = useState("Zorunlu");
  const [monthWarningColor, setMonthWarningColor] = useState("#cc3300");

  const years = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear; i <= currentYear + 20; i++) {
    years.push({ label: `${i}`, value: i });
  }
  const formattedCreditCardNumber = (number) => {
    const formattedNumber = number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    return formattedNumber.length <= 19
      ? formattedNumber
      : formattedNumber.slice(0, 19);
  };
  const handleCreditCardNumberChange = (number) => {
    setcardNumber(formattedCreditCardNumber(number));
  };

  const formatNumber = (text) => {
    // Sadece rakamları al ve 4 karakterde bir boşluk ekle
    const cleanedText = text.replace(/\D/g, ""); // Rakam olmayanları temizle
    const formatted = cleanedText.replace(/(.{4})/g, "$1 ").trim(); // Her 4 karakterde bir boşluk ekle

    return formatted;
  };

  return (
    <View>
      <View>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#BCC8D9",
                width: 70,
                height: 45,
                borderRadius: 7,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "transparent",
                  width: 50,
                  height: 30,
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: "#A5B6CD",
                }}
              ></View>
            </View>
            <View>
              <Icon name="cc-visa" size={50} color={"white"} />
            </View>
          </View>
          <View style={{ width: "100%", padding: 5 }}>
            <Text
              style={{ fontSize: 18, color: "#D4E7F0", fontWeight: "bold" }}
            >
              {cardNumber
                ? cardNumber
                    .replace(/\s/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()
                : "****************"}
            </Text>
          </View>
          <View style={{ gap: 15 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontSize: 15, color: "#D4E7F0", fontWeight: "500" }}
              >
                Kart Sahibinin Adı
              </Text>
              <Text
                style={{ fontSize: 15, color: "#D4E7F0", fontWeight: "500" }}
              >
                Ay/Yıl
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Text
                  style={{ fontSize: 14, color: "#D4E7F0", fontWeight: "500" }}
                >
                  {NameOfCardUser ? NameOfCardUser : "******"}
                </Text>
                <Text
                  style={{ fontSize: 14, color: "#D4E7F0", fontWeight: "500" }}
                >
                  {month < 10 && month ? 0 : ""}
                  {month ? month : "**"}/{Year ? String(Year).slice(-2) : "**"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingTop: 10, gap: 10 }}>
        <View style={{ gap: 6 }}>
          <Text style={styles.label}>Kart Numarası</Text>
          <AbsoluteErrorInput
            warningColor={creditCartWarningColor}
            warningText={creditCartWarningText}
            show={true}
          />
          <TextInput
            style={{
              ...styles.Input,
              borderColor: getError("credit_cart_number"),
            }}
            value={creditCartData.credit_cart_number}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              if (
                value.replace(" ", "").replace(" ", "").replace(" ", "")
                  .length > 16
              ) {
                setCreditCartWarningText(
                  "Maksimum karakter sayısına ulaştınız"
                );
                setCreditCartWarningColor("#cc3300");
                setCreditCartData({
                  ...creditCartData,
                  credit_cart_number: formatNumber(value).substring(0, 19),
                });
                handleCreditCardNumberChange(
                  formatNumber(value).substring(0, 19)
                );

                setTimeout(() => {
                  setCreditCartWarningText("Başarılı");
                  setCreditCartWarningColor("green");
                }, 1000);
              } else {
                if (
                  numericValue ==
                  value.replace(" ", "").replace(" ", "").replace(" ", "")
                ) {
                  if (
                    value.replace(" ", "").replace(" ", "").replace(" ", "")
                      .length == 16
                  ) {
                    setCreditCartWarningText("Başarılı");
                    setCreditCartWarningColor("green");
                    setCreditCartData({
                      ...creditCartData,
                      credit_cart_number: formatNumber(value),
                    });
                    handleCreditCardNumberChange(formatNumber(value));
                  } else {
                    setCreditCartWarningText("16 Hane Olmalıdır");
                    setCreditCartWarningColor("#cc3300");

                    setCreditCartData({
                      ...creditCartData,
                      credit_cart_number: formatNumber(value),
                    });
                    handleCreditCardNumberChange(formatNumber(value));
                  }
                } else {
                  setCreditCartWarningText("Sadece sayı giriniz");
                  setCreditCartWarningColor("#cc3300");

                  setCreditCartData({
                    ...creditCartData,
                    credit_cart_number: formatNumber(numericValue),
                  });
                  handleCreditCardNumberChange(formatNumber(numericValue));
                }
              }
            }}
            keyboardType="number-pad"
          />
        </View>
        <View style={{ gap: 6 }}>
          <Text style={styles.label}>Kart Sahibin Adı Soyadı</Text>
          <View style={{ marginTop: 10 }}>
            <AbsoluteErrorInput
              style={{ top: -11 }}
              warningColor={nameWarningColor}
              warningText={nameWarningText}
              show={true}
            />
            <TextInput
              style={{ ...styles.Input, borderColor: getError("name") }}
              value={NameOfCardUser}
              onChangeText={(value) => {
                if (value.length > 40) {
                  setNameWarningText("Maksimum karakter sayısına ulaştınız");
                  setNameWarningColor("#cc3300");
                  setCreditCartData({
                    ...creditCartData,
                    name: value.substring(0, 40),
                  });
                  setNameOfCardUser(value);

                  setTimeout(() => {
                    setNameWarningText("Başarılı");
                    setNameWarningColor("green");
                  }, 1000);
                } else {
                  if (value.length < 5) {
                    setNameWarningText("Minimum 5 karakter olmalıdır");
                    setNameWarningColor("#cc3300");
                    setNameOfCardUser(value);
                  } else {
                    if (value.split(" ").length < 2) {
                      setNameWarningText(
                        "Adınız ve soyadınız arasına boşluk koyarak yazınız"
                      );
                      setNameWarningColor("#cc3300");
                      setNameOfCardUser(value);
                    } else {
                      if (value.split(" ")[1].length > 0) {
                        if (value.split(" ")[1].length > 1) {
                          if (value.split(" ")[0].length > 2) {
                            setNameWarningText("Başarılı");
                            setNameWarningColor("green");
                            setNameOfCardUser(value);
                          } else {
                            setNameWarningText(
                              "Adınız minimum 3 karakter olmalıdır"
                            );
                            setNameWarningColor("#cc3300");
                            setNameOfCardUser(value);
                          }
                        } else {
                          setNameWarningText(
                            "Soyadınız minimum 2 karakter olmalıdır"
                          );
                          setNameWarningColor("#cc3300");
                          setNameOfCardUser(value);
                        }
                      } else {
                        setNameWarningText(
                          "Adınız ve soyadınız arasına boşluk koyarak yazınız"
                        );
                        setNameWarningColor("#cc3300");
                        setNameOfCardUser(value);
                      }
                    }
                  }
                }
                setCreditCartData({ ...creditCartData, name: value });
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginTop: 10,
            gap: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <AbsoluteErrorInput
              style={{ top: -11 }}
              warningColor={monthWarningColor}
              warningText={monthWarningText}
              show={true}
            />
            <RNPickerSelect
              doneText="Tamam"
              placeholder={{
                label: "Ay",
                value: null,
              }}
              onValueChange={(value) => {
                if (value) {
                  setMonthWarningText("Başarılı");
                  setMonthWarningColor("green");
                  setmonth(value);
                  setCreditCartData({ ...creditCartData, exp_month: value });
                } else {
                  setMonthWarningText("Zorunlu");
                  setMonthWarningColor("#cc3300");
                  setmonth(value);
                  setCreditCartData({ ...creditCartData, exp_month: value });
                }
              }}
              style={{
                inputIOS: {
                  ...pickerSelectStyles.inputIOS,
                  borderColor: getError("month"),
                },
                inputAndroid: {
                  ...pickerSelectStyles.inputAndroid,
                  borderColor: getError("month"),
                },
              }}
              value={creditCartData.exp_month}
              items={months}
            />
          </View>
          <View style={{ flex: 1 }}>
            <AbsoluteErrorInput
              style={{ top: -11 }}
              warningColor={yearWarningColor}
              warningText={yearWarningText}
              show={true}
            />
            <RNPickerSelect
              doneText="Tamam"
              placeholder={{
                label: "Seçiniz",
                value: null,
              }}
              onValueChange={(value) => {
                if (value) {
                  setYearWarningText("Başarılı");
                  setYearWarningColor("green");
                  setYear(value);
                  setCreditCartData({ ...creditCartData, exp_year: value });
                } else {
                  setYear(value);
                  setCreditCartData({ ...creditCartData, exp_year: value });
                  setYearWarningText("Zorunlu");
                  setYearWarningColor("#cc3300");
                }
              }}
              style={{
                inputIOS: {
                  ...pickerSelectStyles.inputIOS,
                  borderColor: getError("year"),
                },
                inputAndroid: {
                  ...pickerSelectStyles.inputAndroid,
                  borderColor: getError("year"),
                },
              }}
              value={creditCartData.exp_year}
              items={years}
            />
          </View>
        </View>
      </View>
      <View style={{ padding: 10, paddingTop: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#4797C3",
            padding: 13,
            justifyContent: "center",
            gap: 15,
            borderRadius: 5,
          }}
          onPress={() => {
            CompeletePayment();
          }}
        >
          <Icon name="credit-card-alt" color={"white"} />
          <Text style={{ color: "white" }}>Ödemeyi Tamamla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
    flex: 1,
  },
  inputAndroid: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#eaeff5",
    borderRadius: 5,
    padding: 10,
    fontSize: 14, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  card: {
    gap: 30,
    backgroundColor: "#4797C3",
    borderRadius: 5,
    paddingVertical: 22,
    paddingHorizontal: 22,
    width: "100%",

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.0,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  Input: {
    borderWidth: 1.5,
    borderColor: "#ebebeb",
    padding: 9,
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    color: "grey",
    fontWeight: "600",
  },
});
