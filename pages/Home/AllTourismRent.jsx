import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { TouchableOpacity } from "react-native-gesture-handler";
import { apiUrl, frontEndUriBase } from "../../components/methods/apiRequest";
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

export default function AllTourismRent(prosp) {
  const { navigation } = prosp;
  const [tourismBrand, setTourismBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { brandName } = route.params;
  const fetchFeaturedStores = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}markalar/${brandName}`);

      setTourismBrand(response?.data?.data?.markalar);
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        button: "Tamam",
        onPressButton: () => {
          navigation.navigate("FirstHome");
        },
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedStores();
  }, [route.params.brandName]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#333" style={styles.loading} />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 30 }}
          data={tourismBrand}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          }
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.area}>
              <TouchableOpacity
                style={styles.touchableArea} // touchable alanı burada kontrol ediyoruz
                onPress={() => navigation.navigate("Profile", { id: item.id })}
              >
                <View style={styles.imageArea}>
                  <ImageBackground
                    source={{
                      uri: `${frontEndUriBase}storage/profile_images/${item.profile_image}`,
                    }}
                    alt="brands"
                    resizeMode="contain"
                    style={styles.image}
                  />
                  <View style={styles.separator} />
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.title}
                  >
                    {item.name}
                  </Text>
                  <View style={styles.referenceCode}>
                    <Text style={{ fontSize: 10 }}>Referans Kodu:</Text>
                    <Text style={{ fontSize: 10 }}> {item.code} </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F3F3",
    flex: 1,
    paddingHorizontal: 10,
  },
  area: {
    flex: 1 / 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    height: 200,
  },
  touchableArea: {
    width: "100%", // %100 genişlikte olmasını sağlıyoruz
    height: "100%", // Tam yükseklik
  },
  imageArea: {
    width: "90%", // %90 genişlik
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    height: "100%",
  },
  image: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFF",
    borderRadius: 10,
    objectFit: "contain",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#e4e4e4",
    marginVertical: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0056b3",
    textAlign: "center", // Başlığı ortalamak için
  },
  referenceCode: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between", // Referans kodunun düzgün yerleşmesi için
    width: "100%", // Tam genişlikte olması
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
