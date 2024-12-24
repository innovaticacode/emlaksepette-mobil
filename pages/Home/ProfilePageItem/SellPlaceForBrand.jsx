import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { getValueFor } from "../../../components/methods/user";
import SellPlaceItem from "../../../components/SellPlaceItem";
import { apiUrl } from "../../../components/methods/apiRequest";
import NoDataScreen from "../../../components/NoDataScreen";

export default function SellPlacesForBrands({ data }) {
  const ID = data?.data?.id;
  const [Places, setPlaces] = useState([]);
  const [user, setuser] = useState({});
  useEffect(() => {
    getValueFor("user", setuser);
  }, []);
  const [loading, setloading] = useState(false);
  const GetSellPlace = async () => {
    setloading(true);
    try {
      const placeInfo = await axios.get(
        `${apiUrl}magaza/${ID}/satis-noktalari`
      );
      setPlaces(placeInfo?.data?.sales_points);
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    GetSellPlace();
  }, [user]);

  return (
    <>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <ActivityIndicator size={"large"} color="#333" />
        </View>
      ) : Places.length == 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <NoDataScreen
            iconName={"home"}
            isShowButton={true}
            message={"Henüz satış noktası bulunmamaktadır."}
            navigateTo={"Home"}
            buttonText={"Anasayfaya Git"}
          />
        </View>
      ) : (
        <ScrollView
          style={{
            backgroundColor: "#fff",
          }}
          contentContainerStyle={{
            padding: 10,
            gap: 10,
          }}
        >
          {Places.map((item, _i) => (
            <SellPlaceItem key={_i} item={item} />
          ))}
        </ScrollView>
      )}
    </>
  );
}
