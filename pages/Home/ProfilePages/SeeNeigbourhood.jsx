import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import NeigbourhoodCard from "./profileComponents/NeigbourhoodCard";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../components/methods/user";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function SeeNeigbourhood() {
  const [loading, setloading] = useState(false);
  const [suggests, setsuggests] = useState([]);
  const [user, setUser] = useState({});

  const navigation = useNavigation();
  useEffect(() => {
    getValueFor("user", setUser);
  }, []);
  const nav = useNavigation();
  const GetUserInfo = async () => {
    setloading(true);
    try {
      if (user.access_token) {
        const response = await axios.get(
          "https://private.emlaksepette.com/api/neighbor-view",
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setsuggests(response?.data?.data);
      }
    } catch (error) {
      console.error("Kullanıcı verileri güncellenirken hata oluştu:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, [user]);

  console.log(user.access_token + "bilge token");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 9 }}>
      {suggests.length > 0 ? (
        suggests.map((suggest) => (
          <NeigbourhoodCard
            key={suggest.id}
            NeigBourHoodInfo={suggest.owner}
            project={suggest?.order?.cart}
            projectInfo={suggest.project}
          />
        ))
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 10,
            }}
          >
            <View
              style={[
                styles.card,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100, // Genişlik ve yükseklik aynı olmalı
                  height: 100, // Genişlik ve yükseklik aynı olmalı
                  borderRadius: 50,
                },
              ]}
            >
              <Icon name="users-slash" size={40} color={"#EA2A28"} />
            </View>
            <View>
              <Text style={{ color: "grey", fontSize: 16, fontWeight: "600" }}>
                Komşunuz bulunmamaktadır.
              </Text>
              <Text></Text>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#EA2A28",
                  width: "90%",
                  padding: 8,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setloading(true);
                  setTimeout(() => {
                    navigation.navigate("HomePage");
                    setloading(false);
                  }, 700);
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Ana Sayfa'ya dön
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F7",
    padding: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,

    borderRadius: 50,

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
