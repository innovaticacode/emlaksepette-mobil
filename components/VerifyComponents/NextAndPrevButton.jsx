import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import { getValueFor } from "../methods/user";
import AwesomeAlert from "react-native-awesome-alerts";
import { useDispatch } from "react-redux";
import { setNotificationsRedux } from "../../store/slices/Notifications/NotificationsSlice";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { setShoppingProfile } from "../../store/slices/Menu/MenuSlice";
const NextAndPrevButton = ({
  nextButtonPress,
  prevButtonPress,
  NextButtonDisabled,
  PrevButtonDisabled,
  step,
  SendInfo,
  style,
}) => {
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const dispatch = useDispatch();
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();
  const logout = async () => {
    setDialogVisible(false);
    dispatch(
      setNotificationsRedux({
        notificationsCount: 0,
      })
    );
    await SecureStore.deleteItemAsync("user");
    setTimeout(() => {
      dispatch(setShoppingProfile({ isShoppingProfile: false }));
      navigation.replace("Drawer", {
        screen: "Home",
        params: { status: "logout" },
      });
    }, 150);
  };
  return (
    <View
      style={
        style && style == 0 ? styles.containerButtons2 : styles.containerButtons
      }
    >
      <AwesomeAlert
        show={dialogVisible}
        showProgress={false}
        titleStyle={{
          color: "#333",
          fontSize: 13,
          fontWeight: "700",
          textAlign: "center",
          margin: 5,
        }}
        title={"Çıkış Yap"}
        messageStyle={{ textAlign: "center" }}
        message={`Çıkış yapmak istediğinize emin misiniz?`}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Hayır"
        confirmText="Evet"
        cancelButtonColor="#ce4d63"
        confirmButtonColor="#1d8027"
        onCancelPressed={() => {
          setDialogVisible(false);
        }}
        onConfirmPressed={() => {
          logout();
        }}
        confirmButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
        cancelButtonTextStyle={{ marginLeft: 20, marginRight: 20 }}
      />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={[styles.PrevButton]}
          onPress={() => {
            prevButtonPress();
          }}
        >
          <Text style={styles.PrevButtonText}>Önceki Adım</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.NextButton]}
          onPress={() => {
            SendInfo();
          }}
        >
          <Text style={styles.NextButtonText}>Sonraki Adım</Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={styles.exitBtn}
          onPress={() => {
            setDialogVisible(true);
          }}
        >
          <Text style={styles.exitBtnText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
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

    width: "100%",
  },
  containerButtons2: {
    width: "100%",
  },
  exitBtn: {
    backgroundColor: "#EA2C2E",
    padding: 9,
    borderRadius: 7,
  },
  exitBtnText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
