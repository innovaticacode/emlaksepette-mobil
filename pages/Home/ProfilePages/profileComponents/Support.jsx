import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import SupportAdd from "./SupportAdd";
import SupportList from "./SupportList";

export default function Support() {
  const [tabs, setTabs] = useState(1);
  return (
    <View style={{ flex: 1, padding: 5, backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          borderRadius: 50,
          marginTop: 10,
          justifyContent: "center",
          gap: 10,
        }}
      >
        <View style={{ width: "45%" }}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: tabs == 1 ? "red" : "#F2F2F2",
              borderRadius: 50,
              alignItems: "center",
            }}
            onPress={() => {
              setTabs(1);
            }}
          >
            <Text
              style={{
                color: tabs == 1 ? "white" : "#333",
              }}
            >
              Yeni Talep
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "45%" }}>
          <TouchableOpacity
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: tabs == 2 ? "red" : "#F2F2F2",
              borderRadius: 50,
              alignItems: "center",
            }}
            onPress={() => {
              setTabs(2);
            }}
          >
            <Text style={{ color: tabs == 2 ? "white" : "#333" }}>
              Geçmiş Talepler
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {tabs == 1 && <SupportAdd />}
      {tabs == 2 && <SupportList />}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  toggleButton: {
    fontSize: 20,
    marginBottom: 20,
  },

  modal: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",

    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 320,
  },
  TabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  tabBarBtn: {
    width: "50%",

    padding: 7,
    borderRadius: 5,
  },
});
