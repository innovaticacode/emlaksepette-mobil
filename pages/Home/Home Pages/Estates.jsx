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
    }, [index])
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

  const handlePress = useCallback(() => {
    navigation.navigate("AllRealtorAdverts", {
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
    });
  }, [filteredHomes, navigation]);

  const renderItem = useCallback(
    ({ item }) => {
      const housingData = JSON.parse(item.housing_type_data);
      return (
        <RealtorPost
          sold={item.sold}
          HouseId={item.id}
          price={`${housingData.price} `}
          housing={item}
          title={item.housing_title}
          loading={loading}
          location={`${item.city_title} / ${item.county_title}`}
          image={`${frontEndUriBase}housing_images/${housingData.image}`}
          openSharing={housingData.open_sharing1}
          column1_additional={item.column1_additional}
          column1_name={housingData[item.column1_name] || ""}
          column2_name={housingData[item.column2_name] || ""}
          column2_additional={item.column2_additional}
          column3_name={housingData[item.column3_name] || ""}
          column3_additional={item.column3_additional}
          column4_name={housingData[item.column4_name] || ""}
          column4_additional={item.column4_additional}
          bookmarkStatus={true}
          dailyRent={false}
          isFavorite={item.is_favorite}
        />
      );
    },
    [loading]
  );

  const keyExtractor = useCallback(
    (item, index) => (item.id ? item.id.toString() : index.toString()),
    []
  );

  const ListHeaderComponent = useMemo(
    () => (
      <>
        <View style={styles.headerImageContainer}>
          <Image source={Housing} style={styles.headerImage} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>ÖNE ÇIKAN EMLAK İLANLARI</Text>
          <TouchableOpacity style={styles.allBtn} onPress={handlePress}>
            <Text style={styles.allBtnText}>Tüm İlanları Gör</Text>
          </TouchableOpacity>
        </View>
      </>
    ),
    [handlePress]
  );

  return (
    <>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={"small"} color="#333" />
        </View>
      ) : (
        <View style={styles.container}>
          {refreshing && (
            <View style={styles.refresh}>
              <ActivityIndicator
                animating={true}
                size="small"
                color="#000000"
              />
            </View>
          )}
          <AlertNotificationRoot>
            {filteredHomes.length == 0 ? (
              <View style={styles.alertArea}>
                <Text style={styles.notFoundText}>Konut İlanı Bulunamadı</Text>
              </View>
            ) : (
              <FlatList
                data={filteredHomes}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onEndReachedThreshold={0.1}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={10}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListHeaderComponent={ListHeaderComponent}
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
  allBtnText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
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
  headerImageContainer: {
    paddingHorizontal: 0,
  },
  headerImage: {
    width: "100%",
    height: 120,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  refresh: {
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  notFoundText: {
    textAlign: "center",
    color: "grey",
    fontWeight: "700",
  },
  alertArea: {
    width: "100%",
    paddingTop: 10,
  },
});

export default Estates;
