import React, { useState, useCallback, useMemo, useEffect } from "react";
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

import { frontEndUriBase } from "../../../components/methods/apiRequest";
import RealtorPost from "../../../components/Card/RealtorCard/RealtorPost";
import { UsePaginatedData } from "../../../hooks";
import { useSelector } from "react-redux";

const Estates = ({ index }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const apiData = [{ key: "step1_slug", value: "konut" }];
  const banners = useSelector((state) => state?.banners?.banners);
  const { data, hooksLoading, error, loadMore, setSkip } = UsePaginatedData(
    "real-estates",
    10,
    apiData
  ); // take 10

  useFocusEffect(
    useCallback(() => {
      if (index === 2 && data.length === 0) {
        setSkip(0);
      }
    }, [index, data.length])
  );

  const onRefresh = async () => {
    setLoading(true);
    await setSkip(0);
    setLoading(false);
  };

  const renderFooter = () => {
    if (!hooksLoading) return null;
    return (
      <View style={{ height: 100 }}>
        <ActivityIndicator
          style={{ marginVertical: 16 }}
          size="small"
          color="#333"
        />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <>
        <View style={{ paddingHorizontal: 0 }}>
          <Image
            source={{ uri: banners?.konut }}
            style={{ width: "100%", height: 120 }}
          />
        </View>

        <View style={styles.header}>
          <Text style={{ fontSize: 14, fontWeight: 700 }}>
            ÖNE ÇIKAN EMLAK İLANLARI
          </Text>

          <TouchableOpacity
            style={styles.allBtn}
            onPress={() =>
              navigation.navigate("AllRealtorAdverts", {
                name: "Emlak İlanları",
                slug: "emlak-ilanlari",
                data: data,
                count: data.length,
                type: "konut",
                optional: null,
                title: null,
                check: null,
                city: null,
                county: null,
                hood: null,
              })
            }
          >
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Tüm İlanları Gör
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderItem = useMemo(
    () =>
      ({ item }) => {
        const housingTypeData = JSON.parse(item.housing_type_data);

        const getColumnName = (columnNameKey) => {
          return housingTypeData[columnNameKey] || "";
        };

        return (
          <RealtorPost
            sold={item?.sold}
            HouseId={item?.id}
            price={`${housingTypeData["price"]} `}
            housing={item}
            title={item?.housing_title}
            loading={loading}
            location={`${item?.city_title} / ${item?.county_title}`}
            image={`${frontEndUriBase}housing_images/${housingTypeData?.image}`}
            openSharing={housingTypeData["open_sharing1"]}
            column1_additional={item?.column1_additional}
            column1_name={getColumnName(item?.column1_name)}
            column2_name={getColumnName(item?.column2_name)}
            column2_additional={item?.column2_additional}
            column3_name={getColumnName(item?.column3_name)}
            column3_additional={item?.column3_additional}
            column4_name={getColumnName(item?.column4_name)}
            column4_additional={item?.column4_additional}
            bookmarkStatus={true}
            dailyRent={false}
            isFavorite={item?.is_favorite}
          />
        );
      },
    [hooksLoading, loadMore]
  );

  return (
    <>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size={"large"} color="#333" />
        </View>
      ) : error ? (
        <View style={styles.errArea}>
          <Text style={styles.errorText}>Bir şeyler ters gitti: {error}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <AlertNotificationRoot>
            {data && data.length === 0 ? (
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
                onEndReached={() => loadMore()}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={24}
                onEndReachedThreshold={0.6}
                refreshControl={
                  <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
              />
            )}
          </AlertNotificationRoot>
        </View>
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
  errorText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  errArea: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default Estates;
