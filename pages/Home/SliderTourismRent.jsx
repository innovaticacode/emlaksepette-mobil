import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import SliderItemSkeleton from "../../components/SkeletonComponents/SliderItemSkeleton";
import SliderTourismItem from "./SliderTourismItem";
import { apiUrl, frontEndUriBase } from "../../components/methods/apiRequest";

export default function SliderTourismRent({ data }) {
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  return (
    <GestureHandlerRootView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 9 }}
        style={{
          top: 0,
        }}
      >
        {data?.map((item, i) => (
          <View
            style={{
              width: 80,
              alignItems: "center",
            }}
            key={i}
          >
            <>
              <SliderTourismItem
                id={item.id}
                borderColor={"#e6e6e6"}
                image={`${frontEndUriBase}/storage/profile_images/${item.profile_image}`}
              />
              <Text
                numberOfLines={2}
                style={{ fontSize: 12, textAlign: "center" }}
              >
                {capitalizeFirstLetter(item.name)}
              </Text>
            </>
          </View>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({});
