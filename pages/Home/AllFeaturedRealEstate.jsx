import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

const apiUrl = "https://private.emlaksepette.com";

const AllFeaturedRealEstate = (prosp) => {
  const { navigation } = prosp;
  const [estateBrands, setEstateBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedStores = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/invalid-endpoint`);
      if (response.data.length > 0) {
        setEstateBrands(response.data);
      }
      return setLoading(false);
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
    } finally {
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
              <View style={styles.imageArea}>
                <Image
                  source={{
                    uri: `${apiUrl}/storage/profile_images/${item.profile_image}`,
                  }}
                  alt="brands"
                  resizeMode="contain"
                  style={styles.image}
                />
                <View style={styles.separator} />
                <Text style={styles.title}>{item.name}</Text>
              </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },
  imageArea: {
    width: "90%",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFF",
    borderRadius: 10,
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
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
