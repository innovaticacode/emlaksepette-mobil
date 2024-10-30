import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Image,
} from "react-native";
import RealtorPost from "../../../components/RealtorPost";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import Modal from "react-native-modal";
import { getValueFor } from "../../../components/methods/user";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { AlertNotificationRoot } from "react-native-alert-notification";
import bannerSRC from "../../../src/assets/images/tatilim-sepette-banner.png";
const PAGE_SIZE = 10;

const BookHouse = ({ index }) => {
  const navigation = useNavigation();
  const apiUrl = "https://private.emlaksepette.com/";
  const [featuredEstates, setFeaturedEstates] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const fetchFeaturedEstates = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    const config = {
      headers: { Authorization: `Bearer ${user?.access_token}` },
    };
    setLoading(true);
    try {
      const response = await axios.get(
        `https://private.emlaksepette.com/api/real-estates?page=${
          reset ? 1 : page
        }&limit=${PAGE_SIZE}`,
        config
      );
      const newEstates = response.data;

      if (reset) {
        setFeaturedEstates(newEstates);
        setPage(2);
        setHasMore(true);
      } else {
        if (newEstates.length > 0) {
          setFeaturedEstates((prevEstates) => {
            const newUniqueEstates = newEstates.filter(
              (estate) =>
                !prevEstates.some((prevEstate) => prevEstate.id === estate.id)
            );
            return [...prevEstates, ...newUniqueEstates];
          });
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (index == 6) {
        fetchFeaturedEstates(true);
      } else {
        setFeaturedEstates([]);
      }
    }, [index, user])
  );

  const filteredHomes = featuredEstates.filter(
    (estate) => estate.step2_slug === "gunluk-kiralik"
  );

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
                keyExtractor={(item, index) => `${item.id}-${index}`}
                data={filteredHomes}
                renderItem={({ item, index }) => (
                  <RealtorPost
                    openSharing={
                      JSON.parse(item.housing_type_data)["open_sharing1"]
                    }
                    HouseId={item.id}
                    price={
                      item.step2_slug == "gunluk-kiralik"
                        ? JSON.parse(item.housing_type_data)["daily_rent"]
                        : JSON.parse(item.housing_type_data)["price"]
                    }
                    housing={item}
                    title={item.housing_title}
                    loading={loading}
                    location={item.city_title + " / " + item.county_title}
                    image={`${apiUrl}/housing_images/${
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
                ListHeaderComponent={
                  <>
                    <View style={{ paddingHorizontal: 0 }}>
                      <Image
                        source={bannerSRC}
                        style={{
                          width: "100%",
                          height: 120,
                        }}
                      />
                    </View>
                    <View style={styles.header}>
                      <Text style={{ fontSize: 14, fontWeight: 700 }}>
                        ÖNE ÇIKAN TATİL EVLERİ
                      </Text>

                      <TouchableOpacity style={styles.allBtn}>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                          onPress={() =>
                            navigation.navigate("Drawer", {
                              screen: "AllRealtorAdverts",
                              params: {
                                name: "Emlak İlanları",
                                slug: "emlak-ilanlari",
                                data: filteredHomes,
                                count: filteredHomes.length,
                                type: "mustakil-tatil",
                                optional: null,
                                title: null,
                                check: null,
                                city: null,
                                county: null,
                                hood: null,
                              },
                            })
                          }
                        >
                          Tüm İlanları Gör
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                }
                onEndReachedThreshold={0.1}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
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

export default BookHouse;
