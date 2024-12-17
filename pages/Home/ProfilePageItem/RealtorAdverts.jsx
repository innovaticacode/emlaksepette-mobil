import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";

import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { frontEndUriBase } from "../../../components/methods/apiRequest";
import RealtorPost from "../../../components/Card/RealtorCard/RealtorPost";

export default function RealtorAdverts({ housingdata, filteredResults }) {
  const fetchFeaturedEstates = async () => {
    try {
      // setFeaturedEstates(housingdata);
    } catch (error) {
      console.log(error);
    }
  };

  const { width, height } = Dimensions.get("window");

  const objectKeys = Object.keys(housingdata);
  const onRefresh = () => {
    setRefreshing(true);
    fetchFeaturedEstates();
  };
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingEstates, setloadingEstates] = useState(false);
  return (
    <>
      <FlatList
        contentContainerStyle={{ padding: 10, paddingBottom: 50 }}
        data={housingdata}
        renderItem={({ item }) => (
          <RealtorPost
            HouseId={item.id}
            openSharing={JSON.parse(item.housing_type_data)["open_sharing1"]}
            price={
              item.step2_slug == "gunluk-kiralik"
                ? JSON.parse(item.housing_type_data)["daily_rent"]
                : JSON.parse(item.housing_type_data)["price"]
            }
            housing={item}
            filteredResults={filteredResults}
            title={item.title}
            loading={loadingEstates}
            location={item.city["title"] + " / " + item.county["title"]}
            image={`${frontEndUriBase}housing_images/${
              JSON.parse(item.housing_type_data).image
            }`}
            column1_name={
              JSON.parse(item.housing_type_data)["m2gross"]
                ? JSON.parse(item.housing_type_data)["m2gross"]
                : ""
            }
            column1_additional={item.column1_additional}
            column2_name={
              JSON.parse(item.housing_type_data)["room_count"]
                ? JSON.parse(item.housing_type_data)["room_count"]
                : ""
            }
            column2_additional={item.column2_additional}
            column3_name={
              JSON.parse(item.housing_type_data)["floorlocation"]
                ? JSON.parse(item.housing_type_data)["floorlocation"]
                : ""
            }
            column3_additional={item.column3_additional}
            column4_name={
              JSON.parse(item.housing_type_data)[item.column4_name]
                ? JSON.parse(item.housing_type_data)[item.column4_name]
                : ""
            }
            column4_additional={item.column4_additional}
            bookmarkStatus={true}
            dailyRent={false}
          />
        )}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        onEndReached={() => fetchFeaturedEstates()}
        onEndReachedThreshold={0}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          !loadingEstates && (
            <View>
              <Text>Emlak ilanı bulunamadı</Text>
            </View>
          )
        }
        ListFooterComponent={
          loadingEstates && !refreshing ? (
            <ActivityIndicator
              style={{ margin: 20 }}
              size="small"
              color="#333"
            />
          ) : null
        }
      />
    </>
  );
}

const styles = StyleSheet.create({});
