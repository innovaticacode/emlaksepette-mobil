import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import RealtorPost from "../../../components/RealtorPost";

export default function RealtorAdverts({ housingdata }) {
  const [featuredEstates, setFeaturedEstates] = useState({});

  const fetchFeaturedEstates = async () => {
    try {
      // setFeaturedEstates(housingdata);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchFeaturedEstates();
  // }, []);
  const { width, height } = Dimensions.get("window");
  const ApiUrl = "https://mobil.emlaksepette.com";
  const objectKeys = Object.keys(housingdata);
  return (
    <ScrollView contentContainerStyle={{ padding: 10, paddingBottom: 50 }}>
      {objectKeys.map((key, index) => (
        <RealtorPost
          key={index}
          title={`${housingdata[key].title}`}
          price={`${JSON.parse(housingdata[key].housing_type_data)["price"]}`}
          m2={`${
            JSON.parse(housingdata[key].housing_type_data)["squaremeters"]
          }`}
          roomCount={`${
            JSON.parse(housingdata[key].housing_type_data)["room_count"]
          }`}
          floor={`${
            JSON.parse(housingdata[key].housing_type_data)["floorlocation"]
          }`}
          image={`${ApiUrl}/housing_images/${
            JSON.parse(housingdata[key].housing_type_data)["image"]
          }`}
          HouseId={`${housingdata[key].id}`}
          // key={index}
          // HouseId={item.id}
          // price={`${
          //   JSON.parse(item.housing_type_data)["price"]
          // } `}
          // title={item.housing_title}
          // loading={loadingEstates}
          // location={item.city_title + " / " + item.county_title}
          // image={`${apiUrl}/housing_images/${
          //   JSON.parse(item.housing_type_data).image
          // }`}
          // m2={`${
          //   JSON.parse(item.housing_type_data)["squaremeters"]
          // } `}
          // roomCount={`${
          //   JSON.parse(item.housing_type_data)["room_count"]
          // } `}
          // floor={`${
          //   JSON.parse(item.housing_type_data)["floorlocation"]
          // } `}
        />
      ))}
      {/* <View style={{alignItems:'center',width:'100%',bottom: width>400?100:170}}>
     <Image source={require('./House.jpg')} resizeMode='contain' style={{width:'85%'}}/>
      <Text style={{bottom: width>400?250:270,fontSize:20,fontWeight:'500'}}>Henüz Proje Yayınlanmadı</Text>
    </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
