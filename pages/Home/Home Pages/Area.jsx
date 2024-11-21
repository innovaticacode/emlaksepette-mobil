import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import Land from "../../../src/assets/images/Arsa.png";
import { frontEndUriBase } from "../../../components/methods/apiRequest";
import RealtorPost from "../../../components/Card/RealtorCard/RealtorPost";
import { UsePaginatedData } from "../../../hooks";


const Area = ({ index }) => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const apiData = [{ key: "step1_slug", value: "arsa" }];
  const { data, hooksLoading, error, loadMore, setSkip } = UsePaginatedData("real-estates", 10, apiData);

  useFocusEffect(
    useCallback(() => {
      if (index == 4) {
        setLoading(true);
        loadMore();
        setLoading(false);
      }
    }, [index])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await setSkip(0);
    setRefreshing(false);
  };

  const renderFooter = () => {
    if (!hooksLoading) return null;
    return (
      <View style={{ height: 100 }}>
        <ActivityIndicator style={{ marginVertical: 16 }} size="small" color="#333" />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={{ paddingHorizontal: 0 }}>
          <Image
            source={Land}
            style={{
              width: "auto",
              height: 120,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={styles.header}>
          <Text style={{ fontSize: 14, fontWeight: 700 }}>
            ÖNE ÇIKAN ARSALAR
          </Text>

          <TouchableOpacity style={styles.allBtn}>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "bold",
              }}
              onPress={() =>
                navigation.navigate("AllRealtorAdverts", {
                  name: "Emlak İlanları",
                  slug: "emlak-ilanlari",
                  data: data,
                  count: data.length,
                  type: "arsa",
                  optional: null,
                  title: null,
                  check: null,
                  city: null,
                  county: null,
                  hood: null,
                })
              }
            >
              Tüm İlanları Gör
            </Text>
          </TouchableOpacity>
        </View>
      </>
    )
  };

  const renderItem = useMemo(() => ({ item }) => {
    const housingTypeData = JSON.parse(item.housing_type_data);
    const getColumnName = (columnNameKey) => {
      return housingTypeData[columnNameKey] || "";
    };

    return (
      <RealtorPost
        HouseId={item.id}
        price={`${housingTypeData["price"]} `}
        housing={item}
        title={item.housing_title}
        loading={loading}
        location={`${item.city_title} / ${item.county_title}`}
        image={`${frontEndUriBase}housing_images/${housingTypeData?.image}`}
        column1_additional={item.column1_additional}
        column1_name={getColumnName(item.column1_name)}
        column2_name={getColumnName(item.column2_name)}
        column2_additional={item.column2_additional}
        column3_name={getColumnName(item.column3_name)}
        column3_additional={item.column3_additional}
        column4_name={getColumnName(item.column4_name)}
        column4_additional={item.column4_additional}
        openSharing={housingTypeData["open_sharing1"]}
        bookmarkStatus={true}
        dailyRent={false}
        isFavorite={item.is_favorite}
        sold={item.sold}
      />
    );
  }, [loadMore, hooksLoading]);


  return (
    <>
      {
        error && (
          <>
            <Text style={styles.errorText}>Bir şeyler ters gitti:{error}</Text>
          </>
        )
      }
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size={"large"} color="#333" />
        </View>
      ) : (
        <>
          {refreshing && (
            <View
              style={{
                padding: 10,
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <ActivityIndicator animating={true} size="small" color="#333" />
            </View>
          )}
          <AlertNotificationRoot>
            {data.length == 0 ? (
              <View style={{ width: "100%", paddingTop: 10 }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "grey",
                    fontWeight: "700",
                  }}
                >
                  Konut İlanı Bulunamadı
                </Text>
              </View>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => { loadMore() }}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={24}
                onEndReachedThreshold={0.3}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                ListHeaderComponent={renderHeader}
              />
            )}
          </AlertNotificationRoot>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  allBtn: {
    backgroundColor: "#EA2C2E",
    paddingLeft: 15,
    paddingRight: 15,
    padding: 5,
    borderRadius: 4,
  },
  modal4: {
    justifyContent: "center",
    margin: 0,
    padding: 20,
    backgroundColor: "#22283100",
  },
  modalContent4: {
    backgroundColor: "#fefefe",
    padding: 5,
    borderRadius: 5,
  },
  header: {
    paddingBottom: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
  },
});

export default Area;
