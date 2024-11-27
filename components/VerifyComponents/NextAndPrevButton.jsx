import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const NextAndPrevButton = ({
  nextButtonPress,
  prevButtonPress,
  NextButtonDisabled,
  PrevButtonDisabled,
  step,
  userType,
}) => {
  console.log(NextButtonDisabled + "fdf");
  const [user, setuser] = useState({});
  const SetStep = async () => {
    try {
      if (user?.access_token) {
        // Gönderilecek JSON verisi
        const payload = {
          column_name: "banner_hex_code",
          value: currentColor,
        };

        const response = await axios.post(
          `https://private.emlaksepette.com/api/change-profile-value-by-column-name`,
          payload, // JSON verisi doğrudan gönderiliyor
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              "Content-Type": "application/json", // Raw format için Content-Type
            },
          }
        );

        setTimeout(() => {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Başarılı",
            textBody: `Mağaza Renginiz Olşturuldu`,
            button: "Tamam",
          });
        }, 500);
      }
    } catch (error) {
      console.error("Post isteği başarısız", error);
    }
  };
  return (
    <View style={styles.containerButtons}>
      {step != 1 && (
        <TouchableOpacity
          style={[styles.PrevButton]}
          onPress={() => {
            prevButtonPress();
          }}
        >
          <Text style={styles.PrevButtonText}>Önceki Adım</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        disabled={NextButtonDisabled == false ? true : false}
        style={[
          styles.NextButton,
          { opacity: NextButtonDisabled == false ? 0.5 : 1 },
        ]}
        onPress={() => {
          nextButtonPress();
        }}
      >
        <Text style={styles.NextButtonText}>Sonraki Adım</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextAndPrevButton;

const styles = StyleSheet.create({
  NextButton: {
    backgroundColor: "#EA2C2E",
    padding: 10,
    width: "45%",
    borderRadius: 10,
  },
  NextButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  PrevButton: {
    backgroundColor: "white",
    padding: 10,
    width: "45%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EA2C2E",
  },
  PrevButtonText: {
    color: "#EA2C2E",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  containerButtons: {
    position: "absolute",
    zIndex: 1,
    bottom: 30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
