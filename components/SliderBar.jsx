import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import SliderItem from "./SliderItem";
import axios from "axios";
import SliderItemSkeleton from "./SkeletonComponents/SliderItemSkeleton";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

export default function SliderBar() {
  const apiUrl = "https://emlaksepette.com";
  const [loading, setloading] = useState(false);
  const [featuredStores, setFeaturedStores] = useState([]);

  const fetchFeaturedStores = async () => {
    try {
      const response = await axios.get(
        "https://emlaksepette.com/api/popular-construction-brands"
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

  const firstBrands = [
    {
      text: "Al Sat Acil",
      image: "https://emlaksepette.com/images/al-sat-acil-image.png",
      color: "#FF0000",
      url: "https://emlaksepette.com/kategori/al-sat-acil",
    },
    {
      text: "Emlak Kulüp",
      image: "https://emlaksepette.com/images/emlak-kulup.png",
      color: "#F4A226",
      url: "RealtorClubExplore",
    },
    {
      text: "Sat Kirala",
      image: "https://emlaksepette.com/images/sat-kirala.png",
      color: "#0000FF",
      url: "SellAndRent",
    },
  ];
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
          <View style={{ width: 80, marginLeft: 3, alignItems: "center" }}>
            <SliderItem
              navigationStatus={true}
              borderColor={item.color}
              key={i}
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

        {featuredStores.map((item, index) => (
          <View
            style={{ width: 80, marginLeft: 3, alignItems: "center" }}
            key={index}
          >
            {loading == false ? (
              <>
                <SliderItemSkeleton />
              </>
            ) : (
              <>
                <SliderItem
                  navigationStatus={false}
                  borderColor={"#ebebeb"}
                  StoreID={item.id}
                  key={index}
                  image={`${apiUrl}/storage/profile_images/${item.profile_image}`}
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
