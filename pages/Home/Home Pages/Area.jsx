import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,

  StyleSheet,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import RealtorPost from "../../../components/RealtorPost";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

const PAGE_SIZE = 10;

const Area= ({index}) => {
    const apiUrl = "https://mobil.emlaksepette.com/";
    const [featuredEstates, setFeaturedEstates] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
  
    const fetchFeaturedEstates = async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://mobil.emlaksepette.com/api/real-estates?page=${reset ? 1 : page}&limit=${PAGE_SIZE}`
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
                (estate) => !prevEstates.some((prevEstate) => prevEstate.id === estate.id)
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
        if (index==3) {
            fetchFeaturedEstates();
        }else{
            setFeaturedEstates([])
        }
   
    }, [index]);
  
    const filteredHomes = featuredEstates.filter((estate) => estate.step1_slug === "arsa");
  
    const onRefresh = () => {
      setRefreshing(true);
      fetchFeaturedEstates(true);
    };
  
    const renderFooter = () => {
      if (!loading) return null;
      return <ActivityIndicator style={{ margin: 20 }} size="small" color="#000000" />;
    };
    const [ModalForAddToCart, setModalForAddToCart] = useState(false);
    const [selectedCartItem, setselectedCartItem] = useState(0);
    const GetIdForCart = (id) => {
      setselectedCartItem(id);
      setModalForAddToCart(true);
    };
  
  return (
    <View style={styles.container}>
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
          ÖNE ÇIKAN ARSALAR
        </Text>

        <TouchableOpacity style={styles.allBtn}>
          <Text style={{ color: "white", fontSize: 11 ,fontWeight:'bold'}}>
            Tüm Konutları Gör
          </Text>
        </TouchableOpacity>
      </View>
      {refreshing && (
        <View style={{ padding: 10, backgroundColor: 'white', alignItems: 'center' }}>
          <ActivityIndicator animating={true} size="small" color="#000000" />
        </View>
      )}
      <FlatList
        data={filteredHomes}
        renderItem={({ item }) => (
          <RealtorPost
            GetId={GetIdForCart}
            HouseId={item.id}
            price={`${JSON.parse(item.housing_type_data)["price"]} `}
            housing={item}
            title={item.housing_title}
            loading={loading}
            location={item.city_title + " / " + item.county_title}
            image={`${apiUrl}/housing_images/${JSON.parse(item.housing_type_data).image}`}
            column1_name={`${JSON.parse(item.housing_type_data)[item.column1_name]} `}
            column1_additional={item.column1_additional}
            column2_name={`${JSON.parse(item.housing_type_data)[item.column2_name]} `}
            column2_additional={item.column2_additional}
            column3_name={`${JSON.parse(item.housing_type_data)[item.column3_name]} `}
            column3_additional={item.column3_additional}
            column4_name={`${JSON.parse(item.housing_type_data)[item.column4_name]} `}
            column4_additional={item.column4_additional}
            bookmarkStatus={true}
            dailyRent={false}
          />
        )}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
      
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        
        ListFooterComponent={renderFooter}
      />

      
    </View>
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
});

export default Area;
