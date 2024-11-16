import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import SliderItem from "./SliderItem";
import axios from "axios";
import SliderItemSkeleton from "./SkeletonComponents/SliderItemSkeleton";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { getValueFor } from "./methods/user";
import { apiUrl, frontEndUriBase } from "./methods/apiRequest";

export default function SliderBarForFeature() {

  const [loading, setloading] = useState(false);
  const [featuredStores, setFeaturedStores] = useState([]);


  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const firstBrands = [
    {
      text: "Al Sat Acil",
      image: `${frontEndUriBase}images/al-sat-acil-image.png`,
      color: "#FF0000",
      url: "",
      isShow: "All",
      urgent: true,
      navigationStatus: false,
    },
    {
      text: "Emlak Kulüp",
      image: `${frontEndUriBase}images/emlak-kulup.png`,
      color: "#F4A226",
      url: "RealtorClubExplore",
      isShow: "Emlak Ofisi",
      navigationStatus: true,
    },
    {
      text: "Sat Kirala",
      image: `${frontEndUriBase}images/sat-kirala.png`,
      color: "#0000FF",
      url: "SellAndRent",
      isShow: "All",
      navigationStatus: true,

    },
  ];
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);


  return (
    <GestureHandlerRootView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          top: 0,
        }}
      >
        {firstBrands.map((item, i) => (
          <View
            style={{
              width: 80,
              marginLeft: 3,
              alignItems: "center",
              display:
                item.isShow == "All"
                  ? "flex"
                  : "none" &&
                    (!user.access_token ||
                      user.type == 1 ||
                      item.isShow == user.corporate_type)
                    ? "flex"
                    : "none",
            }}
            key={i}
          >
            <SliderItem
              urgent={item.urgent}
              navigationStatus={item.navigationStatus}
              borderColor={item.color}
              image={item.image}
              url={item.url}
            />
            <Text
              numberOfLines={2}
              style={{ fontSize: 11, textAlign: "center" }}
            >
              {capitalizeFirstLetter(item.text)}
            </Text>
          </View>
        ))}


      </ScrollView>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({});
