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
import { Platform } from "react-native";
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
  GetID,
}) {
  const [tabs, setTabs] = useState(0);
  const [rooms, setRooms] = useState([]);
  const Home = [];

  const projectCartOrders = data.projectCartOrders || [];
  const projectHousingsList = data.projectHousingsList || [];

  const getDiscountAmount = (project, roomIndex) => {
    const projectOffer = data.offer;
    return projectOffer ? projectOffer.discount_amount : 0;
  };
  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          {data.project.blocks &&
            data.project.blocks.map((block, blockIndex) => (
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
                  key={blockIndex}
                  onPress={() => {
                    setTabs(blockIndex);
                    getBlockItems(blockIndex);
                    setSelectedTab(blockIndex);
                  }}
                  style={[
                    styles.blockBtn,
                    {
                      borderBottomWidth: tabs === blockIndex ? 1 : 0,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontWeight: tabs === blockIndex ? "700" : "normal",
                      color: "#333",
                    }}
                  >
                    {block.block_name}
                  </Text>
                </TouchableOpacity>{" "}
              </ScrollView>
            ))}

          <ScrollView>
            {Array.from({ length: Math.min(data.project.room_count, 10) }).map(
              (_, i) => {
                const sold = projectCartOrders[i + 1] || null;
                const allCounts = 0;
                const blockHousingCount = 0;
                const previousBlockHousingCount = 0;
                const key = i;
                const isUserSame =
                  sold && currentUser
                    ? sold.user_id === currentUser.uid
                    : false;
                const projectDiscountAmount = getDiscountAmount(
                  data.project,
                  i
                );

                return (
                  <Posts
                    key={key}
                    GetID={GetID}
                    GetIdForCart={GetIdForCart}
                    openCollection={openCollection}
                    project={data.project}
                    data={data}
                    roomOrder={i + 1}
                    location={`${data.project.city.title} / ${data.project.county.ilce_title}`}
                    openFormModal={OpenFormModal}
                    offSaleCheck={
                      data.projectHousingsList[i + 1]["off_sale[]"] == "[]"
                    }
                    price={data.projectHousingsList[i + 1]["price[]"]}
                    formattedDiscountedPrice={data.projectHousingsList[i + 1]["price[]"] - data.projectDiscountAmount}
                    shareSale={
                      data.projectHousingsList[i + 1]["share_sale[]"] ?? null
                    }
                    numberOfShare={
                      data.projectHousingsList[i + 1]["number_of_shares[]"] ??
                      null
                    }
                    shareSaleEmpty = {!data.projectHousingsList[i + 1]["share_sale[]"] || data.projectHousingsList[i + 1]["share_sale[]"] === "[]"}
                    soldCheck={sold && ["1", "0"].includes(sold.status)}
                    sumCartOrderQt={data.sumCartOrderQt}
                    openmodal={openmodal}
                    bookmarkStatus={true}
                    projectDiscountAmount={projectDiscountAmount}
                    sold={sold}
                    allCounts={allCounts}
                    blockHousingCount={blockHousingCount}
                    previousBlockHousingCount={previousBlockHousingCount}
                    isUserSame={isUserSame}
                  />
                );
              }
            )}
          </ScrollView>
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
