import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import bannerSRC from "../../../src/assets/images/is_yeri.png";
import { frontEndUriBase } from "../../../components/methods/apiRequest";
import RealtorPost from "../../../components/Card/RealtorCard/RealtorPost";
import { UsePaginatedData } from "../../../hooks";


const Shop = ({ index }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const apiData = [{ key: "step1_slug", value: "is-yeri" }];
  const { data, hooksLoading, error, loadMore, setSkip } = UsePaginatedData("real-estates", 10, apiData);


  useFocusEffect(
    useCallback(() => {
      if (index == 2) {
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
    <>
      <View style={{ marginBottom: 20 }}>
        <Image
          source={bannerSRC}
          style={{
            width: "auto",
            height: 120,
            resizeMode: "cover",
          }}
        />
      </View>
      <View
        style={{
          paddingBottom: 3,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: 700 }}>
          ÖNE ÇIKAN İŞ YERLERİ
        </Text>

        <TouchableOpacity style={styles.allBtn}>
          <Text
            style={{
              color: "white",
              fontSize: 11,
              fontWeight: "bold",
            }}
            onPress={() =>
              navigation.navigate("AllRealtorAdverts", {
                name: "Emlak İlanları",
                slug: "emlak-ilanlari",
                data: data,
                count: data.length,
                type: "is-yeri",
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
  };
  const renderItem = useMemo(() => ({ item }) => {
    // Parse the housing_type_data only once
    const housingTypeData = JSON.parse(item.housing_type_data);

    // Get the column name safely
    const getColumnName = (columnNameKey) => {
      return housingTypeData[columnNameKey] || "";
    };

    return (
      <RealtorPost
        openSharing={housingTypeData["open_sharing1"]}
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
        bookmarkStatus={true}
        dailyRent={false}
        isFavorite={item.is_favorite}
        sold={item.sold}
      />
    );
  }, [hooksLoading, loadMore]);

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
                padding: 12,
                backgroundColor: "white",
                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                animating={true}
                size="small"
                color="#000000"
              />
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
                keyExtractor={(item, index) => index.toString()}  // İndeks ile key
                onEndReached={() => { loadMore() }}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={24}
                onEndReachedThreshold={0.3}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
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
    backgroundColor: "#1414148c",
  },
  modalContent4: {
    backgroundColor: "#fefefe",
    padding: 20,
    borderRadius: 5,
  },
});

export default Shop;
