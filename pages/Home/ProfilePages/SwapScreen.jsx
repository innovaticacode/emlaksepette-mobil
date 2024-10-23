import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import SwapItem from "./profileComponents/SwapItem";
import Modal from "react-native-modal";
import { getValueFor } from "../../../components/methods/user";
import axios from "axios";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import NoDataScreen from "../../../components/NoDataScreen";
import { apiUrl } from "../../../components/methods/apiRequest";
import { InfoCard, MySwapInfoBottom } from "../../../components";
import { formatDate } from "../../../utils";

export default function SwapScreen() {
  const [DetailModal, setDetailModal] = useState(false);
  const [swapSuggestdetails, setswapSuggestdetails] = useState([]);
  const [selectedModalIndex, setselectedModalIndex] = useState(0);
  const [SwapSuggest, setSwapSuggest] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setDetailModal(true);
  };

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const fetchData = async () => {
    setLoading(true); // Loading'i başlatıyoruz
    try {
      if (user.access_token) {
        const response = await axios.get(
          `${apiUrl}institutional/swap_applications`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setSwapSuggest(response.data);
        return setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return setLoading(false);
    } finally {
      setLoading(false); // Veri çekimi bitince loading'i kapatıyoruz
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const getDetails = async (id, index) => {
    try {
      if (user?.access_token) {
        const response = await axios.get(
          `${apiUrl}institutional/swap_applications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        openModal(); // Modal'ı açıyoruz
        setswapSuggestdetails(response?.data?.form); // Detayları state'e set ediyoruz
        setselectedModalIndex(index); // Modal'ı hangi index ile açacağımızı belirliyoruz
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          animating={loading}
        />
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ gap: 15 }}
          showsVerticalScrollIndicator={false}
        >
          <>
            <FlatList
              data={SwapSuggest}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <InfoCard
                  colorKey={index}
                  name={item.ad}
                  surname={item.soyad}
                  eposta={item.email}
                  phone={item.telefon}
                  date={formatDate(item.created_at)}
                  onPress={() => getDetails(item.id, index)}
                />
              )}
            />
          </>
          <MySwapInfoBottom
            isVisible={DetailModal}
            setIsVisible={setDetailModal}
            swapStatus={swapSuggestdetails?.takas_tercihi}
            swapSuggest={swapSuggestdetails?.takas_tercihi}
            estatesType={swapSuggestdetails?.emlak_tipi}
            data={swapSuggestdetails}
          />
        </ScrollView>
      )}
      {SwapSuggest.length === 0 && !loading ? (
        <>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <NoDataScreen
              message="Takas bilgisi bulunamadı."
              iconName="swap-horizontal-bold"
              buttonText="Anasayfaya Dön"
              navigateTo="HomePage"
            />
          </View>
        </>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    backgroundColor: "#FFF",
    gap: 10,
    flex: 1,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 500,
    paddingVertical: 30,
    paddingHorizontal: 10,
    width: "100%",

    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: " #e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
