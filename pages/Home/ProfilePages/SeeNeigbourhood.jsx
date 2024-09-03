import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import NeigbourhoodCard from "./profileComponents/NeigbourhoodCard";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { getValueFor } from "../../../components/methods/user";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function SeeNeigbourhood() {
  const [loading, setLoading] = useState(false);
  const [suggests, setSuggests] = useState([]);
  const [user, setUser] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    getValueFor("user", setUser);
  }, []);

  const GetUserInfo = () => {
    setLoading(true);

    if (user.access_token) {
      axios
        .get("https://private.emlaksepette.com/api/neighbor-view", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        })
        .then((response) => {
          // Başarılı yanıt alındı, veriyi ayarla
          setSuggests(response?.data?.data || []);
        })
        .catch((error) => {
          // Hata durumunda hata mesajını logla
          console.error(
            "Kullanıcı verileri güncellenirken hata oluştu:",
            error
          );
        })
        .finally(() => {
          // İstek tamamlandığında loading durumunu kapat
          setLoading(false);
        });
    } else {
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
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
            <View style={styles.noDataContainer}>
              <View style={styles.iconContainer}>
                <Icon name="users-slash" size={40} color={"#EA2A28"} />
              </View>
              <Text style={styles.noDataText}>Komşunuz bulunmamaktadır.</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setLoading(true);
                  setTimeout(() => {
                    navigation.navigate("HomePage");
                    setLoading(false);
                  }, 700);
                }}
              >
                <Text style={styles.buttonText}>Ana Sayfa'ya dön</Text>
              </TouchableOpacity>
            </View>
          )}
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
  scrollViewContainer: {
    gap: 9,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.7,
    borderColor: "#e6e6e6",
    ...Platform.select({
      ios: {
        shadowColor: "#e6e6e6",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  noDataText: {
    color: "grey",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#EA2A28",
    width: "90%",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
  },
});
