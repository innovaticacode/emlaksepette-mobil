import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../methods/apiRequest";
import { getValueFor } from "../methods/user";

const NextAndPrevButton = ({
  nextButtonPress,
  prevButtonPress,
  NextButtonDisabled,
  PrevButtonDisabled,
  step,
  SendInfo
}) => {
 
  const [user, setuser] = useState({});
  useEffect(() => {
getValueFor('user',setuser)
  }, [])
  
  const SetStep = async () => {
    const formData=new FormData()
    try {
      if (user?.access_token) {
        // Gönderilecek JSON verisi
          formData.append('step',step)
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
  return (
    <View style={styles.containerButtons}>
      
        <TouchableOpacity
          style={[styles.PrevButton]}
          onPress={() => {
            prevButtonPress();
          }}
        >
          <Text style={styles.PrevButtonText}>Önceki Adım</Text>
        </TouchableOpacity>
     

      <TouchableOpacity
        disabled={NextButtonDisabled == false ? true : false}
        style={[
          styles.NextButton,
          { opacity: NextButtonDisabled == false ? 0.5 : 1 },
        ]}
        onPress={() => {
        
            SendInfo()
         
         
       
          

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
