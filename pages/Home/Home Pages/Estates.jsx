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
import Housing from "../../../src/assets/images/Konut.png";
import { frontEndUriBase } from "../../../components/methods/apiRequest";
import { useFeaturedEstates } from "../../../hooks/useFeaturedEstates";

const Estates = ({ index }) => {
  const navigation = useNavigation();
  const [user, setuser] = useState({});

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
      if (index == 2) {
        if (loading || (!hasMore && !reset)) return;
        fetchFeaturedEstates(true);
      } else {
        fetchFeaturedEstates(false);
      }
    }, [index, user])
  );

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const filteredHomes = useMemo(() => {
    return featuredEstates.filter((estate) => estate.step1_slug === "konut");
  }, [featuredEstates]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeaturedEstates(true);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator style={{ margin: 0 }} size="small" color="#333" />
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
        <View style={styles.container}>
          {refreshing && (
            <View
              style={{
                padding: 10,
                backgroundColor: "white",
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
                    sold={item.sold}
                    HouseId={item.id}
                    price={`${JSON.parse(item.housing_type_data)["price"]} `}
                    housing={item}
                    title={item.housing_title}
                    loading={loading}
                    location={item.city_title + " / " + item.county_title}
                    image={`${frontEndUriBase}housing_images/${
                      JSON.parse(item.housing_type_data).image
                    }`}
                    openSharing={
                      JSON.parse(item.housing_type_data)["open_sharing1"]
                    }
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
                ListHeaderComponent={
                  <>
                    <View style={{ paddingHorizontal: 0 }}>
                      <Image
                        source={Housing}
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
                            data: filteredHomes,
                            count: filteredHomes.length,
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
                }
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
});

export default Estates;
