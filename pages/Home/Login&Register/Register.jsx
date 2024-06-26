import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { React, useState } from "react";
import Personal from "./Personal";
import Company from "./Company";

export default function Register() {
  const [tabs, setTabs] = useState(1);
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.TabBar}>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#ebebeb",
            }}
          >
            <TouchableOpacity
              onPress={() => setTabs(1)}
              style={[
                styles.tabBarBtn,
                {
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  backgroundColor: tabs == 1 ? "#E54242" : "white",
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  color:
                    tabs == 1
                      ? "white"
                      : "white" && tabs == 2
                      ? "#333"
                      : "white",
                }}
              >
                Bireysel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTabs(2)}
              style={[
                styles.tabBarBtn,
                {
                  backgroundColor: tabs == 2 ? "#E54242" : "white",
                  borderTopLeftRadius: tabs == 2 ? 20 : 0,
                  borderBottomLeftRadius: tabs == 2 ? 20 : 0,
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  color:
                    tabs == 2
                      ? "white"
                      : "white" && tabs == 1
                      ? "#333"
                      : "white",
                }}
              >
                Kurumsal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {tabs === 1 && <Personal type={tabs} />}
        {tabs === 2 && <Company />}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  TabBar: {
    paddingVertical: 0,
    padding: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabBarBtn: {
    width: "50%",

    padding: 10,
    borderRadius: 10,
  },
});
