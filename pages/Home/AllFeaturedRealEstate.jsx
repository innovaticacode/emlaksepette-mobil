import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { TouchableOpacity } from "react-native-gesture-handler";

const apiUrl = "https://private.emlaksepette.com";

const AllFeaturedRealEstate = (prosp) => {
  const { navigation } = prosp;
  const [estateBrands, setEstateBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedStores = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/popular-estate-brands`);
      if (response.data.length > 0) {
        setEstateBrands(response.data);
      }
      setLoading(false);
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
    }
  };

  useEffect(() => {
    fetchFeaturedStores();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0056b3"
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={estateBrands}
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
                      uri: `${apiUrl}/storage/profile_images/${item.profile_image}`,
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
};

export default AllFeaturedRealEstate;

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
