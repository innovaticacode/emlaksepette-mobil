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

export default function SliderBar() {
  const apiUrl = "https://private.emlaksepette.com";
  const [loading, setloading] = useState(false);
  const [featuredStores, setFeaturedStores] = useState([]);

  const fetchFeaturedStores = async () => {
    try {
      const response = await axios.get(
        "https://private.emlaksepette.com/api/popular-construction-brands"
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
      image: "https://private.emlaksepette.com/images/al-sat-acil-image.png",
      color: "#FF0000",
      url: "",
      isShow:'All'
    },
    {
      text: "Emlak Kulüp",
      image: "https://private.emlaksepette.com/images/emlak-kulup.png",
      color: "#F4A226",
      url: "RealtorClubExplore",
          isShow:'Emlak Ofisi'
    },
    {
      text: "Sat Kirala",
      image: "https://private.emlaksepette.com/images/sat-kirala.png",
      color: "#0000FF",
      url: "SellAndRent",
      isShow:'All'
    },
  ];
  const [user, setuser] = useState({})
  useEffect(() => {
      getValueFor('user',setuser)
  }, [])
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
<<<<<<< HEAD
          <View
            style={{ width: 80, marginLeft: 3, alignItems: "center" }}
            key={i}
          >
=======
          <View style={{ width: 80, marginLeft: 3, alignItems: "center",
            display: item.isShow=='All' ?'flex':'none' && ((!user.access_token || user.type==1 ) || item.isShow==user.corporate_type )  ? 'flex':'none'
            
           }} key={i}>
>>>>>>> 2b675788f1cc1127218f4ac29b46bb0bab11314f
            <SliderItem
              navigationStatus={true}
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
