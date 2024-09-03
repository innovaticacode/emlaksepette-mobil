import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import RealtorPost from "../../../components/RealtorPost";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import Modal from "react-native-modal";
import { getValueFor } from "../../../components/methods/user";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import SliderEstateBar from "../../../components/SliderEstateBar";
import { AlertNotificationRoot } from "react-native-alert-notification";
const PAGE_SIZE = 10;

const Estates = ({ index }) => {
  const navigation = useNavigation();
  const apiUrl = "https://emlaksepette.com/";
  const [featuredEstates, setFeaturedEstates] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setuser] = useState({});

  const fetchFeaturedEstates = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${user?.access_token}` },
    };

    console.log(config);
    try {
      const response = await axios.get(
        `https://emlaksepette.com/api/real-estates?page=${
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

  useEffect(() => {
    if (index == 1) {
      fetchFeaturedEstates();
    } else {
      setFeaturedEstates([]);
    }
  }, [index, user]);

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const filteredHomes = featuredEstates.filter(
    (estate) => estate.step1_slug === "konut"
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
                renderItem={({ item }) => (
                  <RealtorPost
                    sold={item.sold}
                    HouseId={item.id}
                    price={`${JSON.parse(item.housing_type_data)["price"]} `}
                    housing={item}
                    title={item.housing_title}
                    loading={loading}
                    location={item.city_title + " / " + item.county_title}
                    image={`${apiUrl}/housing_images/${
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
                    <View
                      style={{
                        paddingBottom: 3,
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop: 10,
                        backgroundColor: "white",
                        height: 130,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          marginBottom: 7,
                        }}
                      >
                        FRANCHAISE VEREN GAYRIMENKUL MARKALARI
                      </Text>

                      <SliderEstateBar />
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
                      <Text style={{ fontSize: 12, fontWeight: 700 }}>
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
                            fontSize: 11,
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
});

export default Estates;
