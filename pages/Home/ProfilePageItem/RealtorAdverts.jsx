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
import {
  apiUrl,
  frontEndUriBase,
} from "../../../components/methods/apiRequest";
import RealtorPost from "../../../components/Card/RealtorCard/RealtorPost";
import axios from "axios";
import EstateBottomSheetFilter from "../../../components/EstateBottomSheetFilter";
import NoDataScreen from "../../../components/NoDataScreen";

export default function RealtorAdverts({
  storeID,
  openEstateFilter,
  setOpenEstateFilter,
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingEstates, setLoadingEstates] = useState(false);
  const [housing, setHousing] = useState([]);
  const [skip, setSkip] = useState(0);
  const take = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState(null);

  const fetchBrandEstates = async (isLoadMore = false) => {
    if (isLoadMore && housing.length >= totalCount) return;

    if (!isLoadMore) {
      setLoading(true);
    } else {
      if (housing.length == 0) return;
      setLoadingEstates(true);
    }
    try {
      const response = await axios.get(apiUrl + "get_housings_by_store_id", {
        params: {
          store_id: storeID,
          skip: skip,
          take: take,
          filter: filter,
        },
      });
      const newHousings = response.data.housings;
      if (!isLoadMore) {
        setHousing(newHousings);
      } else {
        setHousing((prevHousing) => [...prevHousing, ...newHousings]);
      }
      setTotalCount(response.data.total_count);
      setSkip((prevSkip) => prevSkip + take);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setLoadingEstates(false);
    }
  };

  const onEndReached = () => {
    if (!loadingEstates && housing.length < totalCount) {
      fetchBrandEstates(true); // Sayfalama için
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setSkip(0);
    await fetchBrandEstates(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchBrandEstates();
  }, [storeID]);

  useEffect(() => {
    setSkip(0);
    fetchBrandEstates(false);
  }, [filter]);

  return (
    <>
      {loading && <ActivityIndicator size="large" color="#333" />}
      <>
        <EstateBottomSheetFilter
          isVisible={openEstateFilter}
          setIsVisible={setOpenEstateFilter}
          setFilter={setFilter}
          totalCount={totalCount}
        />
      </>
      <FlatList
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 50,
          flexGrow: 1,
          alignItems: housing.length == 0 ? "center" : null,
        }}
        data={housing}
        initialNumToRender={10}
        windowSize={3}
        maxToRenderPerBatch={10}
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
            filteredResults={undefined}
            title={item.housing_title}
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
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1} // Listenin sonuna yaklaşma eşiği
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={
          !loading && (
            <>
              <NoDataScreen
                iconName={"home"}
                isShowButton={true}
                message={"Henüz ilan yayınlanmadı."}
                navigateTo={"Home"}
                buttonText={"Anasayfaya Git"}
              />
            </>
          )
        }
        ListFooterComponent={
          loadingEstates ? (
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
