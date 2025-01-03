import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";

export default function Notificate({
  name,
  time,
  selectnotificate,
  id,
  isShow,
  onRead,
  desc,
  title,
}) {
  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => {
        selectnotificate(id);
      }}
    >
      <Text style={styles.deleteButtonText}>Sil</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            onRead(id);
          }}
          style={
            ([styles.container],
            {
              backgroundColor: isShow == 0 ? "#FFF5F5" : "#FFF",
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 15,
              paddingHorizontal: 6,
            }}
          >
            <View style={{ flex: 0.2 / 2, alignItems: "center" }}>
              <Icon name="home" size={20} />
            </View>
            <View style={{ flex: 1.8 / 2, gap: 8 }}>
              <Text style={{ fontSize: 13, color: "#ea2b2e" }}>{title}</Text>
              <Text>{desc}</Text>
              <Text style={{ color: "grey", textAlign: "right", right: 10 }}>
                {time}
              </Text>
            </View>
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 40, right: 20 }}
              onPress={() => {
                selectnotificate(id);
              }}
            >
              <Icon name="delete" size={18} color={"#EA2B2E"} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: "#ebebeb",
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
  },
  deleteButton: {
    paddingHorizontal: 30,
    backgroundColor: "#ea2b2e",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 15,
  },
});
