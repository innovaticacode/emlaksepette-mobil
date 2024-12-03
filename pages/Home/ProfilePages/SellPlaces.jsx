import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SellPlaceItem from "../../../components/SellPlaceItem";
import axios from "axios";
import { getValueFor } from "../../../components/methods/user";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import NoDataScreen from "../../../components/NoDataScreen";

export default function SellPlaces({ data }) {
  const [Places, setPlaces] = useState([]);
  const [user, setuser] = useState({});
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getValueFor("user", setuser);
  }, []);

  const GetSellPlace = async () => {
    setloading(true);
    try {
      if (user?.access_token && user) {
        const placeInfo = await axios.get(
          `http://192.168.18.31:8000/api/magaza/${user.id}/satis-noktalari`
        );
        setPlaces(placeInfo?.data?.usersFromCollections);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    GetSellPlace();
  }, [user]);

  console.log(Places, "satışNoktaları");

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
      ) : (
        <ScrollView
          style={{ backgroundColor: "#fff" }}
          contentContainerStyle={{ padding: 10, flexGrow: 1 }}
        >
          {Places.length == 0 ? (
            <NoDataScreen
              message="Satış noktası bulunamadı."
              iconName="store-off-outline"
              buttonText="Anasayfaya Dön"
              navigateTo="HomePage"
            />
          ) : (
            Places.map((item, _i) => <SellPlaceItem key={_i} item={item} />)
          )}
        </ScrollView>
      )}
    </>
  );
}
