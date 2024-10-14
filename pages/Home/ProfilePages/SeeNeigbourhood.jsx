import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import NeigbourhoodCard from "./profileComponents/NeigbourhoodCard";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../components/methods/user";
import NoDataScreen from "../../../components/NoDataScreen";
import { apiUrl } from "../../../components/methods/apiRequest";

export default function SeeNeigbourhood() {
  const [loading, setLoading] = useState(false);
  const [suggests, setSuggests] = useState([]);
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const GetUserInfo = async () => {
    setLoading(true);
    try {
      if (user.access_token) {
        const response = await axios.get(`${apiUrl}neighbor-view`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        setSuggests(response?.data?.data || []);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, [user]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EA2A28" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            {suggests.length > 0 ? (
              suggests.map((suggest) => (
                <NeigbourhoodCard
                  key={suggest?.id}
                  NeigBourHoodInfo={suggest?.owner}
                  project={suggest?.order?.cart}
                  projectInfo={suggest?.project}
                  status={suggest?.status}
                />
              ))
            ) : (
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NoDataScreen
                  message="Komşu bilgisi bulunamadı."
                  iconName="run-fast"
                  buttonText="Anasayfaya Dön"
                  navigateTo="HomePage"
                />
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  neighbourhoodContainer: {
    flexGrow: 1,
    alignItems: "flex-start",
  },
});
