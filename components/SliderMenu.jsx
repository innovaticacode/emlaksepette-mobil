import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

export default function SliderMenu({ goToSlide, tab, settab }) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{}}
    >
      <View style={{ padding: 10, flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            {
              backgroundColor: tab == 0 ? "#EA2C2E" : "#ebebeb",
              borderWidth: tab == 0 ? 0 : 1,
            },
          ]}
          onPress={() => {
            goToSlide(0);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: tab == 0 ? "white" : "#333333",
            }}
          >
            Projeler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            {
              backgroundColor: tab == 1 ? "#EA2C2E" : "#ebebeb",
              borderWidth: tab == 1 ? 0 : 1,
            },
          ]}
          onPress={() => {
            goToSlide(1);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: tab == 1 ? "white" : "#333333",
            }}
          >
            Konut
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            {
              backgroundColor: tab == 2 ? "#EA2C2E" : "#ebebeb",
              borderWidth: tab == 2 ? 0 : 1,
            },
          ]}
          onPress={() => {
            goToSlide(2);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: tab == 2 ? "white" : "#333333",
            }}
          >
            İş Yeri
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <Text style={{ textAlign: "center", color: "#333333" }}>Arsa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <Text style={{ textAlign: "center", color: "#333333" }}>
            Prefabrik
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <Text style={{ textAlign: "center", color: "#333333" }}>
            Tatilini Kirala
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn}>
          <Text style={{ textAlign: "center", color: "#333333" }}>
            Al Sat Acil
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tabBtn: {
    backgroundColor: "white",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#c7c7ca",
  },
});
