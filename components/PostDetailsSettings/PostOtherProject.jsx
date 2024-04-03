import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { React, useEffect, useState } from "react";




import Posts from "../Posts";
import { apiRequestGet } from "../methods/apiRequest";
export default function OtherHomeInProject({
  selectedTab,
  getBlockItems,
  setSelectedTab,
  itemCount,
  openmodal,
  data,
  getLastItemCount,
  openFormModal,
 

  
}) {
  const [tabs, setTabs] = useState(0);
  const [rooms, setRooms] = useState([]);
  const Home = [];

  console.log(getLastItemCount, "last");
  return (
    <SafeAreaView>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <View style={styles.container}>
      

          <View>
            {Array.from({
              length:
                data.project.room_count > 10
                  ? itemCount
                  : data.project.room_count,
            }).map((index, _index) => {
              return (
            
                <Posts
                  key={_index}
                  data={data}
                  openmodal={openmodal}
                  openFormModal={openFormModal}
                  roomOrder={
                    data.project.have_blocks
                      ? getLastItemCount() + _index + 1
                      : _index + 1
                  }
                />
              );
            })}
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