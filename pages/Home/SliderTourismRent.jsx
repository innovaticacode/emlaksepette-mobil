import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import SliderItemSkeleton from "../../components/SkeletonComponents/SliderItemSkeleton";
import SliderTourismItem from "./SliderTourismItem";

export default function SliderTourismRent() {
  const apiUrl = "https://private.emlaksepette.com";
  const [loading, setloading] = useState(true);
  const [tourismRent, setTourismRent] = useState([]);

  const fetchFeaturedStores = async () => {
    try {
      setloading(true);
      const response = await axios.get(
        "https://private.emlaksepette.com/api/get_featured_acente_brands"
      );
      if (response?.data?.length > 0) {
        setTourismRent(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedStores();
  }, []);
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  return (
    <GestureHandlerRootView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          top: 0,
        }}
      >
        {tourismRent?.map((item, i) => (
          <View
            style={{
              width: 80,
              marginLeft: 3,
              alignItems: "center",
              marginBottom: 10,
            }}
            key={i}
          >
            {loading ? (
              <SliderItemSkeleton />
            ) : (
              <>
                <SliderTourismItem
                  id={item.id}
                  borderColor={"#e6e6e6"}
                  image={`${apiUrl}/storage/profile_images/${item.profile_image}`}
                />
                <Text numberOfLines={2}>
                  {capitalizeFirstLetter(item.name)}
                </Text>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({});
