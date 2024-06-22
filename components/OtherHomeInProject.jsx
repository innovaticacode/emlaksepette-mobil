import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { React, useCallback, useEffect, useState } from "react";
import Ablok from "./Bloks/Ablok";
import Bblok from "./Bloks/Bblok";
import ShoppinInfo from "./ShoppinInfo";
import Posts from "./Posts";
import { apiRequestGet } from "./methods/apiRequest";
import { Platform } from "react-native";
import { getValueFor } from "./methods/user";
export default function OtherHomeInProject({
  selectedTab,
  loadData,
  getBlockItems,
  setSelectedTab,
  itemCount,
  openModal,
  OpenFormModal,
  data,
  getLastItemCount,
  openCollection,
  GetIdForCart,
  GetID,
  isLoading,
  selectedBlock,
  setSelectedBlock,
  lastBlockItemCount,
  setLastBlockItemCount,
  setPage,
  setPaymentModalShowOrder
}) {
  const [user, setUser] = useState({});
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const projectCartOrders = data.projectCartOrders || [];
  const projectHousingsList = data.projectHousingsList || [];

  const getDiscountAmount = (project, roomIndex) => {
    const projectOffer = data.offer;
    return projectOffer ? projectOffer.discount_amount : 0;
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color={"red"} style={styles.loading} />;
  };

  console.log(data);

  const renderItem = ({ item, index }) => {
    const sold = projectCartOrders[index + 1] || null;
    index = lastBlockItemCount + index;
    const allCounts = 0;
    const blockHousingCount = 0;
    const previousBlockHousingCount = 0;
    const isUserSame = sold && user ? sold.user_id === user?.id : false;
    const projectDiscountAmount = getDiscountAmount(data.project, index);
    if(data.projectHousingsList[index + 1]){
      return (
        <Posts
          key={index}
          GetID={GetID}
          GetIdForCart={GetIdForCart}
          openCollection={openCollection}
          project={data.project}
          projectFavorites={data.projectFavorites}
          data={data}
          roomOrder={index + 1}
          location={`${data.project.city.title} / ${data.project.county.ilce_title}`}
          openFormModal={OpenFormModal}
          offSaleCheck={false}
          price={data.projectHousingsList[index + 1]["price[]"]}
          formattedDiscountedPrice={data.projectHousingsList[index + 1]["price[]"] - data.projectDiscountAmount}
          shareSale={data.projectHousingsList[index + 1]["share_sale[]"] ?? null}
          numberOfShare={data.projectHousingsList[index + 1]["number_of_shares[]"] ?? null}
          shareSaleEmpty={!data.projectHousingsList[index + 1]["share_sale[]"] || data.projectHousingsList[index + 1]["share_sale[]"] === "[]"}
          soldCheck={sold && ["1", "0"].includes(sold.status)}
          sumCartOrderQt={data.sumCartOrderQt}
          openModal={openModal}
          bookmarkStatus={true}
          projectDiscountAmount={projectDiscountAmount}
          sold={sold}
          allCounts={allCounts}
          blockHousingCount={blockHousingCount}
          previousBlockHousingCount={previousBlockHousingCount}
          isUserSame={isUserSame}
          haveBlocks={data.project.have_blocks}
          lastBlockItemCount={lastBlockItemCount}
        />
      );
    }
  };
  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: "#ebebeb",
              padding: 3,
              gap: 10,
              display:'flex'
            }}
            bounces={false}
          >
            {data.project.blocks && data.project.blocks.map((block, blockIndex) => (
              <TouchableOpacity
                key={blockIndex}
                onPress={() => {
                  setPaymentModalShowOrder(null);
                  setSelectedBlock(blockIndex);
                  var lastBlockItemCountTemp = 0;
                  for(var i = 0; i < blockIndex; i++){
                    lastBlockItemCountTemp += data.project.blocks[i].housing_count;
                  }
                  setLastBlockItemCount(lastBlockItemCountTemp);
                  getBlockItems(blockIndex);
                  setSelectedTab(blockIndex);
                  setPage(0);
                }}
                style={[
                  styles.blockBtn,
                  {
                    borderBottomWidth: selectedBlock === blockIndex ? 1 : 0,
                  },
                ]}
              >
                <Text
                  style={{
                    fontWeight: selectedBlock === blockIndex ? "700" : "normal",
                    color: "#333",
                  }}
                >
                  {block.block_name}
                </Text>
              </TouchableOpacity>
            ))}

            </ScrollView>

          <FlatList
            data={Array.from({ length: Math.min(data.project.room_count, itemCount) })}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />

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
  loading: {
    padding: 10,
    color : 'red'
  },
});
