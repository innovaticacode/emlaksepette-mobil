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
          <View style={styles.noDataOuterContainer}>
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
              <View style={styles.noCommentsContainer}>
                <Icon
                  name="users-slash"
                  size={50}
                  color="#333"
                  style={{ marginBottom: 20 }}
                />
                <Text style={styles.noCommentsText}>
                  Henüz Komşumu Gör bilgisi satın almadınız.
                </Text>
                <TouchableOpacity
                  style={styles.returnButton}
                  onPress={() => {
                    setLoading(true);
                    setTimeout(() => {
                      navigation.navigate("HomePage");
                      setLoading(false);
                    }, 700);
                  }}
                >
                  <Text style={styles.returnButtonText}>Anasayfaya Dön</Text>
                </TouchableOpacity>
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
  noCommentsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -62,
  },
  noCommentsText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  returnButton: {
    backgroundColor: "#EA2B2E",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  returnButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center", // İçeriği dikey olarak ortala
  },
  noDataOuterContainer: {
    flex: 1,
    justifyContent: "center", // İçeriği dikey olarak ortala
    alignItems: "center", // İçeriği yatay olarak ortala
    minHeight: "100%", // Ekranı tam doldurması için
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 85,
    width: 85,
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
});
