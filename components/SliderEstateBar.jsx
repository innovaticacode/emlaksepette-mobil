import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import SliderItem from "./SliderItem";

import SliderItemSkeleton from "./SkeletonComponents/SliderItemSkeleton";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { apiUrl, frontEndUriBase } from "./methods/apiRequest";

export default function SliderEstateBar() {
  const [loading, setloading] = useState(false);
  const [featuredStores, setFeaturedStores] = useState([]);

  const fetchFeaturedStores = async () => {
    try {
      const response = await axios.get(
        apiUrl+"popular-estate-brands"
      );
      if (response.data.length > 0) {
        setFeaturedStores(response.data);
        setloading(true);
      }
    } catch (error) {
      console.log(error);
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
        {featuredStores.map((item, index) => (
          <View
            style={{
              width: 80,
              marginLeft: 3,
              alignItems: "center",
              marginBottom: 10,
            }}
            key={index}
          >
            {loading == false ? (
              <>
                <SliderItemSkeleton />
              </>
            ) : (
              <>
                <SliderItem
                  borderColor={"#e6e6e6"}
                  StoreID={item.id}
                  key={index}
                  image={`${frontEndUriBase}/storage/profile_images/${item.profile_image}`}
                />
                <Text
                  numberOfLines={2}
                  style={{ fontSize: 11, textAlign: "center" }}
                >
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
