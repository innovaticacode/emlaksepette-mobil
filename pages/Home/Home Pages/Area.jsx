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
import RealtorPost from "../../../components/RealtorPost";
import { ActivityIndicator } from "react-native-paper";
import { getValueFor } from "../../../components/methods/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import Land from "../../../src/assets/images/Arsa.png";
import { frontEndUriBase } from "../../../components/methods/apiRequest";
import { useFeaturedEstates } from "../../../hooks/useFeaturedEstates";

const Area = ({ index }) => {
  const navigation = useNavigation();
  const [user, setuser] = useState({});

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const {
    fetchFeaturedEstates,
    setRefreshing,
    featuredEstates,
    loading,
    hasMore,
    refreshing,
  } = useFeaturedEstates();

  useFocusEffect(
    useCallback(() => {
      if (index == 4) {
        if (loading || (!hasMore && !reset)) return;
        fetchFeaturedEstates(true);
      } else {
        fetchFeaturedEstates(false);
      }
    }, [index, user])
  );

  const filteredHomes = useMemo(() => {
    return featuredEstates.filter((estate) => estate.step1_slug === "arsa");
  }, [featuredEstates]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeaturedEstates(true);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator style={{ margin: 20 }} size="small" color="#333" />
    );
  };

  return (
    <>
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size={"small"} color="#333" />
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
            {filteredHomes.length == 0 ? (
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
                data={filteredHomes}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <RealtorPost
                    HouseId={item.id}
                    price={`${JSON.parse(item.housing_type_data)["price"]} `}
                    housing={item}
                    title={item.housing_title}
                    loading={loading}
                    location={item.city_title + " / " + item.county_title}
                    openSharing={
                      JSON.parse(item.housing_type_data)["open_sharing1"]
                    }
                    image={`${frontEndUriBase}housing_images/${
                      JSON.parse(item.housing_type_data).image
                    }`}
                    column1_additional={item.column1_additional}
                    column1_name={
                      JSON.parse(item.housing_type_data)[item.column1_name]
                        ? JSON.parse(item.housing_type_data)[item.column1_name]
                        : ""
                    }
                    column2_name={
                      JSON.parse(item.housing_type_data)[item.column2_name]
                        ? JSON.parse(item.housing_type_data)[item.column2_name]
                        : ""
                    }
                    column2_additional={item.column2_additional}
                    column3_name={
                      JSON.parse(item.housing_type_data)[item.column3_name]
                        ? JSON.parse(item.housing_type_data)[item.column3_name]
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
                    isFavorite={item.is_favorite}
                  />
                )}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                }
                onEndReachedThreshold={0.1}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListFooterComponent={renderFooter}
                ListHeaderComponent={
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
                              data: filteredHomes,
                              count: filteredHomes.length,
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
                }
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
