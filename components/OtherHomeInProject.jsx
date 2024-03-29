import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { React, useEffect, useState } from "react";
import Ablok from "./Bloks/Ablok";
import Bblok from "./Bloks/Bblok";
import ShoppinInfo from "./ShoppinInfo";
import Posts from "./Posts";
import { apiRequestGet } from "./methods/apiRequest";
export default function OtherHomeInProject({ openmodal, data }) {
  const [tabs, setTabs] = useState(0);
  const [rooms, setRooms] = useState([]);
  const Home = [];
  return (
    <SafeAreaView>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: "#ebebeb",
              padding: 3,
              gap: 10,
            }}
            bounces={false}
          >
            <TouchableOpacity
              onPress={() => setTabs(0)}
              style={[
                styles.blockBtn,
                {
                  borderBottomWidth: tabs == 0 ? 1 : 0,
                },
              ]}
            >
              <Text
                style={{
                  fontWeight: tabs == 0 ? "700" : "normal",
                  color: "#333",
                }}
              >
                A Blok
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTabs(1)}
              style={[
                styles.blockBtn,
                {
                  borderBottomWidth: tabs == 1 ? 1 : 0,
                },
              ]}
            >
              <Text
                style={{
                  fontWeight: tabs == 1 ? "700" : "normal",
                  color: "#333",
                }}
              >
                B Blok
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <View>
            {Array.from({ length: data.project.room_count }).map(
              (index, _index) => {
                return (
                  <Posts
                    key={_index}
                    data={data}
                    openmodal={openmodal}
                    roomOrder={_index + 1}
                  />
                );
              }
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    top: 0,

    backgroundColor: "#FFFFFF",

    marginTop: 0,

    width: "100%",

    height: "auto",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  tabBar: {
    height: 40,

    top: 5,
    display: "flex",

    gap: 2,
    backgroundColor: "#EFEFEF",
  },

  blockBtn: {
    paddingLeft: 30,
    paddingRight: 30,
    padding: 8,
    borderBottomWidth: 1,
  },
});
