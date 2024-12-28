import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
const SuccessRegistered = ({ nextStep, prevStep }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 10,
        paddingTop: 35,
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <View style={{ gap: 55 }}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "#10A958",
              position: "absolute",
              zIndex: 1,
              top: -25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="check" color={"white"} size={25} />
          </View>

          <View
            style={{
              backgroundColor: "#E0F2E3",
              padding: 15,
              paddingTop: 30,
              width: "100%",
              borderRadius: 10,
              gap: 5,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#10A958",
                  fontSize: 17,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Tebrikler
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#333",
                  fontWeight: "600",
                  textAlign: "center",
                  letterSpacing: 0.5,
                  lineHeight: 21,
                }}
              >
                Profilinizi başarıyla oluşturdunuz! Belgeleriniz yöneticilerimiz
                tarafından onaylandıktan sonra tüm alanlara erişiminiz
                açılacaktır. Belgelerinizin durumu hakkında sizi e-posta ve SMS
                ile bilgilendireceğiz{" "}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "#2F7DF7",
              position: "absolute",
              zIndex: 1,
              top: -25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="info" color={"white"} size={25} />
          </View>

          <View
            style={{
              backgroundColor: "#DBE9FE",
              padding: 15,
              paddingTop: 30,
              width: "100%",
              borderRadius: 10,
              gap: 5,
            }}
          >
            <View>
              <Text
                style={{
                  color: "#2F7DF7",
                  fontSize: 17,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Bilgilendirme
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "#333",
                  fontWeight: "600",
                  textAlign: "center",
                  letterSpacing: 0.5,
                  lineHeight: 21,
                }}
              >
                Belgeleriniz onaylanana kadar panelinizde işlem yapamaz ve
                herhangi bir satın alma işlemi gerçekleştiremezsiniz
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity
          style={style.seeDocumentBtn}
          activeOpacity={0.7}
          onPress={() => {
            prevStep();
          }}
        >
          <Text style={style.seeDocumentBtnText}>Belgeleri Gör</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.goToHomePageBtn}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={style.goToHomePageBtnText}>Ana Sayfaya Git</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessRegistered;

const style = StyleSheet.create({
  seeDocumentBtn: {
    borderWidth: 1,
    borderColor: "#EA2B2E",
    width: "45%",
    padding: 10,
    borderRadius: 10,
  },
  seeDocumentBtnText: {
    color: "#EA2B2E",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  goToHomePageBtn: {
    backgroundColor: "#EA2B2E",
    width: "45%",
    padding: 10,
    borderRadius: 10,
  },
  goToHomePageBtnText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
