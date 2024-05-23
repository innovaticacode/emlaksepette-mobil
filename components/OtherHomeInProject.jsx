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
export default function OtherHomeInProject({
  selectedTab,
  getBlockItems,
  setSelectedTab,
  itemCount,
  openmodal,
  OpenFormModal,
  data,
  getLastItemCount,
  openCollection,
  GetIdForCart,
  GetID
}) {
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
            {data.project.have_blocks
              ? data.project.blocks.map((block, blockIndex) => {
                  return (
                    <TouchableOpacity
                      key={blockIndex}
                      onPress={() => {
                        setTabs(blockIndex);
                        getBlockItems(blockIndex);
                        setSelectedTab(blockIndex);
                      }}
                      style={[
                        styles.blockBtn,
                        {
                          borderBottomWidth: tabs == blockIndex ? 1 : 0,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontWeight: tabs == blockIndex ? "700" : "normal",
                          color: "#333",
                        }}
                      >
                        {block.block_name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : ""}
          </ScrollView>

          <View>
            {Array.from({
              length:
                data.project.room_count > 10
                  ? itemCount
                  : data.project.room_count
            }).map((index, _index) => {
              return (
                <Posts
                GetID={GetID}
                GetIdForCart={GetIdForCart}
                openCollection={openCollection}
                  key={_index}
                  data={data}
                  openFormModal={OpenFormModal}
                  openmodal={openmodal}
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
